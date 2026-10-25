---
project: Epochs of Power
title: Epochs of Power Opponent Stops Peeking at Your Units
summary: The computer opponent in my strategy prototype no longer sees the whole map, so it now has to scout like a player would.
---
The computer opponent in Epochs of Power used to cheat. It knew where every one of my cities and units sat, however far away, and marched straight at them. It now sees only what its own units and cities can see, and when it has found nothing it wanders onto neighbouring land to look. That makes it beatable by a sneaky approach, which is the point of a strategy game.

The change is in `Core/EpochCore.cpp`. A new `sees` function answers "can this owner see this tile?" separately for each side, using the same rule as before: your own territory, plus two tiles around any unit or city. The old code reused the fog drawn for the human player as the opponent's knowledge, with a comment calling it an omniscient prototype. The scouting step draws from the game's saved random number, so a saved game replays the same way. I did not run the core tests against this change, and the working tree is still uncommitted.

Two smaller things sit beside it. The README now opens with a note that the project is for my own use, not public release, and `docs/ASSETS.md` now allows AI-generated art, provided every such asset carries an `ai.` prefix in its name and a record of the model, seed and prompt. The kit pictured below is still the hand-built set of 27 low-poly pieces, 3,833 triangles in total.

![A contact sheet of the 27 low-poly cities, units and terrain pieces in the Epochs of Power mesh kit](epochs-of-power-mesh-review.png)
*The offline review sheet of the project's 27 original map pieces, from the project's art folder as it stood on 24 October.*

The earlier [research entry](/civclone/2026-10-23/) covers the study of the original game this builds towards. An attempt to photograph the app that night failed: the build stopped with three errors, so there is no live screenshot.
