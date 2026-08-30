# PDF Workbench — Milestone 3.0.0

Milestone 3.0.0 begins the PDF output/manipulation phase. The stable Milestone 2 viewer, touch/stylus behavior, split-pane state, Presentation behavior, and JBIG2/WASM rendering are intentionally preserved.

## New: Export workspace

The top workspace selector is now **View | Pages | Export**.

The first Export implementation creates a new PDF from the current working document and preserves:

- current page order;
- deleted pages;
- duplicated pages;
- quarter-turn page rotations;
- original PDF page contents without rasterizing PDF source pages.

Imported image documents can also be exported as PDFs. JPEG and PNG sources are embedded directly; other browser-decodable image formats are converted to PNG for their image page only.

The export filename defaults to `<original-name>-edited.pdf` and can be changed before export.

## Not yet in 3.0.0

- Combine/merge
- Extract selected pages
- Split output
- Blank/graph-paper insertion
- Page-size normalization, fit/crop/margins
- Multi-image PDF assembly
- Compression/target size
- Persistent document library/projects
- Ink/annotations

## Planned document behavior

- **Split** will normally create external output PDFs (or a ZIP when appropriate), rather than automatically opening every part in the workbench. A later optional “open results” choice may be useful.
- Open documents are currently session memory only. A later Library milestone will store internal working copies in IndexedDB/OPFS so documents/projects can be closed and reopened reliably, including on iPad.
- The Library roadmap includes Close, Recent, stored copies/projects, rename, folders, search/sort, Remove from Recent, and Delete Stored Copy. It is intended to be a lightweight GoodNotes-style organization layer, not a full replacement filesystem.

## Input behavior retained

- One finger pans/scrolls PDF content.
- Two fingers pinch zoom and pan.
- Pen/Pencil does not pan or zoom PDF content and is reserved for future ink.
- Pen can operate visible UI controls and the Pages organizer.
- Hidden Presentation controls are not revealed or activated by pen hover/tap.
- High-zoom horizontal panning reaches both page edges.

## Version

**More → About this build** must report **Milestone 3.0.0**. The service-worker cache is `pdf-workbench-m3.0.0-v1`.

## Suggested 3.0.0 tests

1. Reorder, rotate, duplicate, and delete pages; export and compare page order/rotation.
2. Export an unchanged PDF and verify selectable text remains selectable.
3. Export a scan-heavy PDF and verify pages render normally.
4. Export a document containing pre-rotated pages.
5. Export an imported JPEG or PNG.
6. Try a 50–100 page document and observe export progress.
7. Smoke-test View/Pages, finger pan/pinch, pen behavior, Split, and Presentation for regressions.
