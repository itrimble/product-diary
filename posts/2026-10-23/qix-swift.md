---
project: QixForge
title: Lightfence 1.3 Repaints Its Art and Its Site Says Out Now
summary: Lightfence's next version repaints every picture in the game at high resolution with shimmering gems, and its website now carries the store badge.
---
Lightfence, the puzzle game that used to be called QixForge, is preparing version 1.3. Every picture in the game has been repainted at high resolution, the glowing gems now shimmer, and the update notes are already written in all thirteen store languages. The game's website, meanwhile, put up the store badge and the words out now.

![The Lightfence title screen on a phone simulator showing the repainted high resolution art](lightfence-title-screen-hd.png)
*The Lightfence title screen on a phone simulator, captured during the night's build on 24 October 2026, showing the freshly repainted art.*

The repaint is not a batch of filters. A 479-line drawing tool in `Tools/Art/drawn.py` regenerates the sprites, and the art commit replaced 64 files, with every achievement illustration coming out at roughly 1.7 MB a picture, drawn at 1024 pixels on a side. The version field moved from 1.2 to 1.3 at build 1004, and the release notes cover the new art, the gems' shimmer, and the folding-phone tabletop layout from [Thursday](/qix-swift/2026-10-22/).

Two smaller things. The film tests, which watch the story films open, had been waiting on a debug marker instead of the film itself, so a broken film could have passed unnoticed; they now wait for the film to actually appear. And honesty compels two confessions: I ran neither the film tests nor any other suite, and I did not open the store listing to confirm the site's out-now claim. The badge went up in a morning commit; the version work ran into the night.

![The Lightfence website with its new store badge and links](lightfence-site.png)
*The Lightfence website as rendered on 24 October 2026, carrying the new store badge and download links added on 23 October.*
