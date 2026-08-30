# PDF Workbench — Milestone 3.7.1

Milestone 3.7.1 adds **crop and margin / expanded-canvas controls** as a Pages-only tool. It builds on the validated 3.7.0 page-size normalization while keeping View, Presentation, and Files uncluttered.

## New in 3.7.1

In **Pages**, choose **Crop / margins…**. The dialog can apply to selected pages or all pages.

Choose either:

- **Add margins / expand canvas** — adds white space without scaling the current page content.
- **Crop page edges** — moves the page boundary inward without scaling the content.

Amount presets are **¼ inch**, **½ inch**, and **1 inch** on all sides. Choose **Custom edges…** to enter independent Top, Right, Bottom, and Left values in inches. The four fields can also be edited after choosing a preset.

Top/Right/Bottom/Left always refer to the page **as currently viewed**, including pages rotated in PDF Workbench. Repeated crop/margin operations accumulate and are covered by normal Pages Undo/Redo. **Reset crop/margins** removes only those edge adjustments and leaves any Page-size normalization intact.

Changing **Page size…** establishes a new exact target canvas and therefore clears earlier crop/margin adjustments; apply Crop / margins after Page size when both are desired.

## Export behavior

For PDF source pages, crop/margins remain structural/vector operations. PDF Workbench adjusts copied page boxes rather than rasterizing the page. Existing 3.7.0 fit-and-center normalization remains vector-preserving as well. Image pages remain images; generated graph paper remains generated vector content.

Crop clips content at the new page boundary. Margins expose extra white canvas around the existing page.

## Preserved behavior

- 3.7.0 page-size/orientation normalization and export behavior.
- 3.6.x copy-selected-pages workflow.
- 3.5.x responsive toolbar and visual Insert/template chooser.
- View ↔ Presentation logical-position preservation.
- Independent split-pane state and same-document structural-edit anchoring.
- Session templates.
- Finger pan/pinch with stylus reserved for future ink on the PDF surface.
- Export, multi-document ZIP export, Extract, Split, Combine.
- Blank/graph-paper pages.
- PDF.js JBIG2/WASM rendering configuration.

## Version

**More → About this build** reports **Milestone 3.7.1**. The service-worker cache is `pdf-workbench-m3.7.1-v1`.

## Suggested tests

1. On an ordinary Letter PDF, add ½-inch margins on all four sides; export and verify the larger page size in Adobe.
2. Add a margin on only the left side, then rotate the page and verify that the margin rotates with the page.
3. Crop ¼ inch from one or more edges and verify content is clipped rather than scaled.
4. Test `04_pre_rotated_pages.pdf` so edge labels remain visual on source-rotated pages.
5. Test `15_cropbox_vs_mediabox.pdf`, export, and inspect the result in Adobe.
6. Normalize a page to Letter first, then add margins; confirm both operations survive export.
7. Test Undo/Redo and **Reset crop/margins**.
8. Copy a cropped/margined page to another document and save it as a session template.
