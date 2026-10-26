---
project: Hermes Fleet
title: Hermes Fleet Loses Its Voice and a Laptop Stays Missing
summary: The house assistant's morning health report failed and its evening spoken summary crashed outright, while the overnight head-count still misses one laptop.
stats: Verified machines = 3 of 5
category: ai-local-models
---

My house assistant had a bad day and said so. Its morning report, the first thing it writes each day, came out marked failed: the machine that runs its language models did not answer. In the evening its other new habit broke too — the recording that reads a long answer aloud refused to materialise, so the day's big deployment report exists on paper but not in sound. Through all of this, the overnight head-count still cannot find one laptop, the second night running.

The 04:01 re-survey regenerated the inventory files, and since the fleet's work is never committed, the diff reaches back to the 23 October baseline. `neo`, the laptop, has gone from verified to a failed name lookup — even its local network address no longer resolves. The dead adgen pair still times out against the same address. Three machines remain verified, `mbp`, `nas` and `omarchy`, though the NAS's free memory has slid from 3.8 GB to 3.3 GB since Friday.

The 08:00 summary is the blunt one: health FAIL, the model server unreachable. That server is where the assistant moved its thinking during Friday's placement correction, and I cannot say from here whether the machine was asleep or the service was down; the summary records the failure, not the cause. The same summary recaps the prior evening's session — a specialist review that found fifteen defects, a blog post published end to end, audio delivered into Telegram with the player duration verified. All of it work the assistant did itself and reported.

The evening failure is the one I can see closest. At 22:20 the assistant produced the written report of tonight's web-interface deployment and drafted the spoken version, and the speech engine died on startup: a numpy import error inside the engine's Python 3.14 environment. The script sits in the deliverables folder without its recording, and the ledger records the attempt as failed. The voice pipeline that [began on the 23rd](/hermes-fleet/2026-10-23/) has now broken on its own plumbing rather than on fidelity, which is at least a new way to fail. I read all of this from the records; I ran none of the checks myself.
