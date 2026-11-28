---
project: Daily Story
title: AI Benchmark Suite Scores Local Models as Quiet Links Grows
summary: I built a bench that scores local AI models on 25 real tasks, paired two Bosgame machines on one huge model, and Quiet Links golf got crowds.
format: longform
stats: Benchmark tasks = 25 | Suite commits = 58 | Dante 4K average fps = 46.11 | Quiet Links tests = 485 of 485
---
On Wednesday I stopped measuring how fast my home AI computers talk and started measuring whether they can finish a job. The new AI Benchmark Suite gives a model one of 25 written tasks, such as building a golf game, locks it in a sandbox and scores what comes out. Around it, two small machines served one very large model together, and my golf game grew crowds.

## AI Benchmark Suite: Speed Charts Were Not Enough

Until now I only had speed charts. A model that writes 90 tokens a second can still hand back nothing useful, and the first results showed it. The suite has 25 tasks. Some are a golf game in Godot and a kanban board. Each run keeps a receipt of what happened. The first commit landed at 13:53 and by evening there were 58, adding 61,778 lines.

The early numbers were mixed, and I would not frame them as a leaderboard.

| Run | What happened |
|---|---|
| GLM through its cloud service, Godot golf task | 70 of 70 in 59 minutes, but the timing is suspect: I accidentally rebuilt llama.cpp on strix2 for three minutes of it |
| Inkling at stock effort | One 23,000-token answer and no files in 24 minutes |
| Inkling with thinking turned to minimal | First file at 7 minutes |

Most of the day went into the runner. It now has named time budgets from 30 minutes to 12 hours and a smart resume. A run that loops, stalls, crashes or overflows its context picks up again, and each resume is written into the receipt. Quota failures are never resumed. Local models get a 40-minute stall threshold. A paused run can continue from its saved folder, and the receipt then says it was not a one-shot, which keeps me honest.

Scoring got guardrails too. Output, disk use and stray processes are capped for every untrusted run. One scorer checks that Godot really starts the simulation, because a Python stand-in scored zero. There is also a live lab page showing each machine's job. A second working copy of the project finished with a free-disk gauge, an artifact viewer and a failure ledger. The full record is in the [AI Benchmark Suite entry](/aibenchmarksuite/2026-11-25/).

What I did not finish: the sandbox image has not been rebuilt with the pi coding-tool adapter, the paused Flash Next run still has to be continued, and the BIOS power change on strix2 is waiting, so its numbers ran at about half power. The runner has 67 passing tests, and I ran a mock end to end in the real sandbox on strix2. That is a mock, not a model.

The [AI Models site](/aimodels-site/2026-11-25/) picked up the task list the same afternoon. Its benchmarks page now lists the tasks and can save a receipt that keeps the machine, the model names and a fingerprint of the exact prompt, but drops the reply. One commit, five files, 489 lines. I did not run the site build, and nothing is public until I push the main branch.

## Bosgame M5: Two Machines, One Cable, One Big Model

The second spine of the day was the pair of Bosgame M5 machines. A new script now serves a very large DeepSeek model across both over a single cable, ready 47 seconds after I start it. Upstream's guide assumes Debian, two cables and fixed addresses. I have one cable and Arch, so I wrapped the project's own tools in my own script. Every mode ran for real, including a 37-minute input preparation.

| Single request | My pair | Upstream's pair |
|---|---|---|
| Writing code, tokens a second | 60.12 | 70.7 |
| Prose, tokens a second | 36.73 | 41.1 |
| Reading an 1,818-token prompt | 980.8 | 1,284 |

Upstream has two faster cables, so the gap is no surprise. My figures are single requests, not a median of five, and I did not check power or fans. Two things bit me. The default data port fell outside what the firewall admits on the cable, so the script pins it to 18111. A long model download was also killed by the out-of-memory guard because its job sat in the wrong resource group while the lab loaded another engine.

Then the Strata fix. Its first preset let the engine hold about 93 GiB of 124 and pushed 26 GiB into swap on strix1. Switching to resident experts with a 24,576 cache left the lowest free memory on an idle strix1 at 47.3 GiB and nothing swapped. Speed did not suffer: 114.0 tokens a second reading and 37.7 writing, against 112.7 and 38.0 before. A smaller cache left less headroom and slower long prompts. The patch on the lab side is written but I have not applied or run it. Last week's measurements are in [the earlier speed results story](/bosgame-m5-speed-results-butcher-bay-game-mode/2026-11-24/), and the day's record is in the [Bosgame M5 entry](/bosgame/2026-11-25/).

## Dante Recomp Host: Shadows Stop Bleeding Onto Cutscenes

In my Mac version of the PlayStation 3 game, soft shadows had been smearing over the movies and title cards. The host now tracks where each full-screen layer came from. When it is a movie, a flat picture or a fade, it forgets the 3D scene underneath and resets the shadow history. In the live check the 3D flag stayed off for frames 1 to 10,433 and switched on at 10,434, when the first fight started. This builds on [the earlier graphics menu work](/dante-recomp-host/2026-11-20/).

![Dante standing on a rock ledge beside a statue, with soft shadows across the stone](dante-recomp-host-gates-of-hell-4k-soft-shadows.png)
*A Gates of Hell frame from the soft-shadow test, saved on 25 November 2026. The entry measured this scene at 4K internal resolution; the saved file is 1920 pixels wide. Notice the dark, grounded shadow under the statue.*

I measured 3,600 frames in two places.

| Scene | Average fps | Slowest 1 percent |
|---|---|---|
| Gates of Hell, 4K | 46.11 | 6.29 |
| Acre courtyard fight, normal resolution | 59.40 | not recorded |

![Dante fighting creatures in the Acre courtyard, with flames in the foreground and shadows on the ground](dante-recomp-host-acre-courtyard-soft-shadows.png)
*The Acre courtyard fight with soft shadows on, 25 November 2026, after the cutscene fix. Notice the shadows cast by the enemies.*

A 6.29 fps floor on a 46 fps average says the worst frames are very bad, and I have not chased them. Forty-one regression tests pass. Still open: a real controller, a clean-machine playthrough, signing for distribution, and any frame-rate number from the second Mac. The [Dante entry](/dante-recomp-host/2026-11-25/) has the rest.

## Quiet Links: Crowds, Boulders and a First iPhone Install

My browser golf game stopped looking like a blockout. The fairway has mowing stripes, rocks stop the ball and the crowds are made of people. I also put it on my phone as an app for the first time. The first stripes were far too strong, so I cut the brightness range from 0.84 to 1.14 down to 0.92 to 1.07.

![Quiet Links first tee in a phone-sized window, with mowing stripes, a golfer and a minimap](quiet-links-first-tee-mow-lanes-phone.png)
*The first tee in a phone-sized preview, 25 November 2026. The readout at the bottom says 29.0 fps on the low setting, so this is not the fast case.*

The crowd was the fun part. The capsule spectators looked wrong, so I baked the scanned golfer into four poses and cut each to 2,958 triangles, down from 30,996. That gives 452 spectators over six holes. The real find was frame rate: high quality with ray tracing sat at 44.5 fps, which ruled out the graphics chip. The camera tested line of sight against terrain and trees twice per frame. Doing it every third frame brought the MacBook to 60.0.

![Quiet Links hole 1 on the high setting with a crowd gathered beside the fairway](quiet-links-real-crowd-gallery.png)
*The high setting with ray tracing at 60.0 fps on the MacBook, 25 November 2026. The gallery of spectators is at left, under the trees.*

Boulder collisions were only checked headlessly, and the collider is a circle fitted to a low-poly rock, so a ball can stop a few centimetres short. The iPhone build is a Capacitor shell around the same web game. It installed on my iPhone 17 Pro Max, but launch was refused because the phone was locked, and the crash that was reported did not reproduce. Unit tests passed 485 of 485 and the browser suite 62 of 63. The newcomer swing test still takes 12 strokes, not 7, and two fixes broke other tests, so I reverted both. Follows [Tuesday's pond work](/golfprompt/2026-11-24/); details in the [Golfprompt entry](/golfprompt/2026-11-25/).

## Butcher Bay and Grok Bot: The Shorter Items

The Mac port of Escape from Butcher Bay now plays with mouse and keyboard and swaps the on-screen buttons for PlayStation symbols or keycaps. F12 cycles the styles. Shadows now follow up to four real lights, and the app carries its own libraries. A 4K Metal run reported 59.94 to 60.00 fps. Seven regression tests passed. I did not test a second Mac, and I checked the PlayStation symbols from exported previews, not every in-game prompt. See the [Butcher Bay entry](/escape-from-butcher-bay/2026-11-25/).

The Grok Bot notes recorded strix2 joining my private network, though it is still missing file sync and a login shortcut. The server box that runs my assistants has only about 2.3 GiB of 15 free. I did not diff the changed files, since that folder has no version history. More in the [Grok Bot entry](/grokbot/2026-11-25/).

## What I Would Tell You

Do not trust a speed chart to tell you whether a model is useful. Make it build something and keep the receipt. Tell the story with the caveats attached: my GLM timing was contaminated by my own mistake, and my pair numbers are single requests. And check what your software does with memory before you blame the model. One flag took strix1 from 26 GiB of swap to none.

## Sources

- [llama.cpp on GitHub](https://github.com/ggml-org/llama.cpp), opened 28 November 2026; the inference engine named in the benchmark notes.
- [Capacitor documentation](https://capacitorjs.com/docs), fetched 28 November 2026; the shell used for the iPhone build.
- Project entries for 25 November 2026, linked above, which are the record for every figure here.
