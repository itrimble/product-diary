---
project: StatBar
title: StatBar 1.0 Goes on Sale With One Price for All Macs
summary: StatBar went on sale as version 1.0 with one price for unlimited Macs, and it gained a clean-up tool, AI developer views and a lighter memory footprint.
---
Version 1.0 of StatBar went on sale on 15 October, with a price that fits in one line: one purchase covers unlimited Macs, with updates and support for life and no subscription. The Buy button and the in-app update check both point at the live store page now, and the product's web site opened to the public the same day. Underneath the launch the app also got a disk-space cleaner, a view for people who run AI tools, and a lighter appetite for memory.

The part that took real work was getting a signed, notarised download out of two Macs. The release script is split into a prepare phase and a finish phase, because a signing session opened over SSH does not carry into another login session. The result is a universal build in a disk image with its own background and a drag-to-Applications layout. The Gumroad page went live the same day.

New in the app: a Ports tab, and an AI Tools view that detects stuck agents and shows which Ollama model is loaded. Free Up Space gained gradients, a chime and fireworks, which is far more ceremony than clearing caches deserves, and I would keep every bit of it. A power-mode switch was added, `StatBar --clean` does a dry run unless told otherwise, and a fleet script cleans every Mac from a single terminal.

The memory fix began with a plain observation: the longer StatBar ran, the more RAM it held. Closing a window now releases its monitors, the allocator is trimmed, and windows are only created when someone asks for them. After that the footprint was measured again, and the claim on the web site was reworded to match the measurement instead of the hope. The user guide was regenerated to agree.

The site itself carried the same day's work: real screenshots, the licence wording, the cleaner and the live Buy link. The last small fix removed a mention of the live header bar from a place where that bar does not appear.
