# Visual-data and mathematics-notation revision

This revision preserves the portal's existing layout, navigation, scoring, progress tracking, explanations, diagnostic reports, and question-independence behavior. The changes are concentrated in assessment content and mathematical typesetting.

## Charts, tables, graphs, and diagrams

The mathematics, science, social studies, and combined 4–8 centers now include substantially more questions that require candidates to interpret a visual source rather than answer from prose alone.

Mathematics visual items include, as appropriate to the exam level:

- function and proportional-reasoning tables
- bar, line, histogram, box-plot, and scatterplot interpretation
- lines of best fit and model selection
- two-way tables and probability
- coordinate graphs
- geometric diagrams
- rate-of-change and data-table questions

The fixed mathematics forms guarantee at least these numbers of visual/data-display questions:

- Core Subjects EC–6 Mathematics 902: at least 5 of 40
- Core Subjects 4–8 Mathematics 807: at least 6 of 42
- Mathematics 4–8 (115): at least 12 of 100

Science forms now include experimental-data tables, graphs, and other scientific data displays. Social studies forms include source tables, economic schedules, demographic displays, and charts. The Mathematics/Science 4–8 (114) and ELAR/Social Studies 4–8 (113) centers likewise contain visual-source questions appropriate to their content areas.

## Mathematics notation

The mathematics center and the combined 4–8 center now load a bundled local copy of MathJax 3.2.2. Dynamically generated quiz content is re-typeset after each question and results view is rendered.

Notation was revised so that, where appropriate:

- radicals use a conventional radical bar over the entire radicand;
- substantial fractions use stacked numerator/denominator notation;
- exponents, inequalities, coordinate expressions, trigonometric values, and formulas use TeX-quality typesetting;
- older forms such as a radical symbol followed by a parenthesized radicand were removed from generated fixed mathematics forms.

MathJax 3.2.2 is bundled under `vendor/mathjax/`, so enhanced mathematics rendering does not require access to an external CDN or an internet connection after the site has been deployed.

## Fixed-assessment independence

For each exam separately:

- no exact prompt is repeated within any fixed full form;
- no exact prompt is repeated across the fixed full forms;
- no exact prompt is repeated within or across the fixed targeted-quiz versions;
- no exact prompt used on a fixed full form is reused on a fixed targeted quiz.

Random practice avoids duplicate prompts inside the activity being generated. Because randomized practice is intentionally unlimited, concepts and question families may naturally recur on later attempts.

## Validation

The final automated validation checked:

- 10,684 fixed full-test and fixed-topic question instances;
- 2,622 additional randomly generated question instances;
- form lengths and configured category allocations;
- answer-key validity and distinct choices;
- explanation presence;
- duplicate-prompt independence;
- balanced MathJax delimiters;
- JavaScript syntax;
- local HTML/script/style links.

The final checks reported zero structural errors, zero independence errors, zero JavaScript syntax errors, and zero broken local links.
