---
project: Escape from Butcher Bay
title: Butcher Bay Mac Port Gets PlayStation Glyphs and Mouse Aim
summary: The Mac port of Escape from Butcher Bay can now be played with mouse and keyboard, shows the right buttons for each controller, and ships as one app.
---
The Mac port of Escape from Butcher Bay became more of a finished game on Wednesday morning. It can now be played with a mouse and keyboard like a computer shooter. The on-screen button pictures change to match whatever you are holding, PlayStation, Xbox or keyboard, and switch the moment you press something on another device. The whole thing is now one app that runs from the Applications folder without anything else installed.

It came in as one large change at 09:38: 23 files, about 2,900 lines added. Besides the controls and button pictures, the ray-traced shadows now respond to the game's moving lights, and the 2D menus and text are kept out of the 3D lighting so shadows do not land on them. Audio fades in after a gap instead of clicking, and a live overlay shows the settings with function-key shortcuts for shadows, upscaling, sharpening and button style.

The handover notes I updated five minutes later say the port plays at a locked 4K and 60 frames a second on the M4 Max with the Mac's Game Mode active. The benchmark log from that morning shows the window presenting 59 to 60 frames a second. I did not re-run the build or the regression tests while writing this. The repository stays local and is not pushed.
