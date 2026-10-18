---
project: Omarchy
title: "Could eight used PS5s make a 128 GB local AI machine? I did the homework before spending a dime."
summary: Eight used game consoles add up to 128 GB of fast memory on paper, but locked software and slow network links change the plan, and a cheaper board with the same chip already has people clustering it.
format: longform
stats: Memory per console = 16 GB | Network per console = 1 Gbit | Consoles for 128 GB = 8 | Console firmware that runs Linux = 3.00 to 7.61
---
I keep wondering whether a shelf of used game consoles could replace a three-thousand-dollar computer for running artificial intelligence at home. On paper it adds up fast. Eight consoles, sixteen gigabytes of memory each, and you have 128 gigabytes, which is the size of the machines I would otherwise be pricing. I have not bought or built anything. This is the homework, written down before I spend money, and the short answer is that eight used PS5s is the wrong way to do it, but the idea has a cheaper cousin that people are already clustering.

## The pitch

A PS5 is a surprisingly good computer for this. The base and Slim models have 16 GB of GDDR6 memory with a peak speed of 448 GB/s, an eight-core Zen 2 processor and a graphics chip rated at 10.28 teraflops, per [Digital Foundry](https://www.digitalfoundry.net/articles/digitalfoundry-2020-playstation-5-specs-and-tech-that-deliver-sonys-next-gen-vision) and [Wikipedia](https://en.wikipedia.org/wiki/PlayStation_5). Memory speed is what decides how fast a language model talks, and 448 GB/s is a lot for a box that sells used for a few hundred dollars. Multiply by eight and the memory total matches a Mac Studio or one of the new AMD mini PCs with 128 GB of shared memory.

Those mini PCs are the benchmark. The listings I found today for Ryzen AI Max+ 395 machines ([eBay](https://www.ebay.com/shop/ai-395-max?_nkw=ai+395+max), [Amazon](https://www.amazon.com/GMKtec-Computers-LPDDR5X-8000MHz-EVO-X2/dp/B0F53XL9DP)) ran from about $2,700 to about $4,400, though I did not verify the memory size of each. A used Slim runs somewhere between $180 and $450 depending on the source: [BankMyCell](https://www.bankmycell.com/blog/how-much-is-a-ps5-worth) puts the Slim at $180 to $365, and [Reddit threads](https://www.reddit.com/r/consoles/comments/1p5xk20/how_much_are_yall_finding_used_ps5s_for/) talk about $349 to $450. Eight of them is $1,440 to $3,600, which is not the bargain it looks like once you reach the middle of that range.

## Problem one: Sony's lock

A console does not run Linux. A PS5 only runs it with a jailbreak, and the one that does it, the [ps5-linux loader](https://github.com/ps5-linux/ps5-linux-loader), supports only the Phat and Slim models on firmware versions from 3.00 to 7.61. Its FAQ answers the obvious question with one word: firmware 8.00 and above will not be supported.

![The ps5-linux-loader GitHub page, whose readme says it works on PS5 Phat and Slim consoles running firmware 3.00 to 7.61](ps5-linux-loader.png)

*The loader's own page, captured 2026-10-17: Phat and Slim only, firmware 3.00 to 7.61. Screenshot of github.com/ps5-linux/ps5-linux-loader, credit to its contributors.*

Another jailbreak that reached firmware 13.60 does homebrew and Switch emulation, according to [Tom's Hardware](https://www.tomshardware.com/video-games/playstation/new-ps5-relapse-jailbreak-enables-homebrew-and-switch-emulation-but-is-hamstrung-by-rapidly-changing-firmware-revisions-jailbreak-unlocks-firmware-13-60-but-newer-games-already-demand-firmware-14-00), but that is not Linux. Two more facts make this worse for a shopping trip. The Linux method is a soft mod, so a restart drops the console back to the normal system until you run the exploit again, according to [TechPowerUp's report](https://www.techpowerup.com/forums/threads/linux-now-officially-available-for-playstation-5.348624/). And the only way to put a newer console on a supported version is a downgrade method that the same report says may not always work. You cannot read the firmware off a used listing. Eight consoles means eight rolls of the dice, and I would want to read up on the legal side before breaking the protections on eight machines. I have not.

## Problem two: it is not one 128 GB pool

Eight consoles do not make one big memory. Each has its own 16 GB, shared with the system and the graphics chip. To run a big model across them you use something like llama.cpp's RPC mode, which splits the model into layers and hands each machine a slice. Every word the model produces has to travel through every machine in turn.

The PS5's wired network port is gigabit Ethernet. People who build these clusters keep running into the limit. A [llama.cpp discussion](https://github.com/ggml-org/llama.cpp/discussions/9136) is titled "RPC over Ethernet strangely slow." [One write-up](https://sharedllm.org/blog/llama-cpp-rpc-distributed-inference.html) says a cluster runs at the speed of its slowest hop, not the average. Even a good result would be a fraction of what the same model does on one machine with enough memory.

## The twist: the same chip, sold without the console

While reading the Linux threads I kept seeing the same name. The AMD BC-250 is a bare board, sold as crypto-mining surplus, built around a cut-down version of the PS5 chip. A [TechPowerUp commenter](https://www.techpowerup.com/forums/threads/linux-now-officially-available-for-playstation-5.348624/) described it as essentially the same silicon, a Zen 2 processor and an RDNA 2 graphics part from the same family, with fewer cores and compute units. That is a forum comment, so I would verify it before betting money on it. But there is a real community around the board, and it needs no jailbreak, because it boots ordinary Linux.

![The akandr/bc250 GitHub repository, a setup guide for the BC-250 with Ollama and Vulkan inference](bc250-guide.png)

*The most thorough public guide I found, captured 2026-10-17: akandr/bc250 on GitHub, with benchmark tables measured on a single board. Credit to its author. Link: <https://github.com/akandr/bc250>.*

That guide publishes measurements for one board with 16 GB of shared memory, using llama.cpp with Vulkan. A few of them, as it reports them:

| Model on one BC-250 | 24-compute-unit board | 40-compute-unit board |
|---|---|---|
| gpt-oss-20b, llama.cpp | 66.1 tokens per second | 87.5 |
| Qwen3.6 35B-A3B at a tight 2-bit quantization | 59.6 | 78.0 |
| deepseek-r1 14B | 21.2 | 30.4 |
| Qwen3 8B through Ollama | 31.6 | not listed |
| QwQ 32B at 2-bit | 9.6 | 14.9 |

It also lists the catches: a median draw of 101 watts on the smaller board and 116 on the larger, Ollama running some models 32 to 44 percent slower than llama.cpp itself, a long-context test that fell to 2.3 tokens per second at 64K of context, and a kernel memory setting you must raise or you silently get only 12 GiB.

For comparison, my own box with a Radeon RX 6600 XT is the only hardware here I have measured myself. I ran the same kind of test on it this afternoon.

![A Mac terminal window showing llama-bench output for Qwen3 8B on the Omarchy box: prompt processing 746 tokens per second and generation 45.97 tokens per second](box-llama-bench.png)

*My own baseline, measured 2026-10-17 at 5:04 PM from this Mac over SSH: Qwen3 8B at 4-bit, Vulkan build of llama.cpp, all layers on the card. Prompt processing 746 tokens per second, generation 46.0. Yesterday's run said 47.1, so call it 46 to 47. The box has faulty memory, which affects data integrity but not these timings; the full story is in [my other post from today](/omarchy-ai-node/2026-10-17/).*

The BC-250 guide's Qwen3 8B number, 31.6, comes from Ollama and a different board, so it is a loose comparison and not a ranking.

## Does clustering the boards actually work?

I asked Grok Bot to research it, and its answer was more optimistic than what I had read. It said clustering BC-250s is a known setup, with examples of two boards at about 60 tokens per second on a 35B model, four boards in a mining chassis at about 70, six boards running larger models at 9 to 10, and a fleet tool called llmtune. I checked what I could.

| Grok Bot's claim | What I found |
|---|---|
| People cluster BC-250s over Ethernet with llama.cpp RPC | **True.** A [homelab write-up by Ciro Lucio Tecce](https://ciroluciotecce.it/en/posts/bc250-cluster-inferenza-locale/) (2026-08-04) did it with llama.cpp RPC and Vulkan over gigabit |
| Two boards, 35B model, around 60 tokens per second | **Partly checked.** A [LocalLLaMA post](https://www.reddit.com/r/LocalLLaMA/comments/1wou3gr/my_foray_into_local_ai_two_bc250_ex_mining_apus/) exists about two boards running a Qwen3.6 35B over 1 gigabit Ethernet for about $300 with a power supply. I did not confirm the 60 figure |
| Four boards in an ASRock 4U12G chassis at about 70 | **Not confirmed.** I found a 70 tokens per second post and a [video of a twelve-board build](https://www.youtube.com/watch?v=BRiVjtwkivE) in that chassis, plus a [thread](https://www.reddit.com/r/LocalLLaMA/comments/1tj4unp/amd_bc250_and_the_search_for_cheap_compute/) that only speculates about twelve, but nothing tying them together |
| Six boards at 9 to 10 tokens per second | **Not found** |
| A fleet tool called llmtune | **True, early.** A builder is developing it on the [Level1Techs forum](https://forum.level1techs.com/t/project-ariel-asrock-bc250-arieltune/252262), with network boot |
| Boards cost about $170 to $185 | **Low.** The [eBay listings](https://www.ebay.com/shop/bc-250?_nkw=bc+250) I saw in October were roughly $200 to $350 |
| 150 to 220 watts per board | **Mixed.** The Tecce write-up lists up to 220 watts as the rated maximum, while the guide above measured a median of 101 to 116 watts |

![The top of Ciro Lucio Tecce's write-up, Local Inference on an Asrock BC250 Cluster, with the subtitle 45GB of distributed VRAM across 3 nodes with llama.cpp](bc250-cluster.png)

*The best evidence I found, captured 2026-10-17: [Ciro Lucio Tecce's cluster write-up](https://ciroluciotecce.it/en/posts/bc250-cluster-inferenza-locale/). He bought four boards, one never worked, and ran three over gigabit Ethernet on a budget of about 1,000 euros. Credit to its author.*

Tecce's conclusions matter more than the headline numbers. Splitting the 35B mixture-of-experts model over two boards gave him usable daily performance, mostly because prompt processing stayed quick. A third board added overhead instead of speed. A dense 27B model was disappointing once the context passed about 30,000 tokens, model loading was slow, and his tooling hit out-of-memory errors. So the cluster is real, and it works best as a way to fit a model, not as a way to go faster.

## The options side by side

| Option | Memory | Rough cost | The catch |
|---|---|---|---|
| Eight used PS5s | 8 x 16 GB, minus what the system uses | $1,440 to $3,600 | Firmware lottery, a soft mod that resets on reboot, gigabit links |
| Eight BC-250 boards | 8 x 16 GB | about $1,600 to $2,800 for the boards at the October eBay prices | Bare boards need power, cooling and a network card; Grok Bot's own rough total with all of that is $1,800 to $2,500, which is its estimate and not sourced |
| One 128 GB mini PC | 128 GB in one pool | $2,700 to $4,400 listed | The most expensive, but one machine and no cluster to tune |

Power is where the cluster gets awkward. Eight boards at the guide's measured draw is about 810 to 930 watts, and at the rated maximum it could reach about 1,760 watts. That is my arithmetic, not a measurement.

## What I would actually do

I am not buying eight PS5s. The firmware problem alone makes the shopping list unreliable. If I want to find out whether cheap clustered boards are worth it, the test is small: buy one BC-250, measure it with the models I already run on my own box, then buy a second one with a 2.5 Gbit network card and measure what the split costs. If a single board does what the guide says and two boards behave the way Tecce found, then the question is whether capacity is what I am missing.

Right now it is not. A box with 8 GB of video memory and 64 GB of system memory already runs the 35B mixture-of-experts model slowly, and I have not found anyone showing a clean eight-board result. What would change my mind is one measured case of a split model across four or more boards staying above 20 tokens per second for coding.

## Sources and what I did not check

Everything below was read on 2026-10-17. Prices and listings move daily.

**Console and Linux**
- [Digital Foundry: PS5 specs](https://www.digitalfoundry.net/articles/digitalfoundry-2020-playstation-5-specs-and-tech-that-deliver-sonys-next-gen-vision)
- [Wikipedia: PlayStation 5](https://en.wikipedia.org/wiki/PlayStation_5) for the gigabit Ethernet port
- [ps5-linux loader repository](https://github.com/ps5-linux/ps5-linux-loader) and [TechPowerUp's report](https://www.techpowerup.com/forums/threads/linux-now-officially-available-for-playstation-5.348624/). I did not test any of it.
- [Tom's Hardware on the Relapse jailbreak](https://www.tomshardware.com/video-games/playstation/new-ps5-relapse-jailbreak-enables-homebrew-and-switch-emulation-but-is-hamstrung-by-rapidly-changing-firmware-revisions-jailbreak-unlocks-firmware-13-60-but-newer-games-already-demand-firmware-14-00)

**Prices**
- [BankMyCell](https://www.bankmycell.com/blog/how-much-is-a-ps5-worth), a [Reddit thread](https://www.reddit.com/r/consoles/comments/1p5xk20/how_much_are_yall_finding_used_ps5s_for/) and [eBay PS5 listings](https://www.ebay.com/b/Sony-PlayStation-5-Consoles/139971/bn_7117648159)
- [eBay BC-250 listings](https://www.ebay.com/shop/bc-250?_nkw=bc+250)
- [eBay](https://www.ebay.com/shop/ai-395-max?_nkw=ai+395+max) and [Amazon](https://www.amazon.com/GMKtec-Computers-LPDDR5X-8000MHz-EVO-X2/dp/B0F53XL9DP) listings for Ryzen AI Max+ 395 machines. I did not verify each listing's memory size.

**Clustering**
- [llama.cpp discussion: RPC over Ethernet strangely slow](https://github.com/ggml-org/llama.cpp/discussions/9136)
- [SharedLLM: llama.cpp RPC backend](https://sharedllm.org/blog/llama-cpp-rpc-distributed-inference.html)
- [Ciro Lucio Tecce: Local Inference on an Asrock BC250 Cluster](https://ciroluciotecce.it/en/posts/bc250-cluster-inferenza-locale/)
- [LocalLLaMA: two BC-250 boards running Qwen3.6-35B](https://www.reddit.com/r/LocalLLaMA/comments/1wou3gr/my_foray_into_local_ai_two_bc250_ex_mining_apus/). I read search excerpts, not the full thread.
- [Level1Techs: Project Ariel and LLMtune](https://forum.level1techs.com/t/project-ariel-asrock-bc250-arieltune/252262)
- [Twelve-node 4U12G video](https://www.youtube.com/watch?v=BRiVjtwkivE) and the [Reddit thread that mentions the chassis](https://www.reddit.com/r/LocalLLaMA/comments/1tj4unp/amd_bc250_and_the_search_for_cheap_compute/)

**The BC-250 itself**
- [akandr/bc250 setup guide and benchmarks](https://github.com/akandr/bc250). I did not run any of its numbers.
- [Jesse Stevens, June 2026](https://jessestevens.com.au/2026/06/27/using-a-bc250-crypto-mining-board-as-an-ai-inference-processor-for-local-llms/), saying boards could be had for just over AUD$200

**My own measurement and a related post**
- The benchmark screenshot above is my own run. The memory problem on that machine is in [my other post from today](/omarchy-ai-node/2026-10-17/).
- Grok Bot's research is quoted from its summary and checked only where the table above says so.

I have built nothing and measured nothing on a BC-250 or a PS5. The one measurement in this post is my own box.
