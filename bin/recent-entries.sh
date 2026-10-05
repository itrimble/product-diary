#!/usr/bin/env bash
# What this diary has already said about a project.
#
#   bin/recent-entries.sh <project-slug> [count]   # default 3, most recent first
#
# Each night starts with no memory of the last one, so without this the diary
# re-introduces the same project every time and can contradict what it already
# published. Read this before writing about a project.
set -uo pipefail
REPO=$(cd "$(dirname "$0")/.." && pwd)
slug=${1:?usage: recent-entries.sh <project-slug> [count]}
count=${2:-3}

found=0
for f in $(ls -1 "$REPO/posts"/*/"$slug.md" 2>/dev/null | sort -r | head -"$count"); do
  date=$(basename "$(dirname "$f")")
  echo "=== $date ==="
  cat "$f"
  echo
  found=$((found + 1))
done
[ "$found" = 0 ] && echo "No previous entries for $slug. This is its first appearance."
exit 0
