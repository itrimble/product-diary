---
project: Golfprompt
title: Quiet Links Golf Gets Real Crowds, Boulders and an iPhone App
summary: My browser golf game now has mowed stripes, rocks that stop the ball, a crowd built from the golfer, and a first install on my phone.
---
My browser golf game, Quiet Links, stopped looking like a blockout on Wednesday. The fairway now has light and dark mowing stripes, the first tee has markers and a hole sign, rocks in the rough actually stop a rolling ball, and the crowds around the greens are made of people instead of pawns. I also put the game on my phone as a real app for the first time. Following [Tuesday's pond work](/golfprompt/2026-11-24/), this was the day it started to look like a golf course.

![The first tee in a phone-shaped window, with mowing stripes, tee markers and a hole sign](quiet-links-first-tee-mow-lanes-phone.png)
*The first tee in a phone-sized preview on 25 November 2026, showing stripes, tee markers and the hole sign.*

The first stripes were far too strong, so I toned them down from 0.84 to 1.14 in brightness to 0.92 to 1.07. A stock sky effect rendered as a white sheet with the game's camera, so a small gradient does that job. Boulders had been decoration, and the ball rolled straight through. Now it bounces off or stops, with no penalty stroke, and each rock casts a sun shadow. That collision was only checked headlessly. The collider is a circle fitted to a low-poly rock, so the ball can stop a few centimetres short.  The crowd was the fun part. The capsule spectators looked wrong, so I baked the scanned golfer into four poses and cut it to 2,958 triangles each, down from 30,996. That gives 452 spectators over six holes, recoloured with ten looks and no new textures.  The frame rate was the real find. High quality with ray tracing sat at 44.5 frames per second, which ruled out the graphics chip. The camera was testing line of sight against terrain and trees twice per frame, so it now does that every third frame. It reads 60.0 on this Mac.

![The tee with the golfer-built crowd and two galleries beside the green on the high setting](quiet-links-real-crowd-gallery.png)
*The high setting with ray tracing at 60 frames per second, captured on 25 November 2026 on the MacBook.*

The iPhone build is a Capacitor shell around the same web game. It installed on my iPhone 17 Pro Max, but the launch was refused because the phone was locked, and the reported crash did not reproduce. It is not a Metal-native renderer. Unit tests were 485 of 485. The browser suite passed 62 of 63. The newcomer swing test still holes out in 12 strokes, not 7, because the caddie stays on the wedge, and two fixes I tried broke other tests, so I reverted both.
