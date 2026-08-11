# Correction changelog — August 7, 2026

## Renderer

- Escaped prompts and choices before insertion into `innerHTML` so `<` and `>` inside TeX cannot be interpreted as HTML tags.
- Escaped question text, selected/correct answers, and explanations on results pages.
- Changed answer event handlers to pass choice indices rather than embedding answer text in HTML attributes.
- Preserved **Exit quiz** and **Exit review** controls.

## Sections 1.2 and 1.3

- Rewrote the affected items so stems and choices are complete.
- Replaced multiplication `*` with mathematical multiplication notation.
- Put mathematical variables and expressions consistently in MathJax.
- Standardized number systems with blackboard-bold notation.
- Removed requests to identify or state unnamed theorems by number; questions now test theorem content.
- Repaired an interval question and a zero-characterization question that had multiple defensible choices.

## Full-bank audit

- Reviewed all 434 questions across Sections 1.2–6.5.
- Removed remaining numbered theorem/lemma/definition dependencies.
- Corrected missing hypotheses, malformed expressions, mixed-format formulas, and incomplete answers.
- Corrected several semantic/uniqueness issues found outside the originally reported sections.
- Parsed all 3,485 MathJax expressions with the bundled engine: 0 input errors.
