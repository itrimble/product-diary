---
project: Dante Audit Host
title: Dante Audit Host Gets a Careful Build That Picks a Difficulty
summary: My Mac version of a PlayStation 3 game now has a separate, cautious test build that reached the difficulty screen and the opening story.
---
The Mac version of the PlayStation 3 game I am converting (see [Friday's entry](/dante-recomp-host/2026-11-20/)) got a second, more careful copy on Sunday, and that copy now gets as far as the difficulty screen. In an isolated test I moved the selection from the first difficulty to the second, confirmed it, and watched the game drop into its opening story. That is progress, but it is not a playable game: I have not verified the first stretch of real gameplay in this build.

The reason for a second copy is that the main working folder is a mess of experiments. I made a clean candidate folder instead, and on Sunday it received its first save, 16 files and about 3,400 lines. It holds the launcher, a settings loader, a cinematic skipper and a script that packs a portable Mac bundle. Nothing in it has been merged back into the main project, and none of it has been pushed anywhere.

Two fixes mattered for the difficulty-screen test. The Start button was not being handled properly in the candidate, and the benchmark launcher was forcing a setting that kept the pad state changing every frame. With both changed, the test got past the menu. A later bundle passed strict signature checks, a fresh-data diagnostic run and a muted 35-second startup. The combined build passed 40 registered tests.

Two things I tried did not work out. An opt-in rescue for the game's scripting engine caught a jump I injected on purpose, but my fake error was not a valid script error, and the next step crashed on empty data. That is not a recovery test and I am not calling it one. A gentler way of pacing the audio is also optional and has not been shown to fix the memory-freeing loop it was meant for.

I have no picture, because the only frames are from a commercial game. The notes say the game data stays private, and I am keeping to that. I did not test with a physical controller, and no automated run has finished a level yet.
