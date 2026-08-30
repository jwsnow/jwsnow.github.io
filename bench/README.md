# PDF Workbench — Milestone 3.2.0

Milestone 3.2.0 adds page/document creation on top of the validated Milestone 3.1 Files engine. The viewer, split-pane state, touch/pen input model, Presentation behavior, and JBIG2/WASM configuration are intentionally preserved.

## New document creation

A new **New** button is available in the top application bar even when no files are open. It offers:

- **Blank document** — starts a new one-page US Letter portrait document.
- **Graph-paper document** — starts a new one-page US Letter portrait document with generated graph paper.

These are real editable working documents in PDF Workbench and can be organized, combined, split, or exported like imported PDFs.

## Insert page after current

The same shared Insert menu is available from three places:

- **Pages** toolbar: **Insert**.
- Regular **View** toolbar: **+ Page**.
- **Presentation** temporary toolbar: compact **+** icon.

The menu offers:

1. **Duplicate with annotations**.
2. **Duplicate without annotations**.
3. **Blank page** matching the current page's displayed size and orientation.
4. **Graph-paper page** matching the current page's displayed size and orientation.

Annotations are not implemented yet, so the two duplicate choices currently look identical. They are separate commands now so their behavior can diverge cleanly when inking is added.

In Pages, the insertion anchor is the most recently selected page when that page is still selected; otherwise the current View page is used. In View/Presentation, insertion follows the current page. In split view it affects the active pane's document and current page. The newly inserted page becomes current, which is useful for immediately writing on a newly inserted blank/grid page later.

## Graph paper

Graph paper is generated rather than rasterized:

- 1/4-inch (18 point) square spacing.
- white background.
- very light cyan/blue thin lines.
- small clean margin.
- vector grid lines in exported PDFs.

The supplied `graph-paper-reference.png` remains in the distribution as the visual reference.

## Existing Files operations preserved

- Export current organized document.
- Extract selected pages from Pages or Files.
- Split every n pages.
- Split by explicit page groups; typed groups are reflected in filenames.
- Multiple split outputs are packaged into one ZIP.
- Combine two or more open documents into a new editable working document.

Generated blank/graph pages participate in all of these operations.

## Still planned

- Page-size normalization, fit/crop/margins.
- Multi-image PDF assembly improvements.
- Compression/target size.
- Close/reopen documents and persistent internal storage.
- GoodNotes-like Library/folders/search/sort/Recent.
- Ink/annotations.
- When ink arrives, test whether Full Page bottom navigation arrows need auto-hide/palm-safe behavior.

## Version

**More → About this build** must report **Milestone 3.2.0**. The service-worker cache is `pdf-workbench-m3.2.0-v1`.

## Suggested 3.2.0 tests

1. Create a new blank document with no files open; export it and verify one Letter-sized blank page.
2. Create a new graph-paper document; inspect the grid on iPad/Surface/Chromebook and export/open it in Adobe.
3. In View, insert blank and graph pages after portrait, landscape, rotated, and unusual-sized source pages. Verify size/orientation.
4. In Pages, select a page and use **Insert**; verify insertion occurs after the intended page and the new page is selected.
5. In Presentation, reveal the toolbar and insert blank/graph pages; verify the inserted page becomes current and the toolbar still hides normally afterward.
6. In split View/Presentation, insert into left and right panes separately. If the same PDF is shown in both panes, verify the document update is shared while each pane's view remains independent.
7. Duplicate a PDF page using both duplicate choices and export. Until ink exists, both exported copies should match the source page.
8. Rotate a generated graph page, reorder/delete/duplicate it, then export.
9. Combine a generated document with an imported PDF, then export the combined result.
10. Split a document containing generated pages and verify the PDF/ZIP outputs.
11. Regression smoke-test finger pan/pinch, pen non-navigation on document content, visible pen UI activation, Presentation hidden-toolbar behavior, split/single restoration, and BaakeScan/JBIG2 rendering.
