---
project: Dante Recomp Host
title: Dante Recomp Host Skips Ahead and Gets a Graphics Menu
summary: My Mac version of a PlayStation 3 game now reaches its first battle 47 seconds sooner and has a graphics settings page inside the game's own menu.
---
The Mac version of the PlayStation 3 game I am converting now reaches its first battle almost 47 seconds sooner, and it has a graphics settings page built into the game's own options menu. The faster start matters because every test run used to spend nearly three minutes just watching the opening. It is still an experiment. No automated run has finished a level or written a save, as [Thursday's entry](/dante-recomp-host-plays-gow3-recomp-hangs/2026-11-19/) found.

The speed-up came from running the game's clock at double speed during the opening, then dropping back to normal before real play. Four times speed was almost no faster, at 174.7 seconds against a baseline of 175.5, because the game paces its video from audio, and the silent audio queue still drained in real time. Once I stopped feeding it blocks at double speed, the first battle appeared at 128.6 seconds. That is 26.7 percent sooner.

The first corrected run then missed the jump tutorial. The robot player's attack cycle was timed from launch, so cutting 47 seconds changed which move it was on when the battle began. I re-anchored that timer to the first frame it positively recognises as gameplay. The next run reached the first battle at 128.9 seconds, the jump tutorial at 242.0 and Death's arena at 382.9. Two later runs still ended without a save, with the boss around 72 percent health at best.

The graphics page is a seventh row in the original Options list. It offers 30, 40 or 60 frames a second, 1x to 3x internal resolution, two upscalers and two edge smoothers. Upscaling and smoothing apply at once; frame rate and resolution wait for a restart. I changed the resolution from 2x to 3x in the real game and the setting saved. Choices that would not be honest stay greyed out: uncapped frame rate, wide-range colour and baked lighting.

I looked at the screen and asked for the page to lose its brown backdrop and the title-bar readout, so the next build calls it simply Graphics. I have no physical controller test. I also built a private 8.3 GB app bundle, ad-hoc signed, not tried on a second Mac.
![The original Options list with Recomp Graphics as a new seventh row](dante-recomp-host-options-recomp-graphics-row.png)
*The Options list around 23:11 on 20 November 2026, with Recomp Graphics as a seventh row.*
![The Recomp Graphics page still on 2x resolution with a brown backdrop](dante-recomp-host-recomp-graphics-menu-2x.png)
*The Recomp Graphics page at 2x on 20 November 2026, still with the brown backdrop and title-bar readout.*
![The Recomp Graphics page after 3x 4K resolution was saved](dante-recomp-host-recomp-graphics-3x-saved.png)
*The same page after I saved 3x (4K) on 20 November 2026; the title bar says a restart is required.*
