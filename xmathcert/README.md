# TExES Mathematics 7–12 (235) Practice Center — Comprehensive Rebuild

A self-contained static website for secondary mathematics certification preparation. The interface preserves the earlier site design while the question bank has been extensively rebuilt for breadth, difficulty, visual reasoning, notation quality, and reduced repetition.

## Included

- Five fixed 100-question full-length forms plus a randomized full form
- Exact fixed-form domain allocation: 14 / 33 / 19 / 14 / 10 / 10
- All 21 official Mathematics 7–12 competencies
- Four fixed 12-question quizzes for every competency plus randomized practice
- Explanations for every question
- Diagnostic reports by official domain and individual competency
- Direct links from weak competencies to targeted practice
- Timer, question navigation, flags, printable reports, and browser-local history
- Locally bundled MathJax 3.2.1

## Question-bank design

The rebuilt fixed banks reserve a substantial role for graphical, tabular, and diagrammatic reasoning. The five fixed full forms contain 38–40 visual items each. Visual families include coordinate and function graphs, complex-plane diagrams, unit-circle and trigonometric diagrams, calculus graphs, geometry constructions and congruence/similarity diagrams, conics, vectors, histograms, box plots, scatterplots, bar charts, residual plots, probability diagrams, and tables.

Calculus practice was broadened substantially. Across the fixed forms and competency practice it includes limits and continuity, first- and second-derivative reasoning, velocity and acceleration, the Fundamental Theorem of Calculus (including Chain Rule applications), Riemann/integral ideas, optimization, related rates, work, center of mass, and graph analysis.

The fixed forms are deliberately challenging. The internal authoring classification for each form is approximately 10% foundational, 51% challenging, and 39% advanced. These labels are internal design metadata only; they are not Pearson difficulty statistics and are not psychometrically calibrated.

## Repetition controls

- 500 distinct fixed full-test items across Forms A–E
- 1,008 distinct fixed competency-practice items
- No exact item overlap between the fixed full forms and fixed competency quizzes
- No repeated generator family within any fixed competency allocation on a full form
- Every fixed 12-question competency quiz uses 12 distinct generator families
- The fixed banks require no generic contextual-rewording fallback to achieve uniqueness

Randomized practice may revisit mathematical ideas across separate attempts, but the generator avoids duplicate prompts and repeated families within an individual generated test or quiz whenever the available pool permits.

## Hosting

Upload the entire folder to any ordinary static web host and use `index.html` as the entry page. MathJax is stored in `vendor/mathjax/`, so mathematical typesetting does not depend on an external CDN. Official reference links in the About page still require internet access if a student chooses to follow them.

## Important limitation

This is an independent, original, framework-aligned practice resource. It has not been field-tested or psychometrically calibrated, and the items have not been externally validated one by one. Raw practice percentages are not official TExES scaled scores.
