# Source JSON Audit

The uploaded source contains **77 JSON files and 2,191 questions**. The new practice site does not import these files blindly; the material was used as a topic/pattern source and the new bank was regenerated with independently computed answers and explanations.

## Formatting findings

- 484 questions contain HTML/entity-based mathematical notation such as `&mu;` or `<sub>`.
- 475 questions contain Unicode mathematical symbols.
- 3 questions contain explicit MathJax/LaTeX delimiters.
- 20 questions contain the malformed `</p></p>` sequence.
- 5 questions have duplicate visible answer choices (excluding image-choice questions whose visible text is intentionally empty).
- 3 questions have a structural answer-key inconsistency.
- 120 image references occur in the JSON bank, and the referenced image files are not present in the uploaded ZIP. The new graph questions are rebuilt as inline SVG.
- The new site uses MathJax LaTeX for mathematical notation and HTML only for structural layout such as paragraphs, tables, and SVG graphs.

## Confirmed source defects / exclusions

- **10.4_Uniform_Quantiles_-_Left.json**, question 4: duplicate visible answer choices
- **13.1_Mean_Interval_Summary_Statistics.json**, question 5: duplicate visible answer choices
- **13.1_Mean_Interval_Summary_Statistics.json**, question 18: duplicate visible answer choices
- **16.1_Proportion_HT.json**, question 52: correct_ids disagrees with marked correct choice
- **16.1_Proportion_HT.json**, question 61: correct_ids disagrees with marked correct choice
- **20.1_Matched_Pairs.json**, question 1: malformed `</p></p>` paragraph sequence
- **20.1_Matched_Pairs.json**, question 7: malformed `</p></p>` paragraph sequence
- **20.1_Matched_Pairs.json**, question 13: malformed `</p></p>` paragraph sequence
- **20.1_Matched_Pairs.json**, question 19: malformed `</p></p>` paragraph sequence
- **20.1_Matched_Pairs.json**, question 25: malformed `</p></p>` paragraph sequence
- **20.1_Matched_Pairs.json**, question 31: malformed `</p></p>` paragraph sequence
- **20.1_Matched_Pairs.json**, question 37: malformed `</p></p>` paragraph sequence
- **20.1_Matched_Pairs.json**, question 43: malformed `</p></p>` paragraph sequence
- **20.1_Matched_Pairs.json**, question 49: malformed `</p></p>` paragraph sequence
- **20.1_Matched_Pairs.json**, question 55: malformed `</p></p>` paragraph sequence
- **20.1_Matched_Pairs.json**, question 61: malformed `</p></p>` paragraph sequence
- **20.1_Matched_Pairs.json**, question 67: malformed `</p></p>` paragraph sequence
- **20.1_Matched_Pairs.json**, question 73: malformed `</p></p>` paragraph sequence
- **20.1_Matched_Pairs.json**, question 79: malformed `</p></p>` paragraph sequence
- **20.1_Matched_Pairs.json**, question 85: malformed `</p></p>` paragraph sequence
- **20.1_Matched_Pairs.json**, question 91: malformed `</p></p>` paragraph sequence
- **20.1_Matched_Pairs.json**, question 97: malformed `</p></p>` paragraph sequence
- **20.1_Matched_Pairs.json**, question 103: malformed `</p></p>` paragraph sequence
- **20.1_Matched_Pairs.json**, question 109: malformed `</p></p>` paragraph sequence
- **20.1_Matched_Pairs.json**, question 115: malformed `</p></p>` paragraph sequence
- **22.1_Correlation.json**, question 74: 2 choices marked correct
- **22.1_Correlation.json**, question 74: duplicate visible answer choices
- **5.5_Two_Dice_Probability_Quiz.json**, question 17: duplicate visible answer choices
- **1.1_Data_and_Sampling_Vocabulary.json**, question 1: Keyed answer uses “Statistics” for a numerical measurement based on a sample; the correct term is “statistic.”
- **4.2_Comparing_Z_Scores.json**, question 1: Marked comparison is inconsistent with the computed z-scores; the other observation has the larger standardized score.
- **10.6_Uniform_Quantiles_-_Right.json**, question 3: Displayed percentage is 9% while the keyed cutoff corresponds to 10% (percentage-formatting defect).
- **10.6_Uniform_Quantiles_-_Right.json**, question 7: Displayed percentage is 9% while the keyed cutoff corresponds to 10% (percentage-formatting defect).
- **10.6_Uniform_Quantiles_-_Right.json**, question 11: Displayed percentage is 9% while the keyed cutoff corresponds to 10% (percentage-formatting defect).
- **10.6_Uniform_Quantiles_-_Right.json**, question 15: Displayed percentage is 9% while the keyed cutoff corresponds to 10% (percentage-formatting defect).
- **16.1_Proportion_HT.json**, question 61: Contains the typo “at lease 0.40”; it should be “at least 0.40.”
- **6.6_Two_Marbles_(With_Replacement)_Mixed_Probability_Quiz_(Decimals).json**, question multiple: Several generated stems use singular counts with plural nouns, such as “1 red marbles” or “1 blue marbles.”
- **6.7_Two_Marbles_(Without_Replacement)_Mixed_Probability_Quiz_(Decimals).json**, question multiple: Several generated stems use singular counts with plural nouns, such as “1 red marbles” or “1 blue marbles.”
- **14.3_Prop_Interval_Majority.json**, question multiple: The generated majority-conclusion wording is frequently ungrammatical (for example, “a majority participants…”).
- **15.5_Critical_Values_Prop.json**, question all: Critical-value hypothesis-testing material is intentionally excluded from the new site.

## Source file inventory

| File | Questions | HTML/entity math | Unicode math | LaTeX | Structural issues |
|---|---:|---:|---:|---:|---:|
| `1.1_Data_and_Sampling_Vocabulary.json` | 9 | 0 | 0 | 0 | 0 |
| `1.2_Experiment_vs_Observational_Study.json` | 20 | 0 | 0 | 0 | 0 |
| `1.3_Categorical_vs_Quantitative_Quiz.json` | 20 | 0 | 0 | 0 | 0 |
| `1.4_Continuous_vs_Discrete_Data.json` | 20 | 0 | 0 | 0 | 0 |
| `10.1_Uniform_Less-Than.json` | 20 | 0 | 0 | 0 | 0 |
| `10.2_Uniform_Greater-Than.json` | 20 | 0 | 0 | 0 | 0 |
| `10.3_Uniform_Between.json` | 20 | 0 | 0 | 0 | 0 |
| `10.4_Uniform_Quantiles_-_Left.json` | 20 | 0 | 0 | 0 | 1 |
| `10.5_Uniform_Quantiles_-_Middle.json` | 20 | 0 | 0 | 0 | 0 |
| `10.6_Uniform_Quantiles_-_Right.json` | 20 | 0 | 0 | 0 | 0 |
| `11.1_Normal_Left.json` | 20 | 0 | 0 | 0 | 0 |
| `11.2_Normal_Right.json` | 20 | 0 | 0 | 0 | 0 |
| `11.3_Normal_Middle.json` | 20 | 0 | 0 | 0 | 0 |
| `11.4_NormalQ_Left.json` | 20 | 0 | 20 | 0 | 0 |
| `11.5_NormalQ_Right.json` | 20 | 0 | 20 | 0 | 0 |
| `11.6_NormalQ_Middle.json` | 20 | 0 | 0 | 0 | 0 |
| `12.1_Central_Limit_Theorem.json` | 30 | 0 | 30 | 0 | 0 |
| `12.2_Central_Limit_Theorem_Inverse.json` | 30 | 0 | 0 | 0 | 0 |
| `13.1_Mean_Interval_Summary_Statistics.json` | 20 | 0 | 0 | 0 | 2 |
| `13.2_Mean_Interval_Data.json` | 20 | 0 | 0 | 0 | 0 |
| `13.3_Mean_Interval_Interpretation.json` | 20 | 0 | 0 | 0 | 0 |
| `14.1_Prop_Interval.json` | 20 | 0 | 0 | 0 | 0 |
| `14.2_Prop_Interval_Overlap.json` | 20 | 0 | 0 | 0 | 0 |
| `14.3_Prop_Interval_Majority.json` | 20 | 0 | 0 | 0 | 0 |
| `15.1_State_H0_Prop.json` | 6 | 6 | 6 | 0 | 0 |
| `15.2_State_H1_Prop.json` | 6 | 6 | 6 | 0 | 0 |
| `15.3_State_H0_Mean.json` | 6 | 6 | 6 | 0 | 0 |
| `15.4_State_H1_Mean.json` | 6 | 6 | 6 | 0 | 0 |
| `15.5_Critical_Values_Prop.json` | 9 | 3 | 3 | 0 | 0 |
| `15.6_Formal_Conclusions.json` | 12 | 12 | 0 | 0 | 0 |
| `15.7_Final_Conclusions.json` | 24 | 24 | 0 | 0 | 0 |
| `16.1_Proportion_HT.json` | 120 | 80 | 60 | 0 | 2 |
| `17.1_Mean_HT.json` | 120 | 80 | 60 | 0 | 0 |
| `18.1_Two_Proportions.json` | 120 | 80 | 60 | 0 | 0 |
| `19.1_Independent_Means.json` | 120 | 80 | 60 | 0 | 0 |
| `2.1_Frequency_Tables_and_Histograms.json` | 20 | 0 | 0 | 0 | 0 |
| `2.2_Shapes_of_Histograms.json` | 20 | 0 | 0 | 0 | 0 |
| `2.3_Scatter_Plots_Correlation_Quiz.json` | 20 | 0 | 0 | 0 | 0 |
| `20.1_Matched_Pairs.json` | 120 | 80 | 60 | 0 | 20 |
| `22.1_Correlation.json` | 80 | 0 | 0 | 0 | 2 |
| `22.2_Regression.json` | 18 | 0 | 0 | 0 | 0 |
| `23.1_GOF.json` | 20 | 0 | 0 | 0 | 0 |
| `24.1_Contingency.json` | 38 | 0 | 0 | 0 | 0 |
| `25.1_ANOVA.json` | 40 | 0 | 0 | 0 | 0 |
| `3.1_Statistical_Symbols.json` | 20 | 1 | 4 | 3 | 0 |
| `3.2_Calculating_Means.json` | 20 | 0 | 0 | 0 | 0 |
| `3.3_Finding_the_Median.json` | 20 | 0 | 0 | 0 | 0 |
| `3.4_Finding_the_Mode.json` | 20 | 0 | 0 | 0 | 0 |
| `3.5_Sample_Standard_Deviation.json` | 20 | 0 | 0 | 0 | 0 |
| `3.6_Range_Rule_of_Thumb.json` | 20 | 0 | 0 | 0 | 0 |
| `4.1_Z-Scores.json` | 40 | 0 | 0 | 0 | 0 |
| `4.2_Comparing_Z_Scores.json` | 40 | 0 | 0 | 0 | 0 |
| `5.1_Probability_Vocabulary.json` | 20 | 0 | 0 | 0 | 0 |
| `5.2_Two_Coins_Probability_Quiz.json` | 10 | 0 | 0 | 0 | 0 |
| `5.3_Three_Coins_Probability_Quiz.json` | 20 | 0 | 0 | 0 | 0 |
| `5.4_One_Card_Probability_Quiz.json` | 20 | 0 | 0 | 0 | 0 |
| `5.5_Two_Dice_Probability_Quiz.json` | 20 | 0 | 0 | 0 | 1 |
| `5.6_Punnett_Square_Probability_Quiz.json` | 20 | 0 | 0 | 0 | 0 |
| `6.1_Probability_Vocabulary_Quiz.json` | 7 | 0 | 0 | 0 | 0 |
| `6.2_Contingency_Table_Probability_Quiz_(Standalone,_Compact_Tables).json` | 20 | 0 | 4 | 0 | 0 |
| `6.3_Two_Dice_AND_Probabilities_Quiz_(Die-by-Die_Conditions).json` | 20 | 0 | 0 | 0 | 0 |
| `6.4_Two_Cards_(With_Replacement)_AND_Probabilities_Quiz.json` | 20 | 0 | 0 | 0 | 0 |
| `6.5_Two_Cards_(Without_Replacement).json` | 20 | 0 | 0 | 0 | 0 |
| `6.6_Two_Marbles_(With_Replacement)_Mixed_Probability_Quiz_(Decimals).json` | 20 | 0 | 0 | 0 | 0 |
| `6.7_Two_Marbles_(Without_Replacement)_Mixed_Probability_Quiz_(Decimals).json` | 20 | 0 | 0 | 0 | 0 |
| `7.1_Random_Variable_Means.json` | 20 | 0 | 20 | 0 | 0 |
| `7.2_Random_Variable_Standard_Deviation.json` | 20 | 20 | 20 | 0 | 0 |
| `7.3_5_Rule_High.json` | 20 | 0 | 0 | 0 | 0 |
| `7.4_5_Rule_Low.json` | 20 | 0 | 0 | 0 | 0 |
| `7.5_Life_Insurance.json` | 20 | 0 | 0 | 0 | 0 |
| `7.6_Lottery.json` | 20 | 0 | 0 | 0 | 0 |
| `8.1_Binomial.json` | 20 | 0 | 0 | 0 | 0 |
| `8.2_MC_Guessing_(Binomial).json` | 20 | 0 | 0 | 0 | 0 |
| `8.3_Binomial_and_Range_Rule_of_Thumb.json` | 20 | 0 | 0 | 0 | 0 |
| `9.1_Poisson.json` | 100 | 0 | 0 | 0 | 0 |
| `CLT.json` | 30 | 0 | 30 | 0 | 0 |
| `Inverse.json` | 30 | 0 | 0 | 0 | 0 |
