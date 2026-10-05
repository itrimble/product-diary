---
project: QixForge
summary: All 100 levels were play-tested by a bot and rebalanced, and the game gained story scenes and per-sector music.
---
QixForge got a full balance pass across its 100 levels, plus story scenes and music. A computer-driven player played the whole campaign, and what it found got fixed: some levels could be won with one straight line, skipping the boss, and early sectors were too harsh. Each sector now has its own music, and 32 short neon story scenes introduce sectors, bosses and the ending. Result-screen buttons also answer every tap now.

The rules fixes came first. The Qix and its minis now stay off claimed ground, and a claim captures any minis it closes over, which closes the one-cut win. The whole drawn Qix tendril cuts your line, not only its centre. Guardian phases now arm the Qix properly; before, it fired once at the start and never again.

Balance: in early sectors drawing runs at 75% of border speed and the Qix lurches erratically, tapering off from sector 5. Win targets sit between 66% and 78%. Bolts start from level 53, five seconds apart, never in the first three seconds or right after a hit, and always slower than the player. Combos cap at 4x. Sparx are desynchronised and respawn clear of the player.

Smaller wiring: the menu shows CONTINUE and a tap-twice NEW CAMPAIGN once progress exists, endless mode carries score and lives between waves, and clearing level 100 no longer saves an out-of-range level.

Music is rendered off the main thread. Cinematics come from `Tools/Cinematics/generate.py`, and `Tools/BalanceSim` runs headless campaign sweeps. A README and a design and balance reference landed in a second commit. No screenshot: the capture script only photographs today's build.
