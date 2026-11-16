---
project: Daily Story
title: SnapDog Tests Revived, App Store Status Corrected
summary: I got SnapDog's dead test suite running again on Sunday and found its Loom import was never shipped, so nobody outside my machines has it.
format: longform
---
SnapDog, my Mac app for taking screenshots, recording the screen and marking up what you captured, had a quiet Sunday that turned out to matter. Its automated safety checks had been dead for two weeks and I had not noticed. I got them running again, then found that a feature I thought was out in the world was not. Nobody outside my own machines has it yet.

Two other folders changed, but only as routine upkeep (bot notes and machine inventory snapshots). That makes this a one-project day, so I will spend the whole piece on it. The short entry for the day is [here](/snapdog/2026-11-15/).

## The tests that stopped without a sound

The Loom video import landed on 2 November, and I wrote about it in [that day's story](/hisense-podcasts-snapdog-loom-night-chorus-worlds/2026-11-02/). Alongside it I wrote a small fake network helper so the new tests would not touch the internet. That helper handed back its two answers in one order. The real code expected the other order.

Swift does not forgive that. The test target would not compile, and when a test target does not compile, nothing in it runs. Not the 7 new Loom tests. All 165 Mac tests went silent. No red light, no email, nothing. A suite that cannot build looks, from a distance, a lot like a suite that is passing.

The fix was swapping the order in one test file and leaving a comment for whoever repeats the mistake next. Once it compiled, the 7 Loom tests passed.

*The lesson for me is dull and useful. A test run that reports nothing is not a green run. I should check that the count of tests executed is not zero.*

## What the full run really said

Then I ran everything, and it was not clean.

| Area | Result on 15 November |
|---|---|
| Mac suite, annotation direction | 9 failures |
| Mac suite, click ripples | 4 failures |
| Mac suite, stitching small scrolls | 3 failures |
| Mac suite, Loom import | 7 passed |
| Linux tests | 119 passed, 2 skipped |
| Creator Studio server, Loom tests | 14 passed |

That is 16 failures in three older areas. My first thought was that the Loom work had broken something. It had not. I made a separate worktree at the commit just before the Loom import, ran the same suite, and got the same 16. They trace back to recording and editor changes from 1 October. They had been failing quietly the whole time, hidden behind the compile error.

One more thing did not pass. The Creator Studio server has its own smoke test, and it still fails on a single line. It has nothing to do with Loom. I did not dig into it.

![The Capture page of SnapDog's settings window, showing display, window and region capture options](snapdog-capture-settings-window.png)

*SnapDog's Capture settings page, from the product website's own screenshot set. The file dates from 29 September 2026, so it predates this week's work and is here to show the app, not the fix. Look at the region capture preview styles.*

## The App Store record was wrong in my own notes

The rest of the evening went into the handover notes, which I keep so a future session can pick the project up cold. They had been frozen since July and still said version 1.0.0 was waiting for review. That was badly out of date.

I checked App Store Connect directly instead of trusting my own file. What I found:

- Version 1.2.1, build 9, is live.
- The newest upload there dates from 24 September.
- Version 1.2.2 exists as a shell. It has no build attached, so it cannot be submitted, and the release notes are empty in every language.
- The project file says version 1.0.0, build 4, because an October commit overwrote it. Before anything ships it needs to read 1.2.2, build 10.

So the honest summary is this. The Loom import is finished in my working copy and covered by tests. It is not in the version people can download. The same goes for the newer Linux build. I wrote all of it into the handover, along with the Tuist and `asc` setup traps I hit on the way, so I do not rediscover them.

I opened the [public product site](https://snapdog.remnantsecurity.com/) and the [App Store listing](https://apps.apple.com/us/app/snapdog-capture-annotate/id6783121166) to check they load. Both returned a normal response. I did not read the listing page through, and the App Store Connect check was in my own signed-in session, so you cannot reproduce it.

![SnapDog's General settings page showing recording format choices of MP4, MOV and GIF](snapdog-recording-format-settings.png)

*The General settings page, with MP4, MOV and GIF recording formats and an optional GIF export after each recording. Captured from the website's screenshot set on 29 September 2026; the top of the window is blurred in the original.*

## Where the Linux port stands

The Linux port got its own long story in [the 3 November write-up](/snapdog-linux-rebuild-pipe-flow-sea-hisense-blank/2026-11-03/). On Sunday it only showed up as a passing test count, 119 passed and 2 skipped. I did not touch the port itself, and I did not run it on a real Linux desktop that day. So I can tell you the tests pass, and nothing more about how it feels to use.

![The Workflows page in SnapDog, showing a three-step On-Device AI Demo workflow](snapdog-workflows-editor.png)

*The Workflows page with a sample three-step flow: screenshot captured, AI clean and summarize, show result. Taken from the website screenshot set on 29 September 2026. The demo workflow is switched off in this shot.*

## What was not done

I did not upload a build. I did not fix the 16 failures. I did not attach a build to 1.2.2 or write its release notes. The weekly roundup for [the week of 6 November](/weekly-roundup/2026-11-13/) made a point of honest numbers, and I would rather leave this list ugly than pretend the day finished more than it did.

I also rejected one candidate screenshot, the annotated editor image from the website set. Its sample file list shows real filenames from my disk, including key-file names. It stays out of the post.

## What I would tell you

- A suite that does not compile reports nothing, and nothing looks like success. Check that the number of tests run is not zero.
- Compare against the commit before your change. It took one worktree to prove the Loom work was innocent of 16 failures.
- Do not trust your own handover file. Check the store. Mine was wrong by several versions.
- "Finished in my working copy" and "shipped" are different states. Say which one you mean.

## Sources

- [SnapDog product site](https://snapdog.remnantsecurity.com/), opened 16 November 2026 to confirm it loads.
- [SnapDog on the Mac App Store](https://apps.apple.com/us/app/snapdog-capture-annotate/id6783121166), checked for a normal response; contents not read in full.
- Test counts, the App Store Connect state and the 1.2.2 findings come from my own project entry for the day and the project's git history, not from a public page.
