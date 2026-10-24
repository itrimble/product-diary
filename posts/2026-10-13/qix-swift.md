---
project: QixForge
title: QixForge Arrives on Apple TV With a Hands-On Tutorial
summary: The game now runs on Apple TV, steered with the box's small remote, and new players get a hands-on tutorial.
---
QixForge came to the television today. It now runs on Apple TV, and you steer with the small remote that comes in the box; every board was turned sideways so the wide screen fills at one size. New players get a first lesson: the game waits while you try each move, and every danger holds still until you have claimed your first piece of ground, so the lesson can no longer be lost before it teaches anything. The monsters and pickups were repainted as sharp, colorful art.

The tvOS target shares its source with the phone build. tvOS gives the remote's touch surface to the system's focus engine, so the game-controller layer never saw swipes or clicks, and input is now read through UIKit in `RemotePresses.swift`. Even then a quick click could begin and end between two frames — presses now hold for one pulse, and the last commit of the night made a click wait until the game's next read, however long that frame takes, because the first launch after an install on the real TV lost the click that starts the tutorial. A UI test drives a stage through the remote's own route and passed twice on the hardware. Every TV stage is full width at one scale (`GameConfig.tvBoard`).

The tutorial replaces tip cards: each step waits for the player to do it, then names the Qix and the target. `QixGame.hazardsHeld` keeps the Qix, Sparx, fuse and corrupted border still and harmless until the first claim; the change came from a fresh save losing three tutorial runs in seven seconds. The repaint is a new pipeline in `Tools/Art`: `build.py` repaints each sprite at 1024 px with image-to-image generation so the old design holds, keys out the background and writes `Resources/Art`. Thirty-two sprites are done, every enemy, guardian, marker and pickup, at 384 to 512 px instead of about 90.

Yesterday's hundred standalone songs were replaced: each sector's ten songs are now variations on one theme, stage 1 composes it and stages 2 to 10 replay the score building to the guardian. Eight failed takes were retaken. Guardian fights became real boss battles with a health bar and a learnable rhythm of tell, attack, exposed, and five power-ups now arrive one at a time on levels 1, 5, 11, 16 and 21. The morning's pressure pass, a Sparx clock that upgrades them when it runs out and a Qix that steers at your open line, dropped the average bot from 250 to 226 clears of 300; the day ended at 232, with guardian stages up from 17 to 22 of 30.

![The QixForge title screen with its new neon buttons, on a phone simulator](qix-swift.png)
*Lightfence title menu, 14 October.*
