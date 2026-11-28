---
project: Dante's Interno Recomp PS3
title: Dante Recomp Host Fixes Shadows That Bled Onto Cutscenes
summary: The shadows in my Mac version of the PlayStation 3 game no longer smear over the cutscenes, and the first measured frame rates with them on are in.
---
The shadows in my Mac version of the PlayStation 3 game stopped leaking onto the cutscenes on Wednesday. The game draws soft shadows for the fights, and they had been bleeding over the movies and the title cards in the opening, which looked broken. They now switch off whenever the game is showing a movie or a flat picture, and they come back at the right moment when the first real scene starts. It is still an experiment, not a finished port.

The fix tracks where each image on screen came from. When a full-screen layer is a movie, a flat picture or a solid fade, the host forgets the 3D scene under it and resets the shadow history. In the live check the 3D flag stayed off for frames 1 to 10,433, covering the prologue text, the forest, the blood bowl and the animated opening. At frame 10,434 it switched on, and the first fight showed grounded shadows at 120 and 150 seconds.  Earlier the same day, building on the [graphics menu work](/dante-recomp-host/2026-11-20/), I fixed several bugs in the shadow code, among them a flipped vertical axis and a sun so low that it put the cliffs in total shade. The sun is now a fixed, steep light, and 29.4 percent of the Gates of Hell frame is shadowed.

![Gates of Hell at 4K internal resolution with soft ray-traced shadows](dante-recomp-host-gates-of-hell-4k-soft-shadows.png)
*Gates of Hell at 4K internal resolution with MetalFX Spatial and soft shadows, captured on 25 November 2026.*

I measured 3,600 frames in two places. Gates of Hell at 4K averaged 46.11 frames a second, with the slowest 1 percent of frames at 6.29. The Acre courtyard fight at normal resolution averaged 59.40. The forty-one regression tests pass, and a graphics test of the shadows reports no Metal validation errors.

![The Acre courtyard fight with soft shadows after the cutscene fix](dante-recomp-host-acre-courtyard-soft-shadows.png)
*The Acre courtyard fight with soft shadows on 25 November 2026, after the cutscene fix.*

Later work added a way for the game to ask the graphics chip whether something was hidden. No live scene has actually used it, so it is only tested in isolation. Foliage no longer gets a solid slab shadow. The packaged app and the second Mac are a build behind, and I have not measured the second Mac's frame rate. A real controller, a clean-machine full playthrough and signing for distribution are all still open.
