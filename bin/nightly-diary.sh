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
# ~/projects is the source of truth; the NAS copy is a backup. The wrapper
# exports DIARY_PROJECTS_DIR, so this default only applies to manual runs.
PROJECTS=${DIARY_PROJECTS_DIR:-$HOME/projects}
DATE=${1:-$(date -v-1d +%F)}
LOG="$REPO/logs/$DATE.log"
# A capture or a wedged build must not hold the machine overnight.
AGENT_TIMEOUT=${DIARY_AGENT_TIMEOUT:-3600}
# `timeout` sends TERM and then waits for the child to exit. The agent does not
# exit on TERM mid-request, so without a kill grace the timeout is advisory
# only: on 2026-10-07 the first provider was given 3600s, reported rc=124
# ("hit the timeout"), and still ran 8h49m, which cost the night its two
# fallbacks. --kill-after makes the limit real.
AGENT_KILL_GRACE=${DIARY_AGENT_KILL_GRACE:-120}
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

# Load the headless token here rather than only in the wrapper. Anything that
# calls this script directly — the backfill, a manual re-run, a future caller —
# otherwise finds no provider token and aborts with "no provider produced a day",
# which reads like a model failure rather than a missing credential.
ENVFILE=${DIARY_ENV_FILE:-$HOME/.config/product-diary/env}
if [ -z "${CLAUDE_CODE_OAUTH_TOKEN:-}${ANTHROPIC_API_KEY:-}${ZAI_API_KEY:-}${DEEPSEEK_API_KEY:-}" ] \
   && [ -f "$ENVFILE" ]; then
  if [ "$(stat -f '%Lp' "$ENVFILE")" = 600 ]; then
    set -a; . "$ENVFILE"; set +a
    echo "loaded provider credentials from $ENVFILE"
  else
    echo "warn: $ENVFILE is not mode 600; not reading it"
  fi
fi

for t in "$CLAUDE_BIN" node npm git; do
  command -v "$t" >/dev/null || fail "$t not on PATH ($PATH)"
done
# The NAS is an SMB mount on the mini; an unmounted volume looks like an empty
# directory, which would otherwise read as "nothing shipped today".
[ -d "$PROJECTS/.git" ] || [ -n "$(ls -A "$PROJECTS" 2>/dev/null)" ] || fail "$PROJECTS is empty or not mounted"
[ -f "$PROJECTS/PROJECTS.md" ] || fail "$PROJECTS/PROJECTS.md missing — is the NAS mounted?"

cd "$REPO" || fail "cannot enter $REPO"

# A run that was killed part-way through publishing leaves the repo on its
# diary/<date> branch, and the next night would then rebase and commit on top of
# it. Always start from main.
# A killed run can leave a rebase half-done, and every later run then dies with
# "there is already a rebase-merge directory". Clear it before anything else.
if [ -d .git/rebase-merge ] || [ -d .git/rebase-apply ]; then
  echo "warn: a previous run left a rebase in progress; aborting it"
  git rebase --abort 2>/dev/null
  rm -rf .git/rebase-merge .git/rebase-apply
fi

current=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo unknown)
if [ "$current" != main ]; then
  echo "warn: repo was left on $current; returning to main"
  git checkout -q main || fail "cannot return to main from $current"
fi

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
    mv "$LOCK" "$LOCK.dead.$$" 2>/dev/null && rm -rf "$LOCK.dead.$$" 2>/dev/null
    rm -rf "$LOCK" 2>/dev/null
    mkdir "$LOCK" || fail "cannot create $LOCK"
  else
    fail "another diary run holds $LOCK (${age}s old, $(cat "$LOCK/owner" 2>/dev/null || echo unknown)); not running two at once"
  fi
fi
printf '%s pid %s since %s\n' "$(hostname -s)" "$$" "$(date '+%F %T %Z')" > "$LOCK/owner"
trap 'mv "$LOCK" "$LOCK.dead.$$" 2>/dev/null && rm -rf "$LOCK.dead.$$" 2>/dev/null || rm -rf "$LOCK" 2>/dev/null' EXIT
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
# DIARY_REPO and DIARY_PROJECTS are substituted for the same reason DIARY_DATE
# is: the prompt used to hardcode /Volumes/nas/projects/product-diary, so when
# the runner moved to ~/projects the agent wrote to one checkout while the
# validator read the other and reported "the agent wrote nothing" -- three
# providers in a row, each having written a perfectly good entry elsewhere.
# The prompt must never name a path the runner did not choose.
prompt="$(sed -e "s/DIARY_DATE/$DATE/g" \
              -e "s|DIARY_REPO|$REPO|g" \
              -e "s|DIARY_PROJECTS|$PROJECTS|g" \
              "$REPO/bin/diary-prompt.md")
$(sed "s/YYYY-MM-DD/$DATE/g" "$REPO/bin/ENTRY-CONTRACT.md")"

# Never silently rewrite a day that is already published.
if [ -n "$(git ls-files -- "$DAYDIR")" ] && [ -z "${DIARY_FORCE:-}" ]; then
  # Already written — by an earlier run, or by hand. That is a no-op, not a
  # failure: exiting non-zero here made launchd record "last exit code = 1" on a
  # night when the job did exactly the right thing. Say so and leave quietly, so
  # a real failure still stands out in the log.
  echo "$DAYDIR is already published; nothing to do (DIARY_FORCE=1 to rewrite it)"
  echo "=== finished $(date '+%F %T %Z') ==="
  exit 0
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
  # Benchmarking: DIARY_USAGE_DIR makes the agent report token usage as JSON so a
  # run's real cost can be computed from each provider's own rates.
  local fmt=()
  [ -n "${DIARY_USAGE_DIR:-}" ] && { mkdir -p "$DIARY_USAGE_DIR"; fmt=(--output-format json); }
  (
    unset ANTHROPIC_API_KEY CLAUDE_CODE_OAUTH_TOKEN ANTHROPIC_AUTH_TOKEN ANTHROPIC_BASE_URL
    unset ANTHROPIC_MODEL ANTHROPIC_DEFAULT_SONNET_MODEL ANTHROPIC_DEFAULT_OPUS_MODEL ANTHROPIC_DEFAULT_HAIKU_MODEL
    if [ -n "$base" ]; then
      # An Anthropic-compatible third party: same harness, different endpoint.
      export ANTHROPIC_BASE_URL="$base" ANTHROPIC_AUTH_TOKEN="$token"
      export ANTHROPIC_MODEL="$model" ANTHROPIC_DEFAULT_SONNET_MODEL="$model"
      export ANTHROPIC_DEFAULT_OPUS_MODEL="$model" ANTHROPIC_DEFAULT_HAIKU_MODEL="$model"
      export API_TIMEOUT_MS=3000000
      if [ -n "${DIARY_USAGE_DIR:-}" ]; then
        timeout --kill-after="$AGENT_KILL_GRACE" "$AGENT_TIMEOUT" "$CLAUDE_BIN" -p "$prompt" "${fmt[@]}" \
          --allowedTools Bash Read Write Edit Glob Grep --add-dir "$PROJECTS" \
          > "$DIARY_USAGE_DIR/$name.json"
      else
        timeout --kill-after="$AGENT_KILL_GRACE" "$AGENT_TIMEOUT" "$CLAUDE_BIN" -p "$prompt" \
          --allowedTools Bash Read Write Edit Glob Grep --add-dir "$PROJECTS"
      fi
    else
      export CLAUDE_CODE_OAUTH_TOKEN="$token"
      if [ -n "${DIARY_USAGE_DIR:-}" ]; then
        timeout --kill-after="$AGENT_KILL_GRACE" "$AGENT_TIMEOUT" "$CLAUDE_BIN" -p "$prompt" "${fmt[@]}" \
          --allowedTools Bash Read Write Edit Glob Grep --add-dir "$PROJECTS" --model "$model" \
          > "$DIARY_USAGE_DIR/$name.json"
      else
        timeout --kill-after="$AGENT_KILL_GRACE" "$AGENT_TIMEOUT" "$CLAUDE_BIN" -p "$prompt" \
          --allowedTools Bash Read Write Edit Glob Grep --add-dir "$PROJECTS" --model "$model"
      fi
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
    [ $rc -eq 124 ] && echo "warn: provider $pname hit the timeout (${AGENT_TIMEOUT}s)"
    [ $rc -eq 137 ] && echo "warn: provider $pname ignored TERM and was killed after ${AGENT_TIMEOUT}s + ${AGENT_KILL_GRACE}s"
    [ $rc -ne 0 ] && [ $rc -ne 124 ] && [ $rc -ne 137 ] && echo "warn: provider $pname exited $rc"

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
  # Put the tree back. A dry run that leaves its work behind seeds the next real
  # run: the commit scope includes projects/, so a discarded benchmark entry
  # would be published by whoever runs next.
  git checkout -- "${PATHS[@]}" 2>/dev/null
  git clean -fdq -- "${PATHS[@]}" 2>/dev/null
  echo "dry run: working tree restored"
  echo "=== finished $(date '+%F %T %Z') ==="
  exit 0
fi
if [ -z "$(git status --porcelain -- "${PATHS[@]}")" ]; then
  echo "nothing new under ${PATHS[*]} — not committing"
else
  # main is protected and requires the "verify" check, so nothing can be pushed
  # to it directly — not even an admin, and not the runner. Publishing goes
  # through a pull request that CI has to pass, which is the whole point: a day
  # that is not signed by this machine cannot reach the site.
  command -v gh >/dev/null || fail "gh is required to publish (main is protected)"
  BRANCH="diary/$DATE"
  git checkout -q -B "$BRANCH" || fail "could not switch to $BRANCH"
  git add -A -- "${PATHS[@]}"
  git -c user.name="${GIT_AUTHOR_NAME:-$(git config user.name)}" \
      -c user.email="${GIT_AUTHOR_EMAIL:-$(git config user.email)}" \
      commit -q -m "Diary entry for $DATE${PROVIDER_USED:+ (via $PROVIDER_USED)}" || {
        git checkout -q main; fail "commit failed"; }
  git push -q -f origin "$BRANCH" || { git checkout -q main; fail "could not push $BRANCH"; }

  if [ -z "$(gh pr list --head "$BRANCH" --state open --json number --jq '.[0].number' 2>/dev/null)" ]; then
    gh pr create --head "$BRANCH" --base main \
      --title "Diary entry for $DATE${PROVIDER_USED:+ (via $PROVIDER_USED)}" \
      --body "Written by \`$PROVIDER_USED\`, validated against bin/ENTRY-CONTRACT.md and signed on $(hostname -s)." \
      >/dev/null || { git checkout -q main; fail "could not open the pull request"; }
  fi

  # `gh pr checks` exits non-zero when no check has registered yet, which is the
  # normal state for the first seconds after a pull request is opened. Without
  # this wait it reports failure on a run whose check then passes, and the day
  # sits unpublished in an open PR.
  echo "waiting for the verify check to register on $BRANCH"
  for _ in $(seq 1 30); do
    n=$(gh pr view "$BRANCH" --json statusCheckRollup --jq '.statusCheckRollup | length' 2>/dev/null || echo 0)
    [ "${n:-0}" -gt 0 ] && break
    sleep 10
  done
  echo "waiting for the verify check to pass"
  if ! gh pr checks "$BRANCH" --watch --fail-fast >/dev/null 2>&1; then
    git checkout -q main
    fail "the verify check did not pass for $DATE; nothing published (see the PR)"
  fi
  gh pr merge "$BRANCH" --squash --delete-branch >/dev/null || {
    git checkout -q main; fail "could not merge $BRANCH"; }
  echo "published $DATE via pull request"

  # Leave the working tree exactly on what was merged, so the next run rebases
  # cleanly rather than carrying a commit that was squashed upstream.
  git checkout -q main && git fetch -q origin main && git reset -q --hard origin/main
fi

npm run --silent deploy || fail "deploy failed"
echo "=== finished $(date '+%F %T %Z') ==="
