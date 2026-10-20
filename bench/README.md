# PDF Workbench 5.8.62-exp

## Milestone 5.8.62 — persistent backup checkpoint diagnostics

- iPad 5.8.61 completed staging the entire Library PDF archive. The diagnostic breadcrumb records `library-pdf-archive-stage-ready`, followed by `library-pdf-archive-download-requested`, then a visibility/background transition and a fresh app runtime. The archive construction did not fail; whether the downloaded archive was saved outside Workbench must be verified separately. A short following restore also restarted.
- Full editable backup still caused an almost immediate restart. The most recent saved diagnostic immediately before that attempt is present, but the post-restart runtime history contains an earlier breadcrumb rather than that immediately preceding runtime. Thus the exact backup failure phase is unknown; do not claim a worker or memory root cause without additional evidence.
- Added a **small independent backup phase journal** in localStorage and the already-existing IndexedDB `meta` store at major phase boundaries, separate from the rolling runtime breadcrumbs. The header of newly saved Diagnostics contains `editableBackupCheckpoint.local` and `.durable`, with attempt ID, phase, completed/total count, bytes, and a short error (if known). Worker source progress checkpoints are throttled to avoid extra per-file IndexedDB writes.
- **Diagnostic-only:** editable ZIP construction, PDF export, downloading, PDF rendering, worker limits, Library schema, and restore formats are unchanged. Full editable backup on iPad is **not fixed** by 5.8.62. Recommend obtaining a full editable backup on Windows until iPad root cause is proven. One carefully recorded iPad test, if desired, should be followed by Diagnostics; do not repeatedly crash-test the active grading Library.

# PDF Workbench 5.8.61-exp

## Milestone 5.8.61 — bounded whole-Library PDF export + early editable backup diagnostics (experimental)

- 2026-10-19 iPad 5.8.60 diagnostics show a ~145-second full Library PDF export terminated while source loading was still occurring. It had completed successive file-operation source releases; the code nevertheless retained every finished PDF in JSZip until ZIP finalization. This is a credible cumulative memory-pressure cause, but no native memory exception was captured.
- iPad **whole-Library PDFs** now use a disk-staged standard ZIP worker. Main app builds one PDF at a time, transfers its finished bytes to `pdf-archive-worker.js`, waits for the worker to write it directly to an OPFS file and acknowledge, releases its PDF source, then starts the next document. The writer uses 256 KiB chunks, periodic flushes, ZIP STORE, and validates the completed size. Names and Library folder paths are preserved; duplicate names in the same folder get a numbered suffix instead of being silently overwritten. Empty folders remain represented.
- After a successful iPad preparation, the Files > Backup & transfer panel offers **Download prepared PDF archive** and **Discard prepared PDF archive**, mirroring the editable backup's two-step transfer. The completed file survives a restart; writing a new archive uses the other of two slots so the previous prepared copy remains until a new one completes. A system download can itself induce an iPad PWA reload, which does not imply archive preparation failed. Windows full-PDF export still uses the original JSZip path.
- The **editable backup failure in 5.8.60 remains unexplained**: the newly provided post-restart snapshots do not preserve the worker's first error. Add synchronous pre-stage diagnostics at initial request, opening staging storage, Library save, metadata read, worker creation, and worker dispatch, so an immediate iPad restart has a chance of leaving a precise breadcrumb. Do not claim editable full backup is fixed by 5.8.61; the underlying worker writer and backup format are unchanged.
- Keep strict two-managed-iPad-PDF-worker limit and all Split, Files, preview and annotation fixes. No Library schema or ZIP/restore format changes. Live iPad test required; avoid repeatedly attempting whole-Library exports if iPad restarts. Test full PDF archive preparation and download separately from editable backup, saving Diagnostics promptly on failure.

# PDF Workbench 5.8.60-exp

## Milestone 5.8.60 — iPad full editable backup memory protection (experimental)

- Two 2026-10-19 iPad attempts at full editable backup ended in a white-screen WebKit restart. Captured diagnostics establish multiple distinct runtimes and ~500–615 MB of origin storage, but no native out-of-memory exception or exact backup phase. The old function used bulk `getAll(sources)` plus JSZip DEFLATE, accumulating all source copies and the output ZIP in JS memory.
- On iPad only, generate the same format-version-1 editable backup as **incremental uncompressed ZIP** into Origin Private File System (OPFS), loading only one IndexedDB source at a time and writing it in 1 MiB chunks. A standard ZIP data-descriptor + central-directory writer avoids keeping either input sources or finished archive in JS memory. Desktop retains its prior JSZip path. iPad browsers without the necessary OPFS writer fail with a descriptive message rather than falling back to the unsafe bulk path.
- Completed iPad backup remains in persistent staging storage. `Download prepared backup` is a separate deliberate user tap, available after relaunch; the app cannot claim a usable off-device backup until the user saves it externally. A second staged backup is written to the inactive of two slots, preserving the previous completed one until the replacement finishes. `Discard prepared backup` reclaims this storage without deleting Library documents.
- Added `editable-backup-stage-*` and `editable-backup-download-*` diagnostic phases to capture the last completed part before a WebKit process kill. No Library schema, editable-backup manifest format, or restore/import interpretation changed. **Live iPad check required**: full staged backup, Download into Files, verify ZIP/restore on a second environment; reload and retry Download; verify no white-screen restart during staging.
- Diagnostics export still opens iPad system download/share UI. New startup/Library restoration after export is consistent with a PWA process restart rather than a deliberate `refreshLibraryRecords()` call, but it remains to be verified from the next saved diagnostic archive. Do not conflate it with full backup staging.

## Milestone 5.8.60 — Split View template-worker residency fix

- 2026-10-19 iPad diagnostics from 5.8.56 captured a Split View starvation loop: a third persistent PDF source (not in either visible pane) occupied one of the two managed PDF workers. The visible ReTest2 and Kelly Rodriguez sources repeatedly replaced each other in the remaining slot, causing persistent “No managed iPad PDF worker slot is available” rendering errors. This is not scan corruption.
- Root cause: saved template PDFs were eagerly loaded at startup and treated as non-evictable even when no displayed document needed them. A saved template retains its source bytes in IndexedDB, and the template preview / insertion renderer already lazily reloads persisted source bytes when used. Merely being a saved template must not pin a live PDF.js worker.
- Stop eager PDF source preload when restoring saved templates; let template previews/insertions load on demand. In the viewer/file-operation capacity sweep, delayed residency sweep, Split outgoing-source retirement, and PDF source retirement, allow an **inactive template-only PDF source** to be released. **Never** release a source referenced by either visible Split pane or the active Single View document. Existing active-render wait/cancellation and single-flight source-retirement safeguards stay in place.
- Add `templateOnlyCandidates` to `viewer-preload-capacity` / `file-operation-preload-capacity` for easier diagnosis. Keep the strict two-managed-worker iPad invariant, PDF.js raster limits, worker reuse/recycle, Files → View fix from 5.8.56, and all Library/annotation/export formats unchanged.
- Static and focused regression tests check that idle template sources are evictable, source references needed by visible panes remain protected, templates still load lazily, and the two-worker invariant is unchanged. **Live iPad validation required**: Open → View on scanned PDFs, Single → Split with two scanned PDFs, scroll both panes, return to Single, and open saved template previews if used.

# PDF Workbench 5.8.56-exp

## Milestone 5.8.56 — First-view iPad PDF worker handoff

- Addresses repeated first-render failures when switching from Files/Open into Single View while both managed iPad PDF worker slots were still occupied. 2026-10-19 diagnostics show the initial render error within ~10-20 ms, followed by old-source release ~0.4 seconds later and successful scroll-based retry.
- Before hydrating a newly requested persisted PDF when both pooled worker slots are busy, synchronously retire only non-visible, non-template-owned persisted PDFs. Keep the strict two-worker invariant and existing Split-pane retirement behavior.
- Serialize retirement of the same PDF source between the delayed residency sweep and this preload path; avoid overlapping PDF.js destroy calls.
- New `viewer-preload-capacity` diagnostic records the release count and worker pool when viewer preloading needs to retire inactive PDFs. Normal operation, memory caps, exports, and annotations are unchanged.

## Milestone 5.8.55 — Experimental separate PDF export via system sharing / folder save

- In Files → Selected-document tools → Export, multi-document selections now offer **One ZIP containing separate PDFs** (unchanged default) or **Separate PDFs — share or save to folder**. Single-document PDF export is unchanged. The shared selected-document set, per-document page order/edits, PDF builder, and source retirement are reused.
- Separate-file export first prepares each selected PDF independently, with existing per-document pdf-lib cache cleanup and PDF.js source release; then shows a **Share PDFs…** control invoking `navigator.share({files:[...]})` from a fresh tap and/or **Save PDFs to folder…** using `showDirectoryPicker` when available. Destinations are supplied by the OS/browser, not custom Goodnotes/Drive integrations. Native file-share success hands the files to the target app; Workbench cannot certify final storage in that app.
- A **Download as ZIP instead** fallback packages already prepared PDFs; **Discard prepared PDFs** drops their in-memory data. The prepared set is invalidated when selection/output mode changes or Files is left. Separate preparation has a conservative 16-document / 64-MiB finished-PDF limit; larger batches should use existing ZIP export.
- Windows Chrome/Edge can expose Save to Folder; iPad PWA should expose Share PDFs when Web Share with multiple PDF files is permitted. Capabilities are checked at runtime, and a blocked/canceled handoff leaves prepared PDFs available for another method.
- No Library schema, rendering architecture, worker-pool, editable backup, or ZIP output changes. Live iPad and Windows behavior, especially multi-file targets in the share sheet, **requires real-device validation**.

## Prior milestone 5.8.54 — Presentation thumbnail Back

- Following a thumbnail jump in Presentation now exposes a **Back to page N** command in a fixed row above the thumbnail list; the command stays accessible even when the list scrolls to a distant page. It is hidden until a jump creates a usable return location.
- A single use returns to the prior page and viewing position (including zoom when changed), and consumes the return location. Only direct thumbnail jumps create it; regular scrolling and page-next do not create history. A new thumbnail jump replaces the previous return location rather than accumulating history.
- In Split, the return is valid only for the originating active pane and document, and does not rebuild or move the other pane. Leaving Presentation or changing layouts clears the location. The Back location is runtime-only, not Library/session data.
- Page selection, rendering constraints, editable formats and diagnostics remain unchanged. iPad/Surface interaction tests are still recommended.

## Prior milestone 5.8.53 — Current viewed page in Pages

- Pages now displays a subtle green inset outline around the current viewed page thumbnail, distinct from the blue page-selection outline. The indicator does not select or deselect anything; the page remains available for regular selection/reorder operations. A screen reader can identify it with `aria-current="page"`.
- The page identity follows the viewer's current page (active Split pane when applicable). On entry to Pages, the thumbnail grid scrolls only when needed to bring the current thumbnail into view. Normal selection/reorder refreshes do not force the scroll position.
- No changes to PDF rendering, worker pool, page data schema, selection state, annotations, or editable backup formats. The separate Presentation thumbnail Back command was implemented in 5.8.54.

## Prior milestone 5.8.52 — Presentation help and Diagnostics menu simplification

- Quick Start includes entry to Presentation mode and the customizable toolbar.
- The searchable Feature Guide now places **Presentation mode (Present)** and **Customize the Presentation toolbar (Tools menu)** directly after View/Split, with instructions for opening the wrench menu, activating tools, and showing/hiding buttons by checkbox. Visibility choices persist on this device.
- Removed the redundant **Download diagnostics** command from the top-right `…` menu. Diagnostics are still saved with the prominent button under Files (also available from View/Presentation), then exported/cleared from Files → Advanced / Recovery. The underlying diagnostic capture, saving and export paths remain unchanged.
- No viewer, page, annotation, Library schema, worker, backup/export format or other file operation changes.

## Prior milestone 5.8.51 — Files UI Stage 3: controls and in-app help

- View and Presentation use the same Single View / Split View action icon and accessible label. Presentation's Tools menu displays the action that a click will perform.
- Local Library, Open Documents, and Pages use consistent Select all / Select none labels, with tooltips clarifying the scope. Clear selection still acts on the whole shared Files selection.
- Under the top-right ellipsis: Quick Start, searchable and expandable Feature Guide, and a user-facing About PDF Workbench screen. Help is bundled locally; no new network service or Library schema is required.
- About now describes features, on-device storage, backup guidance, the installed version and how to check for updates. It is written for everyday users rather than a developer/testing audience.
- No PDF viewer engine, worker, document schema or backup format changes.

## Prior milestone 5.8.50 — Files UI Stage 2: organization and discovery

Based on the user-tested 5.8.49-exp build. All change is UI/navigation code:

- **Library name search:** Search document and folder names throughout the active Library, regardless of the displayed folder. Results show their containing path. Search is case-insensitive, does not index PDF contents, and excludes Trash. Opening a result folder clears the search and shows that folder. Clearing search returns to the previous folder.
- **Selection:** While searching, Select all / Select none applies to the matching documents (not folders), with the same global Selected documents set. The Search summary shows result counts. Search does not create a new selection model.
- **Files groups:** Selected-document tools (Export, Compress, Combine) and active-document tools (Extract, Split) are labeled separately. Templates, Assets, and Images to PDF retain their positions and behavior.
- **Backup & transfer:** Shortened explanations; the controls distinguish whole-Library PDF export, editable Library backup, replace/restore, import-as-folder, and experimental merge. The duplicate selected-editable-backup button was removed from this section; the Selected documents command remains and calls the existing implementation.
- **Advanced / Recovery:** Renamed from Storage & reset; saved Diagnostics export/clear moved here. The prominent Files Diagnostics button remains.
- **Clutter:** Removed the visible build/milestone kicker and long roadmap note from Files. Version/build information remains under About; no changes to About or diagnostics formats.
- **New and navigation:** Search is cleared after creating a new document so the newly created item is visible in the current folder. The Stage 1 New default continues to create a closed graph-paper document and stay in Files.

Preserve the existing shared selection, database schema, PDF workers/raster caps,
viewer/page behavior, and all export and backup formats.

### Checks and device tests

JavaScript syntax, release version consistency, unique HTML IDs/section grouping,
and focused JS logic checks for name search, location path, search-scoped selection,
folder-scoped selection, and single/multi action visibility passed. This environment
blocked direct Chromium page navigation by administrator policy, so browser layout
and complete click-flow tests were not available here. **Test on iPad and Surface**:
searching across nested folders; selecting from results; opening a matching
folder (which clears search); searching then creating New; full-Library Export,
Backup/Restore/Import; and a normal Split grading session. Do not perform a
real Restore/Delete merely to test labels unless using a disposable Library.

### Next planned work (Stage 3; not implemented here)

Unify Single/Split action icons across View and Presentation, finish wording and
Select all/none consistency, add a short task-oriented Quick Start under `…`,
and a searchable/expandable Feature Guide. Stage 2 validated in ordinary use; validate Stage 3 on devices before new features.

---

## Milestone 5.8.49 — Selection-aware Files commands

When two or more documents are selected in Files, the three single-document
commands in **Selected documents** (**Open in View**, **Rename**, and
**Duplicate**) disappear instead of remaining disabled. When exactly one
file is selected, they return, enabled. When no files are selected, they
remain visible but disabled, as before.

The multi-document controls are unchanged. This is strictly a toolbar-display
change; no document operation, persistent storage, renderer, worker, Library
schema, or export/backup format was modified.

### Test

Select zero, one, two, then one document, using both the Local Library and
Open Documents checkboxes. Confirm the three commands hide for two or more,
reappear when the selection returns to one, and that other commands remain
available according to their existing rules. Live iPad and Surface testing is
still required.

---

# PDF Workbench 5.8.48-exp

## Milestone 5.8.48 — Files workflow, Stage 1

Built on 5.8.47 without changes to the rendering, worker, IndexedDB schema,
source persistence or editable-backup formats.

- Library breadcrumb keeps the current folder at the end. Narrow toolbars hide
  older ancestors behind a tappable ellipsis; full paths remain visible when space allows.
- Local Library now contains the split **New** control. One tap creates white
  presentation-ratio graph paper in the **current folder**, stored immediately
  as a **closed** editable Library document. **Files stays open** and the
  active working/View/Split setup is untouched. The new item is selected and
  Selected documents expands so it is easy to View or operate on it.
- The dropdown offers Blank document…, Custom document…, Folder, From
  template…; the former New settings panel is now a subordinate, collapsed
  New document options panel. Its default size is Presentation Ratio.
- Selected documents is above Open documents and is the action center for the
  shared selection: Open, View (one item), Close, Move, Export, Compress,
  Combine, Trash, selected editable backup, Rename/Duplicate (one item), and
  Clear selection. Commands reuse the existing Library dialog and PDF tools.
- Open vs View labeling is clarified: Open remains in Files, View goes to View.
- Scoped Select all / Select none remains in Library and Open documents.
- Current-folder counts appear in the Local Library summary for nested folders.

### Manual checks

1. In Files create a deep nested folder path, test the breadcrumb at wide/narrow
   screen sizes, and open hidden parents using ellipsis.
2. Tap **New** within a folder: expect a **closed**, selected white presentation
   graph-paper document in that folder. Files stays visible; no pane changes.
3. Test Blank document… and Custom document… with both page sizes/backgrounds;
   their created documents should likewise stay in Files.
4. Check items in Library and Open documents: the single shared selection must
   stay synchronized, and Selected documents should auto-expand on new selection.
5. Use Selected commands, including Open (stay Files), View (leave Files), Move,
   Close, Export, Combine, and editable backup. Verify single-only buttons enable
   only for one selected file and Combine only for two or more.
6. Confirm iPad long-startup restore precedence, Split grading, worker limits,
   existing exports, and restoration remain unchanged.

---

## Prior 5.8.47-exp notes

## Milestone 5.8.47 — coordinated startup restore

5.8.47 is a narrow startup/lifecycle coordination fix built directly from 5.8.46. Diagnostics from 2026-10-18 showed that an iPad Local Library restore could take more than 20 seconds across IndexedDB retries. During that window the user could already enter Files and begin working, while a separate pageshow/resume path could also start Library recovery work. When the delayed saved session finally reached UI reconstruction, it could move the workspace back to the previously saved mode underneath the user.

### Changes

- Startup restoration now owns one explicit lifecycle gate from the beginning of `init()`, before pageshow/visibility resume handlers can run.
- `resumePersistentLibraryConnection()` records `library-resume-blocked-during-startup` and does no reconnect/refresh work while startup restoration or an automatic startup retry is in progress.
- Trusted pointer/keyboard/click activity during a delayed startup restore records that the user has begun working.
- Once the user has interacted, the saved session may still restore documents, pane assignments, page/view state, and Library data, but it may **not replace the current workspace mode** (View / Pages / Files).
- Adds `library-startup-user-interaction` and `library-startup-workspace-restore-suppressed` diagnostics so a late restore can be distinguished from an ordinary saved-workspace restore.
- Startup status begins as **Starting…** rather than briefly presenting a misleading Ready state before Library recovery begins.

All 5.8.46 folder/ZIP/resume reliability work, 5.8.44 export/skipped-render recovery, 5.8.43 Split Close/selection fixes, 5.8.42 watchdog-worker recovery, persistent two-worker architecture, rendering limits, annotations, graph tools, and Library formats are preserved.

### Validation

1. Launch on iPad with a saved View/Split session and a populated Local Library.
2. If startup restoration is slow, deliberately enter Files and open the New section before restoration completes. Workbench may finish restoring documents in the background, but it must remain in Files.
3. Save Diagnostics. A pageshow/visibility resume during startup should produce `library-resume-blocked-during-startup`, not a second Library refresh.
4. If the user interacted before session restore completed, expect `library-startup-workspace-restore-suppressed`.
5. Relaunch without interacting during startup and verify that the saved workspace mode still restores normally.

---

## Prior 5.8.46 notes

## Milestone 5.8.46 — lighter Library mutation/import/resume

5.8.46 is a focused Files/Library reliability pass built directly from 5.8.44. The intervening 5.8.45 experiment was not adopted. Diagnostics from 2026-10-18 showed repeated iPad restarts around moving a folder to Trash, a restart after a PDF-folder ZIP import that nevertheless committed all imported PDFs, and expensive Local Library refresh work after returning from the system download/share UI used by Diagnostics export.

### Changes

- **Folder → Trash no longer performs two full Library persistence passes plus a full records reread.** It now saves only changed open documents, updates the folder/document subtree in one IndexedDB transaction, waits for any open-document source/worker releases, checkpoints the small workspace session, and rebuilds Files once.
- Adds `library-folder-trash-start`, `library-folder-trash-finish`, and `library-folder-trash-error` diagnostics.
- **PDF-folder ZIP import no longer rereads the entire Library after the last file.** Each imported document/folder already updates the authoritative in-memory Library maps. The JSZip archive reference is dropped and a recovery pause is allowed before one Files refresh.
- Adds `library-zip-import-start`, `library-zip-import-finish`, and `library-zip-import-error` diagnostics.
- **Returning from a normal iPad Files/download/share handoff no longer refreshes every Library record when the existing IndexedDB connection is healthy.** A tiny ping confirms the connection, then Workbench keeps the current in-memory Library. Full refresh is reserved for an actual reconnect.
- Temporary `visibility:hidden` handoffs now use the document-only persistence path. `pagehide` still retains the full persistence path for a real unload/exit.
- **Diagnostics export is not intended to restore the Library.** On iPad, multi-snapshot diagnostics ZIPs now use STORE rather than DEFLATE to avoid a compression CPU/memory peak immediately after a crash. Desktop keeps DEFLATE.
- Adds `library-resume-healthy-no-refresh`, reconnect-refresh, and diagnostic-export timing events.

All 5.8.44 export-worker capacity and skipped-render recovery, 5.8.43 Split Close/selection fixes, 5.8.42 watchdog-worker recovery, persistent two-worker architecture, rendering limits, annotations, graph tools, and Library formats are preserved.

### Validation

1. Move a folder containing several documents to Trash from Files. It should complete without a restart and without an extended Library rebuild.
2. Import a ZIP containing several PDFs. After the last PDF is committed, Files should refresh once and remain responsive.
3. Export saved Diagnostics. Returning from the system download/share UI should not display a fresh Local Library restore when the runtime and IndexedDB connection are still healthy.
4. Save Diagnostics after these workflows; look for the new folder-trash, ZIP-import, resume, and diagnostic-export events.
5. Continue ordinary grading. No deliberate crash stress is needed.

---

## Prior 5.8.44 notes

# PDF Workbench 5.8.44-exp

## Milestone 5.8.44 — iPad export worker capacity + skipped-render recovery

5.8.44 is a narrow reliability revision on top of the classroom-stable 5.8.43 build. A later iPad grading session completed smoothly overall but exposed two independent state/lifecycle bugs: selected-PDF export could fail when both managed live PDF workers were still occupied by Split documents, and fast Split scrolling could leave queued pages permanently marked “Rendering…” after their render jobs were correctly skipped as stale.

### Changes

- **Files/PDF operations free inactive iPad viewer-worker capacity before hydrating their target document.** When Export/Compression/Combine is entered from Split, an inactive persisted PDF can still own one of the two managed PDF.js workers even though its pane is hidden. 5.8.44 cancels stale work for genuinely inactive sources and retires them before loading the file-operation target. This preserves the strict two-worker invariant without creating an unmanaged third worker.
- Adds `file-operation-preload-capacity` diagnostics with released-source count and worker-pool state.
- **Skipped queued viewer renders no longer strand a page in `data-rendered="loading"`.** On iPad, the one-at-a-time queue can receive several intersection requests while the user scrolls quickly. If a page leaves the viewport before its queued job starts, the job correctly skips—but 5.8.43 left the stage marked loading, so IntersectionObserver would never request it again.
- Both Split and Single viewers now reset a skipped/cancelled loading stage. If it is still visible/current, one render is explicitly re-armed; if it is offscreen, a later intersection can request it normally.
- Adds `viewer-render-skip-reset` and `skipped-render-rearm` diagnostics.

All 5.8.43 faster Split Close and Files-selection synchronization, 5.8.42 watchdog worker recovery, 5.8.41 scanner-safe thumbnails, 5.8.40 Split→Single state transfer, 5.8.39 startup/export memory work, persistent worker architecture, raster limits, annotations, graph tools, and Library formats are preserved.

### Validation

1. From Split, go to Files, select several documents, and Export PDFs as ZIP. Export should not report “No managed iPad PDF worker slot is available.”
2. Save Diagnostics after export; if an inactive viewer source occupied a slot, expect `file-operation-preload-capacity` before the target source loads.
3. In Split, scroll a multi-page PDF quickly enough that pages enter/leave the prefetch region while other pages are rendering. No page should remain indefinitely on “Rendering…”.
4. If a queued page is skipped because it left the viewport, diagnostics should show `viewer-render-skip-reset`; returning to that page should render it without requiring a Split↔Single rebuild.
5. Continue normal grading. No deliberate crash stress is needed.

---

## Prior 5.8.43 notes

# PDF Workbench 5.8.43-exp

## Milestone 5.8.43 — faster Split Close + Files selection synchronization

5.8.43 is a focused workflow revision on top of the classroom-stable 5.8.42 grading build. A full iPad grading round completed without a crash, but diagnostics confirmed two avoidable UI costs: closing one document in Split rebuilt both pane viewers, and a Library checkbox could appear checked while the shared Selected Documents state still said no documents were selected.

### Changes

- **Close in Split rebuilds only the pane(s) whose document assignment changed.** The unchanged pane keeps its existing DOM/canvas/PDF render instead of being torn down and decoded again.
- Close now uses a **documents-only durability save before removal**. It no longer performs a second full Library save and full Library-record reread after every Close.
- The post-Close workspace/session is checkpointed synchronously to localStorage and mirrored as the tiny IndexedDB session record without blocking the viewer.
- Adds `close-open-document-complete` diagnostics with total close time and the pane IDs actually rebuilt.
- Library/Open/Selected document checkboxes reconcile the shared selection on **click/input/change/blur**, rather than depending only on `change`. This hardens the UI against the iPad/WebKit case where the visual checkbox toggles but `change` is missed.
- In Files, **Select all** now toggles to **Select none** when all documents in that section's scope are selected:
  - Local Library: current folder only.
  - Open Documents: currently open working set.
  - The existing **Clear** action remains available for clearing the broader/global selection.

All 5.8.42 watchdog-worker recovery, 5.8.41 scanner-safe thumbnail behavior, 5.8.40 Split→Single state transfer, 5.8.39 startup/export fixes, persistent worker architecture, rendering limits, annotations, graph tools, and Library formats are preserved.

### Validation

1. In Split, keep one reference paper fixed in one pane and close successive student papers in the other. The fixed pane should not blank/re-render.
2. Save Diagnostics after several closes; `close-open-document-complete` should normally list only the replaced pane in `panesRebuilt`.
3. In Files, tap a Library checkbox and confirm the Selected Documents summary/list updates immediately.
4. When every document in the current Library folder or Open Documents section is selected, the button should read **Select none** and toggle that scope off.
5. Continue ordinary grading; no deliberate crash stress is needed.

---

## Prior 5.8.42 notes

# PDF Workbench 5.8.42-exp

## Milestone 5.8.42 — iPad render-watchdog worker recovery

5.8.42 is a focused recovery revision on top of 5.8.41. A long iPad grading session captured `KellyRodriguez.pdf` failing to render before a crash. Kelly is a six-page 400-dpi bilevel/CCITT scan; each page is roughly 3400×4376 pixels (~14.9 MP), substantially heavier than the ~3.7 MP JPEG scans in the rest of the batch.

The failing page hit the viewer watchdog twice. 5.8.41 retired the PDF.js document but accidentally left its caller-owned persistent worker slot claimed by the retired source. When Kelly was reloaded after scrolling away/back, both managed slots looked occupied, so PDF.js created an unmanaged extra worker. The old potentially wedged worker remained alive and the intended two-worker memory bound was no longer real.

### Changes

- A render watchdog now force-recycles the associated persistent PDF worker as well as retiring the PDF document.
- Stale worker-slot claims whose source no longer exists are reclaimed defensively.
- On iPad, Workbench will no longer silently fall back to an unmanaged extra PDF.js worker when the two-slot pool is full. It records `live-pdf-worker-pool-exhausted` and fails the load instead.
- A source that has triggered the viewer watchdog reloads with an 8 MiB PDF.js image working-area ceiling; normal iPad PDF loads remain at 16 MiB.
- `library-source-load-finish` records `watchdogRecovery` and the actual image-working-area ceiling.
- Adds `live-pdf-worker-forced-recycle`.

Normal viewer quality is unchanged (4 MP Single / 2.5 MP Split). 5.8.41 scanner-safe Files thumbnails, 5.8.40 Split→Single state transfer, 5.8.39 startup/export fixes, the 5.8.37 persistent worker architecture, annotations, graph tools, and Library data formats are preserved.

### Validation

1. Reopen `KellyRodriguez.pdf` and navigate to page 3.
2. If a watchdog occurs, save Diagnostics. Expect a forced worker recycle, a new managed worker generation, and `watchdogRecovery:true` on the reload.
3. Verify the pool never retains a source ID that is absent from the live source map.
4. Continue ordinary grading and watch for failed page renders or progressive switching slowdown.


---

## Prior 5.8.41 notes

# PDF Workbench 5.8.41-exp

## Milestone 5.8.41 — iPad scanner-safe Library thumbnails

5.8.41 is a narrow iPad Files-thumbnail safety revision on top of 5.8.40. A 2026-10-03 crash occurred after opening 29 logical documents in Files and switching to View. The pre-crash breadcrumb showed only one resident live PDF, but Files had just generated a missing thumbnail for `Hobart.pdf`, one of 27 six-page scanner PDFs whose pages each contain a ~1687×2200 (~3.7 MP) JPEG. The process then died about 0.4 s into the first full-size viewer render.

On iPad/iPhone-like WebKit only, missing/stale Library thumbnails now skip PDF.js generation when the first page contains an embedded raster over 3,000,000 pixels. The card stores the existing lightweight “Preview unavailable” marker instead. Existing valid cached thumbnails are still displayed, and desktop/Surface keeps the prior 13 MP ceiling. This prevents Files from repeatedly decoding full-page scanner rasters solely to create tiny Library cards before grading.

All 5.8.40 Split→Single state-transfer behavior, 5.8.39 export/startup fixes, 5.8.37 persistent live-PDF worker pool, render limits, annotation behavior, and Library schema are unchanged.

## Validation

1. On iPad, open the same 25+ six-page scanned student PDFs in Files. Cards without an existing cached preview should show “Preview unavailable” rather than triggering full PDF.js scan decoding.
2. Switch to View. The first visible paper should load/render without a crash.
3. Save Diagnostics after several minutes. `library-thumbnail-unavailable` events with reason `LIBRARY_THUMBNAIL_IPAD_SCAN_SKIPPED` are expected for these ~3.7 MP scans.
4. Existing cached thumbnails should still display normally. Surface/desktop thumbnail generation should be unchanged.


5.8.40 is a narrow Split -> Single per-document view-state fix on top of 5.8.39. It preserves the stable Surface/Windows rendering session and the iPad persistent-worker/export/startup architecture. Documents actively viewed in Split now carry their remembered page/view forward as the fallback used if the user later switches to that document in Single View; raw split-width scroll pixels are not transferred.

## Milestone 5.8.40 — bounded export memory + 5.8.38 startup recovery

5.8.40 is built directly on 5.8.38. It preserves the successful 5.8.37 two-slot iPad PDF.js worker pool and the 5.8.38 single-pass Library startup/recovery work, while addressing a separate export-memory problem exposed by the 2026-10-02 grading/export diagnostics.

### What the 5.8.37 long-session diagnostics showed

The persistent worker pool substantially improved ordinary grading performance. Late in a roughly 36-minute grading runtime:

- outgoing persisted-PDF cleanup was commonly about 4–12 ms;
- most PDF reopen operations were about 6–17 ms;
- the first load after an intentional eight-use worker recycle was still only about 144–249 ms;
- the late diagnostic contained no event-loop-gap records;
- the right-pane worker had reached 72 total assignments across eight recycle generations while remaining responsive.

Therefore 5.8.40 preserves the 5.8.37 worker pool unchanged.

### 5.8.40 export-memory changes

Large Files/PDF exports had two avoidable accumulation paths:

1. The selected multi-document ZIP export reused one `sourcePdfCache` across the entire batch. pdf-lib could therefore retain parsed source PDF document graphs from many student files while JSZip simultaneously retained every completed output PDF.
2. Files mode intentionally evicts live Viewer PDF sources even when documents remain logically Open. `prepareDocumentForFileOperation()` previously hydrated sources only for closed documents, and Library/folder export paths could hydrate successive PDF.js sources without immediately retiring each completed document's source.

5.8.40 changes this as follows:

- Every exported document gets its own short-lived pdf-lib source cache. That cache is cleared as soon as that document has been added to the output/ZIP.
- File-operation source hydration is based on the document's actual page sources, not open/closed status.
- After each document is completed, temporarily hydrated persisted PDF.js sources are retired before the next document begins whenever they are not visible or template-owned.
- Whole-Library PDF archive and folder PDF export use the same per-document cleanup discipline.
- New `file-operation-sources-released` diagnostics record how many temporary sources were retired and the worker-pool state after cleanup.
- JSZip still necessarily retains each completed output PDF until the ZIP is packaged; 5.8.40 specifically removes the unnecessary parsed-input/live-PDF accumulation beside those output bytes.

### 5.8.38 startup behavior retained

- Critical saved-session IndexedDB reads retry in place instead of restarting the whole Library restore.
- A recovery attempt no longer prereads all Library stores and then invokes another full initialization that rereads them.
- Startup status stays in reconnecting/restoring state until the retry truly completes.
- The immediate post-restore Split rebuild is suppressed unless viewport geometry materially changed.

### Validation

1. Launch with the existing large session. Expect one normal Library restore or a localized reconnect/retry, not repeated full restore cycles.
2. Continue ordinary grading long enough to confirm the 5.8.37 worker-pool performance remains stable.
3. Export several or all graded PDFs from Files. During a multi-document export, diagnostics should show `file-operation-sources-released` between documents and resident PDF sources should not ratchet upward.
4. After export/download, confirm the PWA remains responsive and does not rebuild the Library unnecessarily.
5. Save Diagnostics after a successful large export even if there is no crash.