---
project: SnapDog
title: SnapDog's English Demo Video Finally Gets Recorded
summary: A 35-second English demo video of SnapDog was finally recorded, after four failed attempts earlier in the day.
---
The fifth attempt worked. SnapDog now has an English demo video, 35 seconds long, that walks through a complete job from the menu to a saved file. It captures a region, draws an arrow, hides a private email address with a blur and saves. With German, French and Japanese cuts already made in September, the set is now whole. The app was unchanged on 14 October, and this footage is meant for the product page and for ads.

The master was filmed on this Mac, running SnapDog 1.2.1 (build 9), at 2816 by 1762. A wide crop and a tall crop sit next to it. Only invented material appears on screen: a made-up page with fake personal details at reserved example addresses. Stills taken from the footage confirm it: the arrow points at the bad number, and the blur hides the email and nothing around it.

The four rejected takes are kept apart as rejects, and the README explains each failure. The cause was a setting. SnapDog looks for its open-in-editor switch in the plain preferences file. The standard terminal command for changing it writes to another location, which this build does not consult. So the switch stayed off, captures landed in Pictures and no editor opened. Two more workarounds followed. Automation cannot find the editor window through the helper tool, which is why the script presses its buttons at measured distances. The desktop's size cannot be had from Finder while icons are hidden, so the script now asks the system directly.

Some limits stay. Screen recording deliberately cannot see the region-selection overlay, which means no magnifier appears while selecting. A Safari banner is still visible on the captured order page. The ad reel is still cut from the German master.

Separately, the repository itself bothers me. It differs from the last commit, dated 1 October, by 56 files and about 48,000 deleted lines. Where that comes from is untraced, so I am saying nothing about it.
