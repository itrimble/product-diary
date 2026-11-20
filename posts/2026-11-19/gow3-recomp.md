---
project: GoW3 Recomp
title: GoW3 Recomp Draws Its Splash Screen, Then Hangs
summary: A PlayStation 3 God of War game converted for my Mac reaches its own opening splash screen, then freezes for a reason I have pinned down.
---
I spent Thursday trying to get a PlayStation 3 game, God of War III, running natively on my Apple silicon Mac by translating its code ahead of time. It now starts, draws the "Sony Computer Entertainment presents" splash at about 60 frames a second for nearly 13 seconds, and then freezes for good. It never reaches a menu, let alone play. Because of that I did not package it as an app. A splash screen is not a game, and I did not want to hand myself something that only looks finished.

It uses the same toolkit as [the Dante experiment](/dante-recomp-host-links-build-fleet-gitignore-note/2026-11-18/). The measurements are from this machine, an M4 Max. The splash held 59.68 flips a second across 760 flips in 12.7 seconds. The toolkit reports zero unresolved system functions, 15 game archives opened and more than 20 graphics pipelines compiled cleanly. The host is 23 chunks of translated game code plus eight translated helper-processor programs. The translated Metal build linked, and I wrote a handover note listing the build and run steps. None of this says anything about gameplay speed, because I have none.

The freeze has two causes. The first I fixed. The game builds its graphics commands in two buffers and leaves a placeholder at the end of each, which it patches about 77 milliseconds later. My code gave up after 50 milliseconds, skipped 10.8 MB of commands, and lost the frame's completion marker with them. Raising the wait to 1,000 milliseconds let the boot advance from flip 750 to flip 770.

The second is still open. With the first fixed, the game's main thread sits in a tiny sleep loop waiting for a 16-bit counter at one guest address to reach zero. Something wrote 0x030A there, and nothing I have found is counting it down. A second placeholder then never gets patched, because that thread is stuck first. I know where it is. I do not know who should be driving it.

Two things I did not verify: whether the translated helper programs are correct beyond 128 addresses that fall back to a slower interpreter, and whether the freeze is the only thing between me and gameplay. The disc copy is 40 GB and stays off the diary.
