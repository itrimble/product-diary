---
project: Hermes Fleet
title: Teaching My Assistant to Survey the House and Read the Results Aloud
summary: My assistant can now check which of my computers are awake, work out where each job should run, and speak a spoken summary of long answers as a playable recording.
format: longform
category: ai-local-models
stats: Computers reachable = 4 | Spoken summary length = 6 minutes 40 seconds | Verification checks per recording = 3
---
My assistant can now take stock of the machines around the house before it starts work, decide which one should do the job, and read long answers aloud as a playable recording. A reply that used to be something I had to read silently can arrive with a voice attached, and the six-and-a-half-minute summary I tested covers what was asked, what was found, and what did not work.

![A waveform of the spoken summary, showing the natural pauses between sentences](hermes-fleet-podcast-waveform.png)
*The waveform of the delivered spoken summary, rendered from the finished recording on 23 October 2026. The gaps are the pauses the renderer puts between sentences, not silence in the speech itself.*

## The problem with a house full of machines

I own several computers, and they are not interchangeable. One is a small box in the closet that also runs my network gear and a dozen other services. One is a large Linux desktop with a great deal of spare memory. Two are laptops that do Apple-specific work. They have different strengths, different amounts of free memory, and different rules about what they are allowed to do.

Until now, my assistant assumed one machine and did everything itself. Sometimes that was the right call. Often it was not. When I asked for something that needed the big Linux desktop, it happened anyway on the little box, which then got slow.

The first thing I built was a way to ask the house a question. It looks at the machines it already has permission to reach, connects to each one briefly, and asks a harmless question: what is your name, what are you running, who am I talking to. That last part matters. An open network port only proves something is listening; it does not prove I can get in. A machine that does not answer is recorded as unreachable with a specific reason, rather than quietly left out of the list.

## Reading the room before choosing a machine

Once the assistant knows what is actually awake, it can pick somewhere sensible. The small closet box stays the coordinator, because it is the one already holding my chat identity and every existing conversation, and moving that would be a needless risk. The large Linux desktop becomes the place for anything heavy, and the laptops stay available for work that needs Apple tools.

The selection is recorded with its reasoning, including what was rejected and why. The closet box was rejected for speech work because it already runs eighteen other containers; for the same reason it is a fallback for running small models rather than the first choice. Nothing was moved to the network storage machine, because that machine is shared infrastructure and adding new heavy jobs to it would change something other projects depend on.

## Making the recording, and checking it

The spoken summary starts as text. A small local model writes the narration from the finished answer, and a speech model turns that text into audio. The recording is then encoded once into a compressed audio file, which is the format the chat app plays with a proper progress bar and a duration rather than as a voice note.

What took the most work was not the audio. It was making sure the recording tells the truth.

A narration that says everything passed when the work actually failed is worse than no recording at all. So the narration is checked against the answer it came from before a single word is spoken. The check looks for three specific things: success claimed where the original never claimed it, a failure or a limitation that quietly vanished, and a number that appears in the narration but not in the source. This caught a real problem during testing, when the model invented a figure while filling out a short answer. The recording was discarded and rewritten.

That check itself was wrong twice before it was right. The first version insisted on exact wording, so it rejected a perfectly faithful rephrasing. The second version was looser but still demanded that each kind of limitation survive under the same words, which meant a limitation stated differently still looked like a dropped one. The version that works treats each limitation as a family of interchangeable phrasings: if the original said one thing failed and the narration said it timed out, that is the same fact, not a new one. There are now nine tests covering it, and all nine pass.

The audio gets three checks of its own. The file must genuinely be a compressed audio recording and not something else with the wrong name. The whole thing must decode without a single error, which is what catches a file that was cut off halfway. And the average loudness has to show there is actual sound in it, which catches a recording that is structurally perfect and completely empty.

## What I did not finish

The automatic trigger has not yet run through a live chat message. Every part of it is tested on its own, and the whole chain works when I run it by hand, but the assistant has not produced one unprompted in a real conversation yet. That needs one restart of the chat service.

I also have not seen the player appear on a screen. I can confirm the bytes are right and that the app is sending them as audio rather than as a file attachment, but a person has to confirm what the other end looks like.

The browser work is not started. I assigned it to the big Linux desktop, which has the spare memory for it, but I deliberately left it until the text and audio paths were solid, because it was the least interesting part of the request and the most likely to distract from it.

An independent review then changed one of my placement decisions. I had put the small local model on the small box, but the review measured the house again and found the small box was already carrying most of its memory to disk, and that its model server listens only on itself, so no other machine could reach it. The model now belongs on the big Linux desktop, which has more than fifty gigabytes free and can already be reached over the private network. The voice still runs on the small box, because the recording has to be written next to the answer it describes.

The review also found six smaller faults of the same kind: a check written against a filename with a hyphen instead of the separator the file actually uses, which could never fail; a daily summary that printed where its report was saved rather than the report; a retry blocked forever by its own earlier failure; and a configured voice that was read but never handed to the speech engine. All are fixed and checked.

## Sources

- [Kokoro-82M model card](https://huggingface.co/hexgrad/Kokoro-82M), the speech model used for the recording and the reference for the voice packs.
- [Kokoro implementation](https://github.com/hexgrad/kokoro), the upstream project the local setup follows.
- [Telegram Bot API, sending audio](https://core.telegram.org/bots/api#sendaudio), the delivery contract the recording has to satisfy to arrive as a playable file rather than a document.
- [FFmpeg documentation](https://ffmpeg.org/documentation.html), the encoder and the verification checks: stream inspection, full decode, and loudness measurement.
- [Ollama](https://ollama.com/library/qwen3:4b), the local small-model runtime used for writing the narration.
