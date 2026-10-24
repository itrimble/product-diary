---
project: Hisense TV Tune-up
title: Hisense Podcasts Gains Private Feeds and Remote Navigation
summary: The television's podcasts app gained private show feeds, working remote navigation and a Now Playing card on the home screen.
---
The podcasts app on the Hisense television got easier to use with only the remote. You can now reach every show tile in the library with the arrow keys, and the play button picks up an episode even when another app was in front. Shows from a paid private feed now sit in the main library next to the regular ones. The home screen shows a Now Playing card, and the sleep timeout was raised to 30 minutes.

The app is `src/apple-podcasts-tv`. Navigation was fixed in `nav.js` (`6446bac`, `fedfc71`). `PrivateFeeds.java` and `private-feeds.js` handle the private shows (`fedfc71`, `bcc91bd`). I am leaving out the feed addresses, which carry subscriber tokens. The launcher keeps its own artwork, and the home screen accepts Now Playing reports only from the podcasts app (`89744dd`).

The last commit (`7c39619`) releases the idle podcasts renderer so the app gives its memory back when nothing plays. `Playback.java` and `MainActivity.java` changed, and the resume offer got a test, `resume-page.test.mjs`. The TV only has about 1.8 GB of memory, so this matters. Section 20 of `docs/HISENSE-A4-TUNEUP.md` records the Now Playing fixes as verified on the TV. Another section now covers AirPlay setup alongside the built-in Google Cast. Compiled Python cache files are no longer tracked (`d2c5eb0`), which closes the loose end from the 21 October entry.
