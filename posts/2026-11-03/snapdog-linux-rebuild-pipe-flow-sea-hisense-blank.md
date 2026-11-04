---
project: Daily Story
title: SnapDog Linux Rebuild, Pipe Flow's Sea, a Blank TV Library
summary: A freshness check caught stale SnapDog Linux installers, Pipe Flow got a reactive sea, and a Hisense sign-in fix blanked my podcasts library.
format: longform
stats: SnapDog Linux version = 0.2.59 | Pipe Flow iPhone tests = 633 passed | Tile-memory warnings = 336 in 4 minutes
---
Tuesday was a day of things that looked finished and were not. I caught SnapDog's three Linux installers shipping an older app than the Mac one, gave Pipe Flow a small living sea behind its puzzle board, and watched a fix for a broken password box on my television blank the whole podcasts library.

## SnapDog Linux Packages Were Stale

The most useful thing that happened all day was a check failing. SnapDog's three Linux packages, for Debian, Fedora and Arch, were built the day before. They looked fine. Their checksums were valid. But they did not contain the latest Loom video import code, so anyone installing them would have got an older app than the Mac version. The full account is in the [SnapDog entry](/snapdog/2026-11-03/).

The check is a script that compares each archive against current source. Run against the 0.2.58 builds it failed with "deb: stale backend.py". The Loom work had changed three Python files after the archives were made. Valid is not the same as fresh. I bumped all three manifests to 0.2.59, fixed a website field that pointed at a dead address, and rebuilt.

| Package | Size (bytes) |
|---|---|
| Debian | 169,420 |
| Fedora | 179,793 |
| Arch | 197,235 |

All three passed payload verification. The Linux suite ran 117 tests with one skipped. The Mac-hosted Linux simulator went through its control run-through and produced a PNG and a 5,304-byte test video. Arch's packaging tool printed a process warning I judged harmless.

Now the part I cannot dress up. The computer-use service refused to open the simulator for a fresh GUI run, and the SSH alias for my Omarchy test machine failed before authentication. So there is no result from a real installed host for 0.2.59. The porting log says so, and so do I.

One Mac-side change rode along. The Loom link parser only matched the lowercase form, so a pasted all-caps link was rejected. It is now case-insensitive, with a test for the shouted version. I did not run the Mac tests that night, so that fix is written, not proven.

## Pipe Flow Grew a Living Sea

Pipe Flow's first world stopped being a static backdrop. Behind the puzzle there is now a turtle that drifts past, kelp that sways with a current, coral that regains colour as you clear levels, and an anemone and clownfish that react when you link pipes. When water leaks the fish flee. When you win, the scene blooms. Only the first chapter, First Drop, has it. The [Pipe Flow entry](/pipe-flow/2026-11-03/) has the build details.

![Pipe Flow on an iPhone simulator showing a level in progress with kelp and clownfish along the bottom edge](pipe-flow-first-drop-sea-iphone.png)

*An iPhone simulator running Pipe Flow's First Drop chapter, captured on the evening of 3 November 2026. Look along the bottom edge: kelp, coral and two clownfish sit behind the controls, and the board itself stays clear.*

I wrote a world bible first, with seven chapters in mind, then built the layer in three pieces: a small model that turns play into reactions (about 126 lines), a per-chapter data profile, and a pixel-art factory for the creatures. The layer itself is 349 lines. Cheaper devices get fewer creatures through the existing visual quality setting, and tests insist the sea never covers the board and allocates nothing per frame.

![Six frames of Pipe Flow with a red leak alert and coral and fish at the bottom](pipe-flow-coral-ladder-leak-frames.png)

*Six frames from one leak sequence on an iPhone simulator, assembled from captures taken on 3 November 2026. This is a strip of frames, not a single window. Notice the red pressure alert and the pixel coral and clownfish below the controls.*

Twelve new tests cover the layer, including one that says an unplayed chapter already looks alive and one that says the current eases in and out rather than snapping. The full iPhone suite passed with 633 tests, seven skipped, no failures. The Apple TV and Mac builds compile. I did not run the Godot desktop port, which has no sea yet, and I have not reviewed any of this on a real device. The raw review recordings are not committed.

A side find: the script that converts the phone code for Apple TV had drifted from its source after an earlier change. Fixing it also refreshed a stale TV status bar. I would rather have found it sooner.

## Hisense Podcasts: The Fix That Blanked the Library

My fix for a misdrawn password box on the television's podcasts app made things worse before it made them better. The cursor in the password field was drawing well below the box. I fixed that, signed in for real, opened the library, and the screen went blank. The [Hisense entry](/hisense/2026-11-03/) covers it, and the longer story sits in the [1 November article](/hisense/2026-11-01/).

The fix was a rendering hint applied to the form and to every element inside it. The television's log showed the web view complaining "tile memory limits exceeded" 336 times in four minutes. That fits a hint that gives every element its own drawing layer on a set with a small graphics budget. It is a fit, not proof, because the same warning also appeared after a clean restart from a background page.

![Apple Podcasts-style Shows grid on the Hisense television listing 30 shows in rows of six](hisense-podcasts-shows-grid-30-shows.png)

*The Shows screen on the Hisense television after stopping and restarting the app, captured at 12:57 PM on 3 November 2026. It lists 30 shows and draws normally, which is how I knew the blank screen belonged to the sign-in session.*

I then restricted the hint to the small form itself. The build sat in the queue because the build Mac's disk was too full, so I cleared about 7 GB of re-downloadable caches. I installed the result, signed in again, saw my podcasts and saw aligned password fields. That is what I saw on the screen, nothing more.

The television dropped off the network before I could pull a log for the fixed build, so I cannot say the memory warnings stopped. My first attempt to read the log failed because the set had not yet approved my Mac for debugging. I have not watched a long session or tried two-factor sign-in.

## Night Chorus: Liquid Slag, Unbuilt

Night Chorus, the crystal puzzle game once called Prism Shift, is getting a more convincing flooded floor. In the Mac prototype the drowned area read as a row of separate gem tiles. It is meant to read as one body of dark liquid with soft edges only where it meets open space. This is working-copy code, not a release, and I did not build it. See the [Night Chorus entry](/prismshift/2026-11-03/).

The new tests are the interesting part. One renders the real menu button at four widths, 224 to 480 pixels, and checks the pixels for a seam, a gap, mismatched ends and a rounded end stretched into a square. Another checks that the built app really contains the new artwork, since a folder existing in source proves nothing about what the packager included. My attempt to photograph the game failed because the build did not finish, and I ran none of the new tests.

## What Else Moved, and What I Skipped

The survey flagged more folders than I wrote up. The draft ads in TilePilot and BookForge are marketing copy only. AdGenerator, Build Fleet, Hermes Fleet, Grokbot, AI Budget Build and Game Validator are tooling upkeep I did not examine closely. The three Night Chorus parity folders are copies of the same game. The Omarchy, tailscale, ugreennas and macos9port folders are infrastructure or experiments, and leaving_kentucky is a do-not-promote project. The [day overview](/2026-11-03/) says the same. Yesterday's related reading is the [2 November story](/hisense-podcasts-snapdog-loom-night-chorus-worlds/2026-11-02/).

## What I Would Tell You

Check freshness, not just validity. A checksum proved the SnapDog archives were intact and said nothing about whether they were current.

Be suspicious of a fix applied to everything inside a form. Mine hit a television with a small graphics budget and I only found out by signing in for real.

And write down what you did not run. Four of the five items above carry an unverified caveat. That is the honest state of a Tuesday.

## Sources

- [Product Diary](https://blog.remnantsecurity.com/), the blog these entries publish to. I opened it on 4 November 2026.
- [SnapDog, capture, record and annotate from your Mac's menu bar](https://snapdog.remnantsecurity.com/), the product's public site. I opened it on 4 November 2026.
- The project entries for 3 November, the survey for that day, and screenshots from my own Pipe Flow and Hisense project folders.
