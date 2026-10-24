---
project: Build Fleet
title: The Build Fleet Learns Windows and Stops Losing Job Receipts
summary: The build system that spreads my compiling work across the house added a Windows worker, kept receipts when connections dropped, and showed memory pressure.
---
The system that spreads my building work across the computers in this house learned to use a Windows machine too. It books a virtual Windows machine only when there is room for the job, keeps proof of what ran there even if the connection drops mid-job, and now shows memory pressure and swap on every machine, so work that would choke one box is sent somewhere with headroom. This is the answer to Wednesday's crowding, when the fleet [turned away a set of Mac tests because it had no room](/prismshift/2026-10-21/).

The day's twenty-seven commits, from nine in the morning to ten at night, read as one theme: jobs should leave evidence. Worker releases are immutable and record where they ran; a rollback was exercised and verified; recovery drills were hardened; and receipts now survive even when the log reader disconnects. A job whose command has gone missing closes itself instead of holding its host hostage as lost, and the Linux desktop got its own tile on the fleet board, drawn in the green of its own wordmark.

Two Windows specifics mattered. Staging files are replaced without copying release permissions along, and a licence upgrade candidate was deliberately preserved but not activated, because a Windows licence, once switched on, is a thing you own whether or not it was the right choice. Elsewhere the fleet migrated to Godot 4.7.2, learned recipes for building games, and can now run jobs for projects that keep no version control at all, by walking their files instead. The menu bar view got its overview back and a simpler task hierarchy. I did not re-run any of the drills tonight; the fleet's own acceptance records are the evidence, and I have read them, not reproduced them.
