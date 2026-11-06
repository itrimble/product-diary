---
project: SnapDog
title: SnapDog Linux Fixes Window Shots That Captured Wallpaper
summary: SnapDog's Linux version was saving pictures of the wallpaper instead of the window you picked, and the pickers now cover the whole screen.
---
SnapDog's Linux version had a bug that made it look like it worked when it did not. You picked a window to capture, a picture appeared and the editor opened it, but the picture showed the desktop wallpaper instead of the window. The cause was a scaling mix-up on a sharp display, and it is fixed in the code I committed late on Thursday. The picker that lets you draw a box on screen was also only covering half the display, and that is fixed too.

On my Omarchy test machine the screen ran at 1.5 times scaling. Hyprland, the window manager, reported window positions in scaled units while the screenshot tool returned real pixels. SnapDog was cutting the picture at the scaled position, which at 1.5 lands hundreds of pixels from the window. The backend now converts display sizes by the scale and maps the chosen rectangle into real pixels, so a saved crop keeps native resolution. The blog draft in the repo records a 2548 by 1708 window capture and a 404 by 321 region capture that I inspected by eye, and 119 passing tests on that build.

The second bug was that Hyprland tiled the picker beside the open editor, so it could draw the whole desktop but only take mouse input on half of it. `app.py` now asks Hyprland to float each picker and resize it to the monitor, and quietly does nothing on older setups. There are new tests for both pickers.

One small Mac-side change: the simulator that runs the Linux app on my Mac now says "Screen Recording permission is required" instead of repeating "could not create image from display". I never granted that permission on the Mini, so a real Mac capture is still untested.

A mismatch to be straight about. The commit message says packaging moved to 0.2.59, but the draft refers to builds up to 0.2.64, so the version label and the story are out of step. I did not run the tests tonight; the numbers above come from the porting notes.
