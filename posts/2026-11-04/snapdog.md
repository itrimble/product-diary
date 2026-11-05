---
project: SnapDog
title: SnapDog Studio Learns to Wait for the Simulator to Boot
summary: SnapDog's reel-making studio can now wait for a phone simulator to start and open web links in it, and warns about badly sized app previews.
---
SnapDog's reel-making studio got two practical fixes on Wednesday, aimed at the part of making a demo video that used to fail quietly. It can now wait until a phone simulator has finished starting before it records, and it can open a web address inside that simulator. It also warns you before you export an app preview that the App Store would reject. None of this is in a released build, and I did not run the Mac tests tonight.

The first commit added two Simulator tools to the studio: wait-for-boot and open-URL. They live in `StudioSimulatorController.swift` and in the studio's automation server, with a 149-line test file for the Loom and Simulator paths. Waiting matters because a recording that starts on a half-booted simulator captures a black screen. The same commit made Loom link matching case-insensitive in the Mac code, which the Linux side already had after Tuesday's rebuild, with a matching test line.

The second commit changed `StudioValidator.swift`. It now warns when an app preview is in the wrong format or when the combined clips fall outside 15 to 30 seconds, which is the length Apple accepts. It adds 52 lines of validator and 69 lines of tests. These are warnings, not blocks, so you can still export.

Not verified: no tests ran, so both changes are written, not proven. I did not touch the Linux packages today; they are still the 0.2.59 builds from [Tuesday's rebuild](/snapdog/2026-11-03/).
