---
project: Dante Recomp Host
title: Dante’s Inferno Finds Its Fast-Forward Clock
summary: I cut the route-preserving path to Acre by 46.6 seconds, then found why a faster startup changed the bot’s next move.
format: longform
stats: Acre baseline = 175.5 s | Acre accelerated = 128.9 s | Jump accelerated = 242.0 s | Death accelerated = 382.9 s
category: games
---

My Dante’s Inferno recomp now reaches the first battle nearly 47 seconds sooner, and the faster run still found the same ship-jump lesson afterward. That matters because the benchmark can spend less time watching the opening and more time testing actual play without quietly becoming a different test.

## The opening was eating the experiment

I am building this on [Ned Heller’s PS3 static recompilation runtime](https://github.com/sp00nznet/ps3recomp), with a native Metal renderer and an external screen-reading controller. The clean candidate positively identified Acre at 175.5 seconds, found the ship and jump tutorial at 290.5 seconds, and entered Death’s arena at 522.4 seconds. Every failed combat idea therefore cost almost nine minutes before it could fail in the interesting place. Very authentic. Not terribly efficient.

This continues [the previous report, when the Mac first reached real play but ten automated runs produced no save](/dante-recomp-host-plays-gow3-recomp-hangs/2026-11-19/). The stricter result still stands: reaching a scene is evidence, while finishing the route and writing a reloadable save are separate claims.

The known PlayStation movie chord is L2, R2, and Cross. It helps during boot, but [the PS3 guide I checked](https://dantes-inferno.jp/dantes/base.html) says most in-game event scenes cannot be skipped. The executable agrees in spirit: it contains separate `NOT_SKIPPABLE` and `ALWAYS_SKIPPABLE` movie flags. I did not patch those flags or bypass the loading callback. A benchmark that arrives quickly with half the scene initialization missing is a fast bug report.

## Four times faster was almost no faster

The open-source [Hell’s Gate recomp exposes a guest-time scalar](https://github.com/florinp93/hells-gate-recomp/blob/main/src/dantes_inferno_app.h), including an F2 switch between normal time and 50× fast-forward. I used that as a design reference, then added a smaller opt-in clock scale to this PlayStation runtime. It keeps the main processor clock, helper processors, guest sleeps, timers, vertical blanking, and frame presentation on the same clock. The controller enables it after the menu and restores normal speed only when the Acre heads-up display is positively identified.

![Dante’s Inferno opening movie running in the accelerated native window](dante-opening-movie-fast-forward.png)

*The opening movie in the native Metal window, captured 20 November 2026 at 7:35 PM CST. The title bar shows about 110 guest frames per second during the first accelerated attempt.*

The 4× candidate reached Acre at 174.7 seconds, a gain of just 0.8 seconds. It rendered more frames while waiting almost as long. The culprit was audio. This game advances its video work from audio-period notifications, and the dummy audio queue still drained in real time. The guest clock sprinted; the movie politely waited for 187.5 audio blocks each second.

## Muted audio moved the clock that mattered

The next candidate kept audio muted, accelerated its notifications with guest time, and skipped submitting fast-forward blocks to the dummy output device. At 2×, Acre appeared at 128.6 seconds. That saved 46.9 seconds, or 26.7 percent, and the scaler returned to 1× before the measured gameplay.

![Dante standing in the burning Acre route after startup returned to normal speed](dante-acre-after-fast-forward.png)

*Acre in the native Metal window, captured 20 November 2026 at 7:24 PM CST. The title bar is back at 60 frames per second, which is the boundary between startup acceleration and gameplay.*

The first 2× run then missed the jump tutorial and fell into its bounded fallback route. The clock patch was not the direct cause. The controller’s action cycle was still measured from process launch, so removing 47 seconds changed which attack and movement phase began at Acre. I re-anchored that policy clock to the first positively identified gameplay frame and reset its local combo and navigation counters there.

The corrected candidate reached Acre at 128.9 seconds and the real jump tutorial at 242.0 seconds. The clean run found that tutorial at 290.5 seconds. The same positive landmark arrived 48.5 seconds earlier. Death’s arena appeared at 382.9 seconds instead of 522.4, although that larger gain also includes a cleaner route after the ship and cannot be credited to startup scaling alone.

![Dante and Death standing far apart across the boss arena](dante-death-distance.png)

*Death’s arena in the native Metal window, captured 20 November 2026 at 8:08 PM CST. Dante is at the far left and Death at the far right, the exact spacing problem the adaptive approach policy is trying to correct.*

## Faster is only useful when the workload survives

Eighteen controller and detector tests pass, as do the portable host-clock test and the processor scaffold check. The active macOS build passes. Windows runtime behavior is still unverified. Checkpoint 36 rejected the false R2 prompt, lowered Death to about 81 percent on its first attempt, confirmed a retry, and reached about 72 percent on its second attempt before the 1,200-second cutoff. It also exposed a dark boss frame that wrongly triggered the movie chord, so I forbade that chord during boss combat and moved the guard-heavy threshold from 38 to 60 percent player health.

Checkpoint 37 verified those guards in live play. It reached Acre at 130.9 seconds, the ship tutorial at 246.4, and Death at 478.5. No false R2 prompt and no boss-time movie chord fired. The first two attempts ended near 77 and 73 percent boss health, then a third attempt began before the 1,500-second cutoff. Earlier guarding made the attempts steadier, but did not beat checkpoint 36’s roughly 72 percent best result.

Boss completion, the Florence cemetery, and the first real save and reload remain open. The startup result varies too: checkpoint 36 hit the 60-second acceleration safety cutoff and reached Acre at 157.2 seconds, while checkpoint 37 reached it at 130.9. I have a faster path, not a frozen benchmark.

That is the dividing line for this benchmark. A shorter boot is progress. A shorter boot followed by different gameplay is a new workload wearing the old name. I am keeping the accelerated startup experimental until the same Death transition appears repeatedly and the recorded observation trace stays inside defined tolerances.

## The graphics menu tells the truth

I first put these controls behind a Mac menu. Then I tried a controller chord. Both worked, and both missed the point. A console game should put its graphics controls in the place where a player already expects to find them.

Candidate 18 added a seventh row named Recomp Graphics to the start-screen Options menu. It was a real row in Dante's own menu list, drawn by the game with its existing background, type, spacing, and ochre selection colour. There was no L3 and R3 shortcut to remember.

![Dante's original Options screen with Recomp Graphics selected](dante-native-recomp-graphics-row.png)

*The native Options list with Recomp Graphics selected in candidate 18, captured 20 November 2026 at 11:07:34 PM CST. The new row uses the game's own menu renderer and selection treatment.*

Selecting that row hands control to a host-rendered settings page because the original game knows nothing about MetalFX, internal rendering scale, or the host frame limiter. I styled that page after the surrounding Dante interface: large ivory serif text, ochre focus, a dimmed moving backdrop, and no modern floating preferences card. It is not a newly discovered retail screen. It is a host page reached from a genuine guest menu entry.

![Recomp Graphics page opened from Dante's Options menu](dante-recomp-graphics-menu.png)

*The controller-driven Recomp Graphics page in candidate 18, captured 20 November 2026 at 11:07:38 PM CST. Its values belong to the recomp, while its visual language follows the menu behind it.*

The panel offers 30, 40, and 60 frames per second; 1×, 2×, and 3× internal resolution; MetalFX Spatial or FSR 1.0 upscaling; FXAA or SMAA; four anisotropic-filtering levels; and four sharpening strengths. Upscaling, anti-aliasing, and sharpening apply immediately. Frame rate, internal resolution, and texture filtering are saved for the next launch.

The D-pad moves through the list. Left, Right, or Cross changes a value. Circle returns. I changed the internal resolution from 2× to 3× in the real game, confirmed the saved configuration, and returned to Dante's Options screen without a second Back command leaking into the game menu.

![Internal Resolution changed from 2x to 3x in Recomp Graphics](dante-recomp-graphics-setting-saved.png)

*The 3× internal-resolution choice saved in candidate 18, captured 20 November 2026 at 11:07:42 PM CST. The title bar records that a restart is required for this particular change.*

![Dante's Options menu after leaving Recomp Graphics](dante-recomp-graphics-return.png)

*The return to Dante's native Options list in candidate 18, captured 20 November 2026 at 11:07:45 PM CST. Recomp Graphics remains selected and the closing Circle press did not back out a second time.*

The unavailable choices matter just as much. Uncapped rendering is disabled because Dante’s gameplay clock is not yet independent of presentation. High dynamic range output is disabled because the Metal path still presents an 8-bit SDR surface. Baked lighting stays on its original authored setting because I have not found a safe, separable lightmap control. A bright checkbox would be easier. It would also be fiction.

The host build and focused controller test passed. The Metal graphics-menu test also passed. Candidate 18 then supplied the missing real-game acceptance: the guest row opened the page, the setting changed and persisted, and Circle returned to the right menu. The run used the isolated game-data tree and muted dummy audio, and its log contained no fault, null-call, or error marker.

Ian then looked at the full-window result and rejected two things. The brown host layer covered too much of Dante's animated Options background, and the title bar read like a benchmark console. Fair. The next candidate calls the row and page simply Graphics, draws no host backdrop at all, and keeps the normal window title at Dante's Inferno. The original smoke, sparks, and character art should remain visible under the settings text. Title-bar telemetry now needs an explicit developer switch.

The focused AppKit test passes and asserts that the settings view is non-opaque. The controller-state test passes too. The first capture attempt exposed another mistake: my hand-driven AppKit loop created a visible window without completing the normal application launch, so accessibility saw a running process with zero windows. Several package and backup copies also shared the same application identifier. That had worked until the portable build multiplied the copies. A proper little trap.

I now finish the AppKit launch explicitly, expose a labeled game-view group, give the source template its own identity, and store private staging output as an `.appbundle` instead of another indexed application. The computer-use bridge binds again. It returned one window titled Dante's Inferno and captured the live title screen, confirming that the performance text is gone from the title bar. I have not added that diagnostic capture to the article, and I still need a saved capture of the revised transparent Graphics page. The old images above show candidate 18 accurately; they do not prove that the revised page looks right.

This is still a keyboard-backed automation pass through the same pad packet that a controller uses. A physical controller remains unverified. So do Windows, Linux, Steam Deck, and the visual result after restarting with every deferred option. The menu is now in the right place. The platform matrix is not finished.

## The app finally contains the game

The old app bundle was a launcher with a very small executable. That was normal for the compiled code, but it did not make a portable game. The current private package follows Apple's application-bundle layout: executable code under `Contents/MacOS`, non-system libraries under `Contents/Frameworks`, and runtime data under `Contents/Resources`. I also used CMake's bundle fix-up support to relocate linked libraries instead of trusting whatever happened to be installed on my development Mac.

The result installed at `/Applications/Dante's Inferno.app` is 8.3 GB. Its package manifest records 17 game files and 8,480,017,860 bytes of owned game data, alongside the runtime, shaders, defaults, and seven non-system dynamic libraries. The first packaging pass still failed in SDL's error window because the SDL2 compatibility library loads SDL3 dynamically. I added the missing library, rebuilt, and repeated the installed-app boot. The corrected package passed strict code-signature verification and reached the bundled movies using its bundled executable and virtual file system.

This is a private convenience build, not a release. It is ad-hoc signed, not notarized, and its manifest says `redistributable=no`. I have not copied it to a second Mac, completed a clean-machine launch, or accepted a full play session from the installed package. A large app icon does not prove portability any more than a 3 MB executable disproves it. The dependency and path checks are done; clean-machine acceptance is not.

## Sources

- [ps3recomp, the static PlayStation 3 recompilation runtime](https://github.com/sp00nznet/ps3recomp)
- [PS3 controls and movie-skip notes](https://dantes-inferno.jp/dantes/base.html)
- [Hell’s Gate guest-time scalar and developer fast-forward](https://github.com/florinp93/hells-gate-recomp/blob/main/src/dantes_inferno_app.h)
- [Native-port notes on the game’s 34 VP6 movies](https://github.com/VasilkovND/dantes-inferno-nx/blob/main/dante/PORTING.md)
- [Apple's application-bundle resource layout](https://developer.apple.com/documentation/bundleresources/placing-content-in-a-bundle)
- [CMake BundleUtilities and `fixup_bundle`](https://cmake.org/cmake/help/latest/module/BundleUtilities.html)
