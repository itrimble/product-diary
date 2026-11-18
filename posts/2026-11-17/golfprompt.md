---
project: Golfprompt
title: Quiet Links Golf Game Gets a Real Golfer and Phone Controls
summary: My browser golf game now has a real golfer who hits the ball, a loading screen, and touch controls that run on a phone instead of crawling.
---
The golf game stopped being a prototype with a warning card on Tuesday. Quiet Links now has a real golfer who stands at the ball, swings a real club and hits it, and it can be played with a thumb on a phone. On Monday the golfer was a red card saying the art was missing. By Tuesday afternoon the game had 17 commits, and the part I trusted least, the swing, finally connected with the ball.

The art arrived first, around 09:30: a golfer, eight swing animations, four clubs, turf and sand textures and a sky image, 16 files in all. It was 70 MB, and the page appeared to hang. Cutting the textures got it to 9.6 MB. That fix had a nasty side effect: the shrinking script reshuffled the model files and the golfer went invisible, because every part of the body read the wrong bytes. The club still showed, so it looked like a character bug. I fixed the script and added tests that fail if it happens again.

Then came the strike. The club swept past the ball, and at impact the golfer was yanked 1.8 m into the turf. There were five causes, among them a club head identified by the wrong end and a shaft measured in the wrong units. The ball now launches from where it sits, and the driver is tuned to carry 249 yards from the tee. Late in the day I fixed the golfer standing with his arms out like a scarecrow: the skin had been bound to a pose the skeleton was never in, and after a swing the last frame of the clip froze the arms straight out.

On a phone the game ran at about 1 frame a second. The terrain alone was 320,000 triangles, and the scene was 655,628 per frame. Phones now get a coarser course and a quality controller that watches frame time. With the processor throttled 4x, a test measured 157,460 triangles and 76 frames a second, and a touch swing still launches the ball. There are aim and swing pads, a loading bar showing real megabytes, and a preview server that survives a reboot. The commit messages report 62 unit tests and 20 browser tests passing after the last change. I did not rerun them tonight. I have not played a full hole on a real iPhone, only an emulated one.

![The game on a phone-sized screen, with the golfer standing after a swing and touch pads at the bottom corners](golfprompt-quiet-links-phone-touch-controls.png)

*Quiet Links in a phone-sized window on 17 November, with the stat panels, club buttons, aim pad and swing pad.*
