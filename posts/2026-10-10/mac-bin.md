---
project: mac-bin
title: Backup Scripts Now Survive a Stuck Network Drive
summary: The scripts that back up my projects and report on my Macs now survive a stuck network drive and a one-off failed copy.
---
The scripts that keep my three Macs in order took a hit from two outages this week, and the fixes are now saved in the repo. The status report each Mac sends to the file server no longer hangs when the server's shared drive freezes. The nightly backup no longer gives up after one quick retry. And the check that raises the alarm when a backup goes missing can now see a single missed night.

Details are in commit `bd39064`. On the 9th the network mount on the mini wedged, and `fleet-status.sh --publish` hung where `timeout` could not kill it. It now writes to the NAS over ssh first, falling back to the mount only if that fails. It writes a temp file and renames it. The old plain redirect left a 0-byte file after a failed write, which read as "status unreadable". That path had run every five minutes for 16 hours with no alarm, so it now sends an ntfy alert.

On the 10th the 4TB mirror failed with EINTR, and the single 20-second retry landed in the same 30-second window. `sync-projects.sh` now retries at 20s, 120s and 300s. `sync-watchdog.sh` dropped its staleness limit from 36 to 26 hours, because jobs run every 24 hours and a 36-hour limit checked daily could never see one miss. Its schedule moved to 06:30 and 18:30. The downloads offload moved to 02:30 so no two jobs share a minute.

The commit also records two launch agents that had never been saved, and moves 19 byte-identical files into `shared/`. A compiled Python cache file that was tracked by mistake was dropped.
