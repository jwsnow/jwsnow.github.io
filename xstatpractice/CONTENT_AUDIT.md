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

The 5a/5b through 12a/12b subdivisions are represented as focused skills within the corresponding diagnostic exam.

## Source hierarchy

The revised bank uses three sources in this order:

1. the uploaded class-review `testTopics` material for the expected course sequence and question style;
2. the older JSON banks for the established kinds of practice questions and contextual applications;
3. newly generated contextual variants to provide enough material for multiple fixed and random forms.

Sections 1–2 were retained from the prior site-wide revision. Sections 3–12 were re-audited/rebuilt after the source-alignment review.

## Section 3 — Probability

Genetics questions now follow the formal wording used in the JSON bank: homozygous dominant, homozygous recessive, heterozygous, genotype, and phenotype. Casual references such as “Mendelian cross” are not used as a substitute for the actual genetic setup.

## Section 4 — Random variables

Validity-of-distribution, mean, standard-deviation, and 5% Rule questions display probability tables. All 60 mean/standard-deviation questions were independently recomputed from the exact probabilities shown in those tables. The bank includes mean, standard deviation, significantly high values, significantly low values, insurance, lottery/game expected value, and long-run interpretation.

## Sections 5–7 — distributions and intervals

Binomial and Poisson questions are contextual and mirror the JSON/`testTopics` patterns: ordinary probabilities, claims evaluated with Rare Event Rule reasoning, multiple-choice guessing, Range Rule of Thumb, Poisson rate conversion, Poisson mean/standard deviation, and capacity/percentile questions. Bare notation such as `X ~ Bin(...)` is excluded from student prompts.

Uniform, normal, standard-normal, and sampling-distribution questions use contextual measurements when a context is meaningful. The standard-normal bank also includes the mean/standard deviation and inverse-normal cutoff types present in `testTopics`.

Confidence-interval banks include calculation from summary statistics or raw data, interpretation, margin of error, overlapping proportion intervals, majority claims, and the inference/rare-event meaning of a claimed parameter lying outside an interval. All intervals about means use t-distributions.

## Hypothesis testing

The site uses the **P-value method**. Hypothesis-test critical-value material from the older JSON bank is excluded.

For one proportion, one mean, two independent proportions, two independent means, matched pairs, and correlation, setup/interpretation banks explicitly practice:

- translating verbal claims into symbols;
- identifying `H0`;
- identifying `H1`;
- formal reject/fail-to-reject conclusions from a P-value and significance level;
- conclusions about the original claim.

Computation is deliberately separated into contextual **P-value calculation** questions. The old all-in-one “Which complete analysis is correct?” format has been removed. Goodness of fit, contingency tables, and ANOVA likewise separate hypotheses/interpretation from P-value calculation.

All one-mean, two-independent-means, and matched-pairs inference uses t procedures. Two-independent-means calculations use Welch’s t procedure. Matched-pairs differences are defined as `First − Second`.

## Correlation, regression, chi-square, and ANOVA

Correlation questions use positive correlation, negative correlation, and no linear correlation terminology without undefined “strong” labels in introductory interpretation. Regression includes both predicting `y` from `x` and the reverse-variable regression examples represented in the source material.

Goodness-of-fit, contingency-table, and ANOVA questions use contextual categorical/group labels and technology-based P-values. The Choosing the Correct Test bank contains unique contextual claims representing all nine procedures used in the class review.

## Intentional discrete monetary examples

Salary and posted-price examples remain intentionally **discrete quantitative** variables when possible values are restricted to fixed currency increments. Decimal notation alone does not make a variable continuous.

## Formatting

Mathematical notation is written in MathJax LaTeX. HTML is used for structural layout such as paragraphs, tables, and inline SVG graphs. Every question includes a nonempty explanation shown after submission.

## Final course-language conventions

After the Form A review, the same wording rules were applied throughout the bank. Empirical-Rule ranges are written with “to”; binomial and Poisson questions request the probability explicitly; Poisson problems do not coach students to convert the rate; and contextual parameter definitions are given for independent-sample inference. In one-/two-sample and matched-pairs tests, the null hypothesis always uses equality. Formal decisions use “Support \(H_1\)” or “Do not support \(H_1\).” Correlation hypotheses and ANOVA hypotheses are stated in words, consistent with the course text.

The final answer audit covers all 1,764 questions: 777 were independently recomputed numerically from the exact displayed values, while the remaining 987 were independently checked against definitions, rules, hypothesis conventions, interpretation rules, and test-selection criteria. No unresolved answer errors or duplicate answer choices remained.
