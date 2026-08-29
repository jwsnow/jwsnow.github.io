# PDF Workbench — Milestone 2.1.0

Milestone 2.1 stabilizes viewer state across Single/Split layouts and fixes the touch/presentation issues found on Windows, Surface, Chromebook, and iPad testing.

## Included

- Local opening of PDFs and images as separate documents.
- PDF.js 6.2.108 rendering with WASM/JBIG2, CMap, and standard-font resources configured.
- Non-destructive page organizer with thumbnails, range/additive checkbox selection, rotation, duplication, deletion, animated drag reordering, and per-document undo/redo.
- Continuous, Page Snap, and Full Page viewing.
- Fit Width / Fit Page, 25%–400% zoom, desktop Ctrl+wheel zoom, and touch pinch-to-PDF zoom.
- Side-by-side viewing; either pane can show any open PDF, including the same PDF in both panes.
- Presentation mode with temporary compact controls. iPad uses app-level presentation rather than Safari native fullscreen.
- Manual PWA refresh through **More → About this build → Reload latest version**.

## New/fixed in 2.1.0

### Independent view-instance state

Document content and viewer state are now deliberately separate.

- Left and right panes keep independent document, page, zoom, fit mode, scroll mode, and scroll position.
- The same PDF may be shown on both sides at different pages and zooms without one pane affecting the other.
- Single view keeps per-document view state separately from either split pane.

### Single ↔ Split state transfer

Changing layout is treated as a layout change, not as opening a new viewing session.

- Split → Single uses the active pane.
- Single → Split returns the Single view to the pane from which it came.
- The inactive pane is preserved exactly as an independent view.
- The point/page near the center of the source view is transferred semantically rather than copying a raw `scrollTop`, because the viewport width changes between Single and Split.
- Switching layouts should therefore no longer jump to a different page or cause both panes to become the same active-pane document.

### Presentation layout switching

The temporary Presentation toolbar now includes a Single/Split toggle. Switching layout does not leave Presentation mode.

### Anchored pinch zoom

Pinch zoom now records the PDF point underneath the midpoint of the two fingers. As zoom changes, scroll offsets are corrected so that the same PDF location remains under the moving pinch midpoint. This is implemented independently for Single, Left, and Right viewer instances.

### Presentation toolbar fixes

- A reveal tap is suppressed from subsequently activating a control that was hidden when the gesture began.
- Toolbar use always restarts the auto-hide timer; hover/focus no longer pins the toolbar open indefinitely.
- Presentation buttons use fixed 44×44 CSS-pixel touch targets and do not shrink when Chromebook/Surface/iPad orientation changes. On very narrow displays the toolbar can scroll horizontally rather than making controls too small.
- Fit Width and Fit Page now use visibly different icons.

### Reload behavior

Single/Split layout itself is no longer restored from `localStorage`. Until Recent Projects is implemented, reloads should not resurrect partial pane/document state. Intentional general preferences such as the preferred scrolling and fit modes may still persist.

## Important scan-PDF support

Do not remove the PDF.js WASM configuration. The test file `BaakeScan.pdf` contains many JBIG2-compressed scan pages; they rendered blank until the PDF.js WASM/JBIG2 resource path was supplied.

## Version verification

**More → About this build** must report **Milestone 2.1.0**. The visible About version and service-worker cache version are updated together for every release.

## Suggested 2.1 test sequence

1. Open two PDFs; put one in each split pane.
2. Give each pane a different page, zoom, fit mode, and scroll mode.
3. Activate the right pane → Single → Split. Confirm the right state returns to the right and the left remains unchanged.
4. Repeat starting from the left pane.
5. Put the **same PDF** in both panes at widely separated pages/zooms. Confirm the panes remain independent through Single ↔ Split transitions.
6. Pinch over a recognizable word/equation on Surface, Chromebook, and iPad. The point under the finger midpoint should stay put while zooming.
7. Enter Presentation mode and toggle Single/Split from the temporary toolbar without leaving Presentation.
8. Let the Presentation toolbar hide, then tap directly where a hidden button would be. The first tap should reveal controls only; it must not activate that button.
9. Press toolbar controls and wait. The toolbar should auto-hide again.
10. Rotate Chromebook/iPad/Surface. Presentation buttons should remain practical touch size rather than shrinking.
11. Confirm Fit Width and Fit Page have distinct icons.
12. Reload. The app should start in Single layout rather than partially restoring an old split session.
13. Open About and verify **Milestone 2.1.0**.

## Still intentionally deferred

- PDF export/rebuild.
- Explicit merge/combine and split-every-n output.
- Page-size/orientation normalization and crop.
- Target-size compression.
- Saved/Recent Projects.
- Pen/highlighter/eraser annotation, palm rejection, spline/pressure ink, and annotation selection/editing.

## PDF.js dependency

This prototype still pins PDF.js 6.2.108 at jsDelivr. Before final deployment, its JS/WASM/CMap/font resources should be vendored into the PWA so first-run/offline behavior has no third-party dependency.

## Running locally

A service worker requires HTTP/HTTPS rather than `file://`. From the app directory:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.
