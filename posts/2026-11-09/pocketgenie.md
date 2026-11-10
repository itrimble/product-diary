---
project: PocketGenie
title: PocketGenie Grows a Private Vault, Tools and a Mac Build
summary: PocketGenie, my on-device AI chat app, picked up a locked private vault, a larger model library and a first Mac version in my working copy.
---
PocketGenie is a chat app for phones that runs the AI model on the phone itself, so nothing you type has to leave it. On Monday I added a lot to my working copy: a locked "Private Space" for sensitive chats, a bigger library of models to download, a document library, a voice screen, a list of tools it may use, and a first Mac version. Nothing is committed, and I did not build or run any of it tonight, so this is a description of code, not of an app I watched work.

The Private Space is a vault opened with Face ID. Settings now has a Privacy and security section that says whether it is set up, locked or open, and it locks when the app goes to the background. I also wrote a rule that any later Siri or Shortcuts action must get nothing from the vault unless it is open right now. A vault that stays open in a shared kitchen is not a vault.

The model library went from two Qwen models to a catalog with display names, sizes, licenses and expected speed per phone class. The app recommends the 0.8B model on 4 to 6 GB phones and the 4B on 8 and 12 GB ones. The library groups models into recommended, also fits, tight and won't run. The newer Qwen 3.5, Phi-4 and Gemma 4 entries carry placeholder checksums, and the install flow refuses to download them until real files sit on my own server.

Other new pieces: a document reader that splits files into chunks, a sync engine for several devices through iCloud, a tool-permission store, and a skills screen. The Mac target in `project.yml` asks for macOS 26 and a microphone permission. About 20 new test files exist alongside, unrun.
