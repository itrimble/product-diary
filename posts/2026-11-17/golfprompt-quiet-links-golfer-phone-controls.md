---
project: Daily Story
title: Golfprompt's Quiet Links Gets a Golfer and Phone Controls
summary: My browser golf game Quiet Links got a real golfer, a swing that hits the ball and touch controls on Tuesday, while my assistant fleet's notes stayed quiet.
format: longform
stats: Golfprompt commits = 17 | Art pack size = 70 MB to 9.6 MB | Phone frame rate under 4x throttle = 76 fps
---
Quiet Links, the one-hole golf game I am building in the browser under the name Golfprompt, finally got a golfer on Tuesday. He stands at the ball, swings a club and hits it, and you can play him with a thumb on a phone. On Monday the golfer was a red card saying the art was missing.

The rest of the day was quiet. My fleet of assistant bots had no changes, though the coding tools missing from their server were back. Here is how the golf day went, in order.

## Golfprompt: the art arrives and the page hangs

The art landed around 09:30. It was a golfer, eight swing animations, four clubs, turf and sand textures and a sky image: 16 files, 70 MB in all. The page looked frozen while it loaded, which is the polite way to describe it. Cutting the textures got the pack down to 9.6 MB.

That fix broke something else. The shrinking script reshuffled the model files, so every part of the golfer's body read the wrong bytes and he went invisible. The club still showed up, which made it look like a character bug. I fixed the script and added tests that fail if it happens again. The full record is in the [Golfprompt entry for the day](/golfprompt/2026-11-17/), and the [previous night's story](/snapdog-apple-review-golfprompt-missing-art/2026-11-16/) explains how the game got that far without a golfer.

![The golf game on a desktop browser, with the golfer standing at the tee behind the ball and a row of trees down the fairway](golfprompt-quiet-links-golfer-at-address-desktop.png)

*Quiet Links in a desktop browser, captured at about 11:05 on 17 November from the project's screenshot folder (file timestamp). The golfer is in place and the status panel reads "PBR pack OK". Notice the driver estimate in the top right says about 236 yards, which is the figure before I tuned the club.*

## The swing that missed the ball

Next came the strike, and it was ugly. The club swept past the ball, and at impact the golfer was yanked 1.8 m into the turf. I found five causes. Two I can name: the club head was identified by the wrong end, and the shaft was measured in the wrong units. The ball now launches from where it sits, and the driver is tuned to carry 249 yards from the tee.

| Check | Before | After |
|---|---|---|
| Golfer on screen | Invisible after the texture shrink | Visible, tests guard it |
| Impact | Golfer pulled 1.8 m into the turf | Ball launches from where it sits |
| Driver carry | Estimate on screen about 236 yd | Tuned to 249 yd from the tee |

I should flag one mismatch. The screenshot above shows the 236-yard estimate, and the entry says 249. I read that as the screenshot predating the tuning. I did not check the on-screen number after the final change.

![A wide view down the fairway just after a drive, with the golfer small in the middle of the frame and the shot line running to the horizon](golfprompt-quiet-links-driver-shot-after-impact.png)

*A driver shot just after impact, captured at about 11:03 on 17 November (file timestamp). The stroke counter reads 1 and the distance to the cup has dropped to 308.9 yards, so the ball left the tee.*

Late in the day I fixed the golfer standing with his arms out like a scarecrow. His skin had been bound to a pose the skeleton was never in. After a swing the last frame of the clip froze the arms straight out. The character now returns to the address pose when a one-shot animation finishes.

## Golfprompt on a phone: 1 frame a second to 76

On a phone the game ran at about one frame a second. The terrain alone was 320,000 triangles, and the whole scene was 655,628 per frame. That is a lot of geometry for a pocket device.

Phones now get a coarser course, and a quality controller watches frame time and backs off when it has to. With the processor throttled four times in a browser test, the scene measured 157,460 triangles at 76 frames a second, and a touch swing still launched the ball. There are aim and swing pads, a loading bar that shows real megabytes, and a preview server that survives a reboot.

![The game on a phone-sized screen, with the golfer after a swing and aim and swing pads at the bottom corners](golfprompt-quiet-links-phone-touch-controls.png)

*Quiet Links in a phone-sized window on 17 November, with stat panels, club buttons, an aim pad bottom left and a swing pad bottom right. The golfer's trousers still look speckled up close, so the art is not finished.*

The entry says the last change left 62 unit tests and 20 browser tests passing, according to the commit messages. I did not rerun them tonight. I also have not played a full hole on a real iPhone, only in an emulated window. The throttled number is a stand-in for a phone, not a phone.

## Grok Bot: a quiet day with good news about the server

The notes on my fleet of assistants recorded no changes to any of the 30 bots. The [Grok Bot entry](/grokbot/2026-11-17/) records that the 05:50 refresh found 30 live profiles, the same as the day before. It also records that Claude Code 2.1.301 and Codex 0.163.0 were back on the server's path after the box was rewritten on Sunday. Hermes is still v0.22.2.

I do not know who restored those tools in the second rewrite, and the changelog says so as well. The network page now says the Neo has been offline about three days and the omarchy machine about seven. I only read the top of the changelog. The survey counted 83 changed files, I had no version history to diff them against, and I did not open any bot profile.

## What I would tell you

Shrink assets with a test beside the script. My texture fix made the golfer vanish, and only a test would have caught it before I did.

Measure on the slow device early. One frame a second on a phone was invisible on my desktop all morning.

Say which number is stale. The 236 and 249 yard figures disagree, and the honest answer is that I only checked one of them.

## Sources

- [three.js documentation](https://threejs.org/docs/), the 3D library Quiet Links is built on; I opened the front page on 18 November to confirm the project's dependency is documented there, and did not check version-specific behaviour.
- [Playwright](https://playwright.dev/), the browser test tool the project's configuration points to; I opened the front page only.
- [Golfprompt project entry for 17 November](/golfprompt/2026-11-17/) and [Grok Bot entry](/grokbot/2026-11-17/), the records this story is built from.
