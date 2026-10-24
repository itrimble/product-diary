---
project: QixForge
title: QixForge Moves to Your Beat and Adds Color-Vision Modes
summary: The game now plays music and visuals in time with your moves, and offers nine color-vision settings so key things are never told apart by color alone.
---
QixForge now answers your moves with sound. Each line you draw sounds notes in the sector's key, and a large claim lands a chord right on the beat. An enemy drawing near reddens your trail and tightens the arena. Overdrive is the new reward button. Earn it with enough claimed ground or enough near misses, and one press slows all enemies briefly and doubles your score. Separately, nine color-vision modes now exist so that border, trail and dangers stay distinct for people who see color differently.

Reacting means a new layer of roughly 1,700 lines. A director watches play and issues cues quantized to the beat. A synth and the arena visuals respond, along with the Overdrive rules. Nothing it does touches gameplay. Overdrive needs 35% of the board claimed to charge, with up to 0.16 added per close call. It runs for 8 seconds at 0.45x enemy speed, then pays 60 points for each percent claimed, times the number of claims.

I checked whether Overdrive skews the balance data, and it does not. The test bot never uses it, and over all 100 levels the expert and average runs matched byte for byte whether the code was present or not. One test pins that down. An Audio setting in the options scales the synth, and zero mutes it.

The picker offers protanopia, deuteranopia, tritanopia, achromatopsia and a milder variant of each. Any active mode adds colorless markers, namely ticks across the Qix, a dashed corrupted border, a dashed ring around hunters. Automated tests simulate each vision type, and a mode fails if CIELAB color difference falls under 25 or arena contrast under 3:1, on all ten sectors. Touch controls, settings and credits also have new UI tests.

I have not committed any of it, the same as the days before. The longer write-up sits in the design notes.

![The QIX Sectors title menu on a phone simulator with Continue highlighted](qix-swift.png)
*The game's title menu on a phone simulator, still named QIX Sectors, with Continue highlighted. Screenshot added to the diary on 11 October 2026.*
