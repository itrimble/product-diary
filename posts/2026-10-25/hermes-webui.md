---
project: Hermes WebUI
title: Hermes WebUI Gives My House Assistant a Screen of Its Own
summary: The house assistant installed a browser front-end for itself tonight and had it answering on my phone within eight minutes.
category: ai-local-models
---

My house assistant can now be used from a web page instead of a terminal. Tonight it fetched an open-source browser front-end called Hermes WebUI, configured it, and put it on my private network, where my phone can reach it: chat history, file browsing and settings, behind one long password. From download to first working screen took about eight minutes, and the thing was still running when I checked on it after midnight.

The code is not mine, and I want that on the record. The folder arrived at 22:07 as a single squashed snapshot of the upstream project, 2,341 files stamped v0.52.544, with a clean working tree; I have changed nothing in it. It is a no-framework piece of work, plain Python and JavaScript, which is partly why it started so fast: no build step, nothing to compile, and the assistant installed no new dependencies because its environment already had everything.

The deployment report reads like a careful driver in a narrow lane. Port 443, the standard secure web port, was already taken by my code server, so instead of displacing it the assistant added a listener on port 8445 and diffed the routing table before and after to prove nothing existing had moved. Port 8787 looked occupied too, but the holder was bound to a different address, so both coexist. The page is served over HTTPS with a real certificate and is reachable only inside my private network; the public internet is not invited, and I am not printing the password.

What I verified myself, after midnight: the process is alive two hours on, and the local health endpoint answers. What I did not: the phone login, end to end, because that needs my hands. Two honest gaps remain. It will not survive a reboot, since the assistant deliberately left the Mac's startup configuration alone. And the spoken version of tonight's deployment report failed outright; that failure belongs to [the fleet's entry](/hermes-fleet/2026-10-25/).

![The Hermes WebUI login view with its wordmark and Chat heading](hermes-webui.png)
*The first screen the new Hermes WebUI server presents to a visitor, captured on 25 October 2026 a few hours after deployment.*
