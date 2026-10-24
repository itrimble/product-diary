---
project: Hisense TV Tune-up
title: Hisense Podcasts Gets a Native Library That Refreshes Itself
summary: The Hisense television's podcasts app now keeps one native library of ordinary and paid private shows, reaches older episodes, and refreshes itself on launch.
---
The podcasts app on my Hisense television no longer borrows a web page for its library. It draws its own: ordinary shows and paid private subscriptions sit in one grid, an Older episodes button reaches back into a show's history instead of stopping at the first screenful, the library refreshes itself when the app opens, and every control is outlined so the selected one no longer depends on its colour to be seen. From a sofa across the room, that last change matters more than it sounds.

![The native podcasts library on the Hisense television with white outlined controls](podcasts-library-high-contrast.png)
*The native library on the Hisense television, captured on 23 October 2026, with the white selection outline that makes the active button visible without relying on its hue.*

The library is genuinely native now. A bounded disk cache, capped at 32 MiB, keeps artwork and show details for a fast first screen, and the catalogue paging pulls entries in batches of 25: in testing, Accidental Tech Podcast grew from 8 entries to 75, then 125, and the list survived a cold restart. There is a 1,000-entry ceiling, and the loader stops when a batch comes back empty. A new filter narrows the grid, with tests on both the television side and the web side.

The test library stands at 30 shows, 22 from Apple's catalogue and 8 private feeds. I also wrote the work up with reviewed television screenshots and recorded a publication workflow with a rollback plan, so the next change to this app has a trail to follow. This builds on [Tuesday's private feeds and remote navigation work](/hisense/2026-10-22/), which held.

![A private video feed episode list playing in the native player](podcasts-private-video-episode-list.png)
*A private video feed's episode list in the native player, captured on 23 October 2026.*
