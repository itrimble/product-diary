---
project: Prism Shift
summary: The crystal game's second version gained its trickiest pieces, and the tablet layout and saved progress were made safer.
---
Prism Shift's second, cross-platform version learned more of the original game's tricks today. Pieces that count down and then blow up, armored blocks, and the multi-stage boss encounters now work there. On the tablet, the board no longer slides under the window edge, and a corrected version was installed with players' saved settings intact. Saved campaign progress also got a version number, so an old save should carry forward instead of resetting.

The game's web page and social card were republished under a new public name, Night Chorus (`224a4c5` in the site repository, mirrored into the main company site). The Godot port got three batches. Countdown pieces ("Volatiles") appear every 14 pieces, or 16 in the harder modes, and tick only when the Pulse crosses their column. If one expires it turns itself and up to two neighbours into dead slag. A match that sets one off clears its colour network, shatters slag in a 3-by-3 area and adds 240 energy per mark. Armored slag and the authored encounter phases (`db92c7c`) added 155 lines to `self_test.gd`. Four-colour construction and the Hungry Pulse came earlier (`a30af97`).

The full Godot test run passed on the mini. A first attempt failed because a new test assumed the wrong type, and the strict gate rejected it. The notes say the fix was to the test, not the scoring. Audio handoffs between recorded beats were also corrected (`0f9e720`, `fbca3e5`).

On Apple devices, `046441d` versions the Swift campaign save and freezes the old furthest-reached point, and `9211dd3` and `ed99edb` derive the lap boundary from the stage catalog instead of a hard-coded number. `f5d1a02` reserves the window safe area before the iPad board is laid out; `9183325` records the signed install. Native Mac menus were made readable over dark art (`f9aa68b`).

Several commits record that the shared build fleet refused the pending native tests for lack of room. Those checks are still waiting, so the Mac settings and tide-shader work is not yet proven there.

![Prism Shift running in the simulator](prismshift.png)
