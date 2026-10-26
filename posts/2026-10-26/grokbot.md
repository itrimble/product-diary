---
project: Grok Bot
title: My Nightly Diary Learns to Fail Over and Watch Itself
summary: The nightly diary that writes this blog now hands the night to a second model when the first one stalls or breaks a rule, and a watchdog checks before midnight that the job will start at all.
stats: Pull requests on Oct 23 = 16 | Entries rewritten = 55 | Nights a backup model wrote the day = 2 | Active bots = 26
format: longform
---
At 12:17 on Monday morning, the machine that writes this blog threw away a finished diary entry because it used the word for Apple's phone in its opening paragraph. A rule meant to keep code names out of the first paragraph mistook the brand for one. Nothing broke, though. A second model picked up the night, wrote the day again, and the entry was live by 12:48. A week ago that rejection would have meant no post at all.

## How a code-name rule rejected the word iPhone

The diary runs on the Mac mini at 12:12 every night. It surveys the day's project folders, asks a model to write one short entry per project plus a longer daily story, and then runs a validator that enforces the entry contract before anything is signed and published. Claude goes first. When its attempt fails the contract, the runner saves the attempt under `logs/rejected/` and tries the next provider in `bin/providers.conf`, which right now is GLM 5.3 from z.ai, with DeepSeek after it.

Sunday night's rejection is a good example of the validator being strict in the wrong place. Claude's Lightfence entry opened with the phone's brand name, and the check for camelCase identifiers flagged it as code. Every other entry passed. The fallback rewrote the whole day, passed with four entries across 204 surveyed folders, then wrote the daily story, [the Hermes WebUI piece](/hermes-webui-live-fleet-loses-voice/2026-10-25/), and published it through a pull request. The [Lightfence entry that finally ran](/qix-swift/2026-10-25/) is the fallback's version, not Claude's.

![A terminal-style excerpt of the diary runner's log showing Claude's attempt failing on the word iPhone and the z.ai model producing and publishing the day](diary-night-run-fallback.png)

*An excerpt of the runner's log from the night of Oct 25, copied from the mini at 7:30 AM Central on Oct 26. The red line is the false positive; the green lines are the fallback's day passing, being signed and going live at 12:48 AM.*

The fix for the false positive is not in yet. The honest trade-off is that a strict first-paragraph rule catches far more real jargon than it misfires on, and the fallback absorbed this misfire. But the rejected attempt was a fine entry, and the rule should learn that a brand name is not a variable.

## Sixteen pull requests on a Thursday

Most of what made Monday's recovery possible landed on Thursday, Oct 23. Between 2:02 PM and 10:25 PM Central the diary's repository took 16 pull requests. A few were articles. Most were the diary changing how it works.

The voice changed first. The nightly prompt now asks for first-person writing in the MacStories style and tells the model to recover screenshots from the day's own work. Then the daily long-form story arrived, with structured data and a sitemap that records when each page last changed. By evening every screenshot had to carry a caption, entries from Oct 24 on needed a real title, commit hashes left the running text, and the last pull request of the night rewrote all 55 earlier nightly entries in the same house voice.

The more important changes were about the job surviving its own machine. On the night of Oct 22 the job never started: a Homebrew upgrade of the JavaScript runtime the launcher uses voided its permission to launch, and that day's entry had to be run by hand at 9:35 the next morning. Thursday's watchdog is the answer. It runs at 11:30 PM to check whether the midnight job will start, reloading the launch agent when that is the fix, and again at 7:30 AM to check that yesterday's day is live. The morning check sends a high-priority phone alert through ntfy when something is wrong, or one quiet OK line when it is not. A separate check on the NAS alerts when yesterday is missing from the live site, so a dead mini cannot hide its own failure.

![A terminal-style excerpt showing Claude being killed after an hour on the night of Oct 23, then three nights of watchdog pre-flight lines, the last flagging a changed runtime](diary-killed-run-and-canary.png)

*Top, the runner's log from the night of Oct 23, when Claude ran past its one-hour limit and was killed before writing the day's overview, and the z.ai model took over at 1:14 AM. Bottom, the watchdog's pre-flight lines for Oct 23 to 25. Both copied from the mini on Oct 26. Sunday's warning about a changed runtime came 42 minutes before a run that started on time.*

One more change looks small and is not. The diary used to run from its folder inside `~/projects`, which is mirrored two ways to the laptops. The runner's own notes say what that cost: a branch checked out on a laptop became the mini's branch, and two sync agents kept rewriting a 59 MB cache every minute. It now runs from a private clone outside the mirrored tree and publishes through GitHub like everything else. The cost is one more copy of the repository to keep in mind.

## Two backup nights, and one I am not proud of

The fallback earned its place twice this week. On the night of Oct 23, Claude ran for its full hour, ignored the request to stop and was killed after two more minutes, leaving no overview for a day where the survey had flagged 20 folders. The z.ai model took over at 1:14 AM, wrote the entries and the daily story, and the day was merged at 2:08 AM. On Sunday night it covered for the iPhone misfire. On the other three runs this week, Claude wrote the day itself.

The [model routing piece from Oct 24](/hermes-fleet-model-routing/2026-10-24/) made a related point about my assistant: a route can look configured and still not answer with the model you think. The diary log is where I check the same thing here. Every night names which provider produced the day, and the pull request titles now say it too, "via claude" or "via zai".

The night I am not proud of is this entry's own. The scheduled Grok Bot entry has not published since [the Oct 20 post](/grokbot/2026-10-20/), and Sunday's attempt failed outright. The nightly diary kept the blog going every day in between, which is exactly what the watchdog and fallback were for. My own morning entry had neither.

## The fleet grew by two while the notes went quiet

The same gap showed up in the house notes my assistants keep about themselves. The daily documentation refresh did not land from Oct 21 through Oct 25; Sunday's run failed, and the only commit in those five days was an afternoon project scan. When the refresh came back at 6:17 this morning, it found two new bots created since the last refresh.

![A terminal-style list of the house documentation repository's commits since Oct 20, showing a run of commits on Oct 20, one on Oct 25 and three on the morning of Oct 26](grokbot-docs-gap.png)

*The documentation repository's commit list from Oct 20 to Oct 26, in Central time, captured on the box at 7:30 AM Oct 26. Nothing landed between Tuesday night and Sunday afternoon.*

Political Spam Blocker is meant to clear election mail out of my inbox and get me off campaign lists. Phone Call Bot is meant to make real calls for cancellations, refunds and reservations. Both are short template profiles with no chat history yet, and the fleet now counts 26 active bots. The notes treat both carefully. A STOP reply to a campaign text is still a message sent in my name, so it waits for my yes, and the notes default the call bot to asking before each call, because which mode its profile has switched on is not yet verified. The refresh also flagged 26 tracked work items that had not moved in more than a week, which is its own kind of honesty.

## What the week taught the machinery

The diary that runs at midnight now has a backup writer, a watchdog that checks before the job runs and after it should have finished, and an off-site check that does not trust the mini to report on itself. My morning entry and the documentation refresh had none of that, and they were the two things that went quiet. The lesson is not that the nightly job is clever. It is that the parts with a second path kept working, and the parts with one path did not.

## Sources

- The diary's code and history: [the product-diary repository](https://github.com/itrimble/product-diary), including [the watchdog pull request](https://github.com/itrimble/product-diary/pull/62), [the private clone change](https://github.com/itrimble/product-diary/pull/64), [running beside hand-written posts](https://github.com/itrimble/product-diary/pull/67), [the rewrite of 55 entries](https://github.com/itrimble/product-diary/pull/73) and [the Oct 25 entry published via z.ai](https://github.com/itrimble/product-diary/pull/77). Read on Oct 26.
- The live blog: [blog.remnantsecurity.com](https://blog.remnantsecurity.com), checked on Oct 26 for every internal link above.
- The runner and watchdog logs and the provider list were read on the mini on Oct 26. The bot counts and the documentation gap come from the house documentation repository, which is private. I did not check whether the watchdog's phone alerts were actually delivered on Sunday night.
