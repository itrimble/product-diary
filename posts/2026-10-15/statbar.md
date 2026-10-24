---
project: StatBar
title: StatBar 1.0 Goes on Sale With One Price for All Macs
summary: StatBar went on sale as version 1.0 with one price for unlimited Macs, and it gained a clean-up tool, AI developer views and a lighter memory footprint.
---
StatBar, the Mac menu bar monitor, shipped as version 1.0 and is on sale. One licence covers unlimited Macs, with lifetime updates and support and no subscription. The Buy button and the in-app update check now point to the live store page, and its web site went public the same day. The app also gained a tool that frees up space, a view built for people running AI tools, and a smaller appetite for memory.

The release path is in `statbar`: universal builds, Apple notarisation, and a two-Mac release script (`cfaa9bd`) split into prepare and finish phases because signing in over SSH does not carry to another session. A drag-to-Applications disk image with its own background was added (`93731b6`). Gumroad went live in `4463289`.

New features: a Ports tab, an AI Tools view, stuck-agent detection and a line for the loaded Ollama model (`b244522`, `f8f48f6`). Free Up Space got gradients, a chime and fireworks, and a power-mode switch was added (`0b19bc7`). `919be28` added `StatBar --clean`, a dry run by default, and `scripts/fleet.sh` to clean every Mac from one terminal.

The memory work (`496bf93`) found that RAM drifted upward over time. Monitors are now released when closed, malloc is trimmed and windows are created lazily. The footprint was re-measured and the wording on the site changed to match what was measured, and the guide was regenerated (`4ab4656`).

The site (`statbar-site`) got the same day's changes: real screenshots, the licence wording, the clean-up tool and the live Buy link. The last commit of the day, `ff46ac7`, stopped it mentioning the live header bar where it is not shown.
