---
project: Dante Audit Host
title: Dante Audit Host Adds Ray-Traced Shadow Settings
summary: The cautious Mac build of the PlayStation 3 game gained menu options for ray-traced shadows, but nothing has been committed or tried in play.
---
The careful Mac copy of the PlayStation 3 game I am converting now has settings for ray-traced shadows in its in-game graphics menu. You can turn them off, or pick hard or soft edges, and choose whether the shadows are computed at half or full resolution. This is work in progress. It sits on disk, uncommitted, and I have not played with it, so I cannot say yet how the shadows look or what they cost.

Two new rows went into the graphics overlay. They cycle through the options with the same left and right presses as the existing sharpening and upscaling rows. Choosing a mode tells the Metal drawing backend which shadow mode to use and which resolution, and it tells the draw engine to suppress the shadows the original game paints itself, so the two do not stack. The settings are saved and loaded with the rest of the graphics config, and they are also set through environment variables on startup.

The window title text changed from the game's name to the project's own short name. I also wrote a lot into the status notes, about 520 added lines. That is a diary of earlier runs, not new results.

What I did not do: I did not build this after the edit, I did not run the game with shadows on, and the overlay header still reads "unavailable" for high dynamic range because that renderer is the standard one. Following [Sunday's entry](/dante-audit-host/2026-11-22/), the difficulty screen is still as far as automated tests reach.
