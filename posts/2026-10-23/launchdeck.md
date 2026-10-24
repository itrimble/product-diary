---
project: LaunchDeck
title: LaunchDeck Learns All Thirty-Three Apps and Films Godot Too
summary: My marketing pipeline tool now knows all thirty-three of my apps and games as build-and-film recipes, including games made in the Godot engine.
---
I have a tool called LaunchDeck that turns a finished app into a marketing kit: it builds the app, films it in a simulator, picks the most active moments, cuts clips and screenshots, checks store sizes, plans the website update and drafts the release notes. Today it learned every product I own. Thirty-three of them, from SnapDog to Window Switcher Pro, are now recorded as recipes it can run without me pointing it at anything.

Each manifest describes one product: where it lives, which scheme builds it, which scenes to film. New in this batch are the games built in Godot rather than Apple's tools, via `scripts/godot-record.sh`, and scene settings passed through the environment so one recording run can target the title screen, gameplay or settings. A fix in `src/launchdeck/macwin.py` now hands the scene setting to the desktop launch path, which an earlier change had missed.

The roll call includes SnapDog, Lectern, TilePilot, PassCheckBuddy and Window Switcher Pro on the app side; Civic Fortune, Equilibrium, Epochs of Power and YOLK SOULS among the games; Plumber Puzzle twice, once for the Mac build and once for the PC; and, dryly, a manifest for the build fleet itself, so the machinery can film the machinery. The pipeline's stages stay the same, from build and capture through clips, shots, site and store to a final report, so adding a product is now an evening of writing a manifest rather than a week of bespoke scripting.
