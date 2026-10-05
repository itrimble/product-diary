#!/usr/bin/env bash
# Take a screenshot of a project and put it in the day's assets.
#
#   bin/shot-project.sh <project-folder-name> <YYYY-MM-DD> [out-basename]
#
# Prints the bare filename it wrote, or a reason it could not. Never fails the
# caller: a diary entry without a picture is fine, a stuck build at 00:30 is not.
# Everything is wrapped in timeouts for that reason.
set -uo pipefail

REPO=$(cd "$(dirname "$0")/.." && pwd)
PROJECTS=${DIARY_PROJECTS_DIR:-/Volumes/nas/projects}
name=${1:?usage: shot-project.sh <project-folder> <YYYY-MM-DD> [out-basename]}
date=${2:?usage: shot-project.sh <project-folder> <YYYY-MM-DD> [out-basename]}
base=${3:-$(echo "$name" | tr '[:upper:] ' '[:lower:]-')}
dir="$PROJECTS/$name"
out="$REPO/posts/$date/assets/$base.png"
BUILD_TIMEOUT=${DIARY_SHOT_BUILD_TIMEOUT:-900}

skip() { echo "no screenshot: $*"; exit 0; }
[ -d "$dir" ] || skip "$name does not exist"

# A screenshot shows the app as it is now. On a day being written up after the
# fact that is not what the entry describes, and a picture presented as that
# day's state would be a quiet lie. Only photograph recent days.
age=$(( ( $(date +%s) - $(date -j -f %Y-%m-%d "$date" +%s 2>/dev/null || date +%s) ) / 86400 ))
if [ "$age" -gt 2 ]; then
  skip "$date is $age days ago; a capture today would show a build that did not exist then"
fi
mkdir -p "$(dirname "$out")"

# ---- iOS app in an Xcode project ------------------------------------------
proj=$(ls -d "$dir"/*.xcworkspace "$dir"/*.xcodeproj 2>/dev/null | head -1)
if [ -n "$proj" ]; then
  command -v xcodebuild >/dev/null || skip "xcodebuild not installed"
  scheme=$(timeout 120 xcodebuild -list -project "$proj" 2>/dev/null \
           | awk '/Targets:/{f=1;next} /Build Configurations:|Schemes:/{f=0} f{print $1}' | head -1)
  [ -n "$scheme" ] || skip "no scheme found in $(basename "$proj")"

  udid=$(xcrun simctl list devices available 2>/dev/null \
         | grep -oE 'iPhone [0-9][^(]*\(([-0-9A-F]+)\)' | head -1 \
         | sed -E 's/.*\(([-0-9A-F]+)\)/\1/')
  [ -n "$udid" ] || skip "no iPhone simulator available"

  dd=$(mktemp -d)
  trap 'rm -rf "$dd"' EXIT
  if ! timeout "$BUILD_TIMEOUT" xcodebuild -project "$proj" -scheme "$scheme" \
        -sdk iphonesimulator -configuration Debug -derivedDataPath "$dd" \
        -destination "id=$udid" build >"$dd/build.log" 2>&1; then
    skip "build failed or timed out (tail: $(tail -2 "$dd/build.log" | tr '\n' ' ' | cut -c1-160))"
  fi
  app=$(find "$dd/Build/Products" -maxdepth 2 -name '*.app' | head -1)
  [ -n "$app" ] || skip "built but no .app produced"
  bundle=$(/usr/libexec/PlistBuddy -c 'Print CFBundleIdentifier' "$app/Info.plist" 2>/dev/null)
  [ -n "$bundle" ] || skip "could not read the bundle id"

  timeout 180 xcrun simctl boot "$udid" >/dev/null 2>&1
  timeout 180 xcrun simctl bootstatus "$udid" -b >/dev/null 2>&1
  timeout 120 xcrun simctl install "$udid" "$app" >/dev/null 2>&1 || skip "could not install on the simulator"
  timeout 60 xcrun simctl launch "$udid" "$bundle" >/dev/null 2>&1 || skip "the app would not launch"
  sleep 10   # let the first screen settle
  # The PNG is written by the CoreSimulator service, not by this process, and
  # that service cannot write to the SMB mount — the same network-volume
  # restriction that stops launchd jobs reading /Volumes/nas. Capture to local
  # disk, then copy it across.
  tmpshot="$dd/shot.png"
  if timeout 60 xcrun simctl io "$udid" screenshot "$tmpshot" >/dev/null 2>&1 && [ -s "$tmpshot" ]; then
    timeout 60 xcrun simctl terminate "$udid" "$bundle" >/dev/null 2>&1
    cp "$tmpshot" "$out" || skip "captured, but could not copy the image into the day's assets"
    echo "$(basename "$out")"
    exit 0
  fi
  skip "the simulator screenshot came back empty"
fi

# ---- static or built web project ------------------------------------------
if [ -f "$dir/package.json" ] || [ -f "$dir/index.html" ]; then
  chrome="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
  [ -x "$chrome" ] || skip "no Chrome to render the page with"
  page="$dir/index.html"
  [ -f "$page" ] || page=$(find "$dir" -maxdepth 2 -name index.html -not -path '*/node_modules/*' | head -1)
  [ -n "$page" ] || skip "no index.html to render"
  tmpdir=$(mktemp -d); trap 'rm -rf "$tmpdir"' EXIT
  if timeout 120 "$chrome" --headless --disable-gpu --window-size=1280,900 \
       --screenshot="$tmpdir/shot.png" "file://$page" >/dev/null 2>&1 && [ -s "$tmpdir/shot.png" ]; then
    cp "$tmpdir/shot.png" "$out" || skip "rendered, but could not copy the image into the day's assets"
    echo "$(basename "$out")"
    exit 0
  fi
  skip "headless render produced nothing"
fi

skip "$name is not a kind of project this can photograph"
