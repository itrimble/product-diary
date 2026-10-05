#!/usr/bin/env bash
# One night of the product diary, start to finish, unattended.
#
#   nightly-diary.sh [YYYY-MM-DD]
#
# With no argument it writes about yesterday — it is meant to fire just after
# midnight, when the day it describes has just ended.
#
# Runs the Claude Code CLI headlessly to produce the markdown, then builds,
# commits, pushes and deploys. Designed to be driven by launchd on the Mac mini;
# safe to run by hand.
set -uo pipefail

REPO=$(cd "$(dirname "$0")/.." && pwd)
PROJECTS=${DIARY_PROJECTS_DIR:-/Volumes/nas/projects}
DATE=${1:-$(date -v-1d +%F)}
LOG="$REPO/logs/$DATE.log"
# A capture or a wedged build must not hold the machine overnight.
AGENT_TIMEOUT=${DIARY_AGENT_TIMEOUT:-3600}
# Overridable so a specific CLI build can be pinned, and so the provider loop
# can be exercised against a stub in tests.
CLAUDE_BIN=${DIARY_CLAUDE_BIN:-claude}

mkdir -p "$REPO/logs"
exec > >(tee -a "$LOG") 2>&1
echo "=== product diary for $DATE — started $(date '+%F %T %Z') on $(hostname -s) ==="

fail() { echo "ABORT: $*"; exit 1; }

# launchd hands jobs a minimal PATH, so find the tools rather than assume them.
for d in /opt/homebrew/bin /usr/local/bin "$HOME/.local/bin" "$HOME/bin"; do
  [ -d "$d" ] && PATH="$d:$PATH"
done
# nvm installs node outside any standard prefix; take the newest it has.
if ! command -v node >/dev/null && [ -d "$HOME/.nvm/versions/node" ]; then
  nvmbin=$(ls -d "$HOME"/.nvm/versions/node/*/bin 2>/dev/null | sort -V | tail -1)
  [ -n "$nvmbin" ] && PATH="$nvmbin:$PATH"
fi
export PATH

for t in "$CLAUDE_BIN" node npm git; do
  command -v "$t" >/dev/null || fail "$t not on PATH ($PATH)"
done
# The NAS is an SMB mount on the mini; an unmounted volume looks like an empty
# directory, which would otherwise read as "nothing shipped today".
[ -d "$PROJECTS/.git" ] || [ -n "$(ls -A "$PROJECTS" 2>/dev/null)" ] || fail "$PROJECTS is empty or not mounted"
[ -f "$PROJECTS/PROJECTS.md" ] || fail "$PROJECTS/PROJECTS.md missing — is the NAS mounted?"

cd "$REPO" || fail "cannot enter $REPO"

# This repo is a single working tree that both the mini and the MacBook mount
# over SMB. Two gits in it at once corrupt scratch files — a concurrent push
# while this job fetched left FETCH_HEAD padded with spaces and git reported
# "fatal: invalid upstream 'FETCH_HEAD'". Serialise runs, and take over a lock
# left behind by a crashed one.
LOCK="$REPO/.diary.lock"
STALE=$((AGENT_TIMEOUT + 1800))
if ! mkdir "$LOCK" 2>/dev/null; then
  age=$(( $(date +%s) - $(stat -f %m "$LOCK" 2>/dev/null || date +%s) ))
  if [ "$age" -gt "$STALE" ]; then
    echo "warn: taking over a stale lock (${age}s old, held by $(cat "$LOCK/owner" 2>/dev/null || echo unknown))"
    rm -rf "$LOCK"; mkdir "$LOCK" || fail "cannot create $LOCK"
  else
    fail "another diary run holds $LOCK (${age}s old, $(cat "$LOCK/owner" 2>/dev/null || echo unknown)); not running two at once"
  fi
fi
printf '%s pid %s since %s\n' "$(hostname -s)" "$$" "$(date '+%F %T %Z')" > "$LOCK/owner"
trap 'rm -rf "$LOCK"' EXIT
# origin/main is a real ref that survives a racing writer; FETCH_HEAD is a
# scratch file and was the thing that got corrupted.
if git fetch -q origin; then
  if git rev-parse -q --verify origin/main >/dev/null; then
    git rebase -q --autostash origin/main || {
      git rebase --abort 2>/dev/null
      echo "warn: rebase onto origin/main failed, continuing on local state"
    }
  else
    echo "warn: origin/main does not resolve, continuing on local state"
  fi
else
  echo "warn: git fetch failed, continuing on local state"
fi

# --- write the markdown -----------------------------------------------------
DAYDIR="posts/$DATE"
# The prompt and the validator are held to one source of truth: the contract is
# appended to the prompt, so what the agent is told and what is enforced cannot
# drift apart.
prompt="$(sed "s/DIARY_DATE/$DATE/g" "$REPO/bin/diary-prompt.md")
$(sed "s/YYYY-MM-DD/$DATE/g" "$REPO/bin/ENTRY-CONTRACT.md")"

# Never silently rewrite a day that is already published.
if [ -n "$(git ls-files -- "$DAYDIR")" ] && [ -z "${DIARY_FORCE:-}" ]; then
  fail "$DAYDIR is already committed; re-run with DIARY_FORCE=1 to replace it"
fi

# Run one provider. Its credentials live only inside the subshell, so a later
# provider cannot inherit the previous one's endpoint or token.
run_provider() {
  local name=$1 base=$2 model=$3 tokenvar=$4
  local token=${!tokenvar:-}
  if [ -z "$token" ]; then
    echo "--- provider $name: \$$tokenvar is not set, skipping ---"
    return 2
  fi
  echo "--- provider $name (model $model) start $(date '+%T'), timeout ${AGENT_TIMEOUT}s ---"
  (
    unset ANTHROPIC_API_KEY CLAUDE_CODE_OAUTH_TOKEN ANTHROPIC_AUTH_TOKEN ANTHROPIC_BASE_URL
    unset ANTHROPIC_MODEL ANTHROPIC_DEFAULT_SONNET_MODEL ANTHROPIC_DEFAULT_OPUS_MODEL ANTHROPIC_DEFAULT_HAIKU_MODEL
    if [ -n "$base" ]; then
      # An Anthropic-compatible third party: same harness, different endpoint.
      export ANTHROPIC_BASE_URL="$base" ANTHROPIC_AUTH_TOKEN="$token"
      export ANTHROPIC_MODEL="$model" ANTHROPIC_DEFAULT_SONNET_MODEL="$model"
      export ANTHROPIC_DEFAULT_OPUS_MODEL="$model" ANTHROPIC_DEFAULT_HAIKU_MODEL="$model"
      export API_TIMEOUT_MS=3000000
      timeout "$AGENT_TIMEOUT" "$CLAUDE_BIN" -p "$prompt" \
        --allowedTools Bash Read Write Edit Glob Grep --add-dir "$PROJECTS"
    else
      export CLAUDE_CODE_OAUTH_TOKEN="$token"
      timeout "$AGENT_TIMEOUT" "$CLAUDE_BIN" -p "$prompt" \
        --allowedTools Bash Read Write Edit Glob Grep --add-dir "$PROJECTS" --model "$model"
    fi
  )
}

# Survey before any model runs. Doing it here rather than in the prompt means
# every provider gets the same shortlist and the receipt always exists, so the
# only thing that varies between providers is the prose.
echo "--- survey start $(date '+%T') ---"
if ! bash "$REPO/bin/survey-day.sh" "$DATE"; then
  fail "survey failed; refusing to guess at the day"
fi

PROVIDER_USED=""
if [ -n "${DIARY_SKIP_AGENT:-}" ]; then
  echo "--- agent skipped (DIARY_SKIP_AGENT set) ---"
  PROVIDER_USED="skipped"
else
  # Build the ordered provider list, honouring a DIARY_PROVIDERS override.
  # No mapfile: macOS /bin/bash is 3.2, which does not have it.
  PROVIDER_LINES=()
  while IFS= read -r l; do
    case "$l" in ''|\#*) continue ;; esac
    PROVIDER_LINES+=("$l")
  done < "$REPO/bin/providers.conf"
  [ ${#PROVIDER_LINES[@]} -gt 0 ] || fail "no providers in bin/providers.conf"
  if [ -n "${DIARY_PROVIDERS:-}" ]; then
    ordered=()
    IFS=',' read -ra wanted <<< "$DIARY_PROVIDERS"
    for w in "${wanted[@]}"; do
      for l in "${PROVIDER_LINES[@]}"; do
        [ "${l%%|*}" = "$w" ] && ordered+=("$l")
      done
    done
    [ ${#ordered[@]} -gt 0 ] || fail "DIARY_PROVIDERS=$DIARY_PROVIDERS matched nothing in providers.conf"
    PROVIDER_LINES=("${ordered[@]}")
  fi

  for line in "${PROVIDER_LINES[@]}"; do
    IFS='|' read -r pname pbase pmodel ptoken <<< "$line"
    # Each provider starts from a clean day so a rejected attempt cannot be
    # mixed with the next one's work.
    rm -rf "$DAYDIR"
    run_provider "$pname" "$pbase" "$pmodel" "$ptoken"
    rc=$?
    [ $rc -eq 2 ] && continue
    [ $rc -eq 124 ] && echo "warn: provider $pname hit the timeout"
    [ $rc -ne 0 ] && [ $rc -ne 124 ] && echo "warn: provider $pname exited $rc"

    # The contract is what makes the blog consistent across providers.
    if node "$REPO/bin/validate-entries.mjs" "$DATE"; then
      PROVIDER_USED="$pname"
      break
    fi
    # Keep the rejected attempt for inspection rather than publishing it.
    if [ -d "$DAYDIR" ]; then
      reject="$REPO/logs/rejected/$DATE-$pname"
      mkdir -p "$(dirname "$reject")"; rm -rf "$reject"; mv "$DAYDIR" "$reject"
      echo "provider $pname did not meet the contract; attempt kept at logs/rejected/$DATE-$pname"
    fi
  done

  [ -n "$PROVIDER_USED" ] || fail "no provider produced a day that meets the contract"
  echo "--- provider $PROVIDER_USED produced the day ---"
fi

# --- publish ----------------------------------------------------------------
# posts/<date> is the day's entry; projects/ holds optional rolling per-project
# pages the build also renders. Anything else in the tree is not this run's work.
PATHS=("$DAYDIR")
[ -d projects ] && PATHS+=(projects)
# Sign the day before committing. CI verifies this signature, so a push from
# anywhere that does not hold the mini's key cannot publish an entry.
if [ "$PROVIDER_USED" != "skipped" ] && [ -d "$DAYDIR" ]; then
  bash "$REPO/bin/attest-day.sh" sign "$DATE" || fail "could not sign $DAYDIR"
fi

if [ -n "${DIARY_DRY_RUN:-}" ]; then
  echo "dry run: not committing, pushing or deploying"
  echo "=== finished $(date '+%F %T %Z') ==="
  exit 0
fi
if [ -z "$(git status --porcelain -- "${PATHS[@]}")" ]; then
  echo "nothing new under ${PATHS[*]} — not committing"
else
  git add -A -- "${PATHS[@]}"
  git -c user.name="${GIT_AUTHOR_NAME:-$(git config user.name)}" \
      -c user.email="${GIT_AUTHOR_EMAIL:-$(git config user.email)}" \
      commit -q -m "Diary entry for $DATE${PROVIDER_USED:+ (via $PROVIDER_USED)}" || fail "commit failed"
  git push -q origin main || fail "push failed"
  echo "committed and pushed"
fi

npm run --silent deploy || fail "deploy failed"
echo "=== finished $(date '+%F %T %Z') ==="
