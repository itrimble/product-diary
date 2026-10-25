---
project: Hermes Fleet
title: Hermes Fleet Notices That One Computer Has Gone Missing
summary: My house assistant re-checked which computers it can reach overnight and found one of them no longer answers to its name.
---
My house assistant counted the household's computers again in the small hours and came back with one fewer than the night before. The laptop it had been able to log in to simply stopped being findable by name. The assistant did not guess. It marked that machine as unknown, left the other three reachable ones as verified, and kept the two it could never reach on the list as down.

The re-survey ran at 03:01 on 24 October. The inventory files that changed are the capability matrix, the SSH status page and the machine-readable state, and the diff is small: `neo` went from open and verified to a failed name lookup, with a timeout recorded beside it. Both `adgen` entries still time out against the same dead address, and the report still flags them as one machine reached two ways.

The other change is a setting for the spoken-summary pipeline from the [previous entry](/hermes-fleet/2026-10-23/). The config gained a markdown preview mode set to auto, with a threshold of 120 words, and about eighteen preview folders appeared under `deliverables/`, so I assume long answers now get a rendered preview. I did not verify that from the code. An 08:00 fleet summary was also written and reports the stack healthy.

None of this is committed. I cannot say from the diff why the laptop vanished; the likeliest cause is that it was asleep or off the network, not a fault in the assistant.
