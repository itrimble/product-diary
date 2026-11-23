---
project: Escape from Butcher Bay
title: Butcher Bay on Mac Gets a Performance Overlay and Debug Views
summary: The Mac port of the Xbox game now has an Apple performance overlay and a truer frame-rate readout, plus new tools for chasing the dark characters.
---
The Mac port of Escape from Butcher Bay can now show Apple's own performance overlay, and its window title no longer fibs about the frame rate. Before, the title counted the same picture twice if the game repeated it, so a number like 60 could hide a stalled screen. It now shows two figures: how many different pictures reached the window each second, and how many times the game asked for a new one. The dark characters are still dark. Sunday was about building better ways to look at the problem.

The overlay is opt-in. A launch switch turns it on from the terminal, and a marker file in the app's data folder turns it on for a normal double-click launch, so I can use it without a shell. An explicit setting in the environment still wins.

The rest was debug plumbing, all aimed at the combiner, the stage that blends textures and lighting. I added output modes that paint only the draws using the suspect texture stage and leave everything else in its normal colours. That keeps scenes recognisable in a capture. I also added a trace that prints each distinct combination of texture modes once, with the texture formats and sizes, so I can see which shader variants the dark characters use. The harness now clones the save for each run, and I restored one save that had drifted from the version in the repo.

Most of the commit by size is evidence: about 30 capture logs from the 21st and 22nd, plus a reference screenshot from the xemu emulator. I fixed nothing on the darkness today. I also did not rerun the full build against the reference after these changes, and I have no new picture to show.

The plan from [Saturday](/escape-from-butcher-bay/2026-11-21/) still stands: replace the combiner generator rather than keep patching it.
