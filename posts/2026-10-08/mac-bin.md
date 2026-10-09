---
project: mac-bin
summary: The tool that keeps Claude's skills in step across three Macs stopped treating its own backups as skills.
---
mac-bin holds small scripts for running my three Macs. One of them copies Claude's add-on skills between the machines so each one has everything. Three changes landed in it, and the last fixed a mistake that showed up on the first real run. Skills are no longer lost, doubled up or written through the wrong link.

The first change, `21da188`, added the sync itself. It only ever adds: a skill created on one Mac appears on the others, and a Mac that has never seen a skill cannot remove it. Deleting a skill therefore means deleting it everywhere, which I accepted. The second, `7820c36`, fixed symlinks. Skipping all of them was wrong. Many real skills live in `~/.agents/skills` and are linked in, so five of the eleven skills the mini had were being ignored. Links that stay inside that folder are now followed. Links pointing anywhere else are left alone, because they are that machine's own install.

That second case needed a guard, not just an exclusion. rsync follows a symlink and writes into whatever it points at. Pulling `video-use`, a real directory on one Mac and a link to a developer checkout on the others, would have written into that checkout.

The third, `e4231ae`, came from the first union run. Each replaced skill was backed up to a folder starting with a dot, and I assumed a dot hid it. Claude Code ignores that, so twelve backups loaded as duplicate skills. Backups now go to `~/.claude/skill-sync-backups`, outside the scanned tree, and dot-folders are skipped when listing skills. None of the twelve reached the shared store. The ones already written on the laptop were moved, not deleted.
