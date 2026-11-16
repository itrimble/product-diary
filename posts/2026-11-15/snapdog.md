---
project: SnapDog
title: SnapDog Test Suite Revived After Two Weeks Dead
summary: SnapDog's automated checks had been unable to run since the Loom import landed, and I fixed that and wrote down what is really on the App Store.
---
SnapDog's automated checks had not been able to run at all since 2 November, and nobody noticed, including me. I fixed that on Sunday night. I also found that the Loom video import from [2 November](/hisense-podcasts-snapdog-loom-night-chorus-worlds/2026-11-02/) is not in the App Store version at all. The newest upload there is from 24 September, so no one outside my machines has the feature yet.

The cause was a mix-up in the Loom tests. The fake network helper I wrote for them handed back its answers in one order, status code first and body second. The real code expects the opposite. Swift refused to compile the test target, so every one of the 165 Mac tests went silent, not just the new ones. I swapped the order in `LoomLinkTests.swift` and left a comment so the next person does not repeat it. Once it compiled, the 7 Loom tests passed.

Then I ran the full suite and it was not clean: 16 failures across three older areas, namely annotation direction (9), click ripples (4) and stitching small scrolls (3). I made a worktree at the commit before the Loom import and got the same 16, so the Loom work is not the cause. They trace to recording and editor changes from 1 October. The Linux tests gave 119 passed and 2 skipped, and the 14 Loom tests in the Creator Studio server passed. That server's own smoke test still fails on one line, and it has nothing to do with Loom.

The rest of the evening went into the handover notes, which were frozen in July and still said version 1.0.0 was waiting for review. I checked App Store Connect directly. Version 1.2.1 (build 9) is live. Version 1.2.2 exists with no build attached, so it cannot be submitted, and every language's release notes are empty. The project file also carries version 1.0.0, build 4, after an October commit overwrote it, and it needs to be 1.2.2, build 10 before anything ships. I wrote all of this into the handover, along with the Tuist and `asc` setup traps I hit.

Not done: I did not upload anything or fix the 16 failures.
