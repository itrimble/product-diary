---
project: SnapDog
title: SnapDog Linux Simulator Learns to Freeze a Mac Screen
summary: SnapDog's Linux simulator on the Mac can now freeze the screen to pick a window or region, but I still have not seen it capture a real display.
---
SnapDog's Linux version has a test mode that runs the Linux app on my Mac, and on Friday I changed how it grabs the screen. It can now freeze the display and let you pick a window or draw a box on the frozen picture, the way the real app does. I could not watch it work on a live screen. The Mac still has not been given permission to record the display, so that check is not done and the work is uncommitted.

The main change is in `mac_host.py`. Full-screen capture now goes through Peekaboo, an automation tool that already has screen access, instead of the built-in `screencapture` command. A new `peekaboo_png` function runs it, reads its JSON reply, and refuses anything that is not a real PNG. The same route builds the frozen frames for the window picker. The list of capturable windows now carries each window's position and skips helper windows from my own automation tools, so they stop showing up as candidates.

The pickers got Mac handling in `app.py` and `window_picker.py`. On Linux they go full screen and are resized by the window manager. On the Mac they open as ordinary windows, and capture errors there are raised instead of being swallowed into an empty result, because a silent blank was what hid the earlier wallpaper bug. The demo mode also supplies sample pixels for region selection. One new test covers the Peekaboo path with a fake 12 by 8 image, and another was adjusted so the permission-error message is still tested.

The notes record more. A background watcher that restarts the Omarchy test box was resuming repeatedly after brief network blips, so it now waits ten minutes of outage and keeps its marker if the resume fails. DEB and RPM installs worked in throwaway Debian and Fedora containers. Package integrity checks repeated at 0.2.64. I did not run the test suite tonight, and nothing here was committed.
