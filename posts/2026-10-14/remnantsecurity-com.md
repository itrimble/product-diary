---
project: Remnant Security
title: Remnant Security's Front Page Becomes Search-Readable
summary: The company's front page was made readable to search engines and link previews, and two game sites went live under their own addresses.
---
Anything that skipped the scripts saw an empty company front page. Crawlers read no words at all, and pasting the address into a chat app gave a blank grey box. That is fixed. Real text, a preview image and a sitemap now sit in the page itself. Two game sites also appeared under the company name: Lightfence, the arcade game once called QixForge, and a preview page for Prism Shift that plays its Awakening soundtrack right in the browser.

The old page weighed 2,391 bytes and had no heading and no image tag for link previews. I put in a block of ordinary text as a fallback, which takes what a crawler can read from nothing to 719 characters, and added structured data describing the organisation and the person. The small sites already had a robots file and a sitemap, so this one got the same. The share image is 1200 by 630 and uses the site's own colours. The text says nothing the page had not already said.

I also dropped a Google Fonts stylesheet. Fonts come from the site itself and the built CSS never referenced Google's, and a side-by-side render of old and new came out identical to the pixel. The old privacy page and the Lectern page used to compete with their real replacements, so they now point to them. I did not delete them, in case outside listings still point there.

Lightfence left its folder on the main site and took its own subdomain, carrying the renamed monsters and a gameplay reel. Later it gained privacy and support pages for the App Store listing, and a sentence stating that the Siri Remote is steered with the touch ring alone. Prism Shift's site opened with marketing, support and privacy pages and a page showing every one of its fifteen skins. Its hosting documentation now points at GitHub Pages. Both games now appear in the apps index.

Afternoon chores covered the rest of the estate. The release gate got fixed and the funnel was tested start to finish. The Window Switcher site's expired certificate was repaired, TilePilot was connected, and the toolchain was written up for agents. Whatever search work remains is in the baseline notes.
