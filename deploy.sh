#!/usr/bin/env bash
# Build dist/ and force-publish it as the gh-pages branch of itrimble/product-diary.
# GitHub Pages serves gh-pages at https://blog.remnantsecurity.com (CNAME is written by build.mjs).
set -euo pipefail
cd "$(dirname "$0")"
[ -d node_modules ] || npm ci --silent
node build.mjs
remote=$(git remote get-url origin)
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT
cp -R dist/. "$tmp/"
git -C "$tmp" init -q -b gh-pages
git -C "$tmp" add -A
git -C "$tmp" -c user.name="$(git config user.name)" -c user.email="$(git config user.email)" \
  commit -q -m "Publish $(date +%F) from $(git rev-parse --short HEAD)"
git -C "$tmp" push -q -f "$remote" gh-pages
echo "Deployed to https://blog.remnantsecurity.com"
