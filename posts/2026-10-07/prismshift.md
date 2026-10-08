---
project: Prism Shift
summary: Every scripted walkthrough of the whole game now passes on a small phone screen, three days before its planned release.
---
Prism Shift is a new puzzle game for the phone, appearing here for the first time. You place crystals to build energy networks, and a line sweeping across the board in time with the music ignites them in chain reactions. The game is three days from its planned release on Sunday, and today the whole thing was walked end to end by scripted checks on a small phone screen: all 31 guided walkthroughs now pass, rewards you earn survive closing the app, and the ending and credits got screens of their own.

The final run of the day, stamped 18:24, executed 579 tests across 74 suites with every one passing. The walkthroughs ran on a compact phone simulator and covered the menu, settings, all three worlds, the three-phase finale encounter, the darkness counter-play, Abyss mode, graphics modes, reduced-motion, the three control schemes, tutorials, credits and the ending. The first full pass cleared 28 of 31. The three failures were concrete: two settings screens whose controls sat out of thumb reach, and a Close button on the credits that scrolled away with the page. All three were fixed, and the seven corrective reruns passed seven for seven. Numbered screenshots and a finale video capture the whole trail in `e2e_screenshots/`.

The pass also changed the game itself. Eight achievements, each with its own generated illustration, are now awarded during play, at level hand-offs and at run end, and persist across relaunches. The opening and a three-part finale are replayable, and there is a dedicated credits screen. A level hand-off banner no longer covers the board on small phones. Falling crystals keep their animation between moves instead of being rebuilt sixty times a second, and the music eases off over 450 milliseconds after a clear instead of cutting dead. The build now declares itself a phone-only release.

Still open before Sunday: how the controls actually feel on a physical phone, distribution signing and the beta upload, and the licensing paperwork for the recorded music stems. The project also has no version control at all yet — worth fixing before release day, not after.

![The game's title screen on a phone, with its Play button, world and level picker, and buttons for settings, achievements and credits](prismshift.png)
