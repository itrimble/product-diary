---
project: Grok Bot Wiki
title: The Grok Bot Wiki Gets a Front Door, Then Goes Private
summary: My wiki about the fleet of assistants gained search and a visitor guide on Monday, then I took it off the public internet because it describes my home network.
---
The wiki that explains my fleet of assistant bots became easier to use on Monday, and then it became private. In the morning it gained a guide for first-time visitors, a glossary, grouped bot pages and search. By the evening I had pulled it off the public internet, because a page that explains how my home network fits together should not be readable by strangers. Only my own devices can open it now.

The first change was about orientation. Visitors land on a page that says what the wiki covers, the bots are grouped by job rather than listed flat, and there are short pages for decisions I had made and not written down. The glossary is 45 lines. The renderer grew about 266 lines to handle search and images, and the stylesheet was reworked. I also added a note about when the diagram images can lag behind the text they were drawn from, since they are regenerated separately.

The second change was a reversal. The public deploy now builds the site and stops, with explicit warnings in the readme that the full wiki is private. The public address shows a neutral notice instead, and my site list no longer links to it. A small script serves the wiki on this Mac's Tailscale interface only, so it answers to my own devices and nothing else.

I did not test the private route from outside my network, and I did not audit the older published copies of the pages for what they once exposed. That is tomorrow's check.
