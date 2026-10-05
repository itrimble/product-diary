---
project: Civic Fortune 2026
summary: Three of the game's five ways to win could never be won; they now can, and a run saves itself so you can quit and come back.
---
Three of the five ways to win Civic Fortune 2026 could not actually be won, and nothing had told me. The game also forgot your run the moment you closed it, which hurts in a game that lasts 52 weeks. Both are fixed. You can now quit mid-run and the menu offers to continue from the week you left, and every win condition can be reached. The buy button in the shop also works for people using the phone's screen reader, which it did not before.

The cause of the dead victories was `String.hashValue`, which Swift reseeds on every launch, so each run sampled a different game. The balance probe printed win rates but asserted nothing, so it passed on a broken game. A new `StableHash` (FNV-1a) replaced it at both call sites, and two probe runs are now byte-identical. A test greps the source for `.hashValue` outside comments.

With stable routing the real numbers appeared. Financial Runway, Influence and Stabilized all sat at 0%, and Mutual Resilience won every run on week 4. Assets could be bought endlessly because nothing set `isUnique`. Runway needed the `lease` asset, which drains 60 cash a week against a 2,400 cash gate. Cheap baseline wins fired on week 8 and pre-empted the expensive ones, so designed wins now floor at week 16 and the baseline at week 28.

Autosave is `RunStore`, one atomic slot in Application Support. It refuses saves from a newer format and shows a message on the menu if the file is corrupt. Finished runs clear the slot, and the end screen got Play Again. I played 7 weeks, killed the app, and the menu offered "Continue Run, Week 8". Haptics now fire on routes, event answers, Rest and Buy. The shop row had merged its whole contents for VoiceOver, hiding the Buy button, so now only the description merges and the button reads "Buy Side Hustle for 240 dollars". 47 tests pass.
![The Civic Fortune 2026 game screen](civic-fortune-2026-ios.png)
