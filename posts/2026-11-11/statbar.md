---
project: StatBar
title: StatBar's Weather Button Now Fixes Its Own Failure
summary: The weather menu's status line became a button that retries a failed location fix, and a signing gap that would silence the permission dialog was closed.
---
StatBar's weather menu had a dead end in it. When finding your location failed, the one line reporting the failure just sat there; clicking it did nothing. As of Wednesday it does the useful thing: click the line and the app asks for your location again. And while wiring that up I found a signing mistake that would have stopped the location feature from ever asking on a properly signed copy, which is fixed before the release ships.

The status line now decides what a click means from how the last request actually ended, not from the wording of the message. If the request timed out or nobody answered the dialog, clicking asks again. If the permission was refused, clicking opens the system settings page where that can be changed. Otherwise the line stays a plain note. The previous version derived the click from the live permission state alone, and the code carries a warning about why text is the wrong anchor: a place called Suffolk or Coffs Harbour contains the letters "off", so any logic keyed to the wording would break or work depending on where you live.

The signing mistake was the bigger find. StatBar runs with the hardened runtime, and macOS will not show the location permission dialog to such an app unless it carries the location entitlement; the system refuses the request silently, so a user would click "use my location", see nothing, and conclude the button is broken. The build script now signs all three of its paths (ad-hoc, Developer ID, development) with a new entitlements file whose working content is one key, wrapped in a comment. The comment says the honest part: the entitlement grants nothing by itself, and the dialog still appears only when you ask.

This continues the opt-in location weather from [Tuesday's entry](/statbar/2026-11-10/), still targeting 1.11.0 and still unreleased. Not verified: I did not run the app on screen to click the line myself, and the packaged, signed build has not been exercised end to end. The behaviour is covered by the code paths I read, not by a screenshot.
