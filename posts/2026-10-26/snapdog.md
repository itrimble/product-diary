---
project: SnapDog
title: SnapDog Files Its Scrolling-Capture Proof and Two Decks
summary: The app did not change; I filed the proof that scrolling capture works, my demo-film shoot notes and two slide decks telling its story.
---
Nothing about SnapDog itself changed on Monday, so nobody using it will notice anything. What changed is the paperwork around it. I put the proof that its scrolling capture works, the notes from the demo films I shot, and two slide decks that tell the story of the app into version control, where they will stop living only in a folder on one machine.

The scrolling-capture proof dates from 18 September, and it is the most useful thing in the batch. The feature stitches several screenshots taken while a page scrolls into one tall picture. The test drove the real app through five scrolls of 450 points on a page made of 24 numbered colour bands, then decoded the result: all 24 bands, in order, each exactly once, every full band exactly 120 pixels tall, final image 1070 by 2810. The six unit tests for the stitching code passed. A scroll with no overlap was refused, so a bad frame cannot corrupt the picture. I wrote `stitch-e2e.sh` and `verify-stitch.py` so the check can be rerun.

The demo-film folder carries the setup for the German, French, Japanese and English masters. Its rejected-takes note is a good read: the first live run on 16 September filmed Terminal with a permission dialog on top, because installing a freshly signed build had invalidated the screen-recording grant, and the shoot script was reading a half-saved file. The decks come from `build_pptx.py` plus a hand-made HTML version.

I did not rebuild the decks or rerun any of the tests tonight. These are older results, committed as they were, so read the numbers as September's. The two commits landed at 23:01, after the [blank-frame fix from the 25th](/snapdog/2026-10-25/).
