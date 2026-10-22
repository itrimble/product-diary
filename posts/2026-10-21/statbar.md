---
project: StatBar
summary: StatBar 1.6.0 can now report whether a Mac is ready for heavy work, and it can check every Mac in a household at once.
---
StatBar, the Mac menu bar monitor, gained a way to answer "is this Mac ready to work?" in one command, and another to ask the same of every Mac you own at once. It also now notices when a Mac is pushing memory out to disk at a worrying rate, and shows how busy the phone simulators are. Version 1.6.0 carries these changes, and the product site now has real output for them.

In `bbe094c`, `StatBar --ready` gives a readiness verdict and `--fleet` runs it across machines. A new swap-out rate finding flags memory pressure. The snapshot output gained `schemaVersion`, readiness, network and toolchain fields, so scripts reading it can tell versions apart. Idle and per-app simulator activity are reported separately. Most of the 526 new lines are in `Sources/main.swift`, with 112 lines in `Tests/resilience.swift`.

The user guide and Gumroad page copy were updated, and `3b88105` added examples with real output, use cases and an FAQ to the site. I did not run the tests, and the survey also flagged the separate site repository for these changes. There is no picture tonight because the screenshot tool does not handle this kind of project.
