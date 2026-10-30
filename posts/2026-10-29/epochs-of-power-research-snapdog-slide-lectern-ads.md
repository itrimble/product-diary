---
project: Daily Story
title: Epochs of Power Research Lands as SnapDog Gets a Slide
summary: A paperwork day: my Epochs of Power game research was saved to git, SnapDog got a one-slide story, and Lectern's ads were corrected.
format: longform
---
Epochs of Power, my research toward a touch-first strategy game, got its first real paperwork on Thursday. Nothing playable changed. The written findings about the 2000 game it is modelled on were saved properly for the first time, SnapDog got a one-slide origin story, and my Lectern ad copy was corrected against the store. It was a day of notes, not shipping.

I will say that up front because the temptation with a quiet day is to dress it up. Four of the five entries I wrote for the 29th say some version of "I did not run this". That is the honest shape of the day, so that is the shape of this story.

## Epochs of Power finally has its research under version control

The big item was [Epochs of Power](/civclone/2026-10-29/). Three commits landed in one evening, the first being the initial commit of the whole prototype. Until then the research had been loose in a folder with no history. The second commit added the reverse-engineering notes for Call to Power II: 13 files and 2,217 lines. They cover a source map, a turn trace, an economy study, a combat and diplomacy study and an adaptation plan.

The adaptation plan proposes 90 rounds across four eras so a game could fit into an hour on a phone. It is a design target. Nobody has played it, and the entry says so.

The finding I find most interesting is about repeatability. Two runs of the original game agree for dozens of rounds, then diverge. The notes trace three causes:

| Where it split | Cause |
|---|---|
| Production | A rush purchase of 545 gold buying the last 90 production |
| Movement | A goody-hut reward of 246 gold |
| Round 72 | Two goals tie and the game's own code breaks the tie by memory address |

That last one is the awkward one. If a tie is settled by where something happens to sit in memory, identical games can choose differently. The notes state plainly that this is not yet a full replay.

![A grid of seven small low-poly city and terrain models on a dark background, each labelled with a triangle count](epochs-of-power-mesh-kit-review.png)

*The original mesh kit for Epochs of Power as rendered in an offline review sheet. I captured nothing new today: this image was made on 23 October 2026, six days before this entry, and the sheet's own caption says it is geometry review, not runtime proof.*

The third commit added 1,278 lines of scripts: probes for combat, the map editor, saved games and goal ordering, plus two small files fixing the prompts and seed for an image model. One script downloads the SDXL Turbo checkpoint and refuses to continue unless its SHA256 matches. The model setup had been failing on native import errors, so a check up front is an improvement. I did not run any of it. The app build I tried that night failed with three errors, and the generated-art folders, Meshy pilot files and evidence folder are still untracked. My earlier write-up of the reference build is in the [23 October entry](/civclone/2026-10-23/).

![A grid of ten small low-poly terrain and city improvement models: farms, a mine, roads and a channel](epochs-of-power-terrain-research-kit.png)

*The terrain and city research kit, another offline geometry sheet from 23 October 2026. The caption on the image says it is not integrated into the game or proof that anything runs.*

## SnapDog gets a one-slide story

[SnapDog](/snapdog/2026-10-29/), my Mac app for screenshots and screen recording, did not change. What I added was a single standalone web page of 136 lines: a dark, projector-friendly slide with a five-step timeline from concept to approved. It runs from submitting version 1.0.0 on 12 July, through one question from Apple's reviewers on 13 July about an entitlement, to approval on 17 July. Four counters sit under it: 13 languages, 19 upload destinations, one review round and about 40 hours of hands-on time.

Two caveats, both in the entry. The figures come from the slide and my own earlier notes, and I did not re-check them against the store. The 19 destinations is the same count my [ad research on the 28th](/dead-signal-ad-tracking-snapdog-notes-fixed/2026-10-28/) found the live listing does not fully back. And the slide tells the story of 1.0.0, while the store has since moved to 1.2.1.

I tried the screenshot script on SnapDog for this story. It failed, because the build tripped over an iOS simulator it could not use. So the picture below is not today's app. It is a capture of the app's settings window from my website media folder.

![The SnapDog settings window open on the Capture pane, showing display, window capture, region capture and image format options](snapdog-capture-settings-window.png)

*SnapDog's Capture settings, from the product website's media folder, captured on 29 September 2026. It shows the preview-style choice for region capture and the PNG, JPEG, TIFF and HEIC format switch. It is a month old and was not taken for this entry.*

## Lectern's ads get fixed before they ship

[Lectern](/slideprocessor/2026-10-29/), my app that turns slide decks into lecture notes, did not change either. The work was a 202-line ad brief, and the useful part is a table of corrections to my own notes. The store has version 1.2, released on 18 August, where the README names 1.1. It imports Word, classic PowerPoint, Excel, OpenDocument, RTF, EPUB and CSV on the Mac with no upload, and ships in 12 languages. The README also disagrees with itself on tests, saying 48 in one place and 16 in another, while the registry holds 115.

The rules in the brief are the part worth copying. Every ad says Apple Silicon only and macOS 14 or later. There are no store ratings yet, so no rating claims. A presenter mode turned up in an August audit but is not in the shipped release notes, so it is off limits. I did not check the store page when I wrote the entry. For this story I did load the [Lectern App Store listing](https://apps.apple.com/us/app/lectern-ai/id6761786041) and the [Lectern site](https://lectern.remnantsecurity.com/) and confirmed they respond, but I did not read the version number off either, so the 1.2 claim is still the brief's, not mine.

I also skipped a Lectern screenshot. The only recent-looking capture I had showed a customer's course deck, which my own catalogue says never to publish.

## Hermes Fleet misses the same laptop for a sixth morning

The [Hermes Fleet note](/hermes-fleet/2026-10-29/) is the dull one, and the most worrying. My house assistant's 3 AM head-count reached three of five computers, and its 8 AM report again said `FAIL: ollama unreachable`. The laptop called neo is still a failed name lookup, down from verified on the 23rd. The [fifth miss](/hermes-fleet/2026-10-28/) was the day before.

The number I watch is the NAS's free memory:

| Date | Free memory (MB) |
|---|---|
| 23 October | 3,855 |
| 28 October | 3,423 |
| 29 October | 3,317 of 7,685 |

That is the lowest yet. Two podcast settings added on the 28th are still uncommitted and untested. I read the diff and the summary. I did not log into any machine, so I cannot say whether the laptop is asleep or gone.

## Grok Bot and the folders I left out

The [Grok Bot notes](/grokbot/2026-10-29/) recorded no change to any of the 27 bots, 26 active and one retired, and noted that the Mac mini reconnected after going missing on the evening of the 27th. The MacBook Pro answers. The Neo does not. I did not open any bot profile myself.

Four flagged folders stay out. The books-site folder holds Dead Signal tracking work already covered on the 28th, threat_intel_hunter holds an untracked scaffold, podai-platform changed only one ad draft, and old hermes-fleet preview folders are noise.

## What I would tell you

Write the research down and commit it before you trust it. Epochs of Power spent days as loose files, and one tie broken by memory address would have cost me hours if the notes had been lost.

Check your own README against the store before you write an ad. Mine was wrong about the version and the test count.

A quiet fleet is not a healthy one. Six misses on one laptop and a shrinking NAS are the kind of thing that stays quiet until it is not.

## Sources

- [SnapDog product site](https://snapdog.remnantsecurity.com/), opened 30 October 2026 to confirm it loads. I did not verify the 13 languages or 19 destinations there.
- [Lectern AI site](https://lectern.remnantsecurity.com/), opened 30 October 2026 to confirm it loads.
- [Lectern AI on the App Store](https://apps.apple.com/us/app/lectern-ai/id6761786041), opened 30 October 2026; the page responds, and I did not read the version number from it.
- The day's project entries: [Epochs of Power](/civclone/2026-10-29/), [SnapDog](/snapdog/2026-10-29/), [Lectern](/slideprocessor/2026-10-29/), [Hermes Fleet](/hermes-fleet/2026-10-29/) and [Grok Bot](/grokbot/2026-10-29/).
