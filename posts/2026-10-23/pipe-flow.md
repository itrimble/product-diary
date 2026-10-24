---
project: Pipe Flow
title: Pipe Flow's Website Now Plays Three Boards in the Browser
summary: The Pipe Flow website gained a playable three-board demo built from the game's own art and sound, and the game itself gained tests and a Linux build script.
---
Pipe Flow's website can now be played. A visitor gets three real boards built from the game's own artwork, rules and sounds, running right in the page, and the audio keeps working on a phone whose silent switch is on — the usual way web games go quiet. Two rounds of changes were reviewed and approved for the live site in the evening.

![The Pipe Flow website homepage with its play section](plumberpuzzle-site.png)
*The Pipe Flow website homepage, rendered on 24 October 2026, the day after the playable demo was approved for the live site.*

The demo is not a mock-up. `play/play.js` runs the actual rules, `play/draw.js` renders the pipes, and the sound is ten of the game's own audio files, from the underwater music to the leak alarm. One follow-up fix loads the challenge emblems before the test looks for them; another makes the sound audible on a phone with the silent switch on. The whole thing went out under review, with the deploy approval recorded in the merge.

In the game's own folder, the day's touched files tell a quieter story: six test files covering the main menu, the pad layout, orientation policy and the pipe logic itself, a script for designing early levels, and a Linux build script matching the one Night Chorus received the same day. The desktop port [caught up with the phone game on Thursday](/pipe-flow/2026-10-22/); this is the belt-and-braces that follows.
