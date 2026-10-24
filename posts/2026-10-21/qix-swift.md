---
project: QixForge
title: Lightfence Story Films Now Open With Each Stage
summary: Lightfence's story films now unlock with each stage and can be rewatched, and the version sent for App Store review was updated.
---
Lightfence, the game formerly called QixForge, now lets you rewatch its story films. Each film opens when you reach its stage and stays on a shelf you can return to. Every achievement is now earnable and described as it really works, and the badges are drawn sharper. During play, a guardian's arrival darkens the world and names the creature, and the title screen takes turns between a short film and the showcase when left idle. A new build, number 1003, went to App Store review.

The films are `FilmShelf.swift` and `FilmsView.swift` (`b7673c0`), with 808 new lines in the string catalog so the shelf reads in every language. `FilmShelfTests` and a UI test cover the opening rule. The staging work (`92e7134`) puts four sector rules on film, Ice Spires, Void Horizon, Chrono Rift and Eclipse Citadel, each acted out by a small board that uses the game's own numbers. A guardian entrance holds play for 2.4 seconds, and a tap skips it. It is off for scripted tests unless `-stageBeats` is passed.

Achievements (`195fe52`) were audited against what the game actually does, and `AchievementSync.swift` was added. Test coverage is in `RunAchievementTests`. The Mac window now fits the guardian bar and Core XP (`18f3055`), the store description says guardians are trapped, not phased (`8f4a815`), and version 1.2 has What's New text in every language (`565f992`).

I did not run any of the tests myself, and review has not come back yet.

![The QixForge title screen on a phone simulator](qix-swift.png)
*The Lightfence title menu on a phone simulator, with Continue, New Campaign, Endless and Light Core. Screenshot added to the diary on 22 October 2026.*
