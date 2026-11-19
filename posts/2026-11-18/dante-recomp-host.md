---
project: Dante Recomp Host
title: Dante Recomp Host Compiles and Links Two Programs
summary: A game-conversion experiment finished an 84-step build on the Mac and linked two programs, but nothing has been run yet.
---
An experiment that converts a PlayStation 3 game into code a Mac can build finished compiling on Wednesday night. The build ran to the end without a failure and produced two programs, one for the game and one for its window. I have not launched either, so I cannot say whether anything appears on screen. A clean build proves the pieces fit together and nothing more.

The host folder holds 75 generated source files, 73 of them numbered chunks of translated game code, plus a table of system-call names, an entry file and a stubs file. The log shows 84 steps, finishing at 21:38 with the link of `MyGameRecomp` and then `MyGameRecomp_window`. Compiler warnings are in the log, among them a deprecated memory call and a few format mismatches in the loader, and I did not fix any. The build files and entry file were edited at 17:22 and 20:59.

The conversion toolkit beside it is a separate folder. It shows 318 files stamped Wednesday, but 46 of its docs share the same 16:18 timestamp, which looks like a bulk copy, and it has no version history. Its changelog still tops out at v0.16.0 from October. One note there describes a depth-rounding fix, where a value of exactly 1 was written as zero. I read it and did not check whether it landed today.

A terminal capture from 16:24 shows the disc's main executable is a retail-encrypted file. The toolkit refuses to unwrap it and does not ship keys. I did not use that capture, and I left everything about the game's own files alone.
