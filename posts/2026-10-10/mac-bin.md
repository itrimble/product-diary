---
project: mac-bin
title: Backup Scripts Now Survive a Stuck Network Drive
summary: The scripts that back up my projects and report on my Macs now survive a stuck network drive and a one-off failed copy.
---
Two outages on 9 and 10 October showed me how fragile my Mac housekeeping scripts were, and the repairs are now committed. A frozen shared drive on the file server can no longer stall the status reports. A single hiccup no longer ends the nightly backup. And the alarm for a missing backup can finally notice one missed night.

The first outage was on the 9th, when the network mount on the mini wedged. The status publisher hung so hard that the timeout command could not kill it. It now tries the NAS over ssh and falls back to the mount only if that fails, and it writes to a temporary file before renaming it. The old direct write left an empty file behind after a failure, which read as "status unreadable". That broken path ran every five minutes for 16 hours without anyone being told, so it now raises an ntfy alert.

The second was on the 10th, when the 4TB mirror failed with EINTR. My one retry, after 20 seconds, fell inside the same 30-second window as the failure. The project sync now retries three times, at 20, 120 and 300 seconds. The watchdog's staleness limit was the sneakier bug. Jobs run every 24 hours, and a 36-hour limit checked once a day can never catch a single miss, so it is 26 hours now and the watchdog runs at 06:30 and 18:30. I also moved the downloads offload to 02:30 so no two jobs start in the same minute.

Housekeeping rode along: two launch agents that had never been saved are in the repo, 19 byte-identical files moved into a shared folder, and a compiled Python cache file that should never have been tracked is gone.
