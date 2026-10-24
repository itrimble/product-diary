---
project: Hermes Fleet
title: Hermes Fleet Takes Stock of the House and Reads Answers Aloud
summary: My house assistant can now survey which computers are awake, and read long answers aloud as recordings that refuse to say anything the written answer did not.
category: ai-local-models
stats: Machines answering = 4 | Spoken summary = 6 min 40 s | Fidelity tests = 9
---
My house assistant spent the evening learning two things. First, to take stock: it logs in briefly to each computer it is allowed to reach, asks who it is talking to, and records what each machine is good at, so a heavy job can be sent somewhere with room. Second, to speak: long written answers can now arrive as recordings. The first real one ran six minutes and forty seconds, and it is checked before a word is spoken, so the voice cannot claim a success or a number that the written answer never contained.

![A waveform of the spoken summary showing pauses between sentences](hermes-fleet-podcast-waveform.png)
*The waveform of the finished six-minute-forty spoken summary, rendered from the recording made on 23 October 2026; the gaps are pauses between sentences, not silence in the speech.*

The evening's journal reads like a checklist marching down the page: baseline, scope, scan, report, then the speech work. The speech engine is Kokoro 0.7.16 running locally, and the narration is drafted by a small local model; the first candidate turned out to be a poor fit because it spends its output on private reasoning and hands over nothing, so a second model took the job. The honesty check caught a real failure during testing, a drafted narration that invented a figure, and the rewritten checker is enforced by a nine-case test suite, with four defects in the checker itself found and fixed along the way.

Four machines answered the survey and one candidate did not, and the record says so rather than quietly dropping it. Four scheduled jobs now keep the inventory fresh, a health check lost a bug that reported a broken pipe as a broken system, and the night's last commit fixed long messages being split for delivery and then glued back together into something unreadable. The deliverables keep the narration text beside the 6.4 MB recording, so the words can be read against the voice.
