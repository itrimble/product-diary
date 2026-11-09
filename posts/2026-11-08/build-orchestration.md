---
project: Build Fleet
title: Build Fleet Lands Its Big Orchestration Commit
summary: Build Fleet, which spreads my building work across several computers, saved a large batch of work covering disk relief, media routing and Cursor.
---
Build Fleet, the system that spreads my building work across several computers, finally saved a batch of work that had been sitting uncommitted since Thursday. It is one commit, made at 12:33 on Sunday, with a large diff. Its aim is that a heavy job finds a machine with room for it, and a machine running short of disk or memory gets relief. I have not yet seen the whole thing run end to end.

The list is long. New modules cover disk reclaim, runtime and staging disk checks, capability checks, a model catalog, a project inventory and an Android project lane. There is a media workflow with routing docs, and GPU render routing notes. On the Linux side, an xTool lane builds iPhone-style apps without a Mac. The Mac menu bar app gained project audit, media workflow and Cursor availability views, and its topology and alarm screens grew.

The Thursday fix is in here too. A retried copy to another machine no longer makes the broker say a job changed, because the signed ticket ignores the retry and failure counters. A pipe failure now reports the receiver's own error.

Tests came with it: new files for Cursor, capability checks, Android projects and direct reservations. The notes say the full suite last passed 434 tests on Omarchy in 27.381 seconds, before the final edits. I did not re-run it tonight.

What is open, straight from the continuation notes: all six acceptance goals, plus the final deployment gate. Live Cursor dispatch is blocked because the Mini has no key stored. A queued app package request was preserved on purpose. I also could not exercise the Mac app's build 10 on screen.
