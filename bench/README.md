# PDF Workbench — Milestone 5.7.28 (DEVELOPMENT / DIAGNOSTIC BRANCH)

**Official current release remains 5.7.21 until this branch is promoted.**

## 5.7.28 lightweight Pencil-batch diagnostics + compressed editable backups

- Added lightweight **raw/coalesced Pencil batch diagnostics** to help determine whether Safari is replaying Apple Pencil sample batches or Workbench is storing redundant points.
- Each Pen/Highlighter gesture now tracks bounded per-stroke counters: number of direct/coalesced batches, raw samples seen, accepted points, points rejected by the ordinary distance threshold, exact raw-sample repeats seen in a recent window, raw samples repeated from the immediately previous batch, exact whole-batch replays, and non-increasing raw timestamps.
- The diagnostics are intentionally lightweight: no persistent writes occur during drawing, no extra DOM reads are introduced, and only a small bounded in-memory summary is retained. A finished stroke writes one summary record into the ordinary diagnostic log; if a diagnostic snapshot is saved mid-stroke, the active gesture summary is included in the runtime snapshot.
- Editable **full Library backups** and **selected-document editable backups** now use ZIP **DEFLATE** compression (level 6) instead of STORE. The backup format is unchanged; restore/import/merge continue to work normally while the packages become substantially smaller.
- Pen/Pencil behavior itself, Google Ink modeling, touch/pinch navigation, and annotation geometry are unchanged in this revision.


## 5.7.27 temporary legacy graph-background purge
- Added a temporary **Pages → Purge old graph image** button. This is a migration convenience for older PowerPoint slide PDFs and is not intended as a permanent Workbench feature.
- It operates on selected PDF pages. Workbench recognizes only the exact 2048×1536 graph-paper JPEG already verified in the user's older slide decks (SHA-256 fingerprint match); it does not guess based on page coverage, dimensions alone, or generic image heuristics.
- For each selected source PDF containing that exact image, Workbench creates a cleaned derived PDF source in which the matching image XObject is replaced by an empty Form XObject. Existing text, vector content, page geometry, annotations, and page content streams are otherwise untouched.
- Only the selected Workbench pages are repointed to the cleaned source, so unselected pages continue to use the original source. The original source remains available for normal session Undo.
- The permanent **Add graph paper background** feature from 5.7.26 remains unchanged and can be applied afterward.
- The Presentation thumbnail navigator remains a permanent feature. The diagnostics button, selected-editable backup, Merge-with-backup, and this purge button remain temporary/experimental support tools.
- Pen/Pencil sampling/modeling, touch/pinch navigation, annotation geometry, and ordinary PDF rendering algorithms are unchanged.

---

# PDF Workbench — Milestone 5.7.26 (DEVELOPMENT / DIAGNOSTIC BRANCH)

**Official current release remains 5.7.21 until this branch is promoted.**

## 5.7.26 permanent page-navigation/background features

### Presentation thumbnail navigation is retained
- The right-side, button-activated Presentation thumbnail drawer from 5.7.23 is now treated as a permanent Workbench feature, not an experiment.
- It remains available in Continuous, Page Snap, Full Page, and Split Presentation modes.
- Memory hygiene is tightened: unrendered drawer canvases start at 1×1 rather than the browser default 300×150 backing store, and all drawer canvas backing stores are explicitly released when the drawer closes.

### Add graph paper background
- Pages now includes **Add graph paper background**. It applies to the currently selected pages.
- The background is stored as structured page metadata (`background.type = "graph-paper"`, style/version/settings), not as an image and not as an annotation. This deliberately leaves room for a later Remove/Change command and controls for spacing, line color, opacity, line width, margins, or additional background styles.
- The default appearance reuses the existing Workbench procedural graph-paper geometry/style.
- On screen, the grid is drawn directly into the existing page rendering path; no full-page graph-paper bitmap is stored.
- For imported PDFs, PDF.js is asked to preserve transparent PDF areas while Workbench supplies the graph layer underneath. Opaque source content still covers the background normally.
- Standard PDF export forces a rewrite when a Workbench background is present. For imported PDF pages the grid is inserted as vector PDF content **before** the copied source page content, so transparent areas reveal the graph paper while opaque text/shapes remain above it. Image and generated pages use the same procedural/vector grid primitive.
- The background survives Undo/Redo, page duplication/reordering/copying, Local Library persistence, editable backup/restore/import, and PDF export because it is part of the page record.
- 5.7.26 intentionally exposes only **Add graph paper background**. The stored model is already reversible/extensible, but a Remove/Change UI is deferred until requested.

### Preserved diagnostic branch features
- 5.7.24 one-tap Presentation diagnostic snapshots and expanded resource/render/event-loop diagnostics remain.
- 5.7.25 selected-document editable backup remains.
- The 5.7.22 document-only Merge with backup experiment remains.
- Highlighter/Eraser color cues remain.
- Pen/Pencil sampling/modeling, Eraser behavior, selection geometry, and 5.6.9 touch/pinch behavior are not changed by 5.7.26.


---

# PDF Workbench — Milestone 5.7.25 (EXPERIMENTAL)


## 5.7.25 selected-document editable backup
- Added **Files → Library backup & export → Back up selected documents (editable)**. It uses the same global document selection already shared by Local Library, Open Documents, Selected Documents, and PDF Tools.
- The package keeps the selected documents' durable editable Workbench records and includes **only source PDF/image binaries referenced by those documents**, plus their non-Trash ancestor Library folder records. It does not pack unrelated sources, so a large whole-Library backup is no longer required just to inspect or transfer a few editable documents.
- Templates, reusable Assets/Recent, Trash, unrelated documents, preferences, and the saved workspace session are intentionally omitted from this partial package.
- The file remains a `.pwbbackup.zip` container and may be used with **Import backup as folder** or the experimental **Merge with backup** path. For safety, **Restore Library backup refuses selected-document packages**, so a partial package cannot accidentally replace the whole Local Library.
- Source payloads are read one at a time from IndexedDB instead of loading the entire source store into memory before packaging.
- No changes were made to Pen/Highlighter/Pencil/touch/pinch behavior, viewer rendering, render retention, or the 5.7.24 diagnostic logger.

## 5.7.24 classroom diagnostics + tool-icon distinction
- Official release remains **5.7.21**. This experimental branch continues from the field-tested 5.7.23 Presentation thumbnail drawer and retains the 5.7.22 Merge with backup experiment.
- The Highlighter and Eraser keep their existing shapes. The previously clear portion of the Highlighter icon is now yellow, while the interior of the Eraser icon is pink, to make the two controls easier for students to distinguish at compact iPad size.
- Added a temporary compact **Save diagnostics locally** button at the far right of the Presentation toolbar. It does not leave Presentation or invoke the iPad share/download UI.
- A tap captures the existing rolling Pencil/contact diagnostics plus a runtime snapshot and stores the text snapshot directly in Workbench IndexedDB using the existing `meta` store. No database/schema migration is required. Each snapshot is stored independently; saving a new one does not reread/rewrite the payloads of earlier snapshots. Up to 12 are retained.
- Files → Library backup & export now shows the saved-diagnostics count and offers **Export saved diagnostics** and **Clear saved diagnostics**. One snapshot exports as `.txt`; multiple snapshots export together as a ZIP. Saved diagnostics are intentionally device-local and are not included in editable Library backups.
- Diagnostics are expanded to record abnormal event-loop gaps (>=700 ms), focus/visibility changes, unhandled errors/rejections, slow renders (>=750 ms), render errors, render-queue active/queued counts, and currently active render ages. A diagnostic snapshot also records open-document/page counts, loaded-source sizes, live canvas pixel counts with an approximate RGBA byte estimate, page-stage rendering state, viewport/DPR, and browser-exposed heap/device-memory fields when available.
- **Important limitation:** iPad Safari does not expose reliable total process/JavaScript/GPU memory to page code. On iPad the memory fields may therefore be null; the canvas/source/render measurements are pressure indicators rather than a direct RAM reading.
- The heartbeat is intentionally lightweight: a 250 ms timer writes nothing during normal operation and records only unusually large gaps. Render instrumentation similarly records only slow/erroring renders while keeping a small map of currently active renders for an incident snapshot.
- Pen/Pencil sampling, Google Ink modeling, touch/pinch behavior, annotation geometry, and viewer navigation are unchanged.
- IndexedDB remains version 4; Library schema remains version 8.

## Preserved 5.7.23 Presentation page navigator
- The compact Pages button remains after the document/pane controls and before Scroll.
- The right-side vertical thumbnail drawer stays entirely inside Presentation and was reported working well on the first iPad test.
- No Page X of N field has been added; toolbar order otherwise remains as tested.

### Classroom test
When the Pen pauses or the entire app appears frozen, tap the far-right diagnostics button as soon as the toolbar responds. When a page remains stuck on Rendering, tap the diagnostics button **before** scrolling away/retrying if practical. After class, use Files → Library backup & export → Export saved diagnostics and upload the result together with any PDFs that were involved in a stuck render.

**Official current release remains 5.7.21.** This branch tests a document-only **Merge with backup** operation using the existing `.pwbbackup.zip` format. Matching is by stable Library document ID, not filename. The newer document `modifiedAt` timestamp wins (falling back to `createdAt` if needed). If the backup copy wins, the displaced older local version is copied to Trash under a new internal document ID before the newer backup record takes over the original stable ID.

This first experiment intentionally does **not** merge Templates, Assets, folder structure, or Trash/deletion state. Backup documents already in Trash are ignored, and a same-ID document already in local Trash is not resurrected. Folder placement is conservative: an existing backup folder ID is used only if the same folder already exists locally; otherwise a replaced document keeps its local folder and a backup-only document is added at Library root.

# PDF Workbench — Milestone 5.7.21

## Unified Selected Documents for PDF Tools

5.7.21 replaces the separate Open Documents selection and Local Library export-only selection with one shared document selection. A checkbox in either Open Documents or Local Library updates the same selected-document set. The new **Selected documents** section is only a synchronized list of that set; it intentionally does not duplicate Export / Compress / Combine controls.

- **PDF Tools are the single operation surface.** Export, Compress, and Combine now operate on the same selected documents whether those documents are open or closed in Local Library.
- **Selection is synchronized.** If an open document is checked in Local Library, its Open Documents checkbox is checked too, and vice versa. Unchecking it in Selected documents clears it everywhere.
- **Closing is not deselecting.** Closing an open document leaves it selected as a closed Local Library document.
- **Closed Library documents can be exported, compressed, or combined** without first opening them in the viewer. Their stored sources are loaded only when the operation needs them.
- **PDF Tools order is now Export → Compress → Combine → Extract → Split.** Extract and Split remain active-document operations.
- **Extract and Split summaries are parallel:** each shows `Active: <document name>` when a document is active, or `No active document` otherwise.
- Existing folder export remains unchanged.
- Pen/touch/viewer, page geometry, Assets, Templates, Copy Region, and annotation behavior are unchanged.

### Test priorities

1. Select an open document from Open Documents and verify the Local Library checkbox and Selected documents entry match.
2. Select a closed Local Library document and verify it appears in Selected documents without opening.
3. Select both open and closed documents, then Export, Compress, and Combine from PDF Tools.
4. Close a selected open document and confirm it stays selected as a closed Library document.
5. Uncheck an item in Selected documents and confirm all corresponding checkboxes clear.
6. Confirm Combine is above Extract/Split and Extract/Split both show the active-document name in the same format.


## Milestone 5.7.21 — annotation anchoring during page geometry changes

- Fixed Pen strokes appearing to drift when Page Size or Crop/Margins changes page geometry.
- Root cause: those geometry helpers mutate editable stroke points in place, while the Google Ink modeled-path cache used object/array identity and could retain the pre-transform path.
- The shared shift/fit geometry helpers now invalidate modeled Pen geometry after changing points.
- Editable annotation data remains editable; image/highlighter behavior and page-geometry semantics are unchanged.
- Pen input, touch/pinch navigation, selection rotation, Asset placement, and Presentation round-trip behavior are otherwise unchanged.

# PDF Workbench — Milestone 5.7.21

## 5.7.21 layout polish

5.7.21 is a narrow layout-only follow-up to the validated 5.7.11 paste behavior. The Copy Region size-choice dialog now uses a two-column choice grid with Cancel on its own row, and Select-mode text action buttons remain content-sized in compact Presentation mode instead of being forced into 34-pixel icon-button widths. Paste placement, Assets round-trip behavior, Copy Region capture logic, and Pen/touch/viewer machinery are unchanged.
## 5.7.11 centered Paste / Asset placement

5.7.11 makes placement semantics uniform. Ordinary Paste now centers copied annotation snippets in the current visible page area. When Assets/Recent is opened from the annotation toolbar, Workbench freezes the active page and visible-center point before switching to Files; choosing either an image or an editable snippet pastes it back at that saved visible center. Asset cards use one action label, **Paste**, for both types. Duplicate remains deliberately different: it creates an offset copy near the original selection. The 5.7.10 Files return-state fix and 5.7.9 Copy Region remain intact.

## 5.7.10 preserve viewer position across Files / Asset insertion

5.7.10 fixes a regression found after 5.7.9 testing: inserting either a Recent image or a saved Asset could return the document viewer to page 1. The shared Files round-trip now freezes the current single/split view state before entering Files, restores it before rebuilding View, and waits for the viewer's ordinary multi-frame position restoration before returning to Presentation. The Asset browser no longer performs a redundant second Files-workspace rebuild on entry. Copy Region from 5.7.9 is retained unchanged.


5.7.9 adds Copy Region using the smallest architecture that fits the existing Workbench model. In Select mode, the new Region action arms a one-shot rectangular capture. Drag a rectangle on a page, choose Original size or Current zoom size, and Workbench renders that region (page content plus visible Workbench annotations, excluding UI chrome) to a PNG, stores it in Recent, and makes it the current paste image. The user can paste immediately with the existing image-annotation path or Keep it later into the permanent Asset Library.

Template Save no longer adds With/Clean controls to the naming dialog. Insert Page instead shows **Save page N as template:** followed by two explicit link-like choices: **With annotations…** and **Without annotations…**. Either choice then opens the same ordinary naming dialog used everywhere else.

The successful 5.7.7 architecture cleanup remains intact: Templates and Assets live directly in Files, Library/Asset folder navigation and Move plumbing stay shared, and user-created documents retain the current Local Library folder. Pen/touch/pinch/viewer machinery is unchanged. Copy Rectangle has not been started.

### iPad test priority

- Rename a Local Library document/folder and confirm tapping the name field summons the same full keyboard behavior as 5.7.6.
- Repeat Asset folder/asset naming and Template Rename.
- From Insert Page, test both **With annotations…** and **Without annotations…**, then type the template name continuously.
- Confirm the annotation choice affects saved template content and does not alter the naming UI.

================ PRIOR README HISTORY ================
# PDF Workbench — Milestone 5.7.7

## 5.7.7 architecture simplification / consistency audit

5.7.7 applies the post-Assets architecture audit without changing the field-tested Pen/touch/viewer machinery. Templates now manage directly inside Files instead of a modal Template Manager. Template rename, Local Library naming, and Asset naming all use one small shared naming dialog; Save Template uses that same dialog with one conditional Page content fieldset for With annotations / Clean page.

Local Library and Asset folder trees now share the same small tree primitives (children/path/descendants/sibling-name checks/breadcrumb rendering) and one Move dialog. Blank/Graph/Template/Images/Combine document creation now shares one activation path, preserving the current Local Library destination consistently. Page Size now reuses the existing Crop/Margins scroll-invalidation helper. A `release-check.mjs` script verifies that release/cache/query-string version identifiers stay synchronized.

The internal legacy workspace value `export` still means Files; this release adds an `isFilesWorkspace()` helper in touched code rather than performing a risky mass rename.

### Validation focus

- iPad keyboard typing in Files → Templates → Rename.
- Save current page as template with both With annotations and Clean page, including from Presentation.
- Insert Page → Manage templates routes to the same Files → Templates manager and returns to the document.
- Library and Asset Move actions use the same destination dialog.
- Blank/Graph/Template/Images/Combine creation still lands in the currently browsed Local Library folder.
- Pen, Highlighter, pinch, finger scrolling, split/single rendering, and the 5.6.9 interaction baseline are intentionally unchanged.

================ PRIOR README HISTORY ================
# PDF Workbench — Milestone 5.7.6

## 5.7.6 simpler Assets workspace + iPad toolbar + New-document destination

5.7.6 removes the separate Assets modal instead of continuing to work around it. Assets now live directly inside the ordinary Files workspace, parallel to Local Library. The annotation-strip Insert Asset button switches to that exact same Files → Assets browser in insertion mode; inserting or choosing Back to document returns to the prior document, including Presentation mode. Asset New folder/Rename/Keep/Rename use the exact same small `libraryNameDialog` that already works for Local Library naming.

Presentation gets a tablet-width compact layout at iPad-class landscape widths so all Pen controls plus the Exit button fit onscreen. The underlying Pen/pinch/scroll algorithms are unchanged.

Workbench-created documents now inherit the Local Library folder currently being browsed. This applies to Blank, Graph Paper, From Template, Images → PDF, and Combine-created documents. Existing PDF/image import behavior is unchanged.

## 5.7.5 simpler one-dialog Asset naming

5.7.5 replaces the 5.7.3/5.7.4 Asset-naming focus workarounds with a simpler interaction model based on the Local Library naming flow that already works reliably. The native Assets dialog now stays open for the entire naming operation. New folder, Rename folder, Keep, and Rename asset temporarily switch that same dialog to a basic Name field with Cancel/Save, then return to the same Asset browser state.

- **One native dialog only:** Assets is never closed and reopened for naming, and no second native naming dialog is opened over or after it.
- **No iPad-specific naming path:** the 5.7.4 non-native overlay, delayed focus reinforcement, blur-recapture guard, and platform branch are removed.
- **Reuse the proven naming behavior:** populate the field, focus/select it once on the next animation frame, then Save or Cancel—the same simple focus pattern already used successfully by Local Library naming.
- **Context is naturally preserved:** because the Assets dialog never leaves its current modal session, its manage/insert mode, Library/Recent tab, and nested folder stay in place without a close/yield/restore cycle.
- **No data migration:** IndexedDB remains version 4 and Library schema remains 8.
- **No unrelated interaction changes:** Pen/Highlighter geometry, 5.6.9 pinch/scroll behavior, Quick Image, Asset storage/folders, and visible-view insertion are unchanged.

### Validation

- `app.js`, `sw.js`, and `google-ink-modeler.js` pass JavaScript syntax checks.
- An isolated Chromium DOM smoke test using the new one-dialog model kept the same input focused through continuous multi-character `Input.insertText`, saved the complete name, hid the naming panel, and left the original Assets dialog open.
- Real iPad Safari remains the authoritative focus test.

### Test priority

1. On iPad, Assets → Library → Rename an Asset folder and type a multi-character name continuously without retapping the field.
2. Repeat Rename asset, New folder, and Keep from Recent.
3. Confirm Cancel and Save return directly to the same Asset tab/folder.
4. Continue normal grading use; Pen, pinch, finger scrolling, Quick Image, and visible-view placement should be unchanged.

### Agreed next work after this settles

Once Asset naming is stable in real iPad use, implement **Copy Region → Image** as another Recent producer, including original-size and current-zoom-size capture/paste behavior. Manual Google Drive synchronization follows after the Asset/capture data model is stable. Selection rotation remains on the backlog.

================ PRIOR README HISTORY ================
# PDF Workbench — Milestone 5.7.3

## 5.7.3 iPad Asset naming focus fix

5.7.3 is a narrow iPad/Safari interaction fix discovered while testing the new nested Asset folders. The Asset data model, nested-folder behavior, Quick Image path, visible-view insertion, Pen/Highlighter geometry, and the validated 5.6.9 pinch/scroll behavior are unchanged.

- **Asset naming no longer nests modal dialogs:** New folder, Rename folder, Keep, and Rename asset temporarily yield the Assets modal while the shared text-entry dialog owns focus, then restore the exact Asset Library/Recent view and folder afterward.
- **Reason:** iPad Safari could bounce keyboard focus between the already-modal Assets browser and the second naming modal after each keystroke. Local Library naming did not normally have this nesting.
- **No data migration:** IndexedDB remains version 4 and Library schema remains 8.
- **iPad keyboard note:** Workbench cannot force iPadOS floating/full keyboard state. For a miniature floating keyboard, spread two fingers on it or use More (…) → Full. If Apple Pencil/Scribble shows its small toolbar, use the keyboard button first.

### Test priority

1. In Assets, create or rename a folder using the onscreen keyboard and type several characters continuously; focus should remain in the name field.
2. Repeat Rename asset and Keep from Recent. After the naming dialog closes, confirm Workbench returns to the same Asset folder/view.
3. Confirm nested folders, Quick Image, visible-view insertion, pinch behavior, and finger scrolling remain unchanged.

### Agreed next work after this settles

Continue normal grading/use. Once Assets/folders are stable, implement **Copy Region → Image** as another Recent producer, including original-size and current-zoom-size capture/paste behavior. Manual Google Drive synchronization follows after the Asset/capture data model is stable. Selection rotation remains on the backlog.

================ PRIOR README HISTORY ================

# PDF Workbench — Milestone 5.7.2

## 5.7.2 nested Asset Library folders

5.7.2 extends the tested Reusable Assets foundation with a folder browser intentionally modeled after the Local Library. The 5.7.1 Quick Image / visible-view placement behavior, the 5.6.9 pinch-scroll interaction baseline, and all Pen/Highlighter geometry are unchanged.

- **Nested folders:** the permanent Asset Library now supports folders and arbitrarily nested subfolders.
- **Local-Library-style navigation:** Library view has a breadcrumb path plus **New folder** in the current location. Folder cards are shown before asset cards and open in place.
- **Folder management:** permanent Asset folders can be renamed, moved to another Asset folder (while preventing self/descendant moves), or deleted recursively after confirmation.
- **Asset movement:** permanent image/snippet Assets have **Move…** and can be moved anywhere in the nested Asset hierarchy. Name conflicts in a destination receive a duplicate-safe name.
- **Recent remains flat:** clipboard history is intentionally not organized into folders. **Keep** promotes a recent true-copy snippet/image into the currently selected Asset Library folder.
- **Permanent image import:** **Assets → Import images…** always switches to Library view and imports into the currently selected Asset folder. **Quick Image** remains the fast Recent path.
- **Persistence migration:** IndexedDB advances to DB version 4 / Library schema 8 and adds an `assetFolders` store. Existing 5.7.0/5.7.1 Assets without `folderId` naturally remain at the Asset Library root.
- **Backup/restore:** editable Library backup now includes the full nested Asset-folder hierarchy. Full restore recreates it. **Import backup as folder** preserves imported Asset hierarchy beneath a new top-level Asset folder rather than flattening the imported Assets.
- **No change to insertion:** images and snippets still insert at the center of the visible portion of the active page.

### Test priority

1. Create a class folder, create a subfolder inside it, navigate with breadcrumbs, close/reopen Workbench, and confirm the hierarchy persists.
2. Import images into different folders and move an existing image/snippet between folders.
3. Switch to Recent while inside a class folder, use **Keep**, and confirm the saved item appears in that current Library folder.
4. Rename and move nested folders; confirm descendants follow the folder.
5. Delete a test folder tree and confirm the warning/counts are sensible and unrelated Assets remain intact.
6. If convenient, make and restore an editable backup to verify the Asset hierarchy survives.

### Agreed next work after this settles

Continue normal grading/use. The next planned Asset producer is **Copy Region → Image**, including original-size and current-zoom-size capture/paste behavior. Manual Google Drive synchronization follows after the Asset/capture data model is stable. Selection rotation remains on the backlog.

================ PRIOR README HISTORY ================

# PDF Workbench — Milestone 5.7.1

## 5.7.1 Assets usability polish

5.7.1 is a focused response to the first real-use Asset Library test. The 5.7.0 storage model and the validated 5.6.9 navigation/Pen baseline remain intact.

- **Asset dialog overflow:** the dialog now owns a fixed viewport-relative height, the thumbnail grid is the only flexible scrolling region, grid rows size to their content, and the footer remains fixed. Multi-row cards no longer lose their Keep/Rename/Delete controls below the dialog edge.
- **Quick Image:** the annotation strip picture button now opens the device image picker directly. The chosen image is inserted immediately without opening Assets and is recorded as an unpinned **Recent** image.
- **Separate Assets button:** a new adjacent Assets/grid button opens the existing Library/Recent browser for reusable insertion. Files → Assets remains available as before.
- **Visible-view placement:** inserted images and reusable snippets are centered in the **visible portion of the active page**. At high zoom this means the current viewport rather than the center of the entire PDF page; at zoom-out, where the whole page is visible, page center remains natural.
- Permanent **Import images…** inside Assets still imports directly to the permanent Library. Quick Image is the path that intentionally goes to Recent.
- Recent remains capped at 30 items. A quick-inserted image can later be promoted with **Keep**.
- Pen/Highlighter rendering, partial Eraser, Select mechanics, pinch finalization, early finger-scroll engagement, and 0.95 momentum are unchanged.

### Next after this test

Continue ordinary grading. If Assets/Recent now feels right, the next planned producer is **Copy Region → Image**, including original-size and current-zoom-size capture behavior. Manual Google Drive sync follows after the Asset/capture model is settled.

================ PRIOR README HISTORY ================

# PDF Workbench — Milestone 5.7.0

## 5.7.0 Reusable Assets + Recent clipboard

5.7.0 builds the common storage/browser foundation for the planned reusable image library, clipboard history, future region captures, and later manual Drive sync. The validated 5.6.9 pinch/scroll behavior and all Pen/Highlighter geometry are intentionally unchanged.

- **Assets browser:** Files → Assets → Open Assets… manages reusable content. The annotation-strip picture button opens the same browser for insertion.
- **Reusable images:** Import images… creates one persistent image Asset whose original source can be inserted into any page/document as the existing editable image annotation.
- **True editable snippets:** ordinary Lasso/Select Copy now also creates a Recent snippet containing the actual selected Workbench objects. Pen/Highlighter strokes stay vector/editable; inserted images preserve their source references.
- **Browsable clipboard:** Recent keeps up to 30 local copied selections, newest first. Current Paste/Ctrl+V semantics remain; selecting an older Recent item makes it reusable again.
- **Keep:** promotes a recent true-copy snippet to the permanent Asset Library without rasterizing it. Permanent Assets can be renamed or deleted.
- **Persistence/backup:** Assets live in a dedicated IndexedDB store (DB v3 / Library schema 7) and are included in editable Library backup/restore. Source cleanup understands Asset references so a shared image binary is never removed while a document/template/other Asset still needs it.
- **Mixed thumbnails:** reusable snippets can contain both inserted images and ink; thumbnails preserve image-below-ink layering.
- **Next Asset producer:** region-to-image capture is deliberately deferred until this foundation is tested. The planned capture supports both original-size and current-zoom-size output so zoomed source regions can intentionally paste back enlarged.
- **After capture:** manual, explicit Google Drive synchronization remains the intended next major feature; Workbench stays local-first.

### Real-use baseline retained

The user reported that 5.6.9 made a large practical difference while grading. Keep its in-place post-pinch crisp refresh, early deliberate finger-scroll engagement, and 0.95 release momentum. Do not retune those merely because 5.7.0 adds Assets.

---

## Prior 5.6.9 notes

## 5.6.9 touch navigation / pinch polish

Milestone 5.6.9 is a focused interaction fix discovered during ordinary grading use. Pen/Highlighter geometry and the unified 5.6.8 modeled-Pen renderer are intentionally unchanged.

- **Post-pinch flash:** 5.6.8 finished a pinch by rebuilding the viewer DOM. That immediately removed the live-scaled page canvases and could briefly expose a blank/`Rendering…` stage while PDF.js rebuilt the crisp raster. 5.6.9 keeps the scaled bitmap visible, renders the crisp replacement into a temporary canvas, then swaps the completed raster into the existing page stage in one synchronous step. The same in-place finalization is used in single and split view.
- **Finger-scroll engagement:** in Pen/Highlighter/Eraser/Select modes, 5.6.8 always held finger navigation behind a 120 ms palm-intent window. 5.6.9 retains that stationary palm-burst window but lets a clearly moving one-finger drag or two-finger pinch promote itself immediately and replays the movement already observed while pending. On iPad, a deliberate larger movement can also override the soft recent/hover Pencil guard; Surface/ChromeOS keep the stricter proximity guard that was introduced for palm rejection.
- **Scroll momentum:** continuous-scroll release decay changes modestly from `0.94` to `0.95`, giving a little more coast after finger release without changing the drag response itself.
- Touch diagnostics now report the delay before a touch was accepted as intentional navigation and whether the pen/palm guard was active at acceptance.
- No change to Pen modeling, Highlighter geometry/compositing, Eraser semantics, Lasso/Select semantics, PDF export, page structure, persistence, or the 5.6.1 O(current-stroke) Pen-up architecture.

### Current field test

Use Workbench normally for grading/classroom work. Specifically watch for: (1) any remaining flash when a pinch ends; (2) whether one-finger scrolling engages promptly while an annotation tool is still selected; (3) whether the slightly longer momentum feels natural; and (4) any palm-rejection regression, especially on Surface/Chromebook when those devices are next exercised.

### Agreed near-term roadmap after the field test

The application is considered close to adequate for the user's normal workflow unless testing exposes weaknesses. Do not add features merely to match Goodnotes/Notability. After the current field test, the agreed sequence is:

1. **Reusable Image Library** — persistent named/organized images that can be inserted into documents and included in backup/restore.
2. **Manual Google Drive sync** — explicit user-triggered synchronization of the Workbench Library rather than background syncing; Workbench remains local-first and manages documents/folders/templates/image assets itself, while Drive acts as the transport between machines. Conflicts must preserve both changed copies rather than silently overwriting one.
3. Other backlog items remain optional. **Rotate selections** has been added to the feature-gap list as a natural extension of existing Lasso/Select manipulation.

External PDF.js/pdf-lib/JSZip vendoring remains postponed; do not make it the next feature by default unless deployment needs change.

================ PRIOR README HISTORY ================

# PDF Workbench — Milestone 5.6.8

## 5.6.8 unified modeled Pen renderer

Milestone 5.6.8 moves **all three current Pen widths** onto the same `google-ink-v1` modeled-input pipeline. The 5.5 pt Thick Pen no longer has a separate cardinal-spline renderer.

- Thin, Medium, and Thick now share the same velocity-aware wobble filtering, spring/mass/drag modeling, 180 Hz modeled output, live stroke-end prediction, end-of-stroke catch-up, live canvas, commit path, redraw path, and PDF export path.
- Pen width is now only a numeric rendering parameter. This deliberately makes future extra widths or a continuously adjustable Pen width much easier to add without another renderer-selection branch.
- Removed the remaining Thick-only cardinal-spline constants, control-point generator, Canvas tracer, incremental live-progress renderer, commit fallback, PDF-export Bezier branch, and `thick-cardinal` diagnostics identity.
- Raw sampled x/y/t points remain authoritative for editing, Eraser, Lasso/Select, persistence, Undo/Redo, backup, and deterministic modeled redraw/export.
- The 5.6.1 O(current-stroke) dense-page architecture is unchanged. Highlighter remains on its separate translucent raw-polyline compositing path.
- There is intentionally no compatibility guarantee for the experimental pre-5.6.6 Pen renderers; the user plans to delete those test documents.
- **⋯ → Attributions & licenses** and the bundled third-party notice/license files from 5.6.7 remain in place.
- External PDF.js/pdf-lib/JSZip bundling remains postponed.

================ PRIOR README HISTORY ================

# PDF Workbench — Milestone 5.6.7

## 5.6.7 modeled-ink cleanup + attribution UI

Milestone 5.6.7 keeps the usable Google-style Thin/Medium Pen behavior from 5.6.6 and removes the abandoned experimental rendering machinery instead of carrying it as compatibility code.

- Thin and Medium Pen use only `google-ink-v1` modeled input: velocity-aware wobble filtering, spring/mass/drag modeling, 180 Hz modeled output, live stroke-end prediction, and end-of-stroke catch-up.
- Thick Pen keeps only the established restrained cardinal-spline renderer (`factor 0.135`, handle cap `0.58`).
- Removed from active/source Pen rendering: the 5.6.2 aggressive Thin/Medium anchor stabilization, the rejected 5.6.3 filled-outline experiment, and the 5.6.4/5.6.5 custom distance/corner/Bezier trajectory fitter and its live/commit/export compatibility paths.
- Pre-5.6.6 experimental Thin/Medium strokes are intentionally not supported as a separate renderer. The user plans to delete those test documents, so no legacy renderer is retained.
- Removed the retired trajectory-fit telemetry fields from new Pencil diagnostics. Google model/prediction timing and point-count/lag fields remain.
- The 5.6.1 O(current-stroke) live-Pen/commit architecture remains intact.

### Attributions and licenses

The **⋯ → Attributions & licenses** menu item now lists runtime dependencies and the modeled-ink attribution. The package includes:

- `THIRD_PARTY_NOTICES.txt` — dependency/version/copyright/license summary;
- `THIRD_PARTY_LICENSES.txt` — full applicable MIT and Apache 2.0 license text;
- `APACHE-2.0-Google-Ink-Stroke-Modeler.txt` — standalone Apache 2.0 copy retained from 5.6.6.

Listed dependencies are PDF.js 6.2.108 (Apache 2.0), pdf-lib 1.17.1 (MIT), JSZip 3.10.1 (used under its MIT option), and Google Ink Stroke Modeler (Apache 2.0 attribution/reference for Workbench's independent JavaScript model implementation). The notice/license files are precached with the PWA shell so they remain available offline after installation/cache fill.

External PDF.js/pdf-lib/JSZip bundling remains postponed; 5.6.7 keeps the same pinned CDN versions and service-worker caching behavior as 5.6.6.

================ PRIOR README HISTORY ================

# PDF Workbench — Milestone 5.6.6

## 5.6.6 Google-style modeled-input Thin/Medium Pen experiment

Newly written Thin and Medium Pen strokes no longer use the custom 5.6.5 distance/corner/Bezier pipeline. They are tagged `google-ink-v1` and use a local Google Ink Stroke Modeler-style physical trajectory model: velocity-aware wobble filtering, spring/mass/drag position modeling, 180 Hz modeled output, live stroke-end prediction, and end-of-stroke catch-up.

- Raw Pencil x/y points remain authoritative for editing; new modeled strokes also store relative input timestamps so the modeled path can be reconstructed after reload/export.
- Existing pre-5.6.6 Thin/Medium strokes keep their old trajectory-fit renderer. Thick remains unchanged as the control.
- The displayed/exported experiment remains constant-width with round caps/joins. There is no pressure/tapering, filled outline, supersampling, or post-model Bezier fitting.
- Live prediction is temporary: each new real input replaces the old prediction. Stable modeled samples accumulate without refitting the whole stroke.
- The 5.6.1 dense-page O(current-stroke) commit rule remains intact.
- Diagnostics now report modeled-input timing, stable/predicted/output point counts, wobble blend/speed, and model lag.

The local `google-ink-modeler.js` is an independent JavaScript implementation of the positional pieces relevant to this experiment: Google's wobble smoother, spring/mass/drag position model, minimum-rate resampling, stroke-end catch-up, and StrokeEnd prediction. It does not bundle Google's C++ library and does not yet implement pressure/tilt state modeling, optional loop-contraction mitigation, or the optional Kalman predictor.

The model works in native PDF points/seconds. Google documents the model as unit-agnostic and recommends tuning wobble parameters to the client's input rate and speed. From the 122 blue 5.6.5 iPad strokes we measured roughly 409 stored inputs/s and 287 PDF pt/s median path speed, so 5.6.6 starts at a **0.006 s** wobble window and **6–9 PDF pt/s** wobble range, while retaining Google's spring/drag starting values, 180 Hz minimum output rate, and StrokeEnd predictor. These are experimental starting values, not presumed final tuning.

The latest 5.6.5 real-world diagnostics motivated this switch: across 122 completed trajectory-fit strokes, median raw input was 46 points but median retained/resampled trajectory was 47 points, with 9.5 detected corners and 10.5 fitted cubics. A 107-point real stroke retained 105 points and detected 25 corners. The custom corner heuristic was therefore mostly not simplifying actual handwriting despite synthetic tests.

External PDF.js/pdf-lib/JSZip bundling remains postponed while Pen rendering is being tuned.

Google Ink Stroke Modeler: https://github.com/google/ink-stroke-modeler (Apache License 2.0, Copyright 2022 Google LLC).

================ PRIOR README HISTORY ================

# PDF Workbench — Milestone 5.6.5

## 5.6.5 distance-filtered trajectory fitting experiment

Thin and Medium Pen keep the responsive 5.6.4 live fitting architecture, but the fitter no longer uses every raw/stabilized Pencil sample as evidence. Rendering now follows this experimental pipeline:

**raw Pencil samples → distance-based resampling → explicit localized-corner retention → mild averaging between corners → cubic Bezier fit**

- Thin resample spacing: **0.85 PDF pt**; Medium: **1.05 PDF pt**.
- Endpoints are always retained. Strong localized turns are retained explicitly and fitted as separate spans. The corner detector compares a short-window turn with a broader turn so a true cusp is preserved while a smooth U/arc is not automatically converted into a corner.
- The heavy 5.6.2/5.6.4 five-sample stabilization is no longer used in the Thin/Medium fit path. Instead the reduced trajectory gets a deliberately mild three-point averaging pass: **0.38 Thin / 0.30 Medium**.
- Fit tolerance is slightly relaxed to **0.72 pt Thin / 0.95 pt Medium**, because sample chatter has already been removed before fitting.
- Raw points remain unchanged and authoritative for Eraser, Lasso/Select, hit testing, persistence, Undo/Redo, backup, and page operations.
- Thick Pen remains the unchanged control. No pressure/tapering, filled outlines, or supersampling are introduced.

The 5.6.1 dense-page rule is preserved: live Thin/Medium ink is reduced/fitted once per pointer event on the isolated live layer, and Pencil-up commits only the current stroke. Diagnostics now report raw input points, retained trajectory points, detected-corner count, resample spacing, fitted cubic count, and fit/render/commit timing.

Synthetic checks show the intended behavior: a 120-sample noisy straight trajectory reduces to about 54–67 retained points and ~2 cubics, a 120-sample smooth U retains no false corners and fits as one cubic in the test geometry, and a noisy Z retains its two deliberate corners and fits as three spans. A repeated-growing-stroke benchmark was also faster than the 5.6.4 fitter in Node despite the added preprocessing, because substantially fewer points reach the recursive fit. Real iPad feel remains authoritative.

The 5.6.3 filled-outline experiment remains rejected. External-library bundling remains postponed while Pen rendering is being tuned.

## 5.6.2 experimental thin/medium Pen smoothing

- This build deliberately makes the **1.5 pt and 3 pt Pen much smoother** for a side-by-side handwriting comparison with Goodnotes. It is an experiment and is expected to be tuned back if letterforms/corners become too rounded.
- Thin Pen curve factor / handle cap: **0.27 / 0.90** (was 0.205 / 0.72); completed-stroke anchor stabilization: **0.86** (was 0.58).
- Medium Pen curve factor / handle cap: **0.225 / 0.82** (was 0.155 / 0.62); completed-stroke anchor stabilization: **0.68** (was 0.36).
- The **5.5 pt Pen is unchanged** at 0.135 / 0.58 with no anchor stabilization, so it serves as a control.
- Sharp-turn protection begins sooner under the stronger stabilization to reduce rounding of deliberate corners.
- Raw sampled points remain authoritative for Eraser, Select/Lasso, persistence, Undo/Redo, and hit testing. PDF export uses the same experimental completed-stroke geometry as the screen.
- The 5.6.1 live-Pen dense-page performance optimization remains intact. External-library bundling remains postponed.
- External-library bundling is explicitly postponed until this performance fix has been field-tested.
- Milestone 5.6.0 black blank-page behavior and the 5.5.9 rebuilt-PDF link policy are unchanged.
- Pre-release browser validation showed flat Pen-up cost across a 220-stroke synthetic dense-page test, exact completed-canvas pixel equivalence with 5.6.0 for identical strokes, working annotation Undo/Redo, and unchanged Highlighter live-layer behavior.


## 5.6.0 black blank-page backgrounds

- New blank documents can use a **White** or **Black** page background. White remains the default and the selector resets to White after creating a blank document.
- Insert Page keeps its existing compact four-card layout and adds one short **Blank background** White/Black selector row. A freshly opened Insert Page menu always defaults to White.
- Black is stored as generated-page data and rendered as actual page content, not as a viewer theme. It therefore survives Local Library persistence, templates, page duplication/reordering, normal PDF export, and rasterized compression.
- Existing Pen/Highlighter palettes are unchanged. Black Pen remains available even though it is naturally invisible on a black page; no automatic annotation-color switching is introduced.
- The 5.5.9 rebuilt-PDF link policy is unchanged: preserve external URI links and strip internal/document-navigation links.

## 5.5.9 deterministic existing-link export policy

- Completely untouched full single-source PDF exports still return the original source bytes unchanged, preserving all original PDF structures exactly.
- Whenever Workbench rebuilds a PDF, copied source-page **Link** annotations are filtered deliberately: standard external **URI** actions are preserved; internal/document-navigation links (`/Dest`, `/GoTo`, and other non-URI link actions) are removed.
- This prevents stale or incorrect internal destinations after page reordering, deletion, extraction, combining, duplication, or other structural changes.
- Non-Link PDF annotations are not removed by this filter. Existing source outlines/bookmarks are still not rebuilt by pdf-lib's page-copy export path.
- Rasterized compression still removes all interactive PDF structures because every page becomes an image.
- Milestone 5.5.8's annotation-only Undo/Redo repaint optimization and all established annotation/input behavior are unchanged.

================ PRIOR README HISTORY ================

# PDF Workbench — Milestone 5.5.8

## 5.5.8 Undo/Redo repaint cleanup

- Annotation-only **Undo/Redo no longer rebuilds the PDF/generated-page viewer canvases**. If page IDs/order/geometry/source are unchanged, Workbench keeps the existing page DOM and repaints only the annotation overlays.
- Structural history operations (page insert/delete/reorder/resize/rotation/crop/margins) still use the normal full viewer rebuild because the base page canvases genuinely change.
- Pending deferred Eraser redraw jobs are cancelled before a history restore so an old page object cannot repaint stale annotations after Undo/Redo.
- Diagnostics now record `history-restore-finish` with `overlayOnly:true/false`.
- Presentation-ratio sizing, complete-square graph paper, Pen stabilization, image annotations, session-only Undo policy, and 0.94 touch-scroll inertia are unchanged.

================ PRIOR README HISTORY ================

# PDF Workbench — Milestone 5.5.7

## 5.5.7 Presentation sizing + graph-paper refinement

- Presentation-ratio sizing now always **predicts the usable Presentation viewport from the current device/window outside Presentation mode**. The calculation reserves the unified annotation toolbar height and top safe-area inset; it no longer contains an unreachable "create while already in Presentation" measurement path.
- **Pages → Page size…** now includes **Presentation Ratio · long side 11 in**. It uses the same current-device ratio calculation as New documents, while the existing orientation selector still controls whether selected/all pages preserve orientation, become portrait, or become landscape.
- New graph paper uses a nominal **17.25 pt** square target (slightly smaller than the former 18 pt / 1/4-inch grid). For each generated page size, Workbench chooses an integer row/column count and one common spacing so every visible grid cell is a complete square. Any tiny remainder is centered as a small outer margin.
- The graph pattern now has a **slightly darker/thicker outer boundary** so the edge of the complete-square grid is distinguishable from interior lines. Screen rendering, previews, and PDF export use the same grid layout.
- Fit Page behavior, Presentation viewer behavior, Pen stabilization, image annotations, session-only Undo, and the accepted 0.94 touch-scroll momentum are unchanged.

================ PRIOR README HISTORY ================

# PDF Workbench — Milestone 5.5.6

## 5.5.6 Presentation-ratio new documents

- The **New** section now offers a page-size selector for both Blank and Graph-paper documents: existing **US Letter landscape** or **Presentation Ratio · long side 11 in**.
- Presentation Ratio derives its aspect ratio from the **current device/orientation's single Presentation viewport**. On iPad this predicts the app-level Presentation viewport; on Surface/Chromebook it predicts the native-fullscreen Presentation viewport. The reserved annotation-toolbar height and top safe-area inset are excluded from the target canvas.
- The long PDF page edge is exactly **11 inches (792 pt)**; the short edge is computed from that Presentation viewport ratio. Portrait orientation is supported automatically if the current device orientation is portrait.
- The UI shows the currently predicted physical page dimensions before creation and updates them when the window/orientation changes.
- Existing-document insertion behavior is unchanged: blank/graph pages inserted into a document continue to match the current page's size and orientation.
- Fit Page, Presentation rendering, Pen stabilization, image annotations, Undo policy, and the accepted cross-platform 0.94 touch-scroll momentum are unchanged.

================ PRIOR README HISTORY ================

# PDF Workbench 5.5.5

## Thin/medium pen edge stabilization

- Adds a light render-only local stabilization pass before the existing Pen spline for 1.5 pt and 3 pt strokes.
- Targets fine centerline waviness without changing the overall handwriting shape.
- Preserves sharp turns by tapering stabilization around deliberate corners.
- Raw points remain authoritative for eraser, lasso, Undo/Redo, persistence, and hit testing.
- Completed on-screen Pen rendering and PDF export use the same stabilized geometry.
- 5.5.4 thin-pen spline tuning and 5.5.2 scroll momentum are unchanged.

# PDF Workbench — Milestone 5.5.5

## 5.5.5 thin-Pen smoothing refinement

- Increased smoothing only for the **1.5 pt** Pen: `factor 0.205 / handle cap 0.72` (from `0.18 / 0.68` in 5.5.3).
- The **3 pt** Pen remains `0.155 / 0.62`; the **5.5 pt** Pen remains `0.135 / 0.58`.
- Raw stylus samples remain authoritative for Eraser, lasso/selection, persistence, and session Undo/Redo.
- Live Pen rendering, completed on-screen rendering, and PDF export still use the same width-aware spline geometry. A PDF can nevertheless look slightly smoother because the PDF viewer rasterizes vector curves independently, whereas Workbench draws the same curve to its page-aligned Canvas annotation layer.
- No annotation-canvas resolution increase was made, specifically to avoid trading dense-page performance for a small anti-aliasing difference.
- The accepted 5.5.2 cross-platform touch-scroll momentum (`0.94` decay per nominal 60 Hz frame) is unchanged.
- No Laser Pointer tool is included.

================ PRIOR README HISTORY ================

# PDF Workbench — Milestone 5.5.3

## 5.5.3 width-aware Pen smoothing

- Increased Pen curve smoothing most for the **1.5 pt** pen, somewhat for the **3 pt** pen, while leaving the **5.5 pt** pen close to the established 5.4/5.5 feel.
- Width-specific rendering settings are now: 1.5 pt `factor 0.18 / handle cap 0.68`; 3 pt `0.155 / 0.62`; 5.5 pt `0.135 / 0.58` (the previous common setting was `0.13 / 0.58`).
- The change is rendering-only. Raw stylus samples remain authoritative for Eraser, lasso/selection, persistence, and session Undo/Redo.
- Live Pen rendering, completed on-screen rendering, and PDF export use the same width-aware smoothing so the exported curve matches the displayed curve.
- Highlighter remains an unsmoothed continuous raw polyline.
- The accepted 5.5.2 cross-platform touch-scroll momentum (`0.94` decay per nominal 60 Hz frame) is unchanged.
- No Laser Pointer tool is included in this milestone.

================ PRIOR README HISTORY ================

# PDF Workbench — Milestone 5.5.2

## 5.5.2 touch-scroll momentum tuning

- Increased the cross-platform continuous touch-scroll inertia decay from **0.91** to **0.94** per nominal 60 Hz frame, so a finger flick coasts farther after release.
- This is deliberately **not platform-specific**. iPad, Surface, and Chromebook use the same value for this test build.
- Finger/Pencil discrimination, touch-pan release-velocity estimation, pinch-to-zoom anchoring, single-page snapping, and scroll-end page creation are unchanged.
- The 5.5.1 image-button startup fix and all 5.5.0 image-annotation behavior are unchanged.

================ PRIOR README HISTORY ================

# PDF Workbench — Milestone 5.5.1

## 5.5.1 restored-document image-button state

- Fixed a startup-state bug in 5.5.0 where the **Insert Image** picture button could remain disabled after an open document was restored from the Local Library/session.
- The cause was initialization order: the annotation toolbar was first updated while `state.pages` was still empty, and the later asynchronous document restore refreshed page counts but not the page-dependent picture action.
- Page-count refresh now also refreshes the Insert Image button's enabled state, so it is immediately available whenever the restored/current document has pages.
- No image-annotation behavior, Pen/Highlighter/Eraser behavior, history policy, persistence format, or PDF export behavior changed from 5.5.0.

# PDF Workbench — Milestone 5.5.0

Milestone 5.5.0 adds **inserted images as selectable annotation objects** on top of the stable 5.4.8 cross-device annotation/performance baseline. The existing Pen, Highlighter, partial Eraser, Select/lasso, session-only Undo/Redo, split-view, persistence, and dense-page performance behavior are intentionally retained.

## 5.5.0 image annotations

- A new **picture button** in the annotation strip opens the device image picker. On iPad this can be used with Photos/Files; Surface and Chromebook use their normal browser file picker.
- One chosen image is inserted on the active page, centered and proportionally scaled to fit comfortably.
- The inserted image becomes selected immediately and the toolbar switches to **Select**.
- Images participate in the existing selection model: move, proportional corner resize, Delete, Duplicate, Copy, Paste, lasso selection, mixed image+ink selections, Undo, and Redo.
- Image geometry is stored in the same unrotated page coordinate system used by editable ink, so page rotation, split view, page duplication, templates, and page-size/crop transformations can reuse the existing annotation infrastructure.
- Inserted image binaries are stored once as Local Library image sources and annotation objects reference those source ids. Duplicating/copying an image does not duplicate the binary payload.
- Library reopen, editable backup/restore, backup-as-folder import, Library PDF archive, template persistence, and persistent-source cleanup now understand image-annotation source references.
- On screen, inserted images are rendered on a dedicated layer **below** Workbench ink/highlighter. The partial Eraser continues to affect ink only and does not destructively erase image pixels.
- PDF export embeds inserted images below Workbench vector ink/highlighter. Structure-preserving compression can also downsample inserted image annotations using the selected image-compression profile.
- Untouched-PDF byte passthrough is disabled whenever a page contains an inserted image, just as it is for ink.

### Deliberately deferred from 5.5.0

- Cropping an inserted image.
- Independent image rotation.
- Pasting an image directly from the system clipboard.
- Opacity controls or other image editing.
- Layer-order controls (inserted images currently sit below Workbench ink/highlighter).

### Test priority for 5.5.0

1. iPad: insert from Photos/Files, then move and resize repeatedly with Apple Pencil; verify finger pan/pinch remains normal.
2. Surface and Chromebook: insert an image, move/resize/delete/duplicate/copy/paste it, including paste to a different page and document.
3. Lasso a mixed group containing handwriting plus an image; move and resize the group and verify proportional alignment.
4. Draw/highlight over an inserted image, then erase across that area. Ink should erase while the image remains intact.
5. Duplicate a page containing images, save it as a template with annotations, close/reopen the app, and verify the image returns.
6. Export generated, imported-PDF, and imported-image pages containing inserted images; compare screen and PDF placement, including rotated pages.
7. Back up the editable Library, restore/import it, and verify inserted image objects and their binaries survive.
8. Regression-test the 5.4.8 dense-page workload and later ask again about long-term performance in normal use.

## 5.4.8 cleanup after dense-page fix

- Durable Library document records now omit `history`/`future` fields entirely rather than writing empty arrays. Undo/Redo remains in-memory for the active app session and resets after a true restart.
- Existing closed Library records left by older builds are pruned once when Library metadata is refreshed, so legacy persisted Undo/Redo snapshots do not keep occupying IndexedDB storage merely because a document has not been reopened.
- Restoring an older editable Library backup or importing one as a folder now discards any legacy persisted Undo/Redo arrays before writing the records to the current Library.
- Removed the unused 5.4.1 `smooth:false` eraser-redraw plumbing and a dead eraser preview flag. Since 5.4.4, live erasing removes pixels directly from the already-rendered overlay while the Pencil is down.
- The exact dense-page annotation repaint after Eraser release is now deferred until the browser is idle. The live erased pixels remain on screen immediately, while the authoritative vector model is still committed synchronously on release. Cancelled eraser gestures still repaint immediately because their temporary pixel removal must be restored.
- Annotation autosave is now debounced to about 1.4 seconds after the last edit. A 5.4.7 diagnostic showed an 850 ms autosave beginning just before the next eraser gesture and finishing while that gesture was active; the longer idle window reduces that cross-gesture contention while lifecycle saves still protect suspend/close.
- The successful 5.4.7 compact in-session history representation, 5.4.6 live Highlighter batching, 5.4.5 Highlighter PDF cleanup, and 5.4.4 selection/eraser preview architecture remain otherwise unchanged.
- Pencil diagnostics are retained for Surface/Chromebook regression testing and later dense-page performance follow-up.

### Test priority for 5.4.8

Regression-test on Surface and Chromebook: Pen, Highlighter, partial Eraser, lasso move/resize/copy/paste, finger pan/scroll/pinch, split view, export, and restart/session restoration. Pay particular attention to whether there is still a pause immediately after releasing a dense-page Eraser swipe and whether rapid consecutive erase strokes remain smooth. After some normal real-world use, revisit dense-page responsiveness and decide whether the current 50-step in-session Undo limit needs a count/memory cap.

Milestone 5.4.7 is a dense-page history/persistence performance fix on top of 5.4.6. iPad stress testing showed that the eraser vector commit itself had become fast, but the whole UI could still freeze shortly after a gesture on a heavily annotated page. The cause was the Undo/Redo representation: each history entry cloned the entire page with thousands of `{x,y}` point objects, and Local Library autosave then cloned and persisted all of those snapshots again.

## 5.4.7 Dense-page history and autosave fix

- Undo/Redo point coordinates are packed into `Float32Array` pairs while stored in session history, sharply reducing object count, memory pressure, and garbage collection on dense pages.
- Local Library records now persist the current editable vector document state only; Undo/Redo history is session-local and is reset when the app is reopened.
- Existing 5.4.6 live Highlighter batching/composite commit, deferred Eraser vector commit, and autosave-during-gesture suppression are retained.
- Pencil diagnostics now record Local Library persistence start/finish and serialization/total timing so dense-page stalls can be correlated directly with autosave.
- No change to Pen smoothing, Highlighter appearance/export, eraser semantics, lasso semantics, raw editable points, split view, palm rejection, or PDF export.

### Test priority for 5.4.7

Repeat the dense-page iPad stress test. After filling/duplicating enough ink to make the page busy, verify that repeated Eraser strokes remain responsive and, especially, that toolbar/More buttons remain responsive about one second after the last edit when autosave normally runs.


Milestone 5.4.6 is a dense-page interaction scheduling refinement on top of 5.4.5. It keeps the same annotation data, Pen smoothing, Highlighter PDF-export simplification, selection semantics, and partial-stroke eraser semantics.

## 5.4.6 Dense-page live gesture scheduling

- **Local Library autosave no longer starts during an active annotation gesture.** Scheduled IndexedDB document cloning/serialization is postponed while Pen, Highlighter, Eraser, or Select is in contact. Explicit lifecycle saves are still allowed so suspension/restart safety is preserved.
- **Highlighter start no longer rebuilds the page.** The completed annotation canvas is already current, so a new live Highlighter stroke starts directly on its temporary layer.
- **Highlighter coalesced samples are batched.** One PointerEvent batch is drawn as one path instead of repeatedly querying the DOM and setting up Canvas state for every raw Pencil sample.
- **Finished Highlighter strokes are composited directly.** On release, the temporary live layer is alpha-composited into the persistent annotation canvas rather than rebuilding every annotation object on the page.
- **Highlighter and Eraser coalesced-point coordinate conversion reuses one page geometry measurement per PointerEvent**, avoiding repeated `getBoundingClientRect()` layout reads for dozens of samples.
- The 5.4.5 Highlighter PDF-export cleanup, 5.4.4 optimized lasso/eraser paths, and 5.4.3 duplicate-open repair remain intact.

### Test priority for 5.4.6

On iPad, repeat the dense-page stress test with many rapid Highlighter strokes followed immediately by Eraser passes. The key check is whether responsiveness remains stable late in the sequence rather than degrading after the page has accumulated many annotation objects. Also regression-test Pen, lasso move/resize, Undo/Redo, split view, PDF export, and restart persistence.

Milestone 5.4.3 was a focused iPad Highlighter responsiveness and Local Library consistency fix on top of 5.4.2. Pen smoothing, stored raw geometry, eraser behavior, selection, export semantics, and the proven cross-device input routing remain intact.

## 5.4.3 Highlighter live-layer + duplicate-open repair

- Live Highlighter no longer clears and redraws every existing page annotation on every Pencil move.
- The active Highlighter stroke uses a dedicated temporary canvas and is drawn incrementally with opaque internal geometry plus element-level opacity. That keeps one stroke uniformly translucent without dark sample joints while avoiding work proportional to the amount of existing handwriting on the page.
- On release, the live layer is removed and the completed Highlighter is committed to the normal persistent annotation overlay once.
- Completed on-screen Highlighter strokes are composited one stroke at a time through a reusable scratch canvas. This prevents tiny raw-sample backtracks from producing the darker circular “beads” seen in iPad screenshots; separate Highlighter strokes can still overlap and darken normally.
- PDF export is unchanged from 5.4.2: Highlighter remains one continuous raw polyline with round joins/caps and opacity; Pen remains smoothed.
- The 5.4.1 fast eraser redraw remains in place.

### Local Library/open-document repair

- `reopenLibraryDocument()` now rechecks whether a document became open after its asynchronous source load. This closes a race where two rapid/opening requests could insert two in-memory document objects with the same Library id.
- Open-document rendering and Library persistence also deduplicate any same-id objects left by an older build.
- When repairing an existing duplicate, Workbench prefers the object currently backing the active viewer; otherwise it prefers the newer/richer copy. This is intended to preserve live annotations rather than a stale clean duplicate.
- This prevents two same-name/same-id rows from sharing one checkbox and prevents multi-document export from producing two copies of what is logically one Library document.

### Test priority for 5.4.3

1. iPad: draw a long Highlighter stroke on a blank page, add substantial Pen writing, then draw another equally long Highlighter stroke. Live responsiveness should remain similar rather than degrading with page content.
2. Compare the completed top and bottom Highlighter strokes on screen; the dark circular sample “beads” should be substantially reduced or absent.
3. Export the page and verify the PDF still matches the intended continuous translucent Highlighter geometry.
4. Open the same Local Library document repeatedly/rapidly and verify only one open-document row exists; a pre-existing same-id duplicate should self-heal to one row.
5. Confirm Pen smoothing and the 5.4.1 eraser responsiveness are unchanged on iPad and Surface.


Milestone 5.4.1 is a focused performance fix for partial erasing on iPad after smoothing was introduced. During an active eraser gesture only, annotation overlays are redrawn from the stored raw polylines rather than recomputing all smoothed cubic paths on every Pencil move. On release, the page immediately returns to the normal 5.4.0 smoothed rendering. No annotation geometry, PDF export geometry, Pen/Highlighter sampling, selection behavior, or input routing is changed.

## 5.4.1 iPad eraser performance fix

- Active eraser redraws use raw polyline rendering as a transient preview.
- Eraser hit-testing and partial-stroke splitting still use the same raw vector points as before.
- Releasing the eraser immediately redraws all surviving annotations with the normal smoothed 5.4.0 curves.
- PDF export remains smoothed; no raw-preview geometry is exported.
- This specifically avoids repeatedly recalculating cubic control points for every annotation during high-frequency iPad Pencil erasing.

### Test priority for 5.4.1

1. On iPad, erase repeatedly on a page containing both Pen and Highlighter strokes.
2. Confirm the eraser tracks the Pencil responsively and surviving strokes return to their smoothed appearance on release.
3. Confirm the same behavior remains correct on Surface.
4. Continue watching for any Apple Pencil dropped contacts; the 5.4.0 diagnostic supplied for this investigation recorded all browser-visible stylus contacts as accepted, so no speculative Pen input change is included here.


Milestone 5.4.1 adds a first **handwriting smoothing** pass on top of the stable 5.3.0 Pen/Highlighter editing baseline. Every raw/coalesced stylus sample remains stored exactly as before; smoothing is derived only for screen rendering and PDF export so partial erasing, lasso manipulation, Undo/Redo, persistence, and future editing continue to use the unchanged raw geometry.

## 5.4.0 smoothing

- Pen and Highlighter strokes render as restrained continuous cardinal splines instead of straight line segments between every raw sample.
- The spline passes through the stored sample points and caps control handles relative to each raw segment, reducing polygonal corners without allowing large loops or overshoot away from editable geometry.
- Raw input points are **not replaced, filtered, simplified, or rewritten**. Existing documents automatically receive the smoother rendering without a data migration.
- Live Pen drawing remains incremental: each new sample finalizes the preceding cubic segment, leaving at most one raw-sample interval of visual tail latency rather than redrawing the whole page for every pen sample. The completed stroke is redrawn once at pen-up through the exact final smoothing path.
- Highlighter keeps its existing full-current-stroke redraw per pointer event to preserve uniform translucency; that redraw now uses the same smooth curve.
- PDF export writes the same continuous cubic path used by the on-screen completed stroke, with existing round caps/joins and Highlighter opacity.
- Partial Eraser and Lasso/Select continue to operate on raw stroke points. Because stylus samples are dense and spline handles are restrained, the rendered path stays close to that editable source geometry.
- No changes to Apple Pencil fallback, Surface/ChromeOS pen routing, palm rejection, finger navigation, PWA caching, session restoration, templates, automatic pages, or live pinch scaling.

### Test priority for 5.4.0

1. Compare rapid handwriting against 5.3.0 on iPad and Surface. Confirm the stroke follows the pen without a noticeable new delay and curves look less polygonal after pen-up.
2. Draw tight loops, sharp corners, dots, very short marks, and fast long strokes. Look for loops/overshoot or a visible jump when lifting the pen.
3. Mix Pen and Highlighter, erase through curved sections, then lasso/move/resize/duplicate/copy/paste the surviving objects.
4. Export mixed smoothed Pen + Highlighter content and compare Acrobat with the Workbench display, including erased gaps.
5. Recheck split-view live ink, pinch zoom, session restart, and installed iPad PWA update behavior. Chromebook remains a later compatibility check if unavailable.

## 5.3.0 highlighter

- Adds a contextual **Highlighter** tool beside Pen, with its own direct palette: yellow, pink, cyan/blue, and green.
- Adds three remembered Highlighter widths: 8 pt, 14 pt, and 22 pt; factory default is 14 pt yellow.
- Highlighter strokes are stored as ordinary vector annotation objects with `tool: highlighter` and 34% opacity. Raw/coalesced input samples are preserved just as they are for Pen.
- Live translucent drawing redraws the complete current highlighter path once per pointer event rather than compositing every translucent segment separately, preventing dark beads at sample joins while retaining coalesced points.
- The partial-stroke Eraser cuts Highlighter marks as well as Pen ink because both remain editable vector strokes.
- Lasso/Select treats Highlighter marks as normal whole objects, including move, resize, delete, duplicate, cross-page/document copy, and paste.
- PDF export preserves Highlighter color, width, geometry, and transparency. Selection/lasso UI remains non-exported.
- Highlighter has its own remembered state; switching back to Pen restores the Pen's last color/width, and switching back to Highlighter restores its own last color/width.
- The 5.2.2 live-pinch overlay scaling and 5.2.1 installed-PWA cache consistency behavior remain unchanged.

### Future new-document sizing request

For a later document-creation refinement, offer **Presentation canvas**, **slightly smaller than presentation canvas**, and **US Letter** as graph/blank page-size choices. Presentation-derived sizes should be computed from the current device's usable Presentation viewport rather than hard-coded, so a newly created page can closely match the area that will actually be displayed on that device.

## 5.2.2 live-pinch annotation scaling

- Resize every page canvas (PDF raster + annotation overlay) during live single-view and split-pane pinch zoom.
- Keep final crisp rerender behavior unchanged.
- No changes to pen sampling, eraser geometry, selection manipulation, palm rejection, session restoration, templates, or automatic new-page behavior.

## 5.2.1 installed-PWA cache-consistency hotfix
- First-party `styles.css` and `app.js` are referenced with the release version in their URLs.
- Service-worker installation fetches the release shell with `cache: reload` before placing it in the Workbench cache.
- This addresses the iPad installed-PWA symptom where the new Select button from 5.2.0 HTML appeared, but its lasso icon CSS and Select click handler came from older cached assets.
- Lasso behavior, pen/eraser input, palm rejection, session restoration, templates, automatic new pages, and export are otherwise unchanged.

## 5.2.0 lasso selection and object manipulation

- Adds a **Lasso / Select** tool to the contextual annotation toolbar. Pen/mouse input draws a lasso; finger input continues to pan/pinch through the existing stylus-aware touch routing.
- Selection operates on complete annotation objects. An intersecting/enclosed stroke is selected as a whole; the partial-stroke Eraser remains the fine-grained editing tool.
- A selected set receives a visible bounding box with four corner handles. Drag inside the box to **move** the group; drag a corner handle to **resize** it proportionally. Resize transforms the vector points and scales stroke width with the group.
- Contextual Select actions provide **Delete, Duplicate, Copy, and Paste**. Duplicate offsets an independent copy on the same page. Copy/Paste uses an in-app annotation clipboard and supports pasting to another page or another open document.
- Pasted annotations preserve their visual geometry and style, receive new object IDs, and become the active selection. Repeated same-page pastes are offset so copies are visible.
- Keyboard shortcuts while Select is active: Delete/Backspace deletes; Ctrl/Cmd+C copies; Ctrl/Cmd+V pastes; Ctrl/Cmd+D duplicates.
- Move, resize, delete, duplicate, and paste each create normal Undo/Redo history entries and persist/export through the existing vector annotation model.
- Selection and live move/resize overlays are mirrored into other rendered instances of the same page, preserving same-document split-view synchronization.
- Selection UI is a separate SVG overlay above the annotation canvas and is never included in PDF export.

## 5.1.1 contextual annotation toolbar

- Hand selected: Pen color/width and Eraser size controls are hidden.
- Pen selected: only Pen color and width controls are shown.
- Eraser selected: only Eraser size controls are shown.
- Tool buttons, Undo, and Redo remain available as before.


## 5.1.0 partial-stroke eraser

- Adds an **Eraser** tool beside Hand and Pen, with three direct eraser sizes: 12 pt, 24 pt, and 40 pt diameter. The last-used eraser size is remembered.
- The eraser removes only the touched portion of Workbench vector ink. Crossing a stroke splits it into surviving vector fragments rather than deleting the whole object or painting white pixels.
- Eraser geometry accounts for the visible stroke width so the resulting gap corresponds closely to the circular eraser footprint, including round-capped surviving fragments.
- Erasing is one Undo/Redo history action per eraser contact. The surviving fragments persist to Local Library/backups and export as ordinary vector ink.
- Same-document split panes redraw the edited annotation overlay live, so erasure is shared just like pen ink while pane view state remains independent.
- Viewer annotation rendering now uses a transparent annotation overlay canvas above the unmodified page raster. This allows erasure to reveal the original PDF/image/generated-page content immediately without rerendering the PDF for every eraser sample, and provides a cleaner base for later lasso/highlighter work.
- Apple Pencil's stylus TouchEvent fallback is generalized to both Pen and Eraser. Surface/ChromeOS remain on Pointer Events. Existing palm rejection and deliberate finger pan/pinch behavior apply to Eraser mode as well.
- A circular eraser cursor follows mouse/stylus hover over the page; the native Surface hover cursor remains suppressed.
- Pen sampling, raw stored point behavior, PDF pen export, session restoration, templates, and automatic end-page append are otherwise unchanged.

## 5.0.12 session restoration correction

- Session checkpointing now has a **startup hydration guard**. `bindEvents()` is installed before IndexedDB restoration, and browsers/PWAs can emit `visibilitychange`/`pagehide` events during startup. Those lifecycle events are no longer allowed to write the transient empty startup workspace over the previously saved session before restoration reads it.
- The synchronous checkpoint key is now `pdfwb-session-checkpoint-v2`, avoiding a possibly poisoned 5.0.11 transient checkpoint. IndexedDB session metadata remains the durable source and is compared with the v2 checkpoint after startup has hydrated.
- An empty saved workspace is authoritative only when explicitly produced by closing the last document or **Close all files**. A newer accidental empty session cannot override an older known non-empty session unless it carries that explicit-empty marker.
- Open/close/current-document/workspace-mode/split-layout changes checkpoint synchronously once restoration is hydrated; the existing throttled IndexedDB persistence remains in place for durability and document/view state.
- Startup restoration now attempts saved document IDs directly against IndexedDB instead of requiring the in-memory Library listing as a precondition. Missing or trashed stale IDs are ignored rather than disabling future session persistence.
- If Local Library startup fails and reconnects later, the app re-enters the restoration path instead of saving an empty workspace over the old session.
- The 5.0.10 input path, 5.0.11 clean/annotated templates, Template Manager default-last-page setting, and pull/scroll-to-append behavior are unchanged.

## 5.0.11 workspace restoration and automatic last page

- The open-workspace session is still stored in IndexedDB, but is now also checkpointed to a small throttled `localStorage` record. On restart, Workbench chooses the newer valid session record. `pagehide` and hidden visibility transitions force an immediate checkpoint, avoiding the shutdown race where the OS can terminate an installed PWA before the final IndexedDB session write commits.
- The restart snapshot includes open document IDs, active document, workspace mode, split/single layout, active pane, per-pane document assignments, and saved view state. Closing a document or **Close all files** still updates the checkpoint, so intentionally closed workspaces stay closed.
- Saving the current page as a template now offers **With annotations** or **Clean page (no annotations)**. Existing behavior remains the default.
- Template Manager now contains **Automatic new last page**. Choices are **Graph paper** (factory default), **Blank**, or any saved template. Graph/Blank match the dimensions of the preceding last page; a saved template retains its own dimensions.
- In Continuous/Page Snap view, scroll/pull into the end-of-document strip until it says **Release to add …**, then release to append exactly one page. Wheel/trackpad scrolling can trigger the same threshold. In Full Page mode, an additional forward swipe/wheel action from the final page appends one page.
- Automatic append uses the normal page-insertion/history path, so Undo/Redo, Local Library persistence, split-pane shared content, export, and template sources remain consistent.
- The 5.0.10 pen/palm/cursor pipeline is unchanged.

## 5.0.10 stable-input cleanup

- Keep the 5.0.8 Safari Apple Pencil `Touch.touchType === "stylus"` fallback and PointerEvent/TouchEvent deduplication.
- Keep the 5.0.9 ChromeOS palm suppression and deliberate one-/two-finger navigation admission logic.
- Keep Pen-mode native text-selection/callout suppression, geometric page hit-testing for retargeted starts, and pen-hover cursor suppression.
- Remove the 5.0.6 **move-start recovery** that could create a stroke from a contact-bearing `pointermove` when no stroke owned that pointer. Real strokes now start only from `pointerdown` or the Safari stylus TouchEvent fallback.
- Remove the 5.0.6 **pointerup-only dot recovery** so an unmatched pen `pointerup` can no longer invent an annotation dot.
- Restore **tip-only pen starts**: normal pen `pointerdown` must have `button === 0`. Cross-platform diagnostics showed ordinary iPad Pencil, Surface Pen, and ChromeOS stylus tips using button 0; non-tip/barrel-button starts are suppressed and diagnostic-logged instead of drawing.
- Diagnostics remain available for the next annotation-tool phase.


Milestone 5.0.9 keeps the successful 5.0.8 pen-input architecture intact and focuses on two cross-platform input/UI issues found in broader hardware testing: ChromeOS palm contacts causing the viewer to jump while writing, and the distracting crosshair/plus cursor shown while a Surface Pen hovers over the PDF.

## 5.0.9 ChromeOS palm suppression

- The 5.0.8 Chromebook diagnostic showed ChromeOS reporting a resting palm as a rapid burst of many ordinary `pointerType: "touch"` contacts while Pen mode was active.
- In Pen mode, one/two-finger navigation now has a short 120 ms intent window before pan/pinch begins. This gives a 3+ contact palm burst time to identify itself before the page is moved.
- Three or more contacts during that pending window classify the gesture as palm and suppress it until those contacts lift.
- When the platform exposes pen hover/in-range or a recent pen contact, new touch contacts are also treated as probable palm contacts.
- Once a deliberate two-finger navigation gesture has been accepted, extra contacts are ignored instead of redefining the gesture.
- Hand mode keeps the previous immediate one-finger pan / two-finger pinch behavior.
- The existing 5.0.8 Apple Pencil PointerEvent + stylus TouchEvent ink path is unchanged.
- Diagnostics remain enabled and now include `palm-touch-suppressed`, `touch-navigation-intentional`, and `extra-touch-ignored-during-navigation` records so Chromebook behavior can be checked directly.

## 5.0.9 Surface Pen hover cursor

- A real `pointerType: "pen"` hovering over a viewer now hides the browser cursor on the PDF surface.
- This removes the distracting plus/crosshair seen with Surface Pen hover.
- Normal mouse behavior remains available for desktop testing.

## 5.0.8 Apple Pencil contact fallback

- Pointer Events remain the preferred ink input.
- Safari Touch Events are watched only for touches explicitly identified as `stylus`.
- If a stylus TouchEvent arrives for a contact that has no active pointer-owned stroke, it can supply the missing stroke.
- If both event streams arrive, one owns the stroke and the other is shadowed to avoid duplicates.
- Diagnostic download remains available and now records the stylus-TouchEvent fallback path too.

## 5.0.8 More-menu stacking fix

- The app bar now owns a stacking context above the annotation toolbar, allowing its fixed More popover to render in front rather than behind.

## 5.0.8 iPad / Apple Pencil Pen-mode selection suppression
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
- Recolor selected strokes
- Annotation-toolbar auto-hide/edge-placement setting
- Draw with Finger setting
- Pressure-sensitive width

## Storage/versioning
- IndexedDB database version: **2**
- Library schema version: **6** (page annotations can reference inserted-image source records)
- Editable backup format version: **1**
- Service-worker cache: `pdf-workbench-m5.5.2-v1`

## High-priority smoke tests
1. On iPad, Surface, and Chromebook, draw several separate strokes, choose Select, lasso one stroke and then a group. Verify the selected objects get one bounding box and that unselected strokes remain untouched.
2. Drag the selected group to move it, then resize from each corner. Undo/Redo both operations and verify the geometry and stroke widths return correctly.
3. Test Delete, Duplicate, Copy, and Paste. Paste once on the same page, once on a different page, and once into another open document. In split view, verify edits to the same page appear in both panes.
4. Export after move/resize/delete/duplicate/paste and confirm Adobe Acrobat shows only the resulting vector ink, with no lasso/bounding-box UI.
5. On each device, draw several long and short crossing strokes, choose each Eraser size, and erase through the middle of strokes. Confirm only the touched portions disappear, surviving fragments remain, and Undo restores the original stroke in one step. Test a dot/very short stroke as well.
6. Erase in one pane while the same page is visible in the other split pane; confirm both panes update. Export the erased page and confirm the gaps remain in the PDF.
7. On iPad/Surface/Chromebook in Eraser mode, rest the palm naturally and verify deliberate finger pan/pinch still works when the stylus is away.
8. On Surface, open a PDF, choose Pen, hover the pen over the page and confirm the browser crosshair/plus cursor is hidden. Write at several zoom levels, switch colors and widths, then use Undo/Redo.
9. On Chromebook in Pen mode, rest the palm naturally while writing. Confirm the page no longer jumps or repeatedly changes zoom. Then move the pen away and deliberately test one-finger pan and two-finger pinch; both should still work after the brief intent delay.
10. Repeat with Apple Pencil on iPad for several lines of handwriting. Confirm the native **Copy / Look Up / …** selection callout never appears on toolbar, footer/status text, or page/PDF text; confirm deliberate finger navigation still works when the Pencil is away.
11. Switch between View and Presentation. Confirm the annotation controls stay in the same order and Presentation's full-width bar remains at the top without covering the page.
12. In split view, show the same document in both panes at different pages/zoom positions. Write in one pane; verify view states remain independent and shared ink appears correctly when the same annotated page is visible.
13. Relaunch the app with several documents open (including split view) and confirm the open workspace, active document/pane, and viewer positions restore. Then use **Close all files**, relaunch, and confirm the active workspace stays empty while Library documents remain available.
14. Back up on one device and restore on another; confirm ink survives the editable backup.
15. Export an annotated PDF and inspect it in Adobe Acrobat or another viewer. Check placement, color, width, rotation, and file size.
16. Re-test the previously problematic slide deck unchanged; it should still export byte-for-byte. Add a short pen stroke and export again; the file should remain reasonably sized.
17. Save one template **With annotations** and one **Clean**; confirm their previews/content differ correctly. In Template Manager set the automatic last page to Graph, Blank, and then a saved template, and test pull/scroll-past-end creation for each.
18. Rotate an annotated page and, separately, try Page size and Crop/margins after ink to verify stroke alignment remains sensible.
**More → About this build** reports **Milestone 5.5.2**.

- Selection action icons now replace the text labels for Delete / Duplicate / Copy / Region / Paste, with full tooltip and aria labels preserved.
- Presentation-mode temporary Files round trips (Assets / Template Manager) no longer exit and re-enter Presentation, which removes the visible blip when going to Files and back.


## 5.7.21 dropdown consistency

- The **Automatic new last page** dropdown under Files → Templates now uses the same standard Files select styling as the New-document and other dropdown controls. Behavior is unchanged.


## Milestone 5.7.21 — editable 90° selection rotation

- Select now includes a compact clockwise-rotate action. One tap rotates the entire current selection 90° clockwise around the selection center.
- Ink and Highlighter remain editable vector/stroke annotations; their stored points are transformed rather than rasterized.
- Image annotations remain editable image objects. A quarter-turn rotation field preserves orientation through movement, proportional resize, copy/paste, Assets/snippets, Local Library persistence, Undo/Redo, and PDF export.
- Mixed selections rotate as one group. No Pen, touch, pinch, or viewer-navigation machinery was changed.


## Milestone 5.7.21 — Local Library multi-file export
- Local Library document cards now have export-selection checkboxes.
- Multiple Library files can be exported directly without opening them first; one selected file exports as PDF, multiple selected files export as a ZIP of PDFs.
- Existing folder PDF export behavior is unchanged.


Milestone 5.7.21: Selected Documents now has the same boxed Files-panel styling as Open Documents while remaining collapsible. No behavior changes.


## Milestone 5.7.21 — preserve export filenames

- Ordinary PDF export now suggests the document’s current Workbench/Local Library filename exactly (subject only to filename sanitization / adding `.pdf` when absent).
- Multi-document PDF ZIP export uses each document’s current filename instead of adding `-edited`. If selected documents have duplicate names, later collisions are named `Name (2).pdf`, `Name (3).pdf`, etc.
- Compression and Extract keep their existing `-compressed` and `-selected` suffixes because those outputs are intentionally derivative files.
- PDF generation, annotation handling, selection behavior, and folder export are unchanged.
