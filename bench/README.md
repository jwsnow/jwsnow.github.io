# PDF Workbench — Milestone 2.1.1

Milestone 2.1.1 is a focused viewer-stability revision of 2.1.0. It keeps the established PDF.js/JBIG2, organizer, split-view, Presentation, and PWA-update behavior while addressing the iPad pinch/scroll and Split → Single → Split state-restoration bugs found in testing.

## Included

- Local opening of PDFs and images as separate documents.
- PDF.js 6.2.108 rendering with WASM/JBIG2, CMap, and standard-font resources configured.
- Non-destructive page organizer with thumbnails, range/additive checkbox selection, rotation, duplication, deletion, animated drag reordering, and per-document undo/redo.
- Continuous, Page Snap, and Full Page viewing.
- Fit Width / Fit Page, 25%–400% zoom, desktop Ctrl+wheel zoom, and touch pinch-to-PDF zoom.
- Side-by-side viewing; either pane can show any open PDF, including the same PDF in both panes.
- Presentation mode with temporary compact controls. iPad uses app-level presentation rather than Safari native fullscreen.
- Manual PWA refresh through **More → About this build → Reload latest version**.

## Fixed in 2.1.1

### iPad/Safari pinch anchoring

Pinch zoom continues to anchor a document point to the midpoint of the fingers, but the implementation now protects that location across the final crisp re-render:

- page geometry is measured after the new scale is applied;
- programmatic re-render scroll events are prevented from overwriting the intended stored position;
- browser overflow anchoring is disabled in the PDF viewer;
- page snapping is temporarily disabled while a pinch is active;
- the anchor is corrected on two post-layout animation frames after the final re-render to handle deferred iPad/Safari layout/scroll adjustments.

The same mechanism is independent in Single, Left, and Right viewer instances.

### Inactive split-pane scroll restoration

A pane rebuild can temporarily set its DOM `scrollTop` to zero. Some browsers, especially iPad Safari, emit a scroll event during that rebuild. In 2.1.0 that transient event could overwrite the saved inactive-pane scroll position.

2.1.1 suppresses view-state writes while split panes are hidden or being rebuilt, snapshots the saved scroll coordinates before DOM replacement, and restores them after layout settles. Therefore:

- Split → Single preserves the inactive pane;
- returning Single → Split restores that pane where it was left;
- left/right state remains independent even when both panes display the same document.

### Toolbar breakpoint

Top-bar controls no longer progressively squeeze. They now have two responsive states:

1. icon + label;
2. icon only at the narrow breakpoint.

Touch targets remain stable.

### Full Page icon

Full Page viewing now uses a different icon from the Single-layout control, avoiding the previous visual ambiguity.

## Important scan-PDF support

Do not remove the PDF.js WASM configuration. The test file `BaakeScan.pdf` contains many JBIG2-compressed scan pages; they rendered blank until the PDF.js WASM/JBIG2 resource path was supplied.

## Version verification

**More → About this build** must report **Milestone 2.1.1**. The visible About version and service-worker cache version are updated together for every release.

## Suggested 2.1.1 test sequence

1. Open two PDFs and put one in each split pane.
2. Scroll the inactive pane well down into its document.
3. Activate the other pane → Single → Split. Confirm the inactive pane returns to the exact prior location rather than the top.
4. Repeat with the right pane as active, then with the left pane as active.
5. Put the **same PDF** in both panes at widely separated pages/zooms and repeat the transitions.
6. On iPad, pinch over a recognizable word/equation in Single view. The same document point should stay under the midpoint during the pinch and after the fingers lift.
7. Repeat pinch tests in both split panes independently.
8. Test pinch near the top, middle, bottom, left edge, and right edge of a page.
9. Test Continuous, Page Snap, and Full Page modes. Page Snap must not fight the pinch while the gesture is active.
10. Rotate iPad/Chromebook/Surface or narrow the desktop window. Controls should switch directly from labels to icons without squeezed intermediate buttons.
11. Confirm the Full Page icon is visually distinct from the Single-layout icon.
12. Confirm hidden Presentation controls still reject tap-through.
13. Open `BaakeScan.pdf`, including in split view, and confirm JBIG2 pages still render.
14. Open About and verify **Milestone 2.1.1**.
15. Use Reload latest version once deployed and confirm the new build/cache is loaded.

## New features queued after viewer stabilization

The next document-model work should include page insertion after the current page:

- duplicate current page with annotations;
- duplicate current page without annotations;
- blank page matching current size/orientation;
- light graph paper matching current size/orientation, approximately 1/4-inch squares.

The same insertion choices can be exposed in Presentation, normal View, and Pages/organizer contexts. A new document should also be creatable as a single blank or graph-paper page so the application can serve as a notebook once inking is available.

## Still intentionally deferred

- PDF export/rebuild.
- Explicit merge/combine and split-every-n output.
- Page-size/orientation normalization and crop.
- Target-size compression.
- Saved/Recent Projects.
- Pen/highlighter/eraser annotation, palm rejection, spline/pressure ink, and annotation selection/editing.
- The queued blank/graph-paper insertion feature described above.

## PDF.js dependency

This prototype still pins PDF.js 6.2.108 at jsDelivr. Before final deployment, its JS/WASM/CMap/font resources should be vendored into the PWA so first-run/offline behavior has no third-party dependency.

## Running locally

A service worker requires HTTP/HTTPS rather than `file://`. From the app directory:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.
