---
project: StatBar
summary: Building a release of the app no longer hangs forever waiting on Apple's security check.
---
Putting out a new copy of StatBar no longer hangs forever when Apple's security check does not answer. Last week a release attempt sat for two days with no message and no error, because the Mac went to sleep in the middle of the upload. Now the process gives up after half an hour and says so, so a stuck release is something you notice the same morning.

The change is one flag in `scripts/release.sh`. Both calls to `xcrun notarytool submit`, one for the app zip and one for the disk image, now pass `--timeout 30m` next to `--wait`. Before, `--wait` had no limit, so the script held until the upload finished or someone killed it. The disk image upload was the one that stalled.

Nothing in the app itself changed. This is the release path for the Gumroad build added on 24 September, and it is the first fix to come out of actually trying to ship it.
