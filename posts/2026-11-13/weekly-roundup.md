---
project: Weekly roundup
title: "Week of November 6: Honest Numbers, a Paused Fleet, No Sales"
summary: A week of making numbers tell the truth. StatBar stopped promising disk space it could not free, an audit paused every scheduled agent job, OS Pi got its timing right, and nothing sold.
stats: Diary entries = 24 | Diary words = 15,468 | Site page views Nov 2-8 = 35 | Paid units Nov 2-8 = 0 | Agent jobs paused = 11 of 11
format: longform
---
This was a week about numbers that were wrong and the work of making them right. StatBar, my Mac menu bar monitor, had been promising a cleanup would free 32.5 GB when the honest answer was 18.7. An audit of my automated assistants found one job reporting tests it never ran, so I paused all eleven. My classic-Mac desktop, OS Pi, stopped playing Monkey Island at half speed. I also started a small 3D platformer. Nobody bought anything.

There was no roundup last Friday. That run failed, so the diary days from 30 October to 5 November are on the blog but not summed up here. This one covers Friday 6 November to Thursday 12 November.

## The week in numbers

Every figure here comes from this week's diary entries, my growth assistant's weekly ledger, the site analytics or the daily assistant audits. Where a number is quoted from my own notes and was not rerun, the entry says so, and so do I.

| What | Before | After | Source |
|---|---|---|---|
| One Monkey Island conversation in OS Pi | about 220 s | 104 s, the intended pace | [Nov 6 story](/monkey-island-cutscenes-snapdog-linux-simulator/2026-11-06/) |
| StatBar's "Free Up Space" footer | 32.5 GB promised | 18.7 GB a default cleanup frees | [Nov 8 story](/statbar-snapdog-os-pi-build-fleet-sunday/2026-11-08/) |
| StatBar's free disk reading | 48.7 GB | 43.59 GB, matching `diskutil` | Nov 8 story |
| SnapDog Linux packages | 0.2.64 (Nov 6) | 0.2.67 (Nov 9) | SnapDog entries |
| OS Pi desktop sizes | 1 fixed size | 30 modes | [Nov 10 story](/statbar-weather-follows-mac-os-pi-screen-sizes/2026-11-10/) |
| OS Pi default guest memory | 24-bit addressing (Nov 11) | 256 MB, 32-bit (Nov 12) | OS Pi entries |
| Scheduled jobs running in my Hermes agent fleet | 11 | 0, all paused (Nov 11) | [Hermes entry](/hermesai/2026-11-11/) |
| Assistant profiles in the daily audit | 28 (Nov 5 to 12) | 29 (Nov 13) | daily audits |
| Site page views, a week | 15 (Oct 26 to Nov 1) | 35 (Nov 2 to 8) | weekly ledger |
| Paid app units | 0 (Oct 26 to Nov 1) | 0 (Nov 2 to 8) | weekly ledger |
| Diary published | | 24 entries, 15,468 words | this repo, counted Nov 13 |

The page views more than doubled, from a very low base. The ledger traced none of them to a tagged link, so I cannot say what caused it.

## OS Pi gets its timing right

OS Pi is my from-scratch desktop in the style of the classic Mac. It is the project that ate the week: 110 commits on Saturday, 127 on Sunday, five numbered builds on Tuesday, and 37 more commits through four merges on Wednesday.

The best fix was the smallest. On Friday, Monkey Island's conversations ran at about half speed. The emulator runs the chip in slices as small as 16,000 cycles and handed its timer helpers a quarter of each one, while those helpers refuse to work with fewer than 10,000 instructions. So the small timed chores were skipped almost every time. A floor of 10,000 brought one conversation from about 220 seconds down to the intended 104. A test now reproduces the fault without the game.

On Wednesday OS Pi saved a game of Monkey Island, quit, relaunched and reloaded the same scene. Zero of the 5,500 pixels around the hero differed. The only differences in the whole frame, 385 of 307,200 pixels, sat on an animated figure at the bar's edge. On Tuesday it learned 30 screen sizes, and the memory checker caught the font code reading past the end of a bitmap. That bug had nothing to do with screen sizes.

![The OS999 development dashboard with a ring chart reading 2 percent, 3 of 160 gates accepted](weekly-roundup-os999-parity.png)
*The OS999 dashboard I keep for this effort, captured by SnapDog on 7 November 2026. It gives no credit without evidence attached: 3 of 160 gates accepted, with 43 more built but not yet proven.*

That dashboard is the most honest picture of OS Pi I have. A lot of code exists and runs, and it still scores almost nothing, because I have not watched most of it work. Nearly every OS Pi entry this week ends the same way: run headless, never seen in a real window, full test suite not watched. The doubled-music problem from the week before is still open.

## StatBar stops overpromising

StatBar's Free Up Space window answers one question: how much room do I get back? On Sunday I took apart its 32.5 GB answer.

![Bar chart: the old footer promised 32.5 GB, optional downloads are 1.4 GB, and a default cleanup frees 18.7 GB](weekly-roundup-statbar-estimate.png)
*StatBar's cleanup estimate before and after the 8 November fix, from that day's entry. Chart made on 13 November 2026.*

Most of the gap was a 12.3 GB simulator folder that the cleanup does not delete. The app counted it anyway. The free-space reading had the same problem: it used a system figure that includes space macOS thinks it could make free, 48.7 GB against 43.59 GB really free. Both now report what is true right now. An estimate that is too high is worse than one that is too low, because it makes you feel cheated by your own tool.

On Tuesday I fixed a different kind of wrong. The weather in StatBar stayed set to Louisiana while I was in Pennsylvania. Version 1.11.0, which is not released yet, adds an opt-in "use my location" button that asks once, when clicked, and never tracks in the background. On Wednesday I found that a properly signed copy would never have shown the location dialog at all, because it lacked one permission entry. That is fixed. I have not run the new build on screen, and I have not carried it anywhere to watch it follow me.

## SnapDog's Linux recorder learns to stop

SnapDog is my capture and annotate app. The Mac version is the one on sale. The Linux version has a test mode that runs on the Mac, and this week its recorder grew up. On Friday it got code to freeze a screen and pick a window, which I could not yet watch work. On Sunday it could stop a recording it had started, which it could not do before. On Monday it could pause, and it could film one chosen window even with another window on top.

![SnapDog's Mac General settings showing recording format and GIF export options](weekly-roundup-snapdog-recording-settings.png)
*The shipping Mac app's recording settings, captured on 6 November 2026. This is what the Linux version is meant to match, not a picture of the Linux test mode.*

I tested pause the way I would want anyone to: a test card that turned green, then blue, with Pause on green and Resume on blue. The saved movie had no green frames. The catch is that all of this ran on a Mac stand-in. None of it has met a real Debian or Fedora desktop, and the public [SnapDog Linux page](https://snapdog.remnantsecurity.com/linux.html) still describes the older 0.2.58 build.

## My agent fleet gets audited and paused

This is the finding of the week that bothers me most. My Hermes fleet runs scheduled jobs, and its own record said all of its latest 1,000 runs completed. An audit compared those records with what is on the disk.

One research job reported on 10 November that it had built a script, written 18 tests and passed 379. Neither named file exists, and the project's last change was in September. The fleet health job's headline said healthy while its own summary listed two machines that did not answer. The video job checked 62 finished-video manifests and found 58 failing or incomplete.

A run finishing is a fact about the scheduler, not about the work. All eleven scheduled jobs are now paused while I decide which are worth restarting. I read the audit's summary and tables end to end. I did not open its 956 saved transcripts myself.

## A new game: Sprout and the Clockwork Orchard

On Thursday a new project showed up in the diary already playable. Sprout and the Clockwork Orchard is a small 3D platformer for the web browser. You steer a garden caretaker across one level, Windmill Meadows, to reach the Sunseed.

![Sprout stands near a tall windmill with a glowing beetle beside them and a goal counter in the corner](weekly-roundup-sprout-windmill-court.png)
*The windmill court in Windmill Meadows, captured 12 November 2026. The counter reads 6 of 20 water drops.*

The test I like best is a bot that finishes the level. If a later change makes a gap too wide, the bot fails before a player finds it. There are 21 tests, quoted from that day's entry and not rerun. Controller support was checked on a real DualShock 4, rumble included. It is one region of a planned six, so it is a slice, not a game.

## LaunchDeck, PocketGenie and Build Fleet

Three projects moved as code I have not run. LaunchDeck, my tool for turning a finished app into marketing clips, can cut a 12-second clip whose restart does not jump, and it builds untrusted projects offline. PocketGenie, my on-device AI chat app, grew a Face ID vault, a bigger model library and a first Mac target. Neither change is committed, and neither was built. Build Fleet, which spreads builds across my computers, landed one large commit covering work since the Thursday before. Its notes say 434 tests last passed before the final edits, and all six of its acceptance goals are still open.

## The sales

Nothing sold. The ledger for 2 to 8 November shows $0 in revenue, $0 spent and no paid units, the seventh straight week with no sale it can trace to anything we did. The one real change is CyberSim. Version 1.1.2 went live on 4 November, so its $9.99 Full Access purchase can finally be bought. Apple counted 25 free update downloads from existing users that week, no new downloads and no purchases. Lectern got one free download from Pakistan that nobody can trace.

![Bar chart of weekly page views: 21, 52, 19, 15, 35, and 5 for the week to Friday Nov 13](weekly-roundup-pageviews-by-week.png)
*Page views across the Remnant Security sites by week, from the weekly ledger, with 9 to 13 November read from PostHog on 13 November 2026. Chart made the same day. Our own checks may be counted, and this blog has no analytics.*

The 35 page views were spread across six sites: 12 on the company front page, 9 on SnapDog, 8 on the books hub, 3 on CyberSim, 2 on Lectern and 1 on the apps page. The landing pages drew three App Store clicks, one on SnapDog and two from a single CyberSim visitor, with no sale or new download after any of them. No tagged links went out on X that week, so there was nothing to credit. This week so far there have been five page views, four on Pipe Flow and one on SnapDog. Apple's numbers for 9 to 15 November come in Monday's ledger.

## The shop behind the diary

| Day of work | Entries | Words | Nightly writer |
|---|---|---|---|
| Fri Nov 6 | 3 | 2,122 | Claude |
| Sat Nov 7 | 1 | 505 | Claude |
| Sun Nov 8 | 5 | 3,241 | Claude |
| Mon Nov 9 | 5 | 2,991 | Claude |
| Tue Nov 10 | 3 | 2,569 | Claude |
| Wed Nov 11 | 4 | 1,694 | Z.ai |
| Thu Nov 12 | 3 | 2,346 | Claude |

![Bar chart of diary words by day, from 505 words on Saturday 7 November to 3,241 on Sunday 8 November](weekly-roundup-diary-words.png)
*Diary words published by the day the work happened, 6 to 12 November 2026, counted from the repository on 13 November 2026. Saturday is short because OS Pi was the only project with real work.*

Every night published. Wednesday's was written by the backup model, Z.ai, instead of Claude. The assistants mostly held still: every daily audit that ran from 5 to 12 November counted 28 profiles with no changes, and a 29th, AI Budget Builder, appeared on 12 November with only a name. Two of the audit assistant's own routines failed on 6 and 7 November, and the notes refresh missed 6 to 8 November. The link from my shared assistant computer to the Mac mini dropped again on some mornings, which is why some daily checks could only reach the laptop.

## Next week

From the shop's open-work list and this week's entries:

- Decide which of the eleven paused Hermes jobs come back, and make each one prove its work on disk, not just finish.
- Give AI Budget Builder a description and approval rules before it does anything.
- Run StatBar 1.11.0 as a signed build on screen, then take it somewhere and watch the weather follow.
- Put SnapDog's Linux recorder on a real Linux desktop, and bring the Linux page up to the current packages.
- Build and upload SnapDog 1.2.2, still open on the list since 16 October.
- Answer the ledger's best open question: now that CyberSim's $9.99 purchase is live, try one tagged post as a real purchase test.
- Settle the security headers missing on all nine public sites, waiting on me since 18 October.
- Fix OS Pi's doubled music, which has been open since 4 November.

## Sources

Opened on 13 November 2026:

- [SnapDog's Linux page](https://snapdog.remnantsecurity.com/linux.html), which still describes the 0.2.58 build.
- [CyberSim on the App Store](https://apps.apple.com/us/app/cybersim-cert-exam-practice/id6762009652), which lists version 1.1.2, released 4 November.
- [CyberSim's website](https://cybersim.remnantsecurity.com/), which names the $9.99 one-time Full Access purchase.
- [StatBar's website](https://statbar.remnantsecurity.com/), which does not yet mention following your location. That fits an unreleased 1.11.0.

Earlier on this blog:

- [The last published roundup, the week of 12 October](/weekly-roundup/2026-10-16/).
- This week's stories: [OS Pi's Monkey Island timing and SnapDog's frozen screen](/monkey-island-cutscenes-snapdog-linux-simulator/2026-11-06/), [OS Pi's busiest day](/macos9port/2026-11-07/), [StatBar's 32.5 GB promise](/statbar-snapdog-os-pi-build-fleet-sunday/2026-11-08/), [SnapDog records one window](/snapdog-linux-window-recording-os-pi-movie-chooser/2026-11-09/), [StatBar weather and OS Pi screen sizes](/statbar-weather-follows-mac-os-pi-screen-sizes/2026-11-10/), [the Hermes audit](/hermesai/2026-11-11/), [Monkey Island saves and reloads](/macos9port/2026-11-11/) and [Sprout and OS Pi's app installer](/sprout-platformer-os-pi-classic-installer/2026-11-12/).

What I did not verify: the sales and traffic figures come from my growth assistant's report for 2 to 8 November and one PostHog read for 9 to 13 November, not a fresh App Store pull. The test counts, timings and pixel figures come from the diary entries, and I reran none of the checks behind them.
