---
project: Hisense TV Tune-up
title: The Hisense TV Gets a Podcasts App That Resumes
summary: The television now has a podcasts app that keeps playing with the screen off and picks up where you stopped.
---
The Hisense television got its own podcasts app. It keeps playing with the screen off, offers to continue the episode you were on when you open it, and shows a slowly drifting Now Playing screen after a few quiet minutes. Chapters from Apple's catalog show on screen.

The app is `src/apple-podcasts-tv` (`215512b`). The media session carries episode, artwork, position and speed, and handles seek. While audio plays, a wake lock and a Wi-Fi lock keep the stream alive. The screensaver starts after 3 idle minutes. The native video player saves its position to the Apple account every 30 seconds, on pause, on close and at the end. The blue key shows chapters.

A follow-up (`0ace6ff`) limits the resume offer to pages on podcasts.apple.com, and our scripts and the bridge run only there. The first commit that day (`323681d`) set a baseline for the A4 tune-up, the app and the TV Home launcher. A stray compiled Python cache file was committed with the app, which should be removed. I did not install or play the app on the TV tonight.
