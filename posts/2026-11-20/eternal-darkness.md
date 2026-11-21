---
project: Eternal Darkness
title: "Eternal Darkness: 4K in a Window, a Slider That Reaches Black, and an R1 That Skips"
summary: The recompilation now renders up to 4K and ultrawide inside a Mac window, has a brightness slider that goes black, an Options spread that reads like the game's own book, and a skip on R1. The sound was clean.
format: longform
category: games
stats: Render = 3840 by 2160 | Window = 1454 by 777 | App = 9.1 GB | Skip = 0.6 s
---

Eternal Darkness is running in a window on this MacBook Pro, from the European disc on my desk. Two sittings got it here. The first one was about the frame: a window, sixty a second, and a follow-the-screen choice that stayed hidden because nothing attached can change its rate. The second one was about the picture and the hands: 4K and ultrawide, a brightness slider that can go black, an Options spread that reads like the game's own book, the pad's own symbols, an R1 that skips, and an app you can double-click. The sound turned out to be fine all along.

## A window, not the whole screen

The game opened at 1454 by 777 points, which this display draws as 2908 by 1554 pixels. I left it windowed. The picture inside that frame is 2763 by 1554, the 16:9 fit, and the menu calls the resolution "Window" at that size.

![Eternal Darkness launcher in a Mac window before the game starts](eternal-darkness-launcher-window.png)

*The launcher, in one window, at 19:42 on 20 November 2026. Continue points at a save from 18 November, and the game has not started.*

I started it on a throwaway copy of the memory card, with sound off, because I was capturing rather than playing. After I quit, the real card, the real mid-game save and the real settings file were the same size and the same age as before the launch. The card is still 122,988 bytes.

## Sixty, once the movie was over

The counters did not agree with themselves until the title screen.

| Moment | When | Title bar | Corner |
| --- | --- | --- | --- |
| Nintendo logo | 19:43 | 58 | 58 |
| Opening movie, one blurred frame | 19:44 | 48 | 51 |
| Title screen | 19:45 | 60 | 60 |

![Nintendo logo on a black Eternal Darkness window reading 58](eternal-darkness-nintendo-logo-58fps.png)

*The Nintendo logo at 19:43 on 20 November 2026. The title bar and the corner counter both read 58 while the logo was up.*

![Eternal Darkness title screen in a window with both counters at 60](eternal-darkness-title-screen-60fps.png)

*The title screen at 19:45 on 20 November 2026. Both counters read 60, which is the number I trust from this sitting.*

A probe during the first launch settled on 17.074 ms between pictures, 58.57 a second, after an earlier pass that did not settle. The second launch, held on the options page, settled on 16.663 ms, 60.01 a second, after three passes that did not. The screen itself reports a fixed 60. I would not hang a claim of a perfect lock on one short probe. The title screen is the reading that sat still.

The dip during the logo and the movie is the disc video being decoded. I did not time a fight, a walk down a corridor, or a long still shot. Those are open.

## The menu will not invent a faster screen

Options, with Frame rate selected, shows 60. The note underneath says the screen is running at 60 Hz and that smoother motion needs a faster one. The program's own list of choices, printed as it started, was only 60. There is no row called Variable.

![Options page with frame rate selected and stuck at 60](eternal-darkness-options-frame-rate.png)

*Options at 19:48 on 20 November 2026, second launch. Frame rate is selected, the value is 60, and the note says this screen is at 60 and smoother motion needs a faster one.*

I asked the system about every attached screen at 19:49, after the game had quit.

| Screen | Points | Shortest interval | Longest interval | Step |
| --- | --- | --- | --- | --- |
| LF32TU87 | 2304 by 1296 | 0.016668 s | 0.016668 s | 0.016668 s |
| IIIP 44522 | 2496 by 1404 | 0.016668 s | 0.016668 s | 0.016668 s |
| 100027813 | 1920 by 1080 | 0.006061 s | 0.006061 s | 0.006061 s |
| Elgato Prom. | 1024 by 600 | 0.016667 s | 0.016667 s | 0.016667 s |

On each one the shortest gap equals the longest, and the step equals that same gap. A step of zero would mean the screen can take any rate between those limits. None of these four said zero. The 165 Hz panel (the 0.006061 second row, which is 165) is a fixed 165, not a screen that varies. The laptop's own panel was not in the list at all.

## What the hidden choice is for

The game still steps 60 times a second. I did not change that clock. When a screen can run faster than 60, the picture can be drawn more often than the game steps, with one blended frame in between. The new choice, Variable, is for a screen whose rate is allowed to move. It asks for the range that screen offers and prefers the top of the range, and the system may still drop lower. It does not pin the game at 120.

A fixed faster panel is a different offer: a number, such as 165, not the word Variable. That offer depends on the window actually being on that panel. Tonight it was not.

## Four thousand pixels into a 1454-point window

The internal resolution row now goes to 4K, which is 3840 by 2160. At 21:9 the same height becomes 5040 by 2160. The window does not change size when you pick it: the game draws at that size and the present pass fits it into whatever the window is.

On this laptop that is a downscale, and the log says so. With the window at 2908 by 1554 pixels, a 4K frame came back as 2763 by 1554, and the 21:9 frame as 2908 by 1246. MetalFX stayed off, because there is nothing there to upscale. It is the present pass doing the scaling, in the other direction.

The counter read 60 in 24 of 26 one-second samples and 59 in the other two. The panel measured 59.97 Hz. Once the load settled, the process used about 55 to 62% CPU and 1.4 GB of memory, with HDR, ambient occlusion and the HD texture pack on.

What that buys on this desk is a finer picture before it is fitted to the window: the tome's page, the dialogue text, the stone under a lamp. What it does not buy is a 4K output, because the window is not 4K and the screen behind it is not either. I have not put the window on the 165 Hz panel with 4K as well; that is the combination still open.

## A slider that reaches black

Brightness is a row on the Picture page. Open it and the game's own dark room fills the window, with the game's TV warning under a parchment banner and the slider along the foot.

Fifty is the picture as it is. Left and right step by one. It does not touch `settings.ini` while you sit there; it is written when you quit, as `brightness = 50` alongside everything else that was already in the file.

The first version was wrong in a way only the person looking at the screen could catch. At 0% the room was half the light: the stone fell from mean RGB 25.1, 17.9, 9.0 to 16.4, 11.3, 5.5. Dimmer, and still plainly visible. I said black has to mean black. So the dark half is now a fraction of the light rather than half of it. At 0 the upper room has no pixel above 2, while the banner, the warning and the slider stay readable. At 50 the room matches the earlier capture exactly — pixel difference 0. At 100 the lamp went from 87.4, 64.1, 30.7 to 121.3, 90.3, 45.6.

The room is the game's, from the texture pack, not a grey card I drew to look like one. What I have not photographed is a real gameplay frame under the gain. A room is a room.

## The Options spread is a book again

For a while Options was a stack of pages you opened one at a time — the frame-rate picture further up is from before this layout. It is the game's own two-page spread now: display, picture and sound on the left, light, play and illusions on the right, with the disc and Back at the foot.

![Eternal Darkness options spread with Window selected and Brightness at 50%](eternal-darkness-options-book.png)

*The Options spread at 14:41 on 21 November 2026, windowed on a throwaway card. Window is selected, the resolution reads "Window (2763×1554)", Brightness sits at 50%, and the footer has switched to the pad's Cross and Circle.*

A value only wears ‹ › when left and right can change it. Frame rate on this 60 Hz screen has no arrows, because 60 is the only choice. Calibrate HDR has none either, because it opens three steps of its own. The arrows act on the press; there is no accept.

The pages are sized by their rows now, not by a fixed height. An earlier build fixed the height, and the right-hand page collapsed into a single column of rows. That is why the two pages line up the way they do.

## The pad's own pictures

A DualShock 4 (vendor 054c, product 09cc) switches the prompts to its own symbols: Cross to select, Circle to back, in the footer of the book and under the in-game menus. The startup check looks for both the keyboard and the PlayStation sheets on disk, and the log says so — `keyboard and ps4 icons present` — rather than trusting that they are there.

Turning a pad on while the menu is already open now marks the menu dirty, so the footer changes to Cross and Circle at that moment. Before that, the book kept showing keys until it was rebuilt. A key press switches the prompts back to the keyboard sheet, which is what you want when you are mapping something with the mouse.

The light bar is set through SDL, and the log records which path was used.

## R1 that did nothing

"I pressed R1 to skip and nothing happened." That was the report. The pad was innocent: vendor 054c, product 09cc, connected, buttons working.

The bug was in our fast-forward guard. A shoulder button that goes down outside a cutscene is remembered as "held from play", and the flag is only cleared when you let go. It exists so that holding R1 for something else during play does not fast-forward the next scene. But at the logo cards there is nowhere else for R1 to be, so holding it from launch armed the guard and then refused the movie.

Now a held R1 counts as a skip until the first cutscene ends, and while a movie file is open the game is handed its own skip — A, pulsed six frames in sixteen, the same path the automated intro skip uses. Cutscenes that play in the letterbox bars still fast-forward, because A means something else there.

Measured with a scripted pad, which runs through the same code as a real one:

| Held from frame | What happened |
| --- | --- |
| 880, from launch | movie 968 to 1002; next movie 1288 to 1323 |
| 1850, after the intro | movie 1970 to 2792 ran whole |
| 2000, inside a cutscene | skipped |

Fourteen seconds of intro becomes about half a second, and the guard still refuses a button held from play. The bottom-right prompt now draws a skip sign — a bar after the triangles — while a movie is up, though I have not looked at that sign on screen yet.

Two caveats, both mine to state. I have only done this with the scripted pad; a hand on the physical pad has not confirmed it yet. And the fast-forward that remains for letterbox scenes is not the 4x the clock asks for: the retraces follow the audio the game manages to produce, so a movie that decodes at 1.5x will run at 1.5x. That is why it felt like 1.25 or 1.5.

## The sound I captured was clean

There was a weird noise at launch, and it was heard while another converted game was also running on this Mac. So I captured what the recompilation sends to the speakers before changing anything.

`ED_PCM_OUT` wrote 1,618,352 stereo frames at 32 kHz — fifty and a half seconds of a disc boot. Peak 18816 out of 32767, no clipped sample, and the only silences are the boot's own: 3.13 seconds of it at 12.18, and 2.33 seconds at 29.69. No chunk was dropped in the middle of a piece of music.

The two streamed tracks the game prepares were decoded again, in Python, with Dolphin's ADPCM coefficients: the boot music at 0x08508000 and the drone under the Dolby card at 0x03A90000. The independent decode matches what the host sent, spectrum and all. The host was sending what the disc holds.

The start game, load game and options screens sound fine now. The earlier noise was heard with another converted game running, and I cannot prove which app made it — what I can say is that the fifty seconds I captured from ours were clean, and I am not going to quietly ship a change to a mixer that was never shown to be broken.

## One 9.1 GB app you can double-click

The build is a Mac app now. `dist/Eternal Darkness.app` is 9.1 GB and holds the game, 49 libraries, the European disc, the HD texture pack, the menus, the icon, a copy of the settings, the memory card and the saves. It boots the disc, not the tome: the launcher passes `--no-launcher`, so a double-click goes to the logos and then the title.

The disc, pack, card and saves are APFS clones, so they share blocks with the project copies until something writes to them. The signature is ad hoc and proves only that the bundle is internally consistent. It is not notarised, nothing was uploaded, and the game is Nintendo's.

The window that came up from the app loaded 7,738 textures, and with R1 held through a scripted pad it skipped the intro movies, same as the development build.

## What I would tell you

Leave the frame rate at 60 on this desk. Sixty is the game's own step, and once the title was up the picture matched it. The opening movie dipped, which I expected, and I still have not measured a real play session.

4K here is an internal resolution, and it is worth setting for the finer detail before the downscale. It is not a 4K picture on a 4K screen, and I will not pretend otherwise until I have put the window on a 4K display and looked.

Turn brightness down with your hand on the slider, not by trusting the number. The one thing that mattered was 0 being black, and that took a second pass.

R1 skips the movies now. Real-time cutscenes still fast-forward, and they will stay slower than the clock asks. If you want those to feel like a skip too, that is a different job and I have not done it.

And if the sound seems wrong, capture it before blaming the mixer. Ours was clean for the whole boot, and the noise was heard with another game running.

The 165 Hz monitor is still the nearer test for Variable, and I still have not run it.

These screenshots stay on this machine. On 19 November I made the same call for a PlayStation 3 conversion: the frames are from a commercial game, and they are not mine to post. [That write-up](/dante-recomp-host-plays-gow3-recomp-hangs/2026-11-19/) has the short version of how far that one got, and no pictures. Eternal Darkness is further along, in the sense that I played to the title screen and read 60 off it, then set 4K and a brightness slider and skipped an intro. It is not further along in the sense of being mine to publish.

## Sources

### The recompilation

- [Eternal Darkness Recomp](https://github.com/griches/EternalDarknessRecomp), read from the repository page on 20 November 2026. The readme says version 0.9.6, European disc only, and that a faster screen can draw frames between the game's own 60. I did not re-read every control picture in that file. The upstream project already had the "faster than 60" idea. Variable, as a choice that follows a screen whose rate can move, is the work on this machine, and it is not in that readme.

### How a Mac describes a screen's rate

- [displayUpdateGranularity](https://developer.apple.com/documentation/appkit/nsscreen/displayupdategranularity), Apple's documentation for the step between a screen's rates. I opened the page on 20 November 2026. The fetch came back as a title only, because the page is drawn in the browser. The sentences I am using are the documentation text returned for that same address the same evening: a step of zero means any rate between the shortest and longest interval, and a fixed screen reports the gap between the rates it supports. I also read the matching declarations in the Mac system headers on this machine. I did not watch Apple's variable-refresh talk, so I am not citing it.

### What I could not open

- The Dolphin forum thread the readme links for the texture pack. The site answered with a bot check and no thread. I am not treating that thread as read.
