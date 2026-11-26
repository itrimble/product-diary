---
project: Bosgame M5
title: Bosgame M5 Pair Gets Strata, StrixFold and Halogen Presets
summary: After the morning's shared model, my two mini AI computers spent the evening getting faster ways to serve it and a memory setting that stopped swapping.
---
The [long read](/two-m5s-one-deepseek/2026-11-25/) covers how my two Bosgame M5s ended up running one model together on Wednesday morning. The evening went into the less photogenic part: three more ways to run models on them, a setting that stopped one machine from running out of memory, and a fix so the second machine can be reached by remote desktop with no monitor plugged in.

First the monitor. strix2 refused Screen Sharing viewers when its HDMI cable was unplugged, because there was nothing to share. The setup step now creates a virtual monitor when none is connected, and its check is stricter about what it reports.

The Strata presets had a memory trap. Its automatic expert cache kept all 46.84 GiB of experts in a pinned memory area and then copied them again into the graphics cache, which on these machines is the same memory. About 93 GiB was held, available memory hit zero and strix1 started swapping. With the experts kept resident and the cache set to 24,576 MiB, the same run left at least 47.3 GiB free, read 2,700-token prompts at 409 to 431 tokens a second and decoded at 35.6 to 37.7.

StrixFold got a two-box serve script for DeepSeek V4.1 Flash across both machines. The tested run at 19:35 was ready 47 seconds after start and decoded at 60.12 tokens a second on a code prompt and 36.73 on prose, with a 1,818-token prompt read at 980.8 tokens a second over one Thunderbolt cable. That is a single run, with power and fans unchecked. The patch that would let the model library see StrixFold is written but not applied.

Halogen's 0.20.7 container now serves on strix2, but only with its own checkpoint: it refuses the four-part GGUF I already had. A fleet-login script signs the agent command-line tools in on several machines at once. MiniMax broke when two machines signed in together, so it now goes one machine after the other.
