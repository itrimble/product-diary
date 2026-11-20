---
project: Dante Recomp Host
title: Dante Recomp Host Plays From Logo to the First Level
summary: The converted PlayStation 3 game now starts on my Mac and reaches real gameplay, though an automated tester has not yet got it through a level.
---
The converted PlayStation 3 game finally ran on my Mac on Thursday. On Wednesday [I could only say it compiled](/dante-recomp-host-links-build-fleet-gitignore-note/2026-11-18/). By lunchtime Thursday it was showing the publisher logos, then the title screen, the main menu and the difficulty choice, and by late afternoon it was playing the opening cutscene and the first stretch of gameplay. Colours were wrong early on and I fixed that around 12:50. It is still an experiment, and the game is not finished: a robot player I built to test it never once completed a level.

I kept a screenshot at each stage, 11 in all, between 12:09 and 16:40. I am not publishing them. They are frames from a commercial game, and that is not mine to post.

The robot player lives in `scripts/bot`. It reads the frames the Mac renders, presses virtual buttons through a pad file, and counts a run as a success only if the game writes a real save file. It copies the game data first, so my own save is never the thing under test. I ran ten checkpoint runs. All ten ended with success=False. Seven left the host alive after the timeout, and three (checkpoints 6, 7 and 9) had the host die. The longest ran about 900 seconds. One log shows it wandering a hallway corner route and ending in a death cutscene at 160 seconds.

The rest of the day went on the plumbing around it. A new `qol` folder holds a settings file, diagnostics, input tweaks and a Metal shader precompile step. There is also an F3 overlay for guest frame rate, host frame rate, average frame time and 1% lows. A benchmark folder and Windows build scripts arrived too, though I ran only the Mac build. The overlay is code I read, not numbers I saw: I did not capture any frame rates today.

I also packed snapshots of the sources into `patches` before and after the benchmark work, plus a copy of the pre-MetalFX-HD files, so I can roll back. The boot logs are mostly repeating waits on the same two threads, which is the sort of noise that hides the real stall. I did not trace the three crashes.
