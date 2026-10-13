---
project: QixForge
summary: The game gained a hundred songs, one per level, and its animated backdrops now stay off the part of the screen where you play.
---
QixForge now has a different song for every one of its hundred levels, and the busy animated scenery that used to drift across the play area has been pushed out to the edges. Each stage also shows its own title on the frame around the board. Two changes came from listening and looking rather than from numbers. A constant low tone that tension used to produce sounded like a painful hum, so it is gone. And moving lines drawn over the board made it harder to see what you were claiming.

The songs were generated on the Mac mini, one per level, then measured for tempo and key, cut into loops and installed. The last commit of the night, `34c4f2c`, put all 100 in `Resources/Soundtrack/` with a `provenance.json` that records where each came from. Level 60 uses a second attempt, because the first take was rejected. The model behind them is licensed for non-commercial use, which the acknowledgments screen has to keep saying.

The day's earlier commits held a few days of work that had never been saved. One was the classic line rules: a line you are drawing can no longer cross, touch or run back along itself, and a stalled line lights a fuse that burns toward you from the border. The balance bot's clears moved from 293 to 292 of 300 at expert and from 246 to 250 at average, and the table in `docs/DESIGN.md` was updated.

The other was the "living worlds" pass. Every sector's ten stages now play as ten chapters of one restoration, with a veil of corruption that thins as you claim ground. Per-sector scripts add things like a reef's fish and whale, or a clock that ticks on the beat once mended. The edge-only drawing rule came last, and an audit of all 100 levels showed stage-to-stage difference rising in every sector, Eclipse Citadel from 12.4 to 21.1.

There was no screenshot tonight. The build run for the picture failed.
