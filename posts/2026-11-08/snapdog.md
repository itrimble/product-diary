---
project: SnapDog
title: SnapDog Linux Gets Controllable Mac Recording and 0.2.66
summary: SnapDog's Linux test mode on the Mac can now start and stop a screen recording from its own button, and the final Linux packages were rebuilt.
---
SnapDog's Linux version can now record video in its Mac test mode, with a Stop button that works. Until Sunday the recorder could only be started, and the Mac had never been allowed to record its own screen for it. I worked around that, saved real video files of the whole screen and a chosen region, and rebuilt the Linux install packages as version 0.2.66. All of this is still uncommitted in my working copy.

The permission problem was the blocker. The built-in Mac recording command still lacked screen-recording rights for the Python program that runs the simulator. Peekaboo, the automation tool, already had them. Stopping Peekaboo's live capture with an interrupt threw the video away, so I could not use it. Its "action" mode finalizes a file when a shell command exits, so Start launches that, and the Stop button creates a marker file and waits for the finished MP4. The catch is a 180-second limit. Audio, camera and click-ripple recordings keep the native route.

The results, from the Mini: the full-screen run saved a 1,375,844-byte, 1920 by 1080 H.264 file of 34 frames. The region run saved a 500 by 400 file of 64 frames. ffprobe decoded both, and I opened extracted frames. A GUI run clicked Stop and found the History row. A Safari window recorded too, but it showed a permission dialog over it, so this records the visible rectangle, not an isolated window.

Packages were built through Build Fleet on Omarchy, my Linux box: DEB 171,500 bytes, RPM 181,689, Arch 213,369. Arch reinstalled with 35 files and 0 altered, and the Linux suite passed 121 tests. The DEB and RPM installed in Debian and Fedora containers, but those have no display, so I claim no GUI result there.

Not verified: pause and resume, audio, camera and anything past 180 seconds. The Neo's screen was never observed, because a launch review rejected the simulator.
