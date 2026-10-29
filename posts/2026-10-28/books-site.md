---
project: Books Site
title: Dead Signal's Book Page Gets Tracking and a New Sample Address
summary: The Dead Signal pages on my books site now report where visitors came from, and the opening sample has moved to a new address.
---
The Dead Signal pages on my books website changed on Wednesday in ways a visitor will mostly not see. The opening-chapter sample moved to a new address, with the old one forwarding people there, and the pages now record which ad or link a visitor arrived from. The point is to make a small advertising test readable: a few dollars a day tells me nothing if I cannot say which ad did the work.

The old sample page is now a stub with a redirect and a "noindex" tag, and the sitemap lists the new `/read/dead-signal/` instead. The landing page's canonical address dropped its trailing `index.html`, and it gained structured data describing it as a book by me. The hero's counter changed from "209k+ draft words" to "17 days adrift", which is the story's own clock rather than a word count.

The new `track.js` reads the usual campaign tags from the link, plus short `src` and `creative` overrides for newsletter or podcast links. It sends three events to PostHog: landing view, reader view, and a click on the launch-list button. That button is still an email link because no mailing-list provider is connected, so the script records the click before the mail program opens. The address itself is never captured.

What I did not do: load the pages in a browser, confirm the events arrive, or check the redirect. The screenshot step only managed an unstyled copy of the site's front page, so I left it out. Nothing is committed or deployed.
