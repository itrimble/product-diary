---
project: QixForge
title: A Bot Play-Tested All 100 QixForge Levels
summary: All 100 levels were play-tested by a bot and rebalanced, and the game gained story scenes and per-sector music.
---
A bot played all 100 QixForge levels, and it found the shortcuts. On some levels one straight line won the game and the boss never mattered. Early sectors, meanwhile, were harsher than they should be. Both are fixed. On top of that, each sector has its own music, and 32 short neon story scenes introduce the sectors, the bosses and the ending. Buttons on the result screens respond to every tap too.

The cheat first. The Qix and its minis were able to sit on ground you had already claimed. Now they stay off it, and closing a claim around minis captures them, which ends the one-cut win. A cut now happens wherever the drawn tendril touches your line, rather than only at its centre. Guardian phases had a quiet fault: the Qix fired once at the start and never again, and it now re-arms properly.

Then difficulty. In the early sectors you draw at 75% of border speed, and the Qix lurches about until sector 5, where that eases. Wins need between 66% and 78% of the board. Bolts first appear at level 53. They come five seconds apart, never in the opening three seconds or just after you are hit, and they are always slower than the player. Combos stop at 4x. Sparx no longer move in lockstep and respawn away from you.

Smaller changes: once you have progress the menu offers CONTINUE and a tap-twice NEW CAMPAIGN. Endless mode keeps score and lives from wave to wave. Beating level 100 no longer saves a level that does not exist.

The music is rendered away from the main thread. The story scenes come from a generator script, and a headless balance tool runs whole-campaign sweeps. A second commit adds a README plus a design and balance reference. I would rather a bot found the one-line win than a player did after launch.
