---
project: QixForge
title: QixForge's Hardest Level Becomes Finishable
summary: The game's hardest level became finishable for ordinary players, and everything was fitted to the phone screen for release.
---
Release preparation took the whole day on QixForge. The last stage of the campaign was nearly impossible for an average player. It was tuned until a computer player modelled on an average person could finish it, and it did not get easier for a skilled one. Menus, achievement pages, credits and tip popups were refitted to a phone-sized screen, and flashing effects were softened for players who are sensitive to them. The store listing copy, under the name Qix Sectors, exists as a draft.

The balance result is written up in a validation note dated the 7th. The opening wave of stage 99 went from thirteen small hunters to eight. On seeded full-core runs the average-policy bot now clears all 12, where it used to clear 7. On held-out seeds it had never seen, it moved from 8 of 12 to 10 of 12. Averaged attempts at level 99 take 66 seconds rather than 106, and expert attempts 119 rather than 152. Every other stage matched its baseline exactly. A regression test holds the eight-hunter rule in place.

Fitting the phone screen left a trail of captures from a dedicated "Qix Compact iPhone QA" simulator, and the folder names read like a diary. Achievements went from compact-achievements to -clipped to -bounded. The tip popup went through -backing, -padded and -rotation, and the magma tip ended at magma-tip-settled. Each of four screens took several rounds before it fitted: achievement detail, ending credits, acknowledgments and the touch-controls overlay. There are also captures comparing what happens when the phone is turned, one probing short sideways drags, and a settings-failure folder. The crash behind that one was closed out later, in settings-credits. New UI tests run through achievements, credits, settings, touch controls, menu transitions and cinematic playback.

The rest of the pile holds two painted backdrops, ice crystal and magma basalt, each with an art note. It also holds a music check confirming each stage's track behaves, a privacy manifest backed by a source audit, an acknowledgments file that lists its sources, and named guardian phases: Reef Crown, Caldera Heart and Ice Warden. No store record exists yet. I have committed none of it, and all of it, 44 files touched on the day, sits in the working tree.

![The QIX Sectors title menu on a phone simulator showing Continue, New Campaign, Endless and Scores](qix-swift.png)
*The game's title menu on a phone simulator, still named QIX Sectors, with Continue, New Campaign and Endless. Screenshot added to the diary on 8 October 2026.*
