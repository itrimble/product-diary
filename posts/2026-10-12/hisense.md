---
project: Hisense TV Tune-up
title: The Red Button Now Powers the Hisense TV On and Off
summary: The television's dead power button was worked around by making the red button on the remote switch the set on and off.
---
The Hisense television can be switched on and off again, even though the power button on its remote is dead. The red button now does the job: press it and the set goes to sleep, press it again and it wakes. The wake direction working surprised me. It only works while the Mac mini is running on the same home network, because the mini is what listens for the press. A replacement remote at about ten dollars remains the proper fix.

The odd part is that the power key sends nothing, though every other key on that remote reports normally. The clean repair would be a change to the vendor's key layout file. This is a production build, though, with no root access, and the folder holding that file is read-only. The workaround reads the remote's infrared receiver directly, which is allowed for the debugging shell through group 1004. When red is pressed, a script checks whether the set is awake and sends key 26 to sleep it or key 224 to wake it, ignoring repeats for 3 seconds.

Sleep on this model only blacks the screen. The receiver and the network connection stay up, so the set can still hear the press. The log shows a sleep at 09:37:45 and a wake at 09:37:52.

One gap is left. The launch agent that would keep the watcher running is written but not installed, because the install was blocked and I chose not to force it. Until I load it by hand, the watcher lives under `nohup` and a reboot kills it. The tune-up notes now include all this, plus the point that HDMI control is switched on and would be the tidier route if the console or streaming box supported it.
