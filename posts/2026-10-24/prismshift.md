---
project: Night Chorus
title: Night Chorus TV Version Now Shares One Purchase
summary: Night Chorus, the crystal game formerly called Prism Shift, now uses one identity across all its Apple versions, so a single purchase should cover them.
---
Night Chorus, the crystal puzzle game that used to be called Prism Shift, got one small but important fix for its eventual release. Its Apple TV version now carries the same identity as the phone, tablet and Mac versions. That is what lets someone buy the game once and have it appear on every Apple device they own.

It was a one-line change to `project.yml`: the TV target now uses the shared bundle identifier `com.prismshift.app`, which is how Apple's universal purchase works. I did not rebuild the TV version or check it against App Store Connect, so treat this as set up, not proven. The [release checklist from Friday](/prismshift/2026-10-23/) still has its other failures to clear.

![The Night Chorus title screen on a phone simulator showing the app icon and a Play Challenge button](night-chorus-title-screen-phone.png)
*The Night Chorus title screen on a phone simulator, captured on 24 October 2026, with the campaign at level 1 of 62.*
