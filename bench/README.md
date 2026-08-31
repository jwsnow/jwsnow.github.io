# PDF Workbench — Milestone 4.0.2

Milestone 4.0.2 is a focused persistence/reliability revision of the Milestone 4 Local Library foundation.

## Changes in 4.0.2

### iPad Home Screen PWA Local Library hardening

Testing showed that the 4.0.1 Library worked on Surface and in iPad Safari, but an installed iPad Home Screen PWA could remain stuck with an empty/non-persistent Local Library. This build hardens the IndexedDB path for WebKit/Home Screen use:

- Performs a harmless IndexedDB warm-up before the real Library open on Apple WebKit.
- Uses bounded open timeouts and automatic retries so a WebKit first-open request cannot leave Library initialization pending forever.
- Reconnects and retries once if the IndexedDB server connection is lost during a save.
- Rechecks/reconnects Library storage when the app returns to the foreground.
- Files → Local Library → Refresh now also acts as an explicit storage reconnect/retry control.
- IndexedDB write/delete/clear operations attach transaction-completion handlers before issuing the request, avoiding a transaction-completion race.
- New source data is stored as ArrayBuffer records rather than Blob/File records; older 4.0.0/4.0.1 Blob-based records remain readable.

The Library remains separate from the service-worker/app-shell cache.

### Persistent templates

Templates now use the same Local Library persistence layer:

- Saved templates return after an app reload/restart.
- Template thumbnails, rename/delete, Insert Page → Templates, and Files → New → From template work from the restored template set.
- PDF/image source data referenced by a template is retained in persistent Library storage.
- Deleting the Local Library or factory-resetting local data removes persistent templates too.

### Files UI polish

**Local Library** and **Open documents** are now collapsible sections, open by default, matching the rest of the Files workspace.

## Existing 4.0/4.0.1 behavior retained

- Open/imported and internally created working documents can persist in IndexedDB.
- Closing a document removes it from the active workspace but keeps it in Local Library.
- Close All closes the active working set without deleting Library documents.
- Local Library documents can be reopened without locating the original external file.
- Trash / Restore / Delete permanently are available.
- Permanent deletion of a document with unexported changes offers Export PDF & delete / Delete permanently / Cancel.
- Files → New supports Blank, Graph paper, and From template.
- Storage & reset includes persistent-storage request, usage estimate, Delete local Library, and Factory reset.
- Existing viewer, Presentation, split-view, page editing, export/combine/extract/split, templates, geometry, Images → PDF, and compression behavior is otherwise unchanged.

## Important iPad PWA test

1. Install/open the hosted 4.0.2 build from the iPad Home Screen.
2. Open a disposable PDF in the PWA itself.
3. Verify Files → Local Library shows the document immediately.
4. Save a page as a template; verify Files → New → From template is enabled.
5. Fully leave/close the PWA and return.
6. Verify the document and template are still present.
7. Close the document, reopen it from Local Library, and verify edits remain.
8. If Library storage does not initialize, tap **Refresh** in Local Library and note the exact status text.

## Version

**More → About this build** reports **Milestone 4.0.2**. The service-worker cache is `pdf-workbench-m4.0.2-v1`.
