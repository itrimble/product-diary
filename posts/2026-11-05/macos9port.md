---
project: OS Pi
title: OS Pi Gets Wallpapers, Color Themes and Right-Click Menus
summary: OS Pi, my classic-Mac-style desktop, now lets you choose a wallpaper and color theme that survive a restart, with context menus and list views for folders.
---
OS Pi stopped being a static picture on Thursday and became a desktop you can arrange. There is now an Appearance control panel where you pick a wallpaper and a color theme, and OS Pi remembers both the next time it starts. Right-clicking the desktop and the Control Panels folder opens menus. Folders can show a list instead of icons. I did this with seven commits, and I did not run the tests tonight.

The day began with art. I added an original wallpaper, icons and interface sounds, then brought in the desktop assets from a sister project I call OS999 and tightened how the old games are presented inside the desktop. Next came wallpaper choice, kept between sessions, with a script that prepares the wallpaper images. After that the Appearance panel itself, then desktop context menus, then icons that match the folders they sit on.

Color themes came late. They are saved the same way, and Command-T cycles through them, which is the kind of shortcut I would want and nobody asked for. The last commit added desktop menu commands and list views, with a new commands module and menu navigation.

Each step came with its own C test file. By the diff there are new tests for wallpaper, theme, icon map, context menus, folder views and the startup path. I read them in the commit and have not watched them pass.

The audio problem from [Wednesday's entry](/macos9port/2026-11-04/), where Monkey Island's opening music still sounded doubled, is not touched by anything I can see in today's commits. It stays open.
