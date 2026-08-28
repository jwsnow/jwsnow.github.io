# PDF Workbench — Milestone 2.0.0

Milestone 2 establishes the multi-document viewer architecture before annotation is added.

## Included now

- Cross-platform PWA shell for Windows, iPad/iPadOS, Surface-style devices, and Chromebooks.
- Local opening of PDFs and images as separate documents.
- PDF.js 6.2.108 rendering with WASM/JBIG2, CMap, and standard-font resources configured.
- Non-destructive page organizer with thumbnails, range/additive selection, rotation, duplication, deletion, animated drag reordering, and per-document undo/redo.
- Single-document viewer with Continuous, Page Snap, and Full Page modes.
- Fit Width / Fit Page, 25%–400% zoom, Ctrl+wheel desktop zoom, and iPad pinch-to-PDF zoom.
- Per-document zoom and fit state in single view.
- Presentation mode with temporary controls; iPad uses app-level presentation rather than native Fullscreen API.

## New in Milestone 2.0.0

### Side-by-side viewer

- Toggle **Split** from the viewer toolbar to show two document panes.
- Each pane has its own compact document selector.
- Either pane can show any currently open document (including the same document in both panes).
- Click/tap a pane to make it active. The active pane has an accent outline.
- The main scroll/fit/zoom controls act on the active pane.
- Each pane maintains independent:
  - document choice
  - zoom
  - fit mode
  - scroll mode
  - active page
  - scroll position
- Each pane supports Continuous, Page Snap, and Full Page viewing.
- Full Page mode has its own previous/next controls in each pane.
- Mouse/trackpad scrolling, Ctrl+wheel zoom, touch scrolling, pinch zoom, and Full Page swipe navigation work independently in each pane.
- Switching back to Single view uses the document in the currently active split pane.

### Split presentation mode

- Presentation mode can display the side-by-side layout.
- Pane header bars disappear in Presentation mode to preserve screen space.
- The active pane remains indicated subtly.
- The temporary presentation toolbar gains **L / R** controls in split view.
- Choose L or R, then use the document selector, scrolling-mode, fit, and zoom controls on that pane.

### Manual PWA update

**More (⋯) → About this build → Reload latest version** provides a manual recovery path for an installed PWA that is still showing an older cached build.

The command:

1. asks the service-worker registration to check for an update,
2. activates a waiting worker when present,
3. clears only PDF Workbench Cache Storage entries (not future IndexedDB/OPFS project data), and
4. reloads the app from a cache-busted network URL.

The About dialog always reports the current `APP_VERSION`. This build should show **Milestone 2.0.0**.

## Important document behavior

**Open** means open another document. It does not merge documents. Combining PDFs will be an explicit operation in a later milestone.

When Split view is active, the document in the currently active pane is the one that opens in **Pages** mode for organizing.

## Intentionally not included yet

- PDF export/rebuild.
- Explicit merge/combine output.
- Split-every-n-pages output.
- Page-size/orientation normalization and crop.
- Target-size compression.
- Saved/recent projects.
- Pen/highlighter/eraser annotation.
- Palm rejection and spline/pressure ink.
- Annotation selection, move/cut/copy/paste/duplicate/recolor.
- Linked scrolling between split panes (possible later; independent navigation is the default).

## PDF.js dependency

This checkpoint pins PDF.js 6.2.108 at jsDelivr because the build environment used to assemble the prototype could not vendor the npm package. The service worker caches fetched resources when possible.

Before final deployment, PDF.js and its WASM/CMap/font resources should be vendored into the app so first-run/offline behavior has no third-party dependency.

## Running locally

A service worker requires HTTP/HTTPS rather than `file://`.

From this directory, for example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Suggested Milestone 2 test sequence

1. Open PDF A and PDF B.
2. Verify each still appears as a separate document.
3. Set different zoom levels in Single view and verify they are preserved when switching documents.
4. Click **Split**.
5. Put A on the left and B on the right.
6. Scroll the left pane without moving the right pane.
7. Zoom the right pane without changing the left pane.
8. Change the left pane to Page Snap and the right pane to Continuous.
9. Change one pane to Full Page and use that pane's page controls.
10. Switch the document in just one pane.
11. Tap/click the other pane and verify the top controls now reflect that pane's zoom/mode.
12. Enter Presentation mode in split view.
13. Let the toolbar hide, reveal it, switch L/R, and adjust each pane independently.
14. Exit Presentation mode and return to Single view; verify the active pane's document becomes the single document.
15. Open **About this build** and verify **Milestone 2.0.0**.
16. If testing an installed PWA, try **Reload latest version** only when an updated hosted build is actually available.
