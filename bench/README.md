# PDF Workbench — Milestone 1.2

This is the first functional cross-platform PDF Workbench checkpoint, with the initial organizer fixes and separate-document handling incorporated.

## Included now

- PWA shell suitable for Windows, iPad/iPadOS, Surface-style devices, and Chromebooks.
- Local opening of multiple PDFs and images as **separate open documents**.
- Compact document switcher in the top toolbar.
- Non-destructive page model inside each document.
- Three viewer modes:
  - Continuous scrolling
  - Page-snap scrolling
  - One full page at a time
- Fit Width / Fit Page.
- Compact presentation mode with a native fullscreen request where the browser permits it.
- Touch-friendly thumbnail organizer.
- Pointer-following drag ghost and visible drop placeholder.
- Multi-position/multi-row page reordering with animated grid reflow.
- Edge auto-scroll while dragging through long page lists.
- Page selection, 90-degree rotation, duplication, deletion.
- Per-document undo / redo for page operations.
- Desktop drag-and-drop file opening.
- Responsive layout for tablet and desktop widths.
- Service worker + manifest for installation/offline app-shell support.

## Important behavior change

**Open** now means open another document. Opening PDF B does not append its pages to PDF A. Each document has its own page order, selected pages, active page, and undo/redo history.

Combining documents will be an explicit operation in a later milestone.

## Intentionally not included yet

- Export/rebuild PDF.
- Explicit combine/split output operations.
- Side-by-side document viewing.
- Crop/page-size normalization.
- Target-size compression.
- Saved/recent projects.
- Pen annotation, palm rejection, spline ink, lasso selection.

## PDF.js dependency

This checkpoint pins PDF.js 6.2.108 at jsDelivr because the build environment used to assemble it could not download npm packages into the bundle. The service worker attempts to cache the pinned PDF.js module and worker after the first connected run.

Before final deployment, these files should be vendored into the application itself.

## Running locally

A service worker cannot run reliably from `file://`. Serve the directory through HTTP/HTTPS.

For example, with Python installed:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Testing priorities for 1.2

1. Open PDF A and verify its thumbnails.
2. Open PDF B and verify it appears as a separate document rather than being appended to A.
3. Switch between A and B using the document selector and verify each retains its own page order and active page.
4. Reorder a page several positions away in one drag.
5. Drag across multiple thumbnail rows.
6. Drag near the top/bottom edge of a long document and verify auto-scroll.
7. Rotate/duplicate/delete pages in A; switch to B and verify B is unchanged.
8. Switch back to A and verify its edits and undo history are still present.
9. Test Continuous, Page Snap, and Full Page viewing in both documents.
10. Test Presentation mode.
