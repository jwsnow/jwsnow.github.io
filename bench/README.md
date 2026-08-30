# PDF Workbench — Milestone 2.1.2

Milestone 2.1.2 is a focused viewer/input revision of 2.1.1. It preserves the established PDF.js/JBIG2 support, organizer behavior, split-view state separation, iPad app-level Presentation mode, and PWA update mechanism.

## Fixed in 2.1.2

### High-zoom horizontal panning

At large zoom on iPad, the right side of a page was reachable but the far left side was not. The viewer was a column flex container with `align-items: center`. When a flex child became wider than the scrollport, centering could place its left edge into negative overflow that cannot be reached with `scrollLeft`.

The viewer now aligns flex items from the real left boundary, while each page uses automatic inline margins to remain centered whenever it fits. Expected behavior:

- pages that fit remain visually centered;
- oversized pages have a real scrollable left edge;
- both far-left and far-right page edges can be reached at high zoom;
- the change applies independently in Single and Split viewer panes because they share the viewer/page-stage layout rules.

### Presentation stylus hover/reveal

Previously any non-touch pointer moving near the top of the viewer could reveal the hidden Presentation toolbar. On Surface, pen hover therefore opened the toolbar before the pen touched the screen; the subsequent pen tap could then activate a newly visible control. Apple Pencil can present similar pointer behavior depending on browser/device support.

Presentation reveal is now intentionally separated by pointer type:

- mouse hover near the top may reveal the toolbar;
- a finger tap near the top may reveal the toolbar, and that reveal gesture is consumed so it cannot also activate a control;
- pen/stylus hover does **not** reveal the hidden toolbar;
- pen/stylus can still operate toolbar controls once those controls are already visible.

This anticipates the annotation architecture, where stylus input on the document should be reserved for ink tools.

## Recommended annotation/input policy

When annotation is added, use context-sensitive input behavior:

### View / Annotate / Presentation

- Pen or Apple Pencil + Pen tool: draw.
- Pen or Apple Pencil + Eraser: erase.
- Pen or Apple Pencil + Select/Lasso: select annotations.
- One finger: pan/scroll the document without changing the active ink tool.
- Two fingers: pinch zoom/pan without changing the active ink tool.
- Stylus may tap **visible** app controls such as toolbar buttons and checkboxes.
- Stylus hover should not reveal hidden Presentation controls.
- A finger tap at the top remains the primary touch method for revealing hidden Presentation controls.

### Pages organizer

There is no ink surface here, so pen/stylus may continue to behave like a mouse/touch pointer for selecting pages, checking boxes, and dragging/reordering pages.

### Settings to add with annotation

- **Draw with Finger** — Off by default. Turning it on allows finger drawing when an ink tool is active.
- Finger navigation should remain enabled while Pen/Eraser/Select is active.
- A separate permanent “pen reveals Presentation toolbar” setting is not recommended initially; keeping stylus hover from revealing hidden chrome gives more predictable handwriting behavior.
- If a Hand/Pan tool is later added, stylus panning can be allowed when that tool is explicitly selected.

## Toolbar size on iPad

The normal top toolbar currently uses the compact/icon-only state on iPad-sized layouts. Testing indicates this is acceptable. It is therefore not treated as a bug in this milestone. Touch targets remain stable rather than progressively shrinking.

## Preserved 2.1.1 fixes

- Split → Single → Split preserves the inactive pane's page/zoom/scroll/view state.
- Same PDF may appear independently in both panes.
- Pinch zoom uses measured before/after geometry and post-layout anchor correction.
- Page Snap is disabled while a pinch is active so snapping does not fight the gesture.
- Full Page and Single-layout controls use distinct icons.
- Hidden Presentation controls reject finger tap-through.

## Important scan-PDF support

Do not remove the PDF.js WASM/JBIG2 configuration. The test file `BaakeScan.pdf` contains many JBIG2-compressed scan pages; these require the configured decoder/resource paths.

## Version verification

**More → About this build** must report **Milestone 2.1.2**. The service-worker cache is `pdf-workbench-m2.1.2-v1`.

Every distributed ZIP now includes `PDF_Workbench_Project_Handoff.txt`. It should be updated with every release so development can resume even after a long gap between revisions.

## Suggested 2.1.2 test sequence

1. On iPad, zoom a page to 300–400%.
2. Pan all the way right and verify the right page edge is reachable.
3. Pan all the way left and verify the left page edge is now reachable.
4. Repeat in both panes of Split view.
5. Verify a page that fits the viewport is still centered.
6. Enter Presentation mode and allow the toolbar to hide.
7. On Surface, hover the pen near the top. The toolbar should remain hidden.
8. Tap near the top with the pen while the toolbar is hidden. No hidden control should activate.
9. Reveal the toolbar with a finger tap; the first tap should reveal only.
10. With the toolbar visible, verify the pen can tap a visible control.
11. On desktop, verify mouse hover near the top still reveals the Presentation toolbar.
12. Re-test Split → Single → Split inactive-pane scroll restoration.
13. Re-test pinch anchoring over a recognizable word/equation.
14. Open `BaakeScan.pdf` and verify scan pages remain visible.
15. Open About and verify **Milestone 2.1.2**.

## New document/page features queued after viewer stabilization

Page insertion after the current page should include:

- duplicate current page with annotations;
- duplicate current page without annotations;
- blank page matching current size/orientation;
- light graph paper matching current size/orientation, approximately 1/4-inch squares.

The same insert choices can be exposed in Presentation, normal View, and Pages/organizer contexts. A new document should also be creatable as a single blank or graph-paper page so the application can serve as a notes program once inking is available.

## Still intentionally deferred

- PDF export/rebuild.
- Explicit merge/combine and split output.
- Page-size/orientation normalization and crop.
- Target-size compression.
- Saved/Recent Projects.
- Pen/highlighter/eraser annotation, palm rejection, spline/pressure ink, and annotation selection/editing.
- Blank/graph-paper page insertion described above.

## Running locally

A service worker requires HTTP/HTTPS rather than `file://`. From the app directory:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.
