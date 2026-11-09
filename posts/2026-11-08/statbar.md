---
project: StatBar
title: StatBar Stops Overpromising How Much Disk Space It Frees
summary: StatBar's Free Up Space window had been promising far more disk space than a cleanup would give back, and the estimate is now honest.
---
StatBar's Free Up Space window had been telling me I could reclaim 32.5 GB. That figure was wrong, and on Sunday I fixed it. The number added together things that a cleanup would never delete, including a folder of phone simulators that the erase command leaves in place. The footer now counts only the caches the app ticks for you by default, and the big free-space figure reports what is free right now.

I audited it from a screenshot I took of the dialog. The saved scan summed 32,482,402,304 bytes. Of that, 18.7 GB was the default caches (uv, pip, npm, Homebrew and Xcode build data), 1.4 GB was optional Hugging Face and Playwright downloads, and 12.3 GB was the whole simulator Devices folder, labelled as if erasing it would return the lot. It would not, because erase keeps the devices, their base data and the runtimes.

The free-space figure had the same flavour of problem. It used the system's "important usage" capacity, which includes space macOS thinks it could make available. That read 48.7 GB while `diskutil` reported 43.59 GB of real APFS space. It now uses the free-now number and describes the reclaimable part separately. Runtime rows now say "installed" size, since four runtimes totalling 28.55 GB is the image size and not proof of bytes returned. Deleting one reports removal and stops short of claiming space.

This follows the size-counting changes in [the 1 November releases](/statbar-disk-map-hisense-podcasts-snapdog-bugs/2026-11-01/). A missing folder also used to measure as a complete zero-byte result. It no longer counts as complete, and a new test says so. A second test checks that the estimate leaves out optional, destructive, blocked and incomplete rows. The cleanup test script passed on the Mini through Build Fleet. A syntax parse and a type check passed on Neo.

Not verified: the packaged app build is queued behind a memory-headroom rule, so I have not seen the new footer on screen. This was a read-only audit; I ran no cleanup. The guide, sales page text and site copy were updated to match.
