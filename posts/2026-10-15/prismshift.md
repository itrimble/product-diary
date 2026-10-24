---
project: Prism Shift
title: Prism Shift's Rising Water Now Fills the Drowned Spaces
summary: The crystal game's rising water now fills the drowned spaces properly, and the television version got clearer text and a quieter start.
---
A bug in Prism Shift made its tide look wrong. In the water worlds, a rising tide could cover a square yet leave a stripe of dry rock showing over it. The water now fills everything it has swallowed. On Apple TV, mode names and text are clearer from the couch, and a faint tick that had been playing beneath the menus is gone. I put the finished game on a phone and on both televisions. It launched on each.

The tide fix changes where the fill is drawn: above the drowned cells rather than only up to them. The notes keep before and after frames, and a new test guards the behaviour. The tick came from the beat carrier, a tone that exists to keep the music in time, and it is now silent with a regression test behind it. A second sound bug is fixed as well: screen changes that were cancelled could still start audio.

Much of that day went on evidence instead of features. Signed phone and television builds were archived as candidates for acceptance. Every difficulty setting was measured against the release gates. Campaign pacing got a continuous run, boards carried over between stages. The television gained a cinematic and a credits screen, and a pause pressed during start-up is no longer dropped.

Two things are open. Nobody has done the listening review of the new television sound yet. And the return of the authored reverse stages and the Energy mechanic is back on the visible to-do list.

On the game's web site, the share preview now uses real gameplay, the gallery shows current phone skins, and the preview music follows the in-game level.
