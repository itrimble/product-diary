---
project: Daily Story
title: Sprout Platformer Playable, OS Pi Installs Classic Apps
summary: Sprout and the Clockwork Orchard became a playable web platformer in one day, while OS Pi gained a classic app installer and proven video decoding.
format: longform
stats: Sprout tests = 21 | Sprout regions playable = 1 of 6 | OS Pi default guest memory = 256 MB
---
On Thursday I got Sprout and the Clockwork Orchard to the point where a stranger could play one whole level in a web browser, start to finish. My classic-Mac-style desktop, OS Pi, also learned to install old programs for me and showed that video can be decoded by the graphics chip. One of those is a finished thing. The other is plumbing.

## Sprout and the Clockwork Orchard: one level, start to finish

The new game is a small 3D platformer. You steer Sprout, a garden caretaker with oversized boots, across the Windmill Meadows. A floating lantern beetle named Pip points the way with light instead of dialogue. The goal is to reach the Sunseed. Everything you see and hear is generated inside the project, so no outside art or audio is involved. I did not audit every asset for that claim today. I am repeating what the project says about itself.

The full record is in the [Sprout entry for the day](/sprout-clockwork-orchard/2026-11-12/). The short version is that by Thursday night there was a level you can finish.

![Sprout stands near a tall windmill with Pip glowing beside them and a goal counter in the corner](sprout-windmill-court-hud.png)

*The windmill court in Windmill Meadows, captured 12 November 2026. Look at the water-drop counter reading 6 of 20 and the pill-shaped prompt telling you to reach the Sunseed.*

It is built with [Three.js](https://threejs.org/), TypeScript and Vite. The physics is custom: boxes only, no physics library. A platformer lives or dies on feel, and this way every number is mine to tune.

What went into the feel:

- Analogue movement relative to the camera.
- A variable-height jump, so a tap hops and a hold soars.
- A short grace window after you leave a ledge, and a jump buffer for the opposite case.
- A double jump and a midair dash.
- A third-person camera that pulls in when a wall would block the view.
- Step-up handling, sub-stepping and moving platforms.

I added the last group because a platformer that sticks to ledges is not a platformer. Sub-stepping matters because a fast dash can otherwise skip clean through a thin wall between two frames.

![Sprout stands on a round pink and gold platform with floating islands and a lantern post nearby](sprout-flower-stair-climb.png)

*The flower stair section, captured 12 November 2026 about twelve seconds into a run according to the on-screen timer. Notice the floating islands in the distance, which are the next jumps.*

## How I know the level can be finished

The test I trust most is an automated bot that completes the level. If a later change makes a gap too wide or a ledge unreachable, the bot fails and I find out before a player does. There are 21 tests in all.

I did not run the full suite again while writing this. The count comes from my own entry for the day, not from a fresh run.

![Sprout runs toward a glowing golden seed under a wooden arch with leafy crowns](sprout-terrace-sunseed-goal.png)

*The terrace with the Sunseed at the end of the level, captured 12 November 2026. The seed glows under the wooden arch, and the timer reads 0:10, which comes from a testing run, not a human best.*

Only one region exists. The other five, which are a hamlet, a works, a marsh, a frozen peak and the machine at the centre of the story, are a plan. If you play it, you are playing a vertical slice, and I would rather say that plainly.

## Sprout on a real controller

Controller support was checked on a physical DualShock 4. The checks covered detection, both sticks, jump height, double jump and rumble. Rumble was confirmed by feel, which is the only honest way to confirm it. The browser side rests on the standard [Gamepad API](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API), so any pad the browser recognises should at least show up. I only tested the one.

![Sprout crouches near a lantern post and an arch with a Gamepad badge in the top right](sprout-gamepad-start-clearing.png)

*The start clearing at full resolution, captured 12 November 2026 in a controller session. The badge in the top right reads GAMEPAD where the earlier shots read KEYBOARD, which is how the game tells you which input it sees.*

I also kept a couple of captures from a laptop run in Chrome in the project folder. I did not use them here.

## OS Pi: an installer for old programs

OS Pi is my classic-Mac-style desktop. Its entry for the day is [here](/macos9port/2026-11-12/), and the earlier groundwork is in the [Monkey Island and PowerPC story](/macos9port/2026-11-11/). Thursday was mostly about the things old software expects from its host.

The headline is a new Install Classic Apps dialog. It has a catalogue of titles and it checks each download before it unpacks anything. Programs now start with far more memory by default, and a new Get Info choice lets me override that per program. The default guest machine is now 256 MB with 32-bit addressing. A 16 MB machine with 24-bit addressing is still available for software that needs it. Launch order is: my override first, then a built-in compatibility list, then the classifier.

Retail Quake III now launches local-only, as the demo does. The Quake menu only accepts verified retail or demo data.

There are no screenshots of this work in today's story. Everything on the OS Pi side ran headless, and the project folders I checked had no captures from the day. I would rather leave the gap than draw one.

## OS Pi: proving the graphics chip decodes video

I had left one question hanging: whether YouTube video in the browser I embedded is decoded by the Mac's graphics hardware or by the main processor. A smooth picture proves nothing, because a fast CPU can fake it.

So I added an opt-in diagnostic mode to the browser helper. It is off unless an environment variable is set. When it is on, it opens Chromium's own media and graphics pages, reads them and writes a log. Here is what the log said:

| Check | Result |
|---|---|
| VP9 at 1080p | Platform video decoder in use |
| AV1 pre-roll ad | Platform video decoder in use |
| Decode status | Hardware accelerated |
| Machine | One A18 Pro Mac, macOS 27.2 |

That is a narrow claim. Playback inside the desktop window was not shown. H.264, 4K, audible sound, audio and video sync, a ten-minute run and any other Mac were also not shown. The evidence write-up ticks no checklist box. I kept it that way on purpose.

## OS Pi: the plumbing old software expects

The file layer now speaks the classic hierarchical file manager over real folders. That covers directory IDs, catalogue enumeration, create, move and rename. A printing manager answers for a Mac with no printer attached, because some programs refuse to run without a reply.

The sixth PowerPC run, a follow-up to that groundwork, got further than before. It found its Textures folder after the file layer learned to describe open files and the application's own resources. It did not finish. I split a large Makefile into two config fragments, which added 471 lines and removed 420. Two gate merges landed at 19:07 and 19:39.

What was not verified: all of it was headless, nothing was watched in a real window, and I did not see the full test suite pass. The doubled-music problem from [last week](/statbar-snapdog-os-pi-build-fleet-sunday/2026-11-08/) is still open.

## What the survey flagged and I left out

Other folders changed too. Pipe Flow had only recovery snapshots and agent state files. Grok Bot had internal fleet notes. The two Hermes projects had generated inventory and skill-sync churn. Tailscale had a 14-line note edit. None of it was product work, so none of it is in the story.

## What I would tell you

If you build a platformer, write the bot that finishes the level before you polish anything else. It is the one test I would not give up.

If you claim hardware decoding, read the decoder's own report. Do not trust how smooth the picture looks.

And be honest about the size of the claim. Sprout is one region of six. OS Pi proved decoding on one machine. Both are real. Neither is finished.

## Sources

- [Three.js](https://threejs.org/), the 3D library Sprout is built on. I opened the home page on 13 November 2026 to confirm it is the project's public site.
- [Gamepad API on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API), the browser interface for controllers. I opened the page on 13 November 2026 and did not read it end to end.
- My own project entries for 12 November: [Sprout and the Clockwork Orchard](/sprout-clockwork-orchard/2026-11-12/) and [OS Pi](/macos9port/2026-11-12/). The screenshots come from the Sprout project's own screenshots folder, dated 12 November 2026.
- I did not open the Chromium media and graphics pages myself. The decoder results come from the log my helper wrote on 12 November 2026.
