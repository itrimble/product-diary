---
project: StatBar
title: StatBar Adds Local Weather and Fuller Mac Readouts
summary: The Mac menu bar monitor can now show the local weather, details about your Mac, and fuller battery, graphics and network readouts.
---
StatBar now tells you more about the computer it sits on. A new header at the top of its dropdown names your Mac, with a picture in the right colour, and lists its chip, memory, startup disk and system version. The battery section shows how healthy the battery is and how many charge cycles it has had. Weather is available as an option, switched off until you turn it on. The bar also draws its own dark backing now, so the coloured readings stay legible when your wallpaper turns the menu bar light.

All of this is in one commit, `6f64666`, mostly `Sources/main.swift` (about 930 new lines), with new tests. Weather comes from the US National Weather Service in the US and from MET Norway everywhere else, which is also the fallback. Open-Meteo was avoided on purpose because its free tier is non-commercial and StatBar is sold. You pick a city with as-you-type suggestions from Apple's map completer, and only coordinates are stored. Weather appears as a dropdown row and an optional bar column.

The This Mac header reads the marketing name and the model code plus housing colour to pick artwork. Battery adds cycle count, temperature, system and battery power, and adapter watts. The GPU view gains renderer, memory and core count. The CPU tab shows per-core bars with averages for efficiency and performance cores, and the network tab adds Wi-Fi signal, link rate and channel.

Tests cover the weather parsers, power formatting, the weather bar column and the legibility checks, which were rewritten for the new backing plate. I did not run them. There is no picture tonight.
