# Real Analysis Practice Center — full question-bank audit

This static site follows *An Introduction to Real Analysis* by John W. Snow, beginning with Section 1.2 and continuing through Section 6.5.

## Current design

- one fixed comprehensive quiz for each section (40 section quizzes total)
- 434 multiple-choice questions
- 22 questions using graphs or mathematical diagrams
- optional chapter reviews and a cumulative review
- browser-local progress tracking
- local MathJax 3.2.1; no CDN or internet connection is required for mathematical typesetting

## Full-audit revision

Every question stem, answer choice, correct answer, and explanation was reevaluated for this revision. The audit focused on:

- complete, self-contained question wording
- agreement with the definitions, theorem statements, notation, and exercises in the notes
- keeping ordinary prose outside mathematical delimiters
- correct subscripts, superscripts, primes, fractions, radicals, sums, limits, and integrals
- valid MathJax syntax in stems, choices, and explanations
- removal of malformed or partial question stems
- correction of several substantive statement/theorem errors found during the audit
- preservation of graph-based conceptual questions

The quiz and review interfaces now include **Exit quiz** and **Exit review** buttons. Exiting does not submit the attempt. If answers have already been selected, the site warns that the unfinished answers will not be saved.

## Validation

See `VALIDATION.txt` and `VALIDATION.json` for the automated checks. In particular, all 1,973 MathJax expressions in the question bank were parsed using the bundled MathJax 3.2.1 engine with zero MathJax input errors.

Open `index.html` after hosting the directory on a static web server.
