---
project: Prism Shift
title: Prism Shift on Apple TV Starts Reliably and Runs Smoother
summary: The Apple TV version of the crystal game now starts reliably on the shed television, steers with the remote's touch ring, and runs smoother.
---
The Apple TV version of Prism Shift used to crash the moment it opened on the television in the shed. It no longer does, and I accepted the start-up and the first stretch of play. That was the headline of a long day of basics: the remote's round touch surface now steers, the title and pause screens follow a reference design, and any single level can be picked and resumed. The game also counts 36 achievements now.

The crash came from tvOS 27. The new system expects an app to set up its window in a particular way, and Prism Shift did not. Around that fix, the game now takes press events straight from the remote and passes focus to the pause menu. Pressing the clickpad is read as a real click, and swipes are there only if you want to move that way. The route back from Settings to the menu was broken, and it works again.

Making it smoother took many small changes rather than one big one. Idle sound effects stay running instead of restarting. Hard drops stopped stalling while the next song loads, and songs and materials are prepared before a world change. The system's focus search is expensive, so the animated board no longer takes part in it. The notes hold evidence from a long keep-awake run and from Metal profiling, plus a summary comparing frame times on the two TVs, which I have not re-run.

The two water worlds changed most. Dark Tide has lit rising bubbles, glossy currents, boiling currents and drops that vaporise as they recoil. The calm tide's foam, mist and crests are capped relative to one cell, so they stay on the board. Core bursts fade visibly as they spread, and the Core has more room in the soundtrack mix. Smaller items: the native atlas of fifteen skins was refreshed, level selection spans all 62 checkpoints, TV shows three genuine upcoming shapes, and explicit types got a Swift 6.3 simulator build compiling again.

Verification has gaps. A signed build was installed on a phone, yet launching it from the Mac failed on a transport limit, so I did not play it there. A World Three campaign run passed on the MacBook Pro, with some water checks still listed as open. Whether it all feels right needs someone on the couch.

![Prism Shift running in the simulator](prismshift.png)
*The Prism Shift menu on a phone simulator, with Continue Campaign greyed out and Play Challenge ready. Screenshot added to the diary on 15 October 2026.*
