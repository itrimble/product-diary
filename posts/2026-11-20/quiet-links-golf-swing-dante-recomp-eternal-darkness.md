---
project: Daily Story
title: Quiet Links Golf Gets a Swing as Dante Recomp Speeds Up
summary: On Friday my browser golf game Quiet Links gained a three-press swing and a caddie, while three Mac game conversions each moved a little.
format: longform
stats: Quiet Links unit tests = 204 | Quiet Links browser tests = 39 | Dante first battle = 128.6 s | Eternal Darkness title screen = 60 fps
---
On Friday my browser golf game, Quiet Links, finally got a swing that works like golf: three presses of one key set the start, the power and the accuracy of every shot. It also gained a second course and a caddie. Around it, three game conversions for my Mac each moved a small step, and one of them still cannot get past its opening screen.

Friday was a split day. One project had a lot to show. The others had careful, narrow results, and I will keep them that way here. I did not play the golf game by hand, I did not test the graphics menu on a controller, and I did not see a faster screen change the frame rate. The honest summary is "plausible and measured," not "done."

## Quiet Links gets a three-press swing and a caddie

The headline is the [Golfprompt entry for the day](/golfprompt/2026-11-20/), which follows [the golfer and phone controls from earlier in the week](/golfprompt-quiet-links-golfer-phone-controls/2026-11-17/). You press once to start the backswing, again at a red mark to set the power, and a third time as the marker comes back to the line. Early presses pull the ball. Late ones push it. I like this a lot more than a hold-and-release bar, because the third press is where the skill lives.

![The Quiet Links welcome card above the first tee, explaining the three-step swing with a Play button](golfprompt-quiet-links-welcome-card.png)

*The Quiet Links welcome card on hole 1, captured in Chromium on 20 November 2026. Note the three numbered lines that explain the swing, and that the caddie has already picked a driver for a 335-yard hole.*

The caddie picks the club and the aim. In a test it holed 144 of 144 putts from 24 spots on each of six greens, and it had a clear line to the pin from 93 of 97 places around the greens. That is a bot grading its own homework, so treat it as a regression check and not as proof the game is fun. A full driver carries 227.8 metres, which is 249 yards, and the ball leaves 325 to 338 milliseconds after the third press.

There are now two courses: Quiet Links (par 4, 3, 5) and Dune Ridge (par 4, 3, 4), with a scorecard and personal bests that the game remembers. The old swing clip lifted a leg and bent the arms the wrong way, so the golfer now holds a posed stance and the club follows the hands.

![A bird's-eye view of Dune Ridge hole 2, a short par 3, with a red pin mark on the swing meter](golfprompt-dune-ridge-par-three-overview.png)

*Dune Ridge hole 2 in Chromium on 20 November 2026. The caddie suggests a 9 iron and an 80 percent swing for 136 yards, and the red pin mark on the meter shows where that is.*

### What the numbers say

| Check | Result |
|---|---|
| Unit tests | 204 passed |
| Browser tests | 39 passed (one run showed 38 until I fixed a 0.99 metre timing race) |
| Phone-sized profile, throttled | 40.2 frames a second |
| Art download | 9.6 MB to 13 MB |
| Texture memory | 89 MB to 153 MB |

The last two rows are the cost of the new turf. A test caught the texture jump because the older test never counted ground textures. The phone figure comes from a desktop browser shrunk to phone size with the processor slowed, not from a real phone.

### Where the reports disagree

My house assistant wrote three progress reports on Friday, and the [Hermes Fleet entry](/hermes-fleet/2026-11-20/) is blunt about them. The report written just after midnight calls the backswing still stiff and the club path unconvincing. The golfer in my own screenshots posed fine at the tee, but I have not reconciled that with the report. The 22:09 report counts 212 unit tests where my own run shows 204. They may be different checkouts. I did not chase it. Worse, the main preview link still served an older build, so neither link was a fair test of the new swing. I have not opened either link.

## Dante Recomp Host reaches its first battle 47 seconds sooner

The [Dante Recomp Host entry](/dante-recomp-host/2026-11-20/) is about waiting. My Mac version of a PlayStation 3 game, which [Thursday's story](/dante-recomp-host-plays-gow3-recomp-hangs/2026-11-19/) left playing but unfinished, used to spend nearly three minutes of every test just watching the opening. Running the game's clock at double speed during that stretch brought the first battle forward from 175.5 seconds to 128.6, which is 26.7 percent sooner.

Four times speed gained almost nothing, at 174.7 seconds. The game paces its video from audio, and the silent audio queue still drained in real time. Then the robot player missed the jump tutorial, because its attack timer started at launch and the shorter opening threw its rhythm off. I re-anchored the timer to the first frame it positively recognises as gameplay.

| Run | First battle | Jump tutorial | Death's arena |
|---|---|---|---|
| Baseline | 175.5 s | not recorded | not recorded |
| Corrected | 128.9 s | 242.0 s | 382.9 s |

Two later runs still ended without a save, with the boss at best around 72 percent health. So nothing in this game can be called finished. It also gained a Graphics page as a seventh row in the original Options list: 30, 40 or 60 frames a second, 1x to 3x resolution, two upscalers and two edge smoothers. I changed the resolution from 2x to 3x in the real game and the setting saved. Options that would be dishonest, such as uncapped frame rate, stay greyed out. I have no new picture of it, and I am not publishing frames from a commercial game.

## Eternal Darkness holds 60 in a window

The [Eternal Darkness entry](/eternal-darkness/2026-11-20/) is a modest win. My Mac conversion of the 2002 GameCube horror game, which [Nintendo published](https://en.wikipedia.org/wiki/Eternal_Darkness), ran in a window on my MacBook Pro and sat at 60 frames a second on the title screen at 19:45. It read 58 on the Nintendo logo and dipped to between 48 and 51 during the opening movie. I did not time a fight or a corridor walk, so I would not call it a lock.

I also added an option called Variable for screens whose refresh rate can change. It correctly stayed hidden. All four screens on my desk reported a fixed rate, three at 60 and one at 165, and the laptop panel was missing from the list. So the option is written but untested on the one kind of screen that matters. The disc and texture pack stay on this machine.

## GoW3 Recomp writes a handover instead of an app

The [GoW3 Recomp entry](/gow3-recomp/2026-11-20/) records a deliberate non-release. My God of War III conversion still stops after the Sony splash screen. I wrote a gate table instead: the workspace and translated code are done, getting past the splash is not done, and graphics, upscaling, input and packaging are not started.

![A terminal log where a thirty microsecond sleep repeats while a frame counter creeps from 54 to 55](weekly-roundup-gow3-terminal-deadlock-log.png)

*An excerpt from an earlier boot log that shows the same stall, prepared for the weekly roundup and not newly captured on Friday. The game thread sleeps in tiny steps while the frame counter barely moves.*

The newest log I read shows flips arriving about every 167 milliseconds, and 61 presents with none changed. That is a log reading, not a game I watched. I did not find what should count the sleeping thread down. The firmware library was translated again three times during the day, and I did not confirm what any pass changed.

## Grok Bot notes and a quiet fleet

The [Grok Bot entry](/grokbot/2026-11-20/) is housekeeping. The server box has now spent two days on the built-in network connector with nothing dropping. Two machines are still missing: the Neo, last seen 13 November, and the omarchy box, last seen 9 November. I also created five empty folders by accident, named 3, God, of, Recomp and War, from an unquoted folder name with spaces. I did not clean them up.

## What I would tell you

Read the test count first and the caddie's perfect putting second. A bot that holes 144 of 144 putts tells you the geometry is sane. It does not tell you the game is any good, and nobody has played it yet.

Measure the thing you are shortening. Four times speed lost to double speed because audio kept its own clock, and it took the robot player missing a tutorial to show me what else depended on that timing.

And keep the "not verified" list. This week it was a real phone, a variable-rate screen, a controller and a second Mac. Each one is a place where a tidy result could still be wrong.

## Sources

The [weekly roundup](/weekly-roundup/2026-11-20/) covers the same days in one place. I opened both pages below on 21 November 2026. The rest of this story comes from my own project entries, logs and test output.

- [Eternal Darkness: Sanity's Requiem on Wikipedia](https://en.wikipedia.org/wiki/Eternal_Darkness), read for the release year, developer and publisher.
- [Product Diary home page](https://blog.remnantsecurity.com/), read to confirm the weekly roundup that covers the surrounding days.
