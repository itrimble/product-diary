---
project: AdGenerator
title: AdGenerator Now Feeds on LaunchDeck's Recordings
summary: The ad pipeline can now pull its footage straight from LaunchDeck's recordings of the real apps, with no copying files by hand between the two tools.
---
The pipeline that builds my advertisements no longer needs footage carried to it by hand. A new bridge script takes a recording run from LaunchDeck, the marketing tool that films every app and game, and pours the raw film, the cut clips and the store screenshots straight into the ad builder, framed and ready. The SnapDog reel is the working customer; whichever app gets filmed next is the following one.

`pipeline/from-launchdeck.sh` takes a product's latest run by default, or a named one, and copies its raw recordings, clips and shots into the composer's footage folder, framing the stills in device bezels on the way. The rewritten `pipeline/README.md` now maps the whole chain, from capture through framing to composing and export, and states plainly what already exists and must not be rebuilt. It also admits the standing embarrassment: the English-language SnapDog take, [recorded on 14 October](/snapdog/2026-10-14/), still is not the one facing prospects, because the German master is.

Wiring two of my own tools together is the quiet theme of the day. LaunchDeck recorded [all thirty-three products in the evening](/launchdeck/2026-10-23/), and this bridge means each of those runs is now one command away from becoming ad footage.
