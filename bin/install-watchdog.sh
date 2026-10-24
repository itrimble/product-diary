#!/usr/bin/env bash
# Install the diary watchdog. Run ON the Mac mini, from the repo checkout:  bash bin/install-watchdog.sh
set -euo pipefail
REPO=$(cd "$(dirname "$0")/.." && pwd)
LABEL=com.ian.product-diary-watchdog
DEST="$HOME/Library/LaunchAgents/$LABEL.plist"
mkdir -p "$HOME/bin" "$HOME/Library/Logs/product-diary" "$HOME/Library/LaunchAgents"
[ -x "$HOME/bin/notify.sh" ] || { echo "~/bin/notify.sh (the shared ntfy wrapper) is missing" >&2; exit 1; }
install -m 755 "$REPO/bin/diary-watchdog.sh" "$HOME/bin/product-diary-watchdog.sh"
install -m 644 "$REPO/bin/$LABEL.plist" "$DEST"
plutil -lint "$DEST" >/dev/null
launchctl bootout "gui/$(id -u)/$LABEL" 2>/dev/null || true
launchctl bootstrap "gui/$(id -u)" "$DEST"
launchctl print "gui/$(id -u)/$LABEL" | grep -E 'state|runs' | head -3
echo "installed $LABEL (07:30 and 23:30). Test: bash ~/bin/product-diary-watchdog.sh morning"
