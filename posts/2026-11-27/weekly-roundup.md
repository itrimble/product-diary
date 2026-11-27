---
project: Weekly roundup
title: "Week of November 20: Two M5s Arrive and the Mini Goes Quiet"
summary: Two small home computers for running language models went from a paper plan to 32 measured speeds, a Mac game port lost its missing floor, nothing sold, and the Mac mini that signs this diary stopped answering.
stats: Diary entries = 24 | Diary words = 15,328 | Site page views Nov 20-26 = 12 | Paid units Nov 16-22 = 0 | Bosgame M5 speed results = 32
format: longform
---
This was the week two new computers showed up and corrected my plans. The first of two Bosgame M5 mini PCs, bought to run language models at home, went from a paper runbook to 32 measured speeds in two days. My Mac port of Escape from Butcher Bay got its floor back. Nothing sold. On Wednesday afternoon the Mac mini that writes and signs this diary stopped answering.

This roundup covers Friday 20 November to Thursday 26 November. The nightly diary published for Friday through Tuesday, 20 to 24 November. Wednesday's entries exist only as a draft written by hand, because the Mac mini went quiet before its nightly run and only the mini can sign a day for publication. Thursday was Thanksgiving, and no entry was written for it. Where I use Wednesday's work below, I say it comes from that unposted draft. Last Friday's roundup, [the week of 13 November](/weekly-roundup/2026-11-20/), ended with a list of things nobody had tested yet. This week a few of them got tested, and several more were added.

## The week in numbers

Every figure here comes from this week's diary entries, my growth assistant's weekly ledger, the daily assistant audits or a read-only look at the site analytics on 27 November. Wednesday's figures are from the unposted draft and are marked that way.

| What | Before | After | Source |
|---|---|---|---|
| Bosgame M5 speed results | 0, nothing booted (22 Nov) | 6 on 23 Nov, then 32 across 8 models on 24 Nov | [22 Nov runbook](/m5-omarchy-day-one/2026-11-22/), [23 Nov entry](/bosgame/2026-11-23/), [24 Nov story](/bosgame-m5-speed-results-butcher-bay-game-mode/2026-11-24/) |
| Graphics memory given to the M5's chip | 105 GiB planned | 120 GiB working, 112 GiB allocated in a test | 23 Nov entry |
| A model conversion on the M5 | 15 minutes, the runbook's guess | 54 seconds | [24 Nov entry](/bosgame/2026-11-24/) |
| Butcher Bay courtyard floor on the Mac | black band along the bottom | no band in 13 of 13 frames; 48 of 49 timing samples between 59.94 and 60.10 frames a second | [23 Nov entry](/escape-from-butcher-bay/2026-11-23/) |
| Dante conversion, seconds to the first battle | 175.5 | 128.6 | [20 Nov entry](/dante-recomp-host/2026-11-20/) |
| Quiet Links unit tests passing | 204 (20 Nov) | 483 of 483 (24 Nov) | [20 Nov story](/quiet-links-golf-swing-dante-recomp-eternal-darkness/2026-11-20/), [24 Nov entry](/golfprompt/2026-11-24/) |
| Assistant profiles in the daily audit | 30 (20 Nov) | 30 (27 Nov), one description edited | daily audits |
| Site page views, a week | 103 (13 to 19 Nov) | 12 (20 to 26 Nov) | PostHog, read 27 Nov |
| Paid app units | 0 (9 to 15 Nov) | 0 (16 to 22 Nov) | weekly ledger |
| Diary published | 21 entries, 14,798 words (13 to 19 Nov) | 24 entries, 15,328 words (20 to 24 Nov) | this repo, counted 27 Nov |

## Two Bosgame M5s go from paper to numbers

On Sunday I wrote a runbook for two mini computers I had not touched. Each has 128 GB of memory shared between the processor and the graphics chip, which is the whole point: a large language model needs most of that memory in one place. The runbook said, at the top, that nothing in it had been tried on real hardware. That sentence turned out to be the most useful one in it.

The first machine arrived on Monday, and the [Monday entry](/bosgame/2026-11-23/) is a list of places where the hardware overruled me. The setup script needed five real runs to finish. Each failure was something only the box could show: downloads that broke under parallel connections, a second password prompt that timed out, a configuration file the system account could not read, and a leftover lock after a killed run. All four are fixed, and a suite of 44 checks now covers the lock bug. I had budgeted 105 GiB of memory for the graphics chip. 120 GiB works, and a test allocated 112 GiB, which was the test's own cap.

Two security catches mattered more than the speed. The worker that lets the two machines pool their memory listened on the network before its firewall rule existed, and it has no login, so it now refuses to start until the firewall is on. A system wrapper that ran with full privileges was writable by my everyday account, so it moved somewhere only the system can change.

On Tuesday the first machine finished a full round of speed tests. I ran every model I own that fits on it down two graphics paths, ROCm and Vulkan, with a short prompt and an 8,192-token one, three repeats each, and the median reported. That is 32 results across 8 models, up from 6 on Monday.

| Model family | Faster path | By how much |
|---|---|---|
| GLM | Vulkan | 13 percent |
| Strata | Vulkan | 12 percent |
| Gemma | ROCm | 25 percent |

Neither path wins everywhere, which is the honest headline. The same results went up on my [AI models catalog](/aimodels-site/2026-11-24/), and when I opened its home page on 27 November it still showed 26.0 tokens a second for the Flash-Next model on ROCm and 30.4 on Vulkan. Monday's receipt is marked superseded, because it used an average where Tuesday's uses a median. Power figures come from the chip's own sensor, not a meter on the wall, and room temperature was not recorded.

![The AI models catalog home page with a measured line reading 26.0 tokens a second on ROCm and 30.4 on Vulkan](weekly-roundup-aimodels-measured-speeds.png)
*The AI models catalog home page captured on 24 November 2026, after the 32 results went up. The "measured" line under the pipeline counts carries the two Flash-Next figures.*

The second machine arrived later in the week. Wednesday's draft, which is not posted yet, records the two of them serving one 748-billion-parameter DeepSeek model that neither could hold alone, linked by a single Thunderbolt cable. It took four attempts to load. The successful one read a 297-token prompt at 130 tokens a second and wrote at 15.0. The same draft compares two versions of AMD's graphics software on llama.cpp and finds no measurable difference. I have checked those figures against the draft, not against a rerun. The [llama.cpp RPC notes](https://github.com/ggml-org/llama.cpp/blob/master/tools/rpc/README.md) carry a blunt warning that the pooling server should never run on an open network, which is why the firewall check above exists.

## Butcher Bay on the Mac: a dark week, then a floor

Escape from Butcher Bay is an Xbox shooter I am bringing to the Mac. On Saturday it [played smoothly and packaged as one app](/butcher-bay-mac-port-comfy-golf-site/2026-11-21/), but the characters were drawn far too dark. I ruled out the display curve, forced the picture opaque, tested and withdrew a colour-swap theory, and found that 99.8 percent of draws went through one generated blending stage whose output was already black. So I wrote down a decision: replace that generator with the one from the [xemu emulator](https://xemu.app) instead of guessing further.

![The Mac build at the prison gate with a character on the right drawn almost black](weekly-roundup-butcher-bay-dark-character-gate.png)
*The Mac build at the Butcher Bay gate, captured on 21 November 2026 and first shown in the 22 November story. Look at the character on the right: face and jacket are nearly black while the walls behind are lit.*

Sunday went into tools for that hunt. The frame counter in the window title had been counting repeated pictures twice, so a healthy 60 could sit on top of a stalled screen. It now shows distinct pictures and requested pictures side by side. Apple's performance overlay can be switched on without a terminal. The [Sunday story](/butcher-bay-mac-overlay-dante-audit-m5-runbook/2026-11-22/) says it plainly: zero darkness fixes that day.

Monday brought the visible win. The courtyard had a black band along the bottom where the floor should be. The game draws that scene in several passes, the first at 640 by 480 and the rest at 639 by 479, and my code resized the drawing surface for each pass, so big floor triangles were clipped differently each time and the later passes threw the floor away. Keeping the surface at full size and trimming each pass fixed it. The last capture showed no band in 13 of 13 frames. The same day a new graphics path written for Apple's Metal arrived, about 4,000 lines, able to draw at 4K.

![The Butcher Bay courtyard drawn by the new Metal path, with a mission card over the scene and three characters lit normally](weekly-roundup-butcher-bay-metal-4k-courtyard.png)
*A 4K frame from the new Metal path on the evening of 23 November 2026, scaled down for the page. The characters read clearly here, but I have not compared them side by side with the emulator.*

On Tuesday the port started behaving like a Mac game. The app now launches its real program directly, not through a script, and after that change macOS reported Game Mode on. A 1280 by 720 window renders at 2560 by 1440, and full screen steps up to 4K; my notes say that cut the window system's compositing work by about 55 percent. Wednesday's unposted draft adds mouse and keyboard play and button pictures that switch to match the controller in your hand. Monday's entry had no frame-rate figures for the Metal path. Wednesday's draft quotes my handover notes saying it plays at a locked 4K and 60 frames a second with Game Mode on, and a log showing 59 to 60. I have not rerun either.

## Dante, Eternal Darkness and God of War III

The Dante's Inferno conversion, which turns a PlayStation 3 game into something a Mac can run, used to spend nearly three minutes of every test watching its opening. On Friday I ran the game's clock at double speed through that stretch. Four times speed gained almost nothing, because the game paces its video from audio and the silent audio queue still drained in real time. With that fixed, the first battle arrived at 128.6 seconds instead of 175.5.

![Bar chart: the first battle arrived at 175.5 seconds at baseline, 174.7 with the clock at four times speed, and 128.6 with the clock at double speed and the audio fix](weekly-roundup-dante-first-battle-before-after.png)
*Seconds from launch to the first battle, from the 20 November Dante Recomp Host entry. A corrected run later reached it at 128.9 seconds. Chart made on 27 November 2026.*

The shorter opening threw off the robot player that drives these tests, whose attack timer had started at launch. I re-anchored it to the first frame it recognises as gameplay. Two later runs still ended without a save, with the boss at about 72 percent health at best. The game also gained a Graphics page as a seventh row in its own Options list.

![The Recomp Graphics page inside the game's options, with Internal Resolution set to 3x, 4K, and a note that the setting saved](weekly-roundup-dante-graphics-page-3x.png)
*The Recomp Graphics page on 20 November 2026 after I changed Internal Resolution from 2x to 3x. The title bar says the setting saved and a restart is required.*

On Sunday a second, more careful copy of the port, [Dante Audit Host](/dante-audit-host/2026-11-22/), got through the difficulty screen into the opening story, with 40 registered tests passing. On Tuesday it gained settings for ray-traced shadows that I [have not built or run](/dante-audit-host/2026-11-24/). Wednesday's draft, from a third copy of the game's runtime, has the sun behind those shadows pointing the right way at last.

The [Eternal Darkness entry](/eternal-darkness/2026-11-20/) is a modest one. My Mac conversion of the GameCube horror game held 60 frames a second on its title screen in a window, read 58 on the Nintendo logo and dipped to between 48 and 51 in the opening movie. I did not time a fight. A new option for screens that change their refresh rate stayed hidden, correctly, because none of my screens can. God of War III still stops after the Sony splash screen. Its [Friday entry](/gow3-recomp/2026-11-20/) is a handover note listing what is done and what is not, and the newest log shows 61 presented frames with none changed.

## Quiet Links: a swing, a pond and a crowd

Quiet Links, my browser golf game, got a three-press swing on Friday: once to start the backswing, once to set power, once as the marker comes back. Early presses pull the ball and late ones push it. It also gained a second course and a caddie that picks the club. On Saturday a separate site, [Comfy Golf](/comfygolf-site/2026-11-21/), gained a landing page, a guide and a demo, but its public address did not answer when I checked, so I will not call it launched.

On Tuesday the [pond got reflections](/golfprompt/2026-11-24/) of trees and sky outside the camera's view, behind a ray tracing switch that is off by default. At normal camera distance I could not tell the two settings apart without the label. The unit tests went from 204 on Friday to 483 of 483 on Tuesday.

![Quiet Links on the first tee with striped fairways, a hole sign and a crowd of spectators in the distance, with a 60 frames a second readout](weekly-roundup-quiet-links-crowd-draft.png)
*Quiet Links on 25 November 2026, from the unposted Wednesday draft. Look left of the fairway for the gallery and at the readout by the sign, which says 60.0 frames a second with ray tracing on.*

The draft's version is the one I like most. Fairways have mowing stripes, the tee has markers and a wooden sign, and six holes have roped-off crowds, 452 spectators built from the game's own scanned golfer. It held 60 frames a second on the MacBook with the crowd and ray tracing on. The crowd has no collision, so a ball can fly straight through a spectator. None of that work is committed yet. The draft also records a first install on my own iPhone, but it is the web version wrapped in an app, and its phone frame rates are not real results yet.

## Fleet notes: a wiki goes private, the mini goes quiet

On Monday the [Grok Bot Wiki](/grokbot-wiki/2026-11-23/), which explains my fleet of assistants, gained a visitor guide, a glossary and search. By evening I had taken it off the public internet, because a page that explains how my home network fits together should not be readable by strangers. The public address now shows a neutral notice. I have not audited what older published copies once showed.

The daily audit counted 30 assistant profiles in every snapshot from 20 to 27 November. The only profile change was one assistant's description, edited on 23 November. The shared assistant computer was restored or replaced twice, on 22 and 25 November. A weekly configuration backup for my house assistant failed on 23 November, and its cause is still not written down. The docs refresh did not run on 21 or 22 November.

Wednesday afternoon the Mac mini stopped accepting remote logins. The 17:15 check saw slow git calls and never finished, the 21:15 check timed out, and every check since has been closed before login. By Friday morning the notes had a clue: the mini is up and its login port is open from my laptop too, but logins still close, which points at the mini's own login service rather than the network. This is why Wednesday has no published entry. The diary's rule is that only a run on the mini can sign a day, and GitHub's check refuses any day without that signature. On Monday I also changed the rules so that frames from my own game ports and conversions can be published, which is why this roundup can show them.

## The sales

Nothing sold. The ledger for 16 to 22 November reports $0 in revenue, $0 spent and no units of any kind. Apple returned "no sales" for every day in that window and for the week ending 22 November, including no update downloads of SnapDog 1.2.2, which went live on the Mac App Store late on 19 November. It is the ninth straight week with no unit the ledger can trace to anything I did. Apple's files for 23 to 26 November have not been pulled yet. They come with Monday's ledger, so I have no sales figure for those days.

On Monday I published [Learning to Sell, Part 2](/learning-to-sell/2026-11-22/), filed under Sunday's date. It covers 14 October to 22 November: two paid sales on record, both from early October, worth €3.43 after Apple's cut, against $1,010 spent on Grok Bot. Book and StatBar sales are still missing from it, not zero.

![Bar chart of daily site page views from 20 to 26 November: 3, 1, 1, 7, then zero for three days](weekly-roundup-page-views-nov-20-to-26.png)
*Page views across the Remnant Security sites by day, read from PostHog on 27 November 2026 with local test traffic excluded and days counted in Chicago time. This blog has no analytics.*

PostHog shows 12 page views for 20 to 26 November: 5 on the apps page, 4 on SnapDog, and one each on the books hub, the company front page and Lectern. Five of Monday's seven came from a single visitor on the apps page. One visit carried a campaign tag: a reply about The Halcyon Key sent someone in Brazil to the Max Mercer page just after midnight on 20 November. No click to Amazon was captured after it. None of the 12 clicked through to the App Store, Amazon or Gumroad.

From 24 November to the time I looked on Friday afternoon, PostHog recorded no events of any kind, not one page view, click or exit. That fits a holiday week, but it would also fit a tracking fault, and I have not checked which. The script is still present on the SnapDog, Lectern, books, apps and CyberSim pages. Last week's 103 page views included 74 on one Sunday that the ledger judged automated. Without that day the week had 29, so this week's 12 is lower either way.

## The shop behind the diary

| Day of work | Entries | Words | Nightly writer |
|---|---|---|---|
| Fri Nov 20 | 7 | 4,368 | Claude |
| Sat Nov 21 | 4 | 2,697 | Claude |
| Sun Nov 22 | 4, plus Learning to Sell Part 2 | 3,005, plus 6,422 | Claude; Part 2 written separately |
| Mon Nov 23 | 3 | 1,355 | Claude |
| Tue Nov 24 | 6 | 3,903 | Claude |
| Wed Nov 25 | 8, draft only | 6,941 | written by hand, unsigned |
| Thu Nov 26 | 0 | 0 | no run |

![Bar chart of diary words by day from 20 to 26 November, with Learning to Sell stacked on Sunday and a hatched bar for the unposted Wednesday draft](weekly-roundup-diary-words-nov-20-to-26.png)
*Diary words by the day the work happened, 20 to 26 November 2026, counted from the repository and the unmerged Wednesday branch on 27 November 2026. Wednesday is hatched because none of it is published.*

Five nights published, all written by Claude, with no fallback needed. Monday had three entries and no daily story. Saturday's and Monday's overviews each list folders the run flagged but did not examine in time, so a quiet-looking day there means unread, not idle. Wednesday's draft is the longest day of the week, mostly because of a 2,910-word long read about the two M5s, and it sits on a branch waiting for a signature from a machine I cannot log in to.

## Coming up

From the shop's open-work list, the ledger and this week's entries:

- Get remote logins working on the Mac mini again. Until then nothing can be signed: not Wednesday's entries, not the M5 long read, not this roundup.
- The three long reads on the 20 November conversion work are also still open, with their verify check failing.
- See Apple's numbers for 23 to 29 November in Monday's ledger.
- Read the phone-click test on the SnapDog and Lectern pages, due on 29 November.
- Decide the four questions the ledger left open: extend or close the Loom-switcher replies for SnapDog, keep or stop the SnapDog reply lane, try a different channel for CyberSim's $9.99 Full Access purchase, and whether Quiet Links gets a tracked experiment and a landing page.
- Find out why the weekly assistant configuration backup failed on 23 November.
- Time DeepSeek again on the new AMD software. The draft says it loaded and answered there, but nobody timed it.
- Compare Butcher Bay's characters against the emulator side by side, get the Dante robot to finish a level and save, and build the shadow settings in Dante Audit Host and look at them.

What I did not verify: the sales figures come from my growth assistant's report for 16 to 22 November, not a fresh App Store pull, so 23 to 26 November sales are missing. Page views are my own read-only PostHog queries on 27 November, and I have not established why no events arrived after 23 November. Speeds, test counts, frame rates and timings come from the diary entries and from Wednesday's unposted draft, and I reran none of the checks behind them. The catalog's 26.0 and 30.4 figures are one read of the live page.

## Sources

Opened on 27 November 2026:

- [Remnant AI Models](https://aimodels.remnantsecurity.com/), which showed 26.0 tokens a second on ROCm and 30.4 on Vulkan for Flash-Next. Its [benchmarks page](https://aimodels.remnantsecurity.com/benchmarks.html) loaded; I did not recheck each row.
- [SnapDog on the Mac App Store](https://apps.apple.com/us/app/snapdog-capture-annotate/id6783121166), which loaded; Apple's public lookup for the same listing showed version 1.2.2 at $14.99, released 04:56 UTC on 20 November.
- [xemu](https://xemu.app), the Original Xbox emulator whose graphics code the Butcher Bay port plans to borrow. I opened the front page only.
- [llama.cpp's RPC notes](https://github.com/ggml-org/llama.cpp/blob/master/tools/rpc/README.md), for the warning about running the pooling server on an open network.

Earlier on this blog:

- [Last week's roundup, the week of 13 November](/weekly-roundup/2026-11-20/).
- This week's stories: [Quiet Links gets a swing as Dante speeds up](/quiet-links-golf-swing-dante-recomp-eternal-darkness/2026-11-20/), [Butcher Bay hits 60 and Comfy Golf gets a site](/butcher-bay-mac-port-comfy-golf-site/2026-11-21/), [Butcher Bay gets debug tools as the M5s near](/butcher-bay-mac-overlay-dante-audit-m5-runbook/2026-11-22/), [the first M5 boots](/bosgame/2026-11-23/) and [real M5 speeds and Butcher Bay Game Mode](/bosgame-m5-speed-results-butcher-bay-game-mode/2026-11-24/).
- [Learning to Sell, Part 2](/learning-to-sell/2026-11-22/).
