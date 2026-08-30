# PDF Workbench — Milestone 3.3.0

Milestone 3.3.0 reorganizes the **Files** workspace and adds multi-document export while preserving the existing structural PDF engine, page insertion model, viewer, split-pane state, touch/pen input behavior, Presentation behavior, and PDF.js JBIG2/WASM configuration.

## Files workspace

Files now has one persistent **Open documents** list with checkboxes. Those checkboxes are shared by the multi-document operations:

- **Export** uses the checked documents.
- **Combine** uses the same checked documents, but shows its own separate ordered list with up/down controls. Reordering for Combine does not rearrange the general open-document list.
- **Extract** operates on selected pages in the active document.
- **Split** operates on the active document.

The operations themselves are expandable/collapsible **New / Export / Extract / Split / Combine** sections so the Files workspace does not become one long crowded control panel.

The Open documents list also shows which document is active and allows another document to be made active without changing the checkbox selection.

Files remains usable even when no documents are open, so New is always reachable.

## New documents

**New** has moved from the permanent top application bar into Files.

- Blank document: one US Letter **landscape** page.
- Graph-paper document: one US Letter **landscape** graph-paper page.

Inserted blank/graph pages in an existing document still match the current page's displayed size and orientation.

## Export one or several documents

- Exactly one checked document → export a PDF.
- Two or more checked documents → build each document as a PDF and package them together in one ZIP.
- Each document is exported from its current working page arrangement, including reorder/delete/duplicate/rotation/generated pages.
- PDFs inside a multi-document ZIP use the document name plus `-edited.pdf`; duplicate names are made unique automatically.
- ZIP creation uses STORE rather than trying to recompress already-compressed PDFs, which reduces unnecessary work on iPad.

## Combine

Combine uses the shared checked-document selection, then shows only those documents in an independent order list. Up/down controls set merge order. The general Open documents list remains unchanged. Combine still creates a new editable working document and leaves originals untouched.

## Presentation insert control

The Presentation Insert Page control is no longer another `+` immediately beside zoom `+`. It now uses a page-shaped `▱` icon and sits before the zoom cluster with extra separation. The underlying Insert menu is unchanged.

## Existing page creation behavior preserved

Insert Page remains available from:

- Pages toolbar: **Insert**
- regular View toolbar: **+ Page**
- Presentation temporary toolbar: page icon

Choices remain duplicate with annotations, duplicate without annotations, blank page, and graph-paper page. Until annotations exist, the two duplicate choices have the same visible result.

Graph paper remains generated as light cyan vector lines at 18-point (1/4-inch) spacing with a small margin. `graph-paper-reference.png` remains bundled as the visual reference.

## Version

**More → About this build** must report **Milestone 3.3.0**. The service-worker cache is `pdf-workbench-m3.3.0-v1`.

## Suggested 3.3.0 tests

1. Enter Files with no documents open; expand New and create blank and graph-paper documents. Verify both start landscape.
2. Open three PDFs. In Files, check only one and export; verify a PDF is produced.
3. Check two or three documents and export; verify one ZIP is produced and contains a separate correct PDF for each checked document.
4. Edit/reorder/rotate pages in two documents before multi-export; verify each PDF in the ZIP reflects its own working state.
5. Check three documents, expand Combine, rearrange their order, create the combined document, and verify the general Open documents list was not itself reordered.
6. Make a different document active from Files, then verify Split applies to that active document and Extract uses that document's selected Pages.
7. Verify Select all and Clear affect the shared Files checkboxes correctly.
8. In Presentation, verify the page-insert icon is visually distinct from zoom `+`, opens the same Insert menu, and does not regress hidden-toolbar pen behavior.
9. Regression-test finger pan/pinch, pen non-navigation on document content, pen activation of visible controls, split/single restoration, Pages dragging, and BaakeScan/JBIG2 rendering.
