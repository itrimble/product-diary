---
project: Hermes Fleet
title: My Assistant Now Picks Which Model Does Each Job
summary: My assistant can hand a job to a different model depending on the work, from one running on my own desk to a paid cloud one, and the last route took two false starts to get working.
format: longform
category: ai-local-models
stats: Model routes = 5 | Routes tested live = 5 | Local route response = 134.5 seconds | Cloud routes = 2.8 to 8.1 seconds
---
I have started splitting my assistant's work across several different models and picking which one does which job, instead of sending everything to the same one. There are five routes now. One is a model running on my own desk that never sends a word off the house. One is fast and cheap for small lookups. One is slow and careful for jobs that are easy to get wrong. One is for writing code. One reads through large logs. The point is not speed. It is that a cheap model should not be asked to do careful work, and that work which does not need to leave my house should not leave my house.

![A terminal window listing the five delegation routes with their model names and providers](delegation-routes-table.png)
*The five delegation routes as they are configured, read from the live configuration file on 24 October 2026, with the response time each one managed when it was tested.*

## Checking the routes instead of trusting them

The configuration is the easy part. The part that took my attention was proving each route actually reached the model I thought it would. A route can be spelled correctly, the model can be listed, and the request can still be answered by something else entirely, and nothing in the interface tells you that has happened. So I tested each one the same way: ask it to introduce itself, and check the name it gives back against the one I configured.

Four of the five answered correctly on the first run. The cheap route took four and a half seconds, the careful one eight and a tenth, and the coding one two and eight tenths. The fifth, the default, was the one I was already using, so it told me nothing I did not know. The one on my own desk took a little over two minutes, which I will come back to.

This is the same lesson [a finished post waited all morning for a signature](/grokbot/2026-10-19/) turned on, from a different angle. That entry was about a machine that was blamed for being down when the problem was somewhere else entirely. Here the model was blamed for answering wrongly when the problem was that the request never carried the instruction to use the local model in the first place. In both cases the obvious suspect was innocent and the boring explanation was the answer.

## The route that runs on my own desk

The one I care most about is the local route, a nine-billion-parameter model running on hardware in the same room as me. It is a good deal smaller than the cloud models I pay for and it is not as good at everything, but it is genuinely private, which matters more for some jobs than raw quality does.

When I asked it a short question directly it answered in about a second and a half. A full request with a few thousand words of instructions behind it took a little over two minutes, because the model thinks before it answers and the thinking is not free. That is the trade this route makes. It is slower than the paid models by a wide margin, and it never leaves the room. Whether that is worth it depends entirely on what the job is.

The route still failed twice before it worked, and neither failure was the model's fault.

The first failure was my own test being badly written. I asked the route to identify itself but left the task open enough that it decided to look something up on the web first, and it spent its entire one hundred and four second budget loading a page that would not render. It never made a single call to the model. The transcript showed me exactly what it had been doing, which is what made the diagnosis quick. The lesson was to write a test that asks for nothing but an answer, and to say so plainly in the prompt.

## The failure that looked like a configuration problem

The second failure is the one worth writing down. I sent the same one-line request to the local route, and it came back answered by the paid model I use as my default, not by the local one. A model answered my question, so nothing looked broken. The route was configured, the model was listed, and the local model itself answered correctly when I asked it a question outside the routing system.

Nothing was misconfigured, and the reason my first two theories were wrong is instructive. I assumed the service was running an old copy of my configuration and had never been told to read the new one. I was careful enough to rule that out: the route resolved correctly every time I ran the lookup myself, with the right local address, the right model name and the right key. Then I assumed the request was being dropped somewhere and fell back to the default on purpose, which would have been a sensible design but was not what the code did.

The actual cause was much duller and I should have seen it sooner. The instruction that says which route to use has to travel inside the list of tasks, one entry per job. I had been passing it as a setting of the whole call, like a top-level option, and the code ignored that field entirely without complaining. A call with one job, given the route name the wrong way round, is not a call to the local model. It is a call to the default model with the route name discarded on the way past.

The reason it stayed hidden for so long is that the failure was silent and the answer was correct. The request produced exactly the two words I asked for, from a model that was good enough that I had no reason to question it, and the routing table showed a local route that I knew worked. Only when I checked which model the system had actually recorded as answering did it become clear that the local route had never been used at all. Once the route name went in the right place, the local model answered in a little over two minutes and the recorded model matched what I had asked for.

I could have found that in a minute by checking the process start time against the time I changed the file. I did not, and I spent most of an hour proving that the configuration was correct before looking at the thing that was actually wrong.

## What I would tell you

Check which model the system recorded as answering, not just that an answer came back. A route that quietly falls back to the default will still produce a correct-looking answer, and the correct-looking answer is exactly what hides the problem. And when a routing option does not take effect, look at where the value is actually read from before you go looking for a stale process or a bad configuration file.

I have not measured the quality difference between the local model and the paid ones on real work, only that the local one answers the questions I have put to it. I have also not tried running the same job through two routes to compare them side by side. Both of those are the obvious next things to do, and the second one is the only way to know whether two minutes is a fair price for keeping the work on this desk.

## Sources

- [Hermes Agent delegation documentation](https://hermes-agent.nousresearch.com/docs), the routing and delegation features this setup uses.
- [NousResearch official plugins repository](https://github.com/NousResearch/hermes-official-plugins), the advanced delegation plugin that provides the route table.
- [oMLX](https://github.com/jundot/omlx), the local model server the on-desk route talks to.
