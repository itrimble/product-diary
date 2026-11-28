---
project: AI Models
title: AI Models Site Lists 25 Agent Tasks and Saves Routing Receipts
summary: The benchmarks page in my local AI model catalog now lists the agent tasks I test models on, with a way to keep a record of each run.
---
My catalog of local AI models now shows what I ask the models to do, not only how fast they answer. The benchmarks page lists the agent tasks from my new test bench, such as building a game or a kanban board, and there is now a way to save a receipt of a run. Nothing is public yet, because the site only changes when I push the main branch, and I did not do that on Wednesday.

A receipt keeps the machine, the model names and a fingerprint of the exact prompt used. It drops the model's reply, so the page can show that a run happened without carrying the answer. That keeps a published page small and avoids copying text I have not reviewed. The idea is that I can later point at a result and prove which prompt and which model produced it.

The work was one commit at 14:17 that touched five files and added 489 lines. A new data file, `data/agent-benchmarks.json`, holds 182 lines describing the suite's tasks. A new script, `tools/agent_benchmarks.py`, is 293 lines and builds that data and writes receipts. The page generator and the page itself changed by a few lines each, and the readme explains the workflow.

I did not run the site build after the change, so I cannot say how the new section looks in a browser. The task list is also static. It is read from the test bench by hand, and nothing yet refreshes it when the bench changes. The [AI Benchmark Suite](/aibenchmarksuite/2026-11-25/) is where the tasks themselves live and where the receipts come from.
