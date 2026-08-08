# Statistics Diagnostic & Practice Center

A self-contained static practice site for an introductory statistics course.

## Included

- 12 diagnostic exams in the sequence of the uploaded class review
- 4 fixed, reproducible forms for every diagnostic plus a Random form
- 56 focused skill quizzes
- 3 fixed versions for every skill plus a Random version
- 1,764 audited questions
- explanations for every question after submission
- weakness reports that link directly to the corresponding skill practice
- local-browser progress history
- keyboard answer controls (1–4) and arrow-key navigation
- question flagging and an explicit Exit button
- locally bundled MathJax; no internet connection is required for math rendering

## Running the site

Upload the entire folder to an ordinary web server, or test locally from this directory with:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Important content decisions

- Sections 3–12 were rebuilt against the original JSON review banks and the uploaded `testTopics` material.
- Questions use contextual settings whenever practical rather than bare distribution notation.
- Binomial questions do not use shorthand such as `X ~ Bin(...)`.
- Binomial and Poisson practice includes Rare Event Rule / unusual-result interpretation.
- Confidence-interval practice includes claim/rare-event-style interpretation as well as interval construction.
- Hypothesis testing uses the P-value method; hypothesis-test critical values are excluded.
- Hypothesis-test setup/interpretation is separated from contextual P-value calculations. There are no all-in-one “complete analysis” multiple-choice questions.
- Inference about means uses t-distributions throughout; proportions use z procedures.
- Matched-pairs differences use `First − Second`.
- Discrete-random-variable means and standard deviations are calculated from the exact probability tables displayed to students.
- Salary and posted-price examples may be intentionally discrete when possible values occur in fixed currency increments.
- Mathematical notation is standardized on MathJax LaTeX.

## Audit files

- `SKILL_MAP.md` — complete diagnostic/skill map and bank sizes
- `CONTENT_AUDIT.md` — content decisions and source-alignment notes
- `SOURCE_JSON_AUDIT.md` — audit of all 77 older JSON files / 2,191 source questions
- `CONTEXTUAL_REBUILD_AUDIT.md` — details of the Sections 3–12 rebuild
- `VALIDATION.txt` / `VALIDATION.json` — structural and content validation summary
- `CONTEXTUAL_REBUILD_VALIDATION.json` — independent checks specific to this rebuild
- `MATHJAX_AUDIT.json` — MathJax parser audit
- `FORMS_VALIDATION.json` — fixed-form disjointness and subskill-balance checks
- `REVISION_NOTES.md` — cumulative revision history
