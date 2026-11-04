---
project: SnapDog
title: SnapDog Linux Packages Rebuilt After a Stale-Code Check Failed
summary: SnapDog's Linux installers were out of date after the Loom import work, so I rebuilt all three as version 0.2.59 and fixed a Loom link edge case.
---
SnapDog's Linux installers turned out to be out of date, and a check I run caught it. The three packages built the day before did not contain the latest Loom video import code, so anyone installing them would have got an older app than the Mac one. I rebuilt all three as version 0.2.59, and a Loom link typed in capital letters now works too. None of it has been tried on a real Linux machine yet.

The check is `verify-packages.py`, which compares each archive against the current source. Run against the 0.2.58 builds it failed with "deb: stale backend.py", because the Loom commit had changed three Python files after the archives were made. The old checksums were valid, but valid is not the same as fresh. I bumped the Debian, Fedora and Arch manifests to 0.2.59 and pointed their website field at the SnapDog subdomain instead of a dead address. The new archives are 169,420, 179,793 and 197,235 bytes, and all three passed payload verification.

The Mac side got one small change. The Loom link parser matched `loom.com/share` only in lowercase, so a pasted `HTTPS://WWW.LOOM.COM/SHARE/...` was rejected. It is now case-insensitive, with a test for the shouted form. I did not run the Mac tests tonight, so that change is written, not proven.

Linux results: the full suite passed 117 tests with one skipped, and the Mac-hosted Linux simulator went through its control run-through, producing a PNG and a 5,304-byte test video. Arch's packaging tool printed a harmless process warning. What did not work: the computer-use service refused to open the simulator for a fresh GUI run, and the SSH alias for my Omarchy test machine failed before authentication. So there is no installed-host result for 0.2.59, and the porting log says so. Separately, the English and German demo videos for the localisation shoot landed in the presentation folder.
