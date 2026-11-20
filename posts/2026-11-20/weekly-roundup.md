---
project: Weekly roundup
title: "Week of November 13: Silent Tests, a Golfer, a Frozen Splash"
summary: A week of green lights that meant less than they seemed. SnapDog's tests had stopped running, a golf game got its golfer, a PS3 conversion froze on a splash screen, and nothing sold.
stats: Diary entries = 21 | Diary words = 14,798 | Site page views Nov 13-19 = 103 | Paid units Nov 9-15 = 0 | SnapDog tests silenced by one error = 165
format: longform
---
This was a week of work that looked finished before it was. SnapDog, my Mac app for screenshots and screen recording, had a whole test suite that had stopped running without telling me. A one-hole golf game went from a red warning card to a golfer who can swing, on a phone too. A PlayStation 3 conversion reached real gameplay on my Mac while a second one froze on its splash screen. Nobody bought anything.

This roundup covers Friday 13 November to Thursday 19 November. Last Friday's roundup, [the week of 6 November](/weekly-roundup/2026-11-13/), was about numbers that had to be made honest. This week the same problem showed up in a different form: a test run that reports nothing, a build that links but never launches, and a splash screen that runs at a lovely frame rate and then stops.

## The week in numbers

Every figure here comes from this week's diary entries, my growth assistant's weekly ledger, the daily assistant audits or a read-only look at the site analytics. Where a number is quoted from my own notes and was not rerun, the entry says so, and so do I.

| What | Before | After | Source |
|---|---|---|---|
| SnapDog Mac tests that actually ran | 0 of 165 (one compile error, found 15 Nov) | all compile; the 7 new Loom tests pass; 16 older failures, then a clean suite after 16 Nov | [15 Nov story](/snapdog-tests-revived-app-store-status-corrected/2026-11-15/), [16 Nov story](/snapdog-apple-review-golfprompt-missing-art/2026-11-16/) |
| SnapDog on the Mac App Store | 1.2.1 live (16 Nov) | 1.2.2 live (shown on 20 Nov) | Apple's public lookup, read 20 Nov |
| Quiet Links art files found | 0 of 16 (16 Nov) | 16 of 16, pack cut from 70 MB to 9.6 MB (17 Nov) | [17 Nov story](/golfprompt-quiet-links-golfer-phone-controls/2026-11-17/) |
| Quiet Links, triangles drawn per frame on a phone | 655,628 | 157,460 | 17 Nov story |
| Quiet Links, phone frame rate | about 1 a second | 76 a second in a throttled browser test | 17 Nov story |
| Small local coding models in the Hermes test | none tried | 2 of 5 routes passed the warm-up; 0 scored runs | [13 Nov story](/hermes-local-model-benchmark-statbar-weather-retry/2026-11-13/) |
| Dante conversion on my Mac | built, 0 programs launched (18 Nov) | played from logos to first gameplay (19 Nov); 0 of 10 robot runs saved a game | [18 Nov story](/dante-recomp-host-links-build-fleet-gitignore-note/2026-11-18/), [19 Nov story](/dante-recomp-host-plays-gow3-recomp-hangs/2026-11-19/) |
| God of War III conversion | nothing on screen | splash screen at 59.68 frames a second for 12.7 seconds, then a freeze | 19 Nov story |
| Assistant profiles in the daily audit | 29 (13 Nov) | 30 (18 Nov, Game Guru added) | daily audits |
| Site page views, a week | 35 (2 to 8 Nov) | 86 (9 to 15 Nov), 74 of them on 15 Nov | weekly ledger, PostHog |
| Paid app units | 0 (2 to 8 Nov) | 0 (9 to 15 Nov) | weekly ledger |
| Diary published | 24 entries, 15,468 words (6 to 12 Nov) | 21 entries, 14,798 words (13 to 19 Nov) | this repo, counted 20 Nov |

## SnapDog's tests had gone quiet

On Sunday I found out SnapDog's automated checks had been dead for two weeks. The Loom video import, which landed on 2 November, came with a small fake network helper so its tests would not touch the internet. The helper returned its two answers in one order. The real code expected the other. Swift will not build a test target like that, and a test target that does not build runs nothing. None of the 7 new Loom tests ran. None of the existing 165 Mac tests ran either. There was no red light, no email, nothing.

Fixing the order made the Loom tests pass. Then the full run showed 16 failures in three older areas: 9 in annotation direction, 4 in click ripples and 3 in stitched scrolling captures. I made a separate copy of the project from just before the Loom work and ran the same suite there. Same 16. They had been failing the whole time, hidden behind the compile error.

On Monday I traced them to one October commit that had reverted three working fixes and left their tests behind. Arrows drew mirrored when you dragged left or up, the click ripple in recordings was broken, and stitched captures failed on small scrolls. I restored all three, bumped the app to 1.2.2 (build 10) and the Mac suite came back clean. Apple's own checker reported 0 errors and 0 warnings on the build, and I sent it to review that afternoon.

SnapDog's handover notes were wrong too. They said version 1.0.0 was waiting for review, a state months out of date, so I checked App Store Connect instead of trusting my own file. As of Sunday 1.2.1 was live and 1.2.2 existed only as an empty shell.

When I looked on Friday, Apple's public lookup showed version 1.2.2 as the current version, with a release time of 04:56 UTC on 20 November. That is 10:56 pm on Thursday 19 November in Chicago. The diary has not written about it yet, and I have not downloaded the update or watched Loom import work against the real service. The 16 November story lists that as never run.

## Quiet Links gets a golfer

Quiet Links is a one-hole golf game for the web browser, built under the project name Golfprompt. It was started from a prompt on Monday night and finished by a coding agent in about two hours. On Monday the game wanted 16 art files, a golfer, clubs, textures and a sky, and had none of them. I had asked for a red warning card on purpose, so that a placeholder figure could not make me forget the art was missing.

![Quiet Links at the tee with a red card reading ASSET PACK MISSING and no golfer in view](weekly-roundup-quiet-links-missing-art-card.png)
*Quiet Links on Monday 16 November 2026, same hole and same driver as the picture below. The orange panel at top left names the 16 missing files.*

On Tuesday the art arrived. The page then looked frozen while it loaded, because the pack was 70 MB. Cutting the textures got it down to 9.6 MB, which broke something else: the shrinking script reshuffled the model files, every part of the golfer's body read the wrong bytes, and he went invisible while his club stayed visible. I fixed the script and added tests that fail if it happens again.

![Quiet Links at the tee on a desktop browser with a golfer in a white shirt standing behind the ball](weekly-roundup-quiet-links-golfer-at-tee.png)
*The same hole on Tuesday 17 November 2026, captured from the project's screenshot folder. The panel at top left now reads PBR pack OK. The driver estimate at top right still says about 236 yards.*

Then came the swing. At impact the golfer was yanked 1.8 metres into the turf, and the club swept past the ball. I found five causes, two of which I can name: the club head was identified by the wrong end, and the shaft was measured in the wrong units. The driver is now tuned to carry 249 yards from the tee. The screenshot above shows the older 236 estimate, and I did not check the on-screen number after the final change.

The phone was the harder problem. The game ran at about one frame a second there. The terrain alone was 320,000 triangles.

![Two bar charts: triangles drawn per frame fell from 655,628 to 157,460 and frames per second rose from about 1 to 76](weekly-roundup-quiet-links-phone-frame-rate.png)
*Quiet Links on a phone, before and after Tuesday's changes, from the 17 November entry. The after figure comes from a browser test with the processor slowed fourfold. Chart made on 20 November 2026.*

Phones now get a coarser course, and a quality controller backs off when frames get slow. Under the throttled test the scene measured 157,460 triangles at 76 frames a second, and a touch swing still launched the ball. The entry says 62 unit tests and 20 browser tests passed after the last change, going by the commit messages. I reran none of them. I have also not played a full hole on a real iPhone.

## The Hermes warm-up that three routes failed

On Friday I wrote a repeatable test for small coding models that run on my Mac mini. A run counts only if the evidence on disk matches the claim, each candidate gets three runs, and the report prints a confidence interval, not a ranking I cannot defend. Before any model is scored, a warm-up asks it to write one small file.

Three of the five routes failed that. The paid cloud baseline failed all five attempts and burned 88,734 tokens poking around in parent folders. The two TensorFold models failed, one by describing the command instead of running it and one by refusing to start. Two Qwen models passed, but only after I told the agent exactly which folder to work in. No model has been scored. Anyone who tells you which one won this week is guessing.

## Two PlayStation 3 conversions, one working and one frozen

On Wednesday my Dante conversion experiment, which turns a PlayStation 3 game into code a Mac can build, compiled to the end and made two programs. I had not launched either. On Thursday it ran: publisher logos by lunchtime, then the menu, then the opening cutscene and a first stretch of play. I took 11 screenshots along the way and I am not publishing any of them, because they are frames from a commercial game.

A robot player I wrote did less well. It reads the rendered frames, presses virtual buttons and counts a run as a success only if the game writes a real save file. Ten checkpoint runs ended with no saved game. Seven times the game was still alive when the time ran out. Three times it died. I have not traced those three, and a robot that cannot finish a level is as likely to be bad at the game as the port is to be bad.

The second conversion, God of War III, starts on my Apple silicon Mac, draws its opening splash screen at about 60 frames a second for nearly 13 seconds and then freezes for good. The first cause was mine: the code gave up after 50 milliseconds on a graphics step the game patches about 77 milliseconds later. Raising the wait to 1,000 milliseconds moved the boot from flip 750 to flip 770. Twenty flips. The second cause is open. The main thread sits in a tiny sleep loop waiting for a counter to reach zero, and I have not found what is meant to count it down.

![A terminal log with a short sleep call repeating while the flip counter creeps from 54 to 55](weekly-roundup-gow3-terminal-deadlock-log.png)
*A terminal log from the God of War III freeze, saved the evening of 19 November 2026. It shows terminal text only, no game footage. One unresolved system function is flagged in red.*

## Fleet notes: a new assistant and a steadier link

The daily audit counted 29 assistant profiles on 13 November. On 18 November it counted 30, because a new assistant, Game Guru, was created on the 17th with a name and nothing else: no description, no approval rules, no schedule. That is the second assistant in a week, after AI Budget Builder on 12 November, to exist only as a name. I wrote Game Guru's purpose down as unverified.

On 18 November the shared assistant computer moved to the connector built into the assistant platform, retiring the hand-built workaround that kept dropping its link to my Mac mini. The notes record two daily checks since, on 19 and 20 November, where the Mac mini and my laptop answered on the first try. Two days is not a long record, so I will call it promising and no more. A Build Fleet note also gained a useful warning: a build sent to another computer leaves behind any file that git ignores, so a build that works at home can fail there for no obvious reason.

## The sales

Nothing sold. The ledger for 9 to 15 November reports $0 in revenue, $0 spent and no units of any kind. Apple returned "no sales" for every day in that window and for the week ending 15 November, so there were no paid units, no free downloads and no updates on any app. It is the eighth straight week with no sale the ledger can trace to anything I did. Last week I wrote that Apple counted 25 free update downloads for 2 to 8 November. Apple's weekly summary for that week, now published, says 24 update units plus one free Lectern download, so treat 25 as the daily-file total and 24 as Apple's.

The page views need care. PostHog shows 103 for 13 to 19 November across the Remnant sites: 64 on SnapDog, 26 on Lectern, 8 on the company front page and 5 on Pipe Flow. CyberSim, Lightfence and the books hub had none.

![Bar chart of daily site page views from 9 to 19 November, with 74 on Sunday 15 November and single digits on most other days](weekly-roundup-page-views-by-day.png)
*Page views across the Remnant Security sites by day, read from PostHog on 20 November 2026 with local test traffic excluded and days counted in Chicago time. Our own checks may be counted, and this blog has no analytics.*

Of those 103, 74 landed on Sunday 15 November, 55 on SnapDog and 19 on Lectern, each from a different visitor with one page view. 59 of the 74 came from four cities known for data centers: Ashburn, Council Bluffs, Boardman and Covington. The weekly ledger says this looks automated and not like buyers, and I agree, though I cannot prove it. Without that day, the week had 29 page views. None of the 103 carried a campaign tag, so I cannot credit any of them to a post.

Five clicks went to the App Store from the landing pages: three on Lectern and two on SnapDog. The ledger judged at most two of them human, both Android phones on the Lectern page, which cannot install a Mac app. No sale followed any of them. Two link posts went out on X in the ledger's 9 to 15 November window, on 11 and 13 November, both tagged, and neither produced a tagged visit. Page views for 16 to 19 November were 13, 4, 1 and 0. Apple's numbers for those days come in Monday's ledger, so I have no sales figure for them. As of about 3:50 pm on Friday there were three page views today, one each on the books hub, the company front page and SnapDog.

Last week's chart showed 5 page views for 9 to 13 November, read on Friday afternoon. The full count for those days turned out to be 9, because more arrived after I looked.

## The shop behind the diary

| Day of work | Entries | Words | Nightly writer |
|---|---|---|---|
| Fri Nov 13 | 3 | 2,391 | Claude |
| Sat Nov 14 | 1 | 382 | Claude |
| Sun Nov 15 | 2 | 1,691 | Claude |
| Mon Nov 16 | 3 | 1,959 | Claude |
| Tue Nov 17 | 3 | 2,019 | Claude |
| Wed Nov 18 | 5 | 3,057 | Claude |
| Thu Nov 19 | 4 | 3,299 | Claude |

![Bar chart of diary words by day, from 382 words on Saturday 14 November to 3,299 on Thursday 19 November](weekly-roundup-diary-words-nov-13-to-19.png)
*Diary words published by the day the work happened, 13 to 19 November 2026, counted from the repository on 20 November 2026. Saturday is short because the only flagged folder was a routine notes refresh.*

Every night published, all written by Claude, with no fallback needed. Saturday was a genuinely quiet day and the diary said so in one short entry. Wednesday and Thursday were the longest, which fits the two days the Dante work was on screen.

## Coming up

From the shop's open-work list, the ledger and this week's entries:

- See what Apple's numbers say for 16 to 22 November in Monday's ledger, the first week SnapDog 1.2.2 is live.
- Run SnapDog's Loom import against the real service, which no one has done yet, and check the Mac-note test on phone clicks, due to be read on 29 November.
- Decide on the tagged Loom replies for SnapDog. The experiment window closes 21 November and, as of the 16 November ledger, no reply had gone out.
- Decide whether to put one tagged post behind CyberSim's $9.99 Full Access purchase, which has been purchasable since 4 November.
- Play a full Quiet Links hole on a real iPhone, and check the 249-yard driver number on screen.
- Find what counts down the counter that holds the God of War III boot, and get the Dante robot to finish one level and save.
- Score the first small local models on the Hermes test, and run StatBar 1.11.0 as a signed build on screen.
- Give Game Guru and AI Budget Builder a description and approval rules before they do any work.
- Settle the six missing security headers on the nine public sites, waiting on me since 18 October.

## Sources

Opened on 20 November 2026:

- [SnapDog on the Mac App Store](https://apps.apple.com/us/app/snapdog-capture-annotate/id6783121166), which returned a normal page; Apple's public lookup for the same listing showed 1.2.2 at $14.99.
- [SnapDog's website](https://snapdog.remnantsecurity.com/), which loaded. I did not re-read it for claims.
- [CyberSim on the App Store](https://apps.apple.com/us/app/cybersim-cert-exam-practice/id6762009652), which lists version 1.1.2, released 4 November, free with a $9.99 Full Access purchase.
- [StatBar's website](https://statbar.remnantsecurity.com/), which loaded.
- [The three.js documentation](https://threejs.org/docs/), the 3D library Quiet Links is built on. I opened the front page only.

Earlier on this blog:

- [Last week's roundup, the week of 6 November](/weekly-roundup/2026-11-13/).
- This week's stories: [the Hermes warm-up and StatBar's weather retry](/hermes-local-model-benchmark-statbar-weather-retry/2026-11-13/), [SnapDog's silent tests](/snapdog-tests-revived-app-store-status-corrected/2026-11-15/), [SnapDog 1.2.2 and the missing golfer](/snapdog-apple-review-golfprompt-missing-art/2026-11-16/), [Quiet Links gets its golfer](/golfprompt-quiet-links-golfer-phone-controls/2026-11-17/), [Dante's build and a Build Fleet warning](/dante-recomp-host-links-build-fleet-gitignore-note/2026-11-18/) and [Dante plays while God of War III freezes](/dante-recomp-host-plays-gow3-recomp-hangs/2026-11-19/).

What I did not verify: the sales and traffic figures come from my growth assistant's report for 9 to 15 November and my own read-only PostHog queries on 20 November, not a fresh App Store pull, so 16 to 19 November sales are missing. The 74 page views on 15 November are judged automated by the ledger, and I have no proof. Test counts, timings, frame rates and the Dante and God of War III figures come from the diary entries, and I reran none of the checks behind them. SnapDog 1.2.2's release time is one read of Apple's public lookup.
