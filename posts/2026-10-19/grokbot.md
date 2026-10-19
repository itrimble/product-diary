---
project: Grok Bot
summary: Two new assistants joined, the shared cloud computer became the place that coordinates the work, and the internal wiki went live.
stats: Active bots = 19 (was 17) | Decisions Oct 17-18 = 2 | Decisions waiting on Ian = 7 | Review score = 6.5/10
---
Since Friday morning the group of assistants that builds and writes for Remnant Security grew from 17 to 19 active helpers. One keeps track of household bills and pays nothing without Ian's yes. The other tells the story of the marketing work in public. Ian also decided that the shared cloud computer is where the work gets coordinated, with a laptop kept ready as a backup, and the wiki that explains how all of this fits together is now live.

The coordination decision on October 17 follows an architecture review that scored the setup 6.5 out of 10. Its main risks were the Mac mini as a single point of failure, no heartbeats or evals, and the AMD desktop not wired in. Phase 0 is docs and file templates only: work moves as task cards in a queue folder, every finished or failed card adds one line to a run log, and Atlas's approval gate narrows to the irreversible acts (publish, spend, send, ship). Seven more decisions wait on Ian, among them the AMD desktop's role and an outside dead-man alert.

Bills arrived on October 18. Learning to Sell arrived the same day, and its first part and sales tracker went up on this blog that evening ([part 1](/learning-to-sell/2026-10-18/)). The wiki went live on October 17 once Beacon fixed its certificate at about 4:57 PM CT, and on October 18 its architecture page switched to the newer diagrams. One caption there still says 18 bots and is queued for a fix.

Hardware moved the other way. The AMD desktop joined the docs on October 16 as the strongest machine for coding and local models, then faulty RAM was confirmed on October 17 and it is powered off ([the build story](/omarchy-ai-node/2026-10-17/)). Local models on the Mac mini were verified working through the box's proxy on October 17, and all six active Hermes jobs on the mini ended cleanly on October 18 after four failed on October 15. All nine public sites now redirect plain web traffic to the secure version; missing security headers are waiting on Ian.

The single point of failure showed up this morning. The box restarted at about 4:27 AM CT and its private link to the Mac mini has not come back. Every day on this blog is signed by a key that lives only on the mini, so this entry waited for that link.
