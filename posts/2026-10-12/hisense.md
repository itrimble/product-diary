---
project: Hisense TV Tune-up
title: The Red Button Now Powers the Hisense TV On and Off
summary: The television's dead power button was worked around by making the red button on the remote switch the set on and off.
---
The remote for the Hisense television has a dead power button, and a workaround now makes the red button do its job. Pressing red puts the set to sleep, and pressing it again wakes it. That works in both directions, which was not expected. A small program on the Mac mini does the watching, so the television only responds while the mini is on and on the same home network. A new remote costs about ten dollars and is the real fix.

The power key emits no signal at all, while every other key on the same remote reports fine. The proper repair would be editing the vendor's key layout file, but this is a production build with no root access and that folder is read-only. So `scripts/red-power.sh` reads the infrared receiver at `/dev/input/event2`, which the adb shell user can do through group 1004. On a red press it checks the power state and sends key 26 to sleep or 224 to wake. A 3 second debounce stops repeats from double-firing.

Standby on this model turns the screen off rather than suspending, so the receiver and the network link stay up while it sleeps. The log shows a sleep at 09:37:45 and a wake at 09:37:52. A launch agent for persistence is written but not installed, since the install was blocked and I did not work around that. Until it is loaded by hand, the watcher runs under `nohup` and will not survive a reboot.

The notes in `docs/HISENSE-A4-TUNEUP.md` gained section 16 on this. They also record that HDMI control is enabled and would be the cleaner route if the game console or streaming box handled it.
