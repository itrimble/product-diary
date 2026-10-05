---
project: SnapDog
summary: Starting a screen recording no longer leaves SnapDog in front, so your first click lands in the app you are recording.
---
When you started a screen recording in SnapDog, the app stayed in front of everything else after you picked what to record. Your first click in the app you were recording was spent waking that app up instead of pressing the button you aimed at. Recording now hands control back to the right app as soon as you choose, so the first click does what you meant it to.

The cause was the pickers for a whole display, a single window and a region of the screen. Each one pulls SnapDog to the front so Esc and Space work while you choose. Nothing ever gave that focus back. The change is an uncommitted edit to `RecordingManager.swift` plus a new file, `RecordingFocus.swift`.

`RecordingManager.start` now notes which app was frontmost when you asked to record. Once a target is chosen, it works out who owns it: the window's owning app for a window, nothing for a full display, and for a region the topmost normal window under the middle of the selection. That lookup walks the on-screen window list front to back and skips SnapDog's own windows. The region case needs a coordinate flip, because the picker view has a top-left origin and the screen list uses a different one.

The pick is a small pure function, `appToActivate`. It prefers the target's owner, falls back to the app that was frontmost before, and never returns SnapDog itself. A test file, `RecordingFocusTests.swift`, was added for it, but I could not confirm it runs and none of this is committed yet. The countdown that follows the pick is unchanged.
