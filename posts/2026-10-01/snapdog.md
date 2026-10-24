---
project: SnapDog
title: SnapDog Fixes Flipped Arrows and Misplaced Click Rings
summary: Arrows drawn leftward no longer flip, new captures open clean, and click rings in recordings land on the click.
---
Three small things in SnapDog were wrong, and all three are now right. Drag an arrow or line to the left or upward and it pointed the opposite way from where you dragged. Take a new screenshot and the editor could open with the last one still there, markings and all. Record the screen and the yellow ring that flags a click flew in from a corner instead of appearing under the pointer. Each fix came with a test that fails if the fix is taken out.

The arrow went wrong because its end point was derived from a rectangle's width and height. Those numbers are never negative, so a drag toward the left or top lost its direction. The end point now comes from the signed size, and both the final drawing and the live preview read it. The selection box gets its own separate normalizing.

The stale editor happened because the same window was reused between captures and held on to its state. The editor now reloads whenever a different image arrives, and zoom and pan start fresh. I also tried rebuilding the whole view on each capture and dropped that idea, since the window then sized itself to the loading placeholder and Save slipped into the toolbar overflow. A related change: undoing a numbered step now gives that number back.

The click ring was a layer with no size sitting at the corner of the overlay, with the circle painted inside it. A scale animation pivots on the layer's anchor point, which is why the ring blossomed from the corner. It is now sized to the circle, centred on the click, and positions are converted into the panel's own coordinates.

The website took the rest of the day. Feature sections show the app doing things rather than its settings pages, the on-device analysis in section 04 is animated, every page works on a phone, the Record section plays a real recording, and the logo is now the app icon. A few edits made directly on the published site were also folded back into the repository.
