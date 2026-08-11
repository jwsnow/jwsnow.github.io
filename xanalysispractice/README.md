# Real Analysis Practice Center — comprehensive correction

This static site follows *An Introduction to Real Analysis* by John W. Snow, beginning with Section 1.2 and continuing through Section 6.5.

## Current design

- one fixed comprehensive quiz for each section (40 section quizzes total)
- 434 multiple-choice questions
- 22 questions using graphs or mathematical diagrams
- optional chapter reviews and a cumulative review
- browser-local progress tracking
- local MathJax 3.2.1; no CDN or internet connection is required for mathematical typesetting
- **Exit quiz** and **Exit review** controls that leave without submitting the attempt

## What was corrected

This revision includes both a renderer repair and a full question-bank editorial/notation audit.

The renderer now HTML-escapes mathematical question text before inserting it into the page. This is essential because expressions containing `<` or `>` were previously vulnerable to browser HTML parsing before MathJax ran, which caused apparently truncated questions such as `If x...` or answers ending at an inequality.

Across the question bank, the revision also standardizes mathematical notation, keeps mathematical variables and expressions inside MathJax, uses `\\mathbb{N}`, `\\mathbb{Z}`, `\\mathbb{Q}`, and `\\mathbb{R}` for number systems, removes multiplication `*`, eliminates dependencies on unnamed theorem numbers, fills in missing hypotheses, and rewrites ambiguous or incomplete questions and answer choices.

## Validation

See `VALIDATION.txt`, `VALIDATION.json`, and `CONTENT_AUDIT.md` for details. The final automated audit reports:

- 434 questions in 40 sections
- four distinct choices and a valid answer key for every question
- zero detected structural errors
- zero detected numbered unnamed-theorem dependencies
- zero multiplication asterisks in the question bank
- all 3,485 MathJax expressions parsed by the bundled MathJax 3.2.1 engine with **zero input errors**

Open `index.html` after hosting the directory on a static web server.
