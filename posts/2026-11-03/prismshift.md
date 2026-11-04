---
project: Night Chorus
title: Night Chorus Gets Liquid Slag and a Button Shape Test
summary: Night Chorus, the crystal puzzle game once called Prism Shift, gained a flowing drowned-slag look and a test that catches lopsided menu buttons.
---
Night Chorus, the crystal puzzle game once called Prism Shift, is getting a more convincing flooded floor. In the Mac prototype the drowned area used to look like a row of separate gem tiles. It is now meant to read as one body of dark liquid, with soft edges only where it meets open space. This is work in progress in my working copy, not a release, and I did not build it tonight.

The change lives in the crystal drawing code. The drowned tiles now sample a different, more textured slice of a single torrent image, and tint it less heavily. On devices that allow custom effects they use a new water effect instead, which is told each tile's position in the larger pool and which of its sides are exposed. That is how the edges soften without breaking the flow.

Alongside it I added a test that renders the real menu button at four widths, 224 to 480 pixels, and checks the pixels. It looks for a seam through the middle, a gap, left and right ends that do not match, and a rounded end stretched into a square. The aim is to catch the lopsided capsule problem even when layout numbers look right. A second new test checks that the built app really contains the new artwork set, since a folder existing in source proves nothing about what the packager included.

Other edits: two config files now ship in the test bundle, the support link in the store metadata changed, a few scripts were retargeted, and the Godot fleet test script was reworked. My attempt to photograph the game for this entry failed because the build did not finish, and I did not run any of the new tests.
