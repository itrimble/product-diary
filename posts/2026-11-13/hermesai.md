---
project: Hermes AI
title: Hermes AI Gets a Fair Test for Small Local Coding Models
summary: I built a repeatable test for which small AI models on my Mac mini can really write a working app, and three of five routes failed the warm-up.
---
I want to know whether a small AI model running on my own Mac mini can build a working app from a plain request, or whether it only sounds like it can. On Friday I wrote the test that will answer that. Every model gets the same empty folder, the same request, the same time limit and the same checklist, and nobody gets graded on what the model says about its own work. No model has been scored yet. Most of the day went to finding out which ones cannot even start: three of the five routes failed the warm-up.

The kit lives in a new benchmark folder and is built around one rule: a run counts only if the evidence on disk matches the claim. The task is a Kanban board in the browser. Each candidate gets three runs in a randomised order written down beforehand, a judge who did not write the code scores it against a checklist, and results are reported as passes out of three with a 95% confidence interval. Three samples is thin, and the write-up says so. A sealing script hashes the prompt, the code, the transcript and the test logs, so a finished run cannot be quietly edited later.

The preflight stage, which only asks a model to write one small file, did the weeding. The cloud baseline, MiniMax M3.1 Flash, reached the right server but failed all five attempts, repeatedly poking around in parent folders and exiting with errors. It used 88,734 tokens doing it. TensorFold's 2B model fixed its startup after I made the server advertise a real 65,536-token window, then answered with the command as prose and never ran it. TensorFold's 4B model refuses to start at all. The 2B and 4B Qwen models on MLX-VLM passed, but only after I told the agent the exact working folder; the first 2B attempt reported success and left no file behind, which is why the harness now checks the disk.

Speed numbers were the other lesson. The 2B model streamed about 60 tokens a second, and a separate probe at 63.5 produced code with an undefined variable. Fast and right are different columns.

The same day also added a durable coding workflow skill and a Telegram progress reporter, with tests. Not verified: I did not run any of the Python tests tonight, and the benchmark itself has produced no scored run, so there is no ranking to quote. The local launchers refuse to start below 65% free memory, because the Mini has 16 GB and other jobs are running.
