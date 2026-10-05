#!/usr/bin/env bash
# Sign, or verify, one day's published entries.
#
#   bin/attest-day.sh sign   2026-10-04
#   bin/attest-day.sh verify 2026-10-04
#
# Why this exists: the survey receipts that prove a day was really looked at live
# only on the NAS and are never committed, so CI cannot check them. Anything else
# holding a GitHub token — a stray cloud agent, a scheduled task nobody can find —
# could otherwise push a fabricated entry straight to main.
#
# The private key lives only on the Mac mini (bin/mini-attest-setup.sh puts it
# there). The public key is committed in .github/allowed_signers. So a day can
# only be published by a run on the machine that can actually see the projects,
# and nothing secret is ever given to GitHub.
set -uo pipefail

REPO=$(cd "$(dirname "$0")/.." && pwd)
KEY=${DIARY_ATTEST_KEY:-$HOME/.config/product-diary/attest_key}
SIGNERS="$REPO/.github/allowed_signers"
NAMESPACE=product-diary

usage() { echo "usage: attest-day.sh {sign|verify} YYYY-MM-DD" >&2; exit 2; }
[ $# -eq 2 ] || usage
mode=$1 date=$2
case "$date" in [0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]) ;; *) usage ;; esac

DAY="$REPO/posts/$date"
[ -d "$DAY" ] || { echo "no such day: posts/$date" >&2; exit 1; }

# The manifest is every published file of that day with its hash, sorted, so the
# signature covers exactly what is served and nothing else.
manifest() {
  cd "$DAY" || exit 1
  find . -type f ! -name '.attest' ! -name '.attest.sig' \
    | LC_ALL=C sort \
    | while IFS= read -r f; do
        printf '%s  %s\n' "$(shasum -a 256 "$f" | awk '{print $1}')" "${f#./}"
      done
}

case "$mode" in
  sign)
    [ -f "$KEY" ] || { echo "no signing key at $KEY — run bin/mini-attest-setup.sh on the mini" >&2; exit 1; }
    manifest > "$DAY/.attest"
    ssh-keygen -Y sign -f "$KEY" -n "$NAMESPACE" "$DAY/.attest" >/dev/null 2>&1 \
      || { echo "ssh-keygen could not sign $DAY/.attest" >&2; exit 1; }
    mv "$DAY/.attest.sig" "$DAY/.attest.sig.tmp" 2>/dev/null
    mv "$DAY/.attest.sig.tmp" "$DAY/.attest.sig" 2>/dev/null
    echo "signed posts/$date ($(wc -l < "$DAY/.attest" | tr -d ' ') files)"
    ;;
  verify)
    [ -f "$DAY/.attest" ] || { echo "FAIL $date: no .attest — this day was not published by a local run" >&2; exit 1; }
    [ -f "$DAY/.attest.sig" ] || { echo "FAIL $date: no .attest.sig" >&2; exit 1; }
    [ -f "$SIGNERS" ] || { echo "FAIL $date: $SIGNERS missing" >&2; exit 1; }
    # The manifest must still describe the files as committed...
    if ! diff -q <(manifest) "$DAY/.attest" >/dev/null; then
      echo "FAIL $date: the day's files do not match the signed manifest" >&2
      diff <(manifest) "$DAY/.attest" | head -20 >&2
      exit 1
    fi
    # ...and the manifest must carry a signature from a key we trust.
    signer=$(awk '{print $1}' "$SIGNERS" | head -1)
    if ssh-keygen -Y verify -f "$SIGNERS" -I "$signer" -n "$NAMESPACE" \
         -s "$DAY/.attest.sig" < "$DAY/.attest" >/dev/null 2>&1; then
      echo "OK $date: signed by $signer, manifest matches"
    else
      echo "FAIL $date: signature does not verify against $SIGNERS" >&2
      exit 1
    fi
    ;;
  *) usage ;;
esac
