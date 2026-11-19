---
project: Build Fleet
title: Build Fleet Guide Explains Why Generated Files Go Missing
summary: My build fleet's guide now says why folders of generated files never reach another computer, and how to get them there without cheating.
---
My build fleet had a trap that cost someone time, and its guide now says so plainly. When a build is sent to another computer, files that the project's version control ignores are left behind. If a build needs those files, it fails on the other machine for no obvious reason. There is no switch to bring them along, so the guide now tells you what to do instead.

The edit, made at 17:22 on Wednesday, is one paragraph in the fleet-build skill. The snapshot listing inside a Git work tree is the tracked files plus untracked ones that are not ignored. Outside one it is a filtered walk. A folder of generated sources that is gitignored never makes the snapshot. The advice is to point the project path at a directory outside that work tree and put the generated folder there, and not to add the files to Git just so the snapshot can see them.

That was the only change dated Wednesday, and it is still uncommitted. The survey showed four dirty entries, but the other three, the project instructions file, the watch notes and a Swift build folder, are older, stamped 3, 5 and 8 November. I read the diff and did not run a build. I cannot say what triggered the note, and I did not test the advice.

The open items from the last entry stand. All six acceptance goals are open, live Cursor dispatch lacks a stored key, and the Mac app's build 10 was never exercised on screen.
