---
project: mac-bin
title: Clicking a Download Link Now Reaches My File Server
summary: Clicking a download link on any of my Macs can now hand it straight to the file server's download manager.
---
Clicking a magnet link, or dropping a download file in the Downloads folder, on any of my three Macs now sends it to the download manager on the file server. A notification says if the server cannot be reached. Before, a link had to be copied over by hand. The notes for rebuilding a Mac were also updated, because this feature has a piece that restoring from the repo does not bring back.

Commit `c19db39` added `shared/nas-torrent`, a 110 line script that logs in to the qBittorrent web interface and adds the link or file. It tries the home network address first, then the Tailscale one, so a link clicked away from home still lands. The installer, `install-nas-torrent.sh`, builds a small app that becomes the default handler, and a launch agent called `com.ian.torrent-watch` for each of the three Macs sweeps the Downloads folder.

Commit `7cf354e` is the part worth remembering. `bin-sync.sh install` restores the script and the agent but not the app or the handler registration, and the login file at `~/.config/nas-torrent/env` is kept out of the repo on purpose. A restored Mac would look right and do nothing. `RESTORE.md` now lists the steps. It also says to click Allow once on the Downloads folder prompt, because a launch agent alone is refused that folder silently. And it warns that an installed qBittorrent app will keep the file association no matter what.
