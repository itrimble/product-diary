---
project: Build Fleet
title: Build Fleet Stops Crying Wolf About Builds Marked Local
summary: The build fleet's alarm for builds that skipped it no longer fires on builds I declared local, and it now names wrapped builds correctly.
---
The system that spreads my building work across the house stopped raising a false alarm. It watches for builds that ran outside the fleet, and it flagged Android builds that I had deliberately kept on one Mac, because the tools only work there. It also now names a wrapped build for what it is, instead of calling it by the first folder change in the command. Fewer false alarms means the real ones are easier to believe.

The trigger was a session working on the Hisense television app. Its Android builds ran with the local override the fleet's own skill prescribes for Mac-only toolchains, and the bypass alarm fired anyway. Builds that declare `BUILDFLEET_LOCAL=1` now stay in the bypass ring and are mentioned in the alert detail, but only undeclared builds count toward the alarm.

The second fix is in the classifier. That session's command put its build inside `bash -lc` with a redirection in the quoted body. The head parser dropped the body as if it were a redirect, the segment stopped classifying, and the ring named the leading `cd`. The parser now classifies the requoted segment whole, descends into a `-c` body, and strips redirections only for display. Each fix has a test: two edited files in the observability tests and three added lines in the bypass tests.

I did not re-run the full suite, which stood at 319 tests the day before, and I have not watched the alarm stay quiet on a real build since. This follows [Sunday's work on tracking AI sessions](/build-orchestration/2026-11-01/), where the bypass ring first caught two Android builds.
