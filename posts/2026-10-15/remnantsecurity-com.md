---
project: Remnant Security
title: All Fourteen Remnant Security Web Addresses Now Pass
summary: The company's web addresses were checked one by one for search and sharing, and all fourteen now pass, including the new StatBar site.
---
The company's web addresses were all checked for the basics that make a site findable and shareable, and all fourteen now pass. Two were still open at the start of the day: the training academy, which got its fix and went live, and the Prism Shift game site, which turned out to have been finished already by a different working session. The StatBar site went live the same day and became the fourteenth.

The checklist lives in the estate notes. Commits `f740ef6`, `1d88e85` and `8953f9e` move the count from 12 of 13 to 13 of 13 and then 14 of 14. `8953f9e` exists because the StatBar address was missing from the inventory, so "all 13" had quietly become wrong. `e88ae08` records the academy trap: its project had no Git connection, so pushes never deployed, and a stale setting put the old hosting address into the first live copy. `7e92d49` corrects an earlier note that had blamed access.

One lesson went into the docs (`1d88e85`). This session was blocked from writing to the Prism Shift site because another session owned it. That block was right: the owner had already shipped a better share card built from real gameplay. The rule now written down is to treat a refusal like that as information, not something to route around.

Prism Shift's gallery now uses current phone skins (`15c42ad`) and its preview music matches the game's loudness (`1988c43`). `322bc38` writes up the three traps behind the search pass.

There is no picture tonight: the screenshot run timed out.
