---
project: QixForge
summary: The game now plays music and visuals in time with your moves, and offers nine color-vision settings so key things are never told apart by color alone.
---
QixForge now responds to how you play. Drawing a line plays notes that sit in the sector's key. Closing off a big area lands a chord on the beat. Getting close to an enemy makes the trail redder and the arena more tense. There is also a new button called Overdrive: once you have claimed enough ground or survived enough near misses, you can trigger it to slow every enemy for a few seconds and score double. The second change is for players who see color differently. The options now offer nine color-vision modes, so the border, your trail and the dangers stay easy to tell apart.

The reactive layer lives in `Sources/Game/Reactive/`, about 1,700 lines across a director, a synth, the arena visuals and the Overdrive rules. The director turns play into cues that are quantized to the beat, and both the sound and the visuals read them. It only changes presentation. Overdrive charges at 35% of the board claimed, plus up to 0.16 per close call. It lasts 8 seconds, with enemies at 0.45x speed. Ending it pays 60 points per percent claimed times the number of claims.

I checked that Overdrive does not distort the balance numbers. The test bot never spends it. Expert and average runs over all 100 levels were byte-identical with and without the code, and `ReactiveTests.testAFullMeterAloneChangesNothingAboutPlay` pins it. Options gained an Audio setting that scales the synth, where zero turns it off.

Colour vision is `ColorVision.swift` plus a picker in the settings. It covers protanopia, deuteranopia, tritanopia, achromatopsia and a milder form of each. Every mode but off adds shapes that need no color: ticks across the Qix, a dashed corrupted border, a dashed ring on hunters. `ColorVisionTests` simulates each vision type and requires a color difference of at least 25 in CIELAB, and 3:1 contrast against the arena, on all ten sectors. New UI tests cover touch controls and the settings and credits screens.

Still uncommitted, as with the previous days. The write-up is in `docs/DESIGN.md`.

![The QixForge title area on a phone simulator](qix-swift.png)
