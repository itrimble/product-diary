---
project: LaunchDeck
title: LaunchDeck Learns to Cut Seamless Loops and Build Safely
summary: LaunchDeck, my marketing-video tool, can now cut clips that loop without a visible jump and builds untrusted projects with tighter limits.
---
LaunchDeck is my tool for turning a finished app into marketing clips and screenshots. On Monday it learned two things. It can now cut a short video that loops with no visible jump when it restarts, and it handles apps that download their parts from the internet without giving untrusted code the open network. The changes are in my working copy, not committed, and I did not run a full pipeline end to end.

The loops come from Lightfence's own showcase recipe. Each clip is 12 seconds long, and its last 0.6 seconds fade into the footage just before the first frame, so the jump back to the start disappears. A new clips setting picks one of two looks. The site profile is 720p at 30 frames a second, small H.264 plus a WebM. The app profile is 1080p at 60 frames a second in HEVC at about 4.5 megabits, the format Lightfence ships inside itself. If a recording is too short for 12 seconds, it shortens the loop and warns.

The Lightfence recipe was tuned to match: an Apple TV simulator at 1080p, a build compiled with optimisation (otherwise the autopilot ran near 14 frames a second), and 30-second HEVC recordings, two moments per video.

On the safety side, the project scanner in `trust.py` stopped reading Xcode project files as raw text and now converts them with `plutil` and reads real objects. Unreadable ones are flagged for hand review. Scheme scripts are found at any depth. When a project needs Swift packages from the network, one resolve step runs outside the sandbox, but with SwiftPM's own manifest sandbox on, a scrubbed environment and trusted projects only. The build then runs offline. The sandbox no longer lets builds write under the Library developer folders. Ten files changed, with 138 new lines of tests, which I did not run.
