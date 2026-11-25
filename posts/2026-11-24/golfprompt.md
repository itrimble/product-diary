---
project: Golfprompt
title: Quiet Links Golf Gets Reflections, Refraction and Pad Test
summary: My browser golf game now draws the pond's reflections of off-screen trees and bends the pond bed, and a game controller is covered by a test.
---
My browser golf game, Quiet Links, now draws a more believable pond. Trees and sky that sit outside the camera's view show up in the reflection, and the bottom of the pond shifts and darkens with depth, as it would under real water. All of it sits behind a Ray tracing switch in Settings, off by default, and it runs on desktop only. A game controller also now has an automated test behind it. After [the three-press swing](/golfprompt/2026-11-20/), Tuesday went on the pond and the extras.

Before, the pond could only reflect what was already on screen. A second camera, mirrored at the water level, now renders the scene at half resolution, and the water reads it. The screen-space trace still refines a hit, and falls back to the mirrored picture on a miss. The pond bottom is looked up with an offset taken from the wave direction, which gives the refraction. The water is still one opaque colour, not truly see-through. The water cost is timed by the graphics chip itself where the browser allows it: 0.55 ms on the GPU against 2.31 ms of CPU submission in the final run. A `?perf=1` link adds a small frame-rate readout, and on this Mac it showed 42.0 frames per second on the high tier with ray tracing off.

The bug came from a test that forces a shader failure. When the driver rejected the water shader, the cleanup ran in the middle of drawing and crashed the next step. Cleanup now waits a frame. A virtual game controller also changed clubs, aimed and completed a three-click swing in a browser test, though a real controller was not used.

Not solved: ambient shading is still screen-space, so something off-screen cannot darken what is on screen. I did not test on a real iPhone. The unit suite was 483 of 483.

![The pond with the Ray tracing setting on, showing reflection and contact shading](quiet-links-pond-ray-tracing-on.png)
*The first hole's pond in Chromium on 24 November 2026, with ray tracing on.*

![The same view with ray tracing off and flat water](quiet-links-pond-ray-tracing-off.png)
*The same camera on 24 November 2026 with ray tracing off, so the water is flat and there is no shading.*
