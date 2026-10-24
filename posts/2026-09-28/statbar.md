---
project: StatBar
title: StatBar's Release Build Stops Hanging on Apple's Check
summary: Building a release of the app no longer hangs forever waiting on Apple's security check.
---
A release of StatBar can no longer sit silently for days. The last attempt did exactly that: two days of nothing, no message and no error, because the Mac fell asleep partway through the upload to Apple. The release process now gives up after thirty minutes and says so, which means a stuck release shows up the same morning.

Two lines in the release script did it. Apple's notarisation step is where a build is sent off for approval, and the script calls it twice, once for the app zip and once for the disk image. Both calls told the script to wait for Apple's answer, and that wait had no ceiling: the script held until the upload finished or somebody killed it. Both calls now carry a 30-minute timeout next to the wait. It was the disk image upload that stalled.

The app itself is untouched. This is the release route for the Gumroad build that arrived on 24 September, and it is the first problem found by actually trying to ship through it, which I take as a decent argument for trying early. The fix was committed just after nine on 28 September.
