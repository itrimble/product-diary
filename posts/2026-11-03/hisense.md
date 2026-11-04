---
project: Hisense TV Tune-up
title: Hisense Podcasts Sign-in Fix Blanked the Library Screen
summary: A fix for a misdrawn password box on my television's podcasts app blanked the library after sign-in, until I narrowed the fix.
---
My fix for a broken password box on the television's podcasts app made things worse before it made them better. The cursor in the password field was drawing well below the box. I fixed that, signed in for real, opened the library, and the screen went blank. A narrower version of the same fix brought my podcasts back, though I have not yet watched a long session or tried two-factor sign-in.

The fix was a rendering hint applied to the sign-in form and to every element inside it. The television's log showed the web view complaining "tile memory limits exceeded" 336 times in the four minutes of that sign-in. That fits a hint that gives every element its own drawing layer on a set with a small graphics budget. It is a fit, not proof: the same warning also appeared after a clean restart from a background page. What I could test was the state. After stopping and restarting the app it drew Home and Shows normally, with 30 shows listed, so the blank screen belonged to the sign-in session.

I then restricted the hint to the small form itself. The build was held in the queue because the build Mac's disk was too full, so I cleared about 7 GB of re-downloadable caches. I installed the result, signed in again and saw my podcasts, with the password fields aligned. Both of those are what I saw on the screen, nothing more.

The television dropped off the network before I could pull a log for the fixed build, so I cannot say the memory warnings stopped. The first attempt to read the log also failed because the television had not yet approved my Mac for debugging. I wrote all of this into the [1 November article](/hisense/2026-11-01/) rather than start a new one.
