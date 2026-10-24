---
project: QixForge
title: QixForge Now Explains Why You Lost a Life
summary: QixForge now explains why you lost a life, plays properly sideways, and starts on a dark screen.
---
In QixForge, losing a life used to leave you guessing. Now the game says what got you: a monster cutting your line, you crossing your own trail, or something else. That was the headline of a long play-testing session, fourteen commits in all. The other two changes you would notice are that every screen works with the phone or tablet turned sideways, and that the game opens dark instead of flashing white ahead of the neon menu.

The explanations rely on a cause recorded at the moment of death. The list is Qix cut, mini cut, Sparx, self-cross, decay and bolt, and the scene turns it into a callout over the arena. I reused that look for upgrades, shield saves and boss phases, so all the in-game news arrives as the same kind of pill.

Sideways play took most of the effort, because several menus ran off the edge. Three screens, Options, High Scores and Achievements, keep their title in a column on the left and give the rest of the width to content. Sector Complete is laid out as a pair of columns. Opening a sub-screen before its first layout could crash the game, and that is fixed. On iPad, sizes are now compared with a phone turned the same way, so the side columns stop shrinking to almost nothing.

A few smaller repairs: a score of zero no longer lands on the leaderboard as "PLAYER 0", rounds that never finished in real play now finish, and timed powers stopped showing a permanent "1" in the power tray. The dark launch screen uses the colour set out in the art bible.

UI tests now exercise the lot. They run the orb and power-up loop, the rarer power-ups and all seven screens sideways, and a debug-only launch flag lines pickups up along the player's path.
