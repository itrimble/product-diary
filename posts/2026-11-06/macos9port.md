---
project: OS Pi
title: OS Pi Fixes Half-Speed Cutscenes in Monkey Island
summary: OS Pi was running Monkey Island's cutscenes at about half speed, and I found the cause: timed background chores were being skipped.
---
Monkey Island's cutscenes in OS Pi were running at about half speed, and on Friday I found out why and fixed it. The old adventure game relies on small timed chores, such as drawing the next frame and counting down a pause, and my desktop was quietly skipping most of them. A conversation that should have taken 104 seconds took roughly 220. It now moves at the pace the game intended, and a new test fails if the skipping ever comes back.

The cause was a threshold. Each time the emulated chip ran a slice of work, the code gave the timer and screen-refresh helpers a quarter of that slice. Both helpers refuse to do anything with fewer than 10,000 instructions. Real-time slices are only 1 to 2 milliseconds, or 16,000 to 32,000 cycles, so a quarter was under the line almost every time. I floored that budget at 10,000 in `mac_runtime.c`. I reproduced it without the game too: 16 slices per tick left the screen black for 110 seconds, while 4 slices was fine.

Two follow-ups went in after that. The window presenter now aims for fixed 16.667 millisecond deadlines, because the old pacing added the copy time to a 17 ms wait and landed near 50 frames a second. The worker thread that makes sound also asks for high priority. A fourth real-time run, 190 seconds in the SCUMM Bar, showed zero audio underruns and a median of 60.0 frames a second. Those are presenter timings on this Mac, not input latency.

I also built two probe tools: a headless, repeatable runner that writes the sound to a WAV file, and a driver that plays the real desktop through its bridge. A new `--open` launch flag opens a game at startup without scripted clicks. Sound tracing now counts audio buffers: 2,816 completed in a 130-second Monkey Island 2 run with none starved, so its short silences come from the game.

Not verified: I never listened to the final run, and the doubled-note complaint from [Wednesday's entry](/macos9port/2026-11-04/) is untouched. The last two commits added keyboard scrolling in folders, and the full test suite passed once after the timer fix.
