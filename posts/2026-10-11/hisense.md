---
project: Hisense TV Tune-up
summary: A slow television with a broken USB drive was diagnosed and repaired, and it now runs noticeably more smoothly.
---
A Hisense television that had become painfully slow was repaired today. It also kept complaining that the memory stick plugged into it was corrupt, and the settings screen listed that one stick three times. Both problems turned out to be the same fault. The TV is now responsive again, the stick shows up once as a clean drive with plenty of room, and the warning is gone. Nothing on the stick needed saving, which is what made the repair safe to do.

The cause was a half-finished attempt on October 8 to use the stick as extra memory for the TV. That left the stick split into two parts, one of them damaged. The TV's core system process had been stuck since then, which is why everything crawled. Hardware is a limit too, with only about 1.8 GB of memory and a 4.3 GB storage area. But the stuck process was the real cause, not apps: the TV has 131 installed packages and none were added by the owner.

The fix was one command, `sm partition disk:8,240 public`, which rewrote the stick as ordinary portable storage, followed by a reboot. Free memory went from 397,768 kB to 760,256 kB, swap use fell from 65% to 34%, and running tasks dropped from 614 to 446. The diagnostic command that used to answer "disabled due to hung system process" works again. Animation speed was also halved and caches were trimmed.

The first obstacle was on the Mac. The laptop's beta macOS refused all local network connections from non-Apple programs, and the error looked like a routing fault. Apple's own tools reached the TV and Homebrew's `adb` and Python did not. Work was routed through the Mac mini instead via `scripts/tv`. The notes, `docs/HISENSE-A4-TUNEUP.md`, say never to choose "Set up as device storage" on this TV again, and that a cheap streaming stick is the real upgrade. A planned sweep to disable preinstalled apps was skipped deliberately, since it risked the tuner and HDMI for no gain.
