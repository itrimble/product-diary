---
project: AdGenerator
title: AdGenerator Panel Reopens Projects and Plays the Real Ad
summary: AdGenerator's control panel can now reopen saved projects, play the real ad inside a project page with zoom, and draft a voice line or stills.
---
AdGenerator, the tool I use to build adverts from recordings of my own apps, became something I can actually click around in. Its control panel now opens on the SnapDog campaign, keeps a Projects page where an earlier ad can be reopened and renamed, and plays the real advert inside a project, with a zoom from 100 to 300 percent. It also drafts a voice line, a music bed, or still frames without replacing the cut I already have.

Four commits, built in order. The first records the project-storage checkpoint: saves are atomic and refuse a stale revision, so two open tabs cannot silently overwrite each other. Older recipes migrate on a copy, the 1 November demos stay visible, and a missing orientation is filled in on the copy only. Footage, renders and the 19.8 GB restore image stay out of git, which settles the worry I raised in the first entry about this folder having no history.

The second commit makes the home page list migrated demos with the SnapDog tutorial first, and adds a project page. The third is the part I like: the project stage now plays the same `ReplyDemo` composition that the exporter renders, so the preview is the product, not a lookalike. It added about 22,500 lines, almost all of it one bundled `preview.js`, which makes the diff look scarier than it is. The fourth moves the home page back to the campaign and adds "Take stills", which writes muted frames after each beat has held.

New tests cover the project store, the HTTP routes, composition files, reply metadata, the shot audit and the model catalogue. The shot audit and model runner are new scripts under `pipeline/`. I did not run the suite tonight. There is still no timeline or export on the project page; that is deliberate, for now.
