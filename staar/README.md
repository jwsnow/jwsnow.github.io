# Grade 7 STAAR RLA Comprehensive Practice Center

A separate, self-contained static website for Grade 7 Texas English Language Arts and Reading practice.

## Launch and hosting

Upload the contents of this folder to any static web host, or open `index.html` locally for testing. No server-side code, database, account system, or build step is required.

## Coverage

The site deliberately separates two bodies of content:

1. **STAAR-tested skills:** every student expectation identified in TEA's Grade 7 RLA assessed-curriculum document, including the integrated editing standard 7.10D and its nine component expectations.
2. **Additional Grade 7 course TEKS:** Grade 7 ELAR standards that are required instruction but do not appear in the STAAR assessed-curriculum list. These centers are visibly labeled **Not STAAR tested** and do not appear on full practice tests.

Current coverage totals:

- 30 STAAR-tested reading skill centers
- 13 STAAR-tested revising/editing objective centers
- 4 STAAR-tested text-response/composition labs
- 30 additional course-TEKS centers marked Not STAAR tested
- 77 skill centers total

A detailed audit table is included in `coverage.csv` and `coverage.json`.

## Full practice tests

The website contains five fixed full-length forms, A–E, plus a randomized-form launcher. Each fixed form contains:

- 45 items
- 56 raw points
- 26–28 reading items
- 17–19 writing items, including the extended response
- 42 one-point objective items
- two 2-point multiple-select items
- one 10-point extended constructed response

Across Forms A–E collectively, every STAAR-tested skill center is represented. A single 45-item form cannot measure every eligible standard, so each diagnostic report identifies only the exact skills sampled on that form and links to focused practice.

## Focused skill practice

Every objective skill center provides:

- four fixed 8-question quizzes;
- randomized practice;
- explanations for every answer;
- local mastery history; and
- direct access from weakness reports.

Writing centers provide multiple text-based prompts and the site's self-scoring rubric. Teacher scoring is recommended for consequential use.

## Numbered practice sequence

The site contains **122 consecutively numbered activities**. They are listed simply as Practice 1 through Practice 122 and are not grouped by week.

The sequence includes:

- one activity for every tested and non-tested skill center;
- connected-skill and cumulative review;
- extended-response checkpoints; and
- all five full-length forms.

## Scoring and privacy

The site reports raw study scores. It does not reproduce official STAAR scale scoring or predict an official performance level.

Progress is stored in the current browser using `localStorage`. Nothing is sent to a server. Unfinished answers are not automatically synchronized between devices.

## Content and validation notice

All passages, questions, answer choices, explanations, and prompts are original practice material. Public TEA standards, assessed-curriculum documents, blueprints, and released-item formats were used to define content and structure.

The package has passed automated structural checks for:

- exact skill-center coverage;
- question-bank minimums;
- answer keys and four distinct choices;
- explanations;
- fixed-quiz distinctness;
- form length, point totals, and category ranges;
- consecutive practice numbering;
- explicit labeling of non-tested standards; and
- local file references and JavaScript syntax.

It has not undergone TEA review, field testing, psychometric calibration, or external validation. It is not produced or endorsed by the Texas Education Agency.
