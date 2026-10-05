#!/usr/bin/env bash
# Local entry point for the nightly diary on the Mac mini.
#
# launchd is installed against THIS file, on the mini's internal disk, because a
# job whose stdout, working directory or program lives on the SMB mount fails to
# set up at all (exit 78, EX_CONFIG). Everything launchd touches is therefore
# local; this wrapper waits for the NAS and then hands off to the real runner.
set -uo pipefail

NAS=${DIARY_NAS:-/Volumes/nas}
REPO=$NAS/projects/product-diary
LOCAL_LOG=$HOME/Library/Logs/product-diary
mkdir -p "$LOCAL_LOG"
exec >> "$LOCAL_LOG/wrapper.log" 2>&1
echo "=== wrapper $(date '+%F %T %Z') on $(hostname -s) ==="

# After a reboot the login session can reach launchd before the share is
# remounted, so give it a couple of minutes rather than reporting a quiet day.
MARKER=$NAS/projects/PROJECTS.md
readable() { head -c 1 "$MARKER" >/dev/null 2>&1; }
for i in $(seq 1 24); do
  readable && break
  [ "$i" = 1 ] && echo "waiting for $NAS to mount..."
  sleep 5
done
if ! readable; then
  # A stat can succeed on a path the process may not read, so tell the two
  # failures apart: TCC denial looks exactly like a quiet day otherwise.
  if [ -f "$MARKER" ]; then
    cat <<'MSG'
ABORT: /Volumes/nas is mounted but this process cannot read it.

macOS gates network volumes behind TCC per binary, and the grant is recorded
against Homebrew node's versioned Cellar path. A `brew upgrade node` revokes it.
Re-grant it by running the job once from a granted context, or add the new node
to System Settings > Privacy & Security > Full Disk Access:

  sqlite3 ~/Library/Application\ Support/com.apple.TCC/TCC.db \
    'select client from access where service="kTCCServiceSystemPolicyNetworkVolumes";'
MSG
  else
    echo "ABORT: $NAS not mounted after 2 minutes; skipping tonight"
  fi
  exit 1
fi
echo "$NAS readable; handing off to the runner"

# Claude's OAuth login lives in the login keychain, whose ACLs do not admit a
# LaunchAgent: `claude -p` there fails with "OAuth session expired and could not
# be refreshed" even while the same command works over SSH. A long-lived token
# from `claude setup-token` sidesteps the keychain entirely. Keep it in this file,
# never in the repo.
ENVFILE=$HOME/.config/product-diary/env
if [ -f "$ENVFILE" ]; then
  perms=$(stat -f '%Lp' "$ENVFILE")
  if [ "$perms" != "600" ]; then
    echo "refusing to read $ENVFILE: mode $perms, want 600 (chmod 600 it)"
    exit 1
  fi
  set -a; . "$ENVFILE"; set +a
  if [ -n "${CLAUDE_CODE_OAUTH_TOKEN:-}" ]; then
    echo "using CLAUDE_CODE_OAUTH_TOKEN from $ENVFILE"
  elif [ -n "${ANTHROPIC_API_KEY:-}" ]; then
    echo "using ANTHROPIC_API_KEY from $ENVFILE"
  else
    echo "warn: $ENVFILE sets neither CLAUDE_CODE_OAUTH_TOKEN nor ANTHROPIC_API_KEY"
  fi
else
  cat <<MSG
warn: no $ENVFILE — the agent will probably fail to authenticate.
      On the mini, run:  claude setup-token
      then:              mkdir -p ~/.config/product-diary
                         printf 'CLAUDE_CODE_OAUTH_TOKEN=%s\n' "<token>" > $ENVFILE
                         chmod 600 $ENVFILE
MSG
fi
exec /bin/bash "$REPO/bin/nightly-diary.sh" "$@"
