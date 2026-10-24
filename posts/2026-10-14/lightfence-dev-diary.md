---
project: QixForge
title: "Lightfence Dev Diary: A New Name and 13 Languages"
summary: In one long day the game became Lightfence, learned twelve more languages, went to Apple for review, gained a tutorial you learn by playing, and its last sectors got fairer.
format: longform
---
The game this diary has been calling QixForge has a name of its own now, Lightfence, and in one long day it went from a working build to something that looks finished and is waiting on Apple's review. It speaks thirteen languages. It plays properly with the small Apple TV remote. The first stage now teaches you by letting you play, one idea at a time, instead of putting a wall of instructions in front of you. And the hardest stretch of the game got fairer for people who are not experts, without getting easier for those who are.

## Midnight: a name of its own

Qix is an arcade game from 1981, and its name is still a trademark. Before this could go on the App Store it needed a name that was its own. Lightfence says what you do: you fence off ground with a line of light. The monster that roams the board became the Snarl, the sparks that chase you along the edge became Tracers, and the progression system became the Light Core. The title got new lettering, LIGHT over FENCE, with a line of light drawn underneath it.

![The Lightfence title screen on Apple TV, with the menu in three centred rows of glowing buttons](lightfence-title-tv.jpg)
*The Lightfence title screen on Apple TV, with Continue and New Campaign buttons and the line Campaign complete, all 10 sectors restored. Screenshot from 14 October 2026.*

## Morning: thirteen languages

Four helpers worked through the code at the same time, marking every piece of on-screen text so it could be translated: 897 lines of interface and 111 lines of story. Before a word was translated, a glossary pinned down 80 of the game's own terms in every language, so the Japanese boss screen and the Japanese tutorial call the monster by the same name. The Snarl is treated like Lightfence itself, as a name, so it stays "Snarl" in German and Spanish and is spelled out phonetically in Japanese, Korean, Chinese, Russian and Arabic.

Translating turned up English mistakes. The final sector's banner said THE SNARL TRIUMPHS at the moment you had beaten it. An achievement called "Five Digits" was awarded for 5,000 points, which has four, and is now "Five Grand". Arabic reads right to left, so arrows that mean "next" now point the other way.

![The first lesson of the game in Japanese and in Arabic, side by side on an iPhone](lightfence-languages.jpg)
*The first lesson in Japanese and in Arabic, side by side on two iPhone screens, with the prompt to drag to move. Screenshots from 14 October 2026.*

## Midday: off to Apple, and back again

The second build went to Apple for review, and then we caught the game lying. The percentage of the board you had claimed was counting the open ground between two separate claims, so a board that was 62% done could read 100% and end the stage early. We pulled the build, fixed the count, and wrote a test with the exact shapes that had fooled it.

Being honest made the game harder. The simulated players that play every stage after each change cleared far fewer of the late stages, because they had been finishing on numbers that were not true. The targets stayed where they were, and the third build went to Apple in the afternoon, for iPhone, iPad and Apple TV.

![The App Store screenshots for iPhone, iPad and Apple TV](lightfence-app-store.jpg)
*A grid of App Store screenshots for Lightfence: the title menu, gameplay in several sectors, a sector map and the Light Core screen. Shown in this 14 October 2026 post.*

## The remote in the shed

The game was played on a real television in the shed, with the remote that comes with the Apple TV. Clicking the edges of the remote's round pad steered cleanly. Swiping on its touch surface did not: one swipe often turned twice or reversed, six times in a third of a second in one run. So swiping no longer steers, and the game says CLICK THE RING TO STEER in all thirteen languages.

The pause screen had two problems of its own. Coming back from the Home screen or the screensaver, the music started playing again underneath it, and the remote's buttons reached nothing, so you could not resume. Both are fixed, and two automated tests now walk the pause screen with a simulated remote, one of them after leaving the app and coming back.

![The pause screen on the shed television, with resume, restart and quit](lightfence-tv-pause.jpg)
*The pause screen photographed on the shed television, with Resume, Restart and Quit and Sector 1, stage 8 in the header. Photographed on 14 October 2026.*

## Evening: worlds and a title screen

Each of the ten sectors has its own painting behind the board: a drowned reef, crystal caverns, a magma core, ice spires, a neon city, a void, a rift in time, a nebula, an eclipse and the grid itself. The paintings are tall and televisions are wide, so the TV only ever showed a band across each one, and the band often missed the point of the picture: the void's glowing ring and the nebula's eye were off screen. The TV now aims at what each painting is of.

The first stage of each sector also used to sit under a heavy dark veil, so the world only showed at the edges until you had won a few stages. It now starts visible and brightens as you go. The title screen was rebuilt to match the design mockup, with lightning that runs up the L and down the T of the name.

![The ten sector paintings, from the reef to the grid](lightfence-paintings.jpg)
*The ten sector paintings in one strip, from the reef on the left to the grid and core worlds on the right. From 14 October 2026.*

## Night: a game that teaches itself

The old tutorial was a series of cards to read. The new one watches what you do. A lesson appears when you need it and goes away once you have done the thing, whether or not you ever saw it, so someone who already knows how to play is never lectured. The first stage walks through moving, cutting into open ground, getting back to the edge to claim it, and the target for the stage, with a small "+12%" chip flying into the meter after your first claim.

The enemies are released one at a time. The Snarl stays still until your first claim, then the game points it out: it cuts your line, not you. The Tracers wait until you have made a claim with the Snarl loose. The words follow whatever you are holding: "drag" on a phone, "click the ring edges" on the TV remote, "D-pad or stick" on a game controller.

![The first lesson on Apple TV: click the ring edges to move](lightfence-lesson-move.jpg)
*The first lesson on Apple TV, with the prompt Click ring edges to move over the Aqua Reef grid. Screenshot from 14 October 2026.*

![The Snarl is named and released after the first claim: it cuts lines, not you](lightfence-lesson-snarl.jpg)
*The second lesson: the Snarl is named and a caption reads The Snarl cuts lines, not you. Screenshot from 14 October 2026.*

When you lose a life early on, the message now adds the fix under the cause: "the Snarl cut your line" comes with "short cuts are safer". Each hint stops once you have shown you have it. On the TV, hint text is sized to read from the sofa. Hints can be switched off, and the tutorial can be replayed from the settings.

![The claim target lesson on an iPhone, after the first claim](lightfence-lesson-target-phone.jpg)
*The claim target lesson on an iPhone, with the prompt Fill 66% to win and a First Claim banner after the first area is claimed. Screenshot from 14 October 2026.*

Building it turned up a test that had been failing quietly since yesterday's first tutorial. It checks that steering into your own line lights a fuse rather than killing you, but the tutorial was holding the fuse still on the very stage the test plays. The test now holds the enemies and leaves the fuse burning.

## Making the end fairer

After the honest percentage, the last four sectors were brutal for an ordinary player. The simulated average player, who reacts a fraction late and plans less, cleared 40 of their 120 stages. The retune asks for 74% of the board at the very end instead of 78%, caps how fast the Snarl can get, and slows the late enemies a little. That player now clears 59. The expert player moved by about as much as three tries per stage moves on its own.

![Stages an average player clears per sector, before and after the retune](lightfence-late-game.png)
*A bar chart of stages a simulated average player clears in each of the ten sectors, before and after the late-game retune. The last four sectors changed most. Chart made on 14 October 2026.*

One fix went in alongside it. After losing a life you reappear on the edge, and a fast Tracer could arrive at that spot just as your moment of protection ran out, killing a player who had not touched anything yet. You now reappear where no Tracer can reach you until well after that. The middle sectors dipped by two or three stages in the same run, so we replayed stages 1 to 40 with identical dice, with and without the fix: 98 clears against 99 for the expert, 105 against 106 for the average player. The fix costs nothing; the dip comes from earlier changes and the noise of three tries.

## Moving house halfway through

Late in the day the laptop ran low on disk space, and a balance run that takes minutes on a healthy machine had crawled for an hour and a half. The rest of the night ran on the Mac mini, which shares the project folder with the laptop. Every build, test and simulated player from then on ran there, including the full set of automated checks before each piece went in.

## Last thing: the world comes back where you claim it

The game's opening story says that wherever you draw a line, the light comes back. Until tonight that only happened as a general brightening and some life at the edges of the screen, while the ground you had claimed was a flat tinted panel. Now claimed ground is the world won back. The painting shows there clear of the Snarl's smoke, lit by its own colours, and each world's own life moves through it: fish and bubbles in the reef, fireflies in the caverns, traffic in the rain in the neon city, stars in the void. The life roams the whole board but only shows where you have claimed, so every claim lets a little more of it in. The open ground, where the Snarl and your line are, stays as it was, under its grid.

![On the TV, the claimed staircase shows the magma world as it was painted, while open ground stays under the grid](lightfence-won-back.jpg)
*Lightfence on television in Sector 3, Magma Core, with a claimed staircase of territory over the lava world. Screenshot from 14 October 2026.*

Two smaller things came with it. Creatures near the spot where you lose a life now dart away from it and drift back, instead of the whole world twitching at once. And on the TV, the fish and lights meant for the margins had been swimming across the open board, because the TV's board lies on its side and the cut-out around it was taking its corners in the wrong order.

## Next

Apple's review of the third build is still pending, the remote steering wants another evening in the shed, and the worlds have more to give: creatures that notice the Snarl, and ground that remembers what was claimed on the stage before.
