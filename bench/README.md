# PDF Workbench — Milestone 5.0.6

Milestone 5.0.6 is the first annotation/inking build plus the Presentation-toolbar positioning fix, the PDF ink-export join/cap fix, and a broader iPad/Apple Pencil native-selection guard. It starts from the cross-platform-tested Milestone 4.2.2 viewer, Library, export, backup, and UI baseline and deliberately adds only the smallest useful annotation slice so stylus behavior can be validated before eraser, lasso, and highlighter work begins.

## 5.0.6 iPad / Apple Pencil Pen-mode selection suppression
- Follow-up testing of 5.0.4 showed that after toolbar text was made non-selectable, iPadOS occasionally selected **footer text** instead while Apple Pencil was writing. This confirms that the problem is not a particular toolbar glyph; WebKit can leak a Pencil interaction into native text selection and retarget the selection to another selectable region.
- While **Pen** is active in the document viewer, PDF Workbench now suppresses native `selectstart`, selection ranges, context-menu/touch-callout behavior, and user selection across the viewer plus adjacent app chrome (top bar, annotation bar, and status/footer bar).
- The guard is tied to **Pen + viewer mode**, not permanently to the whole app. In **Hand/View** mode the document-wide JavaScript selection guard is off so deliberate text-selection behavior can be supported there later.
- Intentional toolbar taps still use normal button behavior; finger pan/pinch, stored ink points, coalesced-event sampling, Canvas rendering, PDF export, and split-pane annotation synchronization are unchanged.
- This supersedes the narrower 5.0.4 toolbar-only guard.

## 5.0.4 iPad / Apple Pencil native toolbar-selection fix
- Clarification from iPad testing: the Hand tool was **not being activated**. Instead, while writing on the page, iPadOS would occasionally **select the visible Hand glyph as text** and show the native **Copy / Look Up / …** selection callout. The current Pencil stroke was skipped/cancelled at the same time.
- This can happen even with the writing area far below the toolbar and with or without palm contact, so it is not ordinary palm rejection and not an intentional toolbar tap.
- The annotation toolbar and all of its descendants are now explicitly non-selectable with both standard and WebKit CSS, and the iOS touch callout is disabled for that app-chrome region.
- A defensive `selectstart`/`contextmenu` guard prevents the browser from opening native selection/callout UI on the annotation toolbar, and any selection that WebKit nevertheless anchors inside the toolbar is immediately cleared.
- The 5.0.3 compatibility-click authentication experiment has been removed because the user's clarification showed that a tool-switch click was not the observed failure mode. Normal Hand/Pen/color/width taps therefore use the ordinary control event path again.
- Stored ink points, coalesced-event sampling, stroke geometry, Canvas rendering, PDF export, split-pane synchronization, and finger pan/pinch are unchanged in 5.0.4.

## 5.0.3 diagnostic note
- 5.0.3 attempted to guard against stray compatibility clicks because the initial symptom was described as the Hand icon being selected. Further testing clarified that “selected” meant **native text selection with Copy / Look Up**, not activation of the Hand tool. 5.0.4 supersedes that diagnosis and removes the unnecessary click-authentication layer.

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
- Service-worker cache: `pdf-workbench-m5.0.6-v1`

## High-priority smoke tests
1. On Surface, open a PDF, choose Pen, write at several zoom levels, switch colors and widths, then use Undo/Redo.
2. Repeat with Apple Pencil on iPad for several lines of handwriting. Confirm the native **Copy / Look Up / …** selection callout never appears on toolbar, footer/status text, or page/PDF text; confirm one finger still pans and two fingers still pinch without creating ink.
3. Switch between View and Presentation. Confirm the annotation controls stay in the same order and Presentation's full-width bar remains at the top without covering the page.
4. In split view, show the same document in both panes at different pages/zoom positions. Write in one pane; verify view states remain independent and shared ink appears correctly when the same annotated page is visible.
5. Close/reopen the document and relaunch the app to confirm ink persistence.
6. Back up on one device and restore on another; confirm ink survives the editable backup.
7. Export an annotated PDF and inspect it in Adobe Acrobat or another viewer. Check placement, color, width, rotation, and file size.
8. Re-test the previously problematic slide deck unchanged; it should still export byte-for-byte. Add a short pen stroke and export again; the file should remain reasonably sized.
9. In Pages, use Duplicate + notes and Duplicate clean and confirm the first carries ink and the second does not.
10. Rotate an annotated page and, separately, try Page size and Crop/margins after ink to verify stroke alignment remains sensible.

**More → About this build** reports **Milestone 5.0.6**.
