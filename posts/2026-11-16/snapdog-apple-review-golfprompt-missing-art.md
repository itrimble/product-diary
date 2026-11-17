---
project: Daily Story
title: SnapDog 1.2.2 Goes to Apple Review, Golf Game Gets Built
summary: SnapDog 1.2.2 went to Apple for review after I restored three fixes an old change had undone, and a one-hole browser golf game appeared overnight.
format: longform
---
SnapDog, my Mac app for screenshots and screen recording, went to Apple for review on Monday as version 1.2.2. It adds Loom video import and restores three bug fixes that had quietly stopped working. The same night, a small browser golf game called Quiet Links went from nothing to a playable hole, with one glaring gap: no golfer.

## SnapDog 1.2.2 goes to Apple review

I sent the build in on Monday afternoon. It is the first version that carries the Loom import I wrote about in [early November](/hisense-podcasts-snapdog-loom-night-chorus-worlds/2026-11-02/). Version 1.2.1 is still the one live on the Mac App Store, and I do not know yet whether 1.2.2 will be approved. That is the honest state of things.

The more interesting part is why the test suite had been unhappy. Last night's [SnapDog test-suite entry](/snapdog/2026-11-15/) ended with 16 failures I could not explain. Tonight I traced them to a single October commit. It reverted three working fixes and left their tests behind, so the tests kept insisting on behaviour the code no longer had.

![The SnapDog settings window open on its Capture page with display, window and region options](snapdog-capture-settings-window.png)

*SnapDog's Capture settings page, taken from the product site's own media on 29 September 2026. It is not a new capture and it is not 1.2.2; it is here so you can see the app. The 16 November simulator build failed, so I had no fresh shot.*

The three restored fixes, in plain terms:

- Arrows drew mirrored when you dragged left or up.
- The click-ripple effect in recordings was broken.
- Stitched scrolling captures failed on small scrolls.

I restored all three, bumped the app to version 1.2.2 (build 10), and the Mac test suite is clean again. Details are in the [SnapDog entry for the day](/snapdog/2026-11-16/).

## Getting build 10 past a headless export

The fix was the easy half. Exporting for the Mac App Store from an unattended session failed with "No Accounts", because Xcode went looking for an Apple login that does not exist overnight. The release script now copies the store provisioning profile to the folder Xcode reads, then exports with manual signing and an explicit installer certificate. Apple's own checker reported 0 errors and 0 warnings.

On the listing side, the What's New text for all 13 languages now names Loom. I left the description, subtitle and keywords alone. My listing notes warn against putting a competitor's trademark there, and I agree with them. I also rewrote the review notes and removed an old test credential from them. That one should have gone sooner.

Two Linux test skips turned out to be missing tools on that machine rather than bugs. A Creator Studio smoke failure was an unbuilt helper. Neither was a product problem.

## What I did not verify on SnapDog

| Item | State |
|---|---|
| Loom import against the real service | Never run |
| Store screenshots | English only |
| Privacy answers published through the public interface | Could not confirm |
| Fresh app screenshot | Simulator build failed, so none |

I wrote all of this, risks included, into a status document so the next session does not start from optimism.

## Quiet Links: a golf game and a warning card

Quiet Links is a one-hole, 340-yard par 4 in a web browser, built with Three.js and TypeScript. It was started from a prompt and finished by a coding agent in about two hours, with seven commits between 22:46 and 23:39. It has four weather settings and two swing styles, a classic three-click one and a gesture one. Mouse, keyboard and game controller all work. Sound and scenery are generated as it runs, so it needs no server and no account. The [Golfprompt entry](/golfprompt/2026-11-16/) has the short version.

The checks are the part I trust. The agent's report lists 44 unit tests passing, such as a ball bouncing harder in rain than on a dry day, plus 9 browser tests and a strict type check with no errors. It booted in 1.4 seconds at 51 frames a second on the Mac mini. I did not rerun those numbers myself; they come from the report.

![The golf game in rain, dark fairway, with a red warning card in the middle of the screen](golfprompt-quiet-links-rain-weather.png)

*Quiet Links in the rain setting, captured 16 November 2026 at about 23:41. Notice the wind reading of 11 mph and the red card where the golfer should be.*

One visible bug was striping on the fairway. The cause was colour variation repeating at a spacing the terrain mesh could not resolve. The agent shortened the wavelength and halved the strength.

## The warning card is the point

The last commit made character art a hard requirement. The game now wants a golfer model, club models, terrain textures and a sky image, 16 files in all, and it names every one it cannot find. None are present. I asked for the red card on purpose. A placeholder figure had made it too easy to forget the art was not there.

![The Quiet Links tee with a red missing-art card and the distance to the cup](golfprompt-quiet-links-asset-pack-missing.png)

*The Quiet Links tee on 16 November 2026, clear weather, 335 yards to the cup. The orange panel at left lists the missing files.*

![A close view of the green with a flag, a ball and a faint grid showing the slope](golfprompt-quiet-links-putting-grid.png)

*The putting view with the slope grid switched on, captured 16 November 2026. The cup is 3 feet 3 inches away; the golfer is still absent.*

Nobody has seen the real golfer move. Every screenshot shows the warning, so I cannot tell you how the swing animation looks.

## Left out of today

The survey also flagged two other folders. Grokbot changed only private personal assistant instruction files, and hermes-fleet changed machine inventory snapshots and generated reports. I left both out.

## What I would tell you

Check what a revert took with it. A test that stays behind after its fix is gone looks like a mystery for days. And if a game is missing its art, make that impossible to miss. A red card is ugly, and that is the idea. Both items here are unfinished: SnapDog is waiting on Apple, and the golf game is waiting on a golfer.

## Sources

- [SnapDog product site](https://snapdog.remnantsecurity.com/), opened to confirm the app's public description.
- [SnapDog on the Mac App Store](https://apps.apple.com/us/app/snapdog-capture-annotate/id6783121166), opened for the listing; the live version there is 1.2.1.
- [Three.js documentation](https://threejs.org/docs/), opened for the library behind Quiet Links.
