---
project: CyberSim
title: CyberSim 1.1.0 Gets Its App Store Page and Paperwork
summary: CyberSim got its App Store page written and its release paperwork set up, so version 1.1.0 can be sent to Apple.
---
This was a shipping-prep day for CyberSim, the practice-exam app for cybersecurity certifications, with no new features in it. The App Store page now has proper copy. It names ten certifications and four ways to practise, and fresh phone and tablet screenshots were captured to sit with the text. People who already have the app will see no difference.

The listing text is kept in the project as a few small files: one for the page, one for the name and subtitle, and one for the release notes of version 1.1.0. Its name on the store is "CyberSim: Cert Exam Practice" and under it runs the subtitle "Security+ CISSP CEH Exam Prep". The long description opens by listing the exams. After that it points out that questions are not only multiple choice: you type real terminal commands, or drag pieces around a network diagram.

On the release side, the tooling already in the project was edited, not created. A configuration file, a main script of roughly 6 KB and a short README have been there since April, and all three were touched so that an upload takes one command rather than a session in a web form. Three more files were touched: the Xcode project, its shared scheme and the package lock. That is the usual footprint of getting a build ready for submission. I did not read the diff closely, so which settings moved is something I cannot say.

Around 24 screenshots are lying in the project's top folder, and two of those are marketing frames, not raw captures. None of it is committed, since the history for this folder ends in April. The folder meant for app previews is still empty, and that is the next gap I would fill.

![The CyberSim app on a simulator](cybertestapp.png)
*CyberSim's first screen on a phone simulator, reading Pass your cert on the first try, with a Get Started button. Screenshot added to the diary on 7 October 2026.*
