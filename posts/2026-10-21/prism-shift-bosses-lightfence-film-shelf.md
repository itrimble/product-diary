---
project: Daily Story
title: Prism Shift Gets Boss Fights and Lightfence a Film Shelf
summary: Prism Shift's second version gained countdown pieces and boss fights, Lightfence added a film shelf, SnapDog on Linux learned GIFs, and tests waited for room.
format: longform
stats: Prism Shift commits = 32 | Lightfence build sent to review = 1003 | SnapDog Linux commits = 3 | StatBar version = 1.6.0
---
Five of my apps and one television moved on 21 October, and the biggest change was in a game. Prism Shift's second version now has pieces that count down and blow up, plus boss fights with several stages. Lightfence gained a shelf of story films you can rewatch. Almost none of it has been proven on a Mac yet.

That last part is the day's real story, so I will start there and then walk through each project.

## The day Prism Shift learned to fight back

Prism Shift is the crystal puzzle game I am rebuilding so it runs on more than Apple devices. The second version, made in the free Godot engine, took 32 commits in one day, the most of any app. The previous day's story, [on 20 October](/grokbot/2026-10-20/), had it growing onto the Mac and the living-room television.

The headline addition is a piece that counts down. Every 14 pieces (16 in the harder modes) a Volatile appears. It only ticks when the game's Pulse crosses its column. If the timer runs out, the Volatile turns itself and up to two neighbours into dead slag. If you set it off with a match instead, the match clears its whole colour network, shatters any slag in a three-by-three area and pays 240 energy per mark. It is a good tension: a bomb you want to trigger, on your schedule, not its.

![Prism Shift on a phone-shaped screen mid-run with a gold block marked 2 and an Overcharge Blast banner](prism-shift-overcharge-blast-board.png)

*Prism Shift in the test harness on a phone-shaped screen, captured at 01:19 on 21 October: a gold piece marked 2 sits at the bottom left and the banner reads Overcharge Blast with 780 points. Look at the 2; that is the countdown.*

Armored slag and the authored boss phases came with it. The boss encounters are authored in phases, and one of them is called Refraction. The change added 155 lines to the game's own test file, which I would rather have than a long description.

![Prism Shift boss fight, phase 2 Refraction, with a bright vertical beam of light crossing the board](prism-shift-boss-refraction-phase-two.png)

*The Refraction phase of a Prism Shift boss fight in the test harness, captured at 22:24 on 20 October, a few hours before the day's commits landed. A bright beam of light runs down the right side of the board. I have not seen it in motion, and this is a test capture, not a store screenshot.*

The full Godot test run passed on the Mac mini. A first attempt did not: a new test assumed the wrong kind of value, and the strict gate rejected it. The notes say the fix was to the test and not to the scoring, which is the right way round. The gate caught a sloppy test, not a game bug.

On Apple devices the day was quieter and more careful. The tablet board no longer slides under the edge of its window, and a corrected build was installed with players' saved settings intact. Saved campaign progress now carries a version number, so an old save should move forward instead of resetting. The game's web page and social card were republished under a new public name, Night Chorus. Everything in the [Prism Shift entry](/prismshift/2026-10-21/) is the detail behind this section.

## Lightfence gets a film shelf

Lightfence is the game formerly called QixForge. Its story films now open as you reach each stage and stay on a shelf you can come back to. Every achievement is now earnable and described the way it works. When a guardian arrives, the world darkens and the creature is named. A guardian's entrance holds play for 2.4 seconds, and a tap skips it. The [QixForge entry](/qix-swift/2026-10-21/) has the numbers, including 808 new lines in the language catalog so the shelf reads in every language the game ships in.

![The Lightfence title screen on an iPhone simulator with Continue, New Campaign, Endless and Light Core buttons](lightfence-title-screen-iphone-simulator.png)

*The Lightfence title screen on an iPhone simulator, captured on 21 October. This is the menu the game opens on, not the new film shelf; the bottom line reads Continue from Sector 1, Stage 2.*

Build number 1003 went to App Store review. The notes say the tests were not run that night and the review had not come back, so this is a build that is sent, not shipped. The game's page is [the Lightfence site](https://lightfence.remnantsecurity.com/).

## SnapDog on Linux, one setting at a time

The Linux version of SnapDog is a separate port that still has gaps against the Mac app. On 21 October it finished GIF recording and gained a camera picker that lists webcams by name, with both choices remembered. The [SnapDog entry](/snapdog/2026-10-21/) says it took three commits.

![SnapDog Linux settings window showing a Webcam Overlay section with a Camera menu set to System default](snapdog-linux-webcam-camera-setting.png)

*The General settings page of SnapDog's Linux version, saved on 21 October. The Camera menu in the Webcam Overlay group is the new picker; here it is still on System default.*

One caution. As far as the notes show, this was verified through a Mac-side simulator and not on a real Linux desktop. The Mac app, which is the one people pay for, is described on [the SnapDog site](https://snapdog.remnantsecurity.com/).

## StatBar and the television

StatBar 1.6.0 can answer "is this Mac ready for heavy work?" in one command and can ask every Mac in a household at once. It also flags a Mac pushing memory out to disk too fast. The [StatBar entry](/statbar/2026-10-21/) has the detail, and the [StatBar site](https://statbar.remnantsecurity.com/) sells it for $9.95 once. The notes say those tests were not run either.

The Hisense television got a podcasts app that keeps playing with the screen off and offers to resume where you stopped. It was not installed or played on the television that night, and a stray compiled file was committed with it. The [next day's Hisense entry](/hisense/2026-10-22/) says that file is no longer tracked. The first record is the [Hisense entry](/hisense/2026-10-21/).

## What I would tell you

Lightfence and StatBar changes went out with tests that were not run, and the build fleet refused Prism Shift's native Mac checks because it had no room. That is the honest state: a lot is written, some of it is proven, and the rest is waiting for a free machine.

If you are building like this, keep the list of what is not proven next to the list of what is done. I would rather publish a day with gaps than one that sounds finished. The first place to look tomorrow is the queue on the fleet, not the code.

## Sources

I read the first three on 23 October 2026 and did not open any App Store review page, so nothing here confirms review status. I only confirmed that the Godot page loads.

- [Lightfence product page](https://lightfence.remnantsecurity.com/): describes the game as a 100-stage, ten-sector arcade game for iPhone, iPad and Apple TV, priced at $3.99.
- [StatBar product page](https://statbar.remnantsecurity.com/): lists the price as $9.95 once and says there is no telemetry.
- [SnapDog product page](https://snapdog.remnantsecurity.com/): describes the Mac app and has a Linux section.
- [Godot engine](https://godotengine.org/): the engine the second version of Prism Shift is built on, per the project notes. Not read.
