const APP_VERSION = '3.5.3';

const PDFJS_URL = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@6.2.108/build/pdf.mjs';
const PDFJS_WORKER_URL = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@6.2.108/build/pdf.worker.mjs';
const PDFJS_WASM_URL = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@6.2.108/wasm/';
const PDFJS_CMAP_URL = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@6.2.108/cmaps/';
const PDFJS_STANDARD_FONT_URL = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@6.2.108/standard_fonts/';
const PDFLIB_URL = 'https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.esm.min.js';
const JSZIP_URL = 'https://cdn.jsdelivr.net/npm/jszip@3.10.1/+esm';

const $ = (id) => document.getElementById(id);
const els = {
  app: $('app'), openBtn: $('openBtn'), newBlankDocumentBtn: $('newBlankDocumentBtn'), newGraphDocumentBtn: $('newGraphDocumentBtn'), emptyOpenBtn: $('emptyOpenBtn'), fileInput: $('fileInput'), documentSelect: $('documentSelect'),
  viewModeBtn: $('viewModeBtn'), organizeModeBtn: $('organizeModeBtn'), exportModeBtn: $('exportModeBtn'), viewerControls: $('viewerControls'),
  scrollModeBtn: $('scrollModeBtn'), scrollModeIcon: $('scrollModeIcon'), scrollModeLabel: $('scrollModeLabel'),
  fitModeBtn: $('fitModeBtn'), fitModeIcon: $('fitModeIcon'), fitModeLabel: $('fitModeLabel'), zoomOutBtn: $('zoomOutBtn'), zoomResetBtn: $('zoomResetBtn'), zoomInBtn: $('zoomInBtn'), zoomLabel: $('zoomLabel'), splitViewBtn: $('splitViewBtn'), splitViewLabel: $('splitViewLabel'), viewInsertBtn: $('viewInsertBtn'), presentBtn: $('presentBtn'),
  moreBtn: $('moreBtn'), moreMenu: $('moreMenu'), clearBtn: $('clearBtn'), installHelpBtn: $('installHelpBtn'), aboutBtn: $('aboutBtn'),
  emptyState: $('emptyState'), viewerPane: $('viewerPane'), viewer: $('viewer'), splitViewer: $('splitViewer'), organizerPane: $('organizerPane'), exportPane: $('exportPane'), openDocumentList: $('openDocumentList'), fileSelectionSummary: $('fileSelectionSummary'), selectAllFilesBtn: $('selectAllFilesBtn'), clearFileSelectionBtn: $('clearFileSelectionBtn'), exportOperationSummary: $('exportOperationSummary'), exportSummary: $('exportSummary'), exportFilenameLabel: $('exportFilenameLabel'), exportFilename: $('exportFilename'), exportPdfBtn: $('exportPdfBtn'), exportProgress: $('exportProgress'),
  extractSummary: $('extractSummary'), extractFilename: $('extractFilename'), extractPdfBtn: $('extractPdfBtn'), extractProgress: $('extractProgress'),
  splitBaseName: $('splitBaseName'), splitEveryCount: $('splitEveryCount'), splitFixedBtn: $('splitFixedBtn'), splitRanges: $('splitRanges'), splitRangesBtn: $('splitRangesBtn'), splitProgress: $('splitProgress'), splitOperationSummary: $('splitOperationSummary'),
  combineName: $('combineName'), combineList: $('combineList'), combineBtn: $('combineBtn'), combineProgress: $('combineProgress'), combineOperationSummary: $('combineOperationSummary'),
  splitLeftPane: $('splitLeftPane'), splitLeftViewer: $('splitLeftViewer'), splitLeftDocumentSelect: $('splitLeftDocumentSelect'), splitLeftNav: $('splitLeftNav'), splitLeftPrevBtn: $('splitLeftPrevBtn'), splitLeftNextBtn: $('splitLeftNextBtn'), splitLeftCounter: $('splitLeftCounter'),
  splitRightPane: $('splitRightPane'), splitRightViewer: $('splitRightViewer'), splitRightDocumentSelect: $('splitRightDocumentSelect'), splitRightNav: $('splitRightNav'), splitRightPrevBtn: $('splitRightPrevBtn'), splitRightNextBtn: $('splitRightNextBtn'), splitRightCounter: $('splitRightCounter'),
  thumbnailGrid: $('thumbnailGrid'), pageCountLabel: $('pageCountLabel'), selectionLabel: $('selectionLabel'),
  selectAllBtn: $('selectAllBtn'), rotateBtn: $('rotateBtn'), insertPageBtn: $('insertPageBtn'), duplicateBtn: $('duplicateBtn'), extractSelectedPagesBtn: $('extractSelectedPagesBtn'), deleteBtn: $('deleteBtn'),
  undoBtn: $('undoBtn'), redoBtn: $('redoBtn'), statusText: $('statusText'), pdfEngineStatus: $('pdfEngineStatus'),
  singlePageNav: $('singlePageNav'), prevPageBtn: $('prevPageBtn'), nextPageBtn: $('nextPageBtn'), pageCounter: $('pageCounter'),
  presentationToolbar: $('presentationToolbar'), presentationLayoutBtn: $('presentationLayoutBtn'), presentationInsertBtn: $('presentationInsertBtn'), presentationPaneChooser: $('presentationPaneChooser'), presentationLeftPaneBtn: $('presentationLeftPaneBtn'), presentationRightPaneBtn: $('presentationRightPaneBtn'), presentationDocumentSelect: $('presentationDocumentSelect'), presentationScrollModeBtn: $('presentationScrollModeBtn'), presentationFitBtn: $('presentationFitBtn'), presentationZoomOutBtn: $('presentationZoomOutBtn'), presentationZoomInBtn: $('presentationZoomInBtn'), presentationZoomLabel: $('presentationZoomLabel'), presentationExit: $('presentationExit'), insertPageMenu: $('insertPageMenu'), insertDuplicateWithAnnotationsBtn: $('insertDuplicateWithAnnotationsBtn'), insertDuplicateWithoutAnnotationsBtn: $('insertDuplicateWithoutAnnotationsBtn'), insertBlankPageBtn: $('insertBlankPageBtn'), insertGraphPageBtn: $('insertGraphPageBtn'), insertDuplicateWithPreview: $('insertDuplicateWithPreview'), insertDuplicateWithoutPreview: $('insertDuplicateWithoutPreview'), insertBlankPreview: $('insertBlankPreview'), insertGraphPreview: $('insertGraphPreview'), insertTemplateList: $('insertTemplateList'), savePageTemplateBtn: $('savePageTemplateBtn'), manageTemplatesBtn: $('manageTemplatesBtn'), templateNameDialog: $('templateNameDialog'), templateNameForm: $('templateNameForm'), templateNameInput: $('templateNameInput'), templateNameCloseBtn: $('templateNameCloseBtn'), templateNameCancelBtn: $('templateNameCancelBtn'), infoDialog: $('infoDialog'), dialogContent: $('dialogContent')
};

const state = {
  pdfjs: null,
  pdfLib: null,
  zipLib: null,
  pdfEngineError: null,
  documents: [],
  currentDocumentId: null,
  sources: new Map(),
  pages: [],
  selected: new Set(),
  selectionAnchorId: null,
  activePageId: null,
  workspaceMode: 'view',
  scrollMode: safePref('pdfwb-scroll-mode', 'continuous', ['continuous', 'snap', 'single']),
  fitMode: safePref('pdfwb-fit-mode', 'width', ['width', 'page']),
  zoom: 1,
  history: [],
  future: [],
  fileSelected: new Set(),
  fileSelectionInitialized: false,
  combineOrder: [],
  renderGeneration: 0,
  pageObserver: null,
  thumbObserver: null,
  dragging: null,
  lastWheelPageChange: 0,
  statusTimer: null,
  presentationControlsTimer: null,
  presentationRevealPointerId: null,
  presentationSuppressClicksUntil: 0,
  singlePresentationTransitionActive: false,
  touchPointers: new Map(),
  touchPan: null,
  touchInertiaFrame: null,
  pinchGesture: null,
  pinchNeedsRender: false,
  pinchRenderFrame: null,
  suppressSingleScrollSave: false,
  singleActivePageSyncFrame: null,
  insertMenuAnchor: null,
  insertTarget: null,
  pendingPageFocus: null,
  templates: [],
  insertPreviewGeneration: 0,
  splitView: false,
  activePaneId: 'left',
  singleSourcePaneId: 'left',
  splitPanes: {
    left: { id: 'left', documentId: null, views: new Map(), observer: null, generation: 0, lastWheelPageChange: 0, touchStart: null, touchPointers: new Map(), touchPan: null, touchInertiaFrame: null, pinchGesture: null, pinchNeedsRender: false, pinchRenderFrame: null, suppressScrollSave: false, activePageSyncFrame: null, pendingStructuralAnchor: null },
    right: { id: 'right', documentId: null, views: new Map(), observer: null, generation: 0, lastWheelPageChange: 0, touchStart: null, touchPointers: new Map(), touchPan: null, touchInertiaFrame: null, pinchGesture: null, pinchNeedsRender: false, pinchRenderFrame: null, suppressScrollSave: false, activePageSyncFrame: null, pendingStructuralAnchor: null },
  },
};

function safePref(key, fallback, allowed) {
  try {
    const value = localStorage.getItem(key);
    return allowed.includes(value) ? value : fallback;
  } catch { return fallback; }
}
function savePref(key, value) { try { localStorage.setItem(key, value); } catch {} }
function uid(prefix='id') { return `${prefix}-${crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`}`; }
function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

// Keep raster work bounded. Image-only PDFs can require large temporary bitmaps;
// letting many pages render at once can exhaust browser/GPU memory and leave
// apparently blank canvases. Viewer jobs are given priority over thumbnails.
const renderQueue = { active: 0, max: 2, jobs: [] };
function enqueueRender(task, priority=0) {
  return new Promise((resolve, reject) => {
    renderQueue.jobs.push({ task, priority, resolve, reject });
    renderQueue.jobs.sort((a, b) => b.priority - a.priority);
    pumpRenderQueue();
  });
}
function pumpRenderQueue() {
  while (renderQueue.active < renderQueue.max && renderQueue.jobs.length) {
    const job = renderQueue.jobs.shift();
    renderQueue.active++;
    Promise.resolve().then(job.task).then(job.resolve, job.reject).finally(() => {
      renderQueue.active--;
      pumpRenderQueue();
    });
  }
}
function rotatedDims(page) { return page.rotation % 180 === 0 ? [page.width, page.height] : [page.height, page.width]; }
function activeIndex() { return Math.max(0, state.pages.findIndex(p => p.id === state.activePageId)); }
function pageById(id) { return state.pages.find(p => p.id === id); }


function currentDocument() {
  return state.documents.find(d => d.id === state.currentDocumentId) || null;
}

function saveCurrentDocumentState(options={}) {
  const { readViewDom = true } = options;
  const doc = currentDocument();
  if (!doc) return;
  // Before persisting a normal single-view document, make the page nearest the
  // viewport center authoritative. This is independent of IntersectionObserver
  // callback timing and is especially important in Page Snap mode.
  if (readViewDom && !state.splitView && els.viewer && !els.viewer.classList.contains('hidden')) {
    syncSingleActivePageFromViewport({ updateUi: false });
  }
  doc.pages = state.pages;
  doc.selected = state.selected;
  doc.selectionAnchorId = state.selectionAnchorId;
  doc.activePageId = state.activePageId;
  doc.history = state.history;
  doc.future = state.future;
  // Document content is shared, but every viewer instance owns its own view.
  // In Single view, store that view on the document so switching documents can
  // restore it without leaking state into either split pane. Some structural
  // edits (notably Insert) deliberately invalidate the old DOM scroll position;
  // those callers pass readViewDom:false so the stale pre-edit scroll cannot
  // overwrite the new page focus before the viewer is rebuilt.
  if (!state.splitView) saveSingleViewFromState(doc, readViewDom);
}

function createDocument(name) {
  saveCurrentDocumentState();
  const doc = {
    id: uid('doc'), name: name || 'Untitled', pages: [], selected: new Set(), selectionAnchorId: null,
    activePageId: null, history: [], future: [],
    // Single-view state is per document. Split panes keep their own independent
    // view-instance state, even when both panes show this same document.
    singleView: { zoom: 1, fitMode: state.fitMode, scrollMode: state.scrollMode, activePageId: null, scrollTop: null, scrollLeft: null }
  };
  state.documents.push(doc);
  state.currentDocumentId = doc.id;
  state.pages = doc.pages;
  state.selected = doc.selected;
  state.selectionAnchorId = doc.selectionAnchorId;
  state.activePageId = null;
  state.history = doc.history;
  state.future = doc.future;
  if (!state.splitView) applySingleView(doc, doc.singleView);
  if (state.splitView) {
    const pane = splitPaneState(state.activePaneId);
    pane.documentId = doc.id;
    pane.views.set(doc.id, defaultPaneView(doc));
  }
  return doc;
}

function sourceUsedByDocuments(sourceId, excludingDocumentId=null) {
  return state.documents.some(doc => doc.id !== excludingDocumentId && doc.pages.some(page => page.sourceId === sourceId));
}

function sourceUsedByTemplates(sourceId, excludingTemplateId=null) {
  return state.templates.some(template => template.id !== excludingTemplateId && template.page?.sourceId === sourceId);
}

function releaseSourceIfUnused(sourceId, options={}) {
  if (!sourceId) return;
  if (sourceUsedByDocuments(sourceId, options.excludingDocumentId || null)) return;
  if (sourceUsedByTemplates(sourceId, options.excludingTemplateId || null)) return;
  const source = state.sources.get(sourceId);
  if (!source) return;
  if (source.url) URL.revokeObjectURL(source.url);
  try { source.pdf?.destroy?.(); } catch {}
  state.sources.delete(sourceId);
}

function removeDocument(docId) {
  const index = state.documents.findIndex(d => d.id === docId);
  if (index < 0) return;
  const doc = state.documents[index];
  const sourceIds = new Set(doc.pages.map(p => p.sourceId).filter(Boolean));
  for (const sourceId of sourceIds) releaseSourceIfUnused(sourceId, { excludingDocumentId: docId });
  state.documents.splice(index, 1);
  for (const pane of Object.values(state.splitPanes)) {
    pane.views.delete(docId);
    if (pane.documentId === docId) pane.documentId = null;
  }
  ensureSplitPaneDocuments();
  if (state.currentDocumentId === docId) {
    const next = state.documents[Math.min(index, state.documents.length - 1)] || null;
    if (next) loadDocumentState(next.id, false);
    else {
      state.currentDocumentId = null;
      state.pages = [];
      state.selected = new Set();
      state.selectionAnchorId = null;
      state.activePageId = null;
      state.history = [];
      state.future = [];
    }
  }
}

function loadDocumentState(docId, rerender=true) {
  if (docId === state.currentDocumentId && currentDocument()) return;
  saveCurrentDocumentState();
  cancelSingleActivePageSync();
  const doc = state.documents.find(d => d.id === docId);
  if (!doc) return;
  state.currentDocumentId = doc.id;
  state.pages = doc.pages;
  state.selected = doc.selected;
  state.selectionAnchorId = doc.selectionAnchorId || null;
  state.activePageId = doc.activePageId || doc.pages[0]?.id || null;
  state.history = doc.history;
  state.future = doc.future;
  const singleView = ensureSingleView(doc);
  state.zoom = singleView.zoom;
  state.fitMode = singleView.fitMode;
  state.scrollMode = singleView.scrollMode;
  state.activePageId = singleView.activePageId || doc.activePageId || doc.pages[0]?.id || null;
  if (rerender) {
    state.pageObserver?.disconnect();
    state.thumbObserver?.disconnect();
    // The DOM still contains the previously displayed document at this point.
    // Do not let renderAll save those stale scroll offsets into the document we
    // have just loaded.
    renderAll({ saveState: false });
    setStatus(`Switched to ${doc.name}`);
  }
}


function paneElements(paneId) {
  if (paneId === 'right') return {
    pane: els.splitRightPane, viewer: els.splitRightViewer, select: els.splitRightDocumentSelect,
    nav: els.splitRightNav, prev: els.splitRightPrevBtn, next: els.splitRightNextBtn, counter: els.splitRightCounter
  };
  return {
    pane: els.splitLeftPane, viewer: els.splitLeftViewer, select: els.splitLeftDocumentSelect,
    nav: els.splitLeftNav, prev: els.splitLeftPrevBtn, next: els.splitLeftNextBtn, counter: els.splitLeftCounter
  };
}

function splitPaneState(paneId=state.activePaneId) { return state.splitPanes[paneId === 'right' ? 'right' : 'left']; }
function documentById(docId) { return state.documents.find(d => d.id === docId) || null; }
function paneDocument(paneId=state.activePaneId) { return documentById(splitPaneState(paneId).documentId); }

function ensureSplitPaneDocuments() {
  const ids = new Set(state.documents.map(d => d.id));
  const left = state.splitPanes.left, right = state.splitPanes.right;
  if (!ids.has(left.documentId)) left.documentId = state.currentDocumentId || state.documents[0]?.id || null;
  if (!ids.has(right.documentId)) {
    right.documentId = state.documents.find(d => d.id !== left.documentId)?.id || left.documentId || state.documents[0]?.id || null;
  }
  if (!ids.has(splitPaneState(state.activePaneId).documentId)) state.activePaneId = 'left';
}

function ensureSingleView(doc) {
  if (!doc) return null;
  if (!doc.singleView) {
    doc.singleView = {
      zoom: 1,
      fitMode: state.fitMode,
      scrollMode: state.scrollMode,
      activePageId: doc.activePageId || doc.pages?.[0]?.id || null,
      scrollTop: null,
      scrollLeft: null,
    };
  }
  doc.singleView.zoom = clamp(doc.singleView.zoom ?? 1, 0.25, 4);
  doc.singleView.fitMode = ['width','page'].includes(doc.singleView.fitMode) ? doc.singleView.fitMode : state.fitMode;
  doc.singleView.scrollMode = ['continuous','snap','single'].includes(doc.singleView.scrollMode) ? doc.singleView.scrollMode : state.scrollMode;
  const ids = new Set((doc.pages || []).map(p => p.id));
  if (!doc.singleView.activePageId || !ids.has(doc.singleView.activePageId)) doc.singleView.activePageId = doc.activePageId || doc.pages?.[0]?.id || null;
  return doc.singleView;
}

function saveSingleViewFromState(doc=currentDocument(), readDom=false) {
  if (!doc) return null;
  const view = ensureSingleView(doc);
  view.zoom = clamp(state.zoom, 0.25, 4);
  view.fitMode = state.fitMode;
  view.scrollMode = state.scrollMode;
  view.activePageId = state.activePageId || doc.pages?.[0]?.id || null;
  if (readDom && els.viewer && !els.viewer.classList.contains('hidden')) {
    view.scrollTop = els.viewer.scrollTop;
    view.scrollLeft = els.viewer.scrollLeft;
  }
  return view;
}

function copyView(view) {
  return view ? {
    zoom: clamp(view.zoom ?? 1, 0.25, 4),
    fitMode: ['width','page'].includes(view.fitMode) ? view.fitMode : state.fitMode,
    scrollMode: ['continuous','snap','single'].includes(view.scrollMode) ? view.scrollMode : state.scrollMode,
    activePageId: view.activePageId || null,
    scrollTop: Number.isFinite(view.scrollTop) ? view.scrollTop : null,
    scrollLeft: Number.isFinite(view.scrollLeft) ? view.scrollLeft : null,
  } : null;
}

function applySingleView(doc, view=ensureSingleView(doc)) {
  if (!doc || !view) return;
  const v = copyView(view);
  state.zoom = v.zoom;
  state.fitMode = v.fitMode;
  state.scrollMode = v.scrollMode;
  state.activePageId = v.activePageId || doc.pages?.[0]?.id || null;
  doc.singleView = v;
}

function defaultPaneView(doc) {
  const source = ensureSingleView(doc);
  return {
    zoom: source?.zoom ?? 1,
    fitMode: source?.fitMode ?? state.fitMode,
    scrollMode: source?.scrollMode ?? state.scrollMode,
    activePageId: source?.activePageId || doc?.activePageId || doc?.pages?.[0]?.id || null,
    scrollTop: null,
    scrollLeft: null,
  };
}

function paneView(paneId=state.activePaneId, docId=null) {
  const pane = splitPaneState(paneId);
  const id = docId || pane.documentId;
  if (!id) return null;
  if (!pane.views.has(id)) pane.views.set(id, defaultPaneView(documentById(id)));
  const view = pane.views.get(id);
  const doc = documentById(id);
  if (doc) {
    const ids = new Set(doc.pages.map(p => p.id));
    if (!view.activePageId || !ids.has(view.activePageId)) view.activePageId = doc.pages[0]?.id || null;
  }
  return view;
}

function savePaneScroll(paneId) {
  const pane = splitPaneState(paneId), pe = paneElements(paneId), view = paneView(paneId);
  if (!view || !pe.viewer) return;
  // Keep page identity and raw scroll coordinates in sync. Split panes are
  // independent view instances, so each pane derives its current page from
  // its own viewport rather than from document-level or observer timing.
  if (!pane.suppressScrollSave && view.scrollMode !== 'single') {
    syncSplitActivePageFromViewport(paneId, { updateUi: false });
  }
  view.scrollTop = pe.viewer.scrollTop;
  view.scrollLeft = pe.viewer.scrollLeft;
}

function activateSplitPane(paneId, syncCurrent=true) {
  state.activePaneId = paneId === 'right' ? 'right' : 'left';
  ensureSplitPaneDocuments();
  // A pane may have been scrolled while inactive. Make the page actually at
  // its viewport center authoritative before toolbar/page operations use it.
  syncSplitActivePageFromViewport(state.activePaneId, { updateUi: false });
  const pane = splitPaneState();
  if (syncCurrent && pane.documentId && pane.documentId !== state.currentDocumentId) loadDocumentState(pane.documentId, false);
  // loadDocumentState restores that document's single-view page; split mode
  // must immediately put the active pane's independent page identity back on
  // the shared editing state used by document-level commands and labels.
  const activeView = paneView(state.activePaneId);
  if (activeView?.activePageId) state.activePageId = activeView.activePageId;
  els.splitLeftPane?.classList.toggle('active', state.activePaneId === 'left');
  els.splitRightPane?.classList.toggle('active', state.activePaneId === 'right');
  if (els.presentationLeftPaneBtn) {
    els.presentationLeftPaneBtn.setAttribute('aria-pressed', String(state.activePaneId === 'left'));
    els.presentationRightPaneBtn.setAttribute('aria-pressed', String(state.activePaneId === 'right'));
  }
  if (els.presentationDocumentSelect && pane.documentId) els.presentationDocumentSelect.value = pane.documentId;
  updateViewerLabels();
}

function setPaneDocument(paneId, docId) {
  if (!documentById(docId)) return;
  savePaneScroll(paneId);
  const pane = splitPaneState(paneId);
  pane.documentId = docId;
  paneView(paneId, docId);
  activateSplitPane(paneId, true);
  renderDocumentSelect();
  renderSplitPane(paneId);
  setStatus(`Showing ${documentById(docId)?.name || 'document'} in ${paneId} pane`);
}

function populateDocumentSelect(select, selectedId) {
  if (!select) return;
  select.replaceChildren();
  for (const doc of state.documents) {
    const option = document.createElement('option');
    option.value = doc.id;
    option.textContent = doc.name;
    select.append(option);
  }
  if (selectedId && documentById(selectedId)) select.value = selectedId;
  select.disabled = state.documents.length === 0;
}

function renderDocumentSelect() {
  ensureSplitPaneDocuments();
  populateDocumentSelect(els.documentSelect, state.currentDocumentId);
  els.documentSelect.classList.toggle('hidden', state.documents.length === 0 || state.splitView);

  populateDocumentSelect(els.splitLeftDocumentSelect, state.splitPanes.left.documentId);
  populateDocumentSelect(els.splitRightDocumentSelect, state.splitPanes.right.documentId);

  const presentationDocId = state.splitView ? splitPaneState().documentId : state.currentDocumentId;
  populateDocumentSelect(els.presentationDocumentSelect, presentationDocId);
  els.presentationDocumentSelect.classList.toggle('hidden', state.documents.length === 0);
  els.presentationPaneChooser?.classList.toggle('hidden', !state.splitView);

  els.splitLeftDocumentSelect.title = state.documents.length > 1 ? 'Switch document in left pane' : 'Left pane document';
  els.splitRightDocumentSelect.title = state.documents.length > 1 ? 'Switch document in right pane' : 'Right pane document';
}

async function registerServiceWorker() {
  if (!('serviceWorker' in navigator) || location.protocol === 'file:') return;
  try {
    // If this launch is already controlled by an older Workbench service worker,
    // reload once when a newly deployed worker takes control. This makes an
    // installed PWA pick up a new release on an online launch without requiring
    // the user to remove/reinstall it.
    const hadController = !!navigator.serviceWorker.controller;
    let updateReloadStarted = false;
    if (hadController) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (updateReloadStarted) return;
        updateReloadStarted = true;
        location.reload();
      }, { once: true });
    }

    const registration = await navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' });
    // Ask for an update check on each online launch. The release process bumps
    // the service-worker/cache version whenever application files change.
    if (navigator.onLine) await registration.update().catch(() => {});
    await navigator.serviceWorker.ready;
    navigator.serviceWorker.controller?.postMessage({ type: 'CACHE_EXTERNAL', urls: [PDFJS_URL, PDFJS_WORKER_URL, PDFLIB_URL, JSZIP_URL] });
  } catch (err) { console.warn('Service worker unavailable', err); }
}

async function loadPdfEngine() {
  els.pdfEngineStatus.textContent = 'Loading PDF engine…';
  try {
    const pdfjs = await import(PDFJS_URL);
    pdfjs.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_URL;
    state.pdfjs = pdfjs;
    els.pdfEngineStatus.textContent = 'PDF engine ready';
    els.pdfEngineStatus.className = 'engine-status ok';
  } catch (err) {
    state.pdfEngineError = err;
    els.pdfEngineStatus.textContent = 'PDF engine unavailable — images still work';
    els.pdfEngineStatus.className = 'engine-status warn';
    console.error(err);
  }
}

function setStatus(text, sticky=false) {
  clearTimeout(state.statusTimer);
  els.statusText.textContent = text;
  if (!sticky) state.statusTimer = setTimeout(() => { els.statusText.textContent = state.pages.length ? `${state.pages.length} page${state.pages.length === 1 ? '' : 's'}` : 'Ready'; }, 3500);
}

function snapshotPages() {
  return state.pages.map(p => ({ ...p }));
}
function commitHistory(before) {
  state.history.push(before);
  if (state.history.length > 50) state.history.shift();
  state.future = [];
  updateHistoryButtons();
}
function restorePages(snapshot) {
  state.pages = snapshot.map(p => ({ ...p }));
  const ids = new Set(state.pages.map(p => p.id));
  state.selected = new Set([...state.selected].filter(id => ids.has(id)));
  if (!state.activePageId || !ids.has(state.activePageId)) state.activePageId = state.pages[0]?.id ?? null;
  renderAll();
}
function undo() {
  if (!state.history.length) return;
  const previous = state.history.pop();
  state.future.push(snapshotPages());
  restorePages(previous);
  updateHistoryButtons();
}
function redo() {
  if (!state.future.length) return;
  const next = state.future.pop();
  state.history.push(snapshotPages());
  restorePages(next);
  updateHistoryButtons();
}
function updateHistoryButtons() {
  els.undoBtn.disabled = !state.history.length;
  els.redoBtn.disabled = !state.future.length;
}

async function openFiles(fileList) {
  const files = [...fileList];
  if (!files.length) return;
  setStatus(`Opening ${files.length} file${files.length === 1 ? '' : 's'}…`, true);
  let opened = 0;
  let pagesAdded = 0;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    setStatus(`Opening ${file.name} (${i + 1} of ${files.length})…`, true);
    const supported = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf') || file.type.startsWith('image/');
    if (!supported) { setStatus(`Skipped unsupported file: ${file.name}`); continue; }
    const doc = createDocument(file.name);
    try {
      let added = 0;
      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) added = await addPdf(file);
      else added = await addImage(file);
      if (!added) throw new Error('No pages were found.');
      state.activePageId = state.pages[0]?.id ?? null;
      // This newly opened document is not yet represented by the viewer DOM.
      // Save its model/view defaults without reading scroll offsets from the
      // previously displayed document.
      saveCurrentDocumentState({ readViewDom: false });
      opened++;
      pagesAdded += added;
    } catch (err) {
      console.error(err);
      removeDocument(doc.id);
      setStatus(`Could not open ${file.name}: ${err.message || err}`);
    }
  }
  if (opened) state.workspaceMode = 'view';
  // During a multi-file open the DOM still belongs to the document that was
  // visible before import; do not write that geometry into the last opened doc.
  renderAll({ saveState: false });
  renderDocumentSelect();
  if (opened) setStatus(`Opened ${opened} document${opened === 1 ? '' : 's'} (${pagesAdded} page${pagesAdded === 1 ? '' : 's'})`);
  els.fileInput.value = '';
}

async function addPdf(file) {
  if (!state.pdfjs) {
    throw new Error('The PDF engine has not loaded. Connect once to load it, then this PWA can cache it for later use.');
  }
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const sourceId = uid('src');
  const pdf = await state.pdfjs.getDocument({
    data: bytes.slice(),
    wasmUrl: PDFJS_WASM_URL,
    cMapUrl: PDFJS_CMAP_URL,
    cMapPacked: true,
    standardFontDataUrl: PDFJS_STANDARD_FONT_URL,
    useWasm: true,
  }).promise;
  const source = { id: sourceId, type: 'pdf', name: file.name, size: file.size, bytes, pdf };
  state.sources.set(sourceId, source);

  const newPages = [];
  for (let n = 1; n <= pdf.numPages; n++) {
    setStatus(`Reading ${file.name}: page ${n} of ${pdf.numPages}…`, true);
    const pdfPage = await pdf.getPage(n);
    const viewport = pdfPage.getViewport({ scale: 1, rotation: pdfPage.rotate || 0 });
    newPages.push({ id: uid('page'), sourceId, sourcePage: n, width: viewport.width, height: viewport.height, baseRotation: pdfPage.rotate || 0, rotation: 0, kind: 'pdf' });
    // Release decoded scan/image resources used only while reading metadata.
    try { pdfPage.cleanup?.(); } catch {}
  }
  // We touched every PDFPageProxy only to discover page dimensions. Clear
  // document/page resources before the viewer begins; scan-only files can
  // otherwise enter the viewer with a large amount of worker-side image state
  // already resident. No rendering is active at this point, so cleanup is safe.
  try { await pdf.cleanup(); } catch {}
  state.pages.push(...newPages);
  return newPages.length;
}

async function addImage(file) {
  const sourceId = uid('src');
  const url = URL.createObjectURL(file);
  const dims = await readImageDimensions(file, url);
  state.sources.set(sourceId, { id: sourceId, type: 'image', name: file.name, size: file.size, file, url, image: null });
  state.pages.push({ id: uid('page'), sourceId, sourcePage: 1, width: dims.width, height: dims.height, baseRotation: 0, rotation: 0, kind: 'image' });
  return 1;
}


const DEFAULT_NEW_PAGE_WIDTH = 792;   // US Letter landscape, points
const DEFAULT_NEW_PAGE_HEIGHT = 612;
const GRAPH_GRID_SPACING_PT = 18;     // 1/4 inch at 72 points/inch
const GRAPH_GRID_MARGIN_PT = 9;

function generatedPage(type='blank', width=DEFAULT_NEW_PAGE_WIDTH, height=DEFAULT_NEW_PAGE_HEIGHT) {
  return {
    id: uid('page'),
    sourceId: null,
    sourcePage: 1,
    width: Math.max(1, Number(width) || DEFAULT_NEW_PAGE_WIDTH),
    height: Math.max(1, Number(height) || DEFAULT_NEW_PAGE_HEIGHT),
    baseRotation: 0,
    rotation: 0,
    kind: 'generated',
    generatedType: type === 'graph' ? 'graph' : 'blank',
  };
}

function clonePageInstance(page, includeAnnotations=true) {
  const copy = { ...page, id: uid('page') };
  // Annotation objects will be document-level objects keyed by pageId. The
  // includeAnnotations flag is retained now so this command already has the
  // correct semantic hook; when ink arrives, that layer will clone/re-key the
  // current page's annotation objects only for the "with annotations" case.
  void includeAnnotations;
  return copy;
}

function selectedPageTargetId() {
  if (state.workspaceMode !== 'organize' || !state.selected.size) return null;
  // If exactly one page remains selected, that page is authoritative even if
  // the user most recently UNchecked some other page. This avoids falling back
  // to a stale View page after additive checkbox selection changes.
  if (state.selected.size === 1) return [...state.selected][0];
  if (state.selectionAnchorId && state.selected.has(state.selectionAnchorId)) return state.selectionAnchorId;
  // Defensive fallback for an unusual selection state: use the last selected
  // page in document order rather than any stale viewer current-page value.
  for (let i = state.pages.length - 1; i >= 0; i--) if (state.selected.has(state.pages[i].id)) return state.pages[i].id;
  return null;
}

function templatePageForSave(targetContext=null) {
  if (targetContext?.documentId && targetContext.documentId !== state.currentDocumentId) loadDocumentState(targetContext.documentId, false);
  else if (state.workspaceMode === 'view' && state.splitView) {
    synchronizeActiveSplitDocumentForEdit();
    syncSplitActivePageFromViewport(state.activePaneId, { updateUi: false });
  }
  if (!state.pages.length) return null;
  // Pages is selection-driven. Never let a stale View current page override a
  // real current Pages selection.
  const selectedId = selectedPageTargetId();
  if (selectedId) return pageById(selectedId);
  if (targetContext?.pageId) {
    const captured = pageById(targetContext.pageId);
    if (captured) return captured;
  }
  const targetId = insertionTargetPageId();
  return pageById(targetId) || state.pages[0] || null;
}

function nextTemplateName() {
  let number = 1;
  while (state.templates.some(template => template.name === `Template ${number}`)) number++;
  return `Template ${number}`;
}

async function renderCompactPagePreview(page, canvas) {
  if (!page || !canvas?.isConnected) return;
  const well = canvas.closest('.insert-choice-preview, .template-manager-preview');
  if (!well) return;
  const rect = well.getBoundingClientRect();
  const [bw, bh] = rotatedDims(page);
  const innerW = Math.max(42, rect.width - 10);
  const innerH = Math.max(42, rect.height - 10);
  const scale = Math.min(innerW / bw, innerH / bh);
  const cssWidth = Math.max(1, bw * scale);
  const cssHeight = Math.max(1, bh * scale);
  await enqueueRender(async () => {
    if (!canvas.isConnected) return;
    try {
      await renderPageToCanvas(page, canvas, cssWidth, cssHeight, 0.9, 260_000);
      if (page.kind !== 'generated' && canvasLooksBlank(canvas) && canvas.isConnected) {
        await renderPageToCanvas(page, canvas, cssWidth, cssHeight, 0.72, 160_000);
      }
      canvas.dataset.rendered = 'true';
    } catch (err) {
      console.error('Template preview failed', err);
      well.classList.add('preview-error');
      canvas.setAttribute('aria-label', 'Preview unavailable');
    }
  }, 1);
}

function currentInsertPreviewPage() {
  const pageId = state.insertTarget?.pageId || insertionTargetPageId();
  return pageById(pageId) || state.pages[0] || null;
}

async function renderInsertChoicePreviews() {
  const generation = ++state.insertPreviewGeneration;
  const current = currentInsertPreviewPage();
  if (!current || els.insertPageMenu?.classList.contains('hidden')) return;
  const dims = pageDisplayDimensions(current);
  const builtIns = [
    [current, els.insertDuplicateWithPreview],
    [current, els.insertDuplicateWithoutPreview],
    [generatedPage('blank', dims.width, dims.height), els.insertBlankPreview],
    [generatedPage('graph', dims.width, dims.height), els.insertGraphPreview],
  ];
  for (const [page, canvas] of builtIns) {
    if (generation !== state.insertPreviewGeneration || els.insertPageMenu?.classList.contains('hidden')) return;
    await renderCompactPagePreview(page, canvas);
  }
  for (const canvas of els.insertTemplateList?.querySelectorAll('canvas[data-template-preview]') || []) {
    if (generation !== state.insertPreviewGeneration || els.insertPageMenu?.classList.contains('hidden')) return;
    const template = state.templates.find(item => item.id === canvas.dataset.templatePreview);
    if (template?.page) await renderCompactPagePreview(template.page, canvas);
  }
}

function renderInsertTemplateList() {
  if (!els.insertTemplateList) return;
  els.insertTemplateList.innerHTML = '';
  if (!state.templates.length) {
    const empty = document.createElement('div');
    empty.className = 'insert-template-empty';
    empty.textContent = 'No session templates saved';
    els.insertTemplateList.append(empty);
  } else {
    for (const template of state.templates) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'template-insert-button insert-choice-card';
      button.dataset.templateId = template.id;
      button.setAttribute('role', 'menuitem');
      button.title = `Insert ${template.name} after the current page`;

      const preview = document.createElement('span');
      preview.className = 'insert-choice-preview';
      const canvas = document.createElement('canvas');
      canvas.dataset.templatePreview = template.id;
      canvas.setAttribute('aria-hidden', 'true');
      preview.append(canvas);

      const label = document.createElement('span');
      label.className = 'insert-choice-label';
      label.textContent = template.name;
      button.append(preview, label);
      els.insertTemplateList.append(button);
    }
  }
  if (els.manageTemplatesBtn) els.manageTemplatesBtn.disabled = state.templates.length === 0;
}

function requestTemplateName(suggested) {
  if (!els.templateNameDialog || !els.templateNameInput) return Promise.resolve(suggested);
  return new Promise(resolve => {
    const dialog = els.templateNameDialog;
    els.templateNameInput.value = suggested;
    const finish = () => {
      dialog.removeEventListener('close', finish);
      const accepted = dialog.returnValue === 'save';
      const value = els.templateNameInput.value.trim();
      resolve(accepted ? (value || suggested) : null);
    };
    dialog.addEventListener('close', finish, { once: true });
    dialog.showModal();
    requestAnimationFrame(() => {
      els.templateNameInput.focus({ preventScroll: true });
      els.templateNameInput.select();
    });
  });
}

async function saveCurrentPageAsTemplate(targetContext=null) {
  const page = templatePageForSave(targetContext);
  if (!page) { setStatus('No page is available to save as a template'); return false; }
  const suggested = nextTemplateName();
  // Use an in-app dialog rather than window.prompt(). Native prompt can force
  // Chromium/Surface out of Fullscreen, which previously kicked Presentation
  // back to regular View while saving a template.
  const name = await requestTemplateName(suggested);
  if (name === null) return false;
  const template = {
    id: uid('template'),
    name,
    page: { ...page, id: null },
    createdAt: Date.now(),
  };
  state.templates.push(template);
  renderInsertTemplateList();
  setStatus(`Saved page as ${name} (this session)`);
  return true;
}

function insertTemplateAfterCurrent(templateId) {
  const template = state.templates.find(item => item.id === templateId);
  if (!template) { setStatus('That template is no longer available'); return; }
  const inPresentation = document.body.classList.contains('presentation');
  const targetContext = state.insertTarget ? { ...state.insertTarget } : null;
  closeInsertPageMenu(false);
  insertPageAfterCurrent('template', true, template, targetContext);
  if (inPresentation) showPresentationControls();
}

function deleteTemplate(templateId) {
  const index = state.templates.findIndex(item => item.id === templateId);
  if (index < 0) return;
  const [removed] = state.templates.splice(index, 1);
  renderInsertTemplateList();
  releaseSourceIfUnused(removed.page?.sourceId, { excludingTemplateId: removed.id });
}

function showTemplateManager() {
  closeInsertPageMenu(false);
  els.infoDialog.classList.add('template-dialog');
  const renderManager = () => {
    els.dialogContent.innerHTML = `<h2>Session templates</h2><p>Templates in this build remain available only until PDF Workbench is reloaded. Persistence will be added with the Files/Library storage system.</p><div id="templateManagerList" class="template-manager-list"></div>`;
    const manager = $('templateManagerList');
    if (!state.templates.length) {
      const empty = document.createElement('p');
      empty.textContent = 'No session templates are saved.';
      manager.append(empty);
      return;
    }
    for (const template of state.templates) {
      const row = document.createElement('div');
      row.className = 'template-manager-row';
      row.dataset.templateId = template.id;

      const preview = document.createElement('div');
      preview.className = 'template-manager-preview';
      const canvas = document.createElement('canvas');
      canvas.setAttribute('aria-label', `Preview of ${template.name}`);
      preview.append(canvas);

      const info = document.createElement('div');
      info.className = 'template-manager-info';
      const name = document.createElement('div');
      name.className = 'template-manager-name';
      name.textContent = template.name;
      const size = document.createElement('div');
      size.className = 'template-manager-meta';
      const [w, h] = rotatedDims(template.page);
      size.textContent = `${Math.round(w)} × ${Math.round(h)} pt`;
      info.append(name, size);

      const actions = document.createElement('div');
      actions.className = 'template-manager-actions';
      const rename = document.createElement('button');
      rename.type = 'button';
      rename.textContent = 'Rename';
      const del = document.createElement('button');
      del.type = 'button';
      del.textContent = 'Delete';
      actions.append(rename, del);
      row.append(preview, info, actions);
      manager.append(row);

      rename.addEventListener('click', async () => {
        const nextName = await requestTemplateName(template.name);
        if (nextName === null) return;
        template.name = nextName;
        renderInsertTemplateList();
        renderManager();
        setStatus(`Renamed template to ${nextName}`);
      });
      del.addEventListener('click', () => {
        if (!window.confirm(`Delete template “${template.name}”?`)) return;
        deleteTemplate(template.id);
        renderManager();
        setStatus('Template deleted');
      });
      requestAnimationFrame(() => renderCompactPagePreview(template.page, canvas));
    }
  };
  renderManager();
  if (!els.infoDialog.open) els.infoDialog.showModal();
}

function pageDisplayDimensions(page) {
  const [width, height] = rotatedDims(page);
  return { width, height };
}

function insertionTargetPageId() {
  // Pages is selection-driven. Prefer the actual current selection over any
  // page that happened to be active the last time View was shown.
  const selectedId = selectedPageTargetId();
  if (selectedId) return selectedId;
  if (state.splitView) return paneView(state.activePaneId)?.activePageId || state.activePageId;
  return state.activePageId || state.pages[0]?.id || null;
}

function synchronizeActiveSplitDocumentForEdit() {
  if (!state.splitView) return currentDocument();
  const pane = splitPaneState(state.activePaneId);
  if (pane.documentId && pane.documentId !== state.currentDocumentId) loadDocumentState(pane.documentId, false);
  return currentDocument();
}

function insertPageAfterCurrent(kind, includeAnnotations=true, template=null, targetContext=null) {
  // Capture the page/document at menu-open time when possible. Intersection
  // observers can legitimately update the live "current page" while a popover
  // is open, so recomputing the target after the user chooses a command can
  // otherwise insert several pages away from the page they intended.
  const requestedDocId = targetContext?.documentId || null;
  if (requestedDocId && requestedDocId !== state.currentDocumentId) loadDocumentState(requestedDocId, false);
  const doc = currentDocument() || synchronizeActiveSplitDocumentForEdit();
  if (!doc?.pages?.length) return;

  let targetId = targetContext?.pageId || insertionTargetPageId();
  let index = state.pages.findIndex(page => page.id === targetId);
  if (index < 0) {
    targetId = insertionTargetPageId();
    index = state.pages.findIndex(page => page.id === targetId);
  }
  if (index < 0) index = Math.max(0, activeIndex());
  const current = state.pages[index];
  if (!current) return;

  const targetPaneId = state.splitView ? (targetContext?.paneId || state.activePaneId) : null;
  // If the same document is visible in the other split pane, preserve that
  // pane by logical page/content position before changing the shared page list.
  // Otherwise an insertion above it increases the raw scroll offset needed to
  // show the same content and makes the inactive pane appear to jump.
  if (state.splitView && targetPaneId) queueStructuralAnchorForOtherSplitPane(doc.id, targetPaneId);

  const before = snapshotPages();
  let inserted;
  if (kind === 'duplicate') {
    inserted = clonePageInstance(current, includeAnnotations);
  } else if (kind === 'template' && template?.page) {
    inserted = clonePageInstance(template.page, true);
  } else {
    const dims = pageDisplayDimensions(current);
    inserted = generatedPage(kind === 'graph' ? 'graph' : 'blank', dims.width, dims.height);
  }

  state.pages = [...state.pages.slice(0, index + 1), inserted, ...state.pages.slice(index + 1)];
  state.activePageId = inserted.id;
  if (state.workspaceMode === 'organize') {
    state.selected = new Set([inserted.id]);
    state.selectionAnchorId = inserted.id;
  }

  if (!state.splitView) {
    const singleView = ensureSingleView(doc);
    if (singleView) {
      singleView.activePageId = inserted.id;
      singleView.scrollTop = null;
      singleView.scrollLeft = null;
    }
  } else {
    const pane = splitPaneState(targetPaneId);
    if (pane.documentId !== doc.id) pane.documentId = doc.id;
    const view = paneView(targetPaneId, doc.id);
    if (view) {
      view.activePageId = inserted.id;
      view.scrollTop = null;
      view.scrollLeft = null;
    }
    if (targetPaneId === state.activePaneId) state.activePageId = inserted.id;
  }

  // Keep this exact target authoritative until the rebuilt viewer has focused
  // and started rendering it. This prevents the observer from selecting some
  // other page in the brief interval between DOM rebuild and programmatic
  // scrolling.
  state.pendingPageFocus = {
    documentId: doc.id,
    pageId: inserted.id,
    paneId: targetPaneId,
  };

  commitHistory(before);
  // IMPORTANT: do not read the old viewer DOM here. Its scroll offsets belong
  // to the pre-insertion page layout and can point at a different page after
  // the page array grows.
  saveCurrentDocumentState({ readViewDom: false });
  renderAll({ saveState: false });

  if (state.workspaceMode === 'view') focusPageAfterRender(doc.id, inserted.id, targetPaneId);
  else state.pendingPageFocus = null;

  const label = kind === 'duplicate'
    ? `Duplicated page ${index + 1}${includeAnnotations ? '' : ' without annotations'}`
    : kind === 'template'
      ? `Inserted template ${template?.name || ''} after page ${index + 1}`.trim()
      : `Inserted ${kind === 'graph' ? 'graph-paper' : 'blank'} page after page ${index + 1}`;
  setStatus(label);
}

function focusPageAfterRender(documentId, pageId, paneId=null) {
  const finish = () => {
    if (state.pendingPageFocus?.documentId === documentId && state.pendingPageFocus?.pageId === pageId) {
      state.pendingPageFocus = null;
    }
  };
  requestAnimationFrame(() => requestAnimationFrame(() => {
    const doc = documentById(documentId);
    if (!doc) { finish(); return; }
    const page = doc.pages.find(item => item.id === pageId);
    if (!page) { finish(); return; }

    if (state.splitView && paneId) {
      const pe = paneElements(paneId);
      const pane = splitPaneState(paneId);
      const view = paneView(paneId, documentId);
      const stage = pe.viewer.querySelector(`.page-stage[data-page-id="${CSS.escape(pageId)}"]`);
      if (view) view.activePageId = pageId;
      if (stage) {
        stage.scrollIntoView({ block: 'center', inline: 'center', behavior: 'auto' });
        stage.dataset.wantRender = 'true';
        const canvas = stage.querySelector('canvas');
        if (canvas && stage.dataset.rendered !== 'true' && stage.dataset.rendered !== 'loading') {
          stage.dataset.rendered = 'loading';
          ensurePageLoading(stage);
          renderSplitViewerPage(paneId, page, stage, canvas, pane.generation).catch(err => renderError(stage, err));
        }
      }
      if (state.activePaneId === paneId) state.activePageId = pageId;
      markSplitActivePage(paneId);
      savePaneScroll(paneId);
      finish();
      return;
    }

    if (state.currentDocumentId !== documentId) { finish(); return; }
    state.activePageId = pageId;
    const view = ensureSingleView(doc);
    if (view) view.activePageId = pageId;
    const stage = els.viewer.querySelector(`.page-stage[data-page-id="${CSS.escape(pageId)}"]`);
    if (stage) {
      stage.scrollIntoView({ block: 'center', inline: 'center', behavior: 'auto' });
      stage.dataset.wantRender = 'true';
      const canvas = stage.querySelector('canvas');
      if (canvas && stage.dataset.rendered !== 'true' && stage.dataset.rendered !== 'loading') {
        stage.dataset.rendered = 'loading';
        ensurePageLoading(stage);
        renderViewerPage(page, stage, canvas, state.renderGeneration).catch(err => renderError(stage, err));
      }
    }
    markActivePage();
    updatePageCounts();
    updateSingleViewScrollFromDom();
    finish();
  }));
}

function createNewGeneratedDocument(type='blank') {
  const isGraph = type === 'graph';
  const doc = createDocument(isGraph ? 'Graph Paper.pdf' : 'Untitled.pdf');
  state.fileSelected = new Set([doc.id]);
  state.fileSelectionInitialized = true;
  state.combineOrder = [doc.id];
  const page = generatedPage(isGraph ? 'graph' : 'blank');
  doc.pages = [page];
  doc.activePageId = page.id;
  doc.singleView = { zoom: 1, fitMode: state.fitMode, scrollMode: state.scrollMode, activePageId: page.id, scrollTop: null, scrollLeft: null };
  state.pages = doc.pages;
  state.selected = doc.selected;
  state.selectionAnchorId = null;
  state.activePageId = page.id;
  state.history = doc.history;
  state.future = doc.future;
  state.workspaceMode = 'view';
  if (state.splitView) {
    const pane = splitPaneState(state.activePaneId);
    pane.documentId = doc.id;
    pane.views.set(doc.id, defaultPaneView(doc));
  }
  saveCurrentDocumentState({ readViewDom: false });
  renderAll({ saveState: false });
  setStatus(`Created new ${isGraph ? 'graph-paper' : 'blank'} document`);
}

function drawGraphPaperCanvas(ctx, targetW, targetH, pageWidth, pageHeight) {
  const sx = targetW / pageWidth;
  const sy = targetH / pageHeight;
  const spacingX = GRAPH_GRID_SPACING_PT * sx;
  const spacingY = GRAPH_GRID_SPACING_PT * sy;
  const marginX = GRAPH_GRID_MARGIN_PT * sx;
  const marginY = GRAPH_GRID_MARGIN_PT * sy;
  ctx.save();
  ctx.strokeStyle = 'rgba(92, 193, 217, 0.24)';
  ctx.lineWidth = Math.max(0.55, Math.min(1.05, 0.6 * ((sx + sy) / 2)));
  ctx.beginPath();
  for (let x = marginX; x <= targetW - marginX + 0.25; x += spacingX) {
    const px = Math.round(x) + 0.5;
    ctx.moveTo(px, marginY);
    ctx.lineTo(px, targetH - marginY);
  }
  for (let y = marginY; y <= targetH - marginY + 0.25; y += spacingY) {
    const py = Math.round(y) + 0.5;
    ctx.moveTo(marginX, py);
    ctx.lineTo(targetW - marginX, py);
  }
  ctx.stroke();
  ctx.restore();
}

function drawGraphPaperPdf(pdfPage, width, height, rgb) {
  const color = rgb(0.46, 0.77, 0.87);
  const margin = Math.min(GRAPH_GRID_MARGIN_PT, width / 4, height / 4);
  for (let x = margin; x <= width - margin + 0.01; x += GRAPH_GRID_SPACING_PT) {
    pdfPage.drawLine({ start: { x, y: margin }, end: { x, y: height - margin }, thickness: 0.45, color, opacity: 0.24 });
  }
  for (let y = margin; y <= height - margin + 0.01; y += GRAPH_GRID_SPACING_PT) {
    pdfPage.drawLine({ start: { x: margin, y }, end: { x: width - margin, y }, thickness: 0.45, color, opacity: 0.24 });
  }
}

async function readImageDimensions(file, url) {
  if ('createImageBitmap' in window) {
    try {
      const bitmap = await createImageBitmap(file);
      const dims = { width: bitmap.width, height: bitmap.height };
      bitmap.close?.();
      return dims;
    } catch {}
  }
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => reject(new Error('This image format is not supported by the browser.'));
    img.src = url;
  });
}

async function getSourceImage(source) {
  if (source.image) return source.image;
  source.image = await new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Could not decode ${source.name}`));
    img.src = source.url;
  });
  return source.image;
}

async function getPdfPage(source, pageNumber) {
  // PDF.js may internally reuse page proxies; do not retain an additional
  // unbounded cache in the app. Large scanned documents otherwise keep every
  // page's decoded resources reachable for the lifetime of the document.
  return source.pdf.getPage(pageNumber);
}

function cleanFilenameBase(name, fallback='document') {
  const cleaned = String(name || '').replace(/[\\/:*?"<>|]+/g, '_').trim();
  const withoutExt = cleaned.replace(/\.(?:pdf|zip)$/i, '').replace(/\.[^.]+$/, '').trim();
  return withoutExt || fallback;
}

function ensurePdfFilename(name, fallback='document.pdf') {
  let filename = String(name || '').trim() || fallback;
  if (!/\.pdf$/i.test(filename)) filename += '.pdf';
  return filename.replace(/[\\/:*?"<>|]+/g, '_');
}

function ensureZipFilename(name, fallback='PDF-Workbench-Export.zip') {
  let filename = String(name || '').trim() || fallback;
  if (!/\.zip$/i.test(filename)) filename += '.zip';
  return filename.replace(/[\\/:*?"<>|]+/g, '_');
}

function uniqueZipPdfName(doc, used) {
  const base = cleanFilenameBase(doc.name, 'document');
  let candidate = `${base}-edited.pdf`;
  let n = 2;
  while (used.has(candidate.toLowerCase())) candidate = `${base}-edited-${n++}.pdf`;
  used.add(candidate.toLowerCase());
  return candidate;
}

function defaultExportFilename(name) {
  return `${cleanFilenameBase(name)}-edited.pdf`;
}

function defaultExtractFilename(name) {
  return `${cleanFilenameBase(name)}-selected.pdf`;
}

function defaultSplitBaseName(name) {
  return cleanFilenameBase(name);
}

function reconcileFileSelection() {
  const valid = new Set(state.documents.map(doc => doc.id));
  state.fileSelected = new Set([...state.fileSelected].filter(id => valid.has(id)));
  if (!state.fileSelectionInitialized && state.documents.length) {
    const initial = valid.has(state.currentDocumentId) ? state.currentDocumentId : state.documents[0].id;
    state.fileSelected = new Set([initial]);
    state.fileSelectionInitialized = true;
  }
  if (!state.documents.length) {
    state.fileSelected.clear();
    state.fileSelectionInitialized = false;
  }
}

function reconcileCombineOrder() {
  reconcileFileSelection();
  const selectedIds = state.documents.filter(doc => state.fileSelected.has(doc.id)).map(doc => doc.id);
  const selectedSet = new Set(selectedIds);
  state.combineOrder = state.combineOrder.filter(id => selectedSet.has(id));
  for (const id of selectedIds) if (!state.combineOrder.includes(id)) state.combineOrder.push(id);
}

function selectedFileDocuments() {
  reconcileFileSelection();
  return state.documents.filter(doc => state.fileSelected.has(doc.id));
}

function setFileSelected(docId, selected) {
  state.fileSelectionInitialized = true;
  if (selected) state.fileSelected.add(docId); else state.fileSelected.delete(docId);
  reconcileCombineOrder();
  renderExportPane();
}

function renderOpenDocumentList() {
  if (!els.openDocumentList) return;
  reconcileFileSelection();
  els.openDocumentList.replaceChildren();
  const chosen = selectedFileDocuments();
  els.fileSelectionSummary.textContent = state.documents.length
    ? `${chosen.length} of ${state.documents.length} document${state.documents.length === 1 ? '' : 's'} checked for multi-document operations.`
    : 'No documents are open.';
  els.selectAllFilesBtn.disabled = !state.documents.length || chosen.length === state.documents.length;
  els.clearFileSelectionBtn.disabled = !chosen.length;

  for (const doc of state.documents) {
    const row = document.createElement('div');
    row.className = `open-document-row${doc.id === state.currentDocumentId ? ' active' : ''}`;

    const check = document.createElement('input');
    check.type = 'checkbox';
    check.checked = state.fileSelected.has(doc.id);
    check.setAttribute('aria-label', `Select ${doc.name} for file operations`);
    check.addEventListener('change', () => setFileSelected(doc.id, check.checked));

    const label = document.createElement('div');
    label.className = 'open-document-label';
    const name = document.createElement('span');
    name.className = 'open-document-name';
    name.textContent = doc.name;
    name.title = doc.name;
    const meta = document.createElement('span');
    meta.className = 'open-document-meta';
    meta.textContent = `${doc.pages.length} page${doc.pages.length === 1 ? '' : 's'}${doc.id === state.currentDocumentId ? ' · active' : ''}`;
    label.append(name, meta);

    const activate = document.createElement('button');
    activate.type = 'button';
    activate.className = 'open-document-activate';
    activate.textContent = doc.id === state.currentDocumentId ? 'Active' : 'Use';
    activate.disabled = doc.id === state.currentDocumentId;
    activate.title = doc.id === state.currentDocumentId ? 'This is the active document' : `Make ${doc.name} the active document`;
    activate.addEventListener('click', () => loadDocumentState(doc.id));

    row.append(check, label, activate);
    els.openDocumentList.append(row);
  }
  if (!state.documents.length) {
    const empty = document.createElement('p');
    empty.className = 'small-note';
    empty.textContent = 'Use Open in the top bar, or expand New below to start a blank or graph-paper document.';
    els.openDocumentList.append(empty);
  }
}

function moveCombineDocument(docId, delta) {
  reconcileCombineOrder();
  const index = state.combineOrder.indexOf(docId);
  const target = index + delta;
  if (index < 0 || target < 0 || target >= state.combineOrder.length) return;
  [state.combineOrder[index], state.combineOrder[target]] = [state.combineOrder[target], state.combineOrder[index]];
  renderCombineList();
}

function renderCombineList() {
  if (!els.combineList) return;
  reconcileCombineOrder();
  els.combineList.replaceChildren();
  for (let index = 0; index < state.combineOrder.length; index++) {
    const doc = documentById(state.combineOrder[index]);
    if (!doc) continue;
    const row = document.createElement('div');
    row.className = 'combine-row combine-order-row';

    const label = document.createElement('div');
    label.className = 'combine-doc-label';
    const name = document.createElement('span');
    name.className = 'combine-doc-name';
    name.textContent = doc.name;
    name.title = doc.name;
    const pageCount = document.createElement('span');
    pageCount.className = 'combine-doc-pages';
    pageCount.textContent = `${doc.pages.length} page${doc.pages.length === 1 ? '' : 's'}`;
    label.append(name, pageCount);

    const up = document.createElement('button');
    up.type = 'button';
    up.className = 'combine-move';
    up.textContent = '↑';
    up.title = `Move ${doc.name} earlier`;
    up.setAttribute('aria-label', `Move ${doc.name} earlier`);
    up.disabled = index === 0;
    up.addEventListener('click', () => moveCombineDocument(doc.id, -1));

    const down = document.createElement('button');
    down.type = 'button';
    down.className = 'combine-move';
    down.textContent = '↓';
    down.title = `Move ${doc.name} later`;
    down.setAttribute('aria-label', `Move ${doc.name} later`);
    down.disabled = index === state.combineOrder.length - 1;
    down.addEventListener('click', () => moveCombineDocument(doc.id, 1));

    row.append(label, up, down);
    els.combineList.append(row);
  }
  if (!state.combineOrder.length) {
    const empty = document.createElement('p');
    empty.className = 'small-note';
    empty.textContent = 'Check two or more documents in Open documents above.';
    els.combineList.append(empty);
  }
  const combineCount = state.combineOrder.length;
  els.combineBtn.disabled = combineCount < 2;
  els.combineOperationSummary.textContent = combineCount >= 2
    ? `${combineCount} checked documents · arrange order below`
    : 'Select two or more documents above';
}

function renderExportPane() {
  saveCurrentDocumentState();
  renderOpenDocumentList();
  const doc = currentDocument();
  const count = state.pages.length;
  const chosenDocs = selectedFileDocuments();
  const selectionKey = chosenDocs.map(d => d.id).join('|');

  if (chosenDocs.length === 0) {
    els.exportSummary.textContent = 'Select one or more open documents above.';
    els.exportOperationSummary.textContent = 'Select one or more documents above';
    els.exportFilenameLabel.textContent = 'File name';
    els.exportFilename.disabled = true;
    els.exportPdfBtn.disabled = true;
    els.exportPdfBtn.textContent = 'Export selected';
  } else if (chosenDocs.length === 1) {
    const only = chosenDocs[0];
    els.exportSummary.textContent = `${only.name}: ${only.pages.length} page${only.pages.length === 1 ? '' : 's'} will be exported in its current Pages order.`;
    els.exportOperationSummary.textContent = `1 checked document · export PDF`;
    els.exportFilenameLabel.textContent = 'PDF file name';
    els.exportFilename.disabled = false;
    if (els.exportFilename.dataset.selectionKey !== selectionKey) {
      els.exportFilename.value = defaultExportFilename(only.name);
      els.exportFilename.dataset.selectionKey = selectionKey;
      els.exportProgress.textContent = '';
    }
    els.exportPdfBtn.disabled = false;
    els.exportPdfBtn.textContent = 'Export PDF';
  } else {
    els.exportSummary.textContent = `${chosenDocs.length} checked documents will be exported as individual PDFs inside one ZIP.`;
    els.exportOperationSummary.textContent = `${chosenDocs.length} checked documents · export ZIP`;
    els.exportFilenameLabel.textContent = 'ZIP file name';
    els.exportFilename.disabled = false;
    if (els.exportFilename.dataset.selectionKey !== selectionKey) {
      els.exportFilename.value = 'PDF-Workbench-Export.zip';
      els.exportFilename.dataset.selectionKey = selectionKey;
      els.exportProgress.textContent = '';
    }
    els.exportPdfBtn.disabled = false;
    els.exportPdfBtn.textContent = `Export ${chosenDocs.length} PDFs as ZIP`;
  }

  const selectedCount = state.selected.size;
  if (doc) {
    els.extractSummary.textContent = selectedCount
      ? `${selectedCount} selected page${selectedCount === 1 ? '' : 's'} from active document ${doc.name} will be saved in their current Pages order.`
      : `Active document: ${doc.name}. No pages are selected; select pages in Pages first.`;
    if (els.extractFilename.dataset.documentId !== doc.id) {
      els.extractFilename.value = defaultExtractFilename(doc.name);
      els.extractFilename.dataset.documentId = doc.id;
      els.extractProgress.textContent = '';
    }
    if (els.splitBaseName.dataset.documentId !== doc.id) {
      els.splitBaseName.value = defaultSplitBaseName(doc.name);
      els.splitBaseName.dataset.documentId = doc.id;
      els.splitProgress.textContent = '';
    }
    els.splitOperationSummary.textContent = `Active: ${doc.name}`;
  } else {
    els.extractSummary.textContent = 'No active document.';
    els.splitOperationSummary.textContent = 'No active document';
  }
  els.extractPdfBtn.disabled = !doc || selectedCount === 0;
  els.splitFixedBtn.disabled = !doc || count === 0;
  els.splitRangesBtn.disabled = !doc || count === 0;
  renderCombineList();
}

async function loadPdfExportEngine() {
  if (state.pdfLib) return state.pdfLib;
  setStatus('Loading PDF export engine…', true);
  const lib = await import(PDFLIB_URL);
  state.pdfLib = lib;
  return lib;
}

async function loadZipEngine() {
  if (state.zipLib) return state.zipLib;
  setStatus('Loading ZIP engine…', true);
  const mod = await import(JSZIP_URL);
  state.zipLib = mod.default || mod;
  return state.zipLib;
}

async function embedImageForExport(outPdf, source) {
  const name = String(source.name || '').toLowerCase();
  const type = String(source.file?.type || '').toLowerCase();
  const raw = source.file ? new Uint8Array(await source.file.arrayBuffer()) : null;
  if (raw && (type === 'image/jpeg' || type === 'image/jpg' || /\.jpe?g$/.test(name))) return outPdf.embedJpg(raw);
  if (raw && (type === 'image/png' || /\.png$/.test(name))) return outPdf.embedPng(raw);

  // pdf-lib embeds JPEG/PNG directly. For browser-decodable formats such as
  // WebP/GIF/BMP, convert only the imported image page to PNG; PDF source pages
  // are never rasterized by the export path.
  const img = await getSourceImage(source);
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth || img.width;
  canvas.height = img.naturalHeight || img.height;
  const ctx = canvas.getContext('2d', { alpha: false });
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);
  const blob = await new Promise((resolve, reject) => canvas.toBlob(b => b ? resolve(b) : reject(new Error('Could not convert image for PDF export.')), 'image/png'));
  return outPdf.embedPng(new Uint8Array(await blob.arrayBuffer()));
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.rel = 'noopener';
  document.body.append(link);
  link.click();
  link.remove();
  // iPad/Safari may take a little longer to hand the blob to its preview/share UI.
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}

function downloadPdfBytes(bytes, filename) {
  downloadBlob(new Blob([bytes], { type: 'application/pdf' }), filename);
}

async function buildPdfBytes(pageList, options={}) {
  const { PDFDocument, degrees, rgb } = await loadPdfExportEngine();
  const output = await PDFDocument.create();
  const sourcePdfCache = options.sourcePdfCache || new Map();
  const embeddedImages = new Map();
  const total = pageList.length;

  for (let i = 0; i < total; i++) {
    const page = pageList[i];
    const source = page.kind === 'generated' ? null : state.sources.get(page.sourceId);
    if (page.kind !== 'generated' && !source) throw new Error(`Source data is missing for output page ${i + 1}.`);
    options.onProgress?.(i + 1, total);

    if (page.kind === 'generated') {
      const outPage = output.addPage([page.width, page.height]);
      if (page.generatedType === 'graph') drawGraphPaperPdf(outPage, page.width, page.height, rgb);
      if (page.rotation) outPage.setRotation(degrees((page.rotation + 360) % 360));
    } else if (source.type === 'pdf') {
      let srcPdf = sourcePdfCache.get(source.id);
      if (!srcPdf) {
        srcPdf = await PDFDocument.load(source.bytes, { updateMetadata: false });
        sourcePdfCache.set(source.id, srcPdf);
      }
      const [copied] = await output.copyPages(srcPdf, [page.sourcePage - 1]);
      const inheritedRotation = copied.getRotation()?.angle || 0;
      copied.setRotation(degrees((inheritedRotation + (page.rotation || 0) + 360) % 360));
      output.addPage(copied);
    } else if (source.type === 'image') {
      let embedded = embeddedImages.get(source.id);
      if (!embedded) {
        embedded = await embedImageForExport(output, source);
        embeddedImages.set(source.id, embedded);
      }
      const outPage = output.addPage([page.width, page.height]);
      outPage.drawImage(embedded, { x: 0, y: 0, width: page.width, height: page.height });
      if (page.rotation) outPage.setRotation(degrees((page.rotation + 360) % 360));
    } else {
      throw new Error(`Unsupported source type on output page ${i + 1}.`);
    }

    if (i % 4 === 3) await new Promise(resolve => setTimeout(resolve, 0));
  }
  return output.save({ useObjectStreams: true, addDefaultPage: false, updateFieldAppearances: false });
}

async function exportSelectedDocuments() {
  saveCurrentDocumentState();
  const docs = selectedFileDocuments();
  if (!docs.length) return;
  els.exportPdfBtn.disabled = true;
  els.exportProgress.textContent = 'Preparing export engine…';
  setStatus('Preparing PDF export…', true);
  try {
    const sourcePdfCache = new Map();
    if (docs.length === 1) {
      const doc = docs[0];
      const filename = ensurePdfFilename(els.exportFilename.value, defaultExportFilename(doc.name));
      const bytes = await buildPdfBytes(doc.pages, {
        sourcePdfCache,
        onProgress: (done, total) => {
          els.exportProgress.textContent = `Building page ${done} of ${total}…`;
          setStatus(`Exporting page ${done} of ${total}…`, true);
        }
      });
      els.exportProgress.textContent = 'Writing PDF…';
      downloadPdfBytes(bytes, filename);
      const sizeMb = bytes.length / (1024 * 1024);
      els.exportProgress.textContent = `Exported ${doc.pages.length} page${doc.pages.length === 1 ? '' : 's'} (${sizeMb < 0.1 ? `${Math.round(bytes.length / 1024)} KB` : `${sizeMb.toFixed(1)} MB`}).`;
      setStatus(`Exported ${filename}`);
    } else {
      const JSZip = await loadZipEngine();
      const zip = new JSZip();
      const usedNames = new Set();
      for (let i = 0; i < docs.length; i++) {
        const doc = docs[i];
        els.exportProgress.textContent = `Building PDF ${i + 1} of ${docs.length}: ${doc.name}…`;
        setStatus(`Exporting document ${i + 1} of ${docs.length}…`, true);
        const bytes = await buildPdfBytes(doc.pages, {
          sourcePdfCache,
          onProgress: (done, total) => {
            els.exportProgress.textContent = `PDF ${i + 1} of ${docs.length}: page ${done} of ${total}…`;
          }
        });
        zip.file(uniqueZipPdfName(doc, usedNames), bytes);
        await new Promise(resolve => setTimeout(resolve, 0));
      }
      els.exportProgress.textContent = 'Packaging PDFs into ZIP…';
      setStatus('Packaging exported PDFs…', true);
      const zipBlob = await zip.generateAsync({ type: 'blob', compression: 'STORE', mimeType: 'application/zip' });
      const filename = ensureZipFilename(els.exportFilename.value);
      downloadBlob(zipBlob, filename);
      els.exportProgress.textContent = `Exported ${docs.length} PDFs in ${filename}.`;
      setStatus(`Exported ${docs.length} PDFs`);
    }
  } catch (err) {
    console.error(err);
    els.exportProgress.textContent = `Export failed: ${err?.message || err}`;
    setStatus('PDF export failed');
  } finally {
    renderExportPane();
  }
}

async function extractSelectedPdf() {
  saveCurrentDocumentState();
  const doc = currentDocument();
  if (!doc) return;
  if (els.extractFilename.dataset.documentId !== doc.id) {
    els.extractFilename.value = defaultExtractFilename(doc.name);
    els.extractFilename.dataset.documentId = doc.id;
  }
  const selectedPages = state.pages.filter(page => state.selected.has(page.id));
  if (!selectedPages.length) {
    els.extractProgress.textContent = 'Select one or more pages in Pages first.';
    return;
  }
  const filename = ensurePdfFilename(els.extractFilename.value, defaultExtractFilename(doc.name));
  els.extractPdfBtn.disabled = true;
  if (els.extractSelectedPagesBtn) els.extractSelectedPagesBtn.disabled = true;
  els.extractProgress.textContent = 'Preparing selected pages…';
  setStatus('Extracting selected pages…', true);
  try {
    const bytes = await buildPdfBytes(selectedPages, {
      onProgress: (done, total) => {
        els.extractProgress.textContent = `Building selected page ${done} of ${total}…`;
      }
    });
    downloadPdfBytes(bytes, filename);
    els.extractProgress.textContent = `Extracted ${selectedPages.length} page${selectedPages.length === 1 ? '' : 's'} to ${filename}.`;
    setStatus(`Extracted ${selectedPages.length} page${selectedPages.length === 1 ? '' : 's'}`);
  } catch (err) {
    console.error(err);
    els.extractProgress.textContent = `Extract failed: ${err?.message || err}`;
    setStatus('Page extraction failed');
  } finally {
    const disabled = state.selected.size === 0;
    els.extractPdfBtn.disabled = disabled;
    if (els.extractSelectedPagesBtn) els.extractSelectedPagesBtn.disabled = disabled;
  }
}

function makeFixedSplitGroups(pageList, pagesPerFile) {
  const n = Number(pagesPerFile);
  if (!Number.isInteger(n) || n < 1) throw new Error('Pages per PDF must be a whole number of at least 1.');
  const groups = [];
  for (let start = 0; start < pageList.length; start += n) {
    const pages = pageList.slice(start, start + n);
    const first = start + 1;
    const last = start + pages.length;
    groups.push({ pages, label: `pages-${first}-${last}` });
  }
  return groups;
}

function parsePageGroupSpec(spec, pageCount) {
  const pages = [];
  const seen = new Set();
  for (const rawToken of spec.split(',')) {
    const token = rawToken.trim();
    if (!token) continue;
    const match = token.match(/^(\d+)\s*(?:-\s*(\d+))?$/);
    if (!match) throw new Error(`Invalid page entry “${token}”. Use entries such as 4 or 7-12.`);
    const start = Number(match[1]);
    const end = match[2] ? Number(match[2]) : start;
    if (start < 1 || end < 1 || start > pageCount || end > pageCount) throw new Error(`Page entry “${token}” is outside 1-${pageCount}.`);
    if (end < start) throw new Error(`Page range “${token}” runs backward.`);
    for (let pageNo = start; pageNo <= end; pageNo++) {
      if (!seen.has(pageNo)) {
        seen.add(pageNo);
        pages.push(pageNo);
      }
    }
  }
  if (!pages.length) throw new Error('A page group cannot be empty.');
  return pages;
}

function normalizedPageGroupLabel(spec) {
  // Keep the filename faithful to what the user actually requested. A group
  // such as 3,5,7 must not be mislabeled as the contiguous range 3-7.
  return spec.split(',').map(rawToken => {
    const token = rawToken.trim();
    const match = token.match(/^(\d+)\s*(?:-\s*(\d+))?$/);
    if (!match) return token.replace(/\s+/g, '');
    return match[2] ? `${Number(match[1])}-${Number(match[2])}` : String(Number(match[1]));
  }).filter(Boolean).join('_');
}

function parseSplitRangeGroups(text, pageList) {
  const lines = String(text || '').split(/\r?\n/).map(line => line.trim()).filter(Boolean);
  if (!lines.length) throw new Error('Enter at least one page group. Put each output PDF on its own line.');
  return lines.map((line, index) => {
    const pageNumbers = parsePageGroupSpec(line, pageList.length);
    const requestedLabel = normalizedPageGroupLabel(line);
    const groupPrefix = lines.length > 1 ? `group-${String(index + 1).padStart(2, '0')}-pages-` : 'pages-';
    return {
      pages: pageNumbers.map(pageNo => pageList[pageNo - 1]),
      label: `${groupPrefix}${requestedLabel}`,
    };
  });
}

async function savePdfGroups(groups, baseName) {
  if (!groups.length) throw new Error('The split did not produce any output groups.');
  const safeBase = cleanFilenameBase(baseName, 'document');
  const sourcePdfCache = new Map();
  if (groups.length === 1) {
    els.splitProgress.textContent = `Building ${groups[0].pages.length}-page PDF…`;
    const bytes = await buildPdfBytes(groups[0].pages, {
      sourcePdfCache,
      onProgress: (done, total) => { els.splitProgress.textContent = `Building page ${done} of ${total}…`; }
    });
    const filename = `${safeBase}-${groups[0].label}.pdf`;
    downloadPdfBytes(bytes, filename);
    return { count: 1, filename };
  }

  const JSZip = await loadZipEngine();
  const zip = new JSZip();
  for (let i = 0; i < groups.length; i++) {
    const group = groups[i];
    els.splitProgress.textContent = `Building PDF ${i + 1} of ${groups.length}…`;
    setStatus(`Building split PDF ${i + 1} of ${groups.length}…`, true);
    const bytes = await buildPdfBytes(group.pages, {
      sourcePdfCache,
      onProgress: (done, total) => { els.splitProgress.textContent = `PDF ${i + 1} of ${groups.length}: page ${done} of ${total}…`; }
    });
    zip.file(`${safeBase}-${group.label}.pdf`, bytes);
    await new Promise(resolve => setTimeout(resolve, 0));
  }
  els.splitProgress.textContent = 'Packaging PDFs into ZIP…';
  setStatus('Packaging split PDFs…', true);
  // PDFs are generally already compressed. STORE avoids wasting time and memory
  // trying to recompress their contents, which is especially useful on iPad.
  const zipBlob = await zip.generateAsync({ type: 'blob', compression: 'STORE', mimeType: 'application/zip' });
  const filename = `${safeBase}-split.zip`;
  downloadBlob(zipBlob, filename);
  return { count: groups.length, filename };
}

async function splitEveryNPages() {
  saveCurrentDocumentState();
  if (!state.pages.length) return;
  els.splitFixedBtn.disabled = true;
  els.splitRangesBtn.disabled = true;
  els.splitProgress.textContent = 'Preparing split…';
  try {
    const groups = makeFixedSplitGroups(state.pages, Number(els.splitEveryCount.value));
    const result = await savePdfGroups(groups, els.splitBaseName.value);
    els.splitProgress.textContent = result.count > 1
      ? `Created ${result.count} PDFs in ${result.filename}.`
      : `Created ${result.filename}.`;
    setStatus(result.count > 1 ? `Created ${result.count} split PDFs` : 'Created split PDF');
  } catch (err) {
    console.error(err);
    els.splitProgress.textContent = `Split failed: ${err?.message || err}`;
    setStatus('PDF split failed');
  } finally {
    els.splitFixedBtn.disabled = false;
    els.splitRangesBtn.disabled = false;
  }
}

async function splitByPageGroups() {
  saveCurrentDocumentState();
  if (!state.pages.length) return;
  els.splitFixedBtn.disabled = true;
  els.splitRangesBtn.disabled = true;
  els.splitProgress.textContent = 'Checking page groups…';
  try {
    const groups = parseSplitRangeGroups(els.splitRanges.value, state.pages);
    const result = await savePdfGroups(groups, els.splitBaseName.value);
    els.splitProgress.textContent = result.count > 1
      ? `Created ${result.count} PDFs in ${result.filename}.`
      : `Created ${result.filename}.`;
    setStatus(result.count > 1 ? `Created ${result.count} split PDFs` : 'Created split PDF');
  } catch (err) {
    console.error(err);
    els.splitProgress.textContent = `Split failed: ${err?.message || err}`;
    setStatus('PDF split failed');
  } finally {
    els.splitFixedBtn.disabled = false;
    els.splitRangesBtn.disabled = false;
  }
}

function createCombinedDocument() {
  saveCurrentDocumentState();
  reconcileCombineOrder();
  const chosenDocs = state.combineOrder.map(documentById).filter(Boolean);
  if (chosenDocs.length < 2) {
    els.combineProgress.textContent = 'Choose at least two documents to combine.';
    return;
  }
  const combinedPages = [];
  for (const doc of chosenDocs) {
    for (const page of doc.pages) combinedPages.push({ ...page, id: uid('page') });
  }
  if (!combinedPages.length) {
    els.combineProgress.textContent = 'The chosen documents contain no pages.';
    return;
  }
  const name = String(els.combineName.value || '').trim().replace(/[\\/:*?"<>|]+/g, '_') || 'Combined.pdf';
  const combined = createDocument(name);
  state.fileSelected = new Set([combined.id]);
  state.fileSelectionInitialized = true;
  state.combineOrder = [combined.id];
  combined.pages = combinedPages;
  combined.selected = new Set();
  combined.selectionAnchorId = null;
  combined.activePageId = combinedPages[0].id;
  combined.history = [];
  combined.future = [];
  combined.singleView = { zoom: 1, fitMode: state.fitMode, scrollMode: state.scrollMode, activePageId: combinedPages[0].id, scrollTop: null, scrollLeft: null };
  state.pages = combined.pages;
  state.selected = combined.selected;
  state.selectionAnchorId = null;
  state.activePageId = combined.activePageId;
  state.history = combined.history;
  state.future = combined.future;
  state.workspaceMode = 'organize';
  saveCurrentDocumentState({ readViewDom: false });
  renderAll({ saveState: false });
  setStatus(`Created ${name} from ${chosenDocs.length} documents (${combinedPages.length} pages)`);
}

function showWorkspaceMode(mode) {
  state.workspaceMode = mode;
  const hasPages = state.pages.length > 0;
  els.emptyState.classList.toggle('hidden', hasPages || mode === 'export');
  els.viewerPane.classList.toggle('hidden', !hasPages || mode !== 'view');
  els.organizerPane.classList.toggle('hidden', !hasPages || mode !== 'organize');
  els.exportPane.classList.toggle('hidden', mode !== 'export');
  els.viewerControls.classList.toggle('hidden', mode !== 'view' || !hasPages);
  els.viewModeBtn.classList.toggle('active', mode === 'view');
  els.organizeModeBtn.classList.toggle('active', mode === 'organize');
  els.exportModeBtn.classList.toggle('active', mode === 'export');
  els.viewModeBtn.setAttribute('aria-pressed', String(mode === 'view'));
  els.organizeModeBtn.setAttribute('aria-pressed', String(mode === 'organize'));
  els.exportModeBtn.setAttribute('aria-pressed', String(mode === 'export'));
  if (hasPages && mode === 'view') renderViewer();
  if (hasPages && mode === 'organize') renderOrganizer();
  if (mode === 'export') renderExportPane();
}

function renderAll(options={}) {
  const { saveState = true } = options;
  if (saveState) saveCurrentDocumentState();
  renderDocumentSelect();
  updatePageCounts();
  showWorkspaceMode(state.workspaceMode);
}

function updatePageCounts() {
  const count = state.pages.length;
  els.pageCountLabel.textContent = `${count} page${count === 1 ? '' : 's'}`;
  const selectedCount = state.selected.size;
  els.selectionLabel.textContent = selectedCount ? `${selectedCount} selected` : 'None selected';
  const hasSelection = selectedCount > 0;
  els.rotateBtn.disabled = !hasSelection;
  els.duplicateBtn.disabled = !hasSelection;
  if (els.extractSelectedPagesBtn) els.extractSelectedPagesBtn.disabled = !hasSelection;
  els.deleteBtn.disabled = !hasSelection;
  els.selectAllBtn.textContent = selectedCount === count && count ? 'Select none' : 'Select all';
  els.pageCounter.textContent = count ? `${activeIndex() + 1} / ${count}` : '0 / 0';
  updateHistoryButtons();
}

function renderOrganizer() {
  state.thumbObserver?.disconnect();
  els.thumbnailGrid.replaceChildren();
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const card = entry.target;
        observer.unobserve(card);
        const page = pageById(card.dataset.pageId);
        const canvas = card.querySelector('canvas');
        if (page && canvas) renderThumbnail(page, canvas).catch(console.error);
      }
    }
  }, { root: els.thumbnailGrid, rootMargin: '250px' });
  state.thumbObserver = observer;

  state.pages.forEach((page, index) => {
    const [w, h] = rotatedDims(page);
    const card = document.createElement('article');
    card.className = `thumb-card${state.selected.has(page.id) ? ' selected' : ''}`;
    card.dataset.pageId = page.id;
    card.dataset.index = index;
    card.style.setProperty('--page-ratio', String(w / h));

    const preview = document.createElement('div');
    preview.className = 'thumb-preview';
    const canvas = document.createElement('canvas');
    canvas.setAttribute('aria-label', `Preview of page ${index + 1}`);
    preview.append(canvas);

    const footer = document.createElement('div');
    footer.className = 'thumb-footer';
    const check = document.createElement('input');
    check.type = 'checkbox';
    check.className = 'thumb-check';
    check.checked = state.selected.has(page.id);
    check.setAttribute('aria-label', `Select page ${index + 1}`);
    check.addEventListener('click', (e) => {
      // A checkbox is an additive selection control: checking another page must
      // not clear pages that were already checked. Do not preventDefault here;
      // doing so can make the native checkbox visually revert after we sync it.
      e.stopPropagation();
      applyCheckboxSelection(e, page.id, e.currentTarget.checked);
    });

    const title = document.createElement('div');
    title.className = 'thumb-title';
    const src = state.sources.get(page.sourceId);
    const generatedLabel = page.kind === 'generated' ? (page.generatedType === 'graph' ? 'Graph paper' : 'Blank page') : null;
    title.textContent = generatedLabel ? `${index + 1} · ${generatedLabel}` : `${index + 1} · ${src?.name ?? 'Page'}${src?.type === 'pdf' ? ` · p.${page.sourcePage}` : ''}`;
    title.title = title.textContent;

    const handle = document.createElement('button');
    handle.type = 'button';
    handle.className = 'drag-handle';
    handle.textContent = '⠿';
    handle.title = 'Drag to reorder';
    handle.setAttribute('aria-label', `Drag page ${index + 1} to reorder`);
    handle.addEventListener('pointerdown', beginPageDrag);
    handle.addEventListener('contextmenu', (e) => e.preventDefault());
    handle.addEventListener('dragstart', (e) => e.preventDefault());

    footer.append(check, title, handle);
    card.append(preview, footer);
    card.addEventListener('dblclick', () => openPageInViewer(page.id));
    preview.addEventListener('click', (e) => applySelectionGesture(e, page.id));
    els.thumbnailGrid.append(card);
    observer.observe(card);
  });
  updatePageCounts();
}

async function renderThumbnail(page, canvas) {
  const preview = canvas.closest('.thumb-preview');
  if (!preview || !preview.isConnected) return;
  const [bw, bh] = rotatedDims(page);
  const rect = preview.getBoundingClientRect();
  const innerW = Math.max(40, rect.width - 12);
  const innerH = Math.max(40, rect.height - 12);
  const scale = Math.min(innerW / bw, innerH / bh);
  const cssWidth = Math.max(1, bw * scale);
  const cssHeight = Math.max(1, bh * scale);
  await enqueueRender(async () => {
    if (!preview.isConnected || !canvas.isConnected) return;
    await renderPageToCanvas(page, canvas, cssWidth, cssHeight, 1.05, 1_100_000);
    // A scan image can occasionally fail to materialize while PDF.js still
    // resolves the render task. Retry once at a smaller raster size.
    if (page.kind !== 'generated' && canvasLooksBlank(canvas) && preview.isConnected) {
      await renderPageToCanvas(page, canvas, cssWidth, cssHeight, 0.8, 650_000);
    }
  }, 0);
}

function refreshSelectionCards() {
  els.thumbnailGrid.querySelectorAll('.thumb-card').forEach(card => {
    const selected = state.selected.has(card.dataset.pageId);
    card.classList.toggle('selected', selected);
    const check = card.querySelector('.thumb-check');
    if (check) check.checked = selected;
  });
  updatePageCounts();
}

function applySelectionGesture(event, pageId) {
  const index = state.pages.findIndex(p => p.id === pageId);
  if (index < 0) return;
  const toggle = event.ctrlKey || event.metaKey;
  const range = event.shiftKey && state.selectionAnchorId;

  if (range) {
    const anchorIndex = state.pages.findIndex(p => p.id === state.selectionAnchorId);
    if (anchorIndex >= 0) {
      if (!toggle) state.selected.clear();
      const lo = Math.min(anchorIndex, index), hi = Math.max(anchorIndex, index);
      for (let i = lo; i <= hi; i++) state.selected.add(state.pages[i].id);
    }
  } else if (toggle || state.selected.has(pageId)) {
    if (state.selected.has(pageId)) state.selected.delete(pageId); else state.selected.add(pageId);
    state.selectionAnchorId = pageId;
  } else {
    state.selected.clear();
    state.selected.add(pageId);
    state.selectionAnchorId = pageId;
  }
  refreshSelectionCards();
}

function applyCheckboxSelection(event, pageId, shouldSelect) {
  const index = state.pages.findIndex(p => p.id === pageId);
  if (index < 0) return;

  if (event.shiftKey && state.selectionAnchorId) {
    const anchorIndex = state.pages.findIndex(p => p.id === state.selectionAnchorId);
    if (anchorIndex >= 0) {
      const lo = Math.min(anchorIndex, index), hi = Math.max(anchorIndex, index);
      for (let i = lo; i <= hi; i++) {
        const id = state.pages[i].id;
        if (shouldSelect) state.selected.add(id); else state.selected.delete(id);
      }
    }
  } else {
    if (shouldSelect) state.selected.add(pageId); else state.selected.delete(pageId);
  }
  state.selectionAnchorId = pageId;
  refreshSelectionCards();
}

function toggleSelection(pageId, shouldSelect) {
  if (shouldSelect) state.selected.add(pageId); else state.selected.delete(pageId);
  state.selectionAnchorId = pageId;
  refreshSelectionCards();
}

function selectAllToggle() {
  if (state.selected.size === state.pages.length) { state.selected.clear(); state.selectionAnchorId = null; }
  else { state.pages.forEach(p => state.selected.add(p.id)); state.selectionAnchorId = state.pages[0]?.id || null; }
  renderOrganizer();
}

function rotateSelected() {
  if (!state.selected.size) return;
  const before = snapshotPages();
  state.pages.forEach(p => { if (state.selected.has(p.id)) p.rotation = (p.rotation + 90) % 360; });
  commitHistory(before);
  renderAll();
}
function duplicateSelected() {
  if (!state.selected.size) return;
  const before = snapshotPages();
  const newSelection = new Set();
  const result = [];
  for (const page of state.pages) {
    result.push(page);
    if (state.selected.has(page.id)) {
      const copy = { ...page, id: uid('page') };
      result.push(copy);
      newSelection.add(copy.id);
    }
  }
  state.pages = result;
  state.selected = newSelection;
  commitHistory(before);
  renderAll();
}
function deleteSelected() {
  if (!state.selected.size) return;
  const before = snapshotPages();
  state.pages = state.pages.filter(p => !state.selected.has(p.id));
  state.selected.clear();
  if (!state.pages.some(p => p.id === state.activePageId)) state.activePageId = state.pages[0]?.id ?? null;
  commitHistory(before);
  renderAll();
  if (!state.pages.length) showWorkspaceMode('view');
}

function beginPageDrag(event) {
  if (event.button !== undefined && event.button !== 0) return;
  const handle = event.currentTarget;
  const card = handle.closest('.thumb-card');
  if (!card || state.dragging) return;
  event.preventDefault();

  const before = snapshotPages();
  const startRect = card.getBoundingClientRect();
  const startX = event.clientX, startY = event.clientY;
  const offsetX = startX - startRect.left;
  const offsetY = startY - startRect.top;
  const drag = {
    card, handle, before, pointerId: event.pointerId, offsetX, offsetY,
    startRect, startX, startY, started: false, moved: false,
    placeholder: null, ghost: null,
  };
  state.dragging = drag;
  handle.setPointerCapture?.(event.pointerId);

  const startVisualDrag = (e) => {
    if (drag.started) return;
    drag.started = true;
    const placeholder = document.createElement('div');
    placeholder.className = 'thumb-placeholder';
    placeholder.style.height = `${startRect.height}px`;
    placeholder.setAttribute('aria-hidden', 'true');
    card.parentElement.insertBefore(placeholder, card);

    const ghost = card.cloneNode(true);
    ghost.classList.remove('selected');
    ghost.classList.add('drag-ghost');
    ghost.style.width = `${startRect.width}px`;
    ghost.style.height = `${startRect.height}px`;
    ghost.style.left = `${startRect.left}px`;
    ghost.style.top = `${startRect.top}px`;
    ghost.setAttribute('aria-hidden', 'true');
    ghost.querySelectorAll('button,input').forEach(el => { el.tabIndex = -1; el.disabled = true; });
    document.body.append(ghost);
    card.classList.add('drag-source');
    drag.placeholder = placeholder;
    drag.ghost = ghost;
    positionGhost(e);
  };

  const positionGhost = (e) => {
    if (!drag.ghost) return;
    drag.ghost.style.transform = `translate3d(${e.clientX - offsetX - startRect.left}px, ${e.clientY - offsetY - startRect.top}px, 0)`;
  };

  const animateGridMove = (mutate) => {
    const placeholder = drag.placeholder;
    const items = [...els.thumbnailGrid.querySelectorAll('.thumb-card:not(.drag-source), .thumb-placeholder')];
    const first = new Map(items.map(el => [el, el.getBoundingClientRect()]));
    mutate();
    requestAnimationFrame(() => {
      for (const el of items) {
        if (!el.isConnected || el === placeholder) continue;
        const a = first.get(el), b = el.getBoundingClientRect();
        if (!a || !b) continue;
        const dx = a.left - b.left, dy = a.top - b.top;
        if (!dx && !dy) continue;
        el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'translate(0, 0)' }],
          { duration: 140, easing: 'ease-out' });
      }
    });
  };

  const movePlaceholder = (e) => {
    const placeholder = drag.placeholder;
    if (!placeholder) return;
    const candidates = [...els.thumbnailGrid.querySelectorAll('.thumb-card:not(.drag-source)')];
    if (!candidates.length) return;
    let best = null, bestDist = Infinity;
    for (const el of candidates) {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const dx = e.clientX - cx, dy = e.clientY - cy, d = dx * dx + dy * dy;
      if (d < bestDist) { bestDist = d; best = { el, r, cx, cy }; }
    }
    if (!best) return;
    const sameRow = Math.abs(e.clientY - best.cy) <= best.r.height * 0.42;
    const putBefore = sameRow ? e.clientX < best.cx : e.clientY < best.cy;
    const reference = putBefore ? best.el : best.el.nextSibling;
    if (reference === placeholder || placeholder.nextSibling === reference) return;
    animateGridMove(() => els.thumbnailGrid.insertBefore(placeholder, reference));
    drag.moved = true;
  };

  const autoScroll = (e) => {
    const r = els.thumbnailGrid.getBoundingClientRect();
    const margin = Math.min(90, r.height * 0.18);
    let delta = 0;
    if (e.clientY < r.top + margin) delta = -Math.ceil((r.top + margin - e.clientY) / 5);
    else if (e.clientY > r.bottom - margin) delta = Math.ceil((e.clientY - (r.bottom - margin)) / 5);
    if (delta) els.thumbnailGrid.scrollTop += clamp(delta, -24, 24);
  };

  const move = (e) => {
    if (!state.dragging || e.pointerId !== drag.pointerId) return;
    if (!drag.started) {
      const dx = e.clientX - startX, dy = e.clientY - startY;
      if (Math.hypot(dx, dy) < 7) return;
      startVisualDrag(e);
    }
    positionGhost(e);
    autoScroll(e);
    movePlaceholder(e);
  };

  const cleanup = (commit) => {
    try { handle.releasePointerCapture?.(drag.pointerId); } catch {}
    handle.removeEventListener('pointermove', move);
    handle.removeEventListener('pointerup', end);
    handle.removeEventListener('pointercancel', cancel);

    if (!drag.started) {
      state.dragging = null;
      return;
    }
    if (commit && drag.placeholder) els.thumbnailGrid.insertBefore(card, drag.placeholder);
    drag.placeholder?.remove();
    drag.ghost?.remove();
    card.classList.remove('drag-source');
    state.dragging = null;

    if (!commit || !drag.moved) { renderOrganizer(); return; }
    const order = [...els.thumbnailGrid.querySelectorAll('.thumb-card')].map(el => el.dataset.pageId);
    const map = new Map(state.pages.map(p => [p.id, p]));
    state.pages = order.map(id => map.get(id)).filter(Boolean);
    commitHistory(drag.before);
    renderOrganizer();
    setStatus('Pages reordered');
  };

  const end = () => cleanup(true);
  const cancel = () => cleanup(false);
  handle.addEventListener('pointermove', move);
  handle.addEventListener('pointerup', end);
  handle.addEventListener('pointercancel', cancel);
}

function openPageInViewer(pageId) {
  const doc = currentDocument();
  if (!doc || !pageById(pageId)) return;
  state.activePageId = pageId;
  doc.activePageId = pageId;
  const targetPaneId = state.splitView ? state.activePaneId : null;

  if (state.splitView) {
    const pane = splitPaneState(targetPaneId);
    pane.documentId = state.currentDocumentId;
    const view = paneView(targetPaneId, state.currentDocumentId);
    if (view) { view.activePageId = pageId; view.scrollTop = null; view.scrollLeft = null; }
  } else {
    const view = ensureSingleView(doc);
    if (view) { view.activePageId = pageId; view.scrollTop = null; view.scrollLeft = null; }
  }

  state.pendingPageFocus = { documentId: doc.id, pageId, paneId: targetPaneId };
  showWorkspaceMode('view');
  focusPageAfterRender(doc.id, pageId, targetPaneId);
}

function activeViewerSettings() {
  if (state.splitView) {
    const view = paneView(state.activePaneId);
    return view ? { scrollMode: view.scrollMode, fitMode: view.fitMode, zoom: view.zoom } : { scrollMode: state.scrollMode, fitMode: state.fitMode, zoom: state.zoom };
  }
  return { scrollMode: state.scrollMode, fitMode: state.fitMode, zoom: state.zoom };
}

function viewerMidpoint(viewer) {
  const r = viewer.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

function captureViewerAnchor(viewer, clientX, clientY) {
  if (!viewer) return null;
  const stages = [...viewer.querySelectorAll('.page-stage[data-page-id]')];
  if (!stages.length) return null;
  let best = null, bestDist = Infinity;
  for (const stage of stages) {
    const r = stage.getBoundingClientRect();
    const cx = clamp(clientX, r.left, r.right), cy = clamp(clientY, r.top, r.bottom);
    const d = (clientX - cx) ** 2 + (clientY - cy) ** 2;
    if (d < bestDist) { bestDist = d; best = { stage, rect: r }; }
    if (clientX >= r.left && clientX <= r.right && clientY >= r.top && clientY <= r.bottom) break;
  }
  if (!best || !best.rect.width || !best.rect.height) return null;
  return {
    pageId: best.stage.dataset.pageId,
    fx: clamp((clientX - best.rect.left) / best.rect.width, 0, 1),
    fy: clamp((clientY - best.rect.top) / best.rect.height, 0, 1),
    clientX, clientY,
  };
}

function restoreViewerAnchor(viewer, anchor, clientX=anchor?.clientX, clientY=anchor?.clientY) {
  if (!viewer || !anchor?.pageId || !Number.isFinite(clientX) || !Number.isFinite(clientY)) return false;
  const stage = viewer.querySelector(`.page-stage[data-page-id="${CSS.escape(anchor.pageId)}"]`);
  if (!stage) return false;
  // Read the actual post-layout page rectangle. This deliberately avoids
  // ratio-only scroll math: flex centering, gaps, viewport changes, and Safari
  // layout behavior are all already reflected in this measured geometry.
  const r = stage.getBoundingClientRect();
  if (!r.width || !r.height) return false;
  const targetX = r.left + anchor.fx * r.width;
  const targetY = r.top + anchor.fy * r.height;
  viewer.scrollLeft += targetX - clientX;
  viewer.scrollTop += targetY - clientY;
  return true;
}

function restoreViewerAnchorAfterLayout(viewer, anchor, clientX, clientY, done=null) {
  if (!viewer || !anchor) { done?.(); return; }
  // Safari/iPad can apply a deferred scroll/layout correction after the first
  // animation frame. Correct on two consecutive settled layouts so the PDF
  // point under the pinch midpoint wins over that deferred adjustment.
  requestAnimationFrame(() => {
    restoreViewerAnchor(viewer, anchor, clientX, clientY);
    requestAnimationFrame(() => {
      restoreViewerAnchor(viewer, anchor, clientX, clientY);
      done?.();
    });
  });
}

function singlePageNearestViewportCenter() {
  if (!els.viewer || els.viewer.classList.contains('hidden')) return null;
  const stages = [...els.viewer.querySelectorAll('.page-stage[data-page-id]')];
  if (!stages.length) return null;
  const centerY = els.viewer.scrollTop + els.viewer.clientHeight / 2;
  let best = null;
  let bestDistance = Infinity;
  let bestCenterDistance = Infinity;
  for (const stage of stages) {
    const top = stage.offsetTop;
    const height = stage.offsetHeight;
    const bottom = top + height;
    const distance = centerY < top ? top - centerY : centerY > bottom ? centerY - bottom : 0;
    const centerDistance = Math.abs((top + height / 2) - centerY);
    if (distance < bestDistance || (distance === bestDistance && centerDistance < bestCenterDistance)) {
      best = stage;
      bestDistance = distance;
      bestCenterDistance = centerDistance;
    }
  }
  return best?.dataset.pageId || null;
}

function syncSingleActivePageFromViewport(options={}) {
  const { updateUi = true } = options;
  if (state.splitView || !state.pages.length || !els.viewer || els.viewer.classList.contains('hidden')) return state.activePageId;
  if (state.scrollMode === 'single') return state.activePageId;

  const pending = state.pendingPageFocus;
  if (pending && pending.documentId === state.currentDocumentId && pending.paneId === null) return pending.pageId;

  const id = singlePageNearestViewportCenter();
  if (!id || !pageById(id)) return state.activePageId;
  const doc = currentDocument();
  const view = ensureSingleView(doc);
  state.activePageId = id;
  if (doc) doc.activePageId = id;
  if (view) view.activePageId = id;
  if (updateUi) {
    markActivePage();
    updatePageCounts();
  }
  return id;
}

function cancelSingleActivePageSync() {
  if (state.singleActivePageSyncFrame) {
    cancelAnimationFrame(state.singleActivePageSyncFrame);
    state.singleActivePageSyncFrame = null;
  }
}

function scheduleSingleActivePageSync() {
  if (state.splitView || state.suppressSingleScrollSave || state.singleActivePageSyncFrame) return;
  state.singleActivePageSyncFrame = requestAnimationFrame(() => {
    state.singleActivePageSyncFrame = null;
    syncSingleActivePageFromViewport();
    updateSingleViewScrollFromDom();
  });
}

function updateSingleViewScrollFromDom() {
  if (state.splitView || state.suppressSingleScrollSave) return;
  const doc = currentDocument(), view = ensureSingleView(doc);
  if (!view || els.viewer.classList.contains('hidden')) return;
  view.scrollTop = els.viewer.scrollTop;
  view.scrollLeft = els.viewer.scrollLeft;
  view.activePageId = state.activePageId;
}

function cycleScrollMode() {
  const modes = ['continuous', 'snap', 'single'];
  if (state.splitView) {
    const view = paneView();
    if (!view) return;
    savePaneScroll(state.activePaneId);
    view.scrollMode = modes[(modes.indexOf(view.scrollMode) + 1) % modes.length];
    view.scrollTop = null; view.scrollLeft = null;
    renderSplitPane(state.activePaneId);
    updateViewerLabels();
    return;
  }
  updateSingleViewScrollFromDom();
  state.scrollMode = modes[(modes.indexOf(state.scrollMode) + 1) % modes.length];
  savePref('pdfwb-scroll-mode', state.scrollMode);
  const view = ensureSingleView(currentDocument());
  if (view) { view.scrollMode = state.scrollMode; view.scrollTop = null; view.scrollLeft = null; }
  renderViewer();
}
function cycleFitMode() {
  if (state.splitView) {
    const view = paneView();
    if (!view) return;
    savePaneScroll(state.activePaneId);
    view.fitMode = view.fitMode === 'width' ? 'page' : 'width';
    view.zoom = 1;
    view.scrollTop = null; view.scrollLeft = null;
    renderSplitPane(state.activePaneId);
    updateViewerLabels();
    return;
  }
  updateSingleViewScrollFromDom();
  state.fitMode = state.fitMode === 'width' ? 'page' : 'width';
  state.zoom = 1;
  savePref('pdfwb-fit-mode', state.fitMode);
  const view = ensureSingleView(currentDocument());
  if (view) { view.fitMode = state.fitMode; view.zoom = 1; view.scrollTop = null; view.scrollLeft = null; }
  renderViewer();
}
function setZoom(value) {
  if (state.splitView) return setZoomForPane(state.activePaneId, value);
  const viewer = els.viewer;
  const point = viewerMidpoint(viewer);
  const anchor = captureViewerAnchor(viewer, point.x, point.y);
  state.zoom = clamp(value, 0.25, 4);
  const view = ensureSingleView(currentDocument());
  if (view) view.zoom = state.zoom;
  renderViewer();
  state.suppressSingleScrollSave = true;
  restoreViewerAnchorAfterLayout(viewer, anchor, point.x, point.y, () => {
    state.suppressSingleScrollSave = false;
    updateSingleViewScrollFromDom();
  });
}
function zoomBy(factor) {
  const settings = activeViewerSettings();
  setZoom(settings.zoom * factor);
}
function resetZoom() { setZoom(1); }

function applyLiveSingleZoom() {
  state.pinchRenderFrame = null;
  state.suppressSingleScrollSave = true;
  els.viewer.querySelectorAll('.page-stage[data-page-id]').forEach(stage => {
    const page = pageById(stage.dataset.pageId);
    if (!page) return;
    const size = computeCssSize(page);
    stage.style.width = `${size.width}px`;
    stage.style.height = `${size.height}px`;
    const canvas = stage.querySelector('canvas');
    if (canvas) { canvas.style.width = `${size.width}px`; canvas.style.height = `${size.height}px`; }
  });
  const g = state.pinchGesture;
  // Force a layout read, then correct from the measured post-scale geometry.
  // Scroll-state persistence is suppressed until the correction is complete so
  // transient Safari scroll events cannot replace the intended position.
  void els.viewer.scrollHeight;
  if (g?.anchor && g?.midpoint) restoreViewerAnchor(els.viewer, g.anchor, g.midpoint.x, g.midpoint.y);
  state.suppressSingleScrollSave = false;
  updateSingleViewScrollFromDom();
}

function applyLivePaneZoom(paneId) {
  const pane = splitPaneState(paneId), view = paneView(paneId), pe = paneElements(paneId);
  pane.pinchRenderFrame = null;
  if (!view) return;
  pane.suppressScrollSave = true;
  pe.viewer.querySelectorAll('.page-stage[data-page-id]').forEach(stage => {
    const doc = documentById(pane.documentId);
    const page = splitPageById(doc, stage.dataset.pageId);
    if (!page) return;
    const size = computePaneCssSize(page, paneId, view);
    stage.style.width = `${size.width}px`;
    stage.style.height = `${size.height}px`;
    const canvas = stage.querySelector('canvas');
    if (canvas) { canvas.style.width = `${size.width}px`; canvas.style.height = `${size.height}px`; }
  });
  const g = pane.pinchGesture;
  void pe.viewer.scrollHeight;
  if (g?.anchor && g?.midpoint) restoreViewerAnchor(pe.viewer, g.anchor, g.midpoint.x, g.midpoint.y);
  pane.suppressScrollSave = false;
  savePaneScroll(paneId);
}

function queuePinchZoom(value, paneId=null) {
  if (paneId && state.splitView) {
    const pane = splitPaneState(paneId), view = paneView(paneId);
    if (!view) return;
    view.zoom = clamp(value, 0.25, 4);
    if (state.activePaneId === paneId) updateViewerLabels();
    if (!pane.pinchRenderFrame) pane.pinchRenderFrame = requestAnimationFrame(() => applyLivePaneZoom(paneId));
    return;
  }
  state.zoom = clamp(value, 0.25, 4);
  const view = ensureSingleView(currentDocument());
  if (view) view.zoom = state.zoom;
  updateViewerLabels();
  if (!state.pinchRenderFrame) state.pinchRenderFrame = requestAnimationFrame(applyLiveSingleZoom);
}
function updateViewerLabels() {
  const settings = activeViewerSettings();
  const modeLabel = { continuous: 'Continuous', snap: 'Page snap', single: 'Full page' }[settings.scrollMode];
  const modeIcon = { continuous: '↕', snap: '⇵', single: '▤' }[settings.scrollMode];
  const fitLabel = settings.fitMode === 'width' ? 'Fit width' : 'Fit page';
  const fitIcon = settings.fitMode === 'width' ? '↔' : '▣';
  els.scrollModeLabel.textContent = modeLabel;
  els.scrollModeIcon.textContent = modeIcon;
  els.fitModeLabel.textContent = fitLabel;
  if (els.fitModeIcon) els.fitModeIcon.textContent = fitIcon;
  els.fitModeBtn.title = fitLabel;
  const zoomText = `${Math.round(settings.zoom * 100)}%`;
  els.zoomLabel.textContent = zoomText;
  if (els.presentationZoomLabel) els.presentationZoomLabel.textContent = zoomText;
  if (els.presentationScrollModeBtn) els.presentationScrollModeBtn.textContent = modeIcon;
  if (els.presentationFitBtn) {
    els.presentationFitBtn.textContent = fitIcon;
    els.presentationFitBtn.title = fitLabel;
    els.presentationFitBtn.setAttribute('aria-label', fitLabel);
  }
  els.splitViewBtn?.setAttribute('aria-pressed', String(state.splitView));
  if (els.splitViewLabel) els.splitViewLabel.textContent = state.splitView ? 'Single' : 'Split';
  if (els.presentationLayoutBtn) {
    const toSplit = !state.splitView;
    els.presentationLayoutBtn.textContent = toSplit ? '◫' : '▯';
    els.presentationLayoutBtn.title = toSplit ? 'Switch to split view' : 'Switch to single view';
    els.presentationLayoutBtn.setAttribute('aria-label', els.presentationLayoutBtn.title);
  }
  els.singlePageNav.classList.toggle('hidden', state.splitView || settings.scrollMode !== 'single' || !state.pages.length);
  if (state.splitView) { updateSplitPaneNav('left'); updateSplitPaneNav('right'); }
  updatePageCounts();
}

function adoptPaneAsSingle(paneId) {
  savePaneScroll('left');
  savePaneScroll('right');
  const pane = splitPaneState(paneId), doc = documentById(pane.documentId), view = copyView(paneView(paneId));
  if (!doc || !view) return false;
  loadDocumentState(doc.id, false);
  state.singleSourcePaneId = paneId;
  doc.singleView = copyView(view);
  applySingleView(doc, view);
  return true;
}

function adoptSingleIntoPane(paneId) {
  const doc = currentDocument();
  if (!doc) return false;
  saveSingleViewFromState(doc, true);
  const pane = splitPaneState(paneId);
  pane.documentId = doc.id;
  pane.views.set(doc.id, copyView(ensureSingleView(doc)));
  state.activePaneId = paneId;
  return true;
}

function toggleSplitView() {
  if (!state.documents.length) return;
  let transferAnchor = null, destinationPaneId = null;

  if (!state.splitView) {
    const sourcePoint = viewerMidpoint(els.viewer);
    transferAnchor = captureViewerAnchor(els.viewer, sourcePoint.x, sourcePoint.y);
    saveCurrentDocumentState();
    const targetPaneId = state.singleSourcePaneId === 'right' ? 'right' : 'left';
    destinationPaneId = targetPaneId;
    state.splitView = true;
    ensureSplitPaneDocuments();
    adoptSingleIntoPane(targetPaneId);
    const targetView = paneView(targetPaneId);
    if (targetView && transferAnchor?.pageId) {
      targetView.activePageId = transferAnchor.pageId;
      targetView.scrollTop = null;
      targetView.scrollLeft = null;
    }
    // On the first split, initialize the other pane with another document when
    // possible. On later transitions, leave its independent state untouched.
    const otherId = targetPaneId === 'left' ? 'right' : 'left';
    const other = splitPaneState(otherId);
    if (!other.documentId) {
      other.documentId = state.documents.find(d => d.id !== currentDocument()?.id)?.id || currentDocument()?.id || null;
      if (other.documentId) paneView(otherId, other.documentId);
    }
  } else {
    const sourcePaneId = state.activePaneId;
    const sourceViewer = paneElements(sourcePaneId).viewer;
    const sourcePoint = viewerMidpoint(sourceViewer);
    transferAnchor = captureViewerAnchor(sourceViewer, sourcePoint.x, sourcePoint.y);
    if (!adoptPaneAsSingle(sourcePaneId)) return;
    const doc = currentDocument(), singleView = ensureSingleView(doc);
    if (singleView && transferAnchor?.pageId) {
      singleView.activePageId = transferAnchor.pageId;
      singleView.scrollTop = null;
      singleView.scrollLeft = null;
      state.activePageId = transferAnchor.pageId;
    }
    state.splitView = false;
  }

  renderDocumentSelect();
  renderViewer();
  updateViewerLabels();

  // Layout changes alter the viewport width, so raw scrollTop values cannot be
  // transferred safely. Re-center the same point on the same page instead.
  if (transferAnchor) requestAnimationFrame(() => {
    if (state.splitView) {
      const pe = paneElements(destinationPaneId || state.activePaneId);
      const point = viewerMidpoint(pe.viewer);
      restoreViewerAnchor(pe.viewer, transferAnchor, point.x, point.y);
      savePaneScroll(destinationPaneId || state.activePaneId);
    } else {
      const point = viewerMidpoint(els.viewer);
      restoreViewerAnchor(els.viewer, transferAnchor, point.x, point.y);
      updateSingleViewScrollFromDom();
    }
  });

  if (document.body.classList.contains('presentation')) showPresentationControls();
  setStatus(state.splitView ? 'Side-by-side view' : 'Single-document view');
}

function computeCssSize(page) {
  const [bw, bh] = rotatedDims(page);
  const wAvail = Math.max(120, els.viewer.clientWidth - (document.body.classList.contains('presentation') ? 4 : 30));
  const hAvail = Math.max(120, els.viewer.clientHeight - (document.body.classList.contains('presentation') ? 4 : 30));
  let scale;
  if (state.fitMode === 'width') scale = wAvail / bw;
  else scale = Math.min(wAvail / bw, hAvail / bh);
  if (state.scrollMode === 'single') scale = Math.min(wAvail / bw, hAvail / bh);
  scale *= state.zoom;
  scale = clamp(scale, 0.02, 8);
  return { width: Math.max(1, bw * scale), height: Math.max(1, bh * scale) };
}

function ensurePageLoading(stage, text='Rendering…') {
  let loading = stage.querySelector('.page-loading');
  if (!loading) {
    loading = document.createElement('div');
    loading.className = 'page-loading';
    stage.append(loading);
  }
  loading.textContent = text;
  return loading;
}

function releaseViewerStage(stage) {
  const canvas = stage.querySelector('canvas');
  if (canvas) {
    // Resetting width/height releases the browser/GPU backing store. This is
    // essential for long scan-only PDFs, where each visible page can otherwise
    // keep several megabytes (or much more) of decoded raster memory alive.
    canvas.width = 1;
    canvas.height = 1;
  }
  delete stage.dataset.rendered;
  ensurePageLoading(stage, 'Rendering…');
}

function canvasLooksBlank(canvas) {
  if (!canvas.width || !canvas.height) return true;
  try {
    const probe = document.createElement('canvas');
    probe.width = 72;
    probe.height = 72;
    const pctx = probe.getContext('2d', { willReadFrequently: true });
    pctx.drawImage(canvas, 0, 0, probe.width, probe.height);
    const data = pctx.getImageData(0, 0, probe.width, probe.height).data;
    let min = 255, max = 0;
    for (let i = 0; i < data.length; i += 4) {
      const lum = (data[i] * 0.299) + (data[i + 1] * 0.587) + (data[i + 2] * 0.114);
      if (lum < min) min = lum;
      if (lum > max) max = lum;
      // Any clearly non-white content means the page rendered successfully.
      if (lum < 246) return false;
    }
    return min > 250 && (max - min) < 3;
  } catch {
    // If the browser refuses inspection, do not force a retry loop.
    return false;
  }
}

function renderSingleViewer() {
  cancelSingleActivePageSync();
  state.renderGeneration++;
  const generation = state.renderGeneration;
  const savedView = ensureSingleView(currentDocument());
  const restoreTop = Number.isFinite(savedView?.scrollTop) ? savedView.scrollTop : null;
  const restoreLeft = Number.isFinite(savedView?.scrollLeft) ? savedView.scrollLeft : null;
  state.suppressSingleScrollSave = true;
  state.pageObserver?.disconnect();
  els.viewer.replaceChildren();
  els.viewer.className = `viewer ${state.scrollMode} fit-${state.fitMode}`;
  updateViewerLabels();
  if (!state.pages.length) { state.suppressSingleScrollSave = false; return; }
  if (!state.activePageId) state.activePageId = state.pages[0].id;

  const pagesToBuild = state.scrollMode === 'single' ? [state.pages[activeIndex()]] : state.pages;
  const observer = state.scrollMode === 'single' ? null : new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const stage = entry.target;
      if (entry.isIntersecting && entry.intersectionRatio > .01) {
        stage.dataset.wantRender = 'true';
        const page = pageById(stage.dataset.pageId);
        const canvas = stage.querySelector('canvas');
        if (page && canvas && stage.dataset.rendered !== 'loading' && stage.dataset.rendered !== 'true') {
          stage.dataset.rendered = 'loading';
          ensurePageLoading(stage);
          renderViewerPage(page, stage, canvas, generation).catch(err => renderError(stage, err));
        }
      } else {
        stage.dataset.wantRender = 'false';
        // This callback fires only after the page has left the generous root
        // margin, so releasing it does not cause normal nearby scrolling to
        // constantly render/evict the same page.
        if (stage.dataset.rendered === 'true' || stage.dataset.rendered === 'error') {
          releaseViewerStage(stage);
        }
      }
    }
  }, { root: els.viewer, rootMargin: '125% 0px 125% 0px', threshold: [0.01, .28, .55, .8] });
  state.pageObserver = observer;

  for (const page of pagesToBuild) {
    const size = computeCssSize(page);
    const stage = document.createElement('div');
    stage.className = `page-stage${page.id === state.activePageId ? ' active-page' : ''}`;
    stage.dataset.pageId = page.id;
    stage.style.width = `${size.width}px`;
    stage.style.height = `${size.height}px`;
    const canvas = document.createElement('canvas');
    const loading = document.createElement('div');
    loading.className = 'page-loading';
    loading.textContent = 'Rendering…';
    stage.append(canvas, loading);
    els.viewer.append(stage);
    if (observer) observer.observe(stage);
    else {
      stage.dataset.wantRender = 'true';
      stage.dataset.rendered = 'loading';
      renderViewerPage(page, stage, canvas, generation).catch(err => renderError(stage, err));
    }
  }
  if (state.scrollMode !== 'single') {
    requestAnimationFrame(() => {
      if (restoreTop !== null || restoreLeft !== null) {
        els.viewer.scrollTop = restoreTop ?? 0;
        els.viewer.scrollLeft = restoreLeft ?? 0;
      } else {
        scrollActivePageIntoView('auto');
      }
      // A second frame is intentional for iPad/Safari: a DOM rebuild may emit a
      // delayed zero-scroll event or layout correction after the first frame.
      requestAnimationFrame(() => {
        if (restoreTop !== null || restoreLeft !== null) {
          els.viewer.scrollTop = restoreTop ?? 0;
          els.viewer.scrollLeft = restoreLeft ?? 0;
        }
        state.suppressSingleScrollSave = false;
        syncSingleActivePageFromViewport();
        updateSingleViewScrollFromDom();
      });
    });
  } else {
    requestAnimationFrame(() => { state.suppressSingleScrollSave = false; });
  }
}


function splitPageById(doc, id) { return doc?.pages?.find(p => p.id === id) || null; }
function splitActiveIndex(doc, view) { return Math.max(0, doc?.pages?.findIndex(p => p.id === view?.activePageId) ?? 0); }

function computePaneCssSize(page, paneId, view=paneView(paneId)) {
  const pe = paneElements(paneId);
  const [bw, bh] = rotatedDims(page);
  const wAvail = Math.max(80, pe.viewer.clientWidth - (document.body.classList.contains('presentation') ? 4 : 18));
  const hAvail = Math.max(80, pe.viewer.clientHeight - (document.body.classList.contains('presentation') ? 4 : 18));
  let scale;
  if (view?.fitMode === 'width') scale = wAvail / bw;
  else scale = Math.min(wAvail / bw, hAvail / bh);
  if (view?.scrollMode === 'single') scale = Math.min(wAvail / bw, hAvail / bh);
  scale *= view?.zoom ?? 1;
  scale = clamp(scale, 0.02, 8);
  return { width: Math.max(1, bw * scale), height: Math.max(1, bh * scale) };
}

function updateSplitPaneNav(paneId) {
  const pane = splitPaneState(paneId), doc = documentById(pane.documentId), view = paneView(paneId), pe = paneElements(paneId);
  const count = doc?.pages?.length || 0;
  const index = count && view ? splitActiveIndex(doc, view) : 0;
  pe.counter.textContent = count ? `${index + 1} / ${count}` : '0 / 0';
  pe.nav.classList.toggle('hidden', !count || view?.scrollMode !== 'single');
}

function markSplitActivePage(paneId) {
  const pe = paneElements(paneId), view = paneView(paneId);
  pe.viewer.querySelectorAll('.page-stage').forEach(el => el.classList.toggle('active-page', el.dataset.pageId === view?.activePageId));
  updateSplitPaneNav(paneId);
}

function scrollSplitActivePageIntoView(paneId, behavior='smooth') {
  const pe = paneElements(paneId), view = paneView(paneId);
  if (!view?.activePageId) return;
  const el = pe.viewer.querySelector(`.page-stage[data-page-id="${CSS.escape(view.activePageId)}"]`);
  el?.scrollIntoView({ block: 'center', inline: 'center', behavior });
}

function splitPageNearestViewportCenter(paneId) {
  const pe = paneElements(paneId);
  const viewer = pe?.viewer;
  if (!viewer || viewer.classList.contains('hidden')) return null;
  const stages = [...viewer.querySelectorAll('.page-stage[data-page-id]')];
  if (!stages.length) return null;
  const centerY = viewer.scrollTop + viewer.clientHeight / 2;
  let best = null;
  let bestDistance = Infinity;
  let bestCenterDistance = Infinity;
  for (const stage of stages) {
    const top = stage.offsetTop;
    const height = stage.offsetHeight;
    const bottom = top + height;
    const distance = centerY < top ? top - centerY : centerY > bottom ? centerY - bottom : 0;
    const centerDistance = Math.abs((top + height / 2) - centerY);
    if (distance < bestDistance || (distance === bestDistance && centerDistance < bestCenterDistance)) {
      best = stage;
      bestDistance = distance;
      bestCenterDistance = centerDistance;
    }
  }
  return best?.dataset.pageId || null;
}


function captureSplitPaneViewportAnchor(paneId, documentId) {
  if (!state.splitView) return null;
  const pane = splitPaneState(paneId);
  const view = paneView(paneId, documentId);
  const pe = paneElements(paneId);
  if (!pane || pane.documentId !== documentId || !view || !pe?.viewer) return null;

  // Full Page already identifies the view by page id rather than by a long
  // document scroll offset. Its logical page therefore survives insertion
  // before it without any coordinate correction.
  if (view.scrollMode === 'single') {
    return { documentId, pageId: view.activePageId, scrollMode: 'single' };
  }

  const pageId = splitPageNearestViewportCenter(paneId) || view.activePageId;
  if (!pageId) return null;
  const stage = pe.viewer.querySelector(`.page-stage[data-page-id="${CSS.escape(pageId)}"]`);
  if (!stage) return { documentId, pageId, scrollMode: view.scrollMode, xRatio: .5, yRatio: .5 };

  const centerX = pe.viewer.scrollLeft + pe.viewer.clientWidth / 2;
  const centerY = pe.viewer.scrollTop + pe.viewer.clientHeight / 2;
  const xRatio = stage.offsetWidth ? (centerX - stage.offsetLeft) / stage.offsetWidth : .5;
  const yRatio = stage.offsetHeight ? (centerY - stage.offsetTop) / stage.offsetHeight : .5;
  return { documentId, pageId, scrollMode: view.scrollMode, xRatio, yRatio };
}

function queueStructuralAnchorForOtherSplitPane(documentId, targetPaneId) {
  if (!state.splitView) return;
  for (const paneId of ['left', 'right']) {
    if (paneId === targetPaneId) continue;
    const pane = splitPaneState(paneId);
    if (pane.documentId !== documentId) continue;
    const anchor = captureSplitPaneViewportAnchor(paneId, documentId);
    if (!anchor) continue;
    pane.pendingStructuralAnchor = anchor;
    // Raw scrollTop belongs to the pre-edit page stack. If a page is inserted
    // above this pane, restoring that pixel value visibly moves the pane even
    // though its logical page id has not changed. Let renderSplitPane restore
    // from the logical page anchor instead.
    const view = paneView(paneId, documentId);
    if (view) {
      view.activePageId = anchor.pageId || view.activePageId;
      view.scrollTop = null;
      view.scrollLeft = null;
    }
  }
}

function restoreSplitPaneStructuralAnchor(paneId, anchor) {
  const pane = splitPaneState(paneId);
  const pe = paneElements(paneId);
  const view = paneView(paneId, anchor?.documentId);
  if (!anchor || !view || pane.documentId !== anchor.documentId || !pe?.viewer) return false;
  const stage = pe.viewer.querySelector(`.page-stage[data-page-id="${CSS.escape(anchor.pageId || '')}"]`);
  if (!stage) return false;

  view.activePageId = anchor.pageId;
  if (anchor.scrollMode === 'single') return true;

  // Page Snap should continue to show the same snapped page. Continuous mode
  // preserves the same document point under the center of this pane.
  const xRatio = Number.isFinite(anchor.xRatio) ? anchor.xRatio : .5;
  const yRatio = anchor.scrollMode === 'snap' ? .5 : (Number.isFinite(anchor.yRatio) ? anchor.yRatio : .5);
  pe.viewer.scrollLeft = stage.offsetLeft + stage.offsetWidth * xRatio - pe.viewer.clientWidth / 2;
  pe.viewer.scrollTop = stage.offsetTop + stage.offsetHeight * yRatio - pe.viewer.clientHeight / 2;
  return true;
}

function syncSplitActivePageFromViewport(paneId, options={}) {
  const { updateUi = true } = options;
  if (!state.splitView) return paneView(paneId)?.activePageId || null;
  const pane = splitPaneState(paneId);
  const doc = documentById(pane.documentId);
  const view = paneView(paneId);
  const pe = paneElements(paneId);
  if (!doc?.pages?.length || !view || !pe?.viewer || view.scrollMode === 'single') return view?.activePageId || null;

  const pending = state.pendingPageFocus;
  if (pending && pending.documentId === doc.id && pending.paneId === paneId) {
    return pending.pageId;
  }

  const id = splitPageNearestViewportCenter(paneId);
  if (!id || !splitPageById(doc, id)) return view.activePageId;
  view.activePageId = id;
  if (state.activePaneId === paneId) state.activePageId = id;
  if (updateUi) {
    markSplitActivePage(paneId);
    if (state.activePaneId === paneId) updateViewerLabels();
  }
  return id;
}

function cancelSplitActivePageSync(paneId) {
  const pane = splitPaneState(paneId);
  if (pane.activePageSyncFrame) {
    cancelAnimationFrame(pane.activePageSyncFrame);
    pane.activePageSyncFrame = null;
  }
}

function scheduleSplitActivePageSync(paneId) {
  const pane = splitPaneState(paneId);
  if (!state.splitView || pane.suppressScrollSave || pane.activePageSyncFrame) return;
  pane.activePageSyncFrame = requestAnimationFrame(() => {
    pane.activePageSyncFrame = null;
    syncSplitActivePageFromViewport(paneId);
    savePaneScroll(paneId);
  });
}

function renderSplitView() {
  ensureSplitPaneDocuments();
  // Cancel any single-view render work before both split panes begin sharing
  // the bounded raster queue.
  state.renderGeneration++;
  state.pageObserver?.disconnect();
  els.viewer.replaceChildren();
  els.viewer.classList.add('hidden');
  els.singlePageNav.classList.add('hidden');
  els.splitViewer.classList.remove('hidden');
  renderDocumentSelect();
  renderSplitPane('left');
  renderSplitPane('right');
  activateSplitPane(state.activePaneId, true);
}

function renderSplitPane(paneId) {
  const pane = splitPaneState(paneId), pe = paneElements(paneId), doc = documentById(pane.documentId), view = paneView(paneId);
  cancelSplitActivePageSync(paneId);
  pane.generation++;
  const generation = pane.generation;
  const restoreTop = Number.isFinite(view?.scrollTop) ? view.scrollTop : null;
  const restoreLeft = Number.isFinite(view?.scrollLeft) ? view.scrollLeft : null;
  pane.suppressScrollSave = true;
  pane.observer?.disconnect();
  pe.viewer.replaceChildren();
  pe.viewer.className = `viewer split-pane-viewer ${view?.scrollMode || 'continuous'} fit-${view?.fitMode || 'width'}`;
  updateSplitPaneNav(paneId);
  if (!doc?.pages?.length || !view) { pane.suppressScrollSave = false; return; }
  if (!view.activePageId) view.activePageId = doc.pages[0].id;

  const pagesToBuild = view.scrollMode === 'single' ? [doc.pages[splitActiveIndex(doc, view)]] : doc.pages;
  const observer = view.scrollMode === 'single' ? null : new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const stage = entry.target;
      if (entry.isIntersecting && entry.intersectionRatio > .01) {
        stage.dataset.wantRender = 'true';
        const page = splitPageById(doc, stage.dataset.pageId);
        const canvas = stage.querySelector('canvas');
        if (page && canvas && stage.dataset.rendered !== 'loading' && stage.dataset.rendered !== 'true') {
          stage.dataset.rendered = 'loading';
          ensurePageLoading(stage);
          renderSplitViewerPage(paneId, page, stage, canvas, generation).catch(err => renderError(stage, err));
        }
      } else {
        stage.dataset.wantRender = 'false';
        if (stage.dataset.rendered === 'true' || stage.dataset.rendered === 'error') releaseViewerStage(stage);
      }
    }
  }, { root: pe.viewer, rootMargin: '110% 0px 110% 0px', threshold: [0.01, .28, .55, .8] });
  pane.observer = observer;

  for (const page of pagesToBuild) {
    if (!page) continue;
    const size = computePaneCssSize(page, paneId, view);
    const stage = document.createElement('div');
    stage.className = `page-stage${page.id === view.activePageId ? ' active-page' : ''}`;
    stage.dataset.pageId = page.id;
    stage.style.width = `${size.width}px`;
    stage.style.height = `${size.height}px`;
    const canvas = document.createElement('canvas');
    const loading = document.createElement('div');
    loading.className = 'page-loading';
    loading.textContent = 'Rendering…';
    stage.append(canvas, loading);
    pe.viewer.append(stage);
    if (observer) observer.observe(stage);
    else {
      stage.dataset.wantRender = 'true';
      stage.dataset.rendered = 'loading';
      renderSplitViewerPage(paneId, page, stage, canvas, generation).catch(err => renderError(stage, err));
    }
  }

  const structuralAnchor = pane.pendingStructuralAnchor?.documentId === doc.id
    ? pane.pendingStructuralAnchor
    : null;
  if (pane.pendingStructuralAnchor && !structuralAnchor) pane.pendingStructuralAnchor = null;

  if (view.scrollMode !== 'single') {
    requestAnimationFrame(() => {
      if (structuralAnchor) {
        restoreSplitPaneStructuralAnchor(paneId, structuralAnchor);
      } else if (restoreTop !== null || restoreLeft !== null) {
        pe.viewer.scrollTop = restoreTop ?? 0;
        pe.viewer.scrollLeft = restoreLeft ?? 0;
      } else {
        scrollSplitActivePageIntoView(paneId, 'auto');
      }
      requestAnimationFrame(() => {
        if (structuralAnchor) {
          restoreSplitPaneStructuralAnchor(paneId, structuralAnchor);
          pane.pendingStructuralAnchor = null;
        } else if (restoreTop !== null || restoreLeft !== null) {
          pe.viewer.scrollTop = restoreTop ?? 0;
          pe.viewer.scrollLeft = restoreLeft ?? 0;
        }
        pane.suppressScrollSave = false;
        if (state.splitView) {
          syncSplitActivePageFromViewport(paneId);
          savePaneScroll(paneId);
        }
      });
    });
  } else {
    requestAnimationFrame(() => {
      if (structuralAnchor) {
        restoreSplitPaneStructuralAnchor(paneId, structuralAnchor);
        pane.pendingStructuralAnchor = null;
      }
      pane.suppressScrollSave = false;
    });
  }
}

async function renderSplitViewerPage(paneId, page, stage, canvas, generation) {
  const pane = splitPaneState(paneId), view = paneView(paneId);
  const size = computePaneCssSize(page, paneId, view);
  if (generation !== pane.generation || !stage.isConnected || stage.dataset.wantRender === 'false') return;
  stage.style.width = `${size.width}px`;
  stage.style.height = `${size.height}px`;
  const dpr = clamp(window.devicePixelRatio || 1, 1, 2.1);
  const didRender = await enqueueRender(async () => {
    if (generation !== pane.generation || !stage.isConnected || stage.dataset.wantRender === 'false') return false;
    await renderPageToCanvas(page, canvas, size.width, size.height, dpr, 4_500_000);
    return true;
  }, 10);
  if (!didRender || generation !== pane.generation || !stage.isConnected) return;
  if (stage.dataset.wantRender === 'false') { releaseViewerStage(stage); return; }
  if (page.kind !== 'generated' && canvasLooksBlank(canvas)) {
    ensurePageLoading(stage, 'Retrying scan…');
    await enqueueRender(async () => {
      if (generation !== pane.generation || !stage.isConnected || stage.dataset.wantRender === 'false') return false;
      await renderPageToCanvas(page, canvas, size.width, size.height, 1, 1_800_000);
      return true;
    }, 11);
  }
  if (generation !== pane.generation || !stage.isConnected) return;
  if (stage.dataset.wantRender === 'false') { releaseViewerStage(stage); return; }
  stage.dataset.rendered = 'true';
  stage.querySelector('.page-loading')?.remove();
}

function goPanePage(paneId, delta) {
  const pane = splitPaneState(paneId), doc = documentById(pane.documentId), view = paneView(paneId);
  if (!doc?.pages?.length || !view) return;
  const current = splitActiveIndex(doc, view);
  const next = clamp(current + delta, 0, doc.pages.length - 1);
  if (next === current && doc.pages[next]?.id === view.activePageId) return;
  view.activePageId = doc.pages[next].id;
  if (view.scrollMode === 'single') renderSplitPane(paneId);
  else { markSplitActivePage(paneId); scrollSplitActivePageIntoView(paneId); }
  if (state.activePaneId === paneId) updateViewerLabels();
}

function renderViewer() {
  if (state.splitView) return renderSplitView();
  for (const pane of Object.values(state.splitPanes)) { pane.generation++; pane.observer?.disconnect(); }
  els.splitViewer.classList.add('hidden');
  els.viewer.classList.remove('hidden');
  return renderSingleViewer();
}

async function renderViewerPage(page, stage, canvas, generation) {
  const size = computeCssSize(page);
  if (generation !== state.renderGeneration || !stage.isConnected || stage.dataset.wantRender === 'false') return;
  stage.style.width = `${size.width}px`;
  stage.style.height = `${size.height}px`;
  const dpr = clamp(window.devicePixelRatio || 1, 1, 2.25);

  const didRender = await enqueueRender(async () => {
    // Stale/offscreen jobs may sit in the queue for a while. Check again at
    // execution time so they do not consume memory after the user has moved on.
    if (generation !== state.renderGeneration || !stage.isConnected || stage.dataset.wantRender === 'false') return false;
    await renderPageToCanvas(page, canvas, size.width, size.height, dpr, 6_000_000);
    return true;
  }, 10);

  if (!didRender || generation !== state.renderGeneration || !stage.isConnected) return;
  if (stage.dataset.wantRender === 'false') {
    releaseViewerStage(stage);
    return;
  }

  // Some very large embedded scan images can fail silently under browser/GPU
  // memory pressure: PDF.js resolves, but the canvas remains solid white. A
  // lower-resolution second render is much less demanding and is preferable to
  // leaving an apparently missing page.
  if (page.kind !== 'generated' && canvasLooksBlank(canvas)) {
    ensurePageLoading(stage, 'Retrying scan…');
    await enqueueRender(async () => {
      if (generation !== state.renderGeneration || !stage.isConnected || stage.dataset.wantRender === 'false') return false;
      await renderPageToCanvas(page, canvas, size.width, size.height, 1, 2_000_000);
      return true;
    }, 11);
  }

  if (generation !== state.renderGeneration || !stage.isConnected) return;
  if (stage.dataset.wantRender === 'false') {
    releaseViewerStage(stage);
    return;
  }
  stage.dataset.rendered = 'true';
  stage.querySelector('.page-loading')?.remove();
}

async function renderPageToCanvas(page, canvas, cssWidth, cssHeight, dpr=1, maxPixels=10_000_000) {
  const source = page.kind === 'generated' ? null : state.sources.get(page.sourceId);
  if (page.kind !== 'generated' && !source) throw new Error('Source file is no longer available.');
  let targetW = Math.max(1, Math.round(cssWidth * dpr));
  let targetH = Math.max(1, Math.round(cssHeight * dpr));
  const pixelCount = targetW * targetH;
  if (pixelCount > maxPixels) {
    const f = Math.sqrt(maxPixels / pixelCount);
    targetW = Math.max(1, Math.round(targetW * f));
    targetH = Math.max(1, Math.round(targetH * f));
  }
  canvas.width = targetW;
  canvas.height = targetH;
  canvas.style.width = `${cssWidth}px`;
  canvas.style.height = `${cssHeight}px`;
  const ctx = canvas.getContext('2d', { alpha: false });
  ctx.save();
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, targetW, targetH);
  ctx.restore();

  if (page.kind === 'generated') {
    if (page.generatedType === 'graph') { const [displayW, displayH] = rotatedDims(page); drawGraphPaperCanvas(ctx, targetW, targetH, displayW, displayH); }
  } else if (source.type === 'pdf') {
    const pdfPage = await getPdfPage(source, page.sourcePage);
    const totalRotation = ((page.baseRotation || 0) + page.rotation) % 360;
    const natural = pdfPage.getViewport({ scale: 1, rotation: totalRotation });
    const scale = targetW / natural.width;
    const viewport = pdfPage.getViewport({ scale, rotation: totalRotation });
    try { await pdfPage.render({ canvasContext: ctx, viewport }).promise; }
    finally { try { pdfPage.cleanup?.(); } catch {} }
  } else {
    const img = await getSourceImage(source);
    ctx.save();
    const rotation = page.rotation % 360;
    if (rotation === 90) { ctx.translate(targetW, 0); ctx.rotate(Math.PI / 2); ctx.drawImage(img, 0, 0, targetH, targetW); }
    else if (rotation === 180) { ctx.translate(targetW, targetH); ctx.rotate(Math.PI); ctx.drawImage(img, 0, 0, targetW, targetH); }
    else if (rotation === 270) { ctx.translate(0, targetH); ctx.rotate(-Math.PI / 2); ctx.drawImage(img, 0, 0, targetH, targetW); }
    else ctx.drawImage(img, 0, 0, targetW, targetH);
    ctx.restore();
  }
}

function renderError(stage, err) {
  console.error(err);
  const loading = ensurePageLoading(stage, 'Could not render this page — scroll away and back to retry');
  loading.title = err?.message || String(err);
  stage.dataset.rendered = 'error';
}
function markActivePage() {
  els.viewer.querySelectorAll('.page-stage').forEach(el => el.classList.toggle('active-page', el.dataset.pageId === state.activePageId));
}
function scrollActivePageIntoView(behavior='smooth') {
  const el = els.viewer.querySelector(`.page-stage[data-page-id="${CSS.escape(state.activePageId || '')}"]`);
  el?.scrollIntoView({ block: 'center', inline: 'center', behavior });
}
function goPage(delta) {
  if (!state.pages.length) return;
  const next = clamp(activeIndex() + delta, 0, state.pages.length - 1);
  if (next === activeIndex() && state.pages[next]?.id === state.activePageId) return;
  state.activePageId = state.pages[next].id;
  if (state.scrollMode === 'single') renderViewer();
  else { markActivePage(); scrollActivePageIntoView(); updatePageCounts(); }
}

function finePointerHoverAvailable() {
  return !!window.matchMedia?.('(hover: hover) and (pointer: fine)').matches;
}

function hidePresentationControls() {
  document.body.classList.remove('presentation-controls-visible');
  clearTimeout(state.presentationControlsTimer);
}

function schedulePresentationControlsHide() {
  clearTimeout(state.presentationControlsTimer);
  state.presentationControlsTimer = setTimeout(() => {
    // Always allow the presentation chrome to clear itself. A pointer moving
    // near the top will reveal it again; lingering hover/focus must not pin it.
    document.body.classList.remove('presentation-controls-visible');
    if (document.activeElement instanceof HTMLElement && els.presentationToolbar.contains(document.activeElement)) {
      document.activeElement.blur();
    }
  }, 2600);
}

function showPresentationControls() {
  if (!document.body.classList.contains('presentation')) return;
  document.body.classList.add('presentation-controls-visible');
  schedulePresentationControlsHide();
}

function restartPresentationHideAfterControl(e) {
  if (!document.body.classList.contains('presentation')) return;
  // Buttons keep focus after click on desktop and sticky hover can linger on
  // touch. Neither should prevent the normal auto-hide cycle. Selects are
  // allowed to finish their native picker first; their change handler restarts
  // the timer separately.
  if (e?.target instanceof HTMLButtonElement) e.target.blur();
  showPresentationControls();
}

function isIPadLike() {
  const ua = navigator.userAgent || '';
  return /iPad|iPhone|iPod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

function nextAnimationFrame() {
  return new Promise(resolve => requestAnimationFrame(resolve));
}

async function waitForViewerGeometryStable(viewer, stableFrames=3, maxFrames=18) {
  if (!viewer) return;
  let lastWidth = -1, lastHeight = -1, stable = 0;
  for (let i = 0; i < maxFrames; i++) {
    await nextAnimationFrame();
    const width = viewer.clientWidth, height = viewer.clientHeight;
    if (width === lastWidth && height === lastHeight && width > 0 && height > 0) stable++;
    else stable = 0;
    lastWidth = width;
    lastHeight = height;
    if (stable >= stableFrames) return;
  }
}

async function restoreSinglePresentationEntry(snapshot) {
  if (!snapshot || snapshot.split || state.splitView) return;
  const doc = currentDocument();
  const view = ensureSingleView(doc);
  if (!view) return;
  if (snapshot.pageId) {
    state.activePageId = snapshot.pageId;
    if (doc) doc.activePageId = snapshot.pageId;
    view.activePageId = snapshot.pageId;
  }
  if (snapshot.scrollMode === 'single' || !snapshot.anchor) {
    markActivePage();
    updateViewerLabels();
    return;
  }
  state.suppressSingleScrollSave = true;
  // Surface/Chromium can resolve requestFullscreen before its final viewport
  // geometry has stopped changing.  Re-anchor only after the Presentation
  // viewer is stable, then repeat once more so a late fullscreen layout pass
  // cannot move the page after restoration.
  await waitForViewerGeometryStable(els.viewer);
  let point = viewerMidpoint(els.viewer);
  restoreViewerAnchor(els.viewer, snapshot.anchor, point.x, point.y);
  await nextAnimationFrame();
  point = viewerMidpoint(els.viewer);
  restoreViewerAnchor(els.viewer, snapshot.anchor, point.x, point.y);
  await waitForViewerGeometryStable(els.viewer, 2, 10);
  point = viewerMidpoint(els.viewer);
  restoreViewerAnchor(els.viewer, snapshot.anchor, point.x, point.y);
  state.suppressSingleScrollSave = false;
  syncSingleActivePageFromViewport();
  updateSingleViewScrollFromDom();
}

function capturePresentationTransition() {
  if (state.workspaceMode !== 'view' || !state.pages.length) return null;
  if (state.splitView) {
    const panes = {};
    for (const paneId of ['left', 'right']) {
      const pane = splitPaneState(paneId);
      const view = paneView(paneId);
      const pe = paneElements(paneId);
      if (!pane?.documentId || !view || !pe?.viewer) continue;
      syncSplitActivePageFromViewport(paneId, { updateUi: false });
      if (view.scrollMode === 'single') {
        panes[paneId] = { documentId: pane.documentId, scrollMode: 'single', pageId: view.activePageId, anchor: null };
      } else {
        const point = viewerMidpoint(pe.viewer);
        const anchor = captureViewerAnchor(pe.viewer, point.x, point.y);
        panes[paneId] = { documentId: pane.documentId, scrollMode: view.scrollMode, pageId: anchor?.pageId || view.activePageId, anchor };
        if (anchor?.pageId) view.activePageId = anchor.pageId;
        // Presentation changes the available viewport size, so the old raw
        // pixel offsets are not portable between the two layouts.
        view.scrollTop = null;
        view.scrollLeft = null;
      }
    }
    return { split: true, panes };
  }

  syncSingleActivePageFromViewport({ updateUi: false });
  const doc = currentDocument();
  const view = ensureSingleView(doc);
  if (!view) return null;
  if (view.scrollMode === 'single') return { split: false, scrollMode: 'single', pageId: state.activePageId, anchor: null };
  const point = viewerMidpoint(els.viewer);
  const anchor = captureViewerAnchor(els.viewer, point.x, point.y);
  if (anchor?.pageId) {
    state.activePageId = anchor.pageId;
    if (doc) doc.activePageId = anchor.pageId;
    view.activePageId = anchor.pageId;
  }
  view.scrollTop = null;
  view.scrollLeft = null;
  return { split: false, scrollMode: view.scrollMode, pageId: anchor?.pageId || state.activePageId, anchor };
}

function restorePresentationTransition(snapshot) {
  if (!snapshot) return;
  // renderViewer itself uses two animation frames for Safari-safe restoration.
  // Wait through those frames, then make the logical page/content anchor the
  // final authority in the newly sized Presentation/regular View viewport.
  requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(() => {
    if (snapshot.split && state.splitView) {
      for (const paneId of ['left', 'right']) {
        const saved = snapshot.panes?.[paneId];
        const pane = splitPaneState(paneId);
        const view = paneView(paneId);
        const pe = paneElements(paneId);
        if (!saved || !view || !pe?.viewer || pane.documentId !== saved.documentId) continue;
        if (saved.pageId) view.activePageId = saved.pageId;
        if (saved.scrollMode !== 'single' && saved.anchor) {
          pane.suppressScrollSave = true;
          const point = viewerMidpoint(pe.viewer);
          restoreViewerAnchor(pe.viewer, saved.anchor, point.x, point.y);
          requestAnimationFrame(() => {
            restoreViewerAnchor(pe.viewer, saved.anchor, point.x, point.y);
            pane.suppressScrollSave = false;
            syncSplitActivePageFromViewport(paneId, { updateUi: state.activePaneId === paneId });
            savePaneScroll(paneId);
          });
        }
      }
      return;
    }
    if (snapshot.split || state.splitView) return;
    const doc = currentDocument();
    const view = ensureSingleView(doc);
    if (snapshot.pageId) {
      state.activePageId = snapshot.pageId;
      if (doc) doc.activePageId = snapshot.pageId;
      if (view) view.activePageId = snapshot.pageId;
    }
    if (snapshot.scrollMode !== 'single' && snapshot.anchor) {
      state.suppressSingleScrollSave = true;
      const point = viewerMidpoint(els.viewer);
      restoreViewerAnchor(els.viewer, snapshot.anchor, point.x, point.y);
      requestAnimationFrame(() => {
        restoreViewerAnchor(els.viewer, snapshot.anchor, point.x, point.y);
        state.suppressSingleScrollSave = false;
        syncSingleActivePageFromViewport();
        updateSingleViewScrollFromDom();
      });
    } else {
      markActivePage();
      updateViewerLabels();
    }
  })));
}

async function enterPresentation() {
  const transition = capturePresentationTransition();
  const guardedSingleTransition = !!transition && !transition.split && !state.splitView;
  if (guardedSingleTransition) {
    state.singlePresentationTransitionActive = true;
    clearTimeout(resizeTimer);
  }
  document.body.classList.add('presentation', 'presentation-controls-visible');
  els.presentationToolbar.classList.remove('hidden');
  renderDocumentSelect();
  clearTimeout(state.presentationControlsTimer);
  schedulePresentationControlsHide();

  // iPad/iPhone native fullscreen reserves vertical swipe gestures for the OS.
  // That conflicts directly with scrolling a PDF, so presentation mode on iOS
  // is intentionally app-level only. Installed Home Screen PWAs still get the
  // clean standalone window without invoking the Fullscreen API.
  if (!isIPadLike()) {
    try {
      if (document.documentElement.requestFullscreen && !document.fullscreenElement) {
        await document.documentElement.requestFullscreen({ navigationUI: 'hide' });
      }
    } catch {}
  }

  if (guardedSingleTransition) {
    // Wait for native fullscreen/app-level Presentation geometry to settle
    // before building the single viewer. Split mode already has independent
    // pane anchoring that is working correctly and is intentionally untouched.
    await waitForViewerGeometryStable(els.viewer);
    renderViewer();
    await restoreSinglePresentationEntry(transition);
    state.singlePresentationTransitionActive = false;
  } else {
    renderViewer();
    restorePresentationTransition(transition);
  }
}
async function exitPresentation() {
  const transition = capturePresentationTransition();
  document.body.classList.remove('presentation', 'presentation-controls-visible');
  els.presentationToolbar.classList.add('hidden');
  clearTimeout(state.presentationControlsTimer);
  state.presentationRevealPointerId = null;
  state.touchPointers.clear();
  cancelViewerTouchInertia(state);
  state.touchPan = null;
  state.touchStart = null;
  state.pinchGesture = null;
  state.pinchNeedsRender = false;
  try { if (document.fullscreenElement) await document.exitFullscreen(); } catch {}
  renderViewer();
  restorePresentationTransition(transition);
}

function clearAll() {
  closeInsertPageMenu(false);
  const templateSourceIds = new Set(state.templates.map(template => template.page?.sourceId).filter(Boolean));
  for (const [sourceId, source] of state.sources) {
    if (templateSourceIds.has(sourceId)) continue;
    if (source.url) URL.revokeObjectURL(source.url);
    try { source.pdf?.destroy?.(); } catch {}
    state.sources.delete(sourceId);
  }
  state.documents = [];
  state.currentDocumentId = null;
  state.pages = [];
  state.selected.clear();
  state.activePageId = null;
  state.history = [];
  state.future = [];
  state.selectionAnchorId = null;
  state.fileSelected.clear();
  state.fileSelectionInitialized = false;
  state.combineOrder = [];
  state.suppressSingleScrollSave = false;
  cancelSingleActivePageSync();
  state.touchPointers.clear();
  cancelViewerTouchInertia(state);
  state.touchPan = null;
  state.touchStart = null;
  state.pinchGesture = null;
  state.pinchNeedsRender = false;
  els.viewer?.classList.remove('pinching', 'manual-touching');
  state.pageObserver?.disconnect();
  state.thumbObserver?.disconnect();
  for (const pane of Object.values(state.splitPanes)) {
    pane.observer?.disconnect();
    pane.documentId = null;
    pane.views.clear();
    pane.generation++;
    pane.suppressScrollSave = false;
    pane.touchPointers.clear();
    cancelViewerTouchInertia(pane);
    pane.touchPan = null;
    pane.touchStart = null;
    pane.pinchGesture = null;
    pane.pinchNeedsRender = false;
    paneElements(pane.id).viewer?.classList.remove('pinching', 'manual-touching');
  }
  state.splitView = false;
  state.activePaneId = 'left';
  state.singleSourcePaneId = 'left';
  renderAll();
  setStatus('Closed all files');
}

function showDialog(kind) {
  els.infoDialog.classList.remove('template-dialog');
  const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  if (kind === 'install') {
    els.dialogContent.innerHTML = `<h2>Installation and offline use</h2>
      <p>This build is a Progressive Web App. When served over HTTPS, Windows/ChromeOS browsers can install it from the browser's install control. On iPad, use Safari's <strong>Share → Add to Home Screen</strong>.</p>
      <p>After the application and PDF engine have been cached once, the app shell is designed to reopen without a network connection. Your opened documents are processed locally and are not uploaded by this app.</p>
      <p><strong>Current display mode:</strong> ${standalone ? 'installed / standalone' : 'browser tab'}</p>`;
  } else {
    els.dialogContent.innerHTML = `<h2>Milestone ${APP_VERSION}</h2>
      <p>Milestone 3.5.3 is a responsive-toolbar polish release based on cross-device testing. The viewer, Presentation anchoring, split state, templates, and PDF manipulation logic are unchanged from the working 3.5.2 build.</p>
      <ul><li><strong>Earlier brand collapse:</strong> the decorative “PDF Workbench” title now disappears at a wider narrow-layout breakpoint so iPad portrait behaves more like Chromebook portrait and narrow Surface windows.</li><li><strong>Filename yields first:</strong> the active-document selector compresses and truncates more aggressively before the primary View / Pages / Files workspace buttons are allowed to crowd one another.</li><li><strong>Very narrow widths:</strong> the filename selector gets progressively smaller while the workspace tabs remain protected.</li><li><strong>More menu:</strong> the ⋯ button remains at the far right of the toolbar.</li><li><strong>Preserved 3.5.2 behavior:</strong> View ↔ Presentation anchoring, independent split panes, visual Insert/template chooser, template manager, touch/pen separation, structural PDF output, graph-paper generation, and JBIG2/WASM rendering are unchanged.</li></ul>
      <p><strong>Coming later:</strong> persistent Files/Library storage (including persistent templates), copy pages between documents, page-size normalization, fit/crop/margins, image assembly, compression, and ink/annotations.</p>
      <div class="update-panel"><strong>PWA update</strong><p>Use this if an installed Home Screen/Desktop copy is still showing an older version after the hosted files have changed.</p><button id="forceUpdateBtn" type="button">Reload latest version</button><p id="updateStatus" class="update-status"></p></div>`;
  }
  els.infoDialog.showModal();
  if (kind === 'about') $('forceUpdateBtn')?.addEventListener('click', forceReloadLatest);
}

async function forceReloadLatest() {
  const status = $('updateStatus');
  const button = $('forceUpdateBtn');
  if (!navigator.onLine) { if (status) status.textContent = 'You are offline. Connect to the internet, then try again.'; return; }
  if (button) button.disabled = true;
  if (status) status.textContent = 'Checking the hosted app and clearing the old app-shell cache…';
  try {
    const registration = 'serviceWorker' in navigator ? await navigator.serviceWorker.getRegistration() : null;
    if (registration) await registration.update().catch(() => {});
    if (registration?.waiting) registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    if ('caches' in window) {
      const keys = await caches.keys();
      await Promise.all(keys.filter(k => k.startsWith('pdf-workbench-')).map(k => caches.delete(k)));
    }
    if (status) status.textContent = 'Reloading from the network…';
    const url = new URL(location.href);
    url.searchParams.set('pwaUpdate', Date.now().toString());
    setTimeout(() => location.replace(url.href), 120);
  } catch (err) {
    console.error(err);
    if (status) status.textContent = `Update could not be forced: ${err?.message || err}`;
    if (button) button.disabled = false;
  }
}


function positionAnchoredPopover(menu, anchor) {
  if (!menu || !anchor || menu.classList.contains('hidden')) return;
  const r = anchor.getBoundingClientRect();
  const box = menu.getBoundingClientRect();
  const pad = 8;
  let left = r.left;
  left = clamp(left, pad, Math.max(pad, window.innerWidth - box.width - pad));
  let top = r.bottom + 5;
  if (top + box.height > window.innerHeight - pad) top = Math.max(pad, r.top - box.height - 5);
  menu.style.left = `${Math.round(left)}px`;
  menu.style.top = `${Math.round(top)}px`;
}

function setInsertButtonExpanded(expanded) {
  for (const button of [els.viewInsertBtn, els.insertPageBtn, els.presentationInsertBtn]) {
    button?.setAttribute('aria-expanded', String(expanded));
  }
}

function closeInsertPageMenu(resumePresentation=true) {
  if (!els.insertPageMenu) return;
  const wasOpen = !els.insertPageMenu.classList.contains('hidden');
  els.insertPageMenu.classList.add('hidden');
  setInsertButtonExpanded(false);
  state.insertMenuAnchor = null;
  state.insertTarget = null;
  state.insertPreviewGeneration++;
  if (wasOpen && resumePresentation && document.body.classList.contains('presentation')) showPresentationControls();
}

function openInsertPageMenu(anchor) {
  if (!state.pages.length || !anchor) return;
  toggleMoreMenu(false);
  if (state.workspaceMode === 'view' && state.splitView) {
    synchronizeActiveSplitDocumentForEdit();
    syncSplitActivePageFromViewport(state.activePaneId);
  } else if (state.workspaceMode === 'view') syncSingleActivePageFromViewport();
  state.insertTarget = {
    documentId: state.currentDocumentId,
    pageId: insertionTargetPageId(),
    paneId: state.splitView ? state.activePaneId : null,
  };
  renderInsertTemplateList();
  if (els.savePageTemplateBtn) {
    const page = templatePageForSave(state.insertTarget);
    const pageIndex = page ? state.pages.findIndex(item => item.id === page.id) + 1 : 0;
    els.savePageTemplateBtn.textContent = pageIndex > 0 ? `Save page ${pageIndex} as template…` : 'Save current page as template…';
  }
  const alreadyOpen = !els.insertPageMenu.classList.contains('hidden') && state.insertMenuAnchor === anchor;
  if (alreadyOpen) { closeInsertPageMenu(); return; }
  state.insertMenuAnchor = anchor;
  els.insertPageMenu.classList.remove('hidden');
  setInsertButtonExpanded(false);
  anchor.setAttribute('aria-expanded', 'true');
  if (document.body.classList.contains('presentation')) clearTimeout(state.presentationControlsTimer);
  requestAnimationFrame(() => {
    positionAnchoredPopover(els.insertPageMenu, anchor);
    renderInsertChoicePreviews().catch(console.error);
  });
}

function runInsertCommand(kind, includeAnnotations=true) {
  const inPresentation = document.body.classList.contains('presentation');
  const targetContext = state.insertTarget ? { ...state.insertTarget } : null;
  closeInsertPageMenu(false);
  insertPageAfterCurrent(kind, includeAnnotations, null, targetContext);
  if (inPresentation) showPresentationControls();
}

function positionMoreMenu() {
  if (els.moreMenu.classList.contains('hidden')) return;
  const r = els.moreBtn.getBoundingClientRect();
  const menu = els.moreMenu.getBoundingClientRect();
  const pad = 8;
  let left = r.right - menu.width;
  left = clamp(left, pad, Math.max(pad, window.innerWidth - menu.width - pad));
  let top = r.bottom + 4;
  if (top + menu.height > window.innerHeight - pad) top = Math.max(pad, r.top - menu.height - 4);
  els.moreMenu.style.left = `${Math.round(left)}px`;
  els.moreMenu.style.top = `${Math.round(top)}px`;
}

function toggleMoreMenu(force) {
  const open = force ?? els.moreMenu.classList.contains('hidden');
  els.moreMenu.classList.toggle('hidden', !open);
  els.moreBtn.setAttribute('aria-expanded', String(open));
  if (open) requestAnimationFrame(positionMoreMenu);
}

let resizeTimer;
function onResize() {
  clearTimeout(resizeTimer);
  if (!els.moreMenu.classList.contains('hidden')) positionMoreMenu();
  if (!els.insertPageMenu?.classList.contains('hidden') && state.insertMenuAnchor) positionAnchoredPopover(els.insertPageMenu, state.insertMenuAnchor);
  // Entering native fullscreen on Surface/Chromium emits resize events while
  // the single-view Presentation transition is still restoring its logical
  // anchor. A timer-triggered rebuild here could overwrite that restoration.
  // Split mode is not guarded because its independent pane transitions already
  // preserve both panes correctly in both directions.
  if (state.singlePresentationTransitionActive) return;
  resizeTimer = setTimeout(() => { if (state.pages.length && state.workspaceMode === 'view') renderViewer(); }, 120);
}



// Document-surface stylus input is reserved for the annotation tools.  Until
// ink is implemented, a pen contact on the PDF should therefore be inert
// rather than behave like a finger and drag/scroll the viewer.  Visible UI
// controls live outside the viewer and continue to accept pen clicks; the
// Pages organizer keeps its existing pen drag behavior.
function reservePenForDocumentInk(viewer, e) {
  if (e.pointerType !== 'pen') return false;
  if (e.cancelable) e.preventDefault();
  if (e.type === 'pointerdown') {
    try { viewer.setPointerCapture?.(e.pointerId); } catch {}
  } else if (e.type === 'pointerup' || e.type === 'pointercancel') {
    try { viewer.releasePointerCapture?.(e.pointerId); } catch {}
  }
  return true;
}


function cancelViewerTouchInertia(owner) {
  if (owner.touchInertiaFrame) cancelAnimationFrame(owner.touchInertiaFrame);
  owner.touchInertiaFrame = null;
}

function startViewerTouchPan(owner, point) {
  owner.touchPan = {
    id: point.id,
    lastX: point.x,
    lastY: point.y,
    lastT: performance.now(),
    vx: 0,
    vy: 0,
  };
}

function moveViewerTouchPan(viewer, owner, point) {
  const pan = owner.touchPan;
  if (!pan || pan.id !== point.id) {
    startViewerTouchPan(owner, point);
    return;
  }
  const now = performance.now();
  const dt = Math.max(1, now - pan.lastT);
  const dx = point.x - pan.lastX;
  const dy = point.y - pan.lastY;
  viewer.scrollLeft -= dx;
  viewer.scrollTop -= dy;
  const instVX = dx / dt, instVY = dy / dt;
  pan.vx = pan.vx * .58 + instVX * .42;
  pan.vy = pan.vy * .58 + instVY * .42;
  pan.lastX = point.x;
  pan.lastY = point.y;
  pan.lastT = now;
}

function settleViewerSnap(viewer) {
  const stages = [...viewer.querySelectorAll('.page-stage[data-page-id]')];
  if (!stages.length) return;
  const vr = viewer.getBoundingClientRect();
  const centerY = vr.top + vr.height / 2;
  let best = stages[0], bestDistance = Infinity;
  for (const stage of stages) {
    const r = stage.getBoundingClientRect();
    const distance = Math.abs((r.top + r.height / 2) - centerY);
    if (distance < bestDistance) { best = stage; bestDistance = distance; }
  }
  best.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'smooth' });
}

function startViewerTouchInertia(viewer, owner, scrollMode, vx, vy) {
  cancelViewerTouchInertia(owner);
  if (scrollMode !== 'continuous' || Math.hypot(vx, vy) < .035) return;
  let last = performance.now();
  const step = (now) => {
    const dt = Math.min(32, Math.max(1, now - last));
    last = now;
    const beforeX = viewer.scrollLeft, beforeY = viewer.scrollTop;
    viewer.scrollLeft -= vx * dt;
    viewer.scrollTop -= vy * dt;
    const decay = Math.pow(.91, dt / 16.67);
    vx *= decay; vy *= decay;
    const moved = Math.abs(viewer.scrollLeft - beforeX) + Math.abs(viewer.scrollTop - beforeY) > .05;
    if (Math.hypot(vx, vy) < .018 || !moved) {
      owner.touchInertiaFrame = null;
      return;
    }
    owner.touchInertiaFrame = requestAnimationFrame(step);
  };
  owner.touchInertiaFrame = requestAnimationFrame(step);
}

function pointerPair(owner) {
  return [...owner.touchPointers.values()].slice(0, 2);
}
function pointerDistance(points) {
  return points.length < 2 ? 0 : Math.hypot(points[1].x - points[0].x, points[1].y - points[0].y);
}
function pointerMidpoint(points) {
  return points.length < 2 ? null : { x: (points[0].x + points[1].x) / 2, y: (points[0].y + points[1].y) / 2 };
}

// The PDF surface uses touch-action:none so browsers never get permission to
// turn a Pencil/stylus stroke into native scrolling. Finger navigation is then
// implemented explicitly here: one finger pans, two fingers pinch/zoom, while
// a pen pointer is reserved for the future ink layer. This is intentionally
// scoped to viewer surfaces; organizer dragging and visible UI controls keep
// their normal pen behavior.
function bindManualViewerTouch(viewer, owner, config) {
  if (!owner.touchPointers) owner.touchPointers = new Map();

  const beginPinch = () => {
    const points = pointerPair(owner);
    if (points.length < 2) return;
    const midpoint = pointerMidpoint(points);
    owner.pinchGesture = {
      startDistance: Math.max(1, pointerDistance(points)),
      startZoom: config.getZoom(),
      midpoint,
      anchor: captureViewerAnchor(viewer, midpoint.x, midpoint.y),
    };
    owner.pinchNeedsRender = true;
    owner.touchPan = null;
    owner.touchStart = null;
    viewer.classList.add('pinching', 'manual-touching');
  };

  const flushLivePinch = () => {
    if (!owner.pinchGesture) return;
    config.flushLiveZoom?.();
    config.saveScroll?.();
  };

  const finishAllTouches = (lastEvent, cancelled) => {
    viewer.classList.remove('manual-touching', 'pinching');
    const mode = config.getScrollMode();

    if (owner.pinchNeedsRender) {
      flushLivePinch();
      owner.pinchGesture = null;
      owner.pinchNeedsRender = false;
      owner.touchPan = null;
      owner.touchStart = null;
      config.finalizePinch?.();
      return;
    }

    if (mode === 'single' && owner.touchStart && !cancelled) {
      const dx = lastEvent.clientX - owner.touchStart.x;
      const dy = lastEvent.clientY - owner.touchStart.y;
      const dt = performance.now() - owner.touchStart.t;
      if (dt < 800 && Math.abs(dy) > 55 && Math.abs(dy) > Math.abs(dx) * .7) {
        config.goPage?.(dy < 0 ? 1 : -1);
      }
    } else if (!cancelled && owner.touchPan) {
      if (mode === 'snap') settleViewerSnap(viewer);
      else startViewerTouchInertia(viewer, owner, mode, owner.touchPan.vx, owner.touchPan.vy);
    }
    owner.touchStart = null;
    owner.touchPan = null;
    config.saveScroll?.();
  };

  viewer.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'pen' && (e.buttons || e.pressure > 0)) {
      reservePenForDocumentInk(viewer, e);
      return;
    }
    if (document.body.classList.contains('presentation') && e.pointerType === 'mouse' && e.clientY < 90) {
      showPresentationControls();
    }
    if (e.pointerType !== 'touch' || !owner.touchPointers.has(e.pointerId)) return;
    e.preventDefault();
    const point = owner.touchPointers.get(e.pointerId);
    point.x = e.clientX; point.y = e.clientY;

    if (owner.touchPointers.size >= 2) {
      if (!owner.pinchGesture) beginPinch();
      const points = pointerPair(owner);
      const dist = Math.max(1, pointerDistance(points));
      const midpoint = pointerMidpoint(points);
      if (owner.pinchGesture && midpoint) {
        owner.pinchGesture.midpoint = midpoint;
        config.queueZoom(owner.pinchGesture.startZoom * dist / owner.pinchGesture.startDistance);
      }
      return;
    }

    if (!owner.pinchGesture && config.getScrollMode() !== 'single') {
      moveViewerTouchPan(viewer, owner, point);
    }
  }, { passive: false });

  viewer.addEventListener('pointerdown', (e) => {
    config.activate?.();
    if (reservePenForDocumentInk(viewer, e)) return;
    if (e.pointerType !== 'touch') return;
    cancelViewerTouchInertia(owner);
    e.preventDefault();
    try { viewer.setPointerCapture?.(e.pointerId); } catch {}

    if (document.body.classList.contains('presentation') &&
        !document.body.classList.contains('presentation-controls-visible') &&
        owner.touchPointers.size === 0 && e.clientY < 80) {
      state.presentationRevealPointerId = e.pointerId;
      owner.touchStart = null;
      owner.touchPan = null;
      return;
    }

    const point = { id: e.pointerId, x: e.clientX, y: e.clientY };
    owner.touchPointers.set(e.pointerId, point);
    viewer.classList.add('manual-touching');

    if (owner.touchPointers.size === 1) {
      owner.touchStart = { id: e.pointerId, x: e.clientX, y: e.clientY, t: performance.now() };
      if (config.getScrollMode() !== 'single') startViewerTouchPan(owner, point);
    } else if (owner.touchPointers.size === 2) {
      beginPinch();
    }
  }, { passive: false });

  const finishPointer = (e, cancelled=false) => {
    if (e.pointerType === 'pen') {
      reservePenForDocumentInk(viewer, e);
      return;
    }
    if (e.pointerType !== 'touch') return;
    e.preventDefault();

    if (state.presentationRevealPointerId === e.pointerId) {
      state.presentationRevealPointerId = null;
      state.presentationSuppressClicksUntil = performance.now() + 700;
      if (!cancelled) showPresentationControls();
      try { viewer.releasePointerCapture?.(e.pointerId); } catch {}
      return;
    }

    const lastPoint = owner.touchPointers.get(e.pointerId) || { id: e.pointerId, x: e.clientX, y: e.clientY };
    lastPoint.x = e.clientX; lastPoint.y = e.clientY;
    const hadActivePinch = !!owner.pinchGesture;
    owner.touchPointers.delete(e.pointerId);

    if (hadActivePinch && owner.touchPointers.size < 2) {
      // Commit the last live pinch geometry while its anchor is still valid.
      // If one finger remains, let it pan the already-scaled pages; defer the
      // expensive crisp rerender until the whole gesture has ended.
      flushLivePinch();
      owner.pinchGesture = null;
      if (owner.touchPointers.size === 1 && config.getScrollMode() !== 'single') {
        startViewerTouchPan(owner, [...owner.touchPointers.values()][0]);
      }
    } else if (owner.touchPointers.size >= 2) {
      beginPinch();
    }

    try { viewer.releasePointerCapture?.(e.pointerId); } catch {}
    if (owner.touchPointers.size === 0) finishAllTouches(e, cancelled);
  };

  viewer.addEventListener('pointerup', (e) => finishPointer(e, false), { passive: false });
  viewer.addEventListener('pointercancel', (e) => finishPointer(e, true), { passive: false });
}

function bindSplitViewerEvents(paneId) {
  const pane = splitPaneState(paneId), pe = paneElements(paneId), viewer = pe.viewer;
  if (!viewer) return;

  const makeActive = () => { if (state.splitView && state.activePaneId !== paneId) activateSplitPane(paneId, true); };
  pe.pane.addEventListener('pointerdown', makeActive, { capture: true });
  viewer.addEventListener('focus', makeActive);
  viewer.addEventListener('scroll', () => {
    // Hiding/rebuilding a scroll container can transiently report scrollTop=0,
    // especially on iPad. Never let those programmatic events overwrite the
    // pane's stored position.
    if (!state.splitView || pane.suppressScrollSave) return;
    const view = paneView(paneId);
    if (!view) return;
    view.scrollTop = viewer.scrollTop;
    view.scrollLeft = viewer.scrollLeft;
    scheduleSplitActivePageSync(paneId);
  }, { passive: true });

  viewer.addEventListener('wheel', (e) => {
    makeActive();
    const view = paneView(paneId);
    if (!view) return;
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      setZoomForPane(paneId, view.zoom * (e.deltaY < 0 ? 1.12 : 1 / 1.12));
      if (document.body.classList.contains('presentation')) showPresentationControls();
      return;
    }
    if (view.scrollMode !== 'single') return;
    e.preventDefault();
    const now = performance.now();
    if (now - pane.lastWheelPageChange < 320 || Math.abs(e.deltaY) < 8) return;
    pane.lastWheelPageChange = now;
    goPanePage(paneId, e.deltaY > 0 ? 1 : -1);
  }, { passive: false });

  bindManualViewerTouch(viewer, pane, {
    activate: makeActive,
    getScrollMode: () => paneView(paneId)?.scrollMode || 'continuous',
    getZoom: () => paneView(paneId)?.zoom || 1,
    queueZoom: (value) => queuePinchZoom(value, paneId),
    flushLiveZoom: () => {
      if (pane.pinchRenderFrame) {
        cancelAnimationFrame(pane.pinchRenderFrame);
        pane.pinchRenderFrame = null;
      }
      applyLivePaneZoom(paneId);
    },
    saveScroll: () => savePaneScroll(paneId),
    finalizePinch: () => {
      savePaneScroll(paneId);
      renderSplitPane(paneId);
    },
    goPage: (delta) => goPanePage(paneId, delta),
  });
}

function setZoomForPane(paneId, value) {
  const pane = splitPaneState(paneId), view = paneView(paneId), pe = paneElements(paneId);
  if (!view) return;
  savePaneScroll(paneId);
  const point = viewerMidpoint(pe.viewer);
  const anchor = captureViewerAnchor(pe.viewer, point.x, point.y);
  view.zoom = clamp(value, 0.25, 4);
  renderSplitPane(paneId);
  pane.suppressScrollSave = true;
  restoreViewerAnchorAfterLayout(pe.viewer, anchor, point.x, point.y, () => {
    pane.suppressScrollSave = false;
    if (state.splitView) savePaneScroll(paneId);
  });
  if (state.activePaneId === paneId) updateViewerLabels();
}

function bindEvents() {
  els.openBtn.addEventListener('click', () => { closeInsertPageMenu(); els.fileInput.click(); });
  els.newBlankDocumentBtn.addEventListener('click', () => createNewGeneratedDocument('blank'));
  els.newGraphDocumentBtn.addEventListener('click', () => createNewGeneratedDocument('graph'));
  els.emptyOpenBtn.addEventListener('click', () => els.fileInput.click());
  els.fileInput.addEventListener('change', () => openFiles(els.fileInput.files));
  els.documentSelect.addEventListener('change', () => loadDocumentState(els.documentSelect.value));
  els.splitLeftDocumentSelect.addEventListener('change', () => setPaneDocument('left', els.splitLeftDocumentSelect.value));
  els.splitRightDocumentSelect.addEventListener('change', () => setPaneDocument('right', els.splitRightDocumentSelect.value));
  els.presentationDocumentSelect.addEventListener('change', () => {
    if (state.splitView) setPaneDocument(state.activePaneId, els.presentationDocumentSelect.value);
    else loadDocumentState(els.presentationDocumentSelect.value);
    showPresentationControls();
  });
  els.viewModeBtn.addEventListener('click', () => showWorkspaceMode('view'));
  els.organizeModeBtn.addEventListener('click', () => showWorkspaceMode('organize'));
  els.exportModeBtn.addEventListener('click', () => showWorkspaceMode('export'));
  els.selectAllFilesBtn.addEventListener('click', () => { state.fileSelectionInitialized = true; state.fileSelected = new Set(state.documents.map(doc => doc.id)); reconcileCombineOrder(); renderExportPane(); });
  els.clearFileSelectionBtn.addEventListener('click', () => { state.fileSelectionInitialized = true; state.fileSelected.clear(); reconcileCombineOrder(); renderExportPane(); });
  els.exportPdfBtn.addEventListener('click', exportSelectedDocuments);
  els.extractPdfBtn.addEventListener('click', extractSelectedPdf);
  els.splitFixedBtn.addEventListener('click', splitEveryNPages);
  els.splitRangesBtn.addEventListener('click', splitByPageGroups);
  els.combineBtn.addEventListener('click', createCombinedDocument);
  els.thumbnailGrid.addEventListener('click', (e) => {
    if (e.target !== els.thumbnailGrid || !state.selected.size) return;
    state.selected.clear();
    state.selectionAnchorId = null;
    refreshSelectionCards();
  });
  els.scrollModeBtn.addEventListener('click', cycleScrollMode);
  els.fitModeBtn.addEventListener('click', cycleFitMode);
  els.zoomOutBtn.addEventListener('click', () => zoomBy(0.8));
  els.zoomResetBtn.addEventListener('click', resetZoom);
  els.zoomInBtn.addEventListener('click', () => zoomBy(1.25));
  els.splitViewBtn.addEventListener('click', toggleSplitView);
  els.viewInsertBtn.addEventListener('click', (e) => { e.stopPropagation(); openInsertPageMenu(els.viewInsertBtn); });
  els.presentationLayoutBtn.addEventListener('click', toggleSplitView);
  els.presentationInsertBtn.addEventListener('click', (e) => { e.stopPropagation(); openInsertPageMenu(els.presentationInsertBtn); });
  els.presentationLeftPaneBtn.addEventListener('click', () => { if (state.splitView) { activateSplitPane('left', true); showPresentationControls(); } });
  els.presentationRightPaneBtn.addEventListener('click', () => { if (state.splitView) { activateSplitPane('right', true); showPresentationControls(); } });
  els.presentationScrollModeBtn.addEventListener('click', cycleScrollMode);
  els.presentationFitBtn.addEventListener('click', cycleFitMode);
  els.presentationZoomOutBtn.addEventListener('click', () => zoomBy(0.8));
  els.presentationZoomInBtn.addEventListener('click', () => zoomBy(1.25));
  els.presentBtn.addEventListener('click', enterPresentation);
  els.presentationExit.addEventListener('click', exitPresentation);
  els.presentationToolbar.addEventListener('click', (e) => { if (e.target instanceof HTMLButtonElement && e.target !== els.presentationInsertBtn) restartPresentationHideAfterControl(e); });
  els.presentationToolbar.addEventListener('pointerdown', () => { if (document.body.classList.contains('presentation')) clearTimeout(state.presentationControlsTimer); });
  els.prevPageBtn.addEventListener('click', () => goPage(-1));
  els.nextPageBtn.addEventListener('click', () => goPage(1));
  els.splitLeftPrevBtn.addEventListener('click', () => { activateSplitPane('left', true); goPanePage('left', -1); });
  els.splitLeftNextBtn.addEventListener('click', () => { activateSplitPane('left', true); goPanePage('left', 1); });
  els.splitRightPrevBtn.addEventListener('click', () => { activateSplitPane('right', true); goPanePage('right', -1); });
  els.splitRightNextBtn.addEventListener('click', () => { activateSplitPane('right', true); goPanePage('right', 1); });
  els.selectAllBtn.addEventListener('click', selectAllToggle);
  els.rotateBtn.addEventListener('click', rotateSelected);
  els.insertPageBtn.addEventListener('click', (e) => { e.stopPropagation(); openInsertPageMenu(els.insertPageBtn); });
  els.duplicateBtn.addEventListener('click', duplicateSelected);
  els.extractSelectedPagesBtn?.addEventListener('click', extractSelectedPdf);
  els.insertDuplicateWithAnnotationsBtn.addEventListener('click', () => runInsertCommand('duplicate', true));
  els.insertDuplicateWithoutAnnotationsBtn.addEventListener('click', () => runInsertCommand('duplicate', false));
  els.insertBlankPageBtn.addEventListener('click', () => runInsertCommand('blank'));
  els.insertGraphPageBtn.addEventListener('click', () => runInsertCommand('graph'));
  els.insertTemplateList?.addEventListener('click', (e) => {
    const button = e.target.closest('[data-template-id]');
    if (button) insertTemplateAfterCurrent(button.dataset.templateId);
  });
  els.templateNameCloseBtn?.addEventListener('click', () => els.templateNameDialog?.close('cancel'));
  els.templateNameCancelBtn?.addEventListener('click', () => els.templateNameDialog?.close('cancel'));
  els.savePageTemplateBtn?.addEventListener('click', async () => {
    const inPresentation = document.body.classList.contains('presentation');
    const targetContext = state.insertTarget ? { ...state.insertTarget } : null;
    closeInsertPageMenu(false);
    await saveCurrentPageAsTemplate(targetContext);
    if (inPresentation && document.body.classList.contains('presentation')) showPresentationControls();
  });
  els.manageTemplatesBtn?.addEventListener('click', showTemplateManager);
  els.deleteBtn.addEventListener('click', deleteSelected);
  els.undoBtn.addEventListener('click', undo);
  els.redoBtn.addEventListener('click', redo);
  els.moreBtn.addEventListener('click', (e) => { e.stopPropagation(); closeInsertPageMenu(); toggleMoreMenu(); });
  els.clearBtn.addEventListener('click', () => { toggleMoreMenu(false); clearAll(); });
  els.installHelpBtn.addEventListener('click', () => { toggleMoreMenu(false); showDialog('install'); });
  els.aboutBtn.addEventListener('click', () => { toggleMoreMenu(false); showDialog('about'); });
  document.addEventListener('click', (e) => {
    if (document.body.classList.contains('presentation') && performance.now() < state.presentationSuppressClicksUntil && els.presentationToolbar.contains(e.target)) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  }, true);
  document.addEventListener('click', (e) => {
    if (!els.moreMenu.contains(e.target) && e.target !== els.moreBtn) toggleMoreMenu(false);
    const insertAnchors = [els.viewInsertBtn, els.insertPageBtn, els.presentationInsertBtn];
    if (els.insertPageMenu && !els.insertPageMenu.contains(e.target) && !insertAnchors.includes(e.target)) closeInsertPageMenu();
  });
  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement && document.body.classList.contains('presentation') && !isIPadLike()) exitPresentation();
  });
  window.addEventListener('resize', onResize);
  bindSplitViewerEvents('left');
  bindSplitViewerEvents('right');

  els.viewer.addEventListener('scroll', scheduleSingleActivePageSync, { passive: true });

  els.viewer.addEventListener('wheel', (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      zoomBy(e.deltaY < 0 ? 1.12 : 1 / 1.12);
      if (document.body.classList.contains('presentation')) showPresentationControls();
      return;
    }
    if (state.scrollMode !== 'single') return;
    e.preventDefault();
    const now = performance.now();
    if (now - state.lastWheelPageChange < 320 || Math.abs(e.deltaY) < 8) return;
    state.lastWheelPageChange = now;
    goPage(e.deltaY > 0 ? 1 : -1);
  }, { passive: false });
  bindManualViewerTouch(els.viewer, state, {
    getScrollMode: () => state.scrollMode,
    getZoom: () => state.zoom,
    queueZoom: (value) => queuePinchZoom(value),
    flushLiveZoom: () => {
      if (state.pinchRenderFrame) {
        cancelAnimationFrame(state.pinchRenderFrame);
        state.pinchRenderFrame = null;
      }
      applyLiveSingleZoom();
    },
    saveScroll: () => updateSingleViewScrollFromDom(),
    finalizePinch: () => {
      updateSingleViewScrollFromDom();
      renderViewer();
    },
    goPage: (delta) => goPage(delta),
  });

  document.addEventListener('keydown', (e) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) return;
    if (e.key === 'Escape' && document.body.classList.contains('presentation')) { e.preventDefault(); exitPresentation(); return; }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') { e.preventDefault(); e.shiftKey ? redo() : undo(); return; }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') { e.preventDefault(); redo(); return; }
    if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '=')) { e.preventDefault(); zoomBy(1.25); return; }
    if ((e.ctrlKey || e.metaKey) && e.key === '-') { e.preventDefault(); zoomBy(0.8); return; }
    if ((e.ctrlKey || e.metaKey) && e.key === '0') { e.preventDefault(); resetZoom(); return; }
    if (state.workspaceMode === 'view' && state.splitView) {
      const view = paneView();
      if (view?.scrollMode === 'single' && ['ArrowDown','PageDown','ArrowRight'].includes(e.key)) { e.preventDefault(); goPanePage(state.activePaneId, 1); return; }
      if (view?.scrollMode === 'single' && ['ArrowUp','PageUp','ArrowLeft'].includes(e.key)) { e.preventDefault(); goPanePage(state.activePaneId, -1); return; }
    }
    if (state.workspaceMode === 'view' && !state.splitView && ['ArrowDown','PageDown','ArrowRight'].includes(e.key) && state.scrollMode === 'single') { e.preventDefault(); goPage(1); }
    if (state.workspaceMode === 'view' && !state.splitView && ['ArrowUp','PageUp','ArrowLeft'].includes(e.key) && state.scrollMode === 'single') { e.preventDefault(); goPage(-1); }
  });

  window.addEventListener('dragover', (e) => { if ([...e.dataTransfer.types].includes('Files')) e.preventDefault(); });
  window.addEventListener('drop', (e) => { if (e.dataTransfer?.files?.length) { e.preventDefault(); openFiles(e.dataTransfer.files); } });
}

async function init() {
  bindEvents();
  updateViewerLabels();
  renderAll();
  await registerServiceWorker();
  await loadPdfEngine();
}

init();
