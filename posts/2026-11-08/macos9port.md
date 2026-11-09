---
project: OS Pi
title: OS Pi Runs Glider PRO Further and Adds Usage Logging
summary: OS Pi, my classic-Mac-style desktop, got two old games further along on Sunday and now keeps a private log of how I use it.
---
OS Pi, my classic-Mac-style desktop, got a long Sunday of work, with 127 commits across its branches. Two old programs got noticeably further. Glider PRO, a paper-plane game, now loads a saved house and lets me click through to quitting its level editor. Castle of Dr. Brain reaches its opening screens. The desktop also gained a private log of clicks and key presses, kept on the machine and sent nowhere. I did not watch the full test suite pass on tonight's final state.

Most of the day was Glider PRO, one missing system call at a time. I fixed a point-arithmetic pair, then dialogs: they now draw through a real window, take clicks on custom items and repaint only when something changed. Pop-up menus work, the Load House list fills in, and New Game on a loaded house is recorded as evidence. Memory size now comes from the program's own size resource, so the out-of-memory alert disappeared. Each fix moved the halt a little further on, and the log of what I ruled out is in the repo.

Castle of Dr. Brain went through the drawing layer: a region engine, text and font calls, a text editing subset and palette animation. Two small bugs mattered. The low-memory clock values were missing, and a volume-info call could read past the block it owned. The second one got a regression test.

The integration branches for the Extensions Manager, Bluetooth control panel and Font Book were merged into the main line. Font Book also gained an opt-in, read-only listing of the Mac's own fonts, off by default. The protected guest heap now covers every partition size, with guard zones around allocations. Neo feedback fixed the browser launch, New Folder, Get Info and terminal history.

The telemetry commit landed at 11:14 pm. It records clicks, keys, commands and state changes locally only. Quake III Arena got an icon and a Shut Down item in the menu. Still untouched is the doubled-music problem from [Wednesday's entry](/macos9port/2026-11-04/). I never ran a real Bluetooth device either.
