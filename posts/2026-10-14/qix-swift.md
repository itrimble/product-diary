---
project: QixForge
title: QixForge Becomes Lightfence in 13 Languages
summary: The game was renamed Lightfence, translated into 13 languages, and filled in with a tutorial and living scenery before its App Store listing.
---
QixForge got a new public name today: Lightfence. It was also translated into 13 languages, and its App Store listing was drafted with screenshots, categories and keywords. Inside the game, the ground you win back now shows the sector's painting lit and alive, with fish, fireflies, embers or snow moving through only the part you have claimed. Creatures in the world flinch when you lose a life or have a close call. New players get a short lesson that teaches by letting them play.

The rename began just after midnight (`ffaa6bc`): the monster the old notes called the Qix is now the Snarl, with Tracers and a Light Core. Localization ran in four parallel passes over menus, gameplay text, worlds and achievements, merged by about 10:05. Every displayed string went into String Catalogs, with a glossary of 80 game terms and a checker (`37c34eb`). Later fixes came from reading it on screen: tray names that did not fit, Arabic that should not be spaced, and right-to-left chevrons. Reading the translations also turned up English mistakes, which were fixed at the source.

The tutorial coach (`b74b83f`) is a set of pure rules that read each frame and pick the lesson: move, cut, close, target, then the Snarl and Tracers. A lesson retires once you do it, and the game remembers each one. Stage 1 now releases the Snarl after your first claim and the Tracers after you have learned the Snarl. Options gained Hints and Replay Tutorial.

Claimed ground uses an added copy of the painting at 0.55 plus a 13% tint of the sector's colour (`3377bad`). Creature reactions (`598e138`) push swarm members within 340 points of a death away, 110 points at the spot, and a close call nudges them 40 points within 200. They ease back in about two seconds, and nothing darts under Reduce Motion.

The remote story from yesterday changed. The Siri Remote now steers with the clickpad ring only, which App Review needs explaining, so there are review notes. Build 3 fixed the displayed claim percentage and made guardian stages require their target. A test asserts every stage ends at its claim target unless the guardian falls. Privacy text exists in all 13 languages, and Builds 2 and 3 were prepared for review.
