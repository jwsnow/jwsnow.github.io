# PDF Workbench — Milestone 1.8.1

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

## Earlier testing priorities

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

## Milestone 1.3 testing changes

This build incorporates the Windows testing feedback received after Milestone 1.2:

- Dragging does not create a second empty thumbnail slot on pointer-down; the drag ghost/placeholder starts only after a short movement threshold.
- The More (⋯) menu is positioned from the button's actual on-screen location in both View and Pages modes.
- Scan-heavy PDFs use a bounded render queue and canvas pixel caps to reduce blank-page failures under memory pressure.
- Thumbnail previews use a fixed preview well and true contain scaling so the whole page is visible.
- Shift-click selects a page range; Ctrl/Command-click toggles pages.
- Viewer has explicit − / percentage / + zoom controls. Ctrl+wheel/trackpad zoom and Ctrl+Plus/Minus/0 shortcuts are also supported.
- Presentation mode has a compact temporary toolbar. Move the mouse near the top edge (or tap near the top on touch) to reveal it; it auto-hides.


## Milestone 1.5 testing changes

This build addresses the next Windows test findings:

- Thumbnail checkboxes are true additive selection controls. Checking page 2 and then page 5 keeps both selected; Ctrl is not required.
- Shift-clicking a checkbox applies the new checked/unchecked state across the range from the selection anchor, and checkbox visuals are synchronized immediately with the selection model.
- Large scan-only PDFs now use viewport-driven canvas recycling: canvases well outside the visible region are released and pages are re-rendered when revisited.
- Stale queued viewer renders are skipped if the page has moved offscreen or the viewer has been rebuilt.
- Viewer raster size is capped more conservatively, and an apparently successful but all-white scan render is retried once at lower resolution.
- Thumbnail scan renders also get a lower-resolution retry if the first canvas is unexpectedly blank.
- After PDF page dimensions are read during opening, PDF.js document resources are cleaned before viewer rendering begins.

For scan-heavy testing, open the same document that showed blank pages in 1.3, scroll steadily through several pages, then scroll back. Pages far away should be released and should render again when revisited rather than remaining permanently blank.


## Milestone 1.5 iPad presentation change

On iPad/iPhone, Presentation mode no longer invokes Safari's native Fullscreen API. Native iOS fullscreen reserves vertical swipe gestures for leaving fullscreen, which conflicts with PDF scrolling. Presentation mode instead hides the app chrome within the page; for the cleanest classroom view, launch the PWA from the iPad Home Screen. Desktop browsers may still use native fullscreen.


## Milestone 1.7 iPad drag and update changes

- Thumbnail cards, previews, and drag handles explicitly suppress iPad text selection/touch callouts while organizing pages.
- The drag handle prevents native drag/context-menu behavior so pointer dragging remains owned by the Workbench.
- Installed PWA launches explicitly check for a newer service worker when online.
- Each release bumps the service-worker cache version; when a new worker takes control, an already-installed Workbench reloads once so the new application files are used. Reinstallation is not required.
- If the device is offline, the last cached version continues to run; the newer version is acquired on a later online launch.


## Milestone 1.7 - scan/JBIG2 rendering fix

A real-world Acrobat Paper Capture scan exposed an image-decoder configuration issue. Many scan pages in that file use JBIG2 compression. PDF.js 5+ uses WebAssembly-backed image decoders for formats including JBIG2, and custom `getDocument()` integrations must provide the PDF.js `wasmUrl`. Earlier milestones loaded only `pdf.mjs` and the worker, so JBIG2 pages could silently render as white canvases while JPEG-backed pages rendered normally.

Milestone 1.7 now supplies:

- `wasmUrl` for PDF.js image decoders (including JBIG2)
- `cMapUrl` and packed CMaps
- `standardFontDataUrl` for robust PDF/OCR text fallback
- `useWasm: true` explicitly

The service worker runtime cache will cache decoder resources after they are fetched while online. The final deployed build should vendor these PDF.js resources locally rather than relying on the CDN.


## Milestone 1.7.1

- The About dialog now reads the build version from a single `APP_VERSION` constant.
- The displayed version is Milestone 1.7.1 so an installed/cached build can be verified directly in the app.
- Future builds should bump both `APP_VERSION` and the service-worker cache name.


## Milestone 1.8.0 — presentation and iPad zoom fixes

- Presentation controls are fixed app chrome rather than part of the zoomed PDF surface.
- Tapping a hidden toolbar reveal zone is consumed; it cannot also activate a button that appears under the same finger.
- Presentation controls resume their auto-hide timer after a button is used; touch `:hover` and keyboard focus no longer pin the toolbar open.
- Native browser pinch zoom is disabled inside the PDF viewer and replaced with document zoom from 25% to 400%, so the PDF can be pinched below 100% without scaling the application controls.
- About reports Milestone 1.8.0.


## Milestone 1.8.1 — per-document viewer zoom

- Each open document now remembers its own PDF zoom level.
- Each document also remembers its own Fit Width / Fit Page choice.
- Switching documents restores that document's zoom and fit state rather than carrying the previous document's scale across.
- About reports Milestone 1.8.1 and the service-worker cache was bumped accordingly.
