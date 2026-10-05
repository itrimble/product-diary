---
project: Civic Fortune 2026
summary: Made the sim deterministic, found three of five victories were broken, added autosave, haptics and VoiceOver fixes.
---
The big find was that three of the five victory conditions could not be won. The balance probe had printed win rates for months without asserting anything, so it reported a pass on a broken game. The cause was `String.hashValue`, which Swift seeds per process, so every launch sampled a different game. A new `StableHash` (FNV-1a) replaced it at both call sites, and two consecutive probe runs are now byte-identical. One test greps the source for `.hashValue` outside comments, so a reintroduction fails loudly.

With deterministic routing the real numbers showed up: Financial Runway, Influence and Stabilized all at 0%, and Mutual Resilience winning every run on week 4. Assets were infinitely buyable because nothing ever set `isUnique`. Runway required holding `lease`, which drains 60 cash a week against a 2,400 cash gate. Cheap baseline wins fired on week 8 and ate the expensive ones. Designed wins now floor at week 16 and the baseline at week 28.

A run is 52 weeks, so I added autosave. `RunStore` writes one slot in Application Support atomically, refuses saves from a newer format, and shows a message on the menu if the file is corrupt. Finished runs clear the slot, and the end screen got Play Again. I played 7 weeks, killed the app, and the menu offered "Continue Run, Week 8". 47 tests pass.

Smaller things. Routes, event answers, Rest and Buy now give haptics, through a View modifier because a ButtonStyle swap turned the Buy button into plain text. The QA launch arguments sit behind `#if DEBUG`, and I checked the strings are gone from the Release binary. The shop row combined its whole subtree for VoiceOver, so the Buy button could not be pressed. The combine now covers only the description, and the button reads "Buy Side Hustle for 240 dollars".
