---
project: GoW3 Recomp
title: GoW3 Recomp Writes Its Handover Note Without an App
summary: My PlayStation 3 God of War III conversion still stops after its opening splash screen, so I wrote a handover and chose not to package it.
---
My conversion of God of War III for the Mac still stops after its opening splash screen, and on Friday I wrote a handover note instead of an app. Nothing here can be played yet. The note says so on purpose: I only allow myself to package it once a run reaches visible, playable 3D with a measured frame rate, and it has not.

The note is a gate table. The first gate, a workspace, translated game code and a Mac graphics host, is done. Getting past the Sony splash is marked not done. Graphics correctness, upscaling, input and the app bundle are not started. It records the build steps, five file hashes, and a patch of 1,579 lines across 16 files on top of the toolkit's published code, 14 commits deep.

The host holds 23 chunks of translated game code and 1,239 system-call handlers. It also holds eight translated helper-processor programs. The boot logs reached number 44. In the last one I read, flips 1930 to 2000 arrive about every 167 milliseconds, and the frame check reports 61 presents with none changed. So the game is drawing its splash and nothing else. That is a log reading, not a game I watched.

The stall is the one from [Thursday's entry](/dante-recomp-host-plays-gow3-recomp-hangs/2026-11-19/): a main thread sleeping until a counter reaches zero. I did not find what should count it down tonight. The system firmware library was translated again in three numbered passes during the day. I did not confirm what any of them changed.

The 40 GB disc copy stays off the diary, and I am not publishing frames from this game.
