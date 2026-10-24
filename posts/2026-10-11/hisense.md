---
project: Hisense TV Tune-up
title: Fixing a Slow Hisense TV With a Broken USB Drive
summary: A slow television with a broken USB drive was diagnosed and repaired, and it now runs noticeably more smoothly.
---
One Hisense television was crawling, and it also insisted that its USB stick was corrupt while listing that single stick three times in settings. On 11 October I traced both symptoms to one fault and fixed it. The TV is responsive again. Settings show one clean drive with room to spare, and the corruption warning is gone. The repair was safe only because nothing on the stick needed keeping.

The culprit was an abandoned experiment from 8 October, when the TV was asked to treat the stick as extra internal memory. It left the stick cut into two partitions, one damaged, and since then the TV's core system process had been stuck. That explains the slowness better than the hardware does, though the hardware is modest: about 1.8 GB of memory and a 4.3 GB storage area. Apps were not to blame either, as the TV has 131 installed packages and the owner added none of them.

One command, `sm partition disk:8,240 public`, rewrote the stick as plain portable storage. A reboot finished the job. Free memory rose from 397,768 kB to 760,256 kB. Swap use went from 65% to 34%, and the task count from 614 to 446. The diagnostic that used to answer "disabled due to hung system process" gives real output again. I also halved the animation speed and trimmed caches.

Getting in was the first fight. The beta macOS on my laptop refused local network connections from anything not made by Apple, and the symptom looked like bad routing. Apple's own tools could reach the TV while Homebrew's adb and Python could not, so everything went through the Mac mini with a helper script. The lesson in my notes: never choose "Set up as device storage" on this TV again. The better upgrade is a cheap streaming stick. One planned step I dropped on purpose: disabling preinstalled apps. It put the tuner and HDMI at risk for no gain.
