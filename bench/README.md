# PDF Workbench — Milestone 3.4.0

Milestone 3.4.0 adds **reusable session page templates** and improves the top toolbar at narrow desktop widths. It preserves the validated Files/output engine, page organizer, split-view state, Presentation behavior, touch/pen input separation, and PDF.js JBIG2/WASM configuration.

## Session page templates

A page can now be saved as a reusable template from the shared **Insert Page** menu in Pages, regular View, or Presentation.

- In View/Presentation, the current page is saved.
- In Pages, the most recently selected/selection-anchor page is saved.
- The save prompt is prefilled with a frictionless generic name such as **Template 1**, **Template 2**, etc. The suggested name can simply be accepted for a temporary template.
- Saved templates appear in **Insert Page → Session templates** and can be inserted repeatedly into the active document.
- Template insertion creates a fresh independent page instance preserving the captured page content, page size, orientation/rotation, and source page.
- **Manage templates…** allows rename and delete.
- Templates are intentionally **session-only in 3.4.0**. They remain available after **Close all files** during the same run, but disappear when the app is reloaded/restarted. Persistent templates will be implemented with the later persistent Files/Library storage system.
- Because annotations are not implemented yet, templates currently capture page/background content only. The template data model is intended to gain explicit include/exclude-annotations behavior when ink arrives.

Template source handling is deliberately conservative: PDF/image source data referenced by a session template is retained in memory even if all open documents using that source are closed, and is released when no document or template still references it.

## Narrow-window toolbar

The cross-device screenshot review showed the main UI comfortable on iPad, Chromebook, and normal Surface widths, with crowding mainly in a narrow Surface window.

Responsive priority is now:

1. Preserve the primary **View / Pages / Files** workspace buttons.
2. Shrink and truncate the active-document selector first.
3. Keep the existing icon-only secondary controls at narrow widths.

The document selector can therefore become substantially narrower while the workspace tabs retain stable minimum widths. Long file names remain available when the selector is opened.

## Existing Files behavior preserved

Files retains one shared checkbox list of open documents and expandable **New / Export / Extract / Split / Combine** sections.

- One checked document → export PDF.
- Several checked documents → one ZIP containing the separate PDFs.
- Combine uses checked documents plus its own independent up/down order list.
- Split operates on the active document and packages multiple outputs in one ZIP.
- Extract operates on selected pages from the active document.
- New blank/graph-paper documents start as US Letter landscape.

## Existing insertion behavior preserved

Insert Page remains available from:

- Pages toolbar: **Insert**
- regular View toolbar: **+ Page**
- Presentation temporary toolbar: page-shaped icon

Built-in choices remain duplicate with annotations, duplicate without annotations, blank page, and graph-paper page. Graph paper remains generated as light cyan vector lines at 18-point (1/4-inch) spacing with a small margin. `graph-paper-reference.png` remains bundled as the visual reference.

## Version

**More → About this build** must report **Milestone 3.4.0**. The service-worker cache is `pdf-workbench-m3.4.0-v1`.

## Suggested 3.4.0 tests

1. Narrow the Surface browser window to the size shown in the supplied screenshots. Confirm **View / Pages / Files** remain readable and the active-document selector truncates/shrinks instead of squeezing those tabs.
2. In View, save a PDF page as a template, accept the default **Template 1** name, then insert it twice elsewhere in the document.
3. In Pages, select a different page, save it as **Template 2**, and verify the selected page—not the previously viewed page—is captured.
4. Save a rotated/landscape page as a template and confirm inserted copies preserve its geometry/orientation.
5. Save a graph-paper page as a template and insert it into another open document.
6. Use **Manage templates…** to rename and delete templates.
7. Save a PDF-backed template, choose **Close all files**, open/create another document without reloading the app, and verify the template can still be inserted correctly.
8. Reload/restart the app and confirm session templates intentionally disappear in this milestone.
9. Regression-test iPad/Surface/Chromebook finger pan/pinch, pen non-navigation on document content, pen activation of visible controls, Presentation hidden-toolbar behavior, Pages drag/reorder, Files multi-export ZIP, Combine ordering, Split ZIP, and BaakeScan/JBIG2 rendering.

## Roadmap notes

The later Files/Library milestone should make both documents/projects and templates persistent, with folders/recent/close/reopen/backup behavior. Also on the roadmap: copying selected pages between open documents, page-size normalization, fit/crop/margins, improved image-to-PDF assembly, compression, and ink/annotations.
