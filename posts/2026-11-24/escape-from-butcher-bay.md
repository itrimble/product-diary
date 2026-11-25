---
project: Escape from Butcher Bay
title: Butcher Bay on Mac Now Switches Game Mode On at Launch
summary: The Mac port of the Xbox game now draws crisply in a window, goes 4K in full screen, and the Mac recognises it as a game.
---
The Mac port of Escape from Butcher Bay now behaves like a proper Mac game. In a normal window it draws at the sharpness your screen can actually show, and in full screen it steps up to 4K. The Mac also treats it as a game now, which gives it priority from the system while it runs. Pressing F11, Alt and Enter, or Command and F flips between window and full screen. I made these changes on Tuesday, after Monday's [new Metal renderer](/escape-from-butcher-bay/2026-11-23/).

The window change is about wasted work. Drawing a 4K picture into a small window made the Mac's window system do far more compositing than the window could show. The window now renders at the screen's own pixel density (a 1920 by 1080 frame becomes 2560 by 1440 in a 1280 by 720 window), which cut compositing load by about 55 percent in my notes. Full screen scales to 3840 by 2160. A setting forces 4K in a small window if I want it for captures.

Game Mode was the fiddly part. The Info.plist already declared the app a game, but macOS did not switch the mode on, because the app launched through a shell script that then started the real program. I changed the bundle so the double-click launches the native executable directly. The launch options, log redirection and project folder lookup moved into the program itself. Afterwards the system's own status command reported that Game Mode was on.

I also fixed PlayStation 4 controller traffic over Bluetooth. The rumble signal was being resent when nothing had changed, and the controller was spiking the polling thread. Rumble is now deduplicated, and the controller's rumble hint is switched on.

The evidence is thin in one place. The 60 frames per second and zero dropped frames in the notes come from Monday's captures. For Tuesday I have the Game Mode status line and a 2,000-line capture log, but I did not play a long session in either window mode. The dark characters are still on the list.
