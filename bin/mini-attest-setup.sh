#!/usr/bin/env bash
# Create the diary's signing key on this machine and print its public half.
# Run once, on the Mac mini. The private key never leaves it.
set -euo pipefail
KEY=$HOME/.config/product-diary/attest_key
mkdir -p "$(dirname "$KEY")"; chmod 700 "$(dirname "$KEY")"
if [ -f "$KEY" ]; then
  echo "key already exists at $KEY; reusing it"
else
  ssh-keygen -t ed25519 -f "$KEY" -N '' -C "product-diary attestation ($(hostname -s))" >/dev/null
  chmod 600 "$KEY"
  echo "created $KEY"
fi
echo
echo "Add this line to .github/allowed_signers in the repo:"
echo
printf 'product-diary %s\n' "$(cat "$KEY.pub")"
