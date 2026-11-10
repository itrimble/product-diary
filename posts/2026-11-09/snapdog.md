---
project: SnapDog
title: SnapDog Linux Port Records One Chosen Window
summary: SnapDog's Linux test mode on the Mac can now pause a recording and record only the window you chose, even with another window on top.
---
SnapDog's Linux version can now pause a screen recording and carry on, and it can record one chosen window even when something else is sitting on top of it. Both are checked in its Mac test mode, and the Linux packages are now at version 0.2.67. I committed all of it late on Monday night, after the recording work in [Sunday's entry](/statbar-snapdog-os-pi-build-fleet-sunday/2026-11-08/) sat loose in my working copy. A real Linux desktop on Debian or Fedora still has not seen any of it.

Pause came first. I put a changing test card on the Mini's display, clicked Pause as it turned green, then Resume as it turned blue. The saved movie held the before and after cards and no green frames. Stopping while paused also saved a playable file.

The window problem was worse. The first Mac recorder grabbed a rectangle of the desktop, so a stray window over the target showed up in the film. In 0.2.67, `mac_host.py` matches the window you picked to Peekaboo's window list and records that window's own pixels. I put an unrelated green window over the target, used Start and Stop, then opened the video: only the chosen window appeared. If no match is found, it falls back to the visible rectangle and the feature ledger says so. The window list also now carries each window's position and skips helper windows from my automation tools.

The commit also holds the packaging version bumps, a monitor script change, the porting log and a draft of a blog post. There are two new documents unrelated to Linux: a draft of native sales ads and some notes on how a web agent could judge a page visually. I did not read those closely enough to describe them.

Not verified tonight: the 121-test run is quoted from the notes, and I did not rerun it.
