---
project: Daily Story
title: Dead Signal Gets Ad Tracking as SnapDog Notes Get Fixed
summary: Dead Signal's book pages learned to track where ad visitors come from, and my own SnapDog notes turned out to be wrong about its release.
format: longform
stats: Hermes laptop misses in a row = 5 | SnapDog ad brief words = 1750 | Academy ad brief words = 1900
---
Wednesday shipped no new software, but three things changed that matter to anyone who wants to sell something. My Dead Signal book pages now record which ad brought a reader in, my SnapDog advertising notes were corrected after I found they described a released app as unreleased, and my house assistant again failed to find one laptop.

I will say up front that most of this is uncommitted and undeployed. I checked the public pages tonight, and they do not show the new work yet.

## Dead Signal Book Pages Learn Where Visitors Came From

The advertising test for Dead Signal runs on a few dollars a day, the same small-budget problem I wrote about in [Learning to Sell, Part 1](/learning-to-sell/2026-10-18/). That is too little to learn anything from unless I can say which ad did the work. So the [books site entry](/books-site/2026-10-28/) is about measurement, not looks.

The opening-chapter sample moved to a new address, and the old one is now a stub that forwards readers and asks search engines to ignore it. The sitemap lists the new address. The landing page's canonical address lost its trailing file name, and it gained structured data describing the novel as a book by me. A small script reads the campaign tags from a link, plus two short overrides for newsletter or podcast links, and sends three events: a landing view, a reader view, and a click on the launch-list button. That button is still an email link, since no mailing-list provider is connected. The script records the click before the mail program opens. It does not capture the address.

One edit is purely editorial. The hero counter said "209k+ draft words". It now says "17 days adrift", which is the story's own clock.

![The Dead Signal share card, a cruise ship under a dark sky beside the title](dead-signal-share-card-tagline-clipped.png)

*The Dead Signal share card from the books site, file saved 28 October 2026 at 07:07. Look at the strapline under the ship on the cover: it is cut off at both ends, "200 PASSENGERS" and "NO RUL". It reads 1,200 on the left of the card, so the cover art clips the figure. I have not fixed it.*

What I did not do matters more than what I did. I did not load the pages in a browser, I did not confirm that any event reaches PostHog, and I did not test the redirect. The automatic screenshot step produced only an unstyled front page with broken cover images, so I rejected it. I also opened the public Dead Signal page tonight and it still shows "209k+", which fits with nothing having been deployed.

## SnapDog Ad Research Finds My Notes Were Wrong

SnapDog itself did not change. What changed is what I say about it. While writing a new batch of ad copy, I checked the live Mac App Store listing and found that my project notes still called the app unreleased and waiting for review. The [SnapDog entry](/snapdog/2026-10-28/) records that it has been on sale since 25 September.

I opened the [App Store listing](https://apps.apple.com/us/app/snapdog-capture-annotate/id6783121166) and the [product site](https://snapdog.remnantsecurity.com/) myself. Both show $14.99 and the listing shows version 1.2.1. The corrections table at the top of the new ad file lists what the copy may and may not claim:

| Claim in my notes | What the store shows |
|---|---|
| Coming soon, in review | On sale since 25 September |
| Launch-week price of $9.99 | Not on the page, so no ad uses it |
| 19 upload destinations | A shorter named set, so the copy follows the listing |
| Ratings | None yet |

The research found a real gap. A roundup of alternatives to a rival capture tool, updated on 24 October, covers nine competitors and does not mention SnapDog. Its readers leave the rival over the cloud, the price, or a wish for a better recorder. So the positioning is a one-time purchase, local-first, no account. There are five audiences and several variants, each tagged with a channel and a buyer stage.

The limits are plain. The market claims come from search snippets and forum threads, and the file says so. I did not open every link, and the file makes no traffic or market-share claims. My local checkout is also 362 commits ahead of the public repository, so anything that exists only locally is marked as not shipping.

![SnapDog's Capture settings window showing display, window and region options](snapdog-capture-settings-window.png)

*SnapDog's Capture settings pane, from the product's own website media. This is an older capture, saved 29 September 2026, and not from Wednesday. It shows window highlight color, region preview style and image format.*

I also could not photograph the app that night. The build step failed because the simulator it wanted was not available. That is why the pictures here are older ones.

The day before, the [first SnapDog demo film](/snapdog-first-demo-film-hermes-fleet-fails/2026-10-27/) had a scripted page fail on purpose to show how the app records a problem. This is a frame from that film.

![A demo web page with a draft preview and a red box reading Preview failed, Code PREVIEW-47](snapdog-demo-film-preview-failed-frame.png)

*A frame from the SnapDog demo film made on 27 October 2026. The page is fictional demo content built for filming. Notice the dock along the bottom edge, which shows the film was cut from a real screen recording.*

## Hermes Fleet Misses the Same Laptop Again

For a fifth morning running, my house assistant could not reach the laptop it calls `neo`. The [Hermes Fleet entry](/hermes-fleet/2026-10-28/) has the numbers. The 03:01 survey on the 28th reached three of the five machines. The laptop is still a failed name lookup, and two ad-generation entries still time out against one address. The other three answered and are marked verified. This follows the [fourth miss](/hermes-fleet/2026-10-27/) the day before, and the [laptop story from the 26th](/hermes-fleet-laptop-grok-bot-snapdog-proof/2026-10-26/).

The number I watch is free memory on the NAS.

| Date | Free memory on the NAS |
|---|---|
| 23 October | 3,855 MB |
| 26 October | 3,441 MB |
| 28 October | 3,423 MB of 7,685 MB |

A slow slide, not a cliff, but it only goes one way. The morning summary still says the local model service is unreachable, for the fifth time in a row.

One real edit sits in the working tree: two new podcast settings, a preview mode and a 120-word minimum. I did not run the podcast engine, and I did not log into any machine, so I cannot say whether the laptop is asleep or gone.

## Remnant Academy Adds a Tax Switch and a Payment Fix

The [Remnant Academy entry](/remnant-academy/2026-10-28/) is the least visible change. The checkout gained a switch for charging sales tax, and it is off. I want it off until I have confirmed where I am registered and how each course is classified. The academy still shows a beta list rather than a buy button, so nobody is paying yet.

The second fix is in the payment webhook. A duplicate event is an expected error that should be ignored. The old check read the error code without first confirming an error existed. The new one throws only for a real error that is not a duplicate. I did not run a test payment, so this is a code-reading fix, not a verified one.

I also wrote a 1,900-word ad brief for the academy. It tells every ad to point at the beta list, never at a purchase.

## What I Would Tell You

Check the live page before you write the copy. I wrote ad notes for a shipped app from notes that said it was not shipped, and only a look at the store caught it.

Measure before you spend. Tagging a link costs nothing, and without it a small ad budget is a guess.

A fifth identical failure is information. I have not logged into the laptop, and that is the next step, not another survey.

Finally, nothing here is deployed, and several parts are untested. Treat the tracking, the redirect and the payment fix as written, not working. I left the Evaluations-Framework-CLI folder out, since it held only a generated template and marketing files.

## Sources

- [SnapDog on the Mac App Store](https://apps.apple.com/us/app/snapdog-capture-annotate/id6783121166), opened 29 October 2026 to confirm version and price.
- [SnapDog product site](https://snapdog.remnantsecurity.com/), opened 29 October 2026 to confirm the $14.99 price.
- [Dead Signal on the books site](https://books.remnantsecurity.com/dead-signal/), opened 29 October 2026; it still showed the old word-count counter.
