---
project: Bos Game M5 Strix Halo
title: Two Bosgame M5s Serve One 748B DeepSeek Model
summary: My two small AI computers now run one model that is too big for either of them, after four failed loads taught me where the memory was going. A home page shows each machine and every model it can serve.
format: longform
category: ai-local-models
stats: Model = 748B parameters, 113 GiB | Generation = 15.0 tokens/s | Load attempts = 4 | Old vs new AMD stack = no measurable difference
---
My two new mini computers now share one AI model that neither could hold alone. One machine does the talking and the other lends it the graphics memory, over a single cable between them. It took four tries, and the three failures were more useful than the success: each one showed a different place where the memory was really going. I also rebuilt the page I use to see both machines at a glance, and found three models on it that had been quietly running with a fraction of their memory for conversation.

## Two boxes, one cable

The second Bosgame M5, strix2, joined strix1 this week. Same box: AMD Ryzen AI Max+ 395, Radeon 8060S graphics (gfx1151), 128 GB of memory shared between the processor and the graphics chip, of which I give the GPU 120 GiB. Both run Omarchy. The plan I wrote before either arrived, [A Runbook for Two Bosgame M5 Mini PCs Before They Arrive](/m5-omarchy-day-one/2026-11-22/), called running both machines as one pool "a day-two project". It was day four.

The mechanism is llama.cpp's RPC mode. One machine runs `ggml-rpc-server`, which exposes its GPU to the network. The other runs `llama-server --rpc` and spreads the model's layers across its own GPU and the remote one, in proportion to free memory. The two boxes talk over a Thunderbolt cable, not the house network. strix2 serves the model; strix1 lends its GPU.

The llama.cpp documentation puts the risk in one line: "Never run the RPC server on an open network or in a sensitive environment!" The server has no password. So the worker refuses to start unless the firewall is active, enabled at boot, drops incoming traffic by default, and already has a rule that admits only the other machine on the cable. More on how that check nearly failed open below.

## The model library learned to read the files

I drive all of this from a small web page on my MacBook, the model library, which talks to both machines over SSH. It existed before today. Today I rebuilt most of it.

![The strix1 machine card in the model library, showing memory bars and the lending status](strix1-lending-gpu-to-strix2.png)
*The strix1 card on the model library page, captured at 13:28 on 25 November while DeepSeek was loaded across both machines. Note the GPU bar at 61 of 120 GiB with no model of its own, and the status line saying it is lending its GPU to strix2.*

Each machine gets a card with real bars for CPU, memory and GPU memory, the chip's package power and the GPU edge temperature. There is no GPU busy percentage, on purpose: on an idle Strix Halo the kernel's `gpu_busy_percent` reads 100, so a number I could show would be a number that lies.

The library itself lists every model each machine can serve. On both machines that is eleven one-box presets and two two-box presets, plus a separate list of four installed files that cannot be served as a chat model, each with the reason. Every running model also shows the engine behind it, taken from the process itself: the real path of the executable, the git commit of its source tree and the ROCm version it was built against. A process called `llama-server` does not tell you whether it is mainline llama.cpp or a fork, so the page reads the path.

![Library rows labelling models as mixture-of-experts or dense, with total and active parameters](model-library-moe-dense-labels.png)
*The first six rows of the model library, captured at 13:28 on 25 November. The green line under each name comes from the model file's own header: total parameters, active parameters per token, and how many experts are used out of how many.*

The labels under each model are read from the model files, not typed in. The page parses the header of each file (only the header, never the weights) and counts the tensors. Mixture-of-experts models get total and active parameters; dense models get one number.

| Model | Type | Total | Active per token | Experts used |
| --- | --- | ---: | ---: | --- |
| Qwen3.8 Flash-Next | MoE | 177B | 6.7B | 10 of 512 |
| DeepSeek V4.1 Flash | MoE | 748B | 16.1B | 6 of 384 |
| GLM-5.3 Flash | MoE | 321B | 17.1B | 8 of 288 |
| Gemma 4 26B | MoE | 25.2B | 3.1B | 8 of 128 |
| Qwen3.8-27B | Dense | 27.3B | 27.3B | |

One judgement call is in that table. "Active" leaves out the embedding tables, because each token reads only one row of them. That matters more than I expected: Flash-Next carries 51.8 billion parameters of per-layer embedding tables and DeepSeek 197 billion. It is also why Gemma shows 3.1B active where Google's own name for it says A4B. Count the 0.7B of embeddings and you get Google's 3.8B. Neither number is wrong; they answer different questions.

## Three models running on a sliver of memory

The page found a bug in my own setup on its first refresh. Three servers on strix1 had been started with 4,096 tokens of context, for a quick test, and left running. Their recipes say 64K to 128K. A coding agent with 4K of context fails in ways that look like the model is bad. It is not; it has forgotten the task.

The library now compares the running context with the recipe, flags any mismatch, and offers a Reload button that restarts the server with its recipe. Presets under 64K are marked "smoke tests only", because the agent runs I am building toward need at least that. GLM-5.3 on one box, at 16K, is the only one so marked.

## Four tries to load DeepSeek

The model is DeepSeek V4.1 Flash in an ISTA GSQ-RCO IQ1_M build: 748 billion parameters, about 113 GiB resident once loaded. It does not fit in one machine's 120 GiB with anything left for the conversation, so it was the obvious test of two boxes.

| Try | What happened | Cause | Fix |
| --- | --- | --- | --- |
| 1 | Killed by the kernel on strix2 | 34 GiB of other models were already loaded | "Clear both and load" unloads every other model on both machines first |
| 2 | Killed by systemd-oomd | More than 100 GB streaming through the page cache pushed memory pressure past oomd's limit | Two-box servers now run in their own slice |
| 3 | Memory filled to 124 GiB, killed again | llama.cpp read the 103 GiB Engram table into memory | `--lazy-mode on` |
| 4 | Loaded in about 110 seconds | | |

The second failure is the one worth knowing about if you run big models on Linux. systemd-oomd watches the slice where user apps live, and on these machines it kills a unit when memory pressure stays above 50 percent for 20 seconds. That is stricter than systemd's own defaults of 60 percent for 30. Loading a 113 GiB model means reading it from disk, and that reading alone creates pressure even when there is enough memory for the result. oomd cannot tell a model loading from a runaway browser tab.

![Terminal output showing the systemd-oomd kill message and the server now running in its own slice with lazy mode on](strix2-oomd-kill-and-lazy-mode.png)
*strix2's own log of the second failure, with the running server's slice and flag underneath, captured at 13:30 on 25 November from the MacBook over SSH. The first line is oomd marking the DeepSeek server for killing at 58.29 percent pressure against a 50 percent limit.*

Two-box servers now start in a slice of their own, `llama-large.slice`, which oomd does not watch. The model's own size still has to fit, and the library still checks free memory before every load.

The third failure was subtler. DeepSeek V4.1 ships a large lookup table, the Engram, that llama.cpp normally leaves on disk and reads on demand. That only happens in lazy mode, and lazy mode only switches itself on when memory mapping is on. The ROCm driver for this integrated GPU reports that it cannot map files, so llama.cpp's automatic load mode turned mapping off, and lazy mode went with it. The whole 103 GiB table was read into memory instead, and the kernel stopped the load at 124 GiB. Asking for lazy mode explicitly fixed it. Memory stayed flat during the load.

![The two-box rows in the model library, with DeepSeek loaded and GLM available](model-library-two-box-deepseek-glm.png)
*The two-box rows of the model library at 13:28 on 25 November. DeepSeek is loaded, served by strix2 with strix1's GPU, and the engine line reads llama.cpp with RPC on ROCm 10.2.0. GLM below has the "Clear both and load" button that came out of the first failure.*

The fourth load put 60.8 GiB on strix1's GPU and 57.3 GiB on strix2's. It answered with its own model name and made a correct tool call when asked to. On a 297-token prompt it read the prompt at 130 tokens a second and wrote at 15.0.

Fifteen tokens a second is slow next to the one-box models. It is also a 748B model on two mini PCs, and it reads faster than I do. That run was on the older ROCm build; after the switch described next, DeepSeek was reloaded on ROCm 10.2 and answered, but I have not measured its speed again.

A test earlier the same morning, which I did not repeat, ran Flash-Next across both GPUs at 23.9 tokens a second and GLM at 15.7. My one-box numbers from earlier in the week were 26.0 and 16.9. Those came from a different tool, so it is a rough comparison, but it points the expected way: splitting a model that already fits on one machine costs a little speed. Two boxes are for models that do not fit.

## ROCm 10.2 against 7.2.4: a tie

AMD released ROCm 10.2.0 on 18 November. Arch, under Omarchy, ships 7.2.4. I made 10.2 the default on both machines from AMD's own TheRock tarball, unpacked per user in my home folder, with no sudo. Arch's `/opt/rocm` stays installed so pacman stays happy. llama.cpp, whisper.cpp and the other engines were rebuilt against it, and the llama.cpp and whisper.cpp builds record which ROCm they used.

Then I measured whether it mattered. Same llama.cpp (b12670), same model files, on strix1, `llama-bench -ngl 99 -p 512 -n 128 -r 3`, tokens per second:

| Model | Prompt, 7.2.4 | Prompt, 10.2 | Writing, 7.2.4 | Writing, 10.2 |
| --- | ---: | ---: | ---: | ---: |
| Qwen3.8-27B Q4_K | 437.0 | 441.8 / 436.8 | 12.6 | 12.6 |
| Gemma 4 26B heretic Q4_K_M | 1857.5 | 1832.7 | 61.3 | 61.4 |

The Qwen 10.2 column has two runs. The Gemma prompt figures each swing by about 25 between repeats, which covers the gap. For llama.cpp on this chip, a newer ROCm made no measurable difference either way.

That does not make the upgrade pointless. StrixFold, the engine meant to run DeepSeek in a different format across both boxes, only builds on 10.x: with 7.2.4 the compiler spilled registers in 14 of its kernels and its own check refused them. whisper.cpp rebuilt on 10.2 transcribes on the GPU.

![Terminal output confirming ROCm 10.2.0 and three engine builds on both machines](rocm-10-2-engines-both-m5s.png)
*The ROCm and engine checks on strix1 and strix2, run from the MacBook at 13:29 on 25 November. Both machines report ROCm 10.2.0 as the active user install, see the gfx1151 GPU, and have Strata, TensorFold and StrixFold built at the same commits.*

## Engines: one out, three built, none run yet

I wanted more than one engine to compare, and the day trimmed the list.

- **Mirai S** is gone from both machines. Its kernels are written for Nvidia only. A processor-only build worked and wrote about half a token a second, which is not a result anyone can use. Its successor, Kintsugi-27B, lists AMD support as in progress.
- **TensorFold** builds natively for this GPU, but it reads only MLX, BF16 and FP32 checkpoints, not the GGUF files I have. On Arch its build also needs to be told where the GPU bitcode lives (`-Dhip-device-lib`).
- **Strata**, which the Strata build of Flash-Next needs, is built and configured. It has not been started; it needs about 93 GiB free and DeepSeek has the memory.
- **StrixFold** is built on both machines and its host tests pass. Its GPU tests are built but not run, for the same reason. Its 211 GB model is downloading at about 22 MB/s, which is what my home connection does, so the whole file takes about two hours and forty minutes.

I also looked at halogen-flash-server, a closed-source container whose authors claim about 100 tokens a second writing on Flash-Next. That is their claim. I have not installed it, because I have not decided whether I accept its licence, so I have no number of my own.

![The library's list of installed files that cannot be served as a chat model, each with a reason](model-library-not-servable.png)
*The "not servable as a chat model" list in the model library, captured at 13:28 on 25 November. The Strata build of Flash-Next sits here until its own engine runs it; the other three are not chat models at all.*

## Making strix2 a peer, not a copy

Most of the afternoon went into making strix2 something the setup scripts produce, rather than something I fixed by hand. The changes are in the setup repository's changelog, and the useful ones are small:

- Sleep, suspend and hibernate are masked on both machines, and linger is on. Model servers are user services; without linger they stop at logout and do not come back after a reboot.
- A new admit step links each new machine with every online one in both directions: keys, pinned host keys and names.
- The firewall rule for the cable is now permanent, so the worker can start without sudo.

That last change is where a background security review earned its keep. The new no-sudo path checked that the firewall rule was listed, and stopped there. A listed rule protects nothing if the firewall is not running. Now the worker also requires the firewall to be active, enabled at boot and denying incoming traffic by default, the same check the model library already made.

One gap is still open. strix2 cannot yet open its encrypted disk by itself, so after a reboot it waits for the passphrase at its own console.

## What I have not verified

- DeepSeek's speed on ROCm 10.2. It loaded and answered; I did not time it.
- The two-box GLM preset at 128K. It is configured and has not been loaded.
- Strata, TensorFold and StrixFold on the GPU. All three are built; none has run a model here.
- halogen-flash-server's speed claim. Not installed.
- Wall power. The power figure on the cards is the chip's own sensor.

## What I would tell you

If a big model dies while loading on Linux and there is free memory, look at systemd-oomd before you look at the model. Reading 100 GB from disk is memory pressure, and oomd acts on pressure, not on what is left. And if a model has a large table meant to stay on disk, check that lazy loading is really on. On this GPU the automatic setting quietly turned it off.

Do not upgrade ROCm for llama.cpp speed on Strix Halo. I could not find any. Upgrade it if something you need will not build without it.

And put a page in front of your machines that reads the truth from the processes and the files. Mine found three servers running at 4K of context on its first refresh, and I had started them.

## Sources

Read on 25 November 2026:

- llama.cpp's [RPC README](https://github.com/ggml-org/llama.cpp/blob/master/tools/rpc/README.md): how `--rpc` spreads layers across machines, and the warning about open networks quoted above. It does not cover lazy mode; that behaviour is from my own load logs on strix2.
- systemd's [oomd.conf manual](https://www.freedesktop.org/software/systemd/man/latest/oomd.conf.html), for the default limits (60 percent for 30 seconds). The 50 percent for 20 seconds is what `systemd-analyze cat-config` printed on strix2.
- AMD's [ROCm 10.2.0 release notes](https://rocm.docs.amd.com/en/docs-10.2.0/about/release-notes.html), for the 18 November date and gfx1151 (Strix Halo) in the support table. I read the first half of that long page.

Earlier on this blog: the runbook from before the machines arrived, [A Runbook for Two Bosgame M5 Mini PCs Before They Arrive](/m5-omarchy-day-one/2026-11-22/), and Tuesday's [first full benchmark round on strix1](/bosgame/2026-11-24/), which is where the one-box numbers above come from.

Not verified: the claims about Kintsugi-27B's AMD support and halogen-flash-server's speed come from their own pages and listings as relayed to me, not from anything I ran.
