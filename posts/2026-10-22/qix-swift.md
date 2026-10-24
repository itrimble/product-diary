---
project: QixForge
title: Lightfence Gets a Tabletop Layout for Folding Phones
summary: Lightfence gained a tabletop layout for a folding phone, and build 1004 went to App Store review.
---
Lightfence, the game formerly called QixForge, now plays properly on a folding phone set down like a small laptop. The board sits on the upright half. The flat half holds the score columns and a steering pad, and a second finger on the pad fires the overdrive boost. Pause and result cards sit there too, away from the fold. Held open like a book, the phone plays as before. Build 1004 went to App Store review.

The fold comes from `UIView.reservedRegions(kind: .division)`, which needs iOS 27.1, and is re-read on each hinge update (`e0d4c27`). A new `TablePosture` treats a fold across a sideways view as a table. The board is still cut as if the phone were held open, so a stage plays the same propped up, and setting the phone down mid-stage keeps the run. The `TableDeck` carries the heads-up display. The power-up slots close up to fit a short column, and 156 lines went into the string catalog.

The simulator has no hinge, so `-qaTabletop` pretends there is a fold. `TabletopUITests` checks on an iPad, and at the Duo's open size with `-qaFold`, that the board clears the fold and a tap on the pad steers. I did not run them.

Seven Duo screenshots at 1398 by 2034 were captured on the Duo simulator (`33ba268`): title, Aqua Reef guardian, Neon City, Snarl Prime, sector map, Light Core and Films. They wait for the next version, because the screenshots of version 1.2 are locked while it is in review. The build bump to 1004 is `d1e3407`.

![The Lightfence title screen on a phone simulator](qix-swift.png)
*The Lightfence title menu on a phone simulator, with Continue, New Campaign, Endless and Light Core. Screenshot added to the diary on 23 October 2026.*
