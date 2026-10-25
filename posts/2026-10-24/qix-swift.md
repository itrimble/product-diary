---
project: QixForge
title: Lightfence Stops Crashing When the Sound Fails to Start
summary: Lightfence could quit on its own if the phone's audio was busy when a sound played, and that crash is now fixed.
---
Lightfence could quit on its own if the phone's audio was busy at the wrong moment, such as during a call or while Siri was listening. The game would try to start its sound, fail, and then crash the next time it tried to play anything. It now recovers quietly and the sound simply comes back on the next attempt.

The cause sat in `EffectDeck.swift` and `SongDeck.swift`. When the audio engine failed to start, each deck threw the engine away but kept the players that belonged to it. The next sound built a fresh engine and skipped attaching those players, then started it with nothing to output, so Apple's audio framework raised an exception and the app aborted. The release gate for version 1.3 hit this eleven times on a busy Mac mini, which is how it was found.

Each deck now keeps its engine as soon as it is wired up, so a retry restarts the same engine with its players still attached. A new test file, `AudioEngineRetryTests.swift`, adds 46 lines covering the retry. I have not run it. The work follows the [1.3 art update](/qix-swift/2026-10-23/).

![The Lightfence title menu on a phone simulator with Continue, New Campaign, Endless and Light Core](lightfence-title-screen-phone.png)
*The Lightfence title menu on a phone simulator, captured on 25 October 2026 just after midnight.*
