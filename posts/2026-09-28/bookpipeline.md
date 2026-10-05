---
project: BookForge pipeline
summary: The BookForge Mac app got a consistent look and stopped claiming a book had no chapters while it loaded.
---
The BookForge Mac app had a bad habit of telling you a 17-chapter book had no chapters. It said "No chapters yet" while the book was still loading. It now shows a loading message until the chapters arrive. The rest of the day went into making the app look like one thing: empty screens, pop-up sheets and Settings now share the same ink colour and the same book-like styling.

The loading fix is in `ContentView.swift`. The manuscript tab waited on the board data but treated "not here yet" as "empty". The same commit renamed the "Persona Review" button to "Review", which is what the job is called everywhere else, and it makes the action row wrap less.

Most of the other work was the design pass called Imprint, seven commits in about twenty minutes. The cause of one visible bug was `Color.accentColor`, which follows the system accent and ignores the app's own tint. The cover sheet's selected model card showed system blue. The tint is now applied at the window and Settings roots, so every sheet inherits it. Pass and ready greens across the KDP, print cover, production, release evidence and ship screens use the app ink, while orange and red are kept for warnings and failures.

Three empty states were redrawn instead of using stock placeholders. Bring Existing Books shows loose manuscript sheets turning into a cloth-bound book, with Choose Folder as the main action. Analytics shows an empty axis holding the one recorded day. New Book shows a cloth case that takes the title as you type and changes cloth with the template. `DESIGN.md` and `.impeccable/design.json` now record the system, and a `BF_OPEN_SHEET=new|bring` dev hook opens those sheets for screenshots.
