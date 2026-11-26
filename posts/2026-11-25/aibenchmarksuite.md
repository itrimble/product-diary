---
project: AI Benchmark Suite
title: AI Benchmark Suite Scores Its First Real Golf Game
summary: My new test bench for AI coding agents got 25 tasks, a locked-down sandbox, and a scorer that caught a fake golf game passing as a real one.
category: ai-local-models
---
I started a new project on Wednesday: a bench that gives the same 25 building tasks to AI coding agents running on my own machines and scores what comes back. By the end of the day it could run an agent inside a locked box, stop and restart it when it got stuck, and grade a small golf game one of the models built. The scorer also caught my own fake entry pretending to be that game, which is the kind of mistake a bench exists to catch.

The catalog is 25 Markdown prompts listed in `suite.json`, from a C++ typing tutor to browser games and a Godot golf challenge. The first commit landed at 13:53 and the folder had 58 commits across its branches by 22:18. Each run is one task, one agent harness and one model, inside a podman sandbox on strix2 with no network unless the run asks for search. Scorers refuse symlinked or oversized output, cap disk use, and kill stray processes, because the code being scored is untrusted.

The golf scorer had a hole. Its 70 scripted checks only drove the physics through the task's own run script, so a Python stand-in from my self-tests scored 70 out of 70 even though the task requires Godot. The scorer now re-runs one shot with the Godot binary replaced by an empty file. If results still appear and there is no Godot export, the scripted points drop to zero. The Python stub now scores 0; GLM-5.4's real workspace keeps its 70.

The runner learned named time budgets from 30 minutes to 12 hours and a resume rule: a loop or a 20-minute stall gets the harness killed and restarted, up to three times inside the same budget. Local models get a 40-minute stall threshold. A provider quota stop is final and is never resumed. There is also a web search gateway for local models that holds the search keys on the host, not in the sandbox.

On the browser side, a second branch reworked the lab page: a plain-English mode, a glossary, a leaderboard, and a panel that lists what the machines cannot report, such as fan speed and wall power. No ranked results exist yet. Everything scored so far is a pilot.
