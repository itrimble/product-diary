---
project: Remnant Security
title: Remnant Security's Front Page Becomes Search-Readable
summary: The company's front page was made readable to search engines and link previews, and two game sites went live under their own addresses.
---
The company's front page used to look empty to anything that did not run its scripts. Search engines saw no words, and a link shared in a chat app produced a bare grey card. Both are fixed: the page now carries readable text, a proper preview picture and a map for search engines. Two new sites also went live under the company's name. One is for Lightfence, the arcade game formerly known as QixForge. The other is a preview page for Prism Shift, with its Awakening soundtrack playable in the browser.

Before the change the front page served 2,391 bytes with no heading and no `og:image`. The fix (`e69ff21`) added `robots.txt` and `sitemap.xml`, matching the small sites, and a 1200 by 630 share image built from the site's own colours. A fallback block of real text lifts what a crawler sees from 0 to 719 characters, plus structured data for the organisation and person. I did not add claims the page does not already make.

A Google Fonts stylesheet was removed. The site already hosts its own fonts, the built CSS never used the Google one, and a render of the new build against the live page came out pixel-identical. The stale `/privacy.html` and `/lectern/` pages now point to their real homes instead of competing with them. Neither was deleted, since outside listings may still link to them.

The Lightfence site moved out of a folder on the main site into `lightfence.remnantsecurity.com`, with the renamed monsters and a game reel. It later gained privacy and support pages for the App Store listing, and a line saying the Siri Remote steers with the touch ring only. The Prism Shift site (`839ad9d`) went up with marketing, support and privacy pages and a page showing all fifteen skins. Hosting for it was consolidated on GitHub Pages. The apps index now lists both.

Estate housekeeping filled the afternoon. The release gate was fixed, the funnel exercised end to end, an expired certificate for the Window Switcher site repaired, TilePilot wired in, and the toolchain written down for agents. Remaining search work is recorded in the baseline notes.
