---
project: Butcher Bay
title: The Mac Draws the Cell Block at Sixty
summary: This Mac played the Universal logo at about 59 frames a second, then the window code aborted. A day later it drew the cell block at 59 to 60, with sound. The black band along the bottom was in the game's own art.
format: longform
category: games
stats: This Mac cell block = 59.2 to 60.3 fps | Consecutive frames without a band = 41 | Audio underruns = 0 | 20 Nov logo = about 59 fps, then an abort | Neo menus = about 60 fps | Neo cells = 1 to 4 fps
---

I have been trying to make The Chronicles of Riddick: Escape from Butcher Bay run as an ordinary program on my Mac, at a full sixty frames a second. Tonight this Mac compiled its own copy and played the Universal logo at about fifty-nine frames a second. A few seconds later the program aborted. The prison cells are still unmeasured on this machine. On the MacBook Neo, running Omarchy, the menus already hold sixty and the cells do not.

The game is the 2004 Xbox title from Starbreeze and Tigon, published by Vivendi. I own a copy. The work is the same idea as the Dante and God of War III ports I wrote about yesterday: take the disc's own program, translate it ahead of time, and run that translation on the machine in front of me. Dante reached its first stretch of play on this Mac. God of War III drew a splash and then stopped. Butcher Bay's earlier numbers are from the Neo. Tonight is the first time this Mac drew the game.

## The menus already keep up

On 20 November 2026 the title screen and the main menu held about 60 frames a second on the Neo. A day earlier the same screens were about 15 to 19, and 7 to 9. I did not get that by making the processor draw the menus faster. The menus stopped asking it to draw. A graphics path now keeps the picture on the graphics chip, including depth and the stencil shadows, and the processor's share of menu drawing fell to nearly nothing.

An ordinary launch does not turn that path on. The measured runs set four switches:

```
RECOMP_NV2A_GL=1
RECOMP_NV2A_DEFER_COLOR=1
RECOMP_NV2A_DEFER_VISIBILITY=1
RECOMP_NV2A_FIXED_DEPTH=1
```

Those runs used an offscreen display driver. It still rendered on the Apple graphics chip in the Neo. The 19 November log from that machine named the chip as an Apple A18 Pro. I did not re-print the renderer string for the 20 November runs while writing this. None of these menu and cell numbers are from this Mac.

![The title card, logo over a dark prison exterior](linux-title-logo.png)

*The title card, written at 16:54 on 20 November 2026 by the Linux renderer. The logo is readable. A white shape sits on the right edge. This Mac has not shown this screen.*

![The main menu, New Game selected, prison gate at the right](linux-main-menu.png)

*The main menu from the same Linux run, also written at 16:54 on 20 November 2026. New Game is the selected row, and the corner says Not Signed In. The gate behind the menu is the same exterior as the title.*

## The picture is a prison, with streaks

I do not have a reference frame from a real Xbox to compare against, so I will not call any of this correct. What I can say is what the renderer actually wrote down.

Earlier the same day the guest picture was only half there. The left side was black. The right side was the prison gate in green light. That file is 320 by 240, which is the game's own picture buffer, not a photo of a window.

![Half a prison gate, the left side of the frame still black](linux-framebuffer-half.png)

*The game's own picture buffer at 15:41 on 20 November 2026, from the Linux run. The left half is black. The right half is the gate. This is the broken present, before the title card above.*

Gameplay, once I got into a cell block, is recognisable and wrong in a way I already knew about. Dark bands run across the frame. The colour leans magenta. A Help prompt sits in the corner. The handover notes say the streaks and the magenta cast predate the new graphics path. I looked at these files on the evening of 20 November before putting them here. I left out other captures that showed the rest of the desktop.

![A cell block with three figures, crossed by dark horizontal bands](linux-gameplay-streaks.png)

*A gameplay frame written at 17:36 on 20 November 2026 by the Linux profiling run. Three figures stand in a cell block, a Help prompt is in the corner, and dark bands cross the picture. This is the view that was still at a few frames a second.*

About one run in three still dies in a different way. A USB housekeeping loop never finishes. The pad goes dead, and if the game thread is the one stuck in the loop the picture freezes at zero. I have not caught it in a log yet. The notes say to retry.

## The cells are waiting on the processor

The menu fix did not move the cell block. Gameplay is typically 1 to 4 frames a second, depending on the view. It was about 1 before. A wall-clock sample of the graphics thread, saved with the 17:36 frames, split like this:

| Share | What it was doing |
|---|---|
| about 45% | Interpreting vertex programs on the processor |
| about 17% | Talking to the graphics driver |
| about 10% | Uploading textures |
| about 8% | Drawing, on the processor, the batches the graphics chip refused |

The game itself spends most of that time waiting. A gameplay frame runs about 200,000 vertex programs. That is the lighting, several times over, plus the shadow volumes. Sixty frames a second means those programs have to run on the graphics chip. Doing more of the same work on the processor will not get there.

The present rate is the number in the window title. A separate graphics counter stays on one flip and is not the frame rate. I am not going to quote it.

## This Mac drew the logo

This machine is a Mac with an M4 Max. I built the program here, on this machine, and left the older Linux binary where it was. The new one is a native arm64 program. A probe created an OpenGL context and named the chip as an Apple M4 Max. That probe is not a frame.

The boot is. The window opened, the game reached its entry point, and after a long stretch of loading at zero the logo sequence came up. The measured lines, from the window itself, were about 59 guest frames a second and 58 presented. One sample was 59.23 and 58.24. A few dipped to 50 and 51. I am not calling that sixty, and I am not calling it the prison. The file it opened during those seconds is the Universal logo video. The cells have not been timed on this Mac.

![The Universal logo, a globe and the word UNIVERSAL, with a black strip on the right](mac-universal-logo.jpg)

*The Universal logo, read back from this Mac's window at 20:14 on 20 November 2026. The picture is the game's own frame. The window was wider than that frame, so the right side is black. The title bar was reporting about 59 guest frames a second and 58 presented. The process aborted a few seconds later.*

The abort was the program itself. The crash report says abort, from the allocator, because a pointer being freed was never allocated. The stack is the window thread, inside the controller event code, while the logo was still on screen. It is not a guest fault. I have not fixed it. There was also one driver note before the logo, that a texture unit was bound as an integer sampler and the texture could not be used, so the driver substituted black. The logo still came out looking like the logo.

The window came out 3840 by 2300 in that capture. The settings file asks for 960 by 720. The size helper multiplies by the display scale on this Mac the same way it does on the Neo. The width matches that double scaling on a retina display. The height does not, and I have not chased it.

macOS still has OpenGL, and the newest core profile named in this Mac's header is 4.1. I checked that header on 20 November 2026. The Linux path uses later features this Mac does not have: a clip-control call, image load/store, and atomic counters. The Mac build avoids those. Geometry shaders do exist here.

The toolkit I am building on says, in the readme I opened, that a Mac build is in scope and that it uses SDL2 and OpenGL. The public page calls the current release v0.18.0. I have not diffed this tree against that tag. (On the afternoon of 21 November I did, and merged four of its fixes; that is the next section.) The vertex translator that ships with the toolkit targets a Windows shader language, and a few of its operations do not match the interpreter I already trust. I am not copying anyone else's translator. The one for this port has to be written from the interpreter that is already in the tree. The logo did not need it. The cells still do.

Two smaller things, so I do not pretend they are done. The comfort features from the Eternal Darkness port (a sharper internal picture, a pause menu, volumes, stick deadzone, and the rest) are not in this build. A full save-state of the kind that port uses is not portable either: that one snapshots an interpreter, and this game has already been translated into ordinary machine code. And the speed work is local. Nothing from it is committed.

## The next afternoon, the cell block

The abort from the night before did not come back. I launched it a dozen times today, windowed and headless, and none of them died. The fault was the controller code enumerating joysticks on two threads at once, and it was already fixed before I sat down; what I can say is that nothing I ran today reproduced it.

The black band is not a bug, and I spent a while proving that. Ever since the first Mac frame there has been a strip of black along the bottom, thirty-odd rows of it, and on the bad captures it looked like tiles dropping out. It is in the game's own art. Three things settled it.

I ran the same build through the processor's own rasteriser instead of the graphics chip, on the same menu screen. The band is identical in both. Those are two separate drawing paths over the same translated game, and they agree on the band while disagreeing on about twenty-six thousand pixels elsewhere in the panel.

Then I put this Mac's main menu beside the Linux one from last night, both resampled to the same size, and compared them a row at a time. They agree to within about one unit of brightness all the way down, including the falloff: 45.6 against 45.4, 43.5 against 43.0, 39.3 against 38.2, 14.9 against 14.9, and then zero in both. The Mac is drawing what the Linux build drew.

And in forty-one consecutive frames of the cell block, not one had a band of eight rows or more. The intermittent thirty-two-row case was from a binary an hour and a half older than this one, and it did not come back.

What misled me was my own measurement. I was counting near-black pixels in the bottom rows, which cannot tell a rendering fault from a dark floor, a letterboxed cutscene, or a menu that simply ends there. Four rounds of diagnostics went at a defect that was not there. I have replaced the measurement with a frame-by-frame capture that pairs each picture with the drawing call that produced it.

The cell block itself, on this machine, is at sixty. Over forty consecutive presented frames it ran 59.16 to 60.25. Two and a half million drawing batches went through, none of them refused, none of them falling back to the processor, and every vertex transformed on the graphics chip. A windowed run — a real window, not the offscreen driver — held 59.0 to 60.2 with no fault. I left it alone for two hundred seconds and it stayed up at 58.8 to 60.0.

Sound opened at 48 kHz and the audio processor started, and the first run I measured had no underruns in it. That measurement was taken while the level was loading and it was too kind. Playing it properly, the menu chatter came out as static and the log had 377 underruns in one windowed run. The queue was 43 milliseconds deep; the video path leaves the processor busy enough that it ran dry. At 85 milliseconds the same scene ran 4 underruns, and a fresh launch of the app has none so far. That is a deeper cushion, not a cure, and I have written it down that way.

![Riddick in a prison corridor with the Johns subtitle and a Help prompt](mac-gameplay-cellblock.png)

*The dream cell block on this Mac, read from the game's own framebuffer at 14:39 on 21 November 2026. Riddick stands in the corridor, the Johns subtitle is on screen, and the Butcher Bay sign is behind him. This is the picture at about sixty frames a second. Read from the framebuffer, not a photo of a window.*

I also merged four fixes from the toolkit's v0.18.0, which shipped on 20 November while I was writing the first draft. The three that matter are about two-dimensional quads: a pre-transformed vertex whose w comes out infinite is now drawn instead of being thrown away, fog at infinite distance follows what xemu does, and a colour clear now counts as drawing the surface. The fourth is the Mac's path folding, which was returning whatever spelling the game asked for while Linux returned what the disc holds. I applied them by hand because this tree's executor has diverged from the release by two thousand lines, and I left out the memory and audio-pacing work: bigger blast radius, and none of it was in the way.

The merge is not a guess. Refused batches are still zero, the frame rate is unchanged at 59.2 to 59.9, and the main menu moved slightly closer to the Linux reference. The menu did change by about nine thousand pixels, which is the fog fix landing on that tilted panel.

Ian played it before I finished this and found what my own numbers had missed. The window said fifty-five frames a second while the cutscenes crawled and the menus crackled, and both of those are true at once: the counter I had been trusting counts the display flipping, not the game drawing. A cutscene can flip sixty times a second over one frame of content.

Profiling that state found the real stall. Every video frame was being uploaded into a texture the graphics driver was still reading from the previous frame, so the driver waited for the chip (`GLDShareGroupRec::waitUsage`, 193 of 214 samples in the hottest path). The renderer now stages those uploads through three rotating textures, so the one being written is never the one in flight. Measured on the intro movie, distinct content frames went from 26 to 37 a second, and the wait disappears from the profile.

That is progress, not arrival: the present rate during the intro still swings between 26 and 59, and I have not re-measured the cutscenes since. What I will not do again is quote a flip rate as if it were the game's speed.So the sentence I would not write last night is now true: this Mac draws the game at sixty. What is still true is that I have run the opening block and one later stream, not a playthrough. The sign over the corridor, the subtitle box, the Help prompt — all of it is the game. Whether a crowded fight holds sixty I do not know yet, and I am not going to claim it.

## What I would tell you

There is now a double-click app on this Mac, with its own icon, the same kind of launcher the Dante port uses. Opening it starts the game. On the night of 20 November this Mac joined the Neo's menus for one logo at about 59 and then the window code aborted; that abort did not come back on 21 November. The cell block is measured on this machine now, at 59.2 to 60.3 frames a second, with the sound running and no underruns. I will keep adding frames with the time and the rate, including a bad one.

## Sources

Toolkit. I read the [xboxrecomp](https://github.com/sp00nznet/xboxrecomp) readme on 20 November 2026, through the quick start. It describes a static recompiler that turns an original Xbox program into C, with Linux and macOS named as hosts. On 21 November I read further: the [v0.18.0 release notes](https://github.com/sp00nznet/xboxrecomp/releases/tag/v0.18.0), the pushbuffer-executor and D3D-translation pages under `docs/technical/`, `docs/GETTING_STARTED.md`, and the nv2a and d3d module readmes. `GETTING_STARTED.md` is where the line about a Mac build being the least exercised comes from. The four fixes I merged are the ones the release notes describe; I read the diff between the v0.17.0 and v0.18.0 tarballs rather than trusting the prose.

The game. I read the [Wikipedia article](https://en.wikipedia.org/wiki/The_Chronicles_of_Riddick:_Escape_from_Butcher_Bay) the same evening for the credits and the date: Starbreeze and Tigon, Vivendi, Xbox in North America on 1 June 2004. I did not use it for any claim about this port.

On this Mac. The OpenGL 4.1 line is from this machine's SDK header (`kCGLOGLPVersion_GL4_Core`), not from a web page. I am not citing forum posts I only saw as search excerpts.

Earlier on this blog, from 19 November 2026: [Dante reaches play, God of War III hangs](/dante-recomp-host-plays-gow3-recomp-hangs/2026-11-19/), the short [GoW3 Recomp](/gow3-recomp/2026-11-19/) note, and the [Dante project entry](/dante-recomp-host/2026-11-19/).

The menu and cell rates in the table are from the project handover for 20 November 2026, measured on the Neo. I did not re-run them while writing this draft. The logo rates are from this Mac's window log the same night, the run that aborted at 20:14. The capture is a read of that window's picture, not a photo of the desktop.
