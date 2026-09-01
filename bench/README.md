# PDF Workbench — Milestone 4.2.1

Milestone 4.2.1 consolidates the remaining folder-level Library workflows and fixes excessive PDF growth during structural export.

## Efficient PDF export
- An untouched imported PDF is exported by returning its original byte stream rather than rebuilding it.
- For edited PDFs, all page occurrences from each source PDF are imported in one `copyPages()` batch. This lets pdf-lib reuse shared images, fonts, color profiles, and other resources instead of copying them once per output page.
- The change is shared by normal Export, Extract, Split, Combine, Library PDF ZIP export, and Preserve compression.
- Rasterize compression remains intentionally page-image based.

A key regression case is the 44-page Chapter 4.2 slide deck: the source stores one background image shared by 43 pages, while the old page-at-a-time export duplicated that image dozens of times and grew dramatically.

## Folder-level Library operations
- Folder rows now provide **Export PDFs**, **Rename**, **Move**, and **Trash**.
- Folder export creates one ZIP preserving the selected folder and all nested subfolder paths.
- Trashing a folder moves its complete document/subfolder tree together. Restore restores the complete tree. Permanent deletion removes the whole tree; when any contained document has unexported changes, PDF Workbench can export the tree as a PDF ZIP first.

## Import directly into the Library
- **Files → Local Library → Import files…** uses the current Library folder as the destination.
- Using the main Open command while already in Files does the same and leaves the user in Files instead of jumping to View.
- **Import PDF folder ZIP…** reads a ZIP containing PDFs and recreates its directory hierarchy beneath the current Library folder.
- Tapping/clicking a Library document thumbnail or title deliberately opens that document and switches to View.

## Backup portability
- Editable backups are now written with an explicit `.pwbbackup.zip` filename.
- Restore accepts ZIP files and validates `manifest.json` rather than depending on a custom extension.
- **Import backup as folder…** keeps the current Library and imports a backup as a new editable subtree, remapping document/folder/source/page IDs to avoid collisions. Imported templates receive duplicate-safe names.
- Full Restore still replaces the Local Library and remains the exact recovery path.

## Storage/versioning
- IndexedDB database version: **2**
- Library schema version: **4** (adds folder-tree Trash metadata; existing schema-3 records remain readable)
- Editable backup format version: **1**
- Service-worker cache: `pdf-workbench-m4.2.1-v1`

## Suggested tests
1. Export an untouched PDF and compare its byte size to the original; it should be identical.
2. Reorder/rotate/duplicate a few pages in the Chapter 4.2 slide deck and export; verify that the file no longer expands by an order of magnitude.
3. In Files, browse into a subfolder, import several PDFs, and verify they land there while Files remains visible.
4. Tap a document thumbnail/title and verify it opens in View.
5. Create a nested folder tree, export that folder as PDFs, and inspect the ZIP hierarchy.
6. Trash the folder tree, restart, restore it, then Trash it again and permanently delete it.
7. Import a ZIP containing nested PDF folders into the current Library folder.
8. Create a `.pwbbackup.zip`, then use **Import backup as folder…** and verify the existing Library remains intact while an editable imported subtree appears.
9. Repeat the backup/import and folder ZIP workflows on iPad PWA because its file-picker/share behavior is the most restrictive target.

**More → About this build** reports **Milestone 4.2.1**.
