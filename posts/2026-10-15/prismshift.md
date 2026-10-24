---
project: Prism Shift
title: Prism Shift's Rising Water Now Fills the Drowned Spaces
summary: The crystal game's rising water now fills the drowned spaces properly, and the television version got clearer text and a quieter start.
---
Prism Shift's water now behaves like water. When the tide rises in the water worlds, it fills the spaces it has covered, where before it could leave a strip of dry rock showing above the drowned squares. The Apple TV version also got easier to read from the couch, with clearer mode names and text, and a faint ticking sound that played under the menus was silenced. Ian installed the finished game on the phone and on both televisions, and it launched.

The water fix is `2f6c373`, in `TideNode.swift`: the fill now runs above the drowned cells instead of stopping at them. A new `TideVolumeRenderingTests.swift` covers it, and the before and after frames are kept in the notes under `oct15/rising-water-volume`. The ticking came from the beat carrier, a tone that keeps the music's timing. It is now silent (`8b2e50b`), with a regression test in `AudioEngineRegressionTests.swift`. A second audio bug was cancelled screen changes still starting sound (`f8574a5`).

Other work that day was proof rather than features. The signed phone and television builds were archived as acceptance candidates, and all difficulty settings were measured against the release gates. The campaign pacing was run continuously with boards carried over between stages. A cinematic and credits screen were added for the television, and a pause pressed while the game was still starting up is no longer lost (`f9367a3`).

The listening review of the new television sound is still pending, and so is the return of the authored reverse stages and the Energy mechanic, which went back on the visible to-do list (`5cf25cd`).

The game's web site got a social preview made from real gameplay, current phone skins in the gallery, and preview music matched to the in-game level.

There is no picture tonight: the screenshot run timed out.
