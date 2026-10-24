---
project: Prism Shift
title: Prism Shift Starts Relaxed and Adds Color-Vision Shapes
summary: Relaxed became the starting pace for new players, and color-vision options now mark crystals with shapes as well as colors.
---
Prism Shift now starts new players on a calmer pace. Pieces fall and the rising tide climbs fifty percent slower, while the music and scoring stay the same. Players who already picked a difficulty keep it. Crystals also got a color-vision setting. Eight modes recolor them, and each crystal carries its own symbol, so two crystals never differ by color alone. The release is aimed at Sunday the 11th. Nothing was installed or played by a person on the phone yet, so how this feels is still unknown.

The pace decision is written up in `docs/DEFAULT_PACE_DECISION.md`. A bot played all fifteen levels at two seeds with and without Relaxed. Standard and Relaxed both survived all 30 runs. Median progress toward the energy target was 0.426 against 0.405. That does not show Relaxed is better for humans, and the doc says so. The more useful finding was a bug: every run ended by surviving, but the scenery and music only advanced on energy, so they stopped before the final phase. The progress measure now takes the larger of energy and survival.

Crystal visibility is documented in `docs/COLOR_VISION_AND_DIFFICULTY.md`. The five colors use set symbols: circle, triangle, square, plus, bars. Red and green deficiencies use a blue and amber palette. White symbols sit on black badges so they read on light and dark fills.

The full test gate on the 10th passed 629 tests in 93 suites. Of 40 interface flows, 36 passed first time. The four failures were fixed and twelve rechecks passed. A final audit marks completion as unproven: the two phone install attempts for that build were interrupted, a newer build did install, and music licensing evidence is still missing. A screenshot build failed tonight, so there is no picture.
