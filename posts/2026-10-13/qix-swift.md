---
project: QixForge
title: QixForge Arrives on Apple TV With a Hands-On Tutorial
summary: The game now runs on Apple TV, steered with the box's small remote, and new players get a hands-on tutorial.
---
QixForge reached Apple TV on 13 October. The small remote in the box steers it, and every board was turned on its side so the wide screen is filled at one size. Newcomers get a hands-on lesson in which the game pauses for each move, and every hazard stays still until the first piece of ground is claimed. That stops anyone failing the tutorial before it has taught them anything. The monsters and pickups were repainted in sharp, colorful art.

Getting the remote to work took the most effort. On tvOS the system's focus engine owns the remote's touch surface, so the game-controller code never saw a swipe or click, and input now comes through UIKit. Even so, a fast click could start and end between two frames. Presses are held for one pulse, and the last commit of the day made each click wait for the game's next read, however slow that frame is, since the first launch after an install on the actual TV lost the click that starts the tutorial. A UI test follows the remote's own path through a stage and passed twice on the hardware. Two passes is not many, and I would want more before calling the remote solved. All TV stages run full width at one scale.

The tutorial takes the place of tip cards. Each step waits for the player, then names the Qix and the target. Freezing the hazards came from a fresh save losing three tutorial runs in seven seconds. A new art pipeline repaints every sprite at 1024 px, keeping the old design, strips the background and installs the result. Thirty-two sprites are finished at 384 to 512 px, where before they were about 90.

The 12 October songs gave way to ten variations per sector on a single theme. Eight failed takes were redone. Guardians now fight with health bars, and five power-ups arrive on levels 1, 5, 11, 16 and 21. A pressure pass cut the average bot from 250 to 226 clears of 300, and the day ended at 232, with guardian stages up from 17 to 22 of 30.

![The QixForge title screen with its new neon buttons, on a phone simulator](qix-swift.png)
*Lightfence title menu, 14 October.*
