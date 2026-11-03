---
project: Hisense TV Tune-up
title: Hisense Podcasts App Fixes Tabs, OK Key and Empty Shelves
summary: The podcasts app on my television had three faults that only showed on a cold start: unreachable tabs, a dead OK button, and empty shelves.
---
The podcasts app on my Hisense television had three faults that stayed hidden until I started it from scratch. The remote could not stay on the tabs along the top, pressing OK on a show cover did nothing, and the shelves on the front page were empty. All three are fixed, following [Sunday's interface overhaul](/hisense/2026-11-01/). The faults turned up because the television lost its Apple sign-in that day, which forced the app to rebuild its library from my private feeds.

![The Shows grid on the television with eight covers, the first one selected](hisense-podcasts-shows-grid-six-up.png)
*The Shows grid on the Hisense television, retaken on 2 November 2026 with only private feeds loaded; the white outline marks the selected cover.*

The causes were small. Every redraw of the shows grid ended by grabbing the focus, so the highlight jumped off the tab bar about 28 milliseconds after each move. A redraw now takes focus back only if the grid already held it. OK did nothing because a cover could be focused but not clicked, so each cover and episode row now carries its own click. The empty shelves came from the private feeds being merged in only after Apple's own library finished refreshing, and that refresh waits for a sign-in. The merge now runs first.

Two more fixes went in. The on-screen clock had a habit of scheduling new updates without cancelling old ones, so callbacks could pile up over a long evening. A small ticker class now allows one at a time, and a test runs 2,880 ticks, a day's worth at 30 seconds, and checks there is always exactly one pending. The phone keyboard page used to say "sent" even while the television was frozen. It now waits up to three seconds for the screen to confirm, and says "check the TV" otherwise.

The playback service also got a recovery pass, and navigation inside private feeds was repaired. I wrote all of it into the tune-up notes. The memory table in those notes still says "not yet remeasured" for all four states, so I have no new memory figures to quote. I did not run the Java tests tonight.
