---
project: Fire TV Cleanup
title: A Fire TV Stick Loses Its Trackers, With an Undo Button
summary: I started stripping tracking and advertising services off a streaming stick, with backups and a one-command way to put everything back.
---
I spent part of Saturday morning trying to make a streaming stick less nosy. The goal was a stick that still plays everything and still answers to Alexa, but no longer phones home with usage reports or shows advertising. Before touching anything I saved its settings and wrote a script that puts the original home screen back.

The cleanup is split into seven short lists of system packages, one per theme: telemetry, personalisation, advertising, Amazon's own extras, shopping and games, a mini TV service and cloud gaming. The first line of each file states the rule, which is a conservative cleanup of Fire OS 8 that keeps apps, Alexa, casting and updates. The final disabled list has eight entries. `restore-cleanup.sh` re-enables them, and a timestamped backup folder holds the settings, USB and home-screen state from 10:22.

I also tried a third-party launcher as a replacement home screen. Switching to it needs an accessibility setting, so `restore-amazon-home.sh` reads the saved value, writes it back, stops the launcher and sends the stick to the Amazon home screen. The folder holds before and after screenshots, which I have left out because they show my home setup.

What I did not do is confirm the final state of the stick from here. This entry is built from the files left on disk, not from a live check. None of it is in version control, and I would not trust a cleanup list that I had not first watched survive a reboot.
