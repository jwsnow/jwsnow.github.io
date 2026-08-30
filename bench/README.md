# PDF Workbench — Milestone 3.5.0

Milestone 3.5.0 is a **visual page/template chooser** release on top of the device-tested 3.4.4 viewer state. No intentional changes were made to page insertion semantics, split-pane anchoring, touch/pen input, or PDF output.

## Visual Insert Page chooser

Opening **Insert** in Pages, **+ Page** in View, or the page icon in Presentation now shows compact visual cards instead of a text-only list.

- **Duplicate + notes** previews the actual current/selected page. (It behaves the same as a normal duplicate until annotations exist.)
- **Duplicate clean** previews the same page but retains the future no-annotations semantic hook.
- **Blank** previews a blank page matching the current page's displayed size/orientation.
- **Graph paper** previews the generated light-cyan 1/4-inch grid matching the current page's displayed size/orientation.
- Every saved **session template** is shown as its actual page thumbnail with its name below it.
- The existing **Save page … as template** and **Manage templates** actions remain at the bottom of the chooser.

The chooser uses four columns where room permits and two columns on narrow screens. It remains a temporary popover/drawer-style surface, so no additional permanent Presentation chrome is added.

## Visual template manager

**Manage templates…** now displays, for each template:

- a page thumbnail;
- template name;
- displayed page dimensions;
- Rename;
- Delete.

Templates are still **session-only** in this milestone. They survive Close all files in the current running app session but are not restored after a full app reload/restart. Persistence will be added with the planned Files/Library storage system.

## Preserved tested behavior

Milestone 3.4.4 was tested successfully in Continuous, Page Snap, and Full Page, including Presentation, with same-document split-pane structural edits. This release deliberately leaves that state/anchoring logic unchanged.

Also preserved: multi-document Files operations, Export/ZIP, Extract, Split, Combine, blank/graph pages, finger pan/pinch, pen reserved for ink on document content, visible UI pen clicks, and PDF.js JBIG2/WASM resources.

## Version

**More → About this build** reports **Milestone 3.5.0**. The service-worker cache is `pdf-workbench-m3.5.0-v1`.

## Suggested 3.5.0 tests

1. Open Insert from Pages, normal View, and Presentation and verify the visual chooser fits comfortably.
2. Confirm Duplicate previews the exact current page in single and split View.
3. Confirm Blank/Graph Paper previews match portrait/landscape current-page orientation.
4. Save several visually different templates and verify they are easy to distinguish by thumbnail.
5. Rename/delete templates in Manage templates and confirm previews/names update.
6. On iPad portrait/landscape and narrow Surface, verify the chooser is usable without covering controls permanently or overflowing the viewport.
7. Regression-check repeated insertion and same-document split-pane anchoring.
