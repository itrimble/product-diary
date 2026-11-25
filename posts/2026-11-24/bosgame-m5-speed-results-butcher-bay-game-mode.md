---
project: Daily Story
title: Bosgame M5 Gets Real Speeds, Butcher Bay Gets Game Mode
summary: On 24 November my Bosgame M5 got 32 measured model speeds and remote desktop, and the Mac port of Escape from Butcher Bay switched Game Mode on.
format: longform
stats: Measured speed results = 32 | Models benchmarked = 8 | Unit tests passing = 483 of 483
---
Tuesday was about replacing guesses with numbers. My first Bosgame M5 mini computer finished a full round of speed tests on eight AI models, my model catalog now shows all 32 results, and the Mac port of Escape from Butcher Bay finally got the system to treat it as a game. One thing I wrote did not get tested at all.

## Bosgame M5 Finishes Its First Full Benchmark Round

On Monday the [Bosgame M5 entry](/bosgame/2026-11-23/) had six speed results. By Tuesday night it had 32. I ran every model I own that fits on the machine, which I call strix1, down two different graphics paths (ROCm and Vulkan), with a short prompt and an 8,192-token one, three repeats each. The table reports the median.

The headline is that neither path wins everywhere. Here is what the run showed, as I measured it:

| Model family | Faster path | By how much |
|---|---|---|
| GLM (mixture-of-experts) | Vulkan | 13 percent |
| Strata (mixture-of-experts) | Vulkan | 12 percent |
| Gemma | ROCm | 25 percent |

The [AI models catalog](/aimodels-site/2026-11-24/) now carries the same numbers. Its home page says 26.0 tokens a second on one path and 30.4 on the other for the Flash-Next model, and I confirmed the live page shows those figures this morning. The figures come from one receipt file that records the machine, the software build, file fingerprints for each model and every command I used. Each model's reply speed is measured twice, from an empty conversation and with 8,192 tokens already in it.

That receipt also says what it leaves out. One 27B model needs a chip I do not have. The speech and image models are not language models, so they are not in the table. I did not record room temperature or wall power. Power numbers are what the chip reports about itself, which is a sensor reading and not a meter on the wall.

I marked Monday's receipt as superseded. It used an average where this one uses a median, and it had no figures for a long conversation. I would rather have the page say so than quietly swap the numbers.

![The AI models catalog home page showing measured speeds from the Bosgame M5](aimodels-site.png)
*The AI models catalog home page as captured on 24 November 2026, after the new results went up. Look at the "measured" line near the top, which carries the 26.0 and 30.4 figures.*

## A Remote Desktop That Needed the Screen Awake

I also wanted to drive strix1 from my laptop. I asked for VNC, but the research turned up better options already in Omarchy's package repository. Wayshare speaks Mac Screen Sharing and also a Windows-style remote desktop for phones and tablets. Gliff links two of these machines. The password never sits on disk, only a verifier. By default it listens on the home network and the Tailscale address, and a setting keeps it to Tailscale only.

On Tuesday I connected from the MacBook Pro with the Mac's built-in Screen Sharing. It signed in and the picture looked good.

The first real install did not go that cleanly. The Windows-style service refused to start with the message "no frame from compositor within 5 s". The monitor had gone into power-save, so there was nothing to capture. Waking the display fixed it. The install now wakes the screen first, and the check script names that cause. I have not tried a connection from a Windows or Android client, so I will not claim it works.

Two smaller things came out of the day. My test script picked the wrong file in folders that held a control vector next to the model, and the Strata run failed before I fixed it. A Q6_K conversion of the Qwen 27B model took 54 seconds, not the 15 minutes my runbook guessed. And I found a stale key on strix1 with a passphrase left over from before I switched to no-passphrase keys. I did not change it. That is a decision I still owe myself.

## Escape from Butcher Bay Becomes a Proper Mac Game

The [Butcher Bay entry](/escape-from-butcher-bay/2026-11-24/) covers the other big piece of the day. After Monday's new Metal renderer, I made the port behave like a Mac game. In a normal window it now draws at the sharpness the screen can actually show. In full screen it steps up to 4K. F11, Alt and Enter, or Command and F flip between the two.

The window change is about wasted work. A 4K picture squeezed into a small window made the Mac's window system do far more compositing than the window could display. A 1280 by 720 window now renders at 2560 by 1440, and full screen scales to 3840 by 2160. My notes say that cut compositing load by about 55 percent. A setting forces 4K in a small window when I want it for captures.

Game Mode was the fiddly part. The app already declared itself a game, but macOS did not switch the mode on. The app launched through a shell script that then started the real program, so the system never saw the game as the thing it was launching. I changed the bundle so a double-click starts the native executable directly, and moved the launch options, log redirection and project folder lookup into the program. After that, the system's own status command reported Game Mode on.

I also fixed PlayStation 4 controller traffic over Bluetooth. The rumble signal was being resent when nothing had changed, and the controller spiked the polling thread. Rumble is now deduplicated.

![A prisoner in the Butcher Bay courtyard with barbed wire and a gate behind him](butcher-bay-mac-courtyard-frame.png)
*A frame from the Mac port's courtyard, captured on 23 November 2026, the day before the window and Game Mode changes. Look at the barbed wire and the gate in the distance, which were broken by the floor and depth bugs earlier in the week.*

![The in-game default controller layout screen](butcher-bay-mac-controller-screen.png)
*The game's own default controller screen running on the Mac, captured on 23 November 2026. This is the Monday build, not a capture of the Game Mode change.*

I should be plain about the evidence. Both screenshots are from Monday. The 60 frames per second and zero dropped frames in my notes also come from Monday's captures. For Tuesday I have the Game Mode status line and a 2,000-line capture log, but I did not play a long session in either window mode. The dark characters are still on the list.

## Quiet Links Golf Gets a Pond Worth Looking At

[Quiet Links](/golfprompt/2026-11-24/), my browser golf game, got a better pond after [last week's three-press swing](/golfprompt/2026-11-20/). Trees and sky outside the camera's view now show up in the water's reflection, and the pond bed shifts and darkens with depth. It all sits behind a Ray tracing switch in Settings. The switch is off by default and works on desktop only.

The old pond could only reflect what was already on screen. A second camera, mirrored at the water level, now renders the scene at half resolution, and the water reads that. The screen-space trace still refines a hit and falls back to the mirrored picture on a miss. The water cost, where the browser lets me time it on the graphics chip, was 0.55 ms against 2.31 ms of CPU submission in the final run. A perf link adds a frame-rate readout, and on this Mac it showed 42.0 frames per second on the high tier with ray tracing off.

One bug came from a test that forces a shader failure. When the driver rejected the water shader, cleanup ran in the middle of drawing and crashed the next step. Cleanup now waits a frame. A virtual game controller also changed clubs, aimed and finished a three-click swing in a browser test. It was not a real controller.

![Quiet Links hole one with the Ray tracing setting on](quiet-links-pond-ray-tracing-on.png)
*Hole 1 of Quiet Links in Chromium, captured on 24 November 2026 with Ray tracing set to On. The pond is a thin strip in the middle distance, so the effect is subtle at this camera angle.*

![Quiet Links hole one with the Ray tracing setting off](quiet-links-pond-ray-tracing-off.png)
*The same hole and camera on 24 November 2026 with Ray tracing set to Off, for comparison.*

Honestly, at this camera distance I would not pick the two apart without the button label. The pond only fills the frame when the ball is near it. The water is also still one opaque colour, not truly see-through, and ambient shading is still screen-space, so something off-screen cannot darken what is on screen. I did not test on a real iPhone. The unit suite passed, 483 of 483.

## Dante Audit Host Gains Shadow Settings I Have Not Run

The careful Mac copy of the PlayStation 3 game, [Dante Audit Host](/dante-audit-host/2026-11-24/), gained settings for ray-traced shadows in its graphics menu. You can turn them off, pick hard or soft edges, and choose half or full resolution. Two new rows cycle with the same left and right presses as the sharpening and upscaling rows. Choosing a mode tells the Metal backend which shadow mode to use, and tells the draw engine to suppress the shadows the original game paints itself, so the two do not stack.

This is work in progress, and I need to be blunt about it. The edit sits on disk, uncommitted. I did not build after the edit. I did not run the game with shadows on. I cannot tell you how they look or what they cost. The overlay header still reads "unavailable" for high dynamic range because that renderer is the standard one. I also wrote about 520 lines into the status notes, which is a diary of earlier runs and not new results. Following [Sunday's entry](/dante-audit-host/2026-11-22/), the difficulty screen is still as far as automated tests reach.

## What I Left Out

Two flagged folders got no entry. The grokbot folder changed 88 files of personal bot notes and decisions, which I left out as private. The Dante's Inferno recomp PS3 folder changed only handover and merge notes plus an older benchmark draft, so it was not worth a post.

## What I Would Tell You

Measure it yourself, and write down what you did not measure. The Bosgame numbers are useful because the receipt says what is missing: no wall power, no room temperature, one model that needs a chip I lack.

Do not pick a graphics path by reputation. On this box Vulkan won on two models and ROCm won on a third, by margins of 12 to 25 percent.

If a Mac game needs to be a game, launch the game itself. A shell script in front of it cost me Game Mode until I took it out.

And if you have not run it, say so. The shadows in Dante Audit Host are a good idea on a disk until I build them and look.

## Sources

- [Remnant AI Models catalog home page](https://aimodels.remnantsecurity.com/), opened 25 November 2026. It shows the 26.0 and 30.4 tokens-a-second figures.
- [Remnant AI Models benchmarks page](https://aimodels.remnantsecurity.com/benchmarks.html), opened only to confirm it loads (HTTP 200). I did not recheck each source link on it.
- [Product Diary home page](https://blog.remnantsecurity.com/), opened 25 November 2026, for the day's entries.
- Not opened: any outside documentation for wayshare, gliff or Omarchy. Those details come from my own project notes.
