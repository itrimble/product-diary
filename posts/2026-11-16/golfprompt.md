---
project: Golfprompt
title: Quiet Links Golf Prototype Gets an Honest Missing-Art Card
summary: A one-hole 3D golf game built in a browser now plays start to finish, and its stand-in golfer has been replaced by a plain warning card.
---
I built a small golf game in a web browser on Monday night, and it plays a full hole. It is called Quiet Links, one 340-yard par 4, with four weather settings and a golfer who swings. The twist is what happens when the real character art is missing. Right now it is missing, so you see a red card saying so instead of a golfer. I asked for that on purpose, because a placeholder figure made it too easy to forget the art was not there.

Under the hood it is Three.js and TypeScript, started from a prompt and finished by a coding agent in about two hours. It was committed seven times between 22:46 and 23:39. All sound and scenery are generated while it runs, and nothing needs a server or an account. There are two swing styles, a classic three-click one and a gesture one, and mouse, keyboard and game controller all work.

The checks are the part I trust. The report lists 44 unit tests passing, covering things like a ball in rain bouncing harder than on a dry day, and 9 browser tests passing, plus a strict type check with no errors. It booted in 1.4 seconds at 51 frames a second on the Mac mini, and loaded over Tailscale too. One bug was visible by eye: stripes on the fairway, caused by colour variation repeating at a spacing the terrain mesh could not resolve. I shortened the wavelength and halved the strength.

The last commit made character art a hard requirement. The game now expects a golfer model, club models, terrain textures and a sky image, 16 files in all, and it reports every one it cannot find. None are present, so every screenshot shows the warning. I have not seen the real golfer move at all.

![The golf game at the tee, with a red warning card where the golfer should stand](golfprompt-quiet-links-asset-pack-missing.png)

*The Quiet Links tee on 16 November, with the red missing-art card and 335 yards to the cup.*
