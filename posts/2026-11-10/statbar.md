---
project: StatBar
title: StatBar Weather Learns to Follow Your Mac and Shows a Forecast
summary: StatBar's weather now follows the Mac to a new city if you ask it to, and shows today's high, low and chance of rain.
---
StatBar's weather had a flaw I only noticed by travelling. I set it to Gonzales, Louisiana months ago, drove to Harrisburg, Pennsylvania, and the menu bar kept cheerfully reporting Louisiana. On Tuesday I fixed it. There is now an opt-in "use my location" button, the weather can follow the Mac when it moves, and the menu shows today's high, tonight's low and the chance of rain. It targets 1.11.0, which I have not released yet.

The privacy trade-off needed a decision first. StatBar used to promise it never asked for Location. Now the promise is that it asks only if you click, once, and never tracks you in the background. I wrote that as a design note and a 1,184-line plan before touching code, then spent the morning building it. Location is a one-shot request with a timeout, behind the click. There is no always-on permission and no continuous updates. Following refreshes the place every 30 minutes and after the Mac wakes. I chose not to use Apple's reverse geocoding, because it would send your coordinates to a second service for a cosmetic gain. The US weather service names the place itself, and elsewhere the row says "Current location".

Most of the commits were the weather being wrong in new ways. The place now resolves before the fetch. A late response for an old place is discarded, and a moved place resets its name. The name resolves reliably for a cached or moved place. The status line decides from the actual permission, and the test harness heals a run that was interrupted halfway.

The evening went on copy. The guide, sales page, site and README all said "no Location permission", so I rewrote them in two passes to say the same true thing everywhere. The first pass missed seven spots, which the second caught.

Not verified: I did not run the app on screen or travel anywhere to watch it follow me. The test file was extended, but I did not run it tonight.
