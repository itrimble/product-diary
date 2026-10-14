---
project: AdGenerator
summary: The SnapDog advert was re-cut to sixteen and a half seconds, given a spoken voiceover and music, and re-rendered.
---
The advert for the screenshot app got a voice. A spoken line now introduces each scene, music runs underneath, and the cut was tightened from twenty-five seconds to sixteen and a half so it plays like an advert rather than a demo. The story it tells changed too: it now opens on an email address left visible in a capture, points at the bug, and blurs the address before sharing. That is the product's whole pitch in three beats.

The numbers, from `compose/src/storyboard.ts`: a 3.2 second hook, a 1.8 second product card, three clips of 2.4 to 2.8 seconds, and a 3.8 second close, all at 30 frames a second. The clips crop into a 3600-by-1834 source recording and deliberately stay inside the English-language order form, so the German menus, the system notification and this Mac's file locations in the browser bar never enter the frame.

`SnapDogReel.tsx` mixes the bed music with six spoken lines, one per scene, each generated as speech and named for its shot: hook, product, arrow, leak, blur, end. Both shapes were re-rendered, widescreen and upright, plus the GIF version. The framing choices are commented shot by shot in the storyboard, which is the closest thing this folder has to history; it still has no version control.

There is no picture: the screenshot tool has no way to photograph a video project. The renders themselves are the output, in `compose/out/`.
