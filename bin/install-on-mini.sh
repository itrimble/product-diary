#!/usr/bin/env bash
# Install the nightly diary on the Mac mini. Run this from any Mac that can SSH
# to it; everything it installs lives on the mini and on the NAS, so the diary
# keeps running whether or not this Mac is awake.
#
#   bin/install-on-mini.sh [ssh-host]
#
# Default host is the mini's Tailscale address. Pass another (e.g. aimacmini) to
# go over the LAN.
set -euo pipefail

HOST=${1:-100.120.153.82}
USER_AT=${HOST%%@*}; [ "$USER_AT" = "$HOST" ] && HOST="ian@$HOST"
REPO=/Volumes/nas/projects/product-diary
LABEL=com.ian.product-diary

echo "--- reaching $HOST ---"
ssh -o ConnectTimeout=10 "$HOST" true || {
  echo "Cannot reach $HOST. Bring the mini online, then re-run." >&2
  exit 1
}

echo "--- checking prerequisites on the mini ---"
ssh "$HOST" bash -s <<'REMOTE'
set -uo pipefail
ok=1
for d in /opt/homebrew/bin /usr/local/bin "$HOME/.local/bin"; do
  [ -d "$d" ] && PATH="$d:$PATH"
done
if ! command -v node >/dev/null && [ -d "$HOME/.nvm/versions/node" ]; then
  PATH="$(ls -d "$HOME"/.nvm/versions/node/*/bin | sort -V | tail -1):$PATH"
fi
export PATH
for t in claude node npm git; do
  if command -v "$t" >/dev/null; then echo "  ok   $t -> $(command -v $t)"
  else echo "  MISS $t"; ok=0; fi
done
if [ -f /Volumes/nas/projects/PROJECTS.md ]; then echo "  ok   NAS mounted"
else echo "  MISS NAS not mounted at /Volumes/nas"; ok=0; fi
if [ -d /Volumes/nas/projects/product-diary/.git ]; then echo "  ok   diary repo visible"
else echo "  MISS diary repo"; ok=0; fi
# A headless agent cannot log in interactively, so Claude must already be authed.
if claude -p 'reply with the single word ready' --allowedTools 2>/dev/null | grep -qi ready
then echo "  ok   claude authenticated"
else echo "  WARN claude may not be authenticated — run 'claude' once on the mini and sign in"; fi
[ $ok -eq 1 ] || { echo "Prerequisites missing; fix the MISS lines above first." >&2; exit 1; }
REMOTE

echo "--- installing the LaunchAgent ---"
ssh "$HOST" "mkdir -p ~/Library/LaunchAgents && cp '$REPO/bin/$LABEL.plist' ~/Library/LaunchAgents/$LABEL.plist && plutil -lint ~/Library/LaunchAgents/$LABEL.plist"
# bootout first so a re-run is an upgrade rather than an error.
ssh "$HOST" "launchctl bootout gui/\$(id -u)/$LABEL 2>/dev/null; launchctl bootstrap gui/\$(id -u) ~/Library/LaunchAgents/$LABEL.plist && launchctl print gui/\$(id -u)/$LABEL | sed -n '1,6p;/next fire/p'"

echo
echo "Installed. The diary now runs on the mini at 00:12 local, on its own."
echo "Run one now:   ssh $HOST 'launchctl kickstart -p gui/\$(id -u)/$LABEL'"
echo "Watch the log: ssh $HOST 'tail -f $REPO/logs/\$(date -v-1d +%F).log'"
