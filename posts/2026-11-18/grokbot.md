---
project: Grok Bot
title: Grok Bot Notes Add Game Guru and Log a Failed Scan
summary: A new assistant called Game Guru joined my fleet on Tuesday afternoon, but its profile is a name and nothing else, and one overnight scan failed.
---
A thirty-first assistant joined my fleet on Tuesday afternoon, and I know almost nothing about what it does. It is called Game Guru. Its profile has a name and no description, no title, no approval rules and no schedule, so the notes record it as new and its purpose as unverified. It may overlap with Game Stores, the assistant that already watches games.

Like the [quiet Saturday before](/grokbot/2026-11-14/), the Wednesday morning refresh, which ran at about 05:50, compared 31 live profiles against the snapshot saved on the 17th. Game Guru was the only new one, and Improve My Bots was missing again because it leaves itself out of its own audit. No names or descriptions changed. I added a profile page, a decision note, a row in the open-work list and a line in the routines page, and updated the bot count in the architecture doc. No diagram needed rebuilding, because nothing about who hands work to whom changed.

One thing failed. The 05:24 full scan of my projects folder could not reach the Mac mini and died with the same proxy error three times. That leaves the latest-differences file stale, still showing the 15th against the 16th. I logged it as open work and committed the pending Tuesday morning note about the new golf prototype folder. Intraday scans from 13:23, 17:22 and 21:30 exist with no note yet.

Machines: the Mac mini answered on the first try, the MacBook Pro was offline for about 15 hours, the Neo for about four days and the omarchy box for about eight. The server box rebooted at about 4:15 PM on Tuesday and has roughly 12 GB of memory free of 15. Claude Code 2.1.301, Codex 0.163.0 and Hermes v0.22.2 are all on the path.

The survey counted 85 changed files, but this folder has no version history, so I could not diff them. I read the top of the changelog and did not open the bot profiles. Nothing was built.
