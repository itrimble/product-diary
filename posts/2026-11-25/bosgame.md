---
project: Bosgame M5
title: Bosgame M5 Pair Serves DeepSeek and Strata Stops Swapping
summary: My two small AI computers now run one huge model together over a single cable, and a memory-hungry setting that made one of them swap is fixed.
---
Wednesday was about making my two small AI computers do something neither could do alone, and about stopping one of them from choking on its own memory. The pair now serves a very large DeepSeek model together over one cable, ready 47 seconds after I start it. Separately, an engine called Strata had been grabbing so much memory on the first machine that it began using the disk as overflow. That is fixed, and the model it serves loses no speed.

The two-machine setup is a new script, `strixfold-serve.sh`, wrapped around the StrixFold project's own tools. Upstream's guide assumes Debian, two cables and a fixed set of addresses, and I have one cable and Arch. Every mode ran for real on strix1 and strix2, including a 37-minute input preparation. The first run measured 60.12 tokens a second writing code, 36.73 on prose, and 980.8 reading an 1,818-token prompt. Upstream's pair, with two faster cables, reports 70.7, 41.1 and 1,284. Those are single requests, not the median of five, and I did not check power or fans.

Two things bit me on the way. The default data port fell outside the range the firewall admits on the cable, so the script pins it to 18111. And a long model download was killed by the system's out-of-memory guard because its job landed in the wrong resource group while the lab loaded Strata. CPU jobs now run under the limits upstream expects, and starting or stopping holds the benchmark lab's GPU lock on both boxes.

The Strata fix was a single flag. The first preset used `--expert-cache auto`, which held about 93 GiB of 124 and pushed 26 GiB into swap. With `--resident-experts --expert-cache 24576`, the lowest free memory on an idle strix1 was 47.3 GiB, nothing swapped, and speeds were 114.0 tokens a second on prompt reading and 37.7 generating, against 112.7 and 38.0 before. A smaller cache left less headroom and slower long prompts. Not verified: the lab-side patch for StrixFold is written but was not applied or run.
