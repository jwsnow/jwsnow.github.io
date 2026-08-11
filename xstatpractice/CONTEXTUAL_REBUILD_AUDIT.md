# Contextual Rebuild Audit — Sections 3–12

This rebuild was prompted by a comparison of the practice site with the original JSON review banks and the uploaded `testTopics` files.

## Requested changes implemented

- **Section 3:** genetics questions now use the formal parental-genotype language of the JSON reviews.
- **Section 4:** probability distributions are displayed as tables where students must read a distribution; all random-variable means and standard deviations were independently recalculated from the displayed probabilities.
- **Section 5:** binomial and Poisson questions were rebuilt around contextual JSON/`testTopics` examples. Student prompts do not use `X ~ Bin(...)`. Rare Event Rule interpretation is explicitly included for both distributions.
- **Section 6:** uniform, normal, and CLT questions use contextual measurements whenever practical. Standard-normal mean/SD and inverse-normal cutoff questions from `testTopics` were restored.
- **Section 7:** confidence intervals include contextual construction and interpretation, including majority/overlap and claimed-parameter/rare-event reasoning. Mean intervals use t-distributions.
- **Sections 8–12:** all-in-one complete-analysis questions were removed. Hypothesis setup and interpretation are modeled on `testTopics`; P-value calculations are separate contextual questions.
- **Means:** one-mean, two-mean, and matched-pairs inference uses t-distributions throughout.
- **Test selection:** 60 unique contextual claims cover all nine procedures in the class review.

## Independent checks

`CONTEXTUAL_REBUILD_VALIDATION.json` records automated checks that include:

- all displayed Section 4 probability tables sum correctly;
- 60 mean/standard-deviation answers independently recompute to the keyed four-decimal values;
- all distribution-validity and 5% Rule questions in Section 4 display tables;
- required source-style subskills are present in Sections 5–7;
- one-/two-sample and matched-pairs setup banks include both `H0` and `H1` questions;
- calculation banks do not ask for an all-in-one decision/conclusion;
- no hypothesis-test critical-value language appears;
- no z procedure is used for inference about means;
- all nine Choosing the Correct Test procedures are represented;
- no exact duplicate prompt remains anywhere within a focused-skill bank.

The MathJax and fixed-form validators are run separately.
