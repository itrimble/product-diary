---
project: Epochs of Power
title: Epochs of Power Records Where the Old Game Decides Ties
summary: My strategy-game research gained a long set of written findings about Call to Power II, plus scripts that watch the original game run.
---
Epochs of Power is my research toward a touch-first strategy game, and on Thursday it got its first real paperwork. Nothing playable changed. What I added is a folder of written findings about how the 2000 game it is modelled on actually behaves: how a turn unfolds, how its economy works, how fights are decided, and how a phone version could fit into an hour. Two commits landed, and for the first time the research is saved in version control rather than loose in a folder.

The notes live under `docs/reverse-engineering/`: 13 files and 2,217 lines, including a source map, a turn trace, an economy study, a combat and diplomacy study and an adaptation plan. The adaptation plan proposes 90 rounds across four eras. I stress that this is a design target. Nobody has played it.

The sharpest finding is about repeatability. Two runs of the original game agree for dozens of rounds, then split. One split was traced to a rush purchase: 545 gold buying the last 90 production. Another was a goody-hut reward of 246 gold during movement. The latest sits at round 72, where two goals tie and the game's own code breaks the tie by memory address, so identical games can choose differently. The notes say plainly that this does not yet amount to a full replay.

The second commit added 1,278 lines of scripts: probes for combat, the map editor, saved games and goal ordering, plus two small files fixing the prompts and seed for an image model. `verified-run.sh` downloads the SDXL Turbo checkpoint and refuses to continue unless its SHA256 matches. The model setup had been failing on native import errors, so the script now checks first.

I did not run any of this today. The app build I tried tonight failed with three errors, and the generated-art folders, Meshy pilot files and evidence folder are still untracked.
