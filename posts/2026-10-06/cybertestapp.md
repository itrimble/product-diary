---
project: CyberSim
summary: CyberSim got its App Store page written and its release paperwork set up, so version 1.1.0 can be sent to Apple.
---
CyberSim, the practice-exam app for cybersecurity certifications, spent the day getting ready to be shipped rather than getting new features. Its App Store page now has real text: a name, a subtitle, and a long description that lists the ten certifications it covers and the four ways to practise. A new set of screenshots for phones and tablets was captured to go with it. Nothing in the app itself changed for people who already have it.

The listing is stored as files in `metadata/`, with `en-US.json` for the page text, `app-info/en-US.json` for the name and subtitle, and `version/1.1.0/en-US.json` for the release notes of this version. The name is "CyberSim: Cert Exam Practice" and the subtitle is "Security+ CISSP CEH Exam Prep". The description leads with the ten exams and the question types beyond multiple choice, such as typing real terminal commands and dragging pieces around a network diagram.

On the release side, the `fastlane/` release tooling was updated rather than set up fresh: the `Appfile`, the `Fastfile` (about 6 KB) and a short README have been there since April, and all three were touched, keeping uploads to one command instead of a session in a web form. The Xcode project file, its shared scheme and the package lock were also touched, which is the usual footprint of preparing a build for submission. I did not read the diff closely, so I cannot say which settings moved.

About 24 screenshots sit in the project root, including `ipad_02_certs.png`, `ipad_03_cert_selected.png`, `06_social_proof.png` and `07_solution.png`. The last two are marketing frames rather than raw captures. The git history for this folder stops in April, so none of this is committed yet. The app-previews folder is still empty.

![The CyberSim app on a simulator](cybertestapp.png)
