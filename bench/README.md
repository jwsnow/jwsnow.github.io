# PDF Workbench — Milestone 5.0.11

Milestone 5.0.11 keeps the stable 5.0.10 cross-platform pen/touch path unchanged and returns to deferred workspace/page-flow behavior. It hardens restart restoration, adds clean-vs-annotated template creation, and adds configurable pull/scroll-past-end page creation.

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
- Partial-stroke eraser (required next; whole-stroke-only is not the final design)
- Lasso/select, move, resize, delete, duplicate
- Highlighter and its separate yellow/pink/blue/green palette/widths
- Recolor selected strokes
- Annotation-toolbar auto-hide/edge-placement setting
- Draw with Finger setting
- Pressure-sensitive width
- Images as annotation objects

## Storage/versioning
- IndexedDB database version: **2**
- Library schema version: **5** (page records can now contain Workbench annotation stroke data)
- Editable backup format version: **1**
- Service-worker cache: `pdf-workbench-m5.0.11-v1`

## High-priority smoke tests
1. On Surface, open a PDF, choose Pen, hover the pen over the page and confirm the browser crosshair/plus cursor is hidden. Write at several zoom levels, switch colors and widths, then use Undo/Redo.
2. On Chromebook in Pen mode, rest the palm naturally while writing. Confirm the page no longer jumps or repeatedly changes zoom. Then move the pen away and deliberately test one-finger pan and two-finger pinch; both should still work after the brief intent delay.
3. Repeat with Apple Pencil on iPad for several lines of handwriting. Confirm the native **Copy / Look Up / …** selection callout never appears on toolbar, footer/status text, or page/PDF text; confirm deliberate finger navigation still works when the Pencil is away.
4. Switch between View and Presentation. Confirm the annotation controls stay in the same order and Presentation's full-width bar remains at the top without covering the page.
5. In split view, show the same document in both panes at different pages/zoom positions. Write in one pane; verify view states remain independent and shared ink appears correctly when the same annotated page is visible.
6. Relaunch the app with several documents open (including split view) and confirm the open workspace, active document/pane, and viewer positions restore. Then use **Close all files**, relaunch, and confirm the active workspace stays empty while Library documents remain available.
7. Back up on one device and restore on another; confirm ink survives the editable backup.
8. Export an annotated PDF and inspect it in Adobe Acrobat or another viewer. Check placement, color, width, rotation, and file size.
9. Re-test the previously problematic slide deck unchanged; it should still export byte-for-byte. Add a short pen stroke and export again; the file should remain reasonably sized.
10. Save one template **With annotations** and one **Clean**; confirm their previews/content differ correctly. In Template Manager set the automatic last page to Graph, Blank, and then a saved template, and test pull/scroll-past-end creation for each.
11. Rotate an annotated page and, separately, try Page size and Crop/margins after ink to verify stroke alignment remains sensible.

**More → About this build** reports **Milestone 5.0.11**.
