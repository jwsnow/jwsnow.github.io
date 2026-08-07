# Content and Design Audit

## Course sequence

The diagnostic sequence follows the uploaded class-review file:

1. Data and Graphs
2. Summarizing Data
3. Probability
4. Random Variables
5. Binomial and Poisson Distributions
6. Uniform and Normal Distributions
7. Confidence Intervals
8. Hypothesis Tests about One Sample
9. Hypothesis Tests about Two Independent Samples
10. Matched Pairs, Correlation, and Regression
11. Chi-Squared Tests
12. ANOVA and Choosing the Correct Test

The 5a/5b through 12a/12b subdivisions are represented as skill groups within the corresponding diagnostic exam.

## JSON-only material incorporated

Material found in the older JSON bank but not emphasized as strongly in the printed review was incorporated where it supports fundamental skills:

- descriptive/statistical vocabulary beyond the printed prompts;
- experiment versus observational study;
- frequency-table/histogram interpretation (rebuilt without the missing images);
- sample-space/event vocabulary;
- replacement versus nonreplacement and dependence;
- **standard deviation of a discrete random variable**;
- significantly low values using the 5% Rule;
- confidence-interval majority/overlap interpretation;
- explicit null-hypothesis formulation as well as alternative-hypothesis formulation;
- direction/strength of correlation.

Lottery, insurance, Punnett-square, cards, coins, dice, and marbles are used as applications of existing skills rather than being treated as separate course topics.

## Intentional discrete examples

Salary and posted-price examples are intentionally retained as **discrete quantitative** variables when their possible values are restricted to fixed currency increments. The explanations explicitly distinguish discrete/continuous from the superficial question of whether a number is written with decimals.

## Hypothesis testing

The site uses the **P-value method**. Critical-value hypothesis-testing material from the older JSON bank is excluded.

For one proportion, one mean, two independent proportions, two independent means, matched pairs, goodness of fit, contingency tables, ANOVA, and correlation, **setup/interpretation is separated from full-test computation**. Diagnostics 8–12 deliberately contain only a few full tests; most questions emphasize claims, hypotheses, P-value decisions, conclusions, interpretation, regression, or test selection.

## Formatting

Mathematical notation in the new bank is written in MathJax LaTeX. HTML is used only for structural layout (paragraphs, tables, and inline SVG graphs). The renderer avoids raw `<` in mathematical source, preventing the truncation problem found in the earlier analysis site.

All graph questions in the new bank use inline SVG; they do not depend on the 120 missing image references in the older JSON bank.

## August 7 site-wide question-quality revision

A review of Exam 1 Form A exposed a general padding/repetition problem in the generated bank. The site was re-audited globally. Canned lead-ins were removed, duplicate-stem groups were replaced with substantive variants, and diagnostic selection was changed to balance subskills rather than relying on an unrestricted shuffle. Introductory scatterplots now use correlation terminology without undefined strength labels, and misleading-display questions show the graph. See `REVISION_NOTES.md` for the detailed audit.
