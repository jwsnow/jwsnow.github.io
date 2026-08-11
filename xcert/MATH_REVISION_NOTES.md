# Mathematics rendering and visual-question sweep

This revision addresses mathematical typesetting and visual-representation coverage throughout the mathematics portions of the portal.

## MathJax corrections

- Fixed the QAS Rational Numbers comparison item that used three underscore characters inside TeX math mode. That construction could produce MathJax's `Missing open brace for subscript` error. The comparison now uses a question mark as the relation placeholder.
- Removed punctuation placed immediately after block/display-math containers, which could leave a period stranded on a separate line.
- Changed local MathJax loading so the MathJax component is loaded before the quiz application starts.
- Added a serialized MathJax typesetting queue so repeated question redraws (selecting an answer, moving between questions, reviewing answers) are typeset reliably in stems, choices, and explanations.
- Applied the same rendering lifecycle fix to the combined 4–8 center.

## Visual-question coverage

Fixed TExES mathematics forms now guarantee substantial visual content:

- EC–6 Mathematics 902: at least 10 visual/table/diagram items per 40-question form, including at least 5 actual graph/chart items.
- Core Subjects 4–8 Mathematics 807: at least 12 visual/table/diagram items per 42-question form, including at least 7 actual graph/chart items.
- Mathematics 4–8 (115): at least 25 visual/table/diagram items per 100-question form, including at least 15 actual graph/chart items.
- Mathematics/Science 4–8 (114): at least 12 math-specific visual items per fixed full form; current forms contain 15–22.

Targeted TExES mathematics quizzes also enforce visual questions whenever the competency has a meaningful graphical, tabular, statistical, coordinate, or geometric representation.

The visual bank includes coordinate graphs, linear and quadratic graphs, exponential plots, function tables, ratio tables, bar charts, line graphs, histograms, box plots, scatterplots, two-way tables, coordinate-plane figures, right-triangle diagrams, rectangular-prism diagrams, and congruence/geometry diagrams.

## Validation

- 866 distinct generated TeX formulas were parsed directly with the bundled MathJax engine: 0 MathJax parser errors.
- Generated fixed stems, choices, and explanations were scanned for raw TeX commands outside MathJax delimiters, malformed underscore placeholders, unbalanced delimiters, and punctuation stranded after display-math blocks: 0 errors.
- Fixed full forms and targeted quizzes retain duplicate-prompt checks and distinct answer-choice checks.
