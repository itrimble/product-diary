---
project: mac-bin
title: Clicking a Download Link Now Reaches My File Server
summary: Clicking a download link on any of my Macs can now hand it straight to the file server's download manager.
---
A magnet link clicked on any of my three Macs now lands in the download manager on my file server, and so does a download file dropped into the Downloads folder. If the server is unreachable, a notification tells me. Until now I had to carry each link across by hand.

The catch is what a rebuilt Mac would be missing. The restore routine brings back the script and the background agent, but not the small handler app or the registration that makes it the default for magnet links. The login details are kept out of the repo deliberately. So a freshly restored Mac would look finished and quietly do nothing, which is worse than failing loudly. The rebuild notes now spell out the missing steps.

The mechanism is a 110 line script that signs in to the server's qBittorrent web page and submits the link. It tries the address used at home first and falls back to the Tailscale address, so clicks from elsewhere still arrive. An installer builds the handler app, and every Mac gets a launch agent that sweeps Downloads.

Two traps are in the notes. The Downloads folder needs one manual click on Allow, since a launch agent by itself is refused that folder without any warning. And if a qBittorrent app is installed on a Mac, it keeps the file association no matter what the installer does.
