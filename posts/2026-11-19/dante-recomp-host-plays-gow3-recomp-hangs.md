---
project: Daily Story
title: Dante Recomp Host Plays on My Mac as GoW3 Recomp Hangs
summary: A converted PlayStation 3 game reached real gameplay on my Mac while a second, God of War III, drew a splash screen and froze.
format: longform
stats: Dante checkpoint runs = 10 | Dante runs that saved = 0 | GoW3 splash frame rate = 59.68 fps | GoW3 splash length = 12.7 s
---
On Thursday, my Dante Recomp Host experiment finally ran on my Mac: a PlayStation 3 game, translated ahead of time, went from publisher logos to the main menu to a first stretch of play. A second conversion, God of War III, only got as far as a splash screen before freezing. One worked. One did not. Neither is finished.

## Dante Recomp Host gets from logos to gameplay

On Wednesday [I could only say Dante compiled](/dante-recomp-host-links-build-fleet-gitignore-note/2026-11-18/). Thursday was different. By lunchtime the Mac was showing the publisher logos, then the title screen, the main menu and the difficulty choice. By late afternoon it was playing the opening cutscene and the first stretch of gameplay. The [full project entry](/dante-recomp-host/2026-11-19/) has the short version.

Colours were wrong early on. I fixed that at about 12:50. Nothing dramatic about it, but a game with the wrong palette is hard to believe in, so it felt like a milestone.

I kept a screenshot at each stage, 11 in all, taken between 12:09 and 16:40. Here they are, from the first frame through to the opening fight in Acre.

![The first Dante window showing a glowing cross on a dark shroud](dante-recomp-host-first-frame-cross.png)

*The first frame in the ps3recomp window, captured at 12:09 on 19 November 2026, with a glowing cross on a dark shroud.*

![An early misty frame in the Dante window just before the publisher logo](dante-recomp-host-intro-mist.png)

*An early misty frame at 12:13 on 19 November 2026, still in the same window, just as the publisher logo begins to form.*

![The Electronic Arts logo filling the Dante recomp window](dante-recomp-host-ea-logo.png)

*The Electronic Arts logo at 12:14 on 19 November 2026, still with the colours a little off.*

![The Dante recomp window at launch with the same glowing cross](dante-recomp-host-app-window-launch.png)

*The app window at launch, captured at 12:16 on 19 November 2026, again showing the glowing cross before the logos settled.*

![The Visceral Games logo in the Dante window after the colour fix](dante-recomp-host-visceral-games-logo.png)

*The Visceral Games logo at 12:49 on 19 November 2026, after I fixed the early colour error.*

![The Dante's Inferno title screen with Press START under the logo](dante-recomp-host-title-screen.png)

*The title screen at 13:02 on 19 November 2026, with Press START under the logo.*

![The Dante's Inferno main menu with Start Game and other options listed](dante-recomp-host-main-menu.png)

*The main menu at 13:10 on 19 November 2026, with Start Game selected and Trials of St. Lucia marked coming soon.*

![The Dante's Inferno difficulty menu listing Knight, Death, Hell and Inferno](dante-recomp-host-difficulty-menu.png)

*The difficulty menu at 13:45 on 19 November 2026, listing Knight, Death, Hell and Inferno.*

![A black narration card about knights capturing the city of Acre](dante-recomp-host-opening-narration.png)

*A narration card at 15:25 on 19 November 2026, introducing the capture of Acre in the year 1191.*

![An opening cutscene of a bloodied hand over a basin](dante-recomp-host-opening-cutscene.png)

*An opening cutscene still at 16:38 on 19 November 2026, with a bloodied hand over a basin.*

![Gameplay in Acre with a combat tutorial over the opening fight](dante-recomp-host-gameplay-acre.png)

*The first stretch of gameplay in Acre, captured at 16:40 on 19 November 2026, with the combat tutorial on screen.*

### The robot player never finished a level

To test the game without sitting there pressing buttons, I built a robot player. It reads the frames the Mac renders, presses virtual buttons through a pad file, and counts a run as a success only if the game writes a real save file. It works on a copy of the game data, so my own save is never the thing under test.

I ran ten checkpoint runs. Here is how they ended.

| Result | Runs |
|---|---|
| Ended with success = False | 10 |
| Host still alive after the timeout | 7 |
| Host died (checkpoints 6, 7 and 9) | 3 |
| Longest run | about 900 seconds |

One log shows the bot wandering a hallway corner route and ending in a death cutscene at 160 seconds. That is the bot being bad at the game, which is not the same as the port being bad. I cannot tell the two apart yet, and I did not trace the three crashes.

### The plumbing around it

Most of the rest of the day went on tooling. A new quality-of-life folder holds a settings file, diagnostics, input tweaks and a step that precompiles Metal shaders. There is an F3 overlay that shows guest frame rate, host frame rate, average frame time and 1% lows. A benchmark folder and Windows build scripts arrived as well, though I only ran the Mac build.

I want to be plain about the overlay. It is code I read, not numbers I saw. I did not capture a single frame rate on Thursday, so I have no performance claim to make. I also packed snapshots of the sources before and after the benchmark work, plus a copy of the files from before the MetalFX upscaling change, so I can roll back if it goes wrong. The boot logs are mostly the same two threads waiting over and over, which is the kind of noise that hides a real stall.

## GoW3 Recomp draws a splash screen, then hangs

The second project is the one I am less proud of, and the one I understand better. I spent Thursday trying to get God of War III running natively on my Apple silicon Mac using the same translate-the-code-ahead-of-time approach. The [GoW3 Recomp entry](/gow3-recomp/2026-11-19/) has the summary. It now starts, draws the "Sony Computer Entertainment presents" splash at about 60 frames a second for nearly 13 seconds, and then freezes for good.

I did not package it as an app. A splash screen is not a game, and I did not want to end the day holding something that only looks finished.

![The Sony Computer Entertainment presents splash from the God of War III conversion](gow3-recomp-sony-splash-presents.png)

*The Sony Computer Entertainment presents splash, captured at 19:04 on 19 November 2026 from a boot frame. This is as far as the run got before it froze.*

![Terminal output showing the first lines of the God of War III boot, with the title identifier read from the game's own parameter file](gow3-recomp-terminal-boot-first-lines.png)

*The first lines of the boot in a terminal: the runner reads the game's identifier from its own parameter file, then jumps to the entry point. Saved on the evening of 19 November 2026. Only terminal text, no game footage.*

The numbers are from this machine, an M4 Max.

| Measure | Value |
|---|---|
| Splash frame rate | 59.68 flips a second |
| Flips counted | 760 in 12.7 seconds |
| Unresolved system functions | 0 |
| Game archives opened | 15 |
| Graphics pipelines compiled cleanly | more than 20 |
| Translated game code | 23 chunks |
| Translated helper-processor programs | 8 |

The Metal build linked, and I wrote a handover note with the build and run steps. None of this says anything about gameplay speed, because I have no gameplay.

### Two causes for one freeze

The first cause I fixed. The game builds its graphics commands in two buffers and leaves a placeholder at the end of each, which it patches about 77 milliseconds later. My code gave up after 50 milliseconds, skipped 10.8 MB of commands, and lost the frame's completion marker with them. Raising the wait to 1,000 milliseconds let the boot advance from flip 750 to flip 770. Twenty flips. I will take them.

![Terminal log from a boot run in which the game is waiting on a short timer and flips are being counted](gow3-recomp-terminal-guest-deadlock.png)

*A terminal log from the run where the game deadlocks: a short sleep call repeats while the flip counter creeps forward. Saved on the evening of 19 November 2026. One unresolved system function shows in the log.*

The second cause is still open. With the first one fixed, the game's main thread sits in a tiny sleep loop, waiting for a 16-bit counter at one address to reach zero. Something wrote the value 0x030A there, and nothing I have found counts it down. A second placeholder then never gets patched, because that thread is stuck first. I know where it is. I do not know who is supposed to be driving it.

![Terminal log showing queue pushes from the game's helper-processor library, each waking a waiting task](gow3-recomp-terminal-work-reaches-spu.png)

*After the first fix, the log shows the game's work reaching the helper processors, with each queue push waking one waiter. Saved on the evening of 19 November 2026. The text is partly garbled in places because it scrolled quickly.*

One of my notes is worth a line here. The log above is labelled as the point where the work reaches the helper processors, while the open problem is the counter that never drops. Both are true. The first fix moved the boot further. It did not finish the job.

![Terminal list of twelve commits on a branch above the toolkit, from a pad layout change to a queue push implementation](gow3-recomp-terminal-branch-commits.png)

*The branch as it stood that evening: twelve commits on top of the toolkit, from fixes to the processor handling to a keyboard-and-mouse pad layout. Saved on the evening of 19 November 2026.*

### What I did not verify

Two things. First, whether the translated helper programs are correct beyond 128 addresses that fall back to a slower interpreter. Second, whether the freeze is the only thing standing between me and gameplay. I would not bet on it. The disc copy is 40 GB and stays off the diary.

## Grok Bot notes log the server box switching connectors

The quietest story of the day is also the one that will probably save me the most irritation. The [Grok Bot entry](/grokbot/2026-11-19/) records that the server box running my fleet of assistants changed how it reaches my other computers on Wednesday. It used to go through a private-network workaround I had set up by hand, plus a proxy. It now uses the connector built into the assistant platform. The old workaround kept dropping connections.

The retired pieces were switched off on the 18th at about 11:32 AM. The box now appears as a new device, and the two old entries for it and for the MacBook Pro no longer show up. I did not test whether the new setup is steadier, so that is a hope and not a result. The notes also say the switch happened with my okay, which the archivist bot did not hear from me directly. I am telling you that because a log that quietly claims approval is a small lie, and I would rather say so.

The 05:29 scan of my projects folder worked after Wednesday's failure: 266 top-level folders, 133 under version control. Two open-work rows moved to done, the dropped-connection row and the failed-scan row. A preview set of diagrams that is not published still describes the old workaround, and I flagged that it needs a rebuild before it goes anywhere public.

| Fleet status, Thursday morning | Value |
|---|---|
| Profiles | 31 (30 active, 1 retired) |
| MacBook Pro | back after about 1.6 days |
| Neo | offline since the 13th |
| omarchy machine | offline since the 9th, roughly 9.5 days |
| Server box memory | about 2 GiB free of 15 |
| Server box disk | 89 GB free |

That folder has no version history, so I read the changelog and did not diff the other 86 changed files.

## What I left out

Two folders changed and did not make the cut. The Hermes fleet folder has uncommitted changes that are an inventory snapshot stamped 10 November and old deliverable folders. GolfPrompt had 14 downloaded asset files change and no change to the game. The Dante's Interno folder is mostly build-test output and staged helper files, which the Dante entry already covers. If you want my reasoning on a folder, ask. I would rather skip a thing than pad it.

## What I would tell you

If you are chasing a port like this, take the first picture on the first day and keep every one. I had 11 frames of Dante, from the first cross to the fight in Acre, and they are the proof the port actually ran.

Second, do not let a robot declare victory for you, or defeat. Ten runs with no saved game tell me the test is strict. They do not tell me the game is broken.

Third, a splash screen at 59.68 frames a second feels wonderful for about a minute. Then you notice it has frozen. I would rather report the freeze.

## Sources

- [Metal overview on Apple Developer](https://developer.apple.com/metal/), opened on 20 November 2026 for background on the graphics API the Mac build renders through.
- [PlayStation 3 on Wikipedia](https://en.wikipedia.org/wiki/PlayStation_3), opened on 20 November 2026 as background on the console both games were made for.
- [Cell (processor) on Wikipedia](https://en.wikipedia.org/wiki/Cell_(processor)), opened on 20 November 2026 as background on the console's helper processors.

Everything about the two game conversions and the server box comes from my own project entries and notes for 19 November, not from those pages. I tried to open the RPCS3 site, but it blocked my script, so I did not cite it.
