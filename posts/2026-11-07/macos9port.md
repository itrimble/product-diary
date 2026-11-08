---
project: OS Pi
title: OS Pi Gets Bluetooth Networking and Runs Real Mac Apps
summary: OS Pi, my classic-Mac-style desktop, gained wireless networking, a new startup screen and many more of the old Mac's built-in functions on Saturday.
---
OS Pi had its busiest day yet on Saturday, with 110 commits. The desktop can now share a network connection over Bluetooth, shows a redrawn startup screen with a pixel-art fruit and a progress bar that fills from the left, and has proper control panels and an extensions manager. It also got further into running genuine old Mac programs, which remains the hard part. I have not watched the full test suite pass on tonight's final state, so treat all of this as built, not proven.

The Bluetooth work was the largest block. I added a stack with L2CAP, RFCOMM and BNEP layers, planned the personal-area-network flow, then corrected three defects in my own plan. A later commit fixed BNEP setup framing and channel lifetimes, and another runs guest TCP over the link. The macOS Bluetooth driver is now linked into the desktop build. I never connected a real device, so none of it has met actual hardware.

On the desktop side, a modular Control Panels subsystem arrived with a unified settings store, and all eight panels are wired to live parts of the system. Extensions Manager landed beside it. Movies now decode natively with playback controls. Font Book 999 previews the bundled fonts, and the About box links to the website.

The compatibility push is where the evidence got specific. I added a protected, auto-growing heap with fault containment and routed guest memory requests through it. A long list of Toolbox calls went in: menu bar calls, color cursors, palette activation, SetOrigin, FSSpec file calls, Apple Event Manager as a record-only subset, a Time Manager delay, and version-1 PICT bitmaps. I fixed LocalToGlobal and GlobalToLocal, which had the wrong offsets and signs. Startup extensions now run in their own environment, limited to IDs 0 to 31.

The day ended on a real program. My Room Editor test app now gets through window setup and picture drawing, then stops at the Standard File dialog. I added bounded dialog and item-list parsers, a way for native code to call back into guest routines, and a file list model. Glider PRO is still blocked, and the notes say where. The Monkey Island audio problem from [Wednesday's entry](/macos9port/2026-11-04/) was not touched.
