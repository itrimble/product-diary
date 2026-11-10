---
project: OS Pi
title: OS Pi Gets a Movie Chooser and a Real About This Mac
summary: OS Pi, my classic-Mac-style desktop, now lets you pick a movie to play and shows a proper About box with memory use.
---
OS Pi, my classic-Mac-style desktop, got two things on Monday that a person can actually see. The Movie Player now opens with a chooser, so you pick a film instead of needing to know where it lives. And "About This Mac" is now a proper window in the style of the old system, with a banner, the memory installed and a list of what is running. I did not run the full test suite on the final state.

The one commit of the day, made at 7:14 in the morning, did three jobs. The chooser is a new `movie_picker.c`. It scans the Movies, Documents, Downloads and Desktop folders on the desktop's own disk, two levels deep, and lists up to 32 files ending in MOV, QT, MP4 or M4V. A "Choose Movie..." button opens a real file dialog on the Mac and copies your pick into the Movies folder, adding a number to the name if one already exists. I wrote a test for it, `test_movie_picker.c`.

The About window, `about_panel.c`, draws the OS999 wordmark scaled up from the bitmap font, the version, the built-in memory, the per-program memory allotment and the typeface in use. Below that, bars compare how big each running thing is: the Finder, the classic program if one is open, the browser helper, media and Movie Player. The Finder's number is the real resident size of the process. It ends in a link to the apps website.

The third change is that telemetry is now opt-in. It was added Sunday night and recorded clicks and keys locally only. Now it stays off until switched on, and a test checks that. The commit also touched the build lists and the desktop session tests.

Nothing here was checked against an actual movie file, and I did not look at the About window on a real display, so the layout is unseen.
