---
project: Books Site
title: Dead Signal Gets a Reader Page and Tracking on the Books Site
summary: The Dead Signal pages on my books site got a proper reader page for the first chapter, tracking of visitors, and a corrected address.
---
The Dead Signal pages on my books website now have a reader page that holds the real opening chapter, and they report where visitors came from. The old sample page forwards to the new one. This is the groundwork for a small advertising test, where a few dollars a day is wasted unless I can tell which ad brought someone in.

Most of this repeats Wednesday's [tracking work](/books-site/2026-10-28/), and the diff lands as an actual commit this time. The new reader page is built from the site's reader template, and it carries the chapter titled "Welcome Aboard", a progress bar and book data for search engines. The old `sample.html` is a redirect stub, and the sitemap lists the new address in its place. The landing page's canonical address drops its trailing `index.html`, and its draft-word-count badge was replaced with "17 days adrift".

A small script, `track.js`, sends three events to PostHog: a landing view, a reader view and a click on the launch-list button. The preorder, privacy and support pages picked up the shared scripts as well, which accounts for the nine-line edits across them. The launch-list button is still an email link, because no mailing-list provider is connected.

Still unchecked: I did not load the pages in a browser, confirm the events arrive, or test the redirect. The chapter text is published on the site, but it is not quoted here.
