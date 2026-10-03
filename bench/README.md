# PDF Workbench 5.8.40-exp

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