---
project: Escape from Butcher Bay
title: Butcher Bay on Mac Runs Smooth, but Characters Stay Dark
summary: The Mac port of the Xbox game now plays smoothly and packages as a real app, but the characters still render too dark.
---
The Mac version of Escape from Butcher Bay got two real improvements on Saturday and one stubborn problem I could not crack. The picture no longer stalls or fills with static, and the game now ships as a single app that sits in Applications and launches with a double click. The problem: the characters are still drawn much too dark, and after a day of testing I now know where the fault lives but have not fixed it.

The stall came from how each frame's textures were handed to the graphics card. I now stage them through a ring of three buffers instead of reusing one, and I raised the audio queue to 85 milliseconds so sound stops crackling. I also merged the upstream project's v0.18.0 fixes, which draw some previously missing menu quads, handle fog at infinite distance, and fold file-name case on the Mac. The bottom band that looked like a rendering bug turned out to be authentic: the Mac main menu matches a Linux reference row for row.

The darkness took most of the day. I ruled out gamma first. Applying the console's display curve at 1.5 matched the reference averages, while 2.0 washed everything out, but it did not touch the dark characters. I then forced alpha opaque, which brightened everything and was plainly not a fix, and a red/blue channel swap hypothesis, which I tested and withdrew. The telling number is that 99.8 percent of draws run through the generated combiner program, the part that blends textures and lighting, and the hand-written fast paths sit idle. Vertex colour comes through white, the character texture is a normal map with red and blue swapped, and the combiner output is already black.

One dump contradicted the others by reading zero everywhere, which I now suspect is an artefact of a shader the driver declined. So I stopped probing and recorded the decision: replace the combiner generator with the one from the xemu emulator rather than keep guessing. I also got xemu itself running by installing the Vulkan loader and MoltenVK, fixing a broken disc path, and learning it needs a debug BIOS, not a retail one.

I did not rerun the final build against the reference after the last merge, and I took no screenshot, so I am showing none. The handover notes now carry the Mac state: 60 frames per second in gameplay, the gamma fix, and the measuring rules.
