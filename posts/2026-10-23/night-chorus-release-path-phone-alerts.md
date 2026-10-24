---
project: Prism Shift
title: Night Chorus Gets a Release Path, and Alerts Reach My Phone
summary: One Friday of plumbing: failures now reach my phone, a skipped night cannot hide, and Night Chorus's first release check found four problems in seconds.
format: longform
category: web
stats: Shared instruction lines = 270 to 102 | Release check failures found = 4 | Days with no nightly entries = 3 | Screenshots needing captions = every one
---
Until this week my blog, my build machines and my App Store process each worked on their own and badly together. In one Friday I closed the gaps: failures now reach my phone, a skipped night can no longer hide, and Night Chorus has a release checklist that, on its first run, found four things that would have stopped a submission.

I did this with Claude doing the work and me making the calls, and I want to be exact about what is proven and what is only written down. The short version is at the end. The detail comes first.

## The night that did not run

On the morning of 23 October I asked why the blog was missing a day. The most likely cause is ordinary and a little embarrassing. A Homebrew update had replaced the tool that runs the nightly job, macOS killed it at 00:12 with a code-signing error, and the error logs stayed empty because the process never got going. I only learned about it by asking. [The 21 October story](/prism-shift-bosses-lightfence-film-shelf/2026-10-21/) and [the 22 October story](/pipe-flow-desktop-audit-lightfence-fold-statbar/2026-10-22/) were the rewrites that followed.

While fixing that I found a second, quieter bug. The nightly script treated any file in a day's folder as proof the day was done. A hand-written article sitting there made the whole night skip itself. Three earlier days, the 16th, 17th and 18th, have no nightly entries at all and each had a hand-written post in its folder, which fits the same cause. I have not proved it. The 23rd was next in line to be skipped, because of [a Hisense article published at 14:38](/hisense-podcasts-native-library/2026-10-23/). The night now runs beside a hand-written post instead of stepping around it. I tested it in a throwaway copy of the repo and on the Mac mini, but the first real run is tonight.

![The live Daily Stories page on the blog listing the 21 and 22 October stories with thumbnails](blog-daily-stories-category-page-live.png)

*The public Daily Stories page, captured on 23 October 2026 with a headless browser. Both stories are the rewrites mentioned above, each with its own screenshots. The 23rd does not have one yet.*

## Three layers of instructions, and why I did not mirror them

I asked whether to copy my writing-style note into every machine's personal instruction file. The honest answer was no, with one exception. Claude Code stacks three layers: a file per machine, a shared file for everything under `~/projects`, and a file inside each project. They add up rather than override each other. I have three Macs, and their machine-level files were nothing alike: none on the MacBook Neo, a seven-line Ruflo stub on the MacBook Pro, and an image-generation guide on the mini that only makes sense on a 16 GB machine.

So I did not mirror. Each machine now opens with the same ten lines: write like MacStories and Thurrott.com, never add a co-author trailer to commits, never commit secrets, ask before anything outward-facing, caption every screenshot. That block reaches sessions started outside my projects folder, which now includes the nightly job, because its working copy moved out of the synced tree. The shared file lost its swarm-and-memory text, whose servers had failed to connect in my last session anyway. It went from 270 lines and 12,743 bytes to 102 lines and 6,580 bytes. The project files stay the source of truth for each project.

## Night Chorus gets a release path, and fails its first check

Night Chorus is the renamed Prism Shift. Lightfence already had a full release script. Night Chorus had none, and its notes still said it was not a git repository. I wrote it a read-only preflight, a gate script that records a pass or fail for one exact commit, and a release script that stops at the plan unless I tell it to continue. Then I ran the preflight on the real project.

![Terminal window showing the Night Chorus preflight with four FAIL lines and a final FAIL (4)](night-chorus-release-preflight-four-failures.png)

*The Night Chorus release preflight run on 23 October 2026. Read the FAIL lines: uncommitted files, two dead web addresses, and no recorded gate pass. The ok lines are checks that passed.*

It failed four ways, in a few seconds. Six tracked files had uncommitted changes. The privacy and support addresses in the store metadata pointed at `prismshift.remnantsecurity.com`, which does not exist any more. The renamed site serves both pages at `nightchorus.remnantsecurity.com`, and I confirmed they return 200. And no test gate had passed for that commit. My own rule is that nothing is submitted without a working privacy address, so that second one alone would have blocked me.

App Store Connect already holds three 1.0 versions in preparation, for iPhone, Apple TV and Mac, and nothing has been submitted. I did not submit anything. The archive and upload steps in the new script have never run, and the first real run needs me watching. The full runbook is `release/RELEASE.md` in the project, committed locally and not pushed.

## The blog learns to caption screenshots

I decided captioned screenshots should be a requirement. The blog's validator now rejects any image in any post without an italic caption of at least four words saying what it shows and when it was captured. Long posts already had that rule. Now everything does, from 24 October.

![Terminal window listing more than a dozen reasons the validator rejected a test story, including a missing caption](product-diary-validator-rejects-bad-story.png)

*The blog validator rejecting a deliberately bad test story on 23 October 2026. It fails the filename, title, summary, headings, screenshot count, alt text, links and the missing caption in one pass.*

## Alerts that reach my phone

![Terminal window showing the 23:30 pre-flight on the Mac mini and the 08:30 off-box check on the NAS both passing](diary-preflight-and-off-box-check-clean.png)

*The two checks that watch the nightly job, run by hand on 23 October 2026. The first runs on the mini at 23:30 and the second on the NAS at 08:30. Both are clean; I left out the phone notification because its address is private.*

The mini runs a pre-flight at 23:30 that looks for the exact thing that broke last time, a changed node install, and reloads the job if it finds one. It sends a morning all-clear at 07:30. The NAS, which is never off and does not depend on the mini, checks the live site at 08:30 and speaks only if yesterday is missing. The nightly script itself pings me the moment it aborts.

## What this does for my app development

The fair question is what any of this is worth to my app development, so here it is without rounding up.

- **Fewer silent failures.** A broken night used to be found by a person noticing. Now it is found by a script within hours and sent to my phone, and the one failure I have actually seen has an automatic fix. That fix is untested overnight.
- **A release check I cannot argue with.** The preflight found a dead privacy address in seconds that I would otherwise have met during review. The gate result is tied to one commit, so "the tests passed" cannot quietly refer to a different build.
- **A release that ends in announcements, not just a submission.** The new runbook skill covers the product site, store badges for platforms that are live, the Gumroad page, GitHub and a captioned post here. I have not measured the time this saves; the first real release will tell.
- **Leaner sessions.** Every session under my projects folder now starts with roughly half the shared instructions. I have not measured the cost in tokens.
- **The same rules on all three Macs.** That removes the "which machine knows this" guesswork.

## What I would tell you

Write the failure path before you write the happy path. Everything above was a quiet failure: a skipped night, a dead address, a note that said the wrong thing. None of it makes the apps better by itself. It makes shipping them less likely to go wrong without telling me. What is still unproven is the part that counts: the first night under the new rules, and the first real Night Chorus submission.

## Sources

I opened these on 23 October 2026. I only confirmed that the Night Chorus pages return 200 and did not read them, and I did not open any App Store review page.

- [Lightfence product page](https://lightfence.remnantsecurity.com/): the game's platforms and price, read for the earlier stories.
- [StatBar product page](https://statbar.remnantsecurity.com/): price and what the app does, also read earlier.
- [Night Chorus privacy page](https://nightchorus.remnantsecurity.com/privacy.html): returns 200, which is why the metadata should point here.
- [Pull request 59, the nightly story and SEO spec](https://github.com/itrimble/product-diary/pull/59) and [pull request 67, the fix for skipped days](https://github.com/itrimble/product-diary/pull/67): my own changes to this blog's pipeline.
