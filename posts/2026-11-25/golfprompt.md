---
project: Golfprompt
title: Quiet Links Golf Gets a Real Crowd and an iPhone Build
summary: My golf game gained striped fairways, tee markers, a 452-person gallery made from the scanned golfer, and a first install on my own phone.
---
The golf course in my browser game stopped looking like a test level on Wednesday. Fairways now have mowing stripes, the tee has markers and a wooden hole sign, trees cast soft shadows on the grass, and six holes have roped-off crowds watching. The crowd started as simple shapes and ended the day as copies of the game's own scanned golfer. I also put the game on my own phone for the first time, as an app wrapped around the web version.

None of this is committed yet. The work sits in the project's working copy, and its own diary log records each pass with measurements.

The crowd is 452 spectators across six holes, none on a fairway, green, tee, bunker or water. Each person is the 30,996-triangle golfer, posed four ways from its animation clips and simplified to 2,958 triangles. The first simplification scrambled the texture into confetti, because the scan's seams split almost every vertex. Taking each new triangle's texture coordinates from the nearest original triangle fixed it. Two of the ten looks are recoloured caps meant to read as hair, because there is no head under the scanned cap.

On the MacBook the high setting with ray tracing held 60.0 frames a second with the new crowd. Unit tests passed 485 of 485 and the browser suite passed 62 of 63; the one failure is the newcomer swing-key test, which was already failing earlier in the day. The crowd has no collision, so a ball can pass through a spectator.

The phone numbers are weaker. The iOS simulator runtime is missing, so I measured in the Android emulator: 60.0 frames on the menu and 54.0 on the tee, but the 3D world drew black there, so that tee figure is not a real result. The iPhone build installed, with the game's golf icon. A reported crash did not reproduce, and it is a web view inside an app, not a native renderer.
