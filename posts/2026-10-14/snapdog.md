---
project: SnapDog
summary: A 35-second English demo video of SnapDog was finally recorded, after four failed attempts earlier in the day.
---
SnapDog now has an English demo video. It is 35 seconds long and shows the whole job: open the menu, capture a region, draw an arrow, blur out a private email address, and save. German, French and Japanese versions were made in September, so this completes the set. The app itself did not change today. This is material for the product page and for ads.

The take is `RS-SNAP-LOC-EN_master_v1.mov`, 2816 by 1762, shot on this Mac with SnapDog 1.2.1 (build 9). Two cropped versions, wide and tall, sit beside it. The scene uses a made-up page with fake personal details on reserved example addresses, so no real data is in the frame. Stills from the recording confirm the arrow lands on the bad number and the blur covers only the email.

Four earlier takes were kept as `_rejected/en-2026-10-14` through `d`, and they are not masters. The README lists what went wrong. SnapDog reads the "open in editor" setting from the plain preferences file, and the usual command-line way of setting it writes somewhere this build does not look. With it off, the capture was saved to Pictures and the editor never opened. The helper tool also cannot see the editor window, so the tool buttons are clicked at measured offsets. Finder cannot report the desktop size while icons are hidden, so the script now asks the system for it directly.

Two limits remain. The region selection overlay is deliberately invisible to screen recording, so the demo has no selection magnifier. The captured order page still shows a Safari banner. The reel used in ads still crops the German master, not this one.

Separately, the working folder is far from clean. A diff against the last saved commit shows 56 changed files and about 48,000 deleted lines, and I did not trace where they come from. The last commit was 1 October, so I am not describing those changes.
