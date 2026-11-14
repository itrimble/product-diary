---
project: Daily Story
title: Hermes Benchmark Fails 3 of 5 Local Models on Day One
summary: I built a fair test for small coding models on my Mac mini, and three of five routes failed the warm-up. StatBar's weather fixes also reached git.
format: longform
stats: Preflight routes failed = 3 of 5 | Runs per candidate = 3 | Scored benchmark runs = 0 | Entries for the day = 2
---
On Friday I wrote the test that will decide which small coding models running on my own Mac mini are worth trusting, as part of my Hermes project. No model has been scored yet. Most of the day went to learning which ones cannot even start, and three of five routes failed the warm-up. StatBar, my menu bar monitor, also finally saved two weather fixes to its history.

## Hermes: a test that does not grade on the model's word

The question is simple. Can a small model, running locally, build a working app from a plain request, or does it only sound like it can? Sounding like it can is the easy part. Every chatbot does that.

So the kit I wrote is built around one rule: a run counts only if the evidence on disk matches the claim. Each candidate gets the same empty folder, the same request, the same time limit and the same checklist. The request is a Kanban board in the browser. Each candidate gets three runs, in a randomised order written down beforehand. A judge who did not write the code scores it against the checklist. Results are reported as passes out of three with a 95% confidence interval.

Three samples is thin. The write-up says so, and I would rather print a wide interval than a confident ranking I cannot defend. A sealing script also hashes the prompt, the code, the transcript and the test logs, so a finished run cannot be quietly edited afterwards. Full details are in the [Hermes AI entry for the day](/hermesai/2026-11-13/).

## The warm-up that weeded out three routes

Before any scoring, there is a preflight stage that asks a model to write one small file. That is all. It was enough.

| Route | Preflight result |
|---|---|
| MiniMax M3.1 Flash (the cloud baseline) | Failed all five attempts |
| TensorFold 2B | Failed: answered with the command as prose and never ran it |
| TensorFold 4B | Failed: refuses to start at all |
| Qwen 2B on MLX-VLM | Passed, after a fix to the instructions |
| Qwen 4B on MLX-VLM | Passed, after the same fix |

The cloud baseline reached the right server and still failed every attempt. It kept poking around in parent folders and exiting with errors, and it burned 88,734 tokens doing so. I had expected the paid route to be the control that always works. It was the one that embarrassed me first.

TensorFold's 2B model got further once I made its server advertise a real 65,536-token context window. Its startup was fixed. Its behaviour was not: it described the command instead of running it. The 4B model never got that far.

The two Qwen models passed, but only after I told the agent the exact working folder. The first 2B attempt reported success and left no file behind. That is exactly why the harness now checks the disk instead of reading the model's summary.

Speed told a second story. The 2B model streamed about 60 tokens a second, and a separate probe at 63.5 produced code with an undefined variable. Fast and right are different columns, and I will keep them in different columns.

![A bar chart of the diary words published each day from 6 to 12 November, with Sunday 8 November the highest at 3,241 words](diary-words-by-day-nov-6-to-12-chart.png)

*How much I wrote up each day from 6 to 12 November 2026, counted from the diary repository on 13 November 2026. It does not break out Hermes; Saturday is short because only one project had real work. This is the weekly roundup's chart, reused here for context.*

## What I did not verify

I did not run the Python tests tonight. The benchmark has produced no scored run, so there is no ranking to quote, and anyone who tells you which model won is guessing. The preflight numbers above come from the day's entry and the sealed logs it describes, not from a rerun.

The same day also added a durable coding workflow skill and a Telegram progress reporter, both with tests I did not rerun. The local launchers refuse to start below 65% free memory, because the Mini has 16 GB and other jobs share it.

Context for the wider fleet is in [Wednesday's Hermes entry](/hermesai/2026-11-11/) and in the [weekly roundup](/weekly-roundup/2026-11-13/), which records that an audit paused all eleven scheduled agent jobs on 11 November.

## StatBar: the weather line that fixes itself

Late on Friday night, at 11:22 pm, two commits landed in StatBar's history. Together they make the weather menu's status line clickable, and they sign the app so macOS will show the location permission dialog at all.

If your location lookup times out, you click the line and the app asks again. If you refused permission earlier, the same click opens the right page in System Settings. Neither change is in a release yet. They are meant for 1.11.0. The [StatBar entry for the day](/statbar/2026-11-13/) has the details.

I described this work in [Wednesday's StatBar entry](/statbar/2026-11-11/), where I was careful to say I had not run it on screen. The code reached git two days later. I am saying so plainly because the diary's records go by commit date, and I would rather not leave a reader thinking I built it twice.

One detail I liked: the click decides what to do from the recorded outcome of the last location request (timed out, failed, denied or located), not from the words of the message. A town called Suffolk or Coffs Harbour contains the letters "off", and a match on the text would misfire. The signing commit adds a small entitlements file, because a hardened app without the location entitlement never gets the dialog.

Not verified, again: I did not launch the signed build or click the line myself tonight, and I did not run the test script. The working tree was clean afterwards, so nothing else is waiting.

![A bar chart comparing StatBar's old 32.5 GB cleanup promise with the 18.7 GB a default cleanup actually frees](statbar-cleanup-estimate-before-after-chart.png)

*StatBar's Free Up Space estimate before and after the 8 November fix, made on 13 November 2026 from that day's entry. It shows the honesty theme the app has been on this week. It is not a picture of the weather menu, which I did not capture.*

## What I left out

Hisense had only uncommitted edits to an existing write-up of work already covered on 3 November, so I skipped it. grokbot is notes and bot descriptions for my own fleet, which stay private. Pipe Flow changed one handover note and a bookkeeping folder, and omarchy changed only a tool's state database. Those two are noise.

## Missing pictures

I found no screenshot of the benchmark or the weather menu. Neither project had a new image file in git, and I did not run the screenshot script for them. The three pictures in this story are charts from the week's roundup, which I opened and checked before using. They show the week's context, not Friday's work. I would rather say that than pretend they are screenshots of the apps.

![A bar chart of site page views by week, from 21 in the week of 5 October to 35 in the week of 2 November](remnant-sites-page-views-by-week-chart.png)

*Page views across the Remnant sites by week, from the weekly ledger, read on 13 November 2026. Notice how small the numbers are. The blog itself has no analytics, so none of this is readers of this diary.*

## What I would tell you

Do not trust a model that tells you it finished. Check the folder.

If you are choosing a small local model for coding, run a preflight first. Ask it to write one file and check that the file exists. Three of my five routes failed that, including the paid one. Expect the scored results to be less flattering than the marketing for any of them, and treat three runs per model as a sketch, not a verdict.

For StatBar, wait for 1.11.0 and the next time I actually click the line. Until then the claim is that the code is saved, not that it works.

## Sources

- [StatBar's public site](https://statbar.remnantsecurity.com/): I confirmed on 14 November 2026 that it loads. I did not re-read it to check any claim in this story.
- [The Remnant Security blog](https://blog.remnantsecurity.com/): where the day's entries and the weekly roundup are published. Loaded on 14 November 2026.
- Everything else here comes from the day's diary entries, the weekly roundup and my own git history, which are in this repository. I did not check any claim against outside documentation.
