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