---
project: Dante Audit Clock
title: Dante Audit Clock Fixes Ray-Traced Sun and Cutscene Shadows
summary: My Mac build of the PlayStation 3 Dante's Inferno port stopped shadowing whole cliff walls and stopped putting shadows on flat cutscenes.
category: games
---
My work on running the PlayStation 3 game Dante's Inferno natively on the Mac had two visible wins on Wednesday. The sun used for the new ray-traced shadows was pointing the wrong way, so in the Gates of Hell level the cliff walls were completely in shadow. It now comes from high in the sky. And the shadow pass no longer paints over flat, hand-drawn cutscenes and screen fades, which are not 3D scenes at all.

This is a separate copy of the open-source ps3recomp runtime where the Dante integration branch lives. It had 11 commits between 09:18 and 16:26. The first fixed a controller bug: pressing the arrows also nudged the left stick.

The sun fix replaced a low-angle light rotated through the game's own camera constants with a fixed, high direction in world space. On a 4K capture of Gates of Hell, 29.4 percent of the shadow mask came out shadowed, not 100. The same commit made frame dumps atomic, so a 4K image is never read half-written. The cutscene fix tracks which surfaces came from 3D drawing and keeps shadows to those.

The afternoon went to graphics accuracy. Occlusion queries, where a game asks whether an object was visible, had always answered yes. They now count real pixels through a Metal visibility buffer. No live title has asked a real one yet, so that path is tested but unproven in play. Textures with widths that are not powers of two now use the row pitch the game supplies, and two vertex program instructions now follow NVIDIA's specification. The test suite passed 53 of 53.
