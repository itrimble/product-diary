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

for t in claude node npm git; do
  command -v "$t" >/dev/null || fail "$t not on PATH ($PATH)"
done
# The NAS is an SMB mount on the mini; an unmounted volume looks like an empty
# directory, which would otherwise read as "nothing shipped today".
[ -d "$PROJECTS/.git" ] || [ -n "$(ls -A "$PROJECTS" 2>/dev/null)" ] || fail "$PROJECTS is empty or not mounted"
[ -f "$PROJECTS/PROJECTS.md" ] || fail "$PROJECTS/PROJECTS.md missing — is the NAS mounted?"

cd "$REPO" || fail "cannot enter $REPO"
if git fetch -q origin main; then
  git rebase -q --autostash FETCH_HEAD || {
    git rebase --abort 2>/dev/null
    echo "warn: rebase onto origin/main failed, continuing on local state"
  }
else
  echo "warn: git fetch failed, continuing on local state"
fi

# --- write the markdown -----------------------------------------------------
prompt=$(sed "s/DIARY_DATE/$DATE/g" "$REPO/bin/diary-prompt.md")
if [ -n "${DIARY_SKIP_AGENT:-}" ]; then
  # Plumbing check: exercise the guards, build and deploy without writing a post.
  echo "--- agent skipped (DIARY_SKIP_AGENT set) ---"
  rc=0
else
echo "--- agent start $(date '+%T') (timeout ${AGENT_TIMEOUT}s) ---"
timeout "$AGENT_TIMEOUT" claude -p "$prompt" \
  --allowedTools Bash Read Write Edit Glob Grep \
  --add-dir "$PROJECTS" \
  --model claude-sonnet-5-5
rc=$?
echo "--- agent exit $rc ---"
fi
[ $rc -eq 124 ] && echo "warn: agent hit the ${AGENT_TIMEOUT}s timeout; publishing whatever it wrote"
[ $rc -ne 0 ] && [ $rc -ne 124 ] && echo "warn: agent exited $rc; publishing whatever it wrote"

# --- publish ----------------------------------------------------------------
DAYDIR="posts/$DATE"
if [ -z "$(git status --porcelain -- "$DAYDIR")" ]; then
  echo "nothing new under $DAYDIR — not committing"
else
  git add -A -- "$DAYDIR"
  git -c user.name="${GIT_AUTHOR_NAME:-$(git config user.name)}" \
      -c user.email="${GIT_AUTHOR_EMAIL:-$(git config user.email)}" \
      commit -q -m "Diary entry for $DATE" || fail "commit failed"
  git push -q origin main || fail "push failed"
  echo "committed and pushed"
fi

npm run --silent deploy || fail "deploy failed"
echo "=== finished $(date '+%F %T %Z') ==="
