---
project: Remnant Security Courses
title: Remnant Security Course Materials Get a Canonical Home
summary: The course materials behind the training business, lessons, labs and assessments, were placed under version control as the canonical source.
---
Everything the academy teaches now has a change history. The lessons, labs, assessments and recording plans for the training business had been living in a folder that tracked nothing. As of 13 October that folder is the canonical source, the one place to look for what the academy teaches. A learner sees no difference, and the benefit is that the material is protected from loss.

The first commit holds the curriculum for both products, the Career Jumpstart course and the flagship bootcamp. It also holds the generated technical lab workbook, worked examples of the portfolio artifacts learners are asked to produce, and the production skill that assembles new course material. Secrets are excluded under the same ignore rules the academy app uses, so environment files, keys and certificates stay out from the first day. The assessments are private, so I confirm they exist and say nothing else about them.

This repository and the academy app both received their first commit that day, and I see them as one piece of work with the afternoon's cleanup on the public site. An email key was taken out of its public code there, and the PDF sources were moved off the web root. The consistent idea is to move scattered material into places where it cannot be published by mistake, which is a rule I would apply to every project.
