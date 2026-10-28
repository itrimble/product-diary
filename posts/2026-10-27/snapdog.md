---
project: SnapDog
title: SnapDog Gets a First Silent Film Cut for Its Website
summary: The first complete demo film for SnapDog's website exists as a silent two-minute story, and the notes say plainly which features it does not yet prove.
---
SnapDog now has a first complete film for its website: a silent story of just over two minutes, plus a 20-second trailer, about three coworkers who each ask one person to show them an answer, and how that person captures it, marks it up, records it and finds it again later. The app itself did not change on Tuesday. What changed is that the film is now a file I can play, rather than a plan.

The cut is built by `make_video.py`, which renders 15 separate segments at 1920 by 1080 and 30 frames a second, then joins them without re-encoding. The final cut runs 129.367 seconds and the trailer exactly 20. There is no sound, so every caption is part of the picture, which is how a film behaves when it autoplays muted on a web page. I checked the duration and format with `ffprobe` and inspected a contact sheet plus frames at 30 and 106 seconds.

The inspection caught a mistake. In the first render a caption panel covered the error the recording is supposed to show, so I recropped that shot and checked the 106-second frame again until the error and the caption were both readable.

The project notes are careful about what the film proves, and I will repeat them. It covers region capture, an annotated screenshot, a saved screen recording and History search. Window, delayed and stitched capture, text recognition, camera, audio, sharing and watched folders have no accepted take yet, so none of them appears. The editor footage is older, from before the [recording fix of the 25th](/snapdog/2026-10-25/), though the saved recording in the film comes from the rebuilt app. The picker overlay that appears when you drag out a region never reaches the screen recorder, so that moment is shown through its saved result.

It was one commit at 23:09, containing the scripts, the edit list and the production log. I did not rerun the render tonight.
