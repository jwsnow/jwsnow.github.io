# PDF Workbench — Milestone 2.1.5

Milestone 2.1.5 is a deliberately small polish release following successful iPad and Surface testing of the 2.1.4 input architecture. It does **not** change viewer gesture handling, pen/finger separation, split-pane state, Presentation behavior, or PDF.js rendering.

## Confirmed 2.1.4 device results

Testing in Safari on iPad and Chrome on Surface confirmed:

- one-finger pan/scroll works;
- two-finger pinch zoom works;
- high-zoom horizontal panning can reach both left and right page edges;
- pen/Pencil does not pan or zoom the PDF;
- pen can operate visible interface buttons;
- pen hover/tap does not reveal or activate the hidden Presentation toolbar.

The installed iPad PWA briefly failed to pick up a new build through **Reload latest version**, while Safari could load the current hosted build. The PWA subsequently updated normally. Treat that as transient unless it becomes reproducible; the update mechanism is unchanged in 2.1.5.

## Changed in 2.1.5 — iPad footer vertical alignment

On iPad, the footer/status text was pressed against the top of the footer while it was vertically centered on Surface. The cause was the fixed 28 px status grid row: with `viewport-fit=cover`, iPad safe-area bottom padding was being added *inside* that fixed height and therefore consuming the content space.

2.1.5 changes the app-shell footer row from:

`var(--status-h)`

to:

`calc(var(--status-h) + env(safe-area-inset-bottom))`

The status bar keeps its existing safe-area bottom padding. This preserves the normal 28 px status content area and adds separate room for the iPad Home-indicator inset, so the text can remain vertically centered.

## Full Page navigation and future ink

No Full Page navigation controls were moved in this release. The bottom arrow controls may eventually conflict with a writing palm once inking is active. When the ink subsystem is introduced, test this explicitly and consider auto-hide, palm-safe activation, edge placement, or an option to hide the controls while writing.

## Input policy to preserve

- Pen/Pencil on PDF content: reserved for annotation; currently inert.
- One finger: pan/scroll.
- Two fingers: pinch zoom and pan.
- Pen may operate visible UI controls.
- Pages organizer still allows pen selection and drag/reorder.
- Pen hover/tap must not reveal hidden Presentation controls.

## Important scan-PDF support

Do not remove the PDF.js WASM/JBIG2/CMap/standard-font resource configuration. It is required for scan-heavy PDFs such as the prior `BaakeScan.pdf` test file.

## Version verification

**More → About this build** must report **Milestone 2.1.5**. The service-worker cache is `pdf-workbench-m2.1.5-v1`.

Every distributed ZIP includes `PDF_Workbench_Project_Handoff.txt`; update it with every release.

## Suggested 2.1.5 checks

1. iPad PWA: verify footer text is vertically centered above the Home-indicator safe area.
2. Surface/desktop: verify footer appearance has not changed adversely.
3. Reconfirm one-finger pan and two-finger pinch on iPad and Surface.
4. Reconfirm pen does not pan/zoom the document but does operate visible buttons.
5. Reconfirm hidden Presentation controls ignore pen hover/tap.
6. Verify About says **2.1.5**.
7. Verify **Reload latest version** works when the hosted build is current; do not redesign the update path unless failures become reproducible.

## Next development direction

With 2.1.4 input behavior confirmed and 2.1.5 limited to footer polish, treat the Milestone 2 viewer/input foundation as substantially stable. The next planned major work is Milestone 3 document handling/export, beginning with exporting the current edited page order/rotations/duplicates/deletions, then explicit combine/merge, extract/split, and related page insertion tools.

## Running locally

Serve the folder through HTTP/HTTPS rather than opening `index.html` with `file://`, because the service worker/PWA behavior requires an HTTP origin. For example, from the parent directory:

```bash
python -m http.server 8000
```

Then browse to the served `pdf-workbench-m2.1.5/` directory.
