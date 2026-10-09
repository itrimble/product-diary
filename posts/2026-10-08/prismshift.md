---
project: Prism Shift
summary: All fifteen levels now have their own music, backdrops and layouts, and the music slides from one level into the next without stopping play.
---
Prism Shift now feels like fifteen different places instead of three. Every level has its own piece of music, its own layout of crystals and its own scenery behind the board. The second and third worlds got new paintings, and the crystals themselves are cut differently in each world. When you clear a level, the next level's music fades in over the old one and you can keep playing through the fade instead of waiting for it.

Until now only the first ten levels had recorded music. The five cave levels were thin synthesized loops that faded out and cut in. They are now composed separately, each with its own melody, bass line and rhythm, and rendered in stereo. They run on the same two-track hand-off as the recorded scores, so both tracks overlap while the volume ramps. Gameplay resumes the moment the incoming track starts.

The details are in `docs/SOUNDTRACK_AND_WORLD_VARIETY_OCT08.md` and `docs/LEVEL_AND_SOUNDTRACK_COMPLETION.md`. Each level now carries a design record in `Level.swift` with its own piece mix, a shape family and a landmark drawn behind the board. Examples are the blossoms in First Light, the broken signals in Neon District and the heartstone altar in Crystal Caverns. Because the piece mix changed, all fifteen balance targets were measured again from the original five seeds. The old Heartstone ceiling failed the +20% check, so the whole baseline was re-derived. No gate was loosened.

For listening, `docs/audio-review/oct08/` holds a medley of all fifteen levels with 0.8-second crossfades, plus 5, 15 and 30 minute fatigue loops. The ten recorded scores have ten different file hashes, and all fifty stems pass the loop and headroom checks. Different hashes show the tracks differ. They do not show they sound good. Nobody has listened on a real phone yet, and the licensing for the recorded music is still unresolved. The repo is still not under version control, so tonight's changes are only on disk.

![The Prism Shift title screen on a phone, with the Play button and the world and level picker](prismshift.png)
