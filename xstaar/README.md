# Grade 7 STAAR RLA Comprehensive Practice Center

A self-contained static website for Grade 7 Texas English Language Arts and Reading practice.

## Coverage

The site separates:

1. **STAAR-tested skills:** every student expectation represented in the Grade 7 RLA assessed-curriculum map used to build this site.
2. **Additional Grade 7 course TEKS:** course expectations not included in the STAAR assessed-curriculum list. These centers are labeled **Not STAAR tested** and do not appear on the full practice tests.

Current coverage:

- 30 STAAR-tested reading skill centers
- 13 STAAR-tested objective revising/editing centers
- 4 STAAR-tested text-response/composition labs
- 30 additional course-TEKS centers marked Not STAAR tested
- 77 skill centers total

See `coverage.csv` and `coverage.json` for the detailed map.

## Full practice tests

The website contains five fixed full-length forms, A–E. Each form contains:

- 45 items
- 56 raw points
- 26–28 reading items
- 17–19 writing items, including the extended response
- 42 one-point objective items
- two 2-point selected-response items
- one 10-point extended constructed response

The five fixed forms now use **220 distinct objective question instances with no content reuse between Forms A–E**.

## Focused skill practice

The targeted-practice bank was revised specifically to eliminate excessive repetition.

- Questions used on the five fixed full tests are excluded from fixed skill practice.
- Duplicate question copies were removed from the objective bank.
- Fixed practice sets within a skill are disjoint.
- All 43 STAAR-tested objective skills have at least two fixed practice sets; depending on the number of distinct questions available, a skill has two, three, or four sets.
- Course-only objective skills have one concise fixed set of four distinct questions rather than several repetitive versions.
- Random practice samples from a deduplicated practice-only pool. Repeated random attempts can naturally revisit an item over time, but a single generated quiz does not contain duplicate content.
- Writing centers provide multiple text-based prompts and the self-scoring rubric.

The fixed practice bank contains 609 objective questions that are separate from the 220 objective questions on the fixed full tests.

## Removed feature

The former numbered 122-activity sequence has been removed. The site now focuses on full diagnostics, targeted skill practice, writing practice, explanations, and progress reporting.

## Scoring and privacy

The site reports raw study scores. It does not reproduce official STAAR scale scoring or predict an official performance level.

Progress is stored in the current browser using `localStorage`. Nothing is sent to a server. Unfinished answers are not synchronized between devices.

## Validation

Automated validation checks:

- all five forms have the intended item counts and point totals;
- all 220 fixed-form objective items are content-distinct across Forms A–E;
- every objective question has a valid answer key, distinct choices, and an explanation;
- fixed skill-practice sets do not overlap one another within a skill;
- fixed skill-practice questions do not reuse fixed full-test content;
- all targeted-practice pools are deduplicated;
- all STAAR-tested objective skills have at least two fixed practice sets;
- the numbered sequence is absent; and
- JavaScript syntax and local file references are valid.

This is original practice material. It has not undergone TEA review, field testing, bias review, or psychometric calibration and is not produced or endorsed by the Texas Education Agency.
