---
project: Prism Shift
summary: Chain reactions now trigger a big camera-zoom flourish, blocks pulse softly to the music, and each level's scenery lasts across several stages.
---
Prism Shift got a bigger payoff for its best moves and a livelier board. When a big chain of crystals goes off, the camera now pushes in on the board with sparkles and rising notes tuned to the song. Blocks also pulse very gently in time with the music. Each of the fifteen worlds now lasts several stages instead of one, so the scenery and the song carry on across them without a break. None of it has been played on the phone yet, and Ian has asked for the phone to be left alone until they are back.

The checklist is `docs/TODAY_TODO_2026-10-12.md`. Fifteen worlds are split over 62 stages, thirteen with four stages and the last two with five. Simulated runs of the 62 stages finished all 30 times. The pulse is capped at 1.5% growth and 3% opacity on the existing beat clock, and it switches off under Reduce Motion. Ten focused checks covered the new "fever" zoom, and an audio capture of the master output ran 20 seconds without clipping.

Matching rules changed too. All six piece shapes are back in play, where a test override had been leaving only squares. Matches of three or more connected same-kind blocks are kept intact. A special block now needs to belong to a charged match before it fires, and it waits for the chain to finish. White outlines on matched blocks were restored. A bug that dropped the falling piece when a stage finished was fixed.

The honest status is "built and checked on a computer". The signed release build is prepared but not installed. Silent videos and separate audio sit under `docs/verification/oct12/`, and they are not synchronized. Whether the pulse is subtle enough, or the zoom comfortable, is a question for a person holding the phone. A screenshot attempt produced no picture.
