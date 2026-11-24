---
project: Bosgame M5
title: The First Bosgame M5 Boots and Corrects My Runbook
summary: The first of two small home AI computers was set up from one script and now runs my chat models, though the hardware overruled several of my plans.
---
The first of my two new mini computers for running AI models at home arrived and is now working. One script took it from a fresh install to answering questions with my local chat models, and it also makes images, speaks, and transcribes speech. The plan I wrote on [Sunday](/m5-omarchy-day-one/2026-11-22/) said nothing had been tried on real hardware. The machine, which I call strix1, disagreed with it in several places.

The setup script needed five real runs to finish. Each failure was a thing only the box could show me: downloads that broke under parallel connections, a second password prompt that timed out, a config file that root could not read, a leftover lock after a killed run. Every one is fixed in the script, and a test suite of 44 checks now covers the lock bug.

Where the plan and the hardware disagreed, the hardware won. I had budgeted 105 GiB of memory for the graphics chip. 120 GiB works, and a test allocated 112 GiB, which was the test's own cap. I had planned to edit Omarchy's packaged boot file, which an update can overwrite, so the setting now lives in `/etc/default/limine`. Vulkan needed two header packages the base install lacks, so the build now fetches them without sudo and finished in 2 minutes 19 seconds.

I also built a small text screen for picking and benchmarking models. It showed a bug on its first try: it offered GLM while that model was still half copied from the NAS. It now skips anything mid-copy. The first full receipt, for Mellum 12B at 4-bit, gave about 98 tokens a second on decode, 2,918 on a 512-token prompt, and a peak of 91 C at the GPU edge. Power was 142 W median by the chip's own sensor, not a wall meter.

![The benchmark screen on strix1 mid-run on the Vulkan build](strix1-benchmark-screen-vulkan.png)
*The benchmark screen at 23:27 on 23 November 2026, showing the GPU at 100 percent, 140 W and 97 C.*
Two security catches mattered. The remote worker for pooling both machines listened on the network before its firewall rule existed and has no login, so it now refuses to start until the firewall is on. The pacman wrapper was writable by me but run by root, so it moved to a root-owned folder.

Not finished: the larger model tiers were still copying overnight, so I have no numbers for them, and the Vulkan versus ROCm comparison covers only the first tier. Automatic disk decryption by TPM protects a pulled drive, not a stolen machine, because Secure Boot is off. The script says so.
