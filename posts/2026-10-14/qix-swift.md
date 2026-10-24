---
project: QixForge
title: QixForge Becomes Lightfence in 13 Languages
summary: The game was renamed Lightfence, translated into 13 languages, and filled in with a tutorial and living scenery before its App Store listing.
---
QixForge is now Lightfence. Thirteen translations landed on 14 October alongside a first draft of the App Store page, with screenshots, categories and keywords filled in. In play, the biggest difference is the ground you win back. It shows that sector's painting alive and lit, with fish, fireflies, embers or snow moving across only your territory. Creatures react when you die or come close to it. A short tutorial lets new players learn by doing.

The rename went in just after midnight. What my old notes called the Qix is the Snarl now, joined by Tracers and a Light Core. Translating was split into four parallel passes, one each for menus, gameplay text, worlds and achievements, and the results were merged by about 10:05. Every string a player can see went into String Catalogs, with a glossary of 80 game terms and a checking script. Then came fixes from looking at real screens: tray names that overflowed, Arabic with spaces it should not have, and chevrons that needed flipping for right-to-left text. Translating also exposed mistakes in the English, so I fixed those at their source.

The tutorial is my favourite piece. It is a set of plain rules that look at each frame and choose a lesson in order: move, cut, close, target, and finally the Snarl and Tracers. Once you perform an action, that lesson is done for good, and the game remembers it. Stage 1 now holds the Snarl back until your first claim, and the Tracers until the Snarl is understood. Hints and Replay Tutorial joined the Options screen.

The scenery is two small effects. Won ground shows an extra copy of the painting at 0.55, tinted 13% with the sector colour. Deaths scatter swarm creatures within 340 points, pushing the nearest by 110, and a close call moves anything within 200 by 40. Everything settles again in roughly two seconds, and Reduce Motion stops the darting entirely.

The Siri Remote story changed from the previous day: it now steers by the clickpad ring alone. App Review will want that explained, so there are review notes. Build 3 corrected the claim percentage on screen and made guardian stages insist on their target, and a test confirms each stage ends at its target unless the guardian falls. The privacy text now exists in all 13 languages. Builds 2 and 3 were both made ready for review.
