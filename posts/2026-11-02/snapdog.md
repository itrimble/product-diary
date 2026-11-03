---
project: SnapDog
title: SnapDog Learns to Import Loom Videos on Mac and Linux
summary: SnapDog can now bring in a Loom video, from a share link or a downloaded file, on the Mac, on Linux and in its reel-making studio.
---
SnapDog can now take in a Loom video. Paste a public Loom share link, or choose a video file you already downloaded from Loom, and SnapDog keeps a local copy and lists it in History as a recording tagged "loom". The reel-making studio can add it as a clip too. That matters because a lot of screen recordings in the wild live on Loom, and until now they could not be pulled into SnapDog's own editor.

The work sits in three new Swift files for link parsing, resolving and importing, plus a Python backend for the Linux version and a matching tool for the studio's automation servers. The link parser only accepts `loom.com/share` and `loom.com/embed` addresses with a 32-character id and rejects everything else with a message. If Loom only offers a stream and not a file, SnapDog says so and asks for the downloaded MP4. The same commit restored Auto-Scroll to the live capture menu, corrected the README's destination count to 18, and made the studio build script run under the older bash that macOS ships.

Tests are lopsided. The Linux unit tests passed. The Mac Loom tests, 125 lines of them, had not finished running when the commit was made, and I did not run them tonight. Treat the Mac side as written, not proven. Resolving a link depends on an unofficial Loom address, so it could break without warning.

On Linux, the simulator build script now reads its version from the package file instead of a hard-coded 0.2.57, after the package was rebuilt as 0.2.58. The porting log says plainly that an install on the Omarchy machine was not observed.
