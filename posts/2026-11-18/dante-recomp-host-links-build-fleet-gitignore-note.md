---
project: Daily Story
title: Dante Recomp Host Links Two Programs, Nothing Run Yet
summary: My PS3 game-conversion experiment finished a Mac build on Wednesday, but I have not launched it, while Grok Bot and Hermes Fleet reported quietly.
format: longform
stats: Dante build steps = 84 | Generated source files = 75 | Assistants in the fleet = 31 | Progress previews = 7
---
On Wednesday my Dante Recomp Host experiment, which turns a PlayStation 3 game into code a Mac can build, compiled all the way to the end and produced two programs. I have not started either one. A clean build only proves the pieces fit together, so the honest headline is that nothing has appeared on screen yet.

Wednesday was a bookkeeping day for everything else. My assistant notes gained one new name, my house assistant wrote seven progress reports, and my build fleet's guide gained a warning about files that never leave the machine. Here is what I saw, what I checked and what I did not.

## Dante Recomp Host: an 84-step build that stops at "it links"

The [Dante Recomp Host entry](/dante-recomp-host/2026-11-18/) has the detail. The short version is that the build log shows 84 steps and finishes at 21:38 with two links, one for the game program and one for a window to show it in.

The host folder holds 75 generated source files. 73 of them are numbered chunks of translated game code. The rest are a table of system-call names, an entry file and a stubs file. The build files and the entry file were edited at 17:22 and 20:59, so the evening was spent nudging the build until it went through.

| Measure | Value |
|---|---|
| Build steps in the log | 84 |
| Generated source files | 75 |
| Numbered code chunks | 73 |
| Finished | 21:38 |
| Programs launched | 0 |

There are compiler warnings. A deprecated memory call and a few format mismatches in the loader showed up, and I fixed none of them. I would not call that a problem yet. I would call it the list I get to work through when something actually runs.

The toolkit beside it is a separate folder with 318 files stamped Wednesday. 46 of its docs share one 16:18 timestamp, which looks like a bulk copy, and the folder has no version history. Its changelog still tops out at v0.16.0 from October. One note there describes a fix where a depth value of exactly 1 was written as zero. I read the note and did not check whether the fix landed today.

There is also a wall that no amount of compiling gets around. The disc's main executable is a retail-encrypted file. The toolkit refuses to unwrap it and does not ship keys, and I left the game's own files alone. I looked at a terminal capture of that check from 16:24 and decided not to publish it. It shows an internal drive path and a machine name, and neither belongs in a public post.

## Grok Bot: a thirty-first assistant with no job description

The [Grok Bot entry](/grokbot/2026-11-18/) records a new assistant called Game Guru, added on Tuesday afternoon. Its profile is a name and nothing else. No description, no title, no approval rules, no schedule. I wrote its purpose down as unverified, and I suspect it overlaps with Game Stores, which already watches games.

The Wednesday refresh, at about 05:50, compared 31 live profiles against the snapshot saved on the 17th. Game Guru was the only new one. Improve My Bots was missing again, which is normal, because it leaves itself out of its own audit. No names or descriptions changed. If you read the [quiet Saturday entry](/grokbot/2026-11-14/), this is the same pattern with one new row.

One thing failed. The 05:24 full scan of my projects folder could not reach the Mac mini and died with the same proxy error three times. The latest-differences file is therefore stale and still compares the 15th with the 16th. I logged it as open work. Intraday scans from 13:23, 17:22 and 21:30 exist, and none has a note yet.

The machine check was mixed. The Mac mini answered on the first try. The MacBook Pro had been offline for about 15 hours, the Neo for about four days and the omarchy box for about eight. The server box rebooted at about 4:15 PM on Tuesday and has roughly 12 GB free of 15.

I did not open the bot profiles. The survey counted 85 changed files in that folder, but it has no version history, so I could not diff them. I read the top of the changelog and stopped.

## Hermes Fleet: seven progress previews and a stale inventory

[Hermes Fleet](/hermes-fleet/2026-11-18/) is the house assistant that reports on what my coding helpers did while I was away. It wrote seven previews between noon and 23:40 on Wednesday. This is its first entry since [31 October](/hermes-fleet/2026-10-31/).

I opened only the 23:27 one. It covers Quiet Links, my browser golf game, and it is blunt. The work was still in progress. After my playtest the helper was redirected to gameplay problems: power and distance estimates, camera visibility on the green, stale aim readouts, hotkeys leaking out of menus, and switching holes without reloading art. It says the earlier 117-test pass and 60 frames a second on desktop predate that work, and that phone speed is unmeasured. I have not checked any of it. The other six previews stayed unread.

The golf game got its own write-up on Tuesday, in [the story about the golfer and phone controls](/golfprompt-quiet-links-golfer-phone-controls/2026-11-17/). The three pictures below are from that day, not Wednesday. I did not have a fresh Wednesday capture, and I would rather say so than imply otherwise.

![Quiet Links on a desktop browser with a score panel, club panel and distance readout above a fairway](quiet-links-desktop-hud-driver-estimated-carry.png)

*Quiet Links in a desktop browser, captured Tuesday 17 November at 13:13. The club panel at top right shows an estimated carry of about 236 yards for the driver. I cannot say whether that readout is the estimate the Wednesday preview mentions.*

![Quiet Links on a phone-sized screen with touch buttons, an aim stick and a large swing button](quiet-links-phone-hud-9-iron-fairway.png)

*The phone layout, captured Tuesday 17 November at 17:42. Club buttons sit on the right, an aim stick bottom left and a swing button bottom right. Wednesday's note says phone speed is unmeasured.*

![Quiet Links putting view with the golfer at the top of the frame and a distance to the cup of 3 feet 3 inches](quiet-links-putting-green-desktop-hud.png)

*The putting view, captured Tuesday 17 November at 17:41. The distance to the cup reads 3 feet 3 inches. The club panel still says Driver with a carry estimate while the lie is Green, which is the kind of stale readout the Wednesday note says is being fixed.*

The household inventory is the stale part. Its files were last regenerated at 03:01 on 10 November, so nothing from Wednesday is in them. That refresh found the NAS and the MacBook Pro verified, and the Neo and the omarchy box unknown, one after a timeout and one after a name lookup failure. The podcast settings from late October, a preview mode and a 120-word minimum, are still uncommitted. I did not log into any machine, so I cannot say whether the Neo and omarchy box are back. The Grok Bot entry above says they were still offline on Wednesday, which is the more recent evidence.

## Build Fleet: a note about files git ignores

The [Build Fleet entry](/build-orchestration/2026-11-18/) is one paragraph long, and I think it is the most reusable thing from the day. When a build is sent to another computer, files that version control ignores get left behind. If the build needs them, it fails over there for no obvious reason.

The edit went into the fleet-build guide at 17:22. The snapshot of a project inside a git work tree is the tracked files plus untracked files that are not ignored. That matches how git's own documentation describes it: [gitignore](https://git-scm.com/docs/gitignore) covers intentionally untracked files, and [git ls-files](https://git-scm.com/docs/git-ls-files) lists others only with the others flag, and drops ignored ones when you ask for the standard exclusions. Outside a work tree the snapshot is a filtered walk. Either way, a gitignored folder of generated sources never makes it.

The advice is to point the project path at a directory outside that work tree and put the generated folder there. Do not add the files to git just so the snapshot can see them. I did not test that advice, and I cannot say what triggered the note. The change is still uncommitted.

Four entries showed as dirty in the survey. Three of them, the project instructions file, the watch notes and a Swift build folder, are older, stamped 3, 5 and 8 November. The open items from the last entry stand: all six acceptance goals are open, live Cursor dispatch lacks a stored key, and the Mac app's build 10 was never exercised on screen.

## What I would tell you

- A build that links is not a game that runs. Launch the thing before you describe it.
- If a build fails on another machine and works at home, check what your ignore file is hiding before you check anything else.
- A new assistant with no description is a note to write, not a feature to announce.
- Read the stale files before you trust the dashboards. Two of my machines have been unreachable for days, and the inventory did not know.

## Sources

I opened these pages on 19 November 2026 and read the passages I cite.

- [gitignore documentation](https://git-scm.com/docs/gitignore), on what ignore files specify.
- [git ls-files documentation](https://git-scm.com/docs/git-ls-files), on the others and standard-exclusion options.

Everything else comes from my own project entries for 18 November and the project folders on my Mac mini. I did not run any build, launch any program or open the Hermes previews other than the 23:27 one.
