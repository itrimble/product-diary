---
project: Daily Story
title: Hermes WebUI Went Live and the Fleet Lost Its Voice
summary: My house assistant put a web front-end on my private network in eight minutes, while its morning health report failed and its evening voice crashed.
format: longform
stats: WebUI time to first screen = 8 min | Fleet machines answering = 3 of 5 | Lightfence Steam candidate = 295 MB
---
The loudest thing in my house on 25 October was software. My house assistant, Hermes, gave itself a web page of its own, reachable from my phone, in about eight minutes. The same day its voice broke twice, my screen recorder learned to survive a single blank frame, and my puzzle game's Mac build finally got its paperwork.

## Hermes WebUI: eight minutes to a screen of its own

The assistant's evening started with a download. At 22:07 a squashed snapshot of an open-source project landed in my projects folder: 2,341 files stamped v0.52.544, with a clean working tree. I have changed nothing in it, and I want that on the record. The upstream project describes itself as "the best way to use Hermes Agent from the web or from your phone," built with no framework, no build step and no bundler — a standard-library Python server and plain JavaScript. That austerity is the whole reason it started fast: nothing to compile, and the assistant's environment already had every dependency, so it installed nothing.

The deployment report reads like a careful driver in a narrow lane. Port 443, the standard secure web port, was already held by my code server, so instead of displacing it the assistant added a listener on port 8445 and diffed the routing table before and after: three existing routes byte-identical, one added, none removed. Port 8787 looked occupied too, but the holder was bound to a different address, so both coexist. The page is served over HTTPS with a real certificate, reachable only inside my private network, behind one long generated password. I am not printing the password, and I am not publishing the address.

What was verified, after midnight: the process was two hours old and the local health endpoint answered. What was not: the phone login, end to end, because that needs my hands. And it will not survive a reboot — the assistant deliberately left the Mac's startup configuration alone and wrote out the instructions instead of running them. The [Hermes WebUI entry](/hermes-webui/2026-10-25/) carries the full report.

![The Hermes WebUI login view with its wordmark and Chat heading](hermes-webui.png)

*The first screen the new Hermes WebUI server presents to a visitor, captured on 25 October 2026 a few hours after the assistant put it up. The address and password are kept out of the picture on purpose.*

## The fleet's bad day: no health report, no voice

While the assistant was giving itself a screen, its other habits were failing. The morning health report came out marked failed: the machine that runs its language models did not answer. The overnight head-count regenerated the inventory at 04:01, and since the fleet's work is never committed, the diff reaches back to the 23 October baseline. One laptop has now dropped from verified to a failed name lookup, the second night running — even its local network address no longer resolves. The dead adgen pair still times out. This is the 08:00 summary's own host list, which I read tonight:

| Host | What the summary said |
| --- | --- |
| mbp | authenticated |
| nas | authenticated |
| omarchy | authenticated |
| neo | failed |
| adgen | timeout |
| adgen-vm | timeout |

Three of five machines answered, by the entry's count. The health line itself is blunter: the model server is unreachable. That server is where the assistant moved its thinking during Friday's placement correction, and the records cannot say whether the machine was asleep or the service was down — the summary records the failure, not the cause. The same summary recaps the prior evening's session, all of it work the assistant did and reported itself: a specialist review that found fifteen defects, a blog post published end to end, audio delivered into Telegram with the player duration verified.

The evening failure is the one I can see closest. At 22:20 the assistant wrote the deployment report for the web interface above and drafted the spoken version, and the speech engine died on startup — a numpy import error inside its Python 3.14 environment. The script sits in the deliverables folder without its recording, and the ledger records the attempt as failed. The voice pipeline that [began on the 23rd](/hermes-fleet/2026-10-23/) has now broken on its own plumbing rather than on fidelity, which is at least a new way to fail. The [Hermes Fleet entry](/hermes-fleet/2026-10-25/) has the rest; I read all of it from the records and ran none of the checks myself.

## SnapDog: one blank frame, twelve lines

The Mac screen recorder had a bug worth the cliché about small causes. ScreenCaptureKit, Apple's capture framework, can hand over an idle frame that reports itself data-ready while carrying no image at all. Feed one of those to the movie writer and it fails the entire recording with error -16122 — not the frame, the movie. A finished file that nothing will open, with no warning until you tried.

The fix is twelve lines: for screen streams, a frame is appended only when its status reads complete and it genuinely contains an image; everything else is dropped before it reaches the writer. Honest gap: I did not run the test suite, and the fix went in without a new test. Staging an idle frame on demand is awkward, though that excuse has a short shelf life. A second commit refreshed the History-page picture used by the Linux port's website — both landed at 23:06, the same minute as Lightfence's paperwork below, which I assume is the night batch finishing together rather than coincidence. The [SnapDog entry](/snapdog/2026-10-25/) has the details, and [the 22 October entry](/snapdog/2026-10-22/) is where the Linux port's window-capture work started.

![SnapDog's Linux history page listing one demo capture with details open](snapdog-history-page-linux.png)

*The History page of SnapDog's Linux port, committed on 25 October 2026: one capture in the list, the 21 October demo, a window capture of 1000 by 550 pixels weighing 5 KB, with its details panel open.*

## Lightfence's Steam candidate gets written down

Lightfence, my territory-claiming arcade game, is out on the App Store for phones, tablets and the Apple TV, and version 1.3 has been with review since Thursday. The Mac is the missing platform, and this week it got closer without anyone touching Steam: the build fleet compiled the whole game into a single package on 23 October, and tonight that package finally got written down. The twenty-line record landed at 23:06, two days after the build it describes.

I verified the artifact myself. A 295 MB zip sits in the fleet's results folder on this mini, next to a receipt that says the build exited clean in 122 seconds and peaked at 257 MB of memory against a 4 GB budget. What I did not do is open it: the package carries no signature, so launching it would mean bypassing the Mac's protections, and I declined. The record is blunt about what is missing — no Steamworks integration, no Windows or Linux port, no distribution signing, no hands-on check of controllers, launch or visuals. That list now lives in the repository rather than in my head, which is the point of writing it down. The product page I opened tonight still lists iPhone, iPad and Apple TV at $3.99 and no Mac, which matches a candidate nobody has uploaded. The [QixForge entry](/qix-swift/2026-10-25/) — the repo still carries the name from [before the game was renamed Lightfence](/weekly-roundup/2026-10-16/) — and the [fleet that built the candidate](/build-orchestration/2026-10-23/) have the rest.

![The Lightfence title menu listing Continue, New Campaign and Endless modes](qix-swift.png)

*The Lightfence title menu on a phone simulator, captured just after midnight on 26 October 2026 while writing the day's entries. The footer reads Continue from Sector 1, Stage 2.*

## What I would tell you

The deployment report that diffed the routing table before and after is the pattern worth copying: "nothing existing moved" was proven, not assumed. Write the build record the same night as the build, because the gaps list belongs in version control, not in your head. And say when a fix ships without a test — one blank frame could kill a whole movie, and the only thing standing guard over that now is twelve lines and honesty.

## Sources

I opened the first three on 26 October 2026. I did not open any App Store review page, any Steam page, or the fleet's private network address, and I did not run the SnapDog test suite.

- [Hermes WebUI on GitHub](https://github.com/nesquena/hermes-webui): the upstream project's own description, its MIT licence, and its note that a tailnet is the preferred way to expose the interface to a phone.
- [Lightfence product page](https://lightfence.remnantsecurity.com/): platforms, price and the current feature list, which mentions no Mac.
- [SnapDog product page](https://snapdog.remnantsecurity.com/): the Mac app's own pitch, $14.99 once on the Mac App Store, with the privacy claims spelled out. The Linux port has its own website, which I did not open.
