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
if timeout 90 claude -p 'reply with only the word ready' 2>/dev/null | grep -qi ready
then echo "  ok   claude authenticated"
else echo "  WARN claude may not be authenticated — run 'claude' once on the mini and sign in"; fi
# launchd runs node as the job's program precisely because node holds the
# network-volume grant; without it the job cannot read the NAS at all.
nodereal=$(readlink -f "$(command -v node)" 2>/dev/null)
if sqlite3 "$HOME/Library/Application Support/com.apple.TCC/TCC.db" \
     'select client from access where service="kTCCServiceSystemPolicyNetworkVolumes" and auth_value=2;' 2>/dev/null \
     | grep -qxF "$nodereal"
then echo "  ok   node holds the network-volume grant"
else echo "  WARN $nodereal has no network-volume grant; the job cannot read /Volumes/nas."
     echo "       Add it under System Settings > Privacy & Security > Full Disk Access."
fi
# The agent runs under launchd, which cannot reach the login keychain, so a
# long-lived token is required rather than an interactive login.
if [ -f "$HOME/.config/product-diary/env" ]; then
  if [ "$(stat -f '%Lp' "$HOME/.config/product-diary/env")" = 600 ]; then
    echo "  ok   headless token file present"
  else
    echo "  WARN ~/.config/product-diary/env is not mode 600; the runner will refuse it"
  fi
else
  echo "  WARN no ~/.config/product-diary/env — the nightly agent cannot authenticate."
  echo "       On the mini: claude setup-token, then write CLAUDE_CODE_OAUTH_TOKEN=<token>"
  echo "       into ~/.config/product-diary/env and chmod 600 it."
fi
[ $ok -eq 1 ] || { echo "Prerequisites missing; fix the MISS lines above first." >&2; exit 1; }
REMOTE

echo "--- installing the local wrapper and LaunchAgent ---"
# The wrapper goes on the internal disk: launchd refuses to set up a job whose
# program, stdout or working directory sits on the SMB mount (exit 78).
ssh "$HOST" "mkdir -p ~/bin ~/Library/Logs/product-diary ~/Library/LaunchAgents \
  && cp '$REPO/bin/mini-wrapper.sh' ~/bin/product-diary-run.sh \
  && cp '$REPO/bin/mini-launch.js' ~/bin/product-diary-launch.js \
  && chmod +x ~/bin/product-diary-run.sh ~/bin/product-diary-launch.js \
  && cp '$REPO/bin/$LABEL.plist' ~/Library/LaunchAgents/$LABEL.plist \
  && plutil -lint ~/Library/LaunchAgents/$LABEL.plist"
# bootout first so a re-run is an upgrade rather than an error.
ssh "$HOST" "launchctl bootout gui/\$(id -u)/$LABEL 2>/dev/null; launchctl bootstrap gui/\$(id -u) ~/Library/LaunchAgents/$LABEL.plist && launchctl print gui/\$(id -u)/$LABEL | sed -n '1,6p;/next fire/p'"

echo
echo "Installed. The diary now runs on the mini at 00:12 local, on its own."
echo "Run one now:   ssh $HOST 'launchctl kickstart -p gui/\$(id -u)/$LABEL'"
echo "Watch the log: ssh $HOST 'tail -f $REPO/logs/\$(date -v-1d +%F).log'"
echo "Wrapper log:   ssh $HOST 'tail -f ~/Library/Logs/product-diary/wrapper.log'"
