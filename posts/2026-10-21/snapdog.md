---
project: SnapDog
summary: The Linux version of SnapDog can now record GIFs and lets you pick which camera appears in recordings.
---
The Linux version of SnapDog took two more steps toward matching the Mac app. It can now finish recording an animated GIF, and the recording settings have a menu for choosing which webcam to use, listed by name. Both choices are remembered. Mac users see no change today. This is progress on a separate port that still has gaps against the Mac app.

The work is three commits under `linux/`. `1b4d75f` completes GIF recording and wires the webcam preference through; `07377d3` verifies the recording controls and stabilizes a Mac camera test; `02102d8` adds the named picker. The picker touched `snapdog_linux/simulator.py` (56 new lines) plus the smoke scripts and a backend test. Packaging files for Arch and RPM were bumped alongside.

The porting log, parity table and blog draft in the same folder were updated, and a new settings screenshot, `general-webcam-2026-10-21.png`, was saved there. I could not photograph the app tonight because the screenshot run failed on a missing simulator platform. The Linux build was verified through the Mac-side simulator, not on a real Linux desktop, as far as the notes show.
