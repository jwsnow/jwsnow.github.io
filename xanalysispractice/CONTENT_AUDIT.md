# Content audit notes

The entire 434-question bank was reevaluated in this correction rather than patching only the reported questions in Sections 1.2 and 1.3.

The audit used the supplied *An Introduction to Real Analysis* notes as the content authority. Questions remain organized by Sections 1.2–6.5 and are intended to reinforce definitions, theorem hypotheses and conclusions, proof ideas, calculations, examples and counterexamples, and section/chapter exercises.

## Systemic rendering repair

The most important failure was in the renderer rather than in MathJax itself. Question text was inserted directly into `innerHTML`. Consequently a perfectly legitimate TeX expression such as `\\(x<y\\)` could be parsed first by the browser as HTML, with `<y` treated as a tag. This caused the partial stems and answers reported in Sections 1.2 and 1.3.

The application now HTML-escapes prompts, answer choices, correct answers, and explanations before placing them into `innerHTML`. MathJax typesets the resulting text afterward. The answer handlers also use choice indices instead of embedding answer strings in event attributes.

## Question-bank corrections

The bank was checked for and corrected with respect to:

- incomplete or truncated stems and answer choices;
- mathematical material outside MathJax delimiters;
- inconsistent plaintext-versus-MathJax variables;
- malformed subscripts, superscripts, primes, fractions, limits, sums, products, and integrals;
- use of `*` for multiplication;
- number systems, which now use `\\mathbb{N}`, `\\mathbb{Z}`, `\\mathbb{Q}`, and `\\mathbb{R}` as appropriate;
- prompts or answers that depended on memorizing unnamed theorem/lemma/definition numbers;
- incomplete hypotheses for supremum, product-of-sets, integrability, and Fundamental Theorem statements;
- ambiguous multiple-choice items with more than one defensible answer;
- misleading or incomplete proof-strategy descriptions;
- inconsistent notation between a question and its explanation;
- prose answer choices that were too fragmentary to communicate the intended statement clearly.

Examples of substantive corrections include the supremum/negative-scaling hypotheses in Chapter 1, the construction near a supremum and subsequence results in Chapter 2, the sequential/inverse-function reasoning in Chapter 3, derivative and l’Hôpital items in Chapter 4, lower/upper integral and FTC items in Chapter 5, and the partial-sum identity and logarithmic integral notation in Chapter 6.

## Validation

Every MathJax fragment in every stem, choice, correct answer, and explanation was parsed using the exact MathJax 3.2.1 engine bundled with the site. All 3,485 expressions parsed with zero MathJax input errors. Structural and source-level checks are recorded in `VALIDATION.txt` and `VALIDATION.json`.
