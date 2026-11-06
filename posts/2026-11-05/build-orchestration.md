---
project: Build Fleet
title: Build Fleet Fixes a Job Denied After a Legitimate Retry
summary: The build fleet no longer refuses a job that was retried while being copied to another Mac, and its checks passed on a second machine.
---
The system that spreads my building work across the house had a quiet bug: if copying a job to another computer failed once and was retried, the fleet then refused to run it, saying the job had changed. Nothing had changed except the retry counter. That is fixed in my working copy, but not yet saved into the shared history. A test job also ran through the fleet to a Linux machine and came back correct.

The cause was the permission ticket the fleet signs for each job. It included two fields the broker itself updates on every retry, the retry count and the failure count, so the second attempt never matched the first. The ticket now leaves those out and still covers the command, the source fingerprint, the budget, the host and the capabilities. The same change makes the sender capture the receiving side's error output, so a broken pipe now says why instead of reporting a bare "EPIPE".

Verification, as the notes record it: the full Python suite passed 423 tests on Omarchy, my Linux box. Earlier failures there were test setup problems, such as pretend Mac paths, and I changed the tests, not the rules. A forced remote job staged a 123-byte source on the Mac mini and ran on Omarchy with exit 0. An xTool job there produced a real iPhone-style app bundle, a 64-bit Mach-O, with no signing and no install attempted.

What is still open. All six acceptance goals remain open. One packaging request is still queued behind four retries, and I deliberately left it alone. Cursor dispatch is blocked by a missing key. The Mac app's build 10 is installed but I could not exercise it, because the automation tool timed out. The fix reached all four hosts as a new worker release, but the checkout is still uncommitted.
