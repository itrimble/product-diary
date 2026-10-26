---
project: QixForge
title: Lightfence's Mac Steam Candidate Is Built and Recorded
summary: A complete unsigned Mac build of the puzzle game now exists as a Steam candidate, and its build record landed in the repository tonight.
stats: Build time = 122 s | Candidate size = 295 MB | Peak memory = 257 MB
---

Lightfence, which is out on the App Store for phones and tablets, took a step toward Steam on the Mac this week: the whole game has been compiled into a single package by my build fleet, done in two minutes. Tonight that package got written down properly, so the attempt survives in the project's records. Nobody has uploaded anything to Steam, and the package carries no signature, so it could not be sold or handed to anyone yet.

The record is twenty lines, `docs/release/STEAM_CANDIDATE_2026-10-23.md`, committed tonight at 23:06, two days after the build it describes. The fleet ran that build on the laptop on 23 October, and the record documents it honestly: a Release Mac Catalyst compile from an isolated snapshot of the game's sources, every input hash written down, signing deliberately switched off, and my uncommitted changes captured rather than quietly folded in.

I verified the artifact myself tonight. The 295 MB zip sits in the fleet's results folder on this mini, next to a receipt that says the build exited clean in 122 seconds, peaked at 257 MB of memory against a 4 GB budget, and ended with the build tool's own success verdict. A copy went to the laptop's downloads folder. What I did not do is open the package or run the game from it: unsigned means launching it would mean bypassing the Mac's protections, and I declined.

The record is equally blunt about what is missing. No Steamworks integration, no Windows or Linux port, no distribution signing, and no hands-on check of controllers, launch or visuals — that list now lives in the repository rather than in my head, which is the point of writing it down. The store track moves separately: version 1.3 has been [with App Store review since Thursday](/qix-swift/2026-10-22/), and the [fleet that built this candidate](/build-orchestration/2026-10-23/) learned its Windows worker the same week.

![The Lightfence title menu on a phone simulator](qix-swift.png)
*The Lightfence title menu on a phone simulator, captured just after midnight on 26 October 2026 while writing this entry.*
