---
project: QixForge
summary: QixForge now explains why you lost a life, plays properly sideways, and starts on a dark screen.
---
QixForge got a big round of play-testing and polish. When you lose a life, the game now tells you why, whether a monster cut your line, you crossed your own trail, or something else got you. Every screen now works when the phone or tablet is held sideways, where several menus used to spill off the edge. The game also opens on a dark screen instead of flashing white before the neon menu.

Fourteen commits landed. The death explanation comes from a recorded cause (Qix cut, mini cut, Sparx, self-cross, decay, bolt) that the scene shows in a callout when a life is lost. Upgrades, shield saves and boss phases use the same callout style, as pills over the arena.

Sideways play was the largest piece. Options, High Scores and Achievements stack their header in a left column and give content the right. Sector Complete uses two columns. A crash when opening a sub-screen before the first layout (a negative mask size) is fixed. On iPad, the interface scale is now measured against a phone in the same orientation, so side columns no longer stay tiny. Smaller fixes: zero-point runs no longer post "PLAYER 0" on the leaderboard, and a bug where rounds never ended in real play is fixed. The power tray no longer shows a permanent "1" on timed powers. The launch screen colour is #05070D from the art bible.

New UI tests drive all of this: `PlaytestUITests` covers the orb and power-up loop, the rarer power-ups, and all seven screens when sideways, using a debug-only `-placePickups` launch flag to line up pickups on the player's path. No screenshot today, because the capture script refused a past date.
