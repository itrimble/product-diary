---
project: SnapDog
title: SnapDog on Linux Captures a Clicked Window Cleanly
summary: SnapDog on Linux now captures a clicked window correctly, without leftover tint or menu ghosts in the picture.
---
SnapDog's Linux version, still a separate port behind the Mac app, now saves a clean picture when you capture a single window. Before, clicking the window you wanted did nothing useful, and the first picture that did come out had a grey tint and a badge from the picker baked into it. Both are fixed and checked on a real Arch-based Linux machine. Mac users see no change today.

The cause was in `linux/snapdog_linux/app.py` and `backend.py`. The window picker opened as a tiled window beside the target, so it drew a scaled picture of the whole desktop but read clicks through its own tile. A click on the target could never land on it. The picker now goes full screen (`8792aa1`). It also crops the chosen window from the frames frozen before the picker appeared, instead of photographing the screen after closing it. The wait before freezing went from 120 to 500 milliseconds so the menu's fade-out no longer ghosts into the capture.

Earlier that day (`9513ac0`) the installed package was found to be 0.1.0 while the source was 0.2.57, so it was rebuilt and reinstalled. Full-screen and region capture, copy, save and History were exercised through a remote desktop link. A font fixture that needed a Mac-only font now falls back to Liberation or DejaVu.

Version 0.2.58 went through the full Linux suite, 111 tests, plus an installed smoke test. The saved window capture came out at 1960 by 1094 with the shadow, and the package check reported 35 files, none altered. Windows spanning two monitors are untested. The DEB and RPM packages are built but not installed on their own distributions. There is no picture tonight: the screenshot run failed on a missing simulator platform.
