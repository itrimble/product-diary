#!/usr/bin/env bash
# Local entry point for the nightly diary on the Mac mini.
#
# launchd is installed against THIS file, on the mini's internal disk, because a
# job whose stdout, working directory or program lives on the SMB mount fails to
# set up at all (exit 78, EX_CONFIG). Everything launchd touches is therefore
# local; this wrapper waits for the NAS and then hands off to the real runner.
set -uo pipefail

# ~/projects is the source of truth; the NAS is a backup. ROOT is both the
# projects tree the diary reads and the checkout it runs from, so the two can
# never drift apart.
ROOT=${DIARY_ROOT:-$HOME/projects}
# Back-compat: DIARY_NAS used to select the root as $DIARY_NAS/projects.
[ -n "${DIARY_NAS:-}" ] && ROOT=$DIARY_NAS/projects
REPO=$ROOT/product-diary
export DIARY_PROJECTS_DIR=${DIARY_PROJECTS_DIR:-$ROOT}
LOCAL_LOG=$HOME/Library/Logs/product-diary
mkdir -p "$LOCAL_LOG"
exec >> "$LOCAL_LOG/wrapper.log" 2>&1
echo "=== wrapper $(date '+%F %T %Z') on $(hostname -s) ==="

MARKER=$ROOT/PROJECTS.md
readable() { head -c 1 "$MARKER" >/dev/null 2>&1; }

# Only a network root can be late to appear or silently unreadable, so the wait
# and the TCC diagnosis apply only there. A local root is either present or
# genuinely wrong, and waiting two minutes would just delay saying so.
if df -T nfs,smbfs,afpfs "$ROOT" >/dev/null 2>&1; then
  # After a reboot the login session can reach launchd before the share is
  # remounted, so give it a couple of minutes rather than reporting a quiet day.
  for i in $(seq 1 24); do
    readable && break
    [ "$i" = 1 ] && echo "waiting for $ROOT to mount..."
    sleep 5
  done
  if ! readable; then
    # A stat can succeed on a path the process may not read, so tell the two
    # failures apart: TCC denial looks exactly like a quiet day otherwise.
    if [ -f "$MARKER" ]; then
      cat <<MSG
ABORT: $ROOT is mounted but this process cannot read it.

macOS gates network volumes behind TCC per binary, and the grant is recorded
against Homebrew node's versioned Cellar path. A \`brew upgrade node\` revokes it.
Re-grant it by running the job once from a granted context, or add the new node
to System Settings > Privacy & Security > Full Disk Access:

  sqlite3 ~/Library/Application\\ Support/com.apple.TCC/TCC.db \\
    'select client from access where service="kTCCServiceSystemPolicyNetworkVolumes";'
MSG
    else
      echo "ABORT: $ROOT not mounted after 2 minutes; skipping tonight"
    fi
    exit 1
  fi
  echo "$ROOT (network) readable; handing off to the runner"
else
  if ! readable; then
    echo "ABORT: $ROOT has no readable PROJECTS.md - wrong DIARY_ROOT?"
    exit 1
  fi
  echo "$ROOT (local) readable; handing off to the runner"
fi

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
# Not exec: the backfill below has to run after the night's own entry.
/bin/bash "$REPO/bin/nightly-diary.sh" "$@"
rc=$?

# The runner only ever writes about one date. If the mini was asleep at 00:12 or
# a run aborted, that day is lost and nothing says so. On the scheduled run (no
# date argument) fill in up to two recent holes, oldest first, so a gap closes
# over a couple of nights instead of staying open forever.
if [ $# -eq 0 ]; then
  missed=$(bash "$REPO/bin/missing-days.sh" 7 2>/dev/null | head -2)
  if [ -n "$missed" ]; then
    echo "=== missed days to backfill: $(echo "$missed" | tr '\n' ' ')==="
    for d in $missed; do
      echo "=== backfilling $d ==="
      /bin/bash "$REPO/bin/nightly-diary.sh" "$d" || echo "backfill for $d did not publish"
    done
  fi
fi
exit $rc
