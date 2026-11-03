---
project: Night Chorus
title: Night Chorus Gets Living Backgrounds for All 15 Chapters
summary: Night Chorus, the crystal puzzle game formerly called Prism Shift, gained animated worlds and hazards for its 15 chapters in a Mac prototype.
---
Night Chorus, the crystal puzzle game formerly called Prism Shift, started to feel like a place instead of a board. In an experimental Mac version, every one of its 15 chapters now has its own animated world behind the puzzle, with its own hazards, and the board blends into that world instead of sitting on top of it. Nothing here has reached players yet.

Two commits did it. The first wired 15 chapter profiles to background artwork in phone, tablet and wide sizes, so 45 new images in all, each about 2.5 to 3.2 MB. It added retained motion, a Pulse Line light effect, clearer responses to moves and themed hazards, plus a readable on-screen display. The experiment stays behind a `-mocoRoom` launch flag, and a second flag, `-livingChapter`, opens a chapter for review.

The second commit gave each chapter an identity in motion: caustics for water, orbit rings, heat shimmer, circuit streams and prism glints. Four beats of the soundtrack drive a slow ambient breathing, the grid and edge opacity were softened so the art reads through, and the splash on landing now stays at the hazard that caused it.

The checks came from the build fleet on the Mac mini. The first run built the Mac app and passed all 14 InfinityRoom tests. The second passed 22, including every chapter's graphics effect and artwork seams at three screen shapes. I reviewed chapters 2 to 15 by eye in the native Mac prototype. Still open: a live all-chapter pass on a desktop I am sitting at, and any frame-rate claim across devices. I make none. Nothing was released.
