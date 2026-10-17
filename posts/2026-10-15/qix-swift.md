---
project: QixForge
summary: Lightfence's menus now read from the couch on Apple TV, and the tutorial teaches the game's pickups and the glowing orb.
---
Lightfence, the game formerly called QixForge, is easier to read on a television. Menu text that was too small to read from the couch now sits at a size Apple recommends, and the Arabic and long translated labels no longer run into the buttons or switches. New players are also taught the glowing orb, the Nexus and the power-ups, one lesson at a time, so a late level no longer buries them in captions.

The TV change is `5afa5ca`. Menu sub-screens were drawing at 12 to 20 points against Apple's floor of 23, because the layouts scaled up by at most 1.6. The TV now fits them like a phone held sideways, about 2.2 at 1920 by 1080, and options, scores and settings labels land at 22 to 25 points. Phones and iPads are unchanged. TV Options now says RUMBLE, as Settings does (`4722b6a`).

The caption bug was `3944c94`. On a fresh save, level 27 put the Snarl, Tracers, mini-Snarls, the orb and the Nexus on screen together. The coach now introduces at most one new name every three seconds. `01fb574` added the orb, Nexus and power-up lessons with 73 lines of new tests.

Arabic text is never set in a fixed-width face now, on both the game screens and the SwiftUI ones (`70440b0`, `f9ecde4`). Switches show the current state's word in the space the knob left, because "ON" and "OFF" at the two ends were squeezed to about 16 points (`948babf`). The Portuguese "OFF" read as "none" and is now "DESLIGADO". The sector map also dives into the next stage when you pick it (`9280cff`).

There is no picture tonight: the screenshot run timed out.
