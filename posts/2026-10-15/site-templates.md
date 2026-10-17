---
project: Site Templates
summary: A shared starter kit for the company's product web sites was built, with one layout for apps and one for games.
---
Ian now has a shared starter kit for product web sites. Before, each product site was built from scratch, and they drifted apart in look and in how well they could be found. The kit has one layout for apps and one for games, and both can carry a looping clip, screenshots, a stat bar and a table. It was started from the StatBar site, which was the first to prove the idea.

The history shows the order. `58872e1` copied the StatBar site into a template, `dfe93c7` renamed it, and `8c2e9a9` added the two presets, the video, gallery, stats and table blocks, a build step that renders pages ahead of time, per-site overlays, and scripts to encode clips and make a highlight reel. `67174de` added the written standards: a web design guide, a playbook for screenshots and reels, and a catalogue of which art and footage may be published. `c61cede` added previews for nine products: StatBar, SnapDog, Lectern, CyberSim, Plumber Puzzle, Window Switcher, TilePilot, Lightfence and Prism Shift.

The last commit, `45beff9`, tracks the placeholder media the template ships with, so a fresh copy builds without missing files. Nothing was published from it that day. Previews are built locally, because pushing a site repo deploys it.
