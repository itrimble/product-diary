---
project: Bosgame M5
title: Bosgame M5 Gets Remote Desktop and 32 Speed Results
summary: My first mini AI computer can now be controlled from my laptop's screen, and every model on it has a measured speed on two graphics paths.
---
My first small AI computer, the Bosgame M5 I call strix1, can now be driven from my laptop. I added a setup step for remote desktop, and on Tuesday I connected from the MacBook Pro with the Mac's built-in Screen Sharing. It signed in, and the picture looked good. The same day, the machine finished its first full round of speed tests: every model I own that runs on it, measured two ways. The [Monday write-up](/bosgame/2026-11-23/) had only six results.

I had asked for VNC. Research turned up better options already in Omarchy's package repository: wayshare, which speaks Mac Screen Sharing and also Windows-style remote desktop for phones and tablets, and gliff for linking two of these machines. The password never sits on disk, only a verifier. By default it listens on the home network and the Tailscale address, and a setting keeps it to Tailscale only.

The first real install failed halfway. The Windows-style service refused to start with "no frame from compositor within 5 s", because the monitor had gone into power-save and there was nothing to capture. Waking the display fixed it, so the install now wakes the screen first and the check script names that cause. A connection from a Windows or Android client is untested.

The benchmark run covered 8 models on ROCm and Vulkan, short and 8,192-token prompts, three repeats each, median reported. Vulkan decoded faster on the mixture-of-experts models (GLM by 13 percent, Strata by 12), while ROCm was 25 percent faster on Gemma. A Q6_K conversion of the Qwen 27B model took 54 seconds, not the 15 minutes my runbook guessed.

One bug came out of it. The test script picked the wrong file in folders that held a control vector as well as the model, and the Strata run failed before the fix. It also found a stale key on strix1 with a passphrase left over from before the no-passphrase default. I have not changed it; I will decide which way to go. Power numbers come from the chip's own sensor, not a wall meter.
