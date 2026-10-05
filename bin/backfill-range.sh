#!/usr/bin/env bash
# Write entries for a range of past days, oldest first.
#
#   bin/backfill-range.sh 2026-09-28 2026-10-03
#
# Days that already have a published entry are skipped. Each day is a full run
# — survey, agent, validate, sign, pull request — and they are serialised by the
# runner's own lock, so this waits rather than colliding with a nightly run.
set -uo pipefail
REPO=$(cd "$(dirname "$0")/.." && pwd)
start=${1:?usage: backfill-range.sh START END}
end=${2:?usage: backfill-range.sh START END}

d=$start
while :; do
  if [ -d "$REPO/posts/$d" ] && [ -n "$(git -C "$REPO" ls-files -- "posts/$d")" ]; then
    echo "=== $d already published, skipping ==="
  else
    # Wait for any run in flight; the lock would otherwise just fail this day.
    while pgrep -f 'nightly-diary\.sh' >/dev/null 2>&1; do
      echo "waiting for the run in flight before starting $d"
      sleep 60
    done
    echo "=== $d starting $(date '+%T') ==="
    /bin/bash "$REPO/bin/nightly-diary.sh" "$d" || echo "=== $d did not publish ==="
  fi
  [ "$d" = "$end" ] && break
  d=$(date -j -v+1d -f %Y-%m-%d "$d" +%F 2>/dev/null) || break
done
echo "=== backfill finished $(date '+%F %T') ==="
