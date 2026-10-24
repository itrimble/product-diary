---
project: AdGenerator
title: AdGenerator Renders a First SnapDog Promo Video
summary: A first finished promo video for SnapDog was assembled and rendered, in both widescreen and phone-shaped versions.
---
SnapDog now has its first advert, and it came out of a tool rather than an editing session. The 25 second spot exists in two shapes, a widescreen cut for websites and an upright one for phones. It runs from a hook to the product name, then through four short demo clips, each with a one-line caption, and closes by sending viewers to the Mac App Store. Making ads from recordings of my apps without touching an editor is the whole reason AdGenerator exists, so this is the first proof that it works.

The captions read "Capture any region", "Point at the bug", "Blur the sensitive stuff" and "Save & share", and they stay on screen for 5, 3, 3 and 3 seconds. The tagline is "Capture. Annotate. Done." Footage comes from the German-language demo recording that the capture step already makes.

The interesting design choice is that both shapes are one project. The video is built with Remotion, which draws frames from React components, at 30 frames per second. A single 282 line scene describes the reel, and two registered sizes, 1920 by 1080 and 1080 by 1920, share it. Edit once and both formats change. Before rendering, four still frames were rendered to check the layout cheaply. The finished files weigh about 3.0 MB and 2.5 MB.

Two small helpers arrived alongside: one wraps screenshots in device frames, the other turns a video into a GIF. A 19.8 GB macOS restore image also landed in the project, which I take to be groundwork for running captures in a virtual machine. That is a guess, and I did not confirm it.
