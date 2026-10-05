---
project: Lectern
summary: Lectern can now find and download local AI models inside the app, and the main screens were reworked.
---
Lectern, the Mac app that turns slide decks into lecture material, can now manage local AI models by itself. You can see which models are available on your own machine, download one without leaving the app, and the defaults are chosen to suit smaller Macs. The main steps of the app were also tidied so they stay readable at small window sizes in both light and dark mode.

The work was one large commit, "add oMLX model management and polish Lectern UI", touching 52 files. `LocalProviderModelManagementService.swift` gained about 175 lines for authenticated model discovery and in-app downloads against an oMLX server. `LocalModelCatalog.swift` and a new machine profile hold the defaults that suit the MacBook Neo.

On the interface side, `FileSelectionView`, `PreviewView`, `OutputOptionsView` and `ContentView` were reworked, along with shared colours in `Theme.swift` and the button and badge styles. `ProviderArchitectureV2Test` grew by about 200 lines to cover the new provider behaviour.

A second commit updated the handover notes after a colour review checkpoint. No screenshot today, because the capture script refused a past date.
