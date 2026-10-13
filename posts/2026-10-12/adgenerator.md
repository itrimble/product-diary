---
project: AdGenerator
summary: A first finished promo video for SnapDog was assembled and rendered, in both widescreen and phone-shaped versions.
---
AdGenerator made its first real advert tonight. It is a 25 second promo video for the SnapDog screenshot app, rendered twice: once in widescreen for websites and once upright for phones. It opens with a hook, shows the product name, plays four short clips of the app with a caption on each, and ends on a line pointing to the Mac App Store. The tool exists to turn recordings of my apps into short ads without editing by hand.

The captions are "Capture any region", "Point at the bug", "Blur the sensitive stuff" and "Save & share", for 5, 3, 3 and 3 seconds. The tagline is "Capture. Annotate. Done." The clips were cut from the German-language demo recording that the capture step already produces.

The new part is the compose stage in `compose/`, built with Remotion, which draws video from React components. `SnapDogReel.tsx` is the 282 line scene file and `storyboard.ts` holds the brand colours, 30 frames per second timing and caption list. `Root.tsx` registers a 1920 by 1080 and a 1080 by 1920 version of the same reel, so one edit changes both. Four still frames were rendered first to check layout, then the two videos: about 3.0 MB and 2.5 MB in `compose/out/`.

Two small shell helpers also landed in `pipeline/`: one puts screenshots in device frames and one turns a video into a GIF. A 19.8 GB macOS restore image was also downloaded into `vm/`, presumably for a virtual machine to run captures in. I did not verify that purpose.
