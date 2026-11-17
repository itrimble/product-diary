---
project: SnapDog
title: SnapDog 1.2.2 Goes to Apple Review With Loom Import
summary: I sent SnapDog 1.2.2 to Apple for review after restoring three fixes that an old commit had quietly undone.
---
SnapDog 1.2.2 is now waiting for Apple's review, and it is the first version of the Mac app that includes the Loom video import I wrote about two weeks ago. I sent it in on Monday afternoon. If Apple approves it, people who download SnapDog will get the import, plus three bug fixes that had silently stopped working.

Those fixes were the real find. Last night's [test-suite entry](/snapdog/2026-11-15/) left 16 failures I could not explain. This time I traced them to a single October commit that reverted three working fixes while leaving their tests in place. Arrows on screenshots were drawing mirrored when you dragged left or up, the click-ripple effect in recordings was broken, and stitched scrolling captures failed on small scrolls. I restored all three, bumped the app to version 1.2.2 (build 10), and the Mac suite is clean again.

Getting build 10 to Apple took more than the fix. Exporting for the Mac App Store from a headless session failed with "No Accounts", because Xcode reached for an Apple login that is not there overnight. The release script now copies the store provisioning profile to the folder Xcode reads and exports with manual signing and an explicit installer certificate. Apple's own checker then reported 0 errors, 0 warnings and nothing blocking.

On the listing, the What's New text for all 13 languages now names Loom. I left the description, subtitle and keywords alone, since the listing notes warn against stuffing a competitor's trademark there. I also rewrote the review notes and removed an old test credential from them. The two Linux test skips turned out to be missing tools on that machine, not bugs, and the Creator Studio smoke failure was just an unbuilt helper.

I wrote everything into a new status document, including the risks. The Loom import has never run against the real service, the screenshots are English only, and I cannot confirm the privacy answers are published through the public interface. I also could not take a screenshot tonight, because the simulator build failed.
