# PDF Workbench — Milestone 2.1.4

Milestone 2.1.4 is a focused viewer-input revision of 2.1.3. It preserves the confirmed 2.1.2 zoom/pan, split-state, Presentation-toolbar, PDF.js/JBIG2, organizer, and PWA-update fixes while changing how finger and stylus input are handled on PDF viewer surfaces.

## Why 2.1.4 was necessary

Device testing of 2.1.3 showed that canceling/capturing pen Pointer Events did **not** stop document panning: Apple Pencil on iPad and the Surface pen could still pan/scroll the PDF. The browser's native direct-manipulation behavior was still active because the viewer advertised `touch-action: pan-x pan-y`.

## Changed in 2.1.4 — explicit finger navigation

The PDF viewer now uses `touch-action: none`. This prevents Safari/Edge from interpreting either finger or pen contact as browser-owned panning/zooming. PDF Workbench then implements the intended input roles explicitly with Pointer Events:

- stylus/Pencil on document content: reserved for future Pen/Eraser/Select and currently inert;
- one finger in Continuous/Page Snap: pan/scroll;
- two fingers: anchored PDF pinch zoom and pan;
- Full Page: one-finger vertical swipe changes page;
- stylus: still operates visible UI controls;
- Pages organizer: stylus still selects and drags/reorders pages.

Continuous finger panning includes light inertial continuation. Page Snap disables snapping while the finger is down, then settles to the nearest page when the gesture ends. Two-finger pinch retains the measured document-anchor approach from 2.1.1/2.1.2 and defers the final crisp canvas rerender until the entire touch gesture ends.

## Confirmed behavior from earlier testing

- High-zoom pan/pinch works on iPad and Surface.
- Both far-left and far-right edges of an oversized zoomed page are reachable.
- Pen hover does not reveal/activate the hidden Presentation toolbar.
- Pen taps do not activate the hidden Presentation toolbar while it is hidden.
- The compact/icon-only toolbar at normal iPad widths is acceptable.
- Split → Single → Split preserves independent pane state in the revised architecture; continue regression testing it.

## Presentation behavior

- Mouse hover near the top may reveal controls.
- Finger tap near the top while hidden reveals controls and consumes that gesture.
- Pen hover does not reveal controls.
- Pen contact on hidden document content does not reveal controls.
- Pen can operate controls once they are visible.

## Important scan-PDF support

Do not remove the PDF.js WASM/JBIG2/CMap/standard-font resource configuration. It is required for scan-heavy PDFs such as the prior `BaakeScan.pdf` test file.

## Version verification

**More → About this build** must report **Milestone 2.1.4**. The service-worker cache is `pdf-workbench-m2.1.4-v1`.

Every distributed ZIP includes `PDF_Workbench_Project_Handoff.txt`; update it with every release.

## Suggested 2.1.4 test sequence

1. Drag PDF content with Apple Pencil on iPad: the page must not move.
2. Drag PDF content with Surface pen: the page must not move.
3. Scroll with one finger on iPad and Surface in Continuous mode; verify vertical and high-zoom horizontal panning.
4. Repeat one-finger scrolling independently in both Split panes.
5. Pinch with two fingers in Single and Split viewing; zoom/pan should remain anchored and stable.
6. At high zoom, verify both far-left and far-right page edges remain reachable.
7. Test Page Snap: finger drag should be free while touching, then settle to a nearby page after release.
8. Test Full Page: a vertical finger swipe should change pages.
9. Enter Presentation; pen drag must not scroll or reveal the hidden toolbar, while finger navigation must still work.
10. Reveal Presentation controls with a finger and verify visible controls still respond to pen taps.
11. In Pages view, verify pen selection and pen drag/reorder still work.
12. Reconfirm Split → Single → Split preserves the inactive pane scroll position.
13. Open `BaakeScan.pdf` and verify JBIG2 pages render normally.
14. Verify About says **2.1.4** and Reload Latest Version picks up the new app-shell cache.

## Queued page/notes features

After the current page, support:

- duplicate current page with annotations;
- duplicate current page without annotations;
- blank page matching current size/orientation;
- light 1/4-inch graph paper matching current size/orientation.

Also allow a new document to start as a single blank or graph-paper page, so the application can become a notes program once inking is available.

## Annotation input policy for later

- Draw with Finger: OFF by default.
- Finger navigation remains active while Pen/Eraser/Select is selected.
- Pen + Pen tool: draw.
- Pen + Eraser: erase.
- Pen + Select/Lasso: select annotations.
- Do not use pen hover to reveal Presentation controls.
- A future explicit Hand/Pan tool may optionally permit stylus panning.

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

Then browse to the served `pdf-workbench-m2.1.4/` directory.
