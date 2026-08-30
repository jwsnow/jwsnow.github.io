# PDF Workbench — Milestone 3.5.2

Milestone 3.5.2 is a focused fix for the one remaining Presentation transition regression found in Surface testing of 3.5.1.

## Fix in 3.5.2

### Single View → Presentation position preservation

Surface testing showed an asymmetric result in 3.5.1:

- Presentation → regular View preserved the visible logical page/content position.
- Split View preserved both panes correctly in both directions.
- Regular **single View → Presentation** could still shift the visible position.

The single-view entry path now waits for Surface/Chromium fullscreen geometry to settle before rebuilding the viewer, suppresses resize-triggered rebuilds during that transition, and then reapplies the captured logical page/content anchor after the new Presentation layout has stabilized.

Split-view Presentation transitions are intentionally unchanged because device testing reports that both panes already preserve their positions correctly in both directions.

## Preserved behavior

- Pages template selection/capture fix from 3.5.1.
- Presentation-safe in-app template naming dialog.
- Presentation → View anchoring from 3.5.1.
- Visual thumbnail Insert Page chooser in Pages, View, and Presentation.
- Thumbnail template manager with Rename/Delete.
- Session-only templates; they survive **Close all files** in the current running session but are cleared on a full reload/restart.
- Same-document split structural-edit anchoring from 3.4.4.
- Continuous, Page Snap, and Full Page modes.
- Finger pan/pinch and pen-reserved-for-ink behavior.
- Files operations: Export, multi-file ZIP export, Extract, Split, Combine.
- Blank/graph-paper pages and structural PDF export.
- PDF.js JBIG2/WASM resource configuration.

## Version

**More → About this build** reports **Milestone 3.5.2**. The service-worker cache is `pdf-workbench-m3.5.2-v1`.

## Suggested 3.5.2 tests

1. On Surface in single View, position well into a document and switch **View → Presentation** in Continuous mode. The same logical content should remain visible.
2. Repeat in Page Snap; the same snapped page should remain centered.
3. Repeat in Full Page; the same page should remain active.
4. Confirm Presentation → View still preserves position.
5. Regression-check split View in both directions, but no split behavior was intentionally changed.
6. Recheck template Save in Presentation and Pages template selection briefly to ensure the 3.5.1 fixes remain intact.
