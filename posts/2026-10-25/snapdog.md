---
project: SnapDog
title: SnapDog Stops One Blank Frame From Killing a Recording
summary: A Mac screen recording could be ruined by a single empty frame; SnapDog now drops those frames and the recording survives.
---

On the Mac, a finished screen recording could turn out to be a file nothing will open, with no warning until you tried. The ruin came from a single empty picture handed over while the screen had nothing new to show — one of those was enough to invalidate the whole movie. SnapDog now quietly drops those empty frames while recording, so the file that comes out is the one you sat through.

The culprit was ScreenCaptureKit's idle frames. Their sample buffers can report themselves data-ready while carrying no image at all, and feeding one of those to AVAssetWriter fails the entire movie with error -16122 — not the frame, the movie. The fix in `RecordingManager.swift` is twelve lines: for screen streams, a frame is appended only when its status reads complete and it genuinely contains an image; everything else is dropped before it reaches the writer.

I did not run SnapDog's test suite tonight, and the fix went in without a new test. Staging an idle frame on demand is awkward, though that excuse has a short shelf life. The recent nights went to the Linux port and to the website, from [the window-capture fix](/snapdog/2026-10-22/) onward, so this is the Mac app getting attention again.

The day's second commit refreshed the History-page picture used by the Linux port's website: one capture in the list, the demo file from 21 October with its details panel open. Both commits landed together at 23:06.

![The SnapDog history page on the Linux port, listing one demo capture](snapdog-history-page-linux.png)
*The History page of SnapDog's Linux port showing the 21 October demo capture, a screenshot committed to the project on 25 October 2026.*
