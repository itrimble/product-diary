---
project: Escape from Butcher Bay
title: Butcher Bay on Mac Gets Its Missing Floor and a 4K Renderer
summary: The Mac port of the Xbox game lost its black strip of missing floor in the courtyard, and it now has a new native Apple graphics path that draws at 4K.
---
The Mac port of Escape from Butcher Bay fixed its most visible picture bug on Monday and gained a second way of drawing the game. The courtyard used to have a black band along the bottom where the floor should have been. The floor is now continuous, the characters are lit properly, and the game holds 60 frames per second in a window. Separately, I added a graphics path written for Apple's own technology, which can draw at 4K.

The floor bug was a one-pixel disagreement. The game draws the courtyard in several passes, and the first pass used a 640 by 480 area while the later ones used 639 by 479. My code resized the whole drawing surface to match each pass, so large floor triangles crossing the bottom edge were clipped differently each time. Depth values shifted by one or two units, and the later passes rejected the floor because it no longer matched the first. The fix keeps the surface at full size and trims each pass with a scissor rectangle instead. It lives in `nv2a_gl.c`.

I got there by elimination. Forcing depth tests to always pass brought the floor back but broke character heads. Mimicking the Xbox's 24-bit depth rounding left the band. Swapping an equality test for less-or-equal also left it. The last capture shows no band in 13 of 13 distinct frames, with 48 of 49 timing samples between 59.94 and 60.10 frames per second. That is windowed, on the Mac, in the older OpenGL path.

![The courtyard in the Mac build with a continuous floor](butcher-bay-courtyard-floor-fixed.png)
*A 640 by 480 frame of the courtyard on 23 November 2026, after the scissor fix, with no black band along the bottom.*

The new path is a native Metal backend of about 4,000 lines, with generated shaders for the blending stage and a 4K upscaler. It also has an experimental ray-traced shadow mode. A later commit moved presenting to its own thread and polls the controller 500 times a second, so input no longer waits on the picture. 
![The courtyard rendered through the new Metal path at 4K, scaled down for this page](butcher-bay-metal-4k-courtyard.png)
*A 4K Metal frame of the courtyard captured on the evening of 23 November 2026, scaled to 1600 pixels wide.*

I did not run a long play session on the Metal path, and I have no frame rate figures for it. The dark characters from [Sunday](/escape-from-butcher-bay/2026-11-22/) look right in these captures, but I have not compared them side by side against the emulator.
