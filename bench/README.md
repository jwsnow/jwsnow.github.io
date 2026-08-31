# PDF Workbench — Milestone 4.2.0

Milestone 4.2.0 adds Library backup and portability on top of the persistent folder/subfolder Library validated in Milestone 4.1.1.

## New in 4.2.0

### Export the whole Library as PDFs
Files → **Library backup & export** now includes **Export Library as PDFs (.zip)**.

- Exports every non-Trash Library document as a conventional PDF.
- Preserves the Local Library folder/subfolder hierarchy inside the ZIP.
- Keeps empty Library folders as directory entries where ZIP viewers support them.
- Includes persistent page templates as one-page PDFs under `_Templates`.
- Uses the same structural PDF export engine already validated for page order, rotations, generated pages, page geometry, scans, and image documents.
- Does not modify `needsExport` state merely because a whole-Library archive was created.
- Trash is deliberately omitted from the human-readable PDF archive.

This ZIP is a conventional PDF archive, not a restoreable editable project backup.

### Full editable Library backup
**Back up editable Library** creates a ZIP-based file with a `.pwbbackup` extension. It contains:

- all Library document records, including Trash state;
- folder/subfolder hierarchy;
- persistent page templates;
- original source PDF/image bytes;
- page order, rotations, generated pages, page-size/crop/margin edits, undo/redo page snapshots, and other persisted project state;
- saved open-document/session and split/single view state;
- the small set of current PDF Workbench preferences stored in localStorage.

The backup includes `manifest.json` plus binary source payloads. It is intended for PDF Workbench restore, not manual editing.

### Restore editable Library
**Restore Library backup…** accepts `.pwbbackup` (and ZIP) files created by PDF Workbench.

Before replacing anything, restore:

1. reads and validates the manifest;
2. rejects unsupported future backup/schema versions;
3. verifies every source payload required by documents/templates exists;
4. asks for explicit confirmation because restore replaces the current Local Library;
5. reads every source payload before touching current data;
6. replaces documents/sources/folders/meta in one IndexedDB read-write transaction;
7. restores supported preferences and reloads the application into the restored saved session.

This makes the actual replacement atomic at the IndexedDB transaction level after validation, reducing the chance of a half-restored Library.

## Existing Library behavior retained
- Persistent imported/created documents.
- iPad Home Screen PWA IndexedDB retry/reconnect hardening.
- Close/reopen and Close All.
- Trash/Restore/Permanent delete.
- Folders and arbitrarily nested subfolders.
- Rename, duplicate, and move documents/folders.
- Lazy first-page thumbnails.
- Grid/List Library views.
- Persistent templates, with the same Template Manager reachable from Files and Insert Page.
- Storage usage / persistent-storage request / Library purge / full factory reset.

## Storage/versioning
- IndexedDB database version remains **2**; no new object store is required.
- Library schema remains **3**.
- Editable backup format version is **1**.
- Existing 4.0.x/4.1.x Library data is not intentionally rewritten or purged on upgrade.
- Service-worker/application cache remains separate from persistent Library data.

## Suggested tests
1. Upgrade a device with an existing 4.1.1 Library and verify all documents/folders/templates remain.
2. Create nested folders with several documents at root and several levels deep; export Library as PDFs and inspect ZIP paths.
3. Include a scan/JBIG2 PDF, generated graph/blank pages, normalized/cropped pages, and an image document in the PDF archive; open exported PDFs in Adobe.
4. Confirm a persistent template appears in `_Templates` as a one-page PDF.
5. Create an editable `.pwbbackup`.
6. Make obvious changes to the current Library (rename/move/delete/add documents), then restore the backup and verify the prior hierarchy/state returns.
7. Verify documents that were in Trash at backup time return to Trash after restore.
8. Verify persistent templates return after restore.
9. Verify the open-document set and relevant View/Split state restore after reload.
10. Repeat backup/restore on iPad PWA because that is the most important IndexedDB portability test.

## Still planned before Milestone 5
- Dedicated schema migration/recovery hardening as the Library evolves.
- Audit preservation of existing PDF hyperlinks and outlines/bookmarks through structural edits and export.
- Page bookmark/outline foundation if it remains useful before inking.
- Final Files/Library UI placement cleanup.
- Favorites/search/sorting and broader bulk Library actions remain lower priority unless actual use shows a need.

**More → About this build** reports **Milestone 4.2.0**. The service-worker cache is `pdf-workbench-m4.2.0-v1`.
