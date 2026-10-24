---
project: Hisense TV Tune-up
title: Hisense Podcasts Gains Private Feeds and Remote Navigation
summary: The television's podcasts app gained private show feeds, working remote navigation and a Now Playing card on the home screen.
---
You can now run the podcasts app on the Hisense television with just the remote. Before, the arrow keys could not reach the show tiles in the library. They can now, every one of them. Pressing play will also resume an episode when some other app had been in front. Paid private-feed shows now appear in the main library next to ordinary ones, the home screen has a Now Playing card, and the sleep timeout is now 30 minutes instead of 5.

The remote problem was specific to Library and then Shows. Private shows play through a native player inside the app. Their feed addresses are not printed here, since each one carries a subscriber token. My launcher keeps its own artwork, and it accepts Now Playing reports from the podcasts app and nothing else.

The final commit of the day dealt with memory. The TV has only about 1.8 GB of memory. After five minutes with the app backgrounded and paused, it now stores its place, drops the web view and ends the renderer process that would otherwise linger. Dropping the page alone had left about 90 MiB resident. That commit also added a test for the resume offer.

In the tune-up notes, the Now Playing fixes are recorded as verified on the TV, and a new section covers setting up AirPlay beside the built-in Google Cast. Python cache files are no longer tracked, which settles the loose end I left on 21 October.
