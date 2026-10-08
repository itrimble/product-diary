#!/usr/bin/env bash
# Which projects changed on a given day. Writes logs/surveys/<date>.tsv, one
# line per project folder, and prints the folders that changed.
#
#   bin/survey-day.sh 2026-10-04
#
# This is a script rather than instructions in the prompt for three reasons: a
# sequential survey took 49 minutes and never finished, the parallel one-liner
# it replaced blew xargs' argument limit, and several project folders have
# spaces in their names. It also means every provider surveys identically, so
# the only thing the model contributes is the prose.
set -uo pipefail

REPO=$(cd "$(dirname "$0")/.." && pwd)
PROJECTS=${DIARY_PROJECTS_DIR:-/Volumes/nas/projects}

# Re-entrant worker: one folder, one line of TSV.
if [ "${1:-}" = "--one" ]; then
  date=$2 dir=$3
  name=$(basename "$dir")
  next=$(date -j -v+1d -f %Y-%m-%d "$date" +%F 2>/dev/null) || next=$date
  # Both boundaries must be explicit midnights. `git log --since=2026-10-04`
  # means "2026-10-04 at the current time of day", so a run at 11:34 on the 5th
  # counted the 5th's commits as the 4th's. Found by the agent, which refused to
  # write entries for commits whose dates did not match the day it was given.
  # Space, not "T". BSD find's -newermt silently misparses the ISO-8601
  # "2026-10-07T00:00:00" form and lands the boundary far in the past, so the
  # window swallowed earlier days: the 2026-10-07 survey reported 22 changed
  # files in snapdog that were all stamped 2026-10-06 16:37. Measured on this
  # machine: -newermt '2026-10-07' and '2026-10-07 00:00:00' both matched 1
  # file, '2026-10-07T00:00:00' matched 61. git parses either form identically,
  # so one space-separated string serves both find and git log.
  from="${date} 00:00:00"
  to="${next} 00:00:00"
  # A timeout must never look like "no commits". Piping straight into wc -l
  # turns a killed git into a confident zero, which is how eight commits in
  # snapdog disappeared from the 2026-10-01 survey. Capture the status, retry
  # once with more room, and say "error" rather than guess.
  gitcount() {
    local out rc
    out=$(timeout "$1" git -C "$dir" log --all --since="$from" --until="$to" --oneline 2>/dev/null)
    rc=$?
    [ $rc -ne 0 ] && return $rc
    printf '%s' "$out" | grep -c . || true
  }

  if [ -d "$dir/.git" ]; then
    n=$(gitcount 25)
    if [ $? -ne 0 ]; then
      n=$(gitcount 90)
      if [ $? -ne 0 ]; then
        # The repo is there but git cannot walk it — a corrupt ref, a bad HEAD,
        # an interrupted operation. Fall back to file dates so the day still gets
        # a signal, and say why the commit count is missing.
        m=$(timeout 60 find "$dir" -maxdepth 3 -type f -newermt "$from" ! -newermt "$to" \
              -not -path '*/.git/*' -not -path '*/node_modules/*' -not -path '*/dist/*' \
              -not -path '*/build/*' 2>/dev/null | wc -l | tr -d ' ')
        printf '%s\tfiles:%s\tgit:unreadable\n' "$name" "${m:-0}"
        exit 0
      fi
    fi
    n=${n:-0}
    if [ "$n" = 0 ]; then
      # Uncommitted edits are still a day's work, and are the easiest thing to miss.
      dirty=$(timeout 25 git -C "$dir" status --porcelain 2>/dev/null | wc -l | tr -d ' ')
      mod=0
      if [ "${dirty:-0}" -gt 0 ]; then
        mod=$(timeout 25 find "$dir" -maxdepth 3 -type f -newermt "$from" ! -newermt "$to" \
                -not -path '*/.git/*' -not -path '*/node_modules/*' 2>/dev/null | wc -l | tr -d ' ')
      fi
      if [ "${mod:-0}" -gt 0 ]; then
        printf '%s\tcommits:0\tdirty:%s\tmtime:%s\n' "$name" "${dirty:-0}" "$mod"
      else
        # A dirty tree whose files were not touched on this date is old work in
        # progress, not this day's. Reporting it invites an invented entry.
        printf '%s\tcommits:0\n' "$name"
      fi
    else
      printf '%s\tcommits:%s\n' "$name" "$n"
    fi
  else
    n=$(timeout 30 find "$dir" -maxdepth 3 -type f -newermt "$from" ! -newermt "$to" \
          -not -path '*/node_modules/*' -not -path '*/.git/*' -not -path '*/dist/*' \
          -not -path '*/build/*' -not -path '*/Pods/*' -not -path '*/DerivedData/*' \
          -not -path '*/.venv/*' -not -path '*/__pycache__/*' 2>/dev/null | wc -l | tr -d ' ')
    printf '%s\tfiles:%s\n' "$name" "${n:-0}"
  fi
  exit 0
fi

date=${1:-$(date -v-1d +%F)}
case "$date" in [0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]) ;; *) echo "usage: survey-day.sh YYYY-MM-DD" >&2; exit 2 ;; esac
out="$REPO/logs/surveys/$date.tsv"
mkdir -p "$(dirname "$out")"

# NUL-delimited: folder names contain spaces.
find "$PROJECTS" -mindepth 1 -maxdepth 1 -type d -not -name '.*' -not -name product-diary -print0 \
  | xargs -0 -P 12 -n 1 "$0" --one "$date" \
  | sort > "$out"

total=$(wc -l < "$out" | tr -d ' ')
# error rows are listed too: an unreadable repo is something to account for, not
# something to drop.
changed=$(grep -vE '\tcommits:0$|\tfiles:0$' "$out" || true)
echo "surveyed $total folders for $date -> logs/surveys/$date.tsv"
if [ -n "$changed" ]; then
  echo "changed:"
  echo "$changed" | sed 's/^/  /'
else
  echo "changed: none"
fi
