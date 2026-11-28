---
project: Escape from Butcher Bay
title: Butcher Bay on Mac Adds Mouse Play and PlayStation Buttons
summary: The Mac port of the Xbox game now plays with mouse and keyboard, shows PlayStation or keyboard buttons on screen, and runs as one self-contained app.
---
You can now play the Mac port of Escape from Butcher Bay with a mouse and keyboard, and the game shows the right buttons for whatever you are holding. Plug in a PlayStation controller and the on-screen prompts become PlayStation symbols. Use the keyboard and they become keycaps. Lights now cast shadows from where they actually are, and the whole game is one app you can copy to another Mac. It held a steady 60 frames a second at 4K in my test.

The old game only knew Xbox buttons, so I replace them as the game loads them. The port recognises the original button pictures by their fingerprints and swaps in new ones drawn on the spot: PlayStation domes, gunmetal keycaps, and full diagrams for the Controls screen with every callout box lined up. F12 cycles Auto, PlayStation, Computer and Xbox. There is also a list of live switches. F5 toggles ray-traced shadows, F6 the 4K upscaler, F7 sharpening, F9 mouse capture and F10 a settings overlay. F11, Alt and Enter, or Command and F still go full screen.

The mouse and keyboard layout copies the game's own Xbox controls: WASD, mouse look, left and right buttons as triggers, and the rest on nearby keys. Capture releases when the window loses focus. Controller sticks got a deadzone of 0.08, which ends the resting drift on my DualShock 4. Sensitivity and curve are adjustable.

Shadows were the hard part. The renderer now reads which of the game's constants are light positions, then feeds up to four of the strongest lights into the ray-traced shadow pass. Screen-space interface rectangles are tracked, so the heads-up display is not darkened and sharpening eases off over text.

Two smaller fixes: a short fade-in after audio underruns removes the click, and the app bundle now carries its four libraries with signatures instead of leaning on my Homebrew install.

Seven C regression tests passed. A 4K Metal run reported Game Mode on and 59.94 to 60.00 frames a second, with no shader errors. I did not test on a second Mac, and the PlayStation symbols were checked by exported previews, not every in-game prompt.
