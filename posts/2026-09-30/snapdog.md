---
project: SnapDog
title: SnapDog Stops Stealing Focus When Recording Starts
summary: Starting a screen recording no longer leaves SnapDog in front, so your first click lands in the app you are recording.
---
Start a screen recording in SnapDog and your first click used to go nowhere useful. SnapDog stayed in front after you chose what to capture, so that click was spent bringing your own app back to the top. The fix returns control to the right app the moment you choose, and the first click lands on what you aimed at.

The culprit was the picker. Whether you choose a whole display, one window or a region, the picker drags SnapDog forward so that Esc and Space respond during the choice. Nobody handed focus back afterwards. That is the entire bug.

The repair has two halves. When you ask to record, SnapDog now remembers which app was frontmost. After you choose, it works out whose content you picked. For a window that is the window's own app, for a full display it is nobody, and for a region it is the topmost ordinary window under the middle of your selection. Finding that window means walking the on-screen list from front to back while skipping SnapDog's windows. Regions need the vertical axis flipped first, because the picker counts from the top-left and the screen list counts from elsewhere.

The choice itself lives in a small function with three rules: prefer the target's owner, otherwise the app that was in front earlier, and never SnapDog. I wrote tests for it. I could not confirm they run, and the work is uncommitted, so treat it as written, not shipped. The countdown after the pick behaves as before.
