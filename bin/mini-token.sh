#!/usr/bin/env bash
# Capture a long-lived Claude token into the file the nightly job reads.
#
# Run this ON the mini, in a real terminal:  bash ~/bin/product-diary-token
#
# Needed because launchd cannot reach the login keychain, so the interactive
# OAuth login that works over SSH is invisible to the nightly job.
set -euo pipefail

ENVDIR=$HOME/.config/product-diary
ENVFILE=$ENVDIR/env
mkdir -p "$ENVDIR"
chmod 700 "$ENVDIR"

for d in "$HOME/.local/bin" /opt/homebrew/bin; do
  [ -d "$d" ] && PATH="$d:$PATH"
done
export PATH

echo "1/2  Starting 'claude setup-token'. Authorize in the browser, then copy the token."
echo
claude setup-token
echo
echo "2/2  Paste the token below. It is not echoed, and is written only to"
echo "     $ENVFILE (mode 600)."
printf '     token: '
read -rs token
echo
[ -n "$token" ] || { echo "Nothing pasted; leaving $ENVFILE untouched." >&2; exit 1; }

umask 077
printf 'CLAUDE_CODE_OAUTH_TOKEN=%s\n' "$token" > "$ENVFILE"
chmod 600 "$ENVFILE"
unset token
echo "Saved. Verifying the nightly job can authenticate..."

# Prove it works in a non-interactive context before trusting it tonight.
if ( set -a; . "$ENVFILE"; set +a; timeout 90 claude -p 'reply with only the word ready' </dev/null 2>&1 ) | grep -qi ready
then echo "OK — the token authenticates."
else echo "WARNING — the token did not authenticate. Re-run this script." >&2; exit 1
fi
