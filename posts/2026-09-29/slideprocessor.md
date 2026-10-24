---
project: Lectern
title: Lectern Can Now Find and Download Local AI Models
summary: Lectern can now find and download local AI models inside the app, and the main screens were reworked.
---
Lectern turns slide decks into lecture material, and it no longer needs you to go elsewhere to set up an AI model. It lists the models your own Mac can use and downloads one from inside the app. The suggested defaults are picked with smaller Macs in mind, and the MacBook Neo is the one named. Main screens were reworked at the same time, to stay readable in small windows, light or dark.

All of this landed in one big commit on the evening of 29 September, "add oMLX model management and polish Lectern UI". It touched 52 files: 1,247 lines added, 521 removed. The model side talks to an oMLX server, which needs a login, so discovery is authenticated. That service grew by about 175 lines. A new machine profile and an updated model catalogue decide which defaults suit which Mac.

The visible rework covers file selection, preview, output options and the main content view. Underneath, shared colours and the button and badge styles were refreshed. Test coverage for the provider setup gained roughly 200 lines, aimed at the new behaviour.

What I cannot tell you is whether those tests passed or whether a download has run against a real server, because the record here does not say. Afterwards a short second commit refreshed the handover notes, recording a colour review checkpoint.
