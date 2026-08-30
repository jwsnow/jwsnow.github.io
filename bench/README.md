# PDF Workbench — Milestone 2.1.3

Milestone 2.1.3 is a focused stylus-input revision of 2.1.2. It preserves the now-tested high-zoom pan/pinch behavior, split-view state separation, iPad app-level Presentation mode, PDF.js/JBIG2 support, organizer behavior, and PWA update mechanism.

## Confirmed from 2.1.2 testing

- Zoom/pan works on iPad and Surface, including the high-zoom horizontal-boundary fix.
- Pen hover does not reveal/activate the hidden Presentation toolbar.
- Pen taps do not activate the hidden Presentation toolbar.
- The compact/icon-only toolbar at normal iPad widths is acceptable.

## Changed in 2.1.3 — stylus reserved for ink

A pen/stylus was still able to scroll the PDF surface. The desired annotation architecture separates input roles:

- stylus/Pencil on document content: reserved for Pen/Eraser/Select;
- one finger: pan/scroll;
- two fingers: pinch zoom/pan;
- stylus: may still operate visible UI controls;
- Pages organizer: stylus may still select and drag pages.

Because ink is not implemented yet, stylus contact on PDF content should now be inert rather than navigate the document. Viewer pen `pointerdown`, contacting `pointermove`, `pointerup`, and `pointercancel` events are canceled/captured to prevent direct document manipulation while leaving finger behavior unchanged.

This is intentionally a narrow change. The viewer keeps `touch-action: pan-x pan-y` and the already-tested native one-finger scrolling rather than replacing finger navigation with a custom implementation. If device testing shows that either Safari/iPadOS or Edge/Windows ignores the canceled pen Pointer Events for scrolling, a later fallback can use a dedicated manual navigation layer; do not make that broader change unless needed.

## Presentation behavior

- Mouse hover near the top may reveal controls.
- Finger tap near the top while hidden reveals controls and consumes the tap.
- Pen hover does not reveal controls.
- Pen tap/drag on hidden document content does not reveal/activate controls.
- Pen can operate controls once they are visible.

## Preserved viewer fixes

- Split → Single → Split preserves both panes, including the inactive pane's scroll state.
- Same PDF can be shown independently in both panes.
- Pinch zoom uses measured before/after geometry and final post-layout correction.
- Oversized pages expose both far-left and far-right boundaries.
- Toolbar switches directly between labeled and icon-only forms.
- Full Page and Single-layout controls have distinct icons.

## Important scan-PDF support

Do not remove the PDF.js WASM/JBIG2/CMap/standard-font resource configuration. It is required for scan-heavy PDFs such as the prior `BaakeScan.pdf` test file.

## Version verification

**More → About this build** must report **Milestone 2.1.3**. The service-worker cache is `pdf-workbench-m2.1.3-v1`.

Every distributed ZIP includes `PDF_Workbench_Project_Handoff.txt`; update it with every release.

## Suggested 2.1.3 test sequence

1. Drag the PDF with Apple Pencil on iPad: it should not scroll.
2. Drag the PDF with Surface pen: it should not scroll.
3. Repeat in each Split pane.
4. Repeat in Presentation with controls hidden.
5. Scroll the same PDF with one finger: it should still work normally.
6. Pinch with two fingers: zoom/pan and anchor behavior should remain correct.
7. Reveal Presentation controls with a finger and tap visible controls with the pen.
8. Use the pen in Pages view to select and drag/reorder thumbnails.
9. Verify high-zoom left and right page edges remain reachable.
10. Verify Split → Single → Split preserves the inactive pane position.
11. Verify JBIG2 scan pages still render.
12. Verify About says **2.1.3**.

## Queued page/notes features

After the current page, support:

- duplicate current page with annotations;
- duplicate current page without annotations;
- blank page matching current size/orientation;
- light 1/4-inch graph paper matching current size/orientation.

Also allow a new document to start as a single blank or graph-paper page, so the application can become a notes program once inking is available.

## Still deferred

- PDF export/rebuild.
- Explicit merge/combine and split output.
- Page-size/orientation normalization and crop.
- Target-size compression.
- Saved/Recent Projects.
- Full pen/highlighter/eraser annotation, palm rejection, spline/pressure ink, annotation selection/editing.
- Blank/graph-paper page insertion described above.

## Running locally

Serve the folder through HTTP/HTTPS rather than opening `index.html` with `file://`, because the service worker/PWA behavior requires an HTTP origin. For example, from the parent directory:

```bash
python -m http.server 8000
```

Then browse to the served `pdf-workbench-m2.1.3/` directory.
