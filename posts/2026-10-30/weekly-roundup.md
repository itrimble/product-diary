---
project: Weekly roundup
title: "Week of October 23: Release Checks, a Lost Laptop, No Sales"
summary: A week of release checklists and honest paperwork. Night Chorus failed its first release check, SnapDog got a demo film, one laptop went missing for six mornings, and nothing sold.
stats: Diary posts = 46 | Diary words = 22,571 | Site page views Oct 19-25 = 19 | App units sold Oct 19-25 = 0 | Laptop missed mornings = 6
format: longform
---
This was a week of getting ready to ship rather than shipping. My next game, Night Chorus, got a release checklist and failed it four ways on the first run. SnapDog got its first demo film. My house assistant learned to send each job to a different model, then lost track of one laptop for six mornings running. Nobody bought an app.

There was no roundup last Friday. The shared computer that runs my assistants was offline from the evening of 20 October until 25 October, so that week's run had nothing to run on. This one covers the diary days from Friday 23 October to Thursday 29 October, which is everything published since the gap closed.

## The week in numbers

Every figure here comes from this week's diary entries, my growth assistant's weekly ledger, the site analytics or the daily assistant audits. Where I have no number, the table says so.

| What | Before | After | Source |
|---|---|---|---|
| Night Chorus release check | no check existed | 4 failures on the first run | [Oct 23 long read](/night-chorus-release-path-phone-alerts/2026-10-23/) |
| Shared instructions for coding sessions in my projects folder | 270 lines, 12,743 bytes | 102 lines, 6,580 bytes | Oct 23 long read |
| Model routes my house assistant can use | 1 default | 5, each tested once | [Oct 24 long read](/hermes-fleet-model-routing/2026-10-24/) |
| House computers answering the nightly head-count | 4 (Oct 23) | 3 of 5 (Oct 24 to 29) | Hermes Fleet entries |
| NAS free memory | 3,855 MB (Oct 23) | 3,317 MB (Oct 29) | Hermes Fleet entries |
| Assistant profiles in the daily audit | 25 (Oct 20) | 27, 26 of them active (Oct 26) | daily audits |
| Site page views, a week | 52 (Oct 12 to 18) | 19 (Oct 19 to 25) | weekly ledger |
| App units sold, paid or free | 2 free (Oct 12 to 18) | 0 (Oct 19 to 25) | weekly ledger |
| Diary posts published | | 46 posts, 22,571 words | this repo, counted Oct 30 |

The page views fell back to where they were before the Lightfence page drew a crowd. The 52 was the exception, not the 19.

## Night Chorus gets a release path and fails it

Night Chorus is the game this diary used to call Prism Shift. Lightfence already had a release script. Night Chorus had nothing, so on Friday I gave it three: a read-only check, a gate that records a pass for one exact build, and a release script that stops at the plan unless I tell it to go on.

![A terminal window showing the Night Chorus release check with four FAIL lines and a final FAIL (4)](weekly-roundup-night-chorus-preflight.png)
*The Night Chorus release check, first run on 23 October 2026. The two dead web addresses are the old Prism Shift privacy and support pages; the game's site has moved.*

It failed in seconds. Six files had uncommitted changes. The privacy and support links still pointed at the old Prism Shift address, which no longer answers. And no test gate had passed for that build. A dead privacy link alone would have stopped an App Store submission, and I would have found it in review instead of on my own desk. Three 1.0 versions, for iPhone, Apple TV and Mac, are prepared in App Store Connect. Nothing has been submitted.

The same Friday the nightly diary got alarms that reach my phone. A missed night used to be found by me noticing a gap. Now the Mac mini checks itself at 23:30, sends an all-clear at 07:30, and the NAS checks the live blog at 08:30 and speaks up only if a day is missing.

## My assistant picks a model for each job

On Saturday my house assistant, Hermes, stopped sending everything to one model. It now has five routes: a fast default, a cheap one for small lookups, a careful one for work that is easy to get wrong, one for code, and one that runs on the Mac on my desk and never sends a word out of the house.

![A terminal window listing the five delegation routes with their models and providers](weekly-roundup-model-routes-table.png)
*The five routes as configured on 24 October 2026. The local figure on the last line disagrees with the 134.5 seconds the long read reports for the working local route, and I have not rerun it to settle which is right.*

![Bar chart of seconds to answer one test request per route: coding 2.8, cheap 4.5, careful 8.1, local 134.5](weekly-roundup-model-route-times.png)
*Seconds each route took to answer one test request on 24 October 2026, as reported in that day's long read. Chart made on 30 October 2026. One run each, so read it as a first look, not a benchmark.*

The local route is about 17 times slower than the slowest cloud route. That is the price of keeping a job in the room. The more useful lesson was the failure: the local route first came back answered by the default model, so it looked fine while never being used. The check that caught it was reading which model the system recorded, not whether an answer came back. I still have not compared the quality of the routes on real work. That is the first of the model experiments worth running.

## Hermes gets a web page and loses a laptop

On Sunday Hermes put up its own web front end, reachable from my phone inside my private network, in about eight minutes. It added a new listener instead of moving anything that was already there, and checked that the existing routes were unchanged before and after. It will not survive a reboot yet, and I have not logged in from the phone.

![The Hermes WebUI login screen with its wordmark and Chat heading](weekly-roundup-hermes-webui-login.png)
*The first screen of the Hermes web front end, captured on 25 October 2026. The address and password are left out on purpose.*

The rest of Hermes's week was the same failure every morning. The 03:01 head-count reached three of the five computers it knows. The laptop I call neo, fully verified on the 23rd, has been a failed name lookup since, six mornings in a row by Thursday. From the 25th on, the 08:00 health report said the local model server was unreachable every morning. On Sunday evening Hermes's spoken summary also crashed on a broken speech engine. I have not logged into the laptop, so I cannot say whether it is asleep or gone. That is next week's first job, not another survey.

![Line chart of NAS free memory falling from 3,855 MB on Oct 23 to 3,317 MB on Oct 29](weekly-roundup-nas-free-memory.png)
*Free memory on the NAS as reported in the Hermes Fleet entries from 23 to 29 October 2026. Chart made on 30 October 2026. There is no reading for the 24th or 25th, and one entry called it free space.*

The NAS number is the one I keep looking at. It lost 538 MB in six days, with one small bounce on the 28th. It is a slow slide, not an outage, and two weeks of readings would tell me more than this one.

## SnapDog gets a demo film

SnapDog, my Mac app for screenshots and screen recordings, did not change much as an app this week. It stopped losing a whole recording to a single blank frame on Sunday, a twelve-line fix that went in without a new test. The bigger news was a film. On Tuesday it got its first complete demo: 129.4 seconds, silent, built to autoplay muted on its website, plus a 20-second trailer.

![A contact sheet of the SnapDog demo film, from the opening card to the closing card with the website address](weekly-roundup-snapdog-film-contact-sheet.png)
*A contact sheet of the SnapDog demo film from a render inspected on 24 October 2026. It tells one story: three coworkers ask one person for help, who answers with a capture, an arrow and a recording.*

The film shows four features that I can prove on camera and leaves the rest out. Looking at single frames caught a caption sitting on top of the very error a scene was meant to show, which a duration check would never have found. The film is not on the website yet.

On Wednesday the ad research found my own notes were wrong. They still called SnapDog unreleased and waiting for review. The [App Store listing](https://apps.apple.com/us/app/snapdog-capture-annotate/id6783121166) shows it on sale at $14.99, version 1.2.1, since 25 September. Lectern's ad brief on Thursday found the same kind of drift: its README names version 1.1 where the store has 1.2. Both briefs now carry a table of what the copy may and may not claim. The lesson I keep relearning is to read the live store page before writing a word about the product.

## Lightfence, Epochs of Power and the rest

Lightfence 1.3 repainted every picture in the game at high resolution and went to Apple's review; the [Oct 25 story](/hermes-webui-live-fleet-loses-voice/2026-10-25/) has it with review since Thursday the 22nd. Its Mac build for Steam now exists as a 295 MB unsigned package that built in 122 seconds and peaked at 257 MB of memory. Nobody has launched it, because it is unsigned. Steam itself is untouched.

![The Lightfence title screen on a phone, with the repainted logo and Continue, New Campaign and Endless buttons](weekly-roundup-lightfence-title-hd.png)
*The Lightfence title screen with the repainted 1.3 art, captured on a phone simulator on 24 October 2026.*

Epochs of Power, my research toward a touch strategy game, got its first commits on Thursday: 2,217 lines of notes on how the 2000 game it studies really works, including a tie that the old game breaks by memory address. The Dead Signal book page gained campaign tracking, and Remnant Academy gained a sales-tax switch that is off and a payment fix that has not been tested. None of those three is deployed.

## The sales

Nothing sold. My growth assistant's ledger for 19 to 25 October shows Apple reporting no sales on any day, paid or free, with no money spent on ads. It calls that the fifth straight week with no sale it can trace to anything we did. One tagged visit arrived all week, from a SnapDog reply on X, and nobody clicked through to the App Store.

![Bar chart of weekly page views: 21, 52, 19, and 14 for the week to Friday Oct 30](weekly-roundup-pageviews-by-week.png)
*Page views across the Remnant Security sites by week, from the weekly ledger, with 26 to 30 October read from PostHog on 30 October 2026. Chart made the same day. Our own checks are counted too, and this blog has no analytics.*

This week so far there were 14 page views: eight on the SnapDog site from six visitors, and six on the company front page. Apple's sales for 26 to 29 October have not been pulled yet; Monday's ledger will have them.

## The shop behind the diary

| Day of work | Posts | Words | Nightly writer |
|---|---|---|---|
| Fri Oct 23 | 16 | 7,163 | Z.ai, plus three long reads written by hand |
| Sat Oct 24 | 6 | 2,471 | Claude, plus the model-routing long read |
| Sun Oct 25 | 5 | 2,833 | Z.ai |
| Mon Oct 26 | 4 | 2,323 | Claude |
| Tue Oct 27 | 4 | 2,576 | Claude |
| Wed Oct 28 | 5 | 2,453 | Claude |
| Thu Oct 29 | 6 | 2,752 | Claude |

![Bar chart of diary words by day, with Friday 23 October at 7,163 words and the other days between 2,323 and 2,833](weekly-roundup-diary-words.png)
*Diary words published by the day the work happened, 23 to 29 October 2026, counted from the repository on 30 October 2026. Friday is tall because it carried three hand-written long reads.*

The nightly run failed over twice this week and still published. On the 23rd the first model ignored a stop signal and was killed after an hour, and a backup finished the day. On the night of the 25th a first-paragraph rule mistook the word iPhone for code, and the backup wrote the day instead. I have not fixed that rule.

The assistants changed too. The notes caught up with two new ones, one to clear election mail and one to place phone calls for me, and neither has been given a first task. On Monday afternoon eleven assistants were renamed to a name and a job title. The daily audit found no other changes all week.

## Next week

From the shop's open-work list and this week's entries:

- Log into the missing laptop and find out whether it is asleep or gone, then make the morning check mean something again.
- Fix the two dead Night Chorus links, commit the work and get a gate pass before any submission.
- Wait on Apple's review of Lightfence 1.3, and merge its branch back to main once review settles.
- Build and upload SnapDog 1.2.2, still waiting since 16 October, and put the demo film on the website once I approve it.
- CyberSim 1.1.2 was rejected on 19 October, so its $9.99 full version still cannot be bought. It needs a fixed build.
- Deploy and test the Dead Signal tracking, so the next few dollars of ads can be measured.
- Give the two new assistants their first tasks, with an approval step before any text or call goes out.
- Run the first side-by-side model comparison: the same job through two routes.

## Sources

The product pages, opened on 30 October 2026:

- [SnapDog on the Mac App Store](https://apps.apple.com/us/app/snapdog-capture-annotate/id6783121166), the listing the ad research checked.
- [SnapDog's website](https://snapdog.remnantsecurity.com/), where the demo film is meant to go.
- [Night Chorus's website](https://nightchorus.remnantsecurity.com/), the new home of the game's privacy and support pages.
- [Lectern's website](https://lectern.remnantsecurity.com/), whose ad brief found the README out of date.

Earlier on this blog:

- [The last roundup, the week of 12 October](/weekly-roundup/2026-10-16/).
- [Night Chorus gets a release path](/night-chorus-release-path-phone-alerts/2026-10-23/), [model routing](/hermes-fleet-model-routing/2026-10-24/), [Hermes WebUI goes live](/hermes-webui-live-fleet-loses-voice/2026-10-25/), [the missing laptop and two new assistants](/hermes-fleet-laptop-grok-bot-snapdog-proof/2026-10-26/), [SnapDog's first demo film](/snapdog-first-demo-film-hermes-fleet-fails/2026-10-27/), [Dead Signal ad tracking](/dead-signal-ad-tracking-snapdog-notes-fixed/2026-10-28/) and [Epochs of Power research](/epochs-of-power-research-snapdog-slide-lectern-ads/2026-10-29/).

What I did not verify: the sales and traffic figures come from my growth assistant's reports and one PostHog read, not from a fresh App Store pull. The laptop, memory and model numbers come from the diary entries, and I reran none of the checks behind them.
