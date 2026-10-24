---
project: SnapDog
title: SnapDog on Linux Captures a Clicked Window Cleanly
summary: SnapDog on Linux now captures a clicked window correctly, without leftover tint or menu ghosts in the picture.
---
On Linux, SnapDog's "capture a window" mode used to be unusable: you clicked the window you wanted and nothing useful happened. Once it did save something, the picture came out with a grey wash and a stray badge from the picker itself. Both are fixed, and the fix was exercised on a real Arch-based Linux machine, not only in a simulator. This is the separate Linux port, which still trails the Mac app, so Mac owners will see no difference.

The clicks were failing for a geometric reason. The picker opened as a normal tiled window next to the one being captured. It drew a shrunken picture of the whole desktop, but it worked out where you had clicked relative to its own tile. So a click on the target landed in the wrong place and could never hit it. The picker now covers the whole screen. The tint came from a second mistake: it closed itself and then photographed the screen while the compositor was still animating the close. Capture now cuts the chosen window out of frames taken before the picker appeared. I also lengthened the pause before freezing from 120 to 500 milliseconds, because the fading menu was ghosting into the shot.

Earlier that day the installed package turned out to be 0.1.0 while the source was at 0.2.57, so it was rebuilt and reinstalled. A test that needed a Mac-only typeface can now use Liberation or DejaVu instead.

Version 0.2.58 passed all 111 tests in the Linux suite and an installed smoke test. The saved window picture came out at 1960 by 1094 including its drop shadow. The package verification counted 35 files and none had been altered. Limits remain. Windows that straddle two monitors are untested, and the DEB and RPM packages are built but have not been installed on their own distributions.
