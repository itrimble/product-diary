---
project: SnapDog
title: SnapDog Tutorial Recording Exposes a Menu Leak, Stale Editor
summary: Recording a SnapDog tutorial caught region captures that included the app's own menu, and an editor that kept showing the previous image.
---
While recording a fresh SnapDog tutorial on Sunday, I caught the app photographing itself. A region capture started from the menu came out with SnapDog's own menu in the picture, and so did a second one taken with the keyboard shortcut. I threw both takes away and stopped recording. A repaired build is not out, and I have not claimed one. This is the sort of thing a tutorial finds that testing did not.

I wrote up the failure in a regression note with acceptance checks, rather than guess at a cause. The menu action starts the capture before it asks the menu to close, and the menu closes with an animation. The capture's window exclusion list is also empty, so nothing stops a stray window appearing. These are candidates, not a confirmed cause. A fix must hide capture UI without hiding the editor, which is a legitimate subject for a tutorial.

Later logs showed a second oddity. The installed build, version 1.2.0 build 8, selected an unnamed full-screen window belonging to my automation driver. The one code change of the day removes those: the window picker now skips unnamed windows from that helper, with tests that keep real windows and untitled documents like TextEdit. That fix is in the source but not installed.

The editor also kept showing its previous 1793 by 1041 image after the logs reported a new 2080 by 1240 capture. Reading the source points to the editor holding its image in view state while its window swaps the view without changing identity. I have not tested that fix. After restarting, a clean 900 by 526 region capture saved and reopened correctly.

Smaller work: scripts for a localised demo shoot, a subject window page, and a rename of the Mac mini in the handover notes. I did not build or run the tests tonight.
