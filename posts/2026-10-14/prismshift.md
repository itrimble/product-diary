---
project: Prism Shift
summary: The Apple TV version of the crystal game now starts reliably on the shed television, steers with the remote's touch ring, and runs smoother.
---
Prism Shift's Apple TV version had a day of making the basics work. The game crashed on launch on the television in the shed, and that is fixed; Ian tried it and accepted the start-up and the first minutes of play. The remote now steers with its circular touch surface, the title and pause screens follow a reference design, and the water-themed worlds look more like water. Players can also pick any single level and carry on from it, and the game now has 36 achievements.

The crash was a tvOS 27 start-up problem: the app did not set up its window the way the new system expects (`cd1dc8e`). Gameplay now gives native press events to the game and hands focus to the pause menu (`1518766`, `1576109`). The remote's clickpad is read as a physical click, with swiping as optional movement (`a20517b`). The menu return path from Settings was broken and is fixed (`4379076`).

Smoothness took many small commits. Idle sound effects are kept running instead of being restarted, hard drops no longer stall while the next song is prepared, and songs and materials are readied before a world change instead of during it. The animated board is also excluded from the system's expensive focus search. Sustained keep-awake and Metal profiling evidence is recorded in the notes. Frame-time comparisons between the two TVs are summarised there as well, though I did not re-run them.

The look changed in the two water worlds. Dark Tide got lit rising bubbles, glossy currents, boiling currents and drops that vaporise on recoil, and the calm tide's foam, mist and crest sizes were capped relative to a cell so the effect stays inside the board. Core bursts now release outward with a visible decay, and the Core got more room in its soundtrack mix (`f5e20a2`). Smaller changes: a native fifteen-skin atlas was refreshed, level selection now covers all 62 checkpoints, three real upcoming shapes show on TV, and a Swift 6.3 simulator build was unblocked with explicit closures and types.

Verification is recorded plainly. The signed build was installed on a phone, but launching it from the Mac failed on a transport limit, so the phone was not played tonight. A World Three campaign run passed on the MacBook Pro, with remaining water checks listed as open. Whether the new feel is right is still a question for a person on the couch.

![Prism Shift running in the simulator](prismshift.png)
