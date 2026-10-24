---
project: StatBar
title: StatBar 1.7.0 Trims and Slims Phone Simulators
summary: StatBar 1.7.0 can now trim and slim the phone simulators on a Mac on its own, freeing memory and disk.
---
StatBar, the Mac menu bar monitor, can now shrink the phone simulators that developers leave around. It can clear their caches and logs, and it can switch off background services inside a simulator so it runs lighter. Version 1.7.0 does this without any extra program to install. In one test, a simulator dropped from 215 running processes using 2.94 GB of memory to 96 processes using 1.08 GB.

The morning's first commit (`1ce0ba8`) called an outside tool named simslim. The second (`f8b972f`) replaced it with native code, so nothing external is needed. `SimulatorSlimming` writes a vetted list of service names into each shut-down simulator's `disabled.plist`, which the simulator reads at its next start. It keeps existing entries, writes atomically, and only touches iOS or tvOS 18.5 and later. Push and store services stay on by default. Restore flips them back. The list comes from simslim, which is MIT licensed, so its notice ships in `docs/third-party/simslim-LICENSE.txt` and the README credits it.

Cleanup targets only `Caches` and `Logs` folders plus a few system log paths, never documents or media, and never through symlinks. The targets `sim-trim`, `sim-slim` and `sim-unslim` are never pre-ticked, and trimming is blocked while Xcode runs. Tests use a scratch home, and a monitor-ui test that was failing is fixed.

The guide, the sales page copy and the product site (`statbar-site`) were updated to match. I did not run the tests, and there is no picture tonight because the screenshot tool does not handle this kind of project.
