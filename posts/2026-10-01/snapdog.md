---
project: SnapDog
summary: Arrows drawn leftward no longer flip, new captures open clean, and click rings in recordings land on the click.
---
Three things in SnapDog that looked wrong now look right. An arrow or line dragged to the left or upward used to come out pointing the wrong way. The editor also reopened with the previous screenshot and its markings still on it, so a new capture started on top of old work. And in screen recordings, the yellow ring that marks a click swept in from a corner of the screen instead of growing where you clicked. All three are fixed, each with a test that fails without the fix.

The arrow bug was in `Annotation.swift`. The end point was read from a rectangle's width and height, and those are always positive, so any drag toward the left or top lost its sign. A new `vectorEnd` reads the signed size, and the renderer and live preview both use it. The selection box is normalized separately.

The stale editor came from the reused editor window keeping its `@State` between captures. `EditorState` now reloads when the incoming image ID changes, and the content is keyed on that state so zoom and pan reset too. Re-creating the whole view was tried in passing and rejected: it re-fit the window to the loading placeholder and pushed Save into the toolbar overflow. Undo snapshots now include `nextCounterValue`, so undoing a numbered step reuses its number. Tests: `AnnotationDirectionTests`.

The click ring was a zero-size layer at the overlay origin with the circle baked into its path. Scale animations run around the anchor point, so the ring grew from the corner. `ClickRippleOverlay.swift` now sizes the layer to the circle, centres it on the click, and converts global event positions to panel-relative ones. `ClickRippleTests` covers it.

The rest of the day went to the website. The feature sections now show things in action instead of settings screenshots, section 04 animates the on-device analysis, every page works on phones, the Record section shows a real recording, and the logo is the app icon. Changes someone made directly to the published site were merged back in. No screenshot: the capture script only photographs today's build.
