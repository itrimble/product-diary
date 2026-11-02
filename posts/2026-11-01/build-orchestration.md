---
project: Build Fleet
title: Build Fleet Learns to Watch AI Coding Sessions on Every Mac
summary: The Build Fleet now tracks which AI coding tools are running on each computer, and a renamed Mac that quietly refused jobs is fixed.
---
The system that spreads my building work across the house can now see the AI coding assistants running on each computer. It lists them by tool, shows how much memory each session is using, and flags any build that ran outside the fleet. It also fixed a live outage: after I renamed the Mac mini, the fleet refused every job sent to it and parked them as uncertain. The first job after the repair ran clean.

The outage was a naming problem. The mini went from AIMacMini to M4-Mini, the fleet's lookup for its own name fell back to a generic "local", and every claim there was denied. The fix was a new configuration entry plus a new worker release on every host, because workers run from the installed release's own copy of the config. Launches that are refused now fail in seconds with exit code 126 and a message naming the host.

Harness tracking was the day's main work, 23 commits in all. A registry replaced five separate lists, and adapters read Claude Code, Codex, MiniMax Code and Grok sessions, with a fallback to process-only rows when a tool exposes nothing else. Each host reports its sessions, bypassed builds and governance state from hook evidence. The menu bar app groups sessions by harness, and the iPhone client receives a redacted summary. On the MacBook Pro it showed 13 rows with all four adapters healthy, and the bypass ring caught two Android builds that ran outside the fleet.

A review of the whole branch found two real defects. Timestamps were parsed without regard to daylight saving, so they would have been an hour off from March to November, and Codex rows would have disappeared. The bypass count also included builds the guard had already denied. Both are fixed with tests, bringing the suite to 319 tests. The footprint column then explained why the MacBook Pro reached 21 GB of swap that evening: one image-generation child process in another project's session.

Smaller changes: the routing hook no longer parses heredoc text as commands, which had caused false denials. Finished background requests retire their schedulers, and cleanup shrank the MacBook Pro's fleet state from 31 GB to 21 MB. Cached status answers in 0.3 seconds. The iPhone client was parsed but not built tonight, and the menu app screenshot could not be taken.
