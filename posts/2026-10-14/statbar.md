---
project: StatBar
title: StatBar Adds Local Weather and Fuller Mac Readouts
summary: The Mac menu bar monitor can now show the local weather, details about your Mac, and fuller battery, graphics and network readouts.
---
StatBar has become more talkative about its own computer. A new header leads the dropdown: the Mac's name, an image in the correct colour, and beneath it the chip, memory, startup disk and operating system version. The battery section reports battery health and the number of charge cycles. Weather exists too, but stays off until you ask for it. One more change targets pale wallpapers. They can turn the menu bar light, so StatBar now draws a dark plate behind itself to keep the coloured figures readable.

Everything arrived in one commit, around 930 new lines in the main source file, with tests. Inside the US, forecasts come from the National Weather Service. Everywhere else they come from MET Norway, which also catches any failure. I ruled out Open-Meteo deliberately. Its free tier is non-commercial, and people pay for StatBar. A city is chosen from suggestions that appear while you type, supplied by Apple's map completer, and the app stores only coordinates. The result appears in a dropdown row and, if you want it, a column in the bar.

The header works out which artwork to draw from the model code and the housing colour. The battery view goes further than cycles: temperature, system power, battery power and the charger's wattage. For graphics there is the renderer, memory and core count. On the CPU tab each core has a bar, with separate averages for efficiency and performance cores. The network tab adds Wi-Fi signal strength, link rate and channel.

Tests were added for the weather parsers, power formatting and the weather column, and the legibility checks were redone for the dark plate. I did not run any of them, so the code is written but unproven.
