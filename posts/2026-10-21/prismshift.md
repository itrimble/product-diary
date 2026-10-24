---
project: Prism Shift
title: Prism Shift's Second Version Gets Its Trickiest Pieces
summary: The crystal game's second version gained its trickiest pieces, and the tablet layout and saved progress were made safer.
---
The new cross-platform version of Prism Shift learned more of the original game's tricks. It has the pieces with a fuse that count down and then blow, the armored blocks, and the bosses that fight in several stages. Two fixes protect players as well. On the tablet, the board no longer drifts beneath the window edge. A corrected build went onto the device and players' saved settings survived it. Campaign progress is now stamped with a version number, so an old save ought to carry on rather than reset.

The game also has a new public name, Night Chorus. Its web page and social card were republished under it, with a copy in the main company site.

The fused pieces are called Volatiles. One arrives every 14 pieces, or every 16 in the harder modes, and its fuse burns down only when the Pulse sweeps across its column. If the countdown hits zero, that piece and up to two of its neighbours become dead slag. Set one off with a match and you clear that colour's connected network, shatter slag in a 3-by-3 patch around it and earn 240 energy for each marked piece. The armor and boss phases came after, with 155 more lines in the port's own test file. Four-colour construction and the Hungry Pulse had landed just before.

A strict Godot test run passed on the Mac mini, though not first time. A new test assumed the wrong type and the gate threw it out. According to the notes, the test was wrong and the scoring was right, so only the test changed. The handoffs between recorded beats in the music were fixed as well.

The Apple versions got the save change, a lap boundary read from the stage catalog instead of a fixed number, a safe-area fix for the iPad and readable Mac menus over dark art. The build fleet turned down the native tests that would prove the Mac work, because it had no room. Until they run, I cannot call the Mac settings or the tide-shader work proven.

![The Night Chorus title screen on a phone simulator with the new app icon and a Play Challenge button](prismshift.png)
*The title screen on a phone simulator, now reading Night Chorus with its new app icon, a Play Challenge button and Settings. Screenshot added to the diary on 22 October 2026.*
