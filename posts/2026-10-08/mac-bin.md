---
project: mac-bin
title: My Skill-Sync Tool Stops Treating Backups as Skills
summary: The tool that keeps Claude's skills in step across three Macs stopped treating its own backups as skills.
---
Twelve of my Claude skills turned out to be fakes on 8 October: backup copies that my own new sync tool had left lying where Claude Code goes looking, so each one loaded as a duplicate. The tool exists to give all three of my Macs the same set of skills. It now keeps its backups elsewhere, and a skill can no longer be lost, doubled or written through the wrong link.

The sync is add-only on purpose. Make a skill on one Mac and it shows up on the others. No Mac can delete a skill it has never seen, so removing one means removing it from every machine. I decided that was an acceptable price.

Symlinks were the second lesson. My first version skipped them all, and that quietly ignored five of the eleven skills on the mini, since many real skills sit in a shared agents folder and are only linked into place. Links that resolve inside that folder are followed now. Anything pointing elsewhere is treated as that machine's own install and left alone. A guard mattered here, not just a skip, because rsync writes through a link into whatever lies behind it. `video-use` is a real folder on one Mac and a link to a developer checkout on the others, so pulling it blindly would have written into that checkout.

The duplicates came from a bad assumption. I had parked each replaced skill in a folder with a leading dot and figured that hid it. Claude Code ignores the dot. Backups now live outside the scanned tree altogether, and dot-folders are skipped when skills are listed. None of the twelve duplicates reached the shared store, and the ones already on the laptop were moved rather than deleted.
