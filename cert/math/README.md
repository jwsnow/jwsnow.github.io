# Math Exam Diagnostic & Practice Center

A self-contained static website with original, generated mathematics questions for:

- TExES Core Subjects EC–6 Mathematics (902)
- TExES Core Subjects 4–8 Mathematics (807)
- TExES Mathematics 4–8 (115)
- ACCUPLACER Arithmetic
- ACCUPLACER Quantitative Reasoning, Algebra, and Statistics (QAS)
- ACCUPLACER Advanced Algebra and Functions (AAF)

## Included

- Five full forms each for the three TExES tests
- Four full forms each for the three ACCUPLACER math subtests
- Three fixed versions plus a randomized version of every component-area quiz
- Explanations for every answer
- Content-area weakness reports after full tests
- Direct links from weak areas to targeted practice
- Timed full TExES forms and untimed ACCUPLACER forms
- Question flagging and numbered navigation
- Keyboard controls: 1–4 choose an answer; left/right arrows change questions
- Printable result reports
- Local-only score history using browser local storage
- Responsive layouts for computers, tablets, and phones

The site deliberately excludes pedagogy, instruction, and assessment questions.

## Installation

Upload these files to the same directory on any ordinary web server:

- `index.html`
- `styles.css`
- `question-bank.js`
- `app.js`

No build process, database, PHP, or server-side code is required.

For a local test, open a terminal in the folder and run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Scoring caveat

The site reports raw diagnostic percentages. It does not reproduce TExES scaled scoring or ACCUPLACER's computer-adaptive 200–300 scoring model. Results are intended to guide study, not predict an official score.

## Question design

Questions are parameterized and generated from original templates. Fixed forms use reproducible seeds; random forms use new seeds. Published sample questions are not copied.

## Official alignment references

- https://www.tx.nesinc.com/Content/StudyGuide/TX_SG_obj_391.htm
- https://www.tx.nesinc.com/Content/StudyGuide/TX_SG_obj_211_2021.htm
- https://www.tx.nesinc.com/Content/StudyGuide/TX_SG_obj_115.htm
- https://accuplacer.collegeboard.org/students/prepare-for-accuplacer/whats-on-tests
- https://accuplacer.collegeboard.org/students/prepare-for-accuplacer/practice-download

Alignment checked August 6, 2026.
