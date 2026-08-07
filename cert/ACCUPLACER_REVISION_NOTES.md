# ACCUPLACER visual and notation revision

This revision preserves the portal's overall layout, navigation, scoring, local progress storage, fixed forms, targeted practice, and explanations.

## MathJax rendering

- MathJax remains bundled locally in `vendor/mathjax/`.
- The mathematics page now re-runs MathJax after every dynamic question redraw, including answer selection, previous/next navigation, question-number navigation, and answer review.
- This fixes the issue in which fractions and other TeX could render correctly on first display and then revert to raw LaTeX after the question pane was rebuilt.
- Choice and review CSS was adjusted so stacked fractions fit cleanly inside answer buttons.

## ACCUPLACER visuals

The uploaded College Board sample sets were used as models for the *kinds* of representations students should interpret. No sample question was copied.

Fixed 20-question forms now contain at least:

- Arithmetic: 2 table/chart interpretation questions per form.
- QAS: 6 visual/data questions per form (some forms contain 7).
- AAF: 7 visual/data questions per form (one form contains 8).

Visual question types now include:

- single- and grouped-bar charts;
- line graphs and coordinate-plane graphs;
- function tables and numerical data tables;
- two-way tables;
- scatterplots and model interpretation;
- quadratic graphs;
- graph-choice / vertical-line-test items;
- coordinate transformations;
- right-triangle diagrams;
- rectangular-prism diagrams;
- triangle/congruence diagrams.

## AAF geometry

An AAF Geometry Concepts reporting area was added. The College Board technical manual describes Geometry Concepts for Algebra 1 and Algebra 2 in the AAF item pool, and the supplied AAF sample set includes geometry questions using a rectangular-prism diagram and paired triangles.

## Validation

Automated checks verified:

- fixed and random form lengths;
- category allocations sum to each test length;
- no exact duplicate prompts within or across fixed forms;
- no exact overlap between fixed full forms and fixed targeted quizzes;
- four distinct answer choices and valid answer keys;
- nonempty explanations;
- minimum visual counts on every fixed form;
- balanced MathJax delimiters;
- no malformed `cdot` or `sqrt` commands in generated ACCUPLACER content;
- JavaScript syntax;
- local MathJax bundle path and local site links.
