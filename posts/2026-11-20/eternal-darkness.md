---
project: Eternal Darkness
title: Eternal Darkness Holds 60 in a Window on My Mac
summary: A Mac conversion of a GameCube horror game held 60 frames a second in a window, and its new faster-screen option stayed hidden on my fixed screens.
---
A Mac version of the GameCube horror game Eternal Darkness ran in a window on my MacBook Pro on Friday night, and once the title screen was up it held a steady 60 frames a second. I also added a choice for screens that can refresh faster than 60. It correctly stayed hidden, because none of the screens on my desk can change their speed. That was the result I wanted before trusting it anywhere else.

The window opened at 1454 by 777 points, which this display draws as 2908 by 1554 pixels. I played from the European disc on a throwaway copy of the memory card, with sound off. The real card, save and settings were the same size and age afterwards. The card is 122,988 bytes.

The counter read 58 on the Nintendo logo at 19:43, dipped to between 48 and 51 during the opening movie, and sat at 60 on the title screen at 19:45. A probe settled at 17.074 milliseconds a frame (about 58.6 a second) on the first launch and 16.663 (about 60.0) on the second. I would not call that a perfect lock from one short probe. I did not time a fight or a corridor walk.

The new choice is called Variable. It is for a screen whose refresh rate can move, and it asks for the top of that range. I asked macOS about all four attached screens. Each reported a shortest interval equal to its longest, and a step that was not zero, so each is fixed: three at 60 and one at 165. The laptop's own panel was missing from the list. The window never sat on the 165 panel, so I never saw 165 in the menu. The options page showed only 60, with a note that smoother motion needs a faster screen.

The upstream project already had the "faster than 60" idea. Variable is the part I added, and I have not tested it on a screen that can vary. The disc and the texture pack stay on this machine.
![The Nintendo logo in the Eternal Darkness window with a 58 FPS overlay](eternal-darkness-nintendo-logo-58fps.png)
*The Nintendo logo at 19:44 on 20 November 2026, with the window title and overlay both reading 58 fps.*
![The Eternal Darkness title screen with a 60 FPS overlay in the corner](eternal-darkness-title-screen-60fps.png)
*The title screen at 19:46 on 20 November 2026, holding 60 frames a second as the window title records.*
![The Eternal Darkness options book with Frame rate set to 60](eternal-darkness-options-frame-rate.png)
*The Options page at 19:50 on 20 November 2026, with Frame rate at 60 and a note that smoother motion needs a faster screen.*
