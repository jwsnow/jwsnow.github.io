# PDF Workbench — Milestone 4.2.2

Milestone 4.2.2 is a deliberately low-risk UI organization pass on top of the validated Milestone 4.2.1 Library/export build. It does not change the PDF export engine, IndexedDB schema, Library persistence logic, backup/restore logic, document model, or view-state machinery.

## Files UI cleanup
- **Local Library** and **Open documents** now stay together at the top of Files.
- The Local Library's primary actions are arranged as one compact action row: **Import files…**, **Import PDF folder ZIP…**, and **New folder**.
- **Refresh** now sits beside the **List / Grid** browser controls rather than with creation/import actions.
- The remaining Files operations are visually grouped without adding nested accordions:
  - **Create:** New, Templates, Images → PDF
  - **PDF tools:** Export, Compress, Extract, Split, Combine
  - **Library management:** Trash, Library backup & export, Storage & reset
- Existing expandable tool sections and their element IDs/handlers are retained.

## View / Presentation toolbar consistency
- Shared controls now follow the same logical order in both modes: **Scroll → Fit → Zoom → Split → Insert**.
- Presentation keeps its document/pane selectors first and Exit last.
- **Insert Page** uses the same page-with-plus SVG icon in View and Presentation. This avoids the previous mismatch between a plus sign in View and a different page symbol in Presentation.

## Validated 4.2.1 functionality retained
The previous build was tested successfully on Surface and iPad for Library creation/moving, import/export, editable backup, full restore, backup import as a folder/subtree, Trash/Restore/Permanent Delete, and cross-platform backup portability. The export-size regression fix is unchanged: untouched source PDFs pass through byte-for-byte, while edited PDFs preserve shared source resources through batched page copying.

## Storage/versioning
- IndexedDB database version: **2**
- Library schema version: **4**
- Editable backup format version: **1**
- Service-worker cache: `pdf-workbench-m4.2.2-v1`

## Suggested smoke tests
1. Open Files and confirm Local Library and Open documents appear together before the Create heading.
2. Expand Local Library and check the Import/ZIP/New Folder action row plus Refresh/List/Grid row on desktop, Surface, iPad, and Chromebook widths.
3. Enter View and Presentation and confirm the shared control order is Scroll, Fit, Zoom, Split, Insert.
4. Confirm the same page-plus icon appears for Insert Page in View and Presentation.
5. Quickly exercise Import, open-from-Library, Export, Trash/Restore, and backup/restore to confirm this layout-only revision did not alter behavior.

**More → About this build** reports **Milestone 4.2.2**.
