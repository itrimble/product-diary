#!/usr/bin/env bash
# Days in the recent past with no published entry.
#
#   bin/missing-days.sh [days-back]     # default 7
#
# The runner only ever writes about yesterday. If the mini was asleep at 00:12,
# or a run aborted, that day is simply lost and nothing says so. This lists the
# holes, oldest first, so they can be filled.
set -uo pipefail
REPO=$(cd "$(dirname "$0")/.." && pwd)
back=${1:-7}

# Never claim a hole from before the diary existed.
first=$(git -C "$REPO" log --reverse --format=%ad --date=short -- posts 2>/dev/null | head -1)
[ -n "$first" ] || first=$(git -C "$REPO" log --reverse --format=%ad --date=short 2>/dev/null | head -1)

for i in $(seq "$back" -1 1); do
  d=$(date -v-"${i}"d +%F 2>/dev/null) || continue
  [ -n "$first" ] && [ "$d" \< "$first" ] && continue
  [ -d "$REPO/posts/$d" ] && continue
  echo "$d"
done
