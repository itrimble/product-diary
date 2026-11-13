---
project: OS Pi
title: OS Pi Gets a Classic App Installer and Proven YouTube Video
summary: My classic-Mac-style desktop gained an installer for old programs and a larger default memory, and I proved video decoding on the graphics chip.
---
My classic-Mac-style desktop learned to install old programs for me on Thursday. There is a new Install Classic Apps dialog with a catalogue of titles, and it checks each download before it unpacks anything. Programs now start with far more memory by default, and a new Get Info choice lets me override that per program. I also settled a question I had left hanging: YouTube video can be decoded by the Mac's graphics hardware, not by the main processor, at least in the browser I embedded.

The decoder claim needed proof, not a smooth picture. I added an opt-in diagnostic mode to the browser helper, off unless an environment variable is set. It opens Chromium's own media and graphics pages, reads them and writes a log. They reported the platform's video decoder in use for VP9 at 1080p and for an AV1 pre-roll ad, and "hardware accelerated" for decode. That is one A18 Pro Mac, running macOS 27.2. Not shown: playback inside the desktop window, H.264, 4K, audible sound, sync, a ten-minute run, any other Mac. The evidence write-up says no checklist box is ticked.

The rest was the plumbing old software expects. The file layer now speaks the hierarchical file manager over real folders: directory IDs, catalog enumeration, create, move and rename. A printing manager answers for a Mac with no printer. The sixth PowerPC run, a follow-up to the [PowerPC groundwork](/macos9port/2026-11-11/), got further: it found its Textures folder after the file layer learned to describe open files and the application's own resources. The default guest machine is now 256 MB with 32-bit addressing, and 16 MB with 24-bit remains available. Launch order is user override, then a built-in compatibility list, then the classifier.

Retail Quake III now launches local-only, like the demo, and the Quake menu only accepts verified retail or demo data. The big Makefile was split into two config fragments, 471 lines added and 420 removed. Two gate merges landed at 19:07 and 19:39.

Not verified: it was all headless, nothing was watched in a real window, and I did not see the full test suite pass. The doubled-music problem from [last week](/macos9port/2026-11-04/) is still open.
