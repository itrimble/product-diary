---
project: Prism Shift
title: Night Chorus Builds for Steam and Fails Its Own Release Check
summary: Night Chorus, the crystal game formerly called Prism Shift, built a Linux candidate for Steam and wrote itself a release checklist that failed its first run.
stats: Release check failures = 4 | New release scripts = 3
---
Night Chorus, the crystal puzzle game that used to be called Prism Shift, took two steps towards its first release. There is now a version of the game built for Linux and aimed at Steam, and there is a release checklist that must pass before anything is submitted to a store. The checklist's first run failed four ways, which is the checklist working.

![Terminal output of the Night Chorus release preflight showing four failures](night-chorus-release-preflight-four-failures.png)
*The Night Chorus release preflight run on 23 October 2026, listing four failures: uncommitted files, two dead addresses, and no recorded gate pass.*

The four failures, read straight off the preflight: six tracked files sat uncommitted; the privacy and support addresses in the store metadata still pointed at the old game's web address, which no longer exists; and no test gate had been recorded for that exact state of the code. The renamed site already serves both pages, so the fix is metadata, not machinery. My own rule is that nothing is submitted with a dead privacy link, so that one failure alone would have stopped a submission.

The plumbing is three scripts under `scripts/ship/`: a read-only preflight, a gate that records a pass or fail for one exact commit, and a release script that stops at the plan unless told to continue, with a runbook in `release/RELEASE.md`. The project's own notes, until this week, claimed the game was not even under version control; this is the correction. The morning half of the day built the Linux candidate and resolved the exported audio, so the build actually carries its music. Nothing was submitted, and the archive and upload steps in the release script remain unrun, waiting for a run with me watching.

The rename to Night Chorus happened on [Wednesday](/prismshift/2026-10-21/), along with the fused pieces and the multi-stage bosses; today's work is what puts that game in front of a store.
