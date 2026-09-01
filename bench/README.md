# PDF Workbench — Milestone 5.0.3

Milestone 5.0.3 is the first annotation/inking build plus the Presentation-toolbar positioning fix, the PDF ink-export join/cap fix, and an iPad/Apple Pencil toolbar-routing guard. It starts from the cross-platform-tested Milestone 4.2.2 viewer, Library, export, backup, and UI baseline and deliberately adds only the smallest useful annotation slice so stylus behavior can be validated before eraser, lasso, and highlighter work begins.




## 5.0.3 iPad / Apple Pencil stray-toolbar fix
- During iPad testing, Apple Pencil inking quality was good and same-document split-pane synchronization worked, but every few characters a document stroke could be skipped while an annotation-toolbar control was activated instead, most often **Hand**. The problem occurred even when writing far below the toolbar and with no palm contact.
- This build treats that as an input-routing/compatibility-click defect rather than palm rejection.
- Pointer-driven toolbar actions are now authenticated: a toolbar button/select click must be preceded by a real pointer down/up sequence on that same visible control, with coordinates inside both the toolbar and the control and a matching hit test.
- A click aimed at the toolbar shortly after Apple Pencil activity on the document is ignored unless that physical toolbar interaction was verified. This is designed to reject WebKit/iPad stray or stale compatibility clicks without preventing intentional Pencil taps on toolbar controls.
- Keyboard/accessibility activation remains allowed, and ordinary mouse/touch toolbar interaction is unchanged when it has a normal physical pointer sequence.
- The stored ink model, point sampling, rendering, PDF export, split-pane synchronization, and finger pan/pinch code are otherwise unchanged in 5.0.3.

## 5.0.2 PDF ink export fix
- Fixed the white wedges/slits that could appear on the inside of wider curved pen strokes in exported PDFs.
- Cause: each sampled point pair was exported as an independent PDF line segment. The separate flat-ended segments did not form a true joined path at turns.
- Export now writes each stored pen stroke as one continuous vector path with **round joins and round end caps**, matching the completed-stroke Canvas renderer much more closely.
- Stored annotation points, on-screen drawing, Undo/Redo, Library persistence, and editable backup data are unchanged. This is deliberately **not** the later interpolation/smoothing pass.
- Keeping each exported stroke continuous also avoids the joint-overlap darkening that would result from simply putting a round cap on every independent segment; that matters for future translucent tools such as Highlighter.

## 5.0.1 Presentation toolbar fix
- Fixed a regression in Presentation mode where the new full-width annotation toolbar was translated left by 50%, leaving roughly half of the bar off-screen.
- Cause: a legacy rule for the older centered floating Presentation palette (`translateX(-50%)`) was still winning the CSS cascade after the toolbar was converted to an edge-docked full-width strip.
- The unified Presentation annotation toolbar now explicitly uses `transform: none` and remains docked to the full viewport width.
- No annotation data, PDF export, Library, backup, or view-state behavior was intentionally changed in this bug-fix build.

## Unified annotation toolbar
- View now has a thin, full-width annotation strip immediately above the PDF viewport.
- Presentation uses the **same strip at the very top edge**; its existing document/view/page controls are appended to the right rather than appearing in a separate floating palette.
- The annotation controls keep the same left-to-right positions in View and Presentation.
- For this first annotation build the Presentation strip stays **always visible** so tool/color/width changes are one tap away. A later setting will offer always-visible vs. auto-hide after the core ink interactions are proven.
- The document viewport is reduced by the toolbar height; the strip does not cover the PDF.

## Basic pen
- **Hand/View** mode preserves the previous safe behavior: stylus contact on the document does not draw. Finger navigation continues to pan/scroll/pinch as before.
- **Pen** mode draws with Surface Pen / Apple Pencil style pointer input. Primary-button mouse drawing is also supported for desktop testing.
- Five direct pen colors, in order: **black, blue, red, green, orange**.
- Three direct pen widths: **thin, medium, thick** (1.5 pt, 3 pt, 5.5 pt).
- Choosing a color or width also selects Pen, so common changes require one tap.
- Pen tool, color, and width are remembered locally across navigation/relaunches.
- Coalesced pointer samples are used when the browser provides them.
- Finger drawing is intentionally **off**; touch remains navigation-only.

## Editable ink model
- Ink is stored non-destructively as page-local vector stroke data in Workbench page/PDF coordinates, not as screen pixels.
- Zooming, fitting, View/Presentation changes, page rotation, and split-pane viewing do not change the stored stroke coordinates.
- Same-document split panes share the annotation data; a live stroke is mirrored to another rendered instance of the same page.
- Ink is included in Local Library persistence and editable `.pwbbackup.zip` backups.
- Ink participates in the existing Undo/Redo history.
- Page duplication/copy/combine operations carry ink. **Duplicate clean** now omits Workbench ink as its label implies.
- Page-size fit/center and crop/margin operations apply corresponding basic transforms to Workbench ink so existing strokes remain attached to the page when those operations are used after writing.

## PDF export
- Workbench pen strokes are written into exported PDFs as vector linework rather than rasterizing the page.
- A source PDF with no Workbench ink remains eligible for the exact-byte untouched export path introduced in 4.2.1.
- Once ink is present, the structural export path is used and the annotations are added to the copied/generated/image page.
- The 4.2.1 batched source-page copying/resource-sharing fix remains intact.

## Not in this build yet
- Partial-stroke eraser (required next; whole-stroke-only is not the final design)
- Lasso/select, move, resize, delete, duplicate
- Highlighter and its separate yellow/pink/blue/green palette/widths
- Recolor selected strokes
- Annotation-toolbar auto-hide/edge-placement setting
- Draw with Finger setting
- Pressure-sensitive width
- Images as annotation objects

## Storage/versioning
- IndexedDB database version: **2**
- Library schema version: **5** (page records can now contain Workbench annotation stroke data)
- Editable backup format version: **1**
- Service-worker cache: `pdf-workbench-m5.0.3-v1`

## High-priority smoke tests
1. On Surface, open a PDF, choose Pen, write at several zoom levels, switch colors and widths, then use Undo/Redo.
2. Repeat with Apple Pencil on iPad. Confirm one finger still pans and two fingers still pinch without creating ink.
3. Switch between View and Presentation. Confirm the annotation controls stay in the same order and Presentation's full-width bar remains at the top without covering the page.
4. In split view, show the same document in both panes at different pages/zoom positions. Write in one pane; verify view states remain independent and shared ink appears correctly when the same annotated page is visible.
5. Close/reopen the document and relaunch the app to confirm ink persistence.
6. Back up on one device and restore on another; confirm ink survives the editable backup.
7. Export an annotated PDF and inspect it in Adobe Acrobat or another viewer. Check placement, color, width, rotation, and file size.
8. Re-test the previously problematic slide deck unchanged; it should still export byte-for-byte. Add a short pen stroke and export again; the file should remain reasonably sized.
9. In Pages, use Duplicate + notes and Duplicate clean and confirm the first carries ink and the second does not.
10. Rotate an annotated page and, separately, try Page size and Crop/margins after ink to verify stroke alignment remains sensible.

**More → About this build** reports **Milestone 5.0.3**.
