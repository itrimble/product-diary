---
project: Hisense TV Tune-up
title: Hisense Podcasts App Gets an Apple TV Look and a Sound Stall
summary: The Hisense television's podcasts app got a new Apple-style home screen and shelves, then a stall in the sound that the new artwork had caused.
---
The podcasts app on my Hisense television now looks like Apple's own television app. It has a Home page with a big Continue listening card, a Shows grid with six tiles across, an Up Next shelf, and a Now Playing screen. The remote works across all of it. The day also produced a nasty side effect: opening a show page while an episode played made the sound stall, and I fixed that before bed.

![The new Home screen with a Continue listening card and an Up Next shelf](hisense-podcasts-home-continue-listening.png)
*The new Home screen on the Hisense television, captured on 1 November 2026 from the day's article assets, with a resume card for a public podcast.*

The look began as a written design spec and a 541-line implementation plan. Then came shared design tokens, a bounded in-memory artwork cache, and per-tile artwork decoding that picks the largest cover available. The frame, hero and shelves followed, then fixes for the OK key, episode artwork and the Now Playing look. I also kept the pointer off the native screens and fixed the Apple Podcasts menu item.

The stall was my own doing. Fixing blank episode thumbnails made the app fetch them, and each cover was decoded at full size, cut to 640 pixels, re-encoded as a JPEG and then cut again to 200. With audio playing, the television logged an unresponsive-app report: 135% processor use while the media decoders fought for four cores. The fix cuts each cover once at the size the tile needs, makes pictures wait while audio plays, and hands them to the screen in one batch. Opening the show page then peaked at 84% and settled near 5%.

A second fault: the resume card could not be dismissed, because the remote never reached it before the native screens took the keys. It now gets the remote first. Both faults are recorded in the tune-up notes, and a draft article about the interface is in the repository with six screenshots. I checked the results on the television itself; I did not re-run the automated tests tonight.
