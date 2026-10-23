#!/bin/bash
# Phone alerts (ntfy) for the nightly diary, and a pre-flight that heals the failure that skipped 2026-10-22.
#
#   diary-watchdog.sh [morning|canary|auto]      auto = canary after 18:00, morning before
#
# Runs on the Mac mini under launchd at 07:30 and 23:30 (bin/install-watchdog.sh). It deliberately needs
# no NAS access and no node: only curl, launchctl and the shared ~/bin/notify.sh, so it still works on the
# night the diary job cannot start (a Homebrew node upgrade invalidates the job's launch permission).
#
#   morning  is yesterday's day live on the site? did the job launch? is the Daily Story there?
#            Alerts at high priority with a diagnosis, or sends one quiet "OK" line. A missing OK is
#            itself the sign that the watchdog is down.
#   canary   will tonight's 00:12 run start? Detects node having changed since the last good run, a bad
#            signature, a job stuck in "spawn failed", a missing token, a logged-out gh or a full disk.
#            It reloads the launch agent when that is the fix, and says so.
#
# Overrides for testing: WATCHDOG_DATE=YYYY-MM-DD (the day to judge), WATCHDOG_NO_HEAL=1.
set -uo pipefail
export PATH="/opt/homebrew/bin:/usr/local/bin:$HOME/.local/bin:$HOME/bin:/usr/bin:/bin:/usr/sbin:/sbin"

LABEL=com.ian.product-diary
PLIST="$HOME/Library/LaunchAgents/$LABEL.plist"
SITE=https://blog.remnantsecurity.com
LAUNCHLOG=${WATCHDOG_LAUNCHLOG:-$HOME/Library/Logs/product-diary/launch.log}
REPO="$HOME/projects/product-diary"
NOTIFY="$HOME/bin/notify.sh"
GUI="gui/$(id -u)"
STORY_FROM=2026-10-23   # the first night that runs the story pass

MODE=${1:-auto}
if [ "$MODE" = auto ]; then [ "$(date +%H)" -ge 18 ] && MODE=canary || MODE=morning; fi
DAY=${WATCHDOG_DATE:-$(date -v-1d +%F)}

problems=()
notes=()
say() { echo "$(date '+%F %T') [$MODE] $*"; }
problem() { problems+=("$1"); say "PROBLEM: $1"; }

send() { # title priority tags message
  if [ -x "$NOTIFY" ]; then "$NOTIFY" -t "$1" -p "$2" -g "$3" "$4" || say "ntfy delivery failed"
  else say "no $NOTIFY; would have sent: $1 / $4"; fi
}

job_state() { launchctl print "$GUI/$LABEL" 2>&1; }
last_launch_epoch() {
  local t; t=$(awk '$2=="launch"{t=$3} END{print t}' "$LAUNCHLOG" 2>/dev/null)
  [ -n "$t" ] && date -j -u -f "%Y-%m-%dT%H:%M:%S" "${t%%.*}" +%s 2>/dev/null || echo 0
}
last_good_node() { awk '$2=="launch"{p=$5} $2=="exit" && $3=="0"{g=p} END{print g}' "$LAUNCHLOG" 2>/dev/null; }
http_code() { local c i; for i in 1 2 3; do c=$(curl -s -o /dev/null -m 20 -w '%{http_code}' "$1"); [ "$c" = 200 ] && break; sleep 20; done; echo "$c"; }
reload_agent() {
  [ -n "${WATCHDOG_NO_HEAL:-}" ] && return 1
  launchctl bootout "$GUI/$LABEL" 2>/dev/null; sleep 2
  launchctl bootstrap "$GUI" "$PLIST" 2>&1 || return 1
  ! job_state | grep -q "spawn failed"
}
diagnosis() {
  echo "node: $(readlink -f /opt/homebrew/bin/node 2>/dev/null) ($(node -v 2>/dev/null))"
  echo "last good launch used: $(last_good_node)"
  echo "job: $(job_state | grep -E 'job state|last exit' | tr -s '\t ' ' ' | paste -sd';' -)"
  echo "last log lines:"; tail -n 4 "$REPO/logs/$DAY.log" 2>/dev/null | cut -c1-160
}

# ------------------------------------------------------------------------------------------------
if [ "$MODE" = morning ]; then
  code=$(http_code "$SITE/$DAY/")
  [ "$code" = 200 ] || problem "$DAY is not on the site (HTTP $code)"

  age=$(( $(date +%s) - $(last_launch_epoch) ))
  [ "$age" -lt $((14*3600)) ] || problem "the job has not launched in $((age/3600))h"

  st=$(job_state)
  echo "$st" | grep -q "spawn failed" && problem "launchd says spawn failed ($(echo "$st" | grep 'last exit reason' | tr -s '\t ' ' '))"

  if [ "$code" = 200 ] && [[ "$DAY" > "$STORY_FROM" || "$DAY" = "$STORY_FROM" ]]; then
    page=$(curl -s -m 20 "$SITE/$DAY/")
    if echo "$page" | grep -q 'class="story'; then
      echo "$page" | grep -q 'category/daily-stories' || notes+=("no Daily Story for $DAY (entries published; the story pass was dropped or timed out)")
    fi
  fi

  if [ ${#problems[@]} -gt 0 ]; then
    body=$(printf '%s\n' "${problems[@]}"; echo; diagnosis; echo; echo "Fix: ssh aimacmini, then launchctl bootout/bootstrap $LABEL and: launchctl kickstart $GUI/$LABEL (writes yesterday).")
    send "Diary MISSING for $DAY" high rotating_light "$body"
    exit 1
  fi
  n=$(curl -s -m 20 "$SITE/search.json" | grep -o "\"d\":\"$DAY\"" | wc -l | tr -d ' ')
  if [ ${#notes[@]} -gt 0 ]; then
    send "Diary $DAY live, story missing" default warning "$n posts live. $(printf '%s ' "${notes[@]}")"
  else
    send "Diary OK $DAY" low white_check_mark "$n posts live on the site."
  fi
  exit 0
fi

# ------------------------------------------------------------------------------------------------
st=$(job_state)
echo "$st" | grep -q "Could not find service" && problem "the launch agent is not loaded"
cur=$(readlink -f /opt/homebrew/bin/node 2>/dev/null)
good=$(last_good_node)
heal=0
if [ -z "$cur" ] || [ ! -x "$cur" ]; then problem "node is missing at /opt/homebrew/bin/node"
else
  codesign --verify "$cur" 2>/dev/null || { problem "node's code signature is not valid ($cur)"; heal=1; }
  if [ -n "$good" ] && [ "$good" != "$cur" ]; then
    problem "node changed since the last good run: $good -> $cur (its launch and NAS permission may not carry over)"; heal=1
  fi
fi
echo "$st" | grep -q "spawn failed" && { problem "the job is stuck in spawn failed"; heal=1; }
[ -s "$HOME/.config/product-diary/env" ] && grep -q '^CLAUDE_CODE_OAUTH_TOKEN=.\+' "$HOME/.config/product-diary/env" || problem "no CLAUDE_CODE_OAUTH_TOKEN in ~/.config/product-diary/env"
gh auth status >/dev/null 2>&1 || problem "gh is not logged in, so the diary cannot open or merge its pull request"
command -v claude >/dev/null || problem "the claude command is not on PATH"
[ -f "$HOME/projects/PROJECTS.md" ] || problem "~/projects/PROJECTS.md is missing"
free=$(df -g / | awk 'NR==2{print $4}'); [ "${free:-0}" -ge 5 ] || problem "only ${free:-?} GB free on the startup disk"
curl -s -o /dev/null -m 15 https://api.github.com || problem "cannot reach GitHub"

if [ ${#problems[@]} -gt 0 ]; then
  healed="not attempted"
  if [ "$heal" = 1 ]; then
    if reload_agent; then healed="reloaded the launch agent; unproven until the 00:12 run starts"; else healed="reload failed or disabled"; fi
  fi
  body=$(printf '%s\n' "${problems[@]}"; echo; echo "Self-heal: $healed"; echo; diagnosis)
  send "Diary pre-flight: tonight may fail" high warning "$body"
  exit 1
fi
say "pre-flight clean (node $cur)"
exit 0
