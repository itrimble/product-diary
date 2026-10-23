#!/bin/bash
# Off-box check for the nightly diary. Runs on the NAS (always on, independent of the Mac mini and of
# whoever is logged in there), from a systemd user timer at 08:30 Central. User cron is not available on the
# NAS (the spool is root-only), and the account lingers, so the timer runs without a login:
#
#   ~/.config/systemd/user/diary-offbox.timer    OnCalendar=*-*-* 08:30:00, Persistent=true
#   ~/.config/systemd/user/diary-offbox.service  Type=oneshot, ExecStart=/bin/bash %h/bin/diary-offbox-check.sh,
#                                                output appended to ~/diary-offbox.log
#   enable with: systemctl --user daemon-reload && systemctl --user enable --now diary-offbox.timer
#
# It reads only the public site, so it needs no projects, no node and no keys: just curl and the ntfy
# topic in ~/.config/ntfy-topic (mode 600). It stays quiet when yesterday's diary is live, because the
# mini's own watchdog already sends the daily OK. It speaks only when something is missing, which is
# exactly the case where the mini cannot be trusted to speak for itself.
#
# Overrides for testing: OFFBOX_DATE=YYYY-MM-DD.
set -uo pipefail
SITE=https://blog.remnantsecurity.com
TOPIC_FILE=${NTFY_TOPIC_FILE:-$HOME/.config/ntfy-topic}
DAY=${OFFBOX_DATE:-$(TZ=America/Chicago date -d yesterday +%F)}
STORY_FROM=2026-10-23
now() { TZ=America/Chicago date '+%F %T'; }

code() { local c i; for i in 1 2 3; do c=$(curl -s -o /dev/null -m 20 -w '%{http_code}' "$1"); [ "$c" = 200 ] && break; sleep 30; done; echo "$c"; }
alert() { # title priority tags message
  local topic; topic=$(tr -d '[:space:]' < "$TOPIC_FILE" 2>/dev/null)
  [ -n "$topic" ] || { echo "$(now) no ntfy topic in $TOPIC_FILE; cannot alert: $1: $4"; return 1; }
  curl -s -S -m 20 -H "Title: $1" -H "Priority: $2" -H "Tags: $3" -d "$4" "https://ntfy.sh/$topic" >/dev/null \
    || echo "$(now) ntfy delivery failed"
}

problems=()
c=$(code "$SITE/$DAY/")
[ "$c" = 200 ] || problems+=("$DAY is not on the site (HTTP $c)")
if [ "$c" = 200 ] && [[ "$DAY" > "$STORY_FROM" || "$DAY" = "$STORY_FROM" ]]; then
  page=$(curl -s -m 20 "$SITE/$DAY/")
  if echo "$page" | grep -q 'class="story' && ! echo "$page" | grep -q 'category/daily-stories'; then
    alert "Diary $DAY: no Daily Story" default warning "Off-box check: $DAY is live but has no Daily Story."
    echo "$(now) $DAY live, no story"
  fi
fi
feed=$(curl -s -m 20 -o /dev/null -w '%{http_code}' "$SITE/feed.xml"); [ "$feed" = 200 ] || problems+=("feed.xml returns HTTP $feed")

if [ ${#problems[@]} -gt 0 ]; then
  alert "Diary MISSING for $DAY (off-box check)" high rotating_light "$(printf '%s\n' "${problems[@]}")
Checked from the NAS at $(now). The mini may be off, logged out, or its job failed; its own watchdog could not be trusted to say so."
  echo "$(now) ALERT: ${problems[*]}"
  exit 1
fi
echo "$(now) $DAY live"
