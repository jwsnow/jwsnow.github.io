# PDF Workbench — Milestone 4.0.1

Milestone 4.0.1 refines the persistent **Local Library** introduced in 4.0.0.

## Close, Library, and Trash semantics

The application now keeps three concepts separate:

- **Close / Close All** only remove documents from the active workspace. They do not prompt for PDF export, because the editable working state has already been saved in Local Library.
- **Trash** removes a document from the active Library view but keeps it recoverable.
- **Delete permanently** is the destructive action. If the Library copy has changes not exported to PDF, PDF Workbench offers **Export PDF & delete**, **Delete permanently**, or **Cancel**.

Files → **Local Library** shows each stored document with Open/Use/Active, Close when open, and Trash. Files → **Trash** shows recoverable documents with Restore and Delete permanently.

Trash state persists across app restarts. Documents in Trash are never automatically reopened by the saved session.

## New from template

Files → **New** now offers:

- Blank document
- Graph-paper document
- From template…

**From template…** is enabled whenever session templates exist and opens a visual thumbnail chooser. The resulting one-page document is an independent copy of the template page and becomes a normal persistent Library document. Session templates themselves remain session-only until the later Library-organization milestone.

## Persistent Library foundation retained

Imported PDFs/images and internally created documents are stored in IndexedDB separately from the service-worker/app-shell cache. Persisted editable state includes source data, page order, rotation, generated pages, Page size, Crop/margins, undo/redo page snapshots, and saved single/split view state.

The Library schema is now version 2, adding recoverable Trash state while remaining able to read schema-1 records from 4.0.0.

## Storage & reset

Files → **Storage & reset** still provides:

- Request persistent storage
- approximate browser storage usage/quota
- Delete local Library
- Factory reset all local data

Normal app updates should not erase Local Library data. The full purge remains a development/recovery tool.

## Next Milestone 4 work

### 4.1 — Library organization and daily management

- folders and subfolders
- rename and duplicate documents
- move documents/folders
- Favorites
- filename/folder search
- sort by name / modified / created
- grid/list Library views
- bulk Library actions
- persistent templates
- page bookmarks and document outlines foundation

### 4.2 — Backup, portability, and storage hardening

- Export entire Library as PDFs in a ZIP while preserving folder hierarchy
- editable PDF Workbench Library backup/restore
- schema migrations/version checks
- backup-first affordances around destructive reset
- audit/preservation of existing PDF hyperlinks/outlines
- future PDF-text/OCR/handwriting search-index fields
- orphaned-source cleanup/storage hardening

## Version

**More → About this build** reports **Milestone 4.0.1**. The service-worker cache is `pdf-workbench-m4.0.1-v1`.

## Suggested tests

1. Edit a PDF, press Close, and confirm it closes immediately without an export prompt and remains in Local Library.
2. Reopen it from Local Library and verify its edits remain.
3. Use More → Close all files and confirm all documents close without prompting or deleting Library copies.
4. Move an open document to Trash; verify it closes and appears in Trash.
5. Restore it; verify it returns to Local Library and can reopen normally.
6. Permanently delete an unchanged disposable document and verify it disappears.
7. Permanently delete a changed disposable document and test Export PDF & delete / Cancel / Delete permanently.
8. Save a session template, use Files → New → From template…, and verify the new one-page document persists in the Library.
9. Restart the app with a document in Trash and verify it remains in Trash rather than reopening.
