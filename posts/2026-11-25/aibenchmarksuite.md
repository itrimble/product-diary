---
project: AI Benchmark Suite
title: AI Benchmark Suite Starts Scoring Local Models on Real Tasks
summary: A new test bench now sets 25 build-it tasks for AI models on my two home machines and scores what they produce, resumes stuck runs and keeps receipts.
---
I built a way to find out whether the AI models running on my two home computers can actually do a job, not just talk fast. The AI Benchmark Suite has 25 written tasks, such as making a golf game or a kanban board, and runs a model through one inside a locked-down sandbox. It scores the result and keeps a receipt of what happened. The first commit landed at 13:53 on Wednesday and by evening there were 58, with 61,778 lines added.

Until now I only had speed charts. A model that decodes at 90 tokens a second can still produce nothing useful, and the first results show it. On the Godot golf task, GLM through its cloud service scored 70 of 70 in 59 minutes, though its timing is suspect because I accidentally rebuilt llama.cpp on strix2 for three minutes of that run. Inkling at its stock effort wrote one 23,000-token answer and no files in 24 minutes. Turning its thinking down to minimal got a first file at 7 minutes.

The runner is where most of the day went. It now has named time budgets from 30 minutes to 12 hours and a smart resume. A run that loops, stalls, crashes or overflows its context picks up again, and each resume is written into the receipt. Quota failures are never resumed. Local models get a 40-minute stall threshold. A paused run can continue from its saved folder, and the receipt then says it was not a one-shot. I also added an adapter for the pi coding tool and a web-search option for local models, off by default.

Scoring got guardrails: output, disk use and stray processes are capped for every untrusted run, and one scorer now checks that Godot really starts the simulation, because a Python stand-in scored zero. A live lab page shows each machine's job, a session view and telemetry. A second working copy of the project finished with a free-disk gauge, an artifact viewer and a failure ledger.

The runner has 67 passing tests. I ran a mock end to end in the real sandbox on strix2. Not done: the sandbox image has not been rebuilt with the pi adapter, and the paused Flash Next run still has to be continued. The BIOS power change on strix2 is also still waiting, and its numbers ran at about half power.
