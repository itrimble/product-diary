---
project: Pipe Flow
title: Pipe Flow Gets a Living Sea That Reacts to Your Moves
summary: Pipe Flow's first world now has a living sea of turtles, kelp and coral that reacts as you play, on phone, Mac and television.
---
Pipe Flow's first world stopped being a static backdrop. Behind the puzzle there is now a small living sea: a turtle drifts past, kelp sways with the water current, the coral recovers colour as you clear more levels, and an anemone and clownfish react when you link pipes. When water leaks the fish flee. When you win, the scene blooms. Only the first chapter, First Drop, has it so far, and I have not yet reviewed it on a real device.

I wrote the design as a world bible first, with seven chapters in mind. Then I built the layer in three pieces: a small model that turns play into reactions (about 126 lines), a per-chapter profile holding the data, and a pixel-art factory for the turtle, kelp, coral and fish. The layer itself is 349 lines and attaches to the game scene behind the board. Cheaper devices get fewer creatures through the existing visual quality setting, and the tests insist the sea stays off the board and allocates nothing per frame.

Twelve new tests cover it, including that an unplayed chapter already looks alive and that the current eases in and out instead of snapping. The full iPhone suite passed with 633 tests, seven skipped, no failures. The Apple TV and Mac builds compile. I did not run the Godot desktop port, which has no sea yet.

One side find: the script that converts the phone code for Apple TV had drifted from the source since an earlier change. Fixing it also brought the stale TV status bar up to date. I recorded review clips on an iPhone 17 and a new Apple TV simulator, using auto-solve and auto-release launch options. The raw recordings are not committed. The next step is my review of First Drop, then worlds two to seven.
