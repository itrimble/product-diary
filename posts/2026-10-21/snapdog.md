---
project: SnapDog
title: SnapDog on Linux Records GIFs and Picks a Webcam
summary: The Linux version of SnapDog can now record GIFs and lets you pick which camera appears in recordings.
---
SnapDog's Linux version can now finish recording an animated GIF, and its recording settings let you choose which webcam appears in the corner, listed by name. Both choices are remembered. If you use SnapDog on a Mac you will notice nothing, because this is the separate Linux port catching up with the Mac app, and it still has gaps.

The work came in three small steps. One finished GIF recording and passed the webcam preference through to it. One checked that the recording controls behave and steadied a camera test on the Mac side. The last added the named camera picker, with a smoke test and a backend test to go with it. The Arch and RPM packaging files were bumped to match, and the porting log and the table that tracks how far the port trails the Mac app were brought up to date.

The caveat I would put in the headline if headlines allowed it: as far as my notes show, this was verified through the Mac-side simulator and not on a real Linux desktop. Until it runs on real hardware, I would call the GIF and camera work written and simulated, not proven. A new screenshot of the settings page was saved with the project.
