---
project: StatBar
title: StatBar 1.6.0 Checks Whether a Mac Is Ready to Work
summary: StatBar 1.6.0 can now report whether a Mac is ready for heavy work, and it can check every Mac in a household at once.
---
StatBar, the Mac menu bar monitor, can now say in one command whether a Mac is ready to take on heavy work. A second command asks the same question of every Mac you own. Two smaller additions came with them: a warning when a Mac is pushing memory out to disk at a worrying rate, and a view of how busy the phone simulators are. All of this ships in version 1.6.0, and the product site now shows real output for it.

The readiness check is `StatBar --ready`. It returns a verdict that a script can act on. `--fleet` runs the same check across the Macs you name and prints one line for each. The swap-out finding is the new memory-pressure warning, and idle simulators are now counted apart from the ones with apps running in them. The snapshot, the machine-readable report that scripts read, gained a schema version plus readiness, network and toolchain fields, so a script can tell one release from the next.

The change added 526 lines to the main source file and 112 to the resilience tests. I updated the user guide and the Gumroad page copy to match. A later commit put examples with real output, use cases and an FAQ on the site.

I did not run the tests.
