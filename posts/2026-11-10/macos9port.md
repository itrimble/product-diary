---
project: OS Pi
title: OS Pi Learns Thirty Screen Sizes and Ships Build 24
summary: OS Pi, my classic-Mac-style desktop, can now change its screen size and flip between wide and tall, and it passed through five numbered builds.
---
OS Pi, my classic-Mac-style desktop, can now change its own screen size. In the Monitors & Display control panel there is a new Desktop Size group. I pick a size, choose wide or tall, and the desktop switches at once and remembers it for next time. It had been stuck at one fixed size until Tuesday. Build 24 carries that, and it was the fifth numbered build I promoted in a single day.

The size is no longer a hard-coded number. It is a runtime value that defaults to 1024 by 768, and a new table holds thirty modes across the 4:3, 16:10 and 16:9 shapes, wide and tall. A separate piece now owns the host window and its frame buffers and follows every change. The side effects took the most care. The menu bar tightens and drops titles on narrow desktops. Dialogs are made to fit. Windows for the browser, the guest programs and the music player are placed again after a switch. A control panel wider than the desktop now pans.

One bug fell out of the test. I ran the display-mode test under AddressSanitizer, and it caught the font renderer reading past the end of a bitmap. Embedded one-bit glyphs were copied as bytes per row when the rows are packed bits, so it read memory it did not own. Six lines fixed it.

Earlier builds that day were smaller. The usage log now stays off until I choose it from the Help menu. The version string includes the build number everywhere, because a fix to the build script had only passed it to test builds. The Movie Player gained its own title, and the bundled browser engine moved to version 156.0.26. Build 23 added a private hidden folder for logs, browser data, Quake files and temp files, a Window menu in the Finder, sample extensions, and a mock keychain so the browser helpers stop asking for the real one.

Not verified: I recorded windowed evidence for Build 24, but I did not watch the full test suite pass on the final state. The doubled-music problem is still open.
