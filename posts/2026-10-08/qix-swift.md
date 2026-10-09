---
project: QixForge
summary: Every level got hand-built obstacles to claim around, and a slower or faster game pace can now be chosen in the options.
---
QixForge levels now have solid blocks and walls on the board, and each one has a route to clear. Before, every stage was an empty rectangle. Claiming ground around an obstacle works the way you would hope, and the blocks never count against your percentage target. There is also a new Game Pace setting. Standard is the original speed. Fast runs the game 1.5 times quicker while the music and menus stay at normal speed. The choice is saved, and Restore Defaults puts it back to Standard without touching progress.

The measurements are in `docs/DESIGN.md` under "October 8 terrain redesign". A computer player at average skill cleared 282 of 300 full-campaign runs on the new terrain, against 289 on the old. Expert went from 298 to 299. Both used three seeds. The first ten stages cleared 120 of 120. The average bot loses runs on levels 58, 70, 78, 79, 83, 88, 89 and 99, and those are now the tuning list. Level 88 looked worse on one sample, and a mirrored layout did equally badly, so I did not flip its orientation on that evidence. Orientation did change on stages 28, 30, 34 and 39, after measurement.

Fast pace is harder as expected: 265 of 300 average clears versus 282. Standard results match the previous build stage for stage. Average runs lasted 44.6 seconds on Standard and 31.4 on Fast.

In code, `BalanceSim` gained a pace argument that splits each frame into steps no longer than 1/60 second, a `gauntlet-search` mode for the level 99 hunter count and a `music-export` command. `TerritoryBoard.swift` excludes solid area from both captured and claimable area. A fixture claims a 14 by 12 rectangle around a 4 by 4 block and expects 152 of 384 on a 20 by 20 board. Menus, achievements, a campaign progress file and a render budget also appeared. All of it is uncommitted: 129 files changed, plus a pile of new ones.

![The QixForge guardian introduction screen on a phone](qix-swift.png)
