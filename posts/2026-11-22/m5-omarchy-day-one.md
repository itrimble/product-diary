---
project: M5 Omarchy Day One
title: A Runbook for Two Bosgame M5 Mini PCs Before They Arrive
summary: I wrote a ready-to-run setup guide for two new small Linux computers that will host my local AI models, before either one has been switched on.
---
Two new mini computers built to run large AI models locally arrive on Monday, and I spent Sunday making sure I will not lose a day to setup. The result is a folder of instructions and scripts that takes the machines from a blank install to a running chat model. Nothing has been tried on the real hardware yet. Every claim in it was checked against my network storage and the model cards, not against a booted machine.

The machines are Bosgame M5s with 128 GB of memory each. The generic Linux recipe on my model-inventory site assumed a different boot loader and package set than the Omarchy system I am installing, so I wrote the exact boot snippet, package lists and a build script for the inference software. There are copy and verify scripts, and eight launch scripts, one per model.

Models are ready: 30 of 30 builds are present, about 3.75 TB, 22 on the network drive and 8 image and video builds on a USB disk. I also staged nine cross-platform extras, about 89 GB, including an embedding model, a speech model and two image generators. One model, Mirai, is built for Nvidia hardware and will not load here, so I picked a 27-billion-parameter substitute at its full 262,000-token context.

Two risks are written down. The big media set and a 277 GB Mac backup share one USB drive that is 88 percent full, with no second copy. Running both machines as one pool is a day-two project; I plan to start with one box.
