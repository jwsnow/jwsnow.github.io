# Statistics Diagnostic & Practice Center

A self-contained static practice site for an introductory statistics course.

## Included

- 12 diagnostic exams in the sequence of the uploaded class review
- 4 fixed, reproducible forms for every diagnostic plus a Random form
- 56 focused skill quizzes
- 3 fixed versions for every skill plus a Random version
- 1,764 original/regenerated questions
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

- Hypothesis tests use the P-value method.
- Setup/interpretation and full hypothesis tests are separate focused skills.
- Exams 8–12 weight setup and interpretation more heavily than full tests.
- Discrete-random-variable standard deviation is included.
- Salary and price can appear as intentionally discrete monetary variables.
- Mathematical notation is standardized on MathJax LaTeX.

## Audit files

- `SKILL_MAP.md` — complete diagnostic/skill map and bank sizes
- `CONTENT_AUDIT.md` — content decisions and alignment notes
- `SOURCE_JSON_AUDIT.md` — audit of all 77 older JSON files / 2,191 source questions
- `VALIDATION.txt` / `VALIDATION.json` — generated-bank structural validation
- `MATHJAX_AUDIT.json` — MathJax parser audit
- `FORMS_VALIDATION.json` — fixed-form disjointness and hypothesis-test weighting checks
