const APP_VERSION = '1.8.1';

const PDFJS_URL = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@6.2.108/build/pdf.mjs';
const PDFJS_WORKER_URL = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@6.2.108/build/pdf.worker.mjs';
const PDFJS_WASM_URL = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@6.2.108/wasm/';
const PDFJS_CMAP_URL = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@6.2.108/cmaps/';
const PDFJS_STANDARD_FONT_URL = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@6.2.108/standard_fonts/';

const $ = (id) => document.getElementById(id);
const els = {
  app: $('app'), openBtn: $('openBtn'), emptyOpenBtn: $('emptyOpenBtn'), fileInput: $('fileInput'), documentSelect: $('documentSelect'),
  viewModeBtn: $('viewModeBtn'), organizeModeBtn: $('organizeModeBtn'), viewerControls: $('viewerControls'),
  scrollModeBtn: $('scrollModeBtn'), scrollModeIcon: $('scrollModeIcon'), scrollModeLabel: $('scrollModeLabel'),
  fitModeBtn: $('fitModeBtn'), fitModeLabel: $('fitModeLabel'), zoomOutBtn: $('zoomOutBtn'), zoomResetBtn: $('zoomResetBtn'), zoomInBtn: $('zoomInBtn'), zoomLabel: $('zoomLabel'), presentBtn: $('presentBtn'),
  moreBtn: $('moreBtn'), moreMenu: $('moreMenu'), clearBtn: $('clearBtn'), installHelpBtn: $('installHelpBtn'), aboutBtn: $('aboutBtn'),
  emptyState: $('emptyState'), viewerPane: $('viewerPane'), viewer: $('viewer'), organizerPane: $('organizerPane'),
  thumbnailGrid: $('thumbnailGrid'), pageCountLabel: $('pageCountLabel'), selectionLabel: $('selectionLabel'),
  selectAllBtn: $('selectAllBtn'), rotateBtn: $('rotateBtn'), duplicateBtn: $('duplicateBtn'), deleteBtn: $('deleteBtn'),
  undoBtn: $('undoBtn'), redoBtn: $('redoBtn'), statusText: $('statusText'), pdfEngineStatus: $('pdfEngineStatus'),
  singlePageNav: $('singlePageNav'), prevPageBtn: $('prevPageBtn'), nextPageBtn: $('nextPageBtn'), pageCounter: $('pageCounter'),
  presentationToolbar: $('presentationToolbar'), presentationDocumentSelect: $('presentationDocumentSelect'), presentationScrollModeBtn: $('presentationScrollModeBtn'), presentationFitBtn: $('presentationFitBtn'), presentationZoomOutBtn: $('presentationZoomOutBtn'), presentationZoomInBtn: $('presentationZoomInBtn'), presentationZoomLabel: $('presentationZoomLabel'), presentationExit: $('presentationExit'), infoDialog: $('infoDialog'), dialogContent: $('dialogContent')
};

const state = {
  pdfjs: null,
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
  renderGeneration: 0,
  pageObserver: null,
  thumbObserver: null,
  dragging: null,
  lastWheelPageChange: 0,
  statusTimer: null,
  presentationControlsTimer: null,
  presentationRevealPointerId: null,
  pinchTouches: new Map(),
  pinchGesture: null,
  pinchRenderFrame: null,
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

function saveCurrentDocumentState() {
  const doc = currentDocument();
  if (!doc) return;
  doc.pages = state.pages;
  doc.selected = state.selected;
  doc.selectionAnchorId = state.selectionAnchorId;
  doc.activePageId = state.activePageId;
  doc.history = state.history;
  doc.future = state.future;
  // Viewer scale is document-specific. This lets, for example, a scanned
  // reference stay at 70% while lecture notes remain at 125% when switching.
  doc.zoom = state.zoom;
  doc.fitMode = state.fitMode;
}

function createDocument(name) {
  saveCurrentDocumentState();
  const doc = {
    id: uid('doc'), name: name || 'Untitled', pages: [], selected: new Set(), selectionAnchorId: null,
    activePageId: null, history: [], future: [],
    // New documents start at normal zoom and the user's preferred fit mode.
    zoom: 1, fitMode: state.fitMode
  };
  state.documents.push(doc);
  state.currentDocumentId = doc.id;
  state.pages = doc.pages;
  state.selected = doc.selected;
  state.selectionAnchorId = doc.selectionAnchorId;
  state.activePageId = null;
  state.history = doc.history;
  state.future = doc.future;
  return doc;
}

function removeDocument(docId) {
  const index = state.documents.findIndex(d => d.id === docId);
  if (index < 0) return;
  const doc = state.documents[index];
  const sourceIds = new Set(doc.pages.map(p => p.sourceId));
  for (const sourceId of sourceIds) {
    const usedElsewhere = state.documents.some(d => d.id !== docId && d.pages.some(p => p.sourceId === sourceId));
    if (!usedElsewhere) {
      const source = state.sources.get(sourceId);
      if (source?.url) URL.revokeObjectURL(source.url);
      try { source?.pdf?.destroy?.(); } catch {}
      state.sources.delete(sourceId);
    }
  }
  state.documents.splice(index, 1);
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
  const doc = state.documents.find(d => d.id === docId);
  if (!doc) return;
  state.currentDocumentId = doc.id;
  state.pages = doc.pages;
  state.selected = doc.selected;
  state.selectionAnchorId = doc.selectionAnchorId || null;
  state.activePageId = doc.activePageId || doc.pages[0]?.id || null;
  state.history = doc.history;
  state.future = doc.future;
  state.zoom = clamp(doc.zoom ?? 1, 0.25, 4);
  state.fitMode = ['width', 'page'].includes(doc.fitMode) ? doc.fitMode : state.fitMode;
  if (rerender) {
    state.pageObserver?.disconnect();
    state.thumbObserver?.disconnect();
    renderAll();
    setStatus(`Switched to ${doc.name}`);
  }
}

function renderDocumentSelect() {
  if (!els.documentSelect) return;
  const selects = [els.documentSelect, els.presentationDocumentSelect].filter(Boolean);
  for (const select of selects) {
    const previous = select.value;
    select.replaceChildren();
    for (const doc of state.documents) {
      const option = document.createElement('option');
      option.value = doc.id;
      option.textContent = doc.name;
      select.append(option);
    }
    select.classList.toggle('hidden', state.documents.length === 0);
    if (state.currentDocumentId) select.value = state.currentDocumentId;
    else if (previous) select.value = previous;
    select.title = state.documents.length > 1 ? 'Switch open document' : 'Current document';
  }
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
    navigator.serviceWorker.controller?.postMessage({ type: 'CACHE_EXTERNAL', urls: [PDFJS_URL, PDFJS_WORKER_URL] });
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
      saveCurrentDocumentState();
      opened++;
      pagesAdded += added;
    } catch (err) {
      console.error(err);
      removeDocument(doc.id);
      setStatus(`Could not open ${file.name}: ${err.message || err}`);
    }
  }
  renderAll();
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

function showWorkspaceMode(mode) {
  state.workspaceMode = mode;
  const hasPages = state.pages.length > 0;
  els.emptyState.classList.toggle('hidden', hasPages);
  els.viewerPane.classList.toggle('hidden', !hasPages || mode !== 'view');
  els.organizerPane.classList.toggle('hidden', !hasPages || mode !== 'organize');
  els.viewerControls.classList.toggle('hidden', mode !== 'view' || !hasPages);
  els.viewModeBtn.classList.toggle('active', mode === 'view');
  els.organizeModeBtn.classList.toggle('active', mode === 'organize');
  els.viewModeBtn.setAttribute('aria-pressed', String(mode === 'view'));
  els.organizeModeBtn.setAttribute('aria-pressed', String(mode === 'organize'));
  if (hasPages && mode === 'view') renderViewer();
  if (hasPages && mode === 'organize') renderOrganizer();
}

function renderAll() {
  saveCurrentDocumentState();
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
    title.textContent = `${index + 1} · ${src?.name ?? 'Page'}${src?.type === 'pdf' ? ` · p.${page.sourcePage}` : ''}`;
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
    if (canvasLooksBlank(canvas) && preview.isConnected) {
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
  state.activePageId = pageId;
  showWorkspaceMode('view');
  requestAnimationFrame(() => scrollActivePageIntoView('auto'));
}

function cycleScrollMode() {
  const modes = ['continuous', 'snap', 'single'];
  state.scrollMode = modes[(modes.indexOf(state.scrollMode) + 1) % modes.length];
  savePref('pdfwb-scroll-mode', state.scrollMode);
  renderViewer();
}
function cycleFitMode() {
  state.fitMode = state.fitMode === 'width' ? 'page' : 'width';
  state.zoom = 1;
  savePref('pdfwb-fit-mode', state.fitMode);
  renderViewer();
}
function setZoom(value) {
  state.zoom = clamp(value, 0.25, 4);
  renderViewer();
}
function zoomBy(factor) { setZoom(state.zoom * factor); }
function resetZoom() { setZoom(1); }

function queuePinchZoom(value) {
  state.zoom = clamp(value, 0.25, 4);
  updateViewerLabels();
  if (state.pinchRenderFrame) return;
  state.pinchRenderFrame = requestAnimationFrame(() => {
    state.pinchRenderFrame = null;
    // During a live pinch, resize the existing page surfaces instead of
    // rebuilding/rerendering the PDF on every finger movement. The current
    // canvas is temporarily stretched; a full-quality rerender happens when
    // the gesture ends. This keeps Pencil/touch interaction responsive.
    els.viewer.querySelectorAll('.page-stage[data-page-id]').forEach(stage => {
      const page = pageById(stage.dataset.pageId);
      if (!page) return;
      const size = computeCssSize(page);
      stage.style.width = `${size.width}px`;
      stage.style.height = `${size.height}px`;
      const canvas = stage.querySelector('canvas');
      if (canvas) {
        canvas.style.width = `${size.width}px`;
        canvas.style.height = `${size.height}px`;
      }
    });
  });
}
function updateViewerLabels() {
  const modeLabel = { continuous: 'Continuous', snap: 'Page snap', single: 'Full page' }[state.scrollMode];
  const modeIcon = { continuous: '↕', snap: '⇵', single: '▯' }[state.scrollMode];
  els.scrollModeLabel.textContent = modeLabel;
  els.scrollModeIcon.textContent = modeIcon;
  els.fitModeLabel.textContent = state.fitMode === 'width' ? 'Fit width' : 'Fit page';
  const zoomText = `${Math.round(state.zoom * 100)}%`;
  els.zoomLabel.textContent = zoomText;
  if (els.presentationZoomLabel) els.presentationZoomLabel.textContent = zoomText;
  if (els.presentationScrollModeBtn) els.presentationScrollModeBtn.textContent = modeIcon;
  els.singlePageNav.classList.toggle('hidden', state.scrollMode !== 'single' || !state.pages.length);
  updatePageCounts();
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

function renderViewer() {
  state.renderGeneration++;
  const generation = state.renderGeneration;
  state.pageObserver?.disconnect();
  els.viewer.replaceChildren();
  els.viewer.className = `viewer ${state.scrollMode} fit-${state.fitMode}`;
  updateViewerLabels();
  if (!state.pages.length) return;
  if (!state.activePageId) state.activePageId = state.pages[0].id;

  const pagesToBuild = state.scrollMode === 'single' ? [state.pages[activeIndex()]] : state.pages;
  const observer = state.scrollMode === 'single' ? null : new IntersectionObserver((entries) => {
    let mostVisible = null;
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
        if (!mostVisible || entry.intersectionRatio > mostVisible.intersectionRatio) mostVisible = entry;
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
    if (mostVisible?.intersectionRatio > .28) {
      const id = mostVisible.target.dataset.pageId;
      if (id && id !== state.activePageId) {
        state.activePageId = id;
        markActivePage();
        updatePageCounts();
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
  if (state.scrollMode !== 'single') requestAnimationFrame(() => scrollActivePageIntoView('auto'));
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
  if (canvasLooksBlank(canvas)) {
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
  const source = state.sources.get(page.sourceId);
  if (!source) throw new Error('Source file is no longer available.');
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

  if (source.type === 'pdf') {
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
    // A real mouse hovering over the toolbar may keep it visible. On touch
    // devices :hover can become sticky after a tap, so it must never pin the
    // controls open there. Keyboard focus also must not pin the bar forever.
    if (finePointerHoverAvailable() && els.presentationToolbar.matches(':hover')) {
      schedulePresentationControlsHide();
      return;
    }
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
  if (e?.currentTarget instanceof HTMLButtonElement) e.currentTarget.blur();
  showPresentationControls();
}

function isIPadLike() {
  const ua = navigator.userAgent || '';
  return /iPad|iPhone|iPod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

async function enterPresentation() {
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
  renderViewer();
}
async function exitPresentation() {
  document.body.classList.remove('presentation', 'presentation-controls-visible');
  els.presentationToolbar.classList.add('hidden');
  clearTimeout(state.presentationControlsTimer);
  state.presentationRevealPointerId = null;
  state.pinchTouches.clear();
  state.pinchGesture = null;
  try { if (document.fullscreenElement) await document.exitFullscreen(); } catch {}
  renderViewer();
}

function clearAll() {
  for (const source of state.sources.values()) {
    if (source.url) URL.revokeObjectURL(source.url);
    try { source.pdf?.destroy?.(); } catch {}
  }
  state.sources.clear();
  state.documents = [];
  state.currentDocumentId = null;
  state.pages = [];
  state.selected.clear();
  state.activePageId = null;
  state.history = [];
  state.future = [];
  state.pageObserver?.disconnect();
  state.thumbObserver?.disconnect();
  renderAll();
  setStatus('Closed all files');
}

function showDialog(kind) {
  const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  if (kind === 'install') {
    els.dialogContent.innerHTML = `<h2>Installation and offline use</h2>
      <p>This build is a Progressive Web App. When served over HTTPS, Windows/ChromeOS browsers can install it from the browser's install control. On iPad, use Safari's <strong>Share → Add to Home Screen</strong>.</p>
      <p>After the application and PDF engine have been cached once, the app shell is designed to reopen without a network connection. Your opened documents are processed locally and are not uploaded by this app.</p>
      <p><strong>Current display mode:</strong> ${standalone ? 'installed / standalone' : 'browser tab'}</p>`;
  } else {
    els.dialogContent.innerHTML = `<h2>Milestone ${APP_VERSION}</h2>
      <p>This build establishes the cross-platform viewer and non-destructive page model.</p>
      <ul><li>Open multiple PDFs and images as separate documents and switch between them.</li><li>View continuously, with page snapping, or one full page at a time.</li><li>Fit width or page and use presentation mode.</li><li>Reorder pages with a touch-friendly drag handle.</li><li>Select, rotate, duplicate, and delete pages with undo/redo.</li></ul>
      <p><strong>Not in this milestone yet:</strong> PDF export, split/merge output, page-size normalization, compression, saved projects, and pen annotation.</p>`;
  }
  els.infoDialog.showModal();
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
  resizeTimer = setTimeout(() => { if (state.pages.length && state.workspaceMode === 'view') renderViewer(); }, 120);
}

function bindEvents() {
  els.openBtn.addEventListener('click', () => els.fileInput.click());
  els.emptyOpenBtn.addEventListener('click', () => els.fileInput.click());
  els.fileInput.addEventListener('change', () => openFiles(els.fileInput.files));
  els.documentSelect.addEventListener('change', () => loadDocumentState(els.documentSelect.value));
  els.presentationDocumentSelect.addEventListener('change', () => { loadDocumentState(els.presentationDocumentSelect.value); showPresentationControls(); });
  els.viewModeBtn.addEventListener('click', () => showWorkspaceMode('view'));
  els.organizeModeBtn.addEventListener('click', () => showWorkspaceMode('organize'));
  els.scrollModeBtn.addEventListener('click', cycleScrollMode);
  els.fitModeBtn.addEventListener('click', cycleFitMode);
  els.zoomOutBtn.addEventListener('click', () => zoomBy(0.8));
  els.zoomResetBtn.addEventListener('click', resetZoom);
  els.zoomInBtn.addEventListener('click', () => zoomBy(1.25));
  els.presentationScrollModeBtn.addEventListener('click', cycleScrollMode);
  els.presentationFitBtn.addEventListener('click', cycleFitMode);
  els.presentationZoomOutBtn.addEventListener('click', () => zoomBy(0.8));
  els.presentationZoomInBtn.addEventListener('click', () => zoomBy(1.25));
  els.presentBtn.addEventListener('click', enterPresentation);
  els.presentationExit.addEventListener('click', exitPresentation);
  els.presentationToolbar.addEventListener('click', (e) => { if (e.target instanceof HTMLButtonElement) restartPresentationHideAfterControl(e); });
  els.presentationToolbar.addEventListener('pointerdown', () => { if (document.body.classList.contains('presentation')) clearTimeout(state.presentationControlsTimer); });
  els.prevPageBtn.addEventListener('click', () => goPage(-1));
  els.nextPageBtn.addEventListener('click', () => goPage(1));
  els.selectAllBtn.addEventListener('click', selectAllToggle);
  els.rotateBtn.addEventListener('click', rotateSelected);
  els.duplicateBtn.addEventListener('click', duplicateSelected);
  els.deleteBtn.addEventListener('click', deleteSelected);
  els.undoBtn.addEventListener('click', undo);
  els.redoBtn.addEventListener('click', redo);
  els.moreBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleMoreMenu(); });
  els.clearBtn.addEventListener('click', () => { toggleMoreMenu(false); clearAll(); });
  els.installHelpBtn.addEventListener('click', () => { toggleMoreMenu(false); showDialog('install'); });
  els.aboutBtn.addEventListener('click', () => { toggleMoreMenu(false); showDialog('about'); });
  document.addEventListener('click', (e) => { if (!els.moreMenu.contains(e.target) && e.target !== els.moreBtn) toggleMoreMenu(false); });
  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement && document.body.classList.contains('presentation') && !isIPadLike()) exitPresentation();
  });
  window.addEventListener('resize', onResize);

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
  els.viewer.addEventListener('pointermove', (e) => {
    if (document.body.classList.contains('presentation') && e.pointerType !== 'touch' && e.clientY < 90) showPresentationControls();
  });

  let touchStart = null;
  els.viewer.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'touch') {
      // A hidden presentation toolbar must be revealed by a dedicated tap, not
      // materialize under the finger and receive the same gesture's click.
      if (document.body.classList.contains('presentation') && !document.body.classList.contains('presentation-controls-visible') && e.clientY < 80) {
        state.presentationRevealPointerId = e.pointerId;
        touchStart = null;
        e.preventDefault();
        return;
      }
    }

    if (state.scrollMode === 'single' && e.pointerType === 'touch') {
      touchStart = { id: e.pointerId, x: e.clientX, y: e.clientY, t: performance.now() };
    }
  });

  function finishTouchPointer(e, cancelled=false) {
    if (e.pointerType !== 'touch') return;
    const wasReveal = state.presentationRevealPointerId === e.pointerId;

    if (wasReveal) {
      state.presentationRevealPointerId = null;
      touchStart = null;
      if (!cancelled) showPresentationControls();
      e.preventDefault();
      return;
    }

    if (!touchStart || touchStart.id !== e.pointerId || state.scrollMode !== 'single' || cancelled || state.pinchGesture) {
      if (touchStart?.id === e.pointerId) touchStart = null;
      return;
    }
    const dx = e.clientX - touchStart.x, dy = e.clientY - touchStart.y, dt = performance.now() - touchStart.t;
    touchStart = null;
    if (dt < 800 && Math.abs(dy) > 55 && Math.abs(dy) > Math.abs(dx) * .7) goPage(dy < 0 ? 1 : -1);
  }

  els.viewer.addEventListener('pointerup', (e) => finishTouchPointer(e, false));
  els.viewer.addEventListener('pointercancel', (e) => finishTouchPointer(e, true));

  // iPad/Safari native pinch zoom scales the entire web app, including its
  // toolbar, and cannot zoom below the page's initial scale. Intercept only
  // two-finger gestures inside the document viewer and map them to PDF zoom.
  // One-finger scrolling remains native and fluid.
  const touchDistance = (touches) => Math.hypot(
    touches[1].clientX - touches[0].clientX,
    touches[1].clientY - touches[0].clientY
  );
  els.viewer.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 2) return;
    state.pinchGesture = {
      startDistance: Math.max(1, touchDistance(e.touches)),
      startZoom: state.zoom
    };
    touchStart = null;
    e.preventDefault();
  }, { passive: false });
  els.viewer.addEventListener('touchmove', (e) => {
    if (!state.pinchGesture || e.touches.length !== 2) return;
    const dist = Math.max(1, touchDistance(e.touches));
    queuePinchZoom(state.pinchGesture.startZoom * dist / state.pinchGesture.startDistance);
    e.preventDefault();
  }, { passive: false });
  const finishPinch = (e) => {
    if (!state.pinchGesture) return;
    if (e.touches && e.touches.length >= 2) return;
    state.pinchGesture = null;
    if (state.pinchRenderFrame) { cancelAnimationFrame(state.pinchRenderFrame); state.pinchRenderFrame = null; }
    renderViewer();
  };
  els.viewer.addEventListener('touchend', finishPinch, { passive: true });
  els.viewer.addEventListener('touchcancel', finishPinch, { passive: true });

  document.addEventListener('keydown', (e) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) return;
    if (e.key === 'Escape' && document.body.classList.contains('presentation')) { e.preventDefault(); exitPresentation(); return; }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') { e.preventDefault(); e.shiftKey ? redo() : undo(); return; }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') { e.preventDefault(); redo(); return; }
    if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '=')) { e.preventDefault(); zoomBy(1.25); return; }
    if ((e.ctrlKey || e.metaKey) && e.key === '-') { e.preventDefault(); zoomBy(0.8); return; }
    if ((e.ctrlKey || e.metaKey) && e.key === '0') { e.preventDefault(); resetZoom(); return; }
    if (state.workspaceMode === 'view' && ['ArrowDown','PageDown','ArrowRight'].includes(e.key) && state.scrollMode === 'single') { e.preventDefault(); goPage(1); }
    if (state.workspaceMode === 'view' && ['ArrowUp','PageUp','ArrowLeft'].includes(e.key) && state.scrollMode === 'single') { e.preventDefault(); goPage(-1); }
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
