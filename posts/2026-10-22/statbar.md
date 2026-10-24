---
project: StatBar
title: StatBar 1.7.0 Trims and Slims Phone Simulators
summary: StatBar 1.7.0 can now trim and slim the phone simulators on a Mac on its own, freeing memory and disk.
---
Developers tend to leave a pile of phone simulators on their Macs, and each one eats memory and disk. StatBar 1.7.0, the menu bar monitor, can now shrink them. One option clears out their caches and logs. The other turns off the background services inside a simulator, so that it boots with less to carry. The best number I have: one simulator dropped from 215 processes and 2.94 GB of memory to 96 processes and 1.08 GB. It needs no extra software.

That last point was a change of plan during the day. The morning's first commit shelled out to an outside tool, simslim. The next one swapped that for StatBar's own code. The idea still comes from simslim, though. The list of services to disable is its work, and it is MIT licensed, so I kept its licence notice in the project and credited it in the README. Slimming records the list inside every simulator that is shut down, and each one honours it when it next boots. Anything already on that list is preserved, the file is written atomically, and simulators older than iOS or tvOS 18.5 are left alone. Push and store services are deliberately not disabled. Restore puts everything back.

The cleanup is cautious by design. Trimming goes only into Caches and Logs folders and a few system log locations. Documents and media are off limits, and it will not follow a symlink out of those folders. None of the three new actions comes pre-ticked, and trimming is blocked while Xcode runs. The guide also warns that a slimmed simulator loses Siri, iCloud, widgets and Health, so I would not slim one I need those in.

Documentation caught up too: the guide, the sales page copy and the product site in its own repository. A monitor test that had been failing is fixed. I did not run the tests.
