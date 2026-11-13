---
project: Sprout and the Clockwork Orchard
title: Sprout and the Clockwork Orchard Is a Playable Platformer
summary: A new original 3D platformer, with one finished level and gamepad support checked on a real controller, now runs in a web browser.
---
I started a small 3D platformer and, by Thursday night, one whole level of it could be played from start to finish in a web browser. You steer Sprout, a garden caretaker in oversized boots, across the Windmill Meadows, with a floating lantern beetle named Pip pointing the way by light. The goal is to reach the Sunseed. Everything you see and hear is made in the project itself, so no outside art or sound is involved.

![The Windmill Meadows level with its goal counter and keyboard prompt](sprout-windmill-court-hud.png)

*The windmill court in Region I on 12 November, with the "6 / 20" collectible counter and the prompt to reach the Sunseed.*

It is built with Three.js and TypeScript, and the physics is custom: boxes only, no physics library. Sprout has analogue movement relative to the camera, a variable-height jump, a short grace window after leaving a ledge, a jump buffer, a double jump and a midair dash. The third-person camera pulls in when a wall would block the view. I added step-up handling, sub-stepping and moving platforms, because a platformer that sticks to ledges is not a platformer.

The test I trust most is an automated bot that completes the level. There are 21 tests in all. Controller support was checked on a physical DualShock 4: detection, both sticks, jump height, double jump and rumble, the last confirmed by feel. I did not run the full suite again for this write-up, and only the one region exists. The other five are a plan, not a build.
