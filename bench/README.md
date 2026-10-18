# PDF Workbench 5.8.47-exp

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