# PDF Workbench — Milestone 4.1.0

Milestone 4.1.0 builds the first real organization layer on top of the persistent Local Library introduced in Milestone 4.0.

## New in 4.1.0

### Folders and subfolders
- Files → Local Library now supports folders and arbitrarily nested subfolders.
- `New folder` creates a folder inside the folder currently being viewed.
- Breadcrumb navigation returns to parent folders or the Library root.
- Folders can be renamed and moved to another folder/root.
- Documents can be moved between folders/root.

### Document management
- Library documents can be renamed.
- Library documents can be duplicated. A duplicate is an independent editable project but safely reuses immutable source PDF/image data internally rather than storing redundant source bytes.
- Existing Open / Use / Close / Trash behavior remains.

### Visual Library
- Library documents show a lazy-rendered thumbnail of their first page.
- Grid and List views are available. Grid is the default and the choice is remembered on the device.
- Folder cards are shown before documents in each folder.

### Files UI cleanup
- Open Documents and Local Library are collapsed by default.
- Files now has a direct Templates section with a `Manage templates…` button.
- `Manage templates…` remains in the Insert Page chooser as well; both open the same persistent-template manager.

## Persistence/storage
- IndexedDB database version: 2.
- PDF Workbench Library schema version: 3.
- Existing 4.0.x document records migrate forward without requiring the Library to be erased.
- The database adds a `folders` object store; documents already stored by 4.0.x remain at the Library root (`folderId = null`).
- The service-worker/application cache remains separate from Library data.

## Intentionally deferred
Favorites, broad Library search/sorting controls, folder Trash/permanent-delete workflow, whole-Library PDF ZIP export, editable Library backup/restore, stronger schema migration tooling, and bulk Library actions beyond the existing open-document selection are still planned for later Milestone 4 work.

## Suggested tests
1. Upgrade a device that already has a 4.0.2 Library and verify existing documents remain at Library root.
2. Create Folder A → Subfolder B; move documents into each and reopen them.
3. Close/reopen the PWA/browser and confirm the folder hierarchy and moved documents persist.
4. Rename and duplicate both open and closed Library documents.
5. Switch between Grid and List views and verify first-page thumbnails appear for closed documents.
6. Move a folder containing subfolders to another folder and verify breadcrumb navigation.
7. Verify Open Documents and Local Library start collapsed after a fresh page load.
8. Open the Template Manager from Files, then from Insert Page, and confirm both show the same templates.

**More → About this build** reports **Milestone 4.1.0**. The service-worker cache is `pdf-workbench-m4.1.0-v1`.
