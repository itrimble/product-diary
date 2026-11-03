---
project: Daily Story
title: Hisense Podcasts, SnapDog Loom Import, Night Chorus Worlds
summary: A lost Apple sign-in exposed three hidden faults in my Hisense podcasts app, while SnapDog learned Loom imports and Night Chorus got 15 living worlds.
format: longform
stats: Hisense commits = 4 | AdGenerator commits = 4 | Night Chorus chapter images = 45 | Hisense Java tests run = 0
---
My Hisense television podcasts app broke on Monday in a useful way. The television lost its Apple sign-in, the app had to rebuild its library from my private feeds, and three faults that had been hiding came out at once. The remote could not stay on the tabs, OK did nothing, and the front page was empty. All three are fixed. SnapDog, AdGenerator, Night Chorus and Build Fleet also moved.

Monday was a follow-through day, and the television app has a longer history; I wrote up [how I first got control of that television](/hisense-tv/2026-10-11/) three weeks ago. Nothing shipped to a store. Most of the work was finishing what Sunday started, and I have to be straight about how much of it I did not test. I will say so in each section instead of saving it for the end.

## Hisense podcasts app: a lost sign-in finds three faults

The television forgot who I was. Without the Apple sign-in, the app could no longer lean on Apple's own library, so it had to build the shelves from my private subscriptions alone. That is the situation I had never tested, and it fell over in three places. It followed [Sunday's interface overhaul](/hisense/2026-11-01/), which gave the app its Apple-style layout. The full write-up of the fixes is in [the day's Hisense entry](/hisense/2026-11-02/).

![The Shows grid on a Hisense television: eight podcast covers in two rows with the first cover outlined](hisense-podcasts-shows-grid-six-up.png)
*The Shows grid on the television, captured on 2 November 2026 with only private feeds loaded. The header reads "8 shows · Apple and private subscriptions", and the white outline marks the selected cover. Two shows appear twice, once as video and once as audio.*

Here is what went wrong, and what I changed.

| Symptom | Cause | Fix |
|---|---|---|
| Remote could not stay on the top tabs | Every redraw of the grid grabbed focus, about 28 ms after each move | A redraw takes focus only if the grid already held it |
| OK on a cover did nothing | A cover could be focused but not clicked | Each cover and episode row carries its own click |
| Empty shelves on the front page | Private feeds merged in only after Apple's library refresh, which waits for a sign-in | The merge runs first |

The focus bug is the one I like least. It was a polite little theft: the grid moved the highlight away from the tab bar the instant I tried to stand on it. On a phone you would never notice. With a remote, it makes the tabs unreachable.

Two smaller repairs went in as well. The on-screen clock scheduled new updates without cancelling old ones, so callbacks could pile up over a long evening. A small ticker class now allows exactly one pending update, and a test runs 2,880 ticks, which is a day at 30-second intervals, and checks there is always one. The phone keyboard page also used to say "sent" while the television was frozen. It now waits up to three seconds for the screen to confirm, and says "check the TV" if it does not hear back. I also recovered the playback service and repaired navigation inside private feeds.

![Paused playback bar on the television showing an Intelligent Machines episode at 6:10 of 2:14:53](hisense-tv-playback-bar-paused-episode.png)
*The playback bar on the television, from a capture dated 2 November 2026. The screen is black because the video was paused; the bar shows the show, episode title, time and remote hints. I am including it to show the player exists, not as proof of the day's fixes.*

What I did not verify: I did not run the Java tests on Monday night, and the memory table in the tune-up notes still reads "not yet remeasured" for all four states. So I have no new memory numbers to give you.

## SnapDog learns to import Loom videos

SnapDog is my Mac capture and annotate app, and its public page is at [snapdog.remnantsecurity.com](https://snapdog.remnantsecurity.com/). On Monday it learned to take in a [Loom](https://www.loom.com/) video. You paste a public Loom share link, or pick a file you already downloaded from Loom, and SnapDog keeps a local copy and lists it in History tagged "loom". The reel-making studio can add it as a clip, too. The reason is plain: a lot of screen recordings live on Loom, and until now none of them could reach SnapDog's own editor. The details are in [the SnapDog entry](/snapdog/2026-11-02/).

The work covers three new Swift files for parsing, resolving and importing a link, a Python backend for the Linux version and a matching tool for the studio's automation servers. The parser accepts only `loom.com/share` and `loom.com/embed` addresses with a 32-character id. Everything else gets a clear refusal. When Loom offers only a stream and not a file, SnapDog says so and asks for the downloaded MP4.

The same commit put Auto-Scroll back in the live capture menu, corrected the README's destination count to 18, and made the studio build script run under the older bash that macOS ships. On Linux, the simulator build script now reads its version from the package file instead of a hard-coded 0.2.57, after the package was rebuilt as 0.2.58.

Now the caveats, which matter more than the feature list. The Linux unit tests passed. The Mac Loom tests, 125 lines of them, had not finished when I made the commit, and I did not run them again that night. Treat the Mac side as written, not proven. Link resolving leans on an unofficial Loom address, so it can break without notice. And the porting log says plainly that I did not observe an install on the Omarchy machine.

## AdGenerator panel plays the real ad

AdGenerator is the tool I use to build adverts out of recordings of my own apps. It became something I can click around in. The control panel opens on the SnapDog campaign, keeps a Projects page where an earlier ad can be reopened and renamed, and plays the actual advert inside a project, with zoom from 100 to 300 percent. See [the AdGenerator entry](/adgenerator/2026-11-02/) for the longer version.

Four commits, in order:

1. Project storage. Saves are atomic and refuse a stale revision, so two open tabs cannot silently overwrite each other. Older recipes migrate on a copy.
2. A home page that lists migrated demos with the SnapDog tutorial first, plus a project page.
3. The stage now plays the same composition the exporter renders. The preview is the product, not a lookalike.
4. The home page returns to the campaign, and a "Take stills" action writes muted frames after each beat has held.

The third commit added about 22,500 lines, nearly all of it one bundled preview script, so the diff looks scarier than it is. Footage, renders and the 19.8 GB restore image stay out of git, which settles the worry I raised last time about this folder having no history. New tests cover the store, the routes, composition files, reply metadata, the shot audit and the model catalogue. I did not run them. There is still no timeline or export on the project page. That is deliberate, for now.

## Night Chorus gets living worlds for all 15 chapters

Night Chorus is the crystal puzzle game that used to be called Prism Shift. In an experimental Mac version, each of its 15 chapters now has an animated world behind the puzzle, with its own hazards, and the board blends into that world instead of sitting on top of it. Nothing here has reached players. The day's record is [the Night Chorus entry](/prismshift/2026-11-02/).

![Chapter 10 background art: a dark hall of purple crystals receding to a vanishing point](night-chorus-chapter-10-crystal-hall-background.png)
*Background art for chapter 10, a wide image committed on 2 November 2026. This is the painting behind the puzzle, not a gameplay screenshot, and in the game it moves; a still cannot show that.*

Two commits did it. The first wired 15 chapter profiles to background art in phone, tablet and wide sizes, which is 45 new images of roughly 2.5 to 3.2 MB each. It also added retained motion, a Pulse Line light effect, clearer responses to moves, themed hazards and a readable on-screen display. The second gave each chapter an identity in motion: caustics for water, orbit rings, heat shimmer, circuit streams and prism glints. Four beats of the soundtrack drive a slow ambient breathing. The grid and edge opacity were softened so the art reads through, and the splash on landing now stays at the hazard that caused it.

The experiment hides behind a `-mocoRoom` launch flag, and a second flag opens a chapter for review. The checks ran on the build fleet on the Mac mini. The first run built the Mac app and passed all 14 InfinityRoom tests, and the second passed 22, including each chapter's effect and the artwork seams at three screen shapes. I reviewed chapters 2 to 15 by eye in the native prototype. I have not done a live all-chapter pass on a desktop I am sitting at, and I make no frame-rate claim for any device.

One more honest note. The game is still marked as unreleased on my own asset list, and its audio has no clearance for outside distribution. That is why you get a still of the art and nothing with sound.

## Build Fleet stops crying wolf

[Build Fleet](/build-orchestration/2026-11-02/) spreads my building work across the machines in the house, and it watches for builds that skipped it. That watcher had been flagging Android builds I had deliberately kept on one Mac, because the toolchain only works there. It also named wrapped builds by the first folder change in the command, which is the wrong name. This follows [Sunday's work on tracking AI sessions](/build-orchestration/2026-11-01/), where the watcher first caught two Android builds.

Builds that declare `BUILDFLEET_LOCAL=1` now stay in the bypass ring and are mentioned in the alert detail, but only undeclared builds count toward the alarm. The classifier also now handles a build inside `bash -lc` with a redirection in the quoted body. Each fix has a test. I did not re-run the full suite, which stood at 319 tests the day before, and I have not watched the alarm stay quiet on a real build since. Fewer false alarms should make the true ones easier to believe. I will believe it after a week.

## Books Site: Dead Signal reader page

The Dead Signal pages on my books site now have a reader page holding the real opening chapter, and they report where visitors came from. The old sample page forwards to the new one. This is groundwork for a small advertising test, where a few dollars a day is wasted unless I can tell which ad brought someone in. [The Books Site entry](/books-site/2026-11-02/) has the detail, and most of it repeats [Wednesday's tracking work](/dead-signal-ad-tracking-snapdog-notes-fixed/2026-10-28/), except that the change landed as a real commit this time.

A small script sends three events to PostHog: a landing view, a reader view and a click on the launch-list button. That button is still an email link, because I have not connected a mailing-list provider. I did not load the pages in a browser, did not confirm that events arrive, and did not test the redirect. Do not take that site as checked.

## Left out on purpose

Some changed folders got no entry. Lectern changed only a handover note, and QixForge and StatBar each gained only a draft of sales ad copy. Pipe Flow's changes were screenshots and review files from an agent folder, and CyberSimApp's dirty files were App Store archive build output. Hermes Fleet, the cua workspace and the Omarchy, tailscale and ugreennas folders are machine upkeep, so I left them out of the record.

## What I would tell you

Test the signed-out state. My television app looked finished for weeks, and a lost login showed me three bugs in an afternoon.

Count your untested work out loud. By my own tally, the Hisense Java tests, the SnapDog Mac tests, the AdGenerator suite, the Build Fleet suite and the Books Site pages all went unchecked on Monday night. Only Night Chorus and the Linux SnapDog tests had a green result I can point to.

Prefer a preview that is the product. AdGenerator now plays the same composition it exports, and that is the one change from the day I would copy into other tools.

## Sources

- [SnapDog product page](https://snapdog.remnantsecurity.com/), opened on 3 November 2026; the page title describes capture, record and annotate from the Mac menu bar.
- [Loom](https://www.loom.com/), opened on 3 November 2026 to confirm the service SnapDog now imports from. I did not test SnapDog against a live Loom link.
- Everything else here comes from my own project entries for 2 November 2026, the git history of each project folder and the screenshots credited in their captions. I did not open the Night Chorus public page, because it did not respond when I tried.
