---
project: OS Pi
title: OS Pi Classic Game Music Still Plays Each Note Twice
summary: OS Pi ran Monkey Island with steady audio counters all day, but I still hear the opening music doubled, so the sound problem is not fixed.
---
OS Pi is my own classic-Mac-style desktop, and on Wednesday I spent the day trying to get the old Monkey Island adventure to play its music properly. I did not fix it. For about the first 20 seconds in the SCUMM Bar, every note still sounds as if it is played twice, then the music settles down and sounds mostly fine. The numbers say the audio is healthy. My ears say otherwise, and I trust the ears.

The work was 23 commits, nearly all measurement. The runtime now paces itself at the speed of the old 68020 chip, about 16 MHz, instead of tying itself to screen refresh, and audio flows through a small buffer the sound card reads from. After startup the traces show 60 frames a second, about 48,000 audio frames a second, zero underruns and zero clipped samples. Startup is the exception: one run had a 754 millisecond scheduling gap, 7 frames a second and 34,304 frames of silence. Later intervals recovered.

The note log shows 26 note events in the first 20 seconds and no repeated note within 250 milliseconds, so the doubling is not the game sending notes twice. I also stopped a stray second copy of the runtime that had been left running, in case it caused the problem. The doubling stayed. Those are leads, not a cause.

Not verified: I never captured the rendered sound, only counters and my listening. Double-clicking the game from the OS Pi desktop was not shown to work, because the automation tool could not click the Applications folder, and I won't call that a real failure. The sequel's manual-lookup screen is still blocked. The full C test suite passed earlier on this checkout.
