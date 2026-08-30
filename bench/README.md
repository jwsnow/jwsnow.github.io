# PDF Workbench — Milestone 2.1.6

Milestone 2.1.6 is a deliberately tiny footer-polish release based on iPad testing of 2.1.5. It does **not** change viewer gestures, pen/finger separation, split-pane state, Presentation behavior, PDF rendering, or document handling.

## Confirmed 2.1.4/2.1.5 behavior

- iPad and Surface: one-finger pan/scroll works.
- iPad and Surface: two-finger pinch zoom works.
- iPad and Surface: pen/Pencil does not pan or zoom the PDF.
- Pen/Pencil can operate visible buttons.
- Presentation hidden toolbar is not revealed/activated by pen hover or hidden pen tap.
- High-zoom horizontal panning reaches both page edges.
- The installed iPad PWA ultimately updated successfully; the earlier manual-update failure is treated as transient unless reproducible.

## Changed in 2.1.6 — compact footer on iPad

2.1.5 added the full iPad bottom safe-area inset to the footer row. That corrected the text position but made the footer visibly taller than desired.

2.1.6 restores the footer grid row to the normal `var(--status-h)` (28 px) and removes bottom safe-area padding from the status bar itself. The footer text remains vertically centered while the visible footer returns to the compact height used on Surface/desktop.

There are no gesture or viewer-state changes in this release.

## Future inking note

Full Page mode currently places navigation arrows near the bottom of the document. When inking is implemented, test these carefully for accidental palm activation. Possible later remedies include auto-hide, an ink-mode hide option, palm-safe activation rules, or alternate edge placement. Do not change them prematurely.

## Version

**More → About this build** must report **Milestone 2.1.6**. The service-worker cache is `pdf-workbench-m2.1.6-v1`.

## Suggested 2.1.6 check

1. iPad PWA: verify the footer is back to a compact height and its text is vertically centered.
2. Surface/desktop: verify footer appearance remains normal.
3. Briefly smoke-test finger pan/pinch and pen non-navigation to ensure no regression.

After this polish check, the planned next major work is Milestone 3 document handling/export.
