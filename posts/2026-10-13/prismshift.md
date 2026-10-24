---
project: Prism Shift
title: Prism Shift's Chain Payoff Is Rebuilt From Feedback
summary: The crystal game's chain payoff was rebuilt through player feedback, and it now runs on both televisions in the house.
---
Prism Shift's chain effect was reworked in response to feedback, and the game now plays on Apple TV. A matched group of crystals melts into one solid block of color, first drawing its outline and then filling in smoothly. Two rounds of review called the first version too weak and the second too quick, so timing is the part to judge. There is a wide board for the television, controlled by remote or gamepad, and it is installed on both TVs in the house. The animated scenery behind the board, which had been almost completely hidden, now shows.

Until 13 October the project had no history, so the first commit simply freezes everything: code, soundtrack, tests and notes. Its match work paints charged blocks an opaque skin color, edged in white over a black backing, and joins any connected group of three or more into one region with a white outer border. I compared it frame by frame against a Lumines reference clip. That looked too sudden, so the outline now stands alone for 0.30 s before a 0.20 s eased fill. The Core's chain light also converges on the Core before releasing.

The Apple TV build uses a 20-by-9 board with a television HUD and answers to the Siri Remote and connected pads. Button prompts match whichever controller is being used, which is a PS4 pad in the living room and the remote in the shed. New assets include a layered crystal icon, Top Shelf art and a gold alternate icon chosen in Settings. Signed release builds were installed and launched on both TVs, apart from one shed-TV launch that tvOS refused, reporting the system as asleep.

An ordinary launch on the television showed only the background painting. The fix bounds the root layout to the TV viewport and starts focus on Play Challenge. A screenshot checker now fails the proof when menu labels are missing. On a phone, the play area had masked the layered worlds, with their parallax haze, weather and creatures, so weather now travels the visible side bands and creatures follow the perimeter. Left open: whether anyone accepts the new pacing, how the controls feel on the couch, and whether 4K60 holds up. I will not claim any of those yet.
