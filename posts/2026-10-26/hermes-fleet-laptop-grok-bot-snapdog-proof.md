---
project: Daily Story
title: Hermes Fleet Misses a Laptop as Grok Bot Adds Two Bots
summary: A quiet Monday: SnapDog's old proof files went into version control, Hermes Fleet lost a laptop again, and Grok Bot's notes caught up.
format: longform
stats: Computers reached by Hermes Fleet = 3 of 5 | Grok Bot profiles = 27 (26 active) | Days Grok Bot notes were stale = 5
---
Monday was a day of paperwork and bad news that nobody had to act on. My house assistant, Hermes Fleet, could not find the same laptop for another morning and its health report failed again. My Grok Bot notes caught up after five stale days and turned up two new assistants. SnapDog itself did not change at all.

I like days like this more than I admit. Nothing shipped, so nothing can be oversold. What I have is a handful of facts, some of them unflattering, and a few screenshots to go with them. Here they are in order of how much they bother me.

## Hermes Fleet still cannot find one laptop

The house assistant counts the household's computers at 03:01 every night, and on the 26th it reached three of the five it should have. It wrote that down without pretending otherwise, which is the behaviour I want. My [Hermes Fleet entry](/hermes-fleet/2026-10-26/) has the detail. The short version: the laptop I call neo failed its name lookup, and every column for it in the capability matrix reads unavailable. I had fully verified it on the 23rd.

| Machine | State on the 26th |
|---|---|
| neo (laptop) | Failed name lookup, all capabilities unavailable |
| adgen (two entries, one dead address) | Still timing out, still counted as one machine |
| mbp | Verified |
| nas | Verified, 3,441 MB free memory |
| omarchy | Verified |

The NAS number is the one I keep looking at. It reported 3,855 MB free on the 23rd and 3,441 MB on the 26th, a drop of 414 MB in three days. One reading is not a trend, and I have two data points, so I am not calling it a leak. I am noting that it keeps sliding.

The 08:00 summary said the model server was unreachable, the same verdict as [Sunday's](/hermes-fleet/2026-10-25/). The same summary lists good work: a specialist review that found 15 defects, a 400-second spoken report, and a blog post published and checked live. It also lists what is not done. A browser worker has not been built, and a Telegram player has never been watched playing.

What I did not do: log into any machine. I cannot tell you whether the laptop is asleep or gone. Nothing from this work is committed yet, and a podcast setting is still on the preview value from Saturday.

## Grok Bot's notes caught up and found two new assistants

Grok Bot is the folder of written notes about my fleet of assistants. The daily refresh did not land from the 21st to the 25th, because Sunday's run failed. The 06:20 run on Monday noticed the gap by comparing the live profiles against an audit file saved on the 20th. I wrote about the earlier version of that housekeeping when [the docs first became real](/grokbot/2026-10-16/).

![A list of recent commits to the Grok Bot notes repository, with the newest on Monday morning and a gap before Sunday](grokbot-docs-gap.png)

*A list of commits to the Grok Bot notes repository, saved at 12:12 AM on Oct 27 and showing entries through 06:17 on Oct 26. Look at the dates: the busy run of Oct 20 entries, then very little until the Monday refresh that reads "26 active bots". This is the gap, in git.*

The two new helpers are Political Spam Blocker and Phone Call Bot. The first is meant to clear election mail out of my inbox. The second is meant to place real phone calls for me: cancellations, refunds, reservations. Both are short template profiles. By the refresh's account they have no chat history, which means neither has been shown to work. The README now counts 27 profiles, 26 of them active, and the architecture diagram says 26.

The cautious choices are the part I care about. A STOP reply to a campaign text goes out in my name, so the notes say it waits for my approval. For the phone bot I do not know whether its profile asks before each call or has the mode switched on that calls alone. The notes default to asking first. No phone numbers are in the docs.

Two caveats. The refresh also flagged 26 open work items that had not moved in over a week, and it rebuilt a fleet-map preview for 26 bots but did not publish it. And I read the changelog and bot pages, not the profiles themselves. The claim that both new bots have no history is the refresh's, not something I checked. Full detail is in the [Grok Bot entry](/grokbot/2026-10-26/).

## SnapDog files its proof, with nothing new to ship

[SnapDog](https://snapdog.remnantsecurity.com), the menu bar app for capturing, recording and annotating on a Mac, had no app changes on Monday. What landed were older results that had only lived in a folder on one machine: a scrolling-capture proof from 18 September, notes from the demo-film shoots, and two slide decks. The filing came after [the blank-frame fix from the 25th](/snapdog/2026-10-25/), which was the real change.

The proof is the useful part. The scrolling feature stitches several screenshots taken while a page scrolls into one tall picture. The test drove the real app through five scrolls of 450 points on a page of 24 numbered colour bands, then decoded the result.

| Check | Result |
|---|---|
| Bands in the stitched image | All 24, in order, each exactly once |
| Height of each full band | Exactly 120 pixels |
| Final image size | 1070 by 2810 |
| Unit tests for the stitching code | 6 of 6 passed |
| Scroll with no overlap | Refused, so a bad frame cannot corrupt the picture |

The demo-film notes are a good read for the wrong reasons. The first live run on 16 September filmed Terminal with a permission dialog sitting on top, because installing a freshly signed build had invalidated the screen-recording grant. The shoot script was also reading a half-saved file.

I did not rebuild the decks or rerun any test on Monday. Read every number above as September's. The SnapDog [entry for the day](/snapdog/2026-10-26/) says the same thing.

## The diary that writes this blog failed over twice

The pipeline that produces these pages had its own difficult week, and two screenshots from its logs show it. I am relying on what the screenshots say and on my earlier notes, not on a fresh run: I have not seen the log for the night of the 26th.

![A terminal-style excerpt of the diary runner's log for the night of Oct 25, showing a failed first attempt and a backup model publishing the day](diary-night-run-fallback.png)

*An excerpt of the runner's log for the night of Oct 25, saved at 12:12 AM on Oct 27. The first model's attempt failed because the word for Apple's phone looked like code to a first-paragraph rule; the second model produced four entries across 204 folders and the run ended at 00:48:04.*

That is a rule misfiring on a brand name, and the fallback absorbed it. The log shows the day signed, published through a pull request and deployed. It does not show me fixing the rule, and I have not.

![A terminal-style excerpt showing the first model being killed after an hour on Oct 23, then nightly watchdog lines, the last flagging a changed runtime](diary-killed-run-and-canary.png)

*Two log excerpts saved at 12:12 AM on Oct 27. On the night of Oct 23 the first model ignored a stop signal and was killed after 3,600 seconds plus 120. The watchdog lines for the 23rd and 24th are clean; on the 25th it flagged that the Node runtime had changed.*

Two things in that second image are worth reading slowly. The Oct 23 attempt ended in a failure for a missing overview file, and the backup model started at 01:14:39. And the 25th's pre-flight check caught a runtime path changing from one build to another, with a warning that its launch and NAS permission might not carry over. I did not verify whether it did.

## What I would tell you

Quiet days are for reading the fine print. Three things stand out from this one.

- A machine that writes "FAIL" three days running is doing its job. Fix the laptop, but do not silence the report.
- A notes folder that goes stale for five days will invent nothing, but it will miss two new bots. Check the date on your own documentation before you trust it.
- Put old proof under version control before you need it. SnapDog's scrolling test was five weeks old and had been living on one disk.

Still waiting: the laptop, the unpublished fleet map, the first real run of either new bot, and a decision on the first-paragraph rule.

## Sources

- [SnapDog, the product site](https://snapdog.remnantsecurity.com), opened on 27 October 2026; used for what the app does.
- [Product Diary](https://blog.remnantsecurity.com), the published blog, opened on 27 October 2026.
- Day entries and screenshots from my own project folders and runner logs, as cited in the text above.
