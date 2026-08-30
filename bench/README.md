# PDF Workbench — Milestone 3.5.3

Milestone 3.5.3 is a responsive-toolbar polish release based on device testing of 3.5.2. No viewer, template, insertion, Presentation, split-state, or PDF-manipulation logic is intentionally changed.

## Changes in 3.5.3

### Narrow toolbar behavior

Cross-device screenshots and follow-up testing showed that Chromebook portrait behaved well, but iPad portrait and a narrow Surface window could let the active-document filename compete with or appear beneath the View / Pages / Files and viewer-mode controls. The decorative **PDF Workbench** brand also remained visible on iPad portrait even though hiding it would free useful width.

The responsive hierarchy is now:

1. At medium/narrow widths, hide the **PDF Workbench** brand first.
2. Compress and truncate the active-document selector before shrinking the primary **View / Pages / Files** workspace controls.
3. At still narrower widths, compress the filename selector further.
4. Preserve the existing icon-only behavior for secondary toolbar controls.
5. Keep the **⋯ More** button at the far right.

This is intentionally based on available viewport width rather than device type.

## Preserved behavior

- 3.5.2 View ↔ Presentation logical-position preservation in Continuous, Page Snap, and Full Page.
- Independent split-pane position preservation in both directions.
- Visual thumbnail Insert Page chooser.
- Thumbnail template manager and session-only reusable templates.
- Pages selection-driven template capture.
- Presentation-safe in-app template naming.
- Same-document split structural-edit anchoring.
- Finger pan/pinch and pen-reserved-for-ink behavior.
- Files operations: Export, multi-file ZIP export, Extract, Split, Combine.
- Blank/graph-paper pages and structural PDF export.
- PDF.js JBIG2/WASM resource configuration.

## Version

**More → About this build** reports **Milestone 3.5.3**. The service-worker cache is `pdf-workbench-m3.5.3-v1`.

## Suggested 3.5.3 tests

1. iPad portrait: confirm **PDF Workbench** is hidden and the filename no longer runs under the mode controls.
2. iPad landscape: confirm the normal wider layout still looks comfortable.
3. Narrow Surface window: confirm View / Pages / Files remain readable and the filename yields width first.
4. Chromebook portrait/landscape: confirm the already-good layout remains good.
5. Quick regression check View ↔ Presentation and template insertion; those systems were not intentionally changed.
