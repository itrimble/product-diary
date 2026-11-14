---
project: StatBar
title: StatBar's Weather Retry Button and Signing Fix Get Committed
summary: The weather menu's clickable status line and a signing fix for the location permission dialog were committed late Friday, ahead of the unreleased 1.11.0.
---
StatBar's weather menu now has a status line that fixes its own failure, and the signing change that lets the location permission dialog appear is finally saved in the project history. Both landed late on Friday night. If your location lookup times out, you click the line and the app asks again. If you refused permission, the same click opens the right page in System Settings. Neither is in a release yet; they target 1.11.0.

I described this work in [Wednesday's entry](/statbar/2026-11-11/), where I was careful to say the app had not been run on screen. The code reached git two days later, in two commits within the same minute at 11:22 pm. I am saying so because the diary's records go by commit date, and I would rather not let a reader think I built it twice.

The change in the main source file adds a three-way choice for what a click does: nothing, ask again, or open Settings. It reads the recorded outcome of the last location request, timed out, failed, denied or located, rather than the wording of the message. The code carries its own warning about why. A town called Suffolk or Coffs Harbour contains the letters "off", and a match on the text would misfire. The second commit adds a small entitlements file and signs all three build paths with it, because a hardened app without the location entitlement never gets the permission dialog.

Not verified, again: I did not launch the packaged, signed build or click the line myself tonight, and I did not run the test script. The working tree was clean afterwards, so nothing else is waiting.
