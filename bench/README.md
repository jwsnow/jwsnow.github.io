# PDF Workbench — Milestone 3.1.0

Milestone 3.1.0 builds on the successfully tested 3.0.0 export engine. The stable viewer/input foundation from Milestone 2 remains intentionally unchanged.

## Files workspace

The former **Export** tab is now labeled **Files**, beginning the transition toward the planned document/library workspace. It currently contains document-level output/manipulation tools; persistent storage, folders, and Close/Reopen come later.

### Export current document

Exports the current organized document and preserves:

- current page order;
- deleted and duplicated pages;
- quarter-turn page rotations;
- mixed page sizes/orientations;
- original PDF page contents without rasterizing PDF source pages.

### Extract selected pages

Select pages in **Pages**, open **Files**, and save those selected pages as a new PDF. Selected pages are exported in their current Pages order.

### Split current document

Two split methods are available:

1. **Split every n pages** — for example, every 10 pages.
2. **Split by page groups** — enter one output group per line. Within a line, commas may combine individual pages and ranges, e.g. `1-4,8,11-13`.

If a split produces multiple PDFs, they are packaged into a single ZIP. This is especially important on iPad so one split operation does not open a separate PDF preview for every part. PDFs inside the ZIP are stored without additional ZIP compression because PDF contents are generally already compressed and recompression wastes memory/time.

### Combine open documents

The Files workspace lists open documents with checkboxes and up/down ordering controls. Choose at least two and select **Create combined document**. PDF Workbench creates a new working document containing copies of the selected documents' current page arrangements, in the chosen document order. The original documents remain separate and unchanged.

Combining creates an in-app working document; use Export when an external PDF is wanted.

## Small workflow improvements

- Tapping/clicking empty space in **Pages** clears the current page selection.
- Opening/importing files automatically returns to **View**.
- The top workspace selector is now **View | Pages | Files**.

## Still planned

- Insert duplicate page with/without annotations.
- Insert blank and graph-paper pages matching current page size/orientation.
- Create new blank/graph-paper documents.
- Page-size normalization, fit/crop/margins.
- Multi-image PDF assembly.
- Compression/target size.
- Close/reopen documents and persistent internal storage.
- GoodNotes-like Library/folders/search/sort/Recent.
- Ink/annotations.

`graph-paper-reference.png` is included in this distribution as the user's visual reference for the future graph-paper page style: very light cyan square grid, thin lines, modest margin, and an unobtrusive writing-friendly appearance.

## Version

**More → About this build** must report **Milestone 3.1.0**. The service-worker cache is `pdf-workbench-m3.1.0-v1`.

## Suggested 3.1.0 tests

1. **Export regression:** repeat a known-good export and verify it still opens correctly.
2. **Extract:** select nonconsecutive pages, extract them, and verify order/rotation/page size.
3. **Split every n:** split a 20+ page PDF into several parts; verify the ZIP and every part.
4. **Split page groups:** try groups such as `1-3`, `4-5,8`, and `9-12`; verify each output PDF.
5. **Combine:** open several PDFs with different sizes/orientations, reorder the document list, create a combined working document, then export it.
6. **Edited combine:** rotate/reorder/delete pages in one source document before combining and verify the combined document uses that edited working arrangement.
7. **Pages deselection:** select several pages and tap/click empty space beside/below thumbnails.
8. **Open workflow:** while in Pages or Files, open another file and verify the app returns to View.
9. Smoke-test iPad, Surface, and Chromebook finger/pen behavior, split view, Presentation, and JBIG2 rendering for regressions.
