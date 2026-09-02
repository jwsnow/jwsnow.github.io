# PDF Workbench — Milestone 5.4.0

Milestone 5.4.0 adds a first **handwriting smoothing** pass on top of the stable 5.3.0 Pen/Highlighter editing baseline. Every raw/coalesced stylus sample remains stored exactly as before; smoothing is derived only for screen rendering and PDF export so partial erasing, lasso manipulation, Undo/Redo, persistence, and future editing continue to use the unchanged raw geometry.

## 5.4.0 smoothing

- Pen and Highlighter strokes render as restrained continuous cardinal splines instead of straight line segments between every raw sample.
- The spline passes through the stored sample points and caps control handles relative to each raw segment, reducing polygonal corners without allowing large loops or overshoot away from editable geometry.
- Raw input points are **not replaced, filtered, simplified, or rewritten**. Existing documents automatically receive the smoother rendering without a data migration.
- Live Pen drawing remains incremental: each new sample finalizes the preceding cubic segment, leaving at most one raw-sample interval of visual tail latency rather than redrawing the whole page for every pen sample. The completed stroke is redrawn once at pen-up through the exact final smoothing path.
- Highlighter keeps its existing full-current-stroke redraw per pointer event to preserve uniform translucency; that redraw now uses the same smooth curve.
- PDF export writes the same continuous cubic path used by the on-screen completed stroke, with existing round caps/joins and Highlighter opacity.
- Partial Eraser and Lasso/Select continue to operate on raw stroke points. Because stylus samples are dense and spline handles are restrained, the rendered path stays close to that editable source geometry.
- No changes to Apple Pencil fallback, Surface/ChromeOS pen routing, palm rejection, finger navigation, PWA caching, session restoration, templates, automatic pages, or live pinch scaling.

### Test priority for 5.4.0

1. Compare rapid handwriting against 5.3.0 on iPad and Surface. Confirm the stroke follows the pen without a noticeable new delay and curves look less polygonal after pen-up.
2. Draw tight loops, sharp corners, dots, very short marks, and fast long strokes. Look for loops/overshoot or a visible jump when lifting the pen.
3. Mix Pen and Highlighter, erase through curved sections, then lasso/move/resize/duplicate/copy/paste the surviving objects.
4. Export mixed smoothed Pen + Highlighter content and compare Acrobat with the Workbench display, including erased gaps.
5. Recheck split-view live ink, pinch zoom, session restart, and installed iPad PWA update behavior. Chromebook remains a later compatibility check if unavailable.

## 5.3.0 highlighter

- Adds a contextual **Highlighter** tool beside Pen, with its own direct palette: yellow, pink, cyan/blue, and green.
- Adds three remembered Highlighter widths: 8 pt, 14 pt, and 22 pt; factory default is 14 pt yellow.
- Highlighter strokes are stored as ordinary vector annotation objects with `tool: highlighter` and 34% opacity. Raw/coalesced input samples are preserved just as they are for Pen.
- Live translucent drawing redraws the complete current highlighter path once per pointer event rather than compositing every translucent segment separately, preventing dark beads at sample joins while retaining coalesced points.
- The partial-stroke Eraser cuts Highlighter marks as well as Pen ink because both remain editable vector strokes.
- Lasso/Select treats Highlighter marks as normal whole objects, including move, resize, delete, duplicate, cross-page/document copy, and paste.
- PDF export preserves Highlighter color, width, geometry, and transparency. Selection/lasso UI remains non-exported.
- Highlighter has its own remembered state; switching back to Pen restores the Pen's last color/width, and switching back to Highlighter restores its own last color/width.
- The 5.2.2 live-pinch overlay scaling and 5.2.1 installed-PWA cache consistency behavior remain unchanged.

### Future new-document sizing request

For a later document-creation refinement, offer **Presentation canvas**, **slightly smaller than presentation canvas**, and **US Letter** as graph/blank page-size choices. Presentation-derived sizes should be computed from the current device's usable Presentation viewport rather than hard-coded, so a newly created page can closely match the area that will actually be displayed on that device.

## 5.2.2 live-pinch annotation scaling

- Resize every page canvas (PDF raster + annotation overlay) during live single-view and split-pane pinch zoom.
- Keep final crisp rerender behavior unchanged.
- No changes to pen sampling, eraser geometry, selection manipulation, palm rejection, session restoration, templates, or automatic new-page behavior.

## 5.2.1 installed-PWA cache-consistency hotfix
- First-party `styles.css` and `app.js` are referenced with the release version in their URLs.
- Service-worker installation fetches the release shell with `cache: reload` before placing it in the Workbench cache.
- This addresses the iPad installed-PWA symptom where the new Select button from 5.2.0 HTML appeared, but its lasso icon CSS and Select click handler came from older cached assets.
- Lasso behavior, pen/eraser input, palm rejection, session restoration, templates, automatic new pages, and export are otherwise unchanged.

## 5.2.0 lasso selection and object manipulation

- Adds a **Lasso / Select** tool to the contextual annotation toolbar. Pen/mouse input draws a lasso; finger input continues to pan/pinch through the existing stylus-aware touch routing.
- Selection operates on complete annotation objects. An intersecting/enclosed stroke is selected as a whole; the partial-stroke Eraser remains the fine-grained editing tool.
- A selected set receives a visible bounding box with four corner handles. Drag inside the box to **move** the group; drag a corner handle to **resize** it proportionally. Resize transforms the vector points and scales stroke width with the group.
- Contextual Select actions provide **Delete, Duplicate, Copy, and Paste**. Duplicate offsets an independent copy on the same page. Copy/Paste uses an in-app annotation clipboard and supports pasting to another page or another open document.
- Pasted annotations preserve their visual geometry and style, receive new object IDs, and become the active selection. Repeated same-page pastes are offset so copies are visible.
- Keyboard shortcuts while Select is active: Delete/Backspace deletes; Ctrl/Cmd+C copies; Ctrl/Cmd+V pastes; Ctrl/Cmd+D duplicates.
- Move, resize, delete, duplicate, and paste each create normal Undo/Redo history entries and persist/export through the existing vector annotation model.
- Selection and live move/resize overlays are mirrored into other rendered instances of the same page, preserving same-document split-view synchronization.
- Selection UI is a separate SVG overlay above the annotation canvas and is never included in PDF export.

## 5.1.1 contextual annotation toolbar

- Hand selected: Pen color/width and Eraser size controls are hidden.
- Pen selected: only Pen color and width controls are shown.
- Eraser selected: only Eraser size controls are shown.
- Tool buttons, Undo, and Redo remain available as before.


## 5.1.0 partial-stroke eraser

- Adds an **Eraser** tool beside Hand and Pen, with three direct eraser sizes: 12 pt, 24 pt, and 40 pt diameter. The last-used eraser size is remembered.
- The eraser removes only the touched portion of Workbench vector ink. Crossing a stroke splits it into surviving vector fragments rather than deleting the whole object or painting white pixels.
- Eraser geometry accounts for the visible stroke width so the resulting gap corresponds closely to the circular eraser footprint, including round-capped surviving fragments.
- Erasing is one Undo/Redo history action per eraser contact. The surviving fragments persist to Local Library/backups and export as ordinary vector ink.
- Same-document split panes redraw the edited annotation overlay live, so erasure is shared just like pen ink while pane view state remains independent.
- Viewer annotation rendering now uses a transparent annotation overlay canvas above the unmodified page raster. This allows erasure to reveal the original PDF/image/generated-page content immediately without rerendering the PDF for every eraser sample, and provides a cleaner base for later lasso/highlighter work.
- Apple Pencil's stylus TouchEvent fallback is generalized to both Pen and Eraser. Surface/ChromeOS remain on Pointer Events. Existing palm rejection and deliberate finger pan/pinch behavior apply to Eraser mode as well.
- A circular eraser cursor follows mouse/stylus hover over the page; the native Surface hover cursor remains suppressed.
- Pen sampling, raw stored point behavior, PDF pen export, session restoration, templates, and automatic end-page append are otherwise unchanged.

## 5.0.12 session restoration correction

- Session checkpointing now has a **startup hydration guard**. `bindEvents()` is installed before IndexedDB restoration, and browsers/PWAs can emit `visibilitychange`/`pagehide` events during startup. Those lifecycle events are no longer allowed to write the transient empty startup workspace over the previously saved session before restoration reads it.
- The synchronous checkpoint key is now `pdfwb-session-checkpoint-v2`, avoiding a possibly poisoned 5.0.11 transient checkpoint. IndexedDB session metadata remains the durable source and is compared with the v2 checkpoint after startup has hydrated.
- An empty saved workspace is authoritative only when explicitly produced by closing the last document or **Close all files**. A newer accidental empty session cannot override an older known non-empty session unless it carries that explicit-empty marker.
- Open/close/current-document/workspace-mode/split-layout changes checkpoint synchronously once restoration is hydrated; the existing throttled IndexedDB persistence remains in place for durability and document/view state.
- Startup restoration now attempts saved document IDs directly against IndexedDB instead of requiring the in-memory Library listing as a precondition. Missing or trashed stale IDs are ignored rather than disabling future session persistence.
- If Local Library startup fails and reconnects later, the app re-enters the restoration path instead of saving an empty workspace over the old session.
- The 5.0.10 input path, 5.0.11 clean/annotated templates, Template Manager default-last-page setting, and pull/scroll-to-append behavior are unchanged.

## 5.0.11 workspace restoration and automatic last page

- The open-workspace session is still stored in IndexedDB, but is now also checkpointed to a small throttled `localStorage` record. On restart, Workbench chooses the newer valid session record. `pagehide` and hidden visibility transitions force an immediate checkpoint, avoiding the shutdown race where the OS can terminate an installed PWA before the final IndexedDB session write commits.
- The restart snapshot includes open document IDs, active document, workspace mode, split/single layout, active pane, per-pane document assignments, and saved view state. Closing a document or **Close all files** still updates the checkpoint, so intentionally closed workspaces stay closed.
- Saving the current page as a template now offers **With annotations** or **Clean page (no annotations)**. Existing behavior remains the default.
- Template Manager now contains **Automatic new last page**. Choices are **Graph paper** (factory default), **Blank**, or any saved template. Graph/Blank match the dimensions of the preceding last page; a saved template retains its own dimensions.
- In Continuous/Page Snap view, scroll/pull into the end-of-document strip until it says **Release to add …**, then release to append exactly one page. Wheel/trackpad scrolling can trigger the same threshold. In Full Page mode, an additional forward swipe/wheel action from the final page appends one page.
- Automatic append uses the normal page-insertion/history path, so Undo/Redo, Local Library persistence, split-pane shared content, export, and template sources remain consistent.
- The 5.0.10 pen/palm/cursor pipeline is unchanged.

## 5.0.10 stable-input cleanup

- Keep the 5.0.8 Safari Apple Pencil `Touch.touchType === "stylus"` fallback and PointerEvent/TouchEvent deduplication.
- Keep the 5.0.9 ChromeOS palm suppression and deliberate one-/two-finger navigation admission logic.
- Keep Pen-mode native text-selection/callout suppression, geometric page hit-testing for retargeted starts, and pen-hover cursor suppression.
- Remove the 5.0.6 **move-start recovery** that could create a stroke from a contact-bearing `pointermove` when no stroke owned that pointer. Real strokes now start only from `pointerdown` or the Safari stylus TouchEvent fallback.
- Remove the 5.0.6 **pointerup-only dot recovery** so an unmatched pen `pointerup` can no longer invent an annotation dot.
- Restore **tip-only pen starts**: normal pen `pointerdown` must have `button === 0`. Cross-platform diagnostics showed ordinary iPad Pencil, Surface Pen, and ChromeOS stylus tips using button 0; non-tip/barrel-button starts are suppressed and diagnostic-logged instead of drawing.
- Diagnostics remain available for the next annotation-tool phase.


Milestone 5.0.9 keeps the successful 5.0.8 pen-input architecture intact and focuses on two cross-platform input/UI issues found in broader hardware testing: ChromeOS palm contacts causing the viewer to jump while writing, and the distracting crosshair/plus cursor shown while a Surface Pen hovers over the PDF.

## 5.0.9 ChromeOS palm suppression

- The 5.0.8 Chromebook diagnostic showed ChromeOS reporting a resting palm as a rapid burst of many ordinary `pointerType: "touch"` contacts while Pen mode was active.
- In Pen mode, one/two-finger navigation now has a short 120 ms intent window before pan/pinch begins. This gives a 3+ contact palm burst time to identify itself before the page is moved.
- Three or more contacts during that pending window classify the gesture as palm and suppress it until those contacts lift.
- When the platform exposes pen hover/in-range or a recent pen contact, new touch contacts are also treated as probable palm contacts.
- Once a deliberate two-finger navigation gesture has been accepted, extra contacts are ignored instead of redefining the gesture.
- Hand mode keeps the previous immediate one-finger pan / two-finger pinch behavior.
- The existing 5.0.8 Apple Pencil PointerEvent + stylus TouchEvent ink path is unchanged.
- Diagnostics remain enabled and now include `palm-touch-suppressed`, `touch-navigation-intentional`, and `extra-touch-ignored-during-navigation` records so Chromebook behavior can be checked directly.

## 5.0.9 Surface Pen hover cursor

- A real `pointerType: "pen"` hovering over a viewer now hides the browser cursor on the PDF surface.
- This removes the distracting plus/crosshair seen with Surface Pen hover.
- Normal mouse behavior remains available for desktop testing.

## 5.0.8 Apple Pencil contact fallback

- Pointer Events remain the preferred ink input.
- Safari Touch Events are watched only for touches explicitly identified as `stylus`.
- If a stylus TouchEvent arrives for a contact that has no active pointer-owned stroke, it can supply the missing stroke.
- If both event streams arrive, one owns the stroke and the other is shadowed to avoid duplicates.
- Diagnostic download remains available and now records the stylus-TouchEvent fallback path too.

## 5.0.8 More-menu stacking fix

- The app bar now owns a stacking context above the annotation toolbar, allowing its fixed More popover to render in front rather than behind.

## 5.0.8 iPad / Apple Pencil Pen-mode selection suppression
- Follow-up testing of 5.0.4 showed that after toolbar text was made non-selectable, iPadOS occasionally selected **footer text** instead while Apple Pencil was writing. This confirms that the problem is not a particular toolbar glyph; WebKit can leak a Pencil interaction into native text selection and retarget the selection to another selectable region.
- While **Pen** is active in the document viewer, PDF Workbench now suppresses native `selectstart`, selection ranges, context-menu/touch-callout behavior, and user selection across the viewer plus adjacent app chrome (top bar, annotation bar, and status/footer bar).
- The guard is tied to **Pen + viewer mode**, not permanently to the whole app. In **Hand/View** mode the document-wide JavaScript selection guard is off so deliberate text-selection behavior can be supported there later.
- Intentional toolbar taps still use normal button behavior; finger pan/pinch, stored ink points, coalesced-event sampling, Canvas rendering, PDF export, and split-pane annotation synchronization are unchanged.
- This supersedes the narrower 5.0.4 toolbar-only guard.

## 5.0.4 iPad / Apple Pencil native toolbar-selection fix
- Clarification from iPad testing: the Hand tool was **not being activated**. Instead, while writing on the page, iPadOS would occasionally **select the visible Hand glyph as text** and show the native **Copy / Look Up / …** selection callout. The current Pencil stroke was skipped/cancelled at the same time.
- This can happen even with the writing area far below the toolbar and with or without palm contact, so it is not ordinary palm rejection and not an intentional toolbar tap.
- The annotation toolbar and all of its descendants are now explicitly non-selectable with both standard and WebKit CSS, and the iOS touch callout is disabled for that app-chrome region.
- A defensive `selectstart`/`contextmenu` guard prevents the browser from opening native selection/callout UI on the annotation toolbar, and any selection that WebKit nevertheless anchors inside the toolbar is immediately cleared.
- The 5.0.3 compatibility-click authentication experiment has been removed because the user's clarification showed that a tool-switch click was not the observed failure mode. Normal Hand/Pen/color/width taps therefore use the ordinary control event path again.
- Stored ink points, coalesced-event sampling, stroke geometry, Canvas rendering, PDF export, split-pane synchronization, and finger pan/pinch are unchanged in 5.0.4.

## 5.0.3 diagnostic note
- 5.0.3 attempted to guard against stray compatibility clicks because the initial symptom was described as the Hand icon being selected. Further testing clarified that “selected” meant **native text selection with Copy / Look Up**, not activation of the Hand tool. 5.0.4 supersedes that diagnosis and removes the unnecessary click-authentication layer.

## 5.0.2 PDF ink export fix
- Fixed the white wedges/slits that could appear on the inside of wider curved pen strokes in exported PDFs.
- Cause: each sampled point pair was exported as an independent PDF line segment. The separate flat-ended segments did not form a true joined path at turns.
- Export now writes each stored pen stroke as one continuous vector path with **round joins and round end caps**, matching the completed-stroke Canvas renderer much more closely.
- Stored annotation points, on-screen drawing, Undo/Redo, Library persistence, and editable backup data are unchanged. This is deliberately **not** the later interpolation/smoothing pass.
- Keeping each exported stroke continuous also avoids the joint-overlap darkening that would result from simply putting a round cap on every independent segment; that matters for future translucent tools such as Highlighter.

## 5.0.1 Presentation toolbar fix
- Fixed a regression in Presentation mode where the new full-width annotation toolbar was translated left by 50%, leaving roughly half of the bar off-screen.
- Cause: a legacy rule for the older centered floating Presentation palette (`translateX(-50%)`) was still winning the CSS cascade after the toolbar was converted to an edge-docked full-width strip.
- The unified Presentation annotation toolbar now explicitly uses `transform: none` and remains docked to the full viewport width.
- No annotation data, PDF export, Library, backup, or view-state behavior was intentionally changed in this bug-fix build.

## Unified annotation toolbar
- View now has a thin, full-width annotation strip immediately above the PDF viewport.
- Presentation uses the **same strip at the very top edge**; its existing document/view/page controls are appended to the right rather than appearing in a separate floating palette.
- The annotation controls keep the same left-to-right positions in View and Presentation.
- For this first annotation build the Presentation strip stays **always visible** so tool/color/width changes are one tap away. A later setting will offer always-visible vs. auto-hide after the core ink interactions are proven.
- The document viewport is reduced by the toolbar height; the strip does not cover the PDF.

## Basic pen
- **Hand/View** mode preserves the previous safe behavior: stylus contact on the document does not draw. Finger navigation continues to pan/scroll/pinch as before.
- **Pen** mode draws with Surface Pen / Apple Pencil style pointer input. Primary-button mouse drawing is also supported for desktop testing.
- Five direct pen colors, in order: **black, blue, red, green, orange**.
- Three direct pen widths: **thin, medium, thick** (1.5 pt, 3 pt, 5.5 pt).
- Choosing a color or width also selects Pen, so common changes require one tap.
- Pen tool, color, and width are remembered locally across navigation/relaunches.
- Coalesced pointer samples are used when the browser provides them.
- Finger drawing is intentionally **off**; touch remains navigation-only.

## Editable ink model
- Ink is stored non-destructively as page-local vector stroke data in Workbench page/PDF coordinates, not as screen pixels.
- Zooming, fitting, View/Presentation changes, page rotation, and split-pane viewing do not change the stored stroke coordinates.
- Same-document split panes share the annotation data; a live stroke is mirrored to another rendered instance of the same page.
- Ink is included in Local Library persistence and editable `.pwbbackup.zip` backups.
- Ink participates in the existing Undo/Redo history.
- Page duplication/copy/combine operations carry ink. **Duplicate clean** now omits Workbench ink as its label implies.
- Page-size fit/center and crop/margin operations apply corresponding basic transforms to Workbench ink so existing strokes remain attached to the page when those operations are used after writing.

## PDF export
- Workbench pen strokes are written into exported PDFs as vector linework rather than rasterizing the page.
- A source PDF with no Workbench ink remains eligible for the exact-byte untouched export path introduced in 4.2.1.
- Once ink is present, the structural export path is used and the annotations are added to the copied/generated/image page.
- The 4.2.1 batched source-page copying/resource-sharing fix remains intact.

## Not in this build yet
- Images as annotation objects
- Recolor selected strokes
- Annotation-toolbar auto-hide/edge-placement setting
- Draw with Finger setting
- Pressure-sensitive width

## Storage/versioning
- IndexedDB database version: **2**
- Library schema version: **5** (page records can now contain Workbench annotation stroke data)
- Editable backup format version: **1**
- Service-worker cache: `pdf-workbench-m5.4.0-v1`

## High-priority smoke tests
1. On iPad, Surface, and Chromebook, draw several separate strokes, choose Select, lasso one stroke and then a group. Verify the selected objects get one bounding box and that unselected strokes remain untouched.
2. Drag the selected group to move it, then resize from each corner. Undo/Redo both operations and verify the geometry and stroke widths return correctly.
3. Test Delete, Duplicate, Copy, and Paste. Paste once on the same page, once on a different page, and once into another open document. In split view, verify edits to the same page appear in both panes.
4. Export after move/resize/delete/duplicate/paste and confirm Adobe Acrobat shows only the resulting vector ink, with no lasso/bounding-box UI.
5. On each device, draw several long and short crossing strokes, choose each Eraser size, and erase through the middle of strokes. Confirm only the touched portions disappear, surviving fragments remain, and Undo restores the original stroke in one step. Test a dot/very short stroke as well.
6. Erase in one pane while the same page is visible in the other split pane; confirm both panes update. Export the erased page and confirm the gaps remain in the PDF.
7. On iPad/Surface/Chromebook in Eraser mode, rest the palm naturally and verify deliberate finger pan/pinch still works when the stylus is away.
8. On Surface, open a PDF, choose Pen, hover the pen over the page and confirm the browser crosshair/plus cursor is hidden. Write at several zoom levels, switch colors and widths, then use Undo/Redo.
9. On Chromebook in Pen mode, rest the palm naturally while writing. Confirm the page no longer jumps or repeatedly changes zoom. Then move the pen away and deliberately test one-finger pan and two-finger pinch; both should still work after the brief intent delay.
10. Repeat with Apple Pencil on iPad for several lines of handwriting. Confirm the native **Copy / Look Up / …** selection callout never appears on toolbar, footer/status text, or page/PDF text; confirm deliberate finger navigation still works when the Pencil is away.
11. Switch between View and Presentation. Confirm the annotation controls stay in the same order and Presentation's full-width bar remains at the top without covering the page.
12. In split view, show the same document in both panes at different pages/zoom positions. Write in one pane; verify view states remain independent and shared ink appears correctly when the same annotated page is visible.
13. Relaunch the app with several documents open (including split view) and confirm the open workspace, active document/pane, and viewer positions restore. Then use **Close all files**, relaunch, and confirm the active workspace stays empty while Library documents remain available.
14. Back up on one device and restore on another; confirm ink survives the editable backup.
15. Export an annotated PDF and inspect it in Adobe Acrobat or another viewer. Check placement, color, width, rotation, and file size.
16. Re-test the previously problematic slide deck unchanged; it should still export byte-for-byte. Add a short pen stroke and export again; the file should remain reasonably sized.
17. Save one template **With annotations** and one **Clean**; confirm their previews/content differ correctly. In Template Manager set the automatic last page to Graph, Blank, and then a saved template, and test pull/scroll-past-end creation for each.
18. Rotate an annotated page and, separately, try Page size and Crop/margins after ink to verify stroke alignment remains sensible.
**More → About this build** reports **Milestone 5.4.0**.
