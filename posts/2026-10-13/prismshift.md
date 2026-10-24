---
project: Prism Shift
title: Prism Shift's Chain Payoff Is Rebuilt From Feedback
summary: The crystal game's chain payoff was rebuilt through player feedback, and it now runs on both televisions in the house.
---
Prism Shift's chain payoff was rebuilt around the player's feedback. Matched crystal groups now melt into solid colored masses, outline first and then an eased fill, after two rounds of review said the effect was first too weak and then too quick. The game also came to the television: a wide board for the big screen, steered with the remote or a gamepad, and installed on both TVs in the house. The animated scenery around the board was made properly visible too, after hiding almost entirely behind the play area.

The project got its first git history today, at Ian's request: commit `311f485` is a baseline of source, bundled soundtrack, tests and notes. The match work it captured turns charged blocks into an opaque solid skin color with a white outline and black backing, and merges connected groups of three or more into one continuous region with an outer white boundary, checked frame by frame against a Lumines reference clip. When that read as too abrupt, `bb89c83` added a 0.30 s outline-only dwell before a 0.20 s eased fill. The Core's chain light now converges on the Core itself before the release.

The tvOS build is new. `PrismShiftTVApp.swift` hosts the game on a wide 20-by-9 board with a television HUD, reading the Siri Remote and connected pads. A layered crystal icon and Top Shelf art were generated, a gold alternate icon is selectable in Settings, and button prompts follow the controller in hand, a PS4 pad in the living room and the remote in the shed. Signed release builds were installed and launched on both physical TVs; one launch on the shed set was refused because tvOS reported the system asleep.

A normal launch on the TV showed only the background painting with no menu. The root layout is now bounded to the TV viewport, initial focus lands on Play Challenge, and a screenshot checker fails the build's proof when the menu labels are missing. The layered worlds, with parallax haze, weather and creatures, had been masked out by the play area on a phone; weather now travels the visible side bands and creatures follow the perimeter. Still open: a person accepting the new pacing, controller feel on the couch, and sustained 4K60.

There is no picture tonight: the build run for the screenshot failed.
