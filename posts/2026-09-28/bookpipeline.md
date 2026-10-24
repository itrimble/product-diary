---
project: BookForge pipeline
title: BookForge Stops Claiming a Book Has No Chapters
summary: The BookForge Mac app got a consistent look and stopped claiming a book had no chapters while it loaded.
---
Open a 17-chapter book in BookForge and, for a moment, the app would insist it was empty. "No chapters yet", it said, while the chapters were simply still on their way. That was a small lie and an annoying one. The manuscript tab now says it is loading until the real list shows up.

The cause was a muddle between two states. The tab was waiting on data from the board and read "not arrived" as "nothing there". The same change renamed the Persona Review button to plain Review, the name the job goes by everywhere else, which also lets the row of actions wrap less.

Most of the day went on a design pass named Imprint, which took seven commits inside twenty minutes or so. The app should look like one object, and it did not. Empty screens, pop-up sheets and Settings now share the same ink colour and a book-like finish. One bug showed the problem well. The cover sheet's selected model card turned system blue, because the code asked the operating system for its accent colour, and that follows the system setting rather than the app's own tint. Setting the tint once at the window and again in Settings means every sheet now inherits it. Greens that mean pass or ready, across the KDP, print cover, production, release evidence and ship screens, use the app ink. Orange and red are saved for warnings and failures.

I also redrew three empty screens instead of settling for stock placeholders. Bring Existing Books pictures scattered manuscript sheets turning into a bound volume, and Choose Folder is its main button. On Analytics, an empty chart axis carries the one day of data there is. New Book draws a cloth case: type a title and it appears on the cover, pick another template and the cloth changes.

The design rules, including the accent colour one, are now written into the project. A developer switch opens the two sheets directly, which makes screenshots of them quick to take.
