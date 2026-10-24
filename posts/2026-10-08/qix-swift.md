---
project: QixForge
title: QixForge Levels Get Hand-Built Obstacles and a Pace Choice
summary: Every level got hand-built obstacles to claim around, and a slower or faster game pace can now be chosen in the options.
---
QixForge boards are no longer empty. Each stage now has hand-placed solid blocks and walls, and every one of them can still be cleared. The blocks are excluded from your percentage target, so playing around them costs nothing. A new Game Pace option goes with it. Standard is the original speed and Fast makes the game 1.5 times quicker, leaving menus and music at normal speed. Restore Defaults sets it back to Standard and leaves progress alone.

To judge the redesign I let a bot play whole campaigns on three seeds. The average-skill bot cleared 282 of 300 on the new terrain, where the old one gave 289. The expert bot moved from 298 to 299. Stages one to ten were perfect at 120 of 120. Eight levels still beat the average bot, 58, 70, 78, 79, 83, 88, 89 and 99, so they are my tuning list. Level 88 got worse in one sample, but its mirror image fared no better, so that sample was thin grounds for flipping it and I left it alone. Four stages, 28, 30, 34 and 39, were reoriented after the numbers said to.

Fast pace costs clears, as it ought to: 265 of 300 for the average bot, down from 282. On Standard, results line up with the previous build stage by stage. Runs average 44.6 seconds there and 31.4 on Fast.

Underneath, the balance simulator learned about pace by cutting each frame into slices of 1/60 second or less. It also picked up a search for the level 99 hunter count and a command to export music. The territory rules now ignore solid area, and a fixture proves it: claiming a 14 by 12 rectangle around a 4 by 4 block on a 20 by 20 board must give 152 of 384. Menus, achievements, a campaign save and a render budget arrived alongside. I have committed none of it; 129 files are changed, with a pile of new ones besides.

![The QIX Sectors title menu on a phone simulator showing Continue, New Campaign, Endless and Scores](qix-swift.png)
*The game's title menu on a phone simulator, still named QIX Sectors, with Continue, New Campaign and Endless. Screenshot added to the diary on 9 October 2026.*
