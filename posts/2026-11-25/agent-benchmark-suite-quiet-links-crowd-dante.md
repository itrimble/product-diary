---
project: Daily Story
title: Agent Benchmark Suite Opens as Quiet Links Gets a Crowd
summary: On 25 November I started a bench for AI coding agents, gave my golf game a 452-person gallery, and fixed the ray-traced sun in my Dante's Inferno Mac port.
format: longform
stats: Benchmark tasks = 25 | Benchmark suite commits = 58 | Spectators placed = 452 | Dante runtime tests = 53 of 53
---
Wednesday was the day I started grading the machines instead of just timing them. A new bench gave AI coding agents real building tasks and caught a fake result on its first afternoon. My golf game got a crowd, the Dante's Inferno port got its sun pointed the right way, and the Mac mini that writes this diary went quiet.

At 13:28 the model library page on my MacBook showed strix1 lending its graphics memory to strix2 so the two Bosgame M5s could hold one 748-billion-parameter model between them. That story has its own [long read](/two-m5s-one-deepseek/2026-11-25/). Twenty-five minutes later I made the first commit to a new folder called aibenchmarksuite, and most of the rest of the day went into it.

Later that afternoon the Mac mini stopped answering. My bots check the projects on it several times a day. The 17:15 check saw git calls taking about ten seconds each and never finished. The 21:15 check timed out. So the nightly job that normally writes this entry just after midnight never ran, and this one was written by hand on Thursday morning from the copies of the projects on the MacBook. Anything that lives only on the mini is missing from it.

## AI Benchmark Suite catches a fake golf game

Speed numbers tell me how fast a model talks. They do not tell me whether it can build anything. The [AI Benchmark Suite](/aibenchmarksuite/2026-11-25/) is my attempt at the second question: 25 Markdown prompts, each a small but complete project, given to the same agent harnesses with the same files, on my own hardware. The catalog runs from a C++ typing tutor and a pinball table to browser games, a ComfyUI trailer, and a Godot golf game where the physics is the specification.

Golf was the pilot. The task asks for one par-3 island green, three attempts to finish closest to the pin, wind, a three-click swing and a scriptable headless mode that a hidden scorer can drive. GLM-5.4 built one. Its own report lists 23 in-engine tests and a Python copy of the shot model used to cross-check the Godot one.

![The One-Shot Golf Challenge built by GLM-5.4, showing a shot into the water](glm-one-shot-golf-splash.png)
*GLM-5.4's One-Shot Golf Challenge running in debug on the MacBook, captured at 17:14 on 25 November. The first shot carried 121.8 metres into the water for a penalty; note the shot tracer, the wind panel and the scorecard.*

The scorer then failed in an instructive way. Its 70 scripted checks drove the physics through the task's run script, and that script can call anything. A Python stand-in from my own self-tests scored a perfect 70 even though the task requires Godot. The fix, committed at 18:02, re-runs one input with the Godot binary swapped for an empty file. If results still come out and there is no Godot export in the workspace, the simulation was never running in Godot, and the scripted points go to zero. In the sandbox on strix2 the stub now scores 0 and GLM-5.4's real workspace keeps its 70.

That sandbox is most of what the suite is. Each run is one benchmark, one harness and one model in a podman container with no network, the workspace as the only writable folder and each hidden input mounted alone and read-only. Scorers refuse symlinked or oversized output and kill stray processes. A runner added named budgets from 30 minutes to 12 hours and a resume rule for stuck agents: a loop, a 20-minute stall or a crash gets the harness restarted with a short note, up to three times. Local models get 40 minutes before a stall counts. A quota stop is final.

The lab page grew alongside it. The panel I like best lists what the machines cannot tell me.

![A panel listing metrics the lab does not expose, such as fan speed and wall power](lab-not-exposed-on-these-boxes.png)
*The "Not exposed on these boxes" panel on the lab page, captured at 20:06 on 25 November. Note the last row: the graphics busy figure is hidden because it reads 100 percent on an idle machine.*

My AI model catalog site got a matching [agent benchmarks draft](/aimodels-site/2026-11-25/) on a branch. It saves receipts that keep the machine, the model and a hash of the prompt and drop the reply. No ranked results exist yet. Everything scored so far is a pilot, and one of the pilots was my own fake.

## Bosgame M5 pair picks up three more engines

The morning's two-box model ran on llama.cpp. By evening the [Bosgame M5 entry](/bosgame/2026-11-25/) had presets for three more engines, and the model library could tell them apart.

![The Inference Engines panel of the model library showing five engines across strix1 and strix2](model-library-inference-engines.png)
*The Inference Engines panel in the model library, captured at 21:15 on 25 November. llama.cpp is active on strix1, Strata, StrixFold and TensorFold are built on both machines, and Halogen is installed only on strix2.*

Strata came with a trap. Its automatic expert cache kept 46.84 GiB of experts in pinned memory and then copied them again into the graphics cache, which on these machines is the same memory. Around 93 GiB was held and strix1 started to swap. With a fixed 24,576 MiB cache the same model left at least 47.3 GiB free and decoded at 35.6 to 37.7 tokens a second.

StrixFold got a script that serves DeepSeek V4.1 Flash across both machines. At 19:35 it was ready 47 seconds after start and decoded a code prompt at 60.12 tokens a second. That is a different engine and file format from the morning's llama.cpp run, and one run with power and fans unchecked, so I am not putting the two numbers side by side yet. Halogen serves on strix2 with its own checkpoint and a draft head, and refuses the GGUF I already had.

## Quiet Links fills its gallery

My golf game, the one I build by hand rather than ask a model to, had its biggest visual day. Tuesday's [Quiet Links entry](/golfprompt/2026-11-24/) added reflections and refraction. Wednesday made the course look like a place.

![Quiet Links hole 1 on the MacBook at the high setting, with a gallery of spectators on the left](quiet-links-real-crowd-60fps.png)
*Quiet Links hole 1 at the high setting with ray tracing, captured at 21:41 on 25 November on the MacBook. Note the gallery behind the ropes at left and the 60.0 frames per second in the performance overlay.*

It came in passes, each logged in the project's own diary with a measurement. Mowing stripes 3.5 metres wide now run from the tee toward the cup. The first version was far too strong and got toned down. The tee got two markers, a peg under the ball and a wooden hole sign, which first sat half off the left edge of the screen. Trees and shrubs got soft contact shadows so they stop floating. A sunlit gradient sky replaced the flat colour after the stock three.js sky came out as a blown-out white sheet.

![The first tee of Quiet Links in a phone-sized portrait view with mowing stripes and tee markers](quiet-links-phone-tee-mow-lanes.png)
*The first tee in the 393 by 852 portrait preview, captured at 13:37 on 25 November. Note the mowing stripes, the tee marker at right and the 29 frames per second at the low setting.*

Then the crowd. Six holes got five roped galleries each, 452 spectators in total, and a placement probe confirmed none stand on a fairway, green, tee, bunker or water. They started as capsules and read like chess pawns, so they became copies of the game's scanned golfer, posed four ways and simplified from 30,996 triangles to 2,958. The textures turned to confetti on the first try and needed re-projecting. Two of the ten looks are recoloured caps standing in for hair, because there is no head under the scanned cap. Spectators have no collision yet.

The phone story is less finished. The iOS simulator runtime is missing, the Android emulator drew the 3D world black, and the iPhone build is a web view inside a [Capacitor](https://capacitorjs.com/docs/ios) app, not a native renderer. It did install on my phone with the right icon. None of Wednesday's golf work is committed.

## Dante's Inferno and Butcher Bay on Metal

Two of my console ports moved on the Mac. The bigger day went to the copy of the open-source ps3recomp runtime where my Dante's Inferno integration lives: 11 commits between 09:18 and 16:26, logged in the [Dante Audit Clock entry](/dante-audit-clock/2026-11-25/).

![A hand-drawn Dante's Inferno cutscene running in the DanteRecomp window on the Mac](dante-recomp-cutscene-metal.png)
*A 2D cutscene in the DanteRecomp window on the MacBook, captured at 11:54 on 25 November. Twenty minutes later a commit kept ray-traced shadows off cutscenes and fades like this one.*

The ray-traced sun had been a low-angle light rotated through the game's own camera constants, and in the Gates of Hell level it put the cliff walls fully in shadow. A fixed sun high in the sky brought a 4K capture down to 29.4 percent shadowed. In the afternoon, occlusion queries that always answered "visible" began counting real pixels, though no live title has asked one yet, and two vertex program instructions now follow NVIDIA's published specification. The runtime's tests passed 53 of 53.

[Escape from Butcher Bay](/escape-from-butcher-bay/2026-11-25/) got one large change at 09:38: mouse and keyboard controls, PlayStation, Xbox and keyboard button pictures that switch live, shadows that follow the game's moving lights, and a self-contained app. Its handover notes claim a locked 4K at 60 frames a second, and the morning's benchmark log shows the window presenting 59 to 60. There is no new Butcher Bay capture from Wednesday, so the picture above is Dante's.

## What the night without the Mac mini cost

This morning the MacBook still sees the mini on the private network, active, with a direct path. But every attempt to open a session is cut off before the login greeting, from my bot computer and from the MacBook alike. The mini is on. Its door is not answering.

That matters more than a missed night. Each day of this diary is signed on the mini before it can be published, so a bot holding a GitHub token cannot push a made-up entry. The long read about the two Bosgame M5s has been waiting since Wednesday afternoon for exactly that signature, and so is this post. The signing rule did what it was built to do, even when the blocked publisher was me.

The day itself had a theme. The benchmark scorer gave a fake golf game full marks until I made it check that Godot was really running. The lab page hides a graphics figure that would always read 100 percent. Quiet Links logs each frame rate next to the change that caused it. A number is only as good as the thing that produced it.

## Sources

Read on 26 November 2026:

- The [ps3recomp repository](https://github.com/sp00nznet/ps3recomp), the open-source PlayStation 3 recompilation runtime that my Dante's Inferno work builds on.
- The [NV_vertex_program specification](https://registry.khronos.org/OpenGL/extensions/NV/NV_vertex_program.txt), whose EXP and LOG definitions the vertex program fix follows.
- llama.cpp's [RPC README](https://github.com/ggml-org/llama.cpp/blob/master/tools/rpc/README.md), for how the morning's two-box run spreads one model across two machines.
- Capacitor's [iOS documentation](https://capacitorjs.com/docs/ios), the wrapper used for the Quiet Links iPhone build.

Everything else comes from the projects' own commit messages, logs and diary notes on the MacBook. Not verified: any project that changed only on the Mac mini on 25 November, and the Butcher Bay frame rate, which I took from its notes and log without re-running it.
