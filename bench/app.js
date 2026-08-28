const PDFJS_URL = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@6.2.108/build/pdf.mjs';
const PDFJS_WORKER_URL = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@6.2.108/build/pdf.worker.mjs';

const $ = (id) => document.getElementById(id);
const els = {
  app: $('app'), openBtn: $('openBtn'), emptyOpenBtn: $('emptyOpenBtn'), fileInput: $('fileInput'), documentSelect: $('documentSelect'),
  viewModeBtn: $('viewModeBtn'), organizeModeBtn: $('organizeModeBtn'), viewerControls: $('viewerControls'),
  scrollModeBtn: $('scrollModeBtn'), scrollModeIcon: $('scrollModeIcon'), scrollModeLabel: $('scrollModeLabel'),
  fitModeBtn: $('fitModeBtn'), fitModeLabel: $('fitModeLabel'), presentBtn: $('presentBtn'),
  moreBtn: $('moreBtn'), moreMenu: $('moreMenu'), clearBtn: $('clearBtn'), installHelpBtn: $('installHelpBtn'), aboutBtn: $('aboutBtn'),
  emptyState: $('emptyState'), viewerPane: $('viewerPane'), viewer: $('viewer'), organizerPane: $('organizerPane'),
  thumbnailGrid: $('thumbnailGrid'), pageCountLabel: $('pageCountLabel'), selectionLabel: $('selectionLabel'),
  selectAllBtn: $('selectAllBtn'), rotateBtn: $('rotateBtn'), duplicateBtn: $('duplicateBtn'), deleteBtn: $('deleteBtn'),
  undoBtn: $('undoBtn'), redoBtn: $('redoBtn'), statusText: $('statusText'), pdfEngineStatus: $('pdfEngineStatus'),
  singlePageNav: $('singlePageNav'), prevPageBtn: $('prevPageBtn'), nextPageBtn: $('nextPageBtn'), pageCounter: $('pageCounter'),
  presentationExit: $('presentationExit'), infoDialog: $('infoDialog'), dialogContent: $('dialogContent')
};

const state = {
  pdfjs: null,
  pdfEngineError: null,
  documents: [],
  currentDocumentId: null,
  sources: new Map(),
  pages: [],
  selected: new Set(),
  activePageId: null,
  workspaceMode: 'view',
  scrollMode: safePref('pdfwb-scroll-mode', 'continuous', ['continuous', 'snap', 'single']),
  fitMode: safePref('pdfwb-fit-mode', 'width', ['width', 'page']),
  history: [],
  future: [],
  renderGeneration: 0,
  pageObserver: null,
  thumbObserver: null,
  dragging: null,
  lastWheelPageChange: 0,
  statusTimer: null,
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
  doc.activePageId = state.activePageId;
  doc.history = state.history;
  doc.future = state.future;
}

function createDocument(name) {
  saveCurrentDocumentState();
  const doc = {
    id: uid('doc'), name: name || 'Untitled', pages: [], selected: new Set(),
    activePageId: null, history: [], future: []
  };
  state.documents.push(doc);
  state.currentDocumentId = doc.id;
  state.pages = doc.pages;
  state.selected = doc.selected;
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
  state.activePageId = doc.activePageId || doc.pages[0]?.id || null;
  state.history = doc.history;
  state.future = doc.future;
  if (rerender) {
    state.pageObserver?.disconnect();
    state.thumbObserver?.disconnect();
    renderAll();
    setStatus(`Switched to ${doc.name}`);
  }
}

function renderDocumentSelect() {
  if (!els.documentSelect) return;
  const previous = els.documentSelect.value;
  els.documentSelect.replaceChildren();
  for (const doc of state.documents) {
    const option = document.createElement('option');
    option.value = doc.id;
    option.textContent = doc.name;
    els.documentSelect.append(option);
  }
  els.documentSelect.classList.toggle('hidden', state.documents.length === 0);
  if (state.currentDocumentId) els.documentSelect.value = state.currentDocumentId;
  else if (previous) els.documentSelect.value = previous;
  els.documentSelect.title = state.documents.length > 1 ? 'Switch open document' : 'Current document';
}

async function registerServiceWorker() {
  if (!('serviceWorker' in navigator) || location.protocol === 'file:') return;
  try {
    await navigator.serviceWorker.register('./sw.js');
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
  const pdf = await state.pdfjs.getDocument({ data: bytes.slice() }).promise;
  const source = { id: sourceId, type: 'pdf', name: file.name, size: file.size, bytes, pdf, pageCache: new Map() };
  state.sources.set(sourceId, source);

  const newPages = [];
  for (let n = 1; n <= pdf.numPages; n++) {
    setStatus(`Reading ${file.name}: page ${n} of ${pdf.numPages}…`, true);
    const pdfPage = await pdf.getPage(n);
    source.pageCache.set(n, pdfPage);
    const viewport = pdfPage.getViewport({ scale: 1, rotation: pdfPage.rotate || 0 });
    newPages.push({ id: uid('page'), sourceId, sourcePage: n, width: viewport.width, height: viewport.height, baseRotation: pdfPage.rotate || 0, rotation: 0, kind: 'pdf' });
  }
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
  if (source.pageCache.has(pageNumber)) return source.pageCache.get(pageNumber);
  const page = await source.pdf.getPage(pageNumber);
  source.pageCache.set(pageNumber, page);
  return page;
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
    check.addEventListener('change', () => toggleSelection(page.id, check.checked));

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

    footer.append(check, title, handle);
    card.append(preview, footer);
    card.addEventListener('dblclick', () => openPageInViewer(page.id));
    preview.addEventListener('click', () => toggleSelection(page.id, !state.selected.has(page.id)));
    els.thumbnailGrid.append(card);
    observer.observe(card);
  });
  updatePageCounts();
}

async function renderThumbnail(page, canvas) {
  const [bw, bh] = rotatedDims(page);
  const cssWidth = 160;
  const cssHeight = cssWidth * bh / bw;
  await renderPageToCanvas(page, canvas, cssWidth, cssHeight, 1.25);
}

function toggleSelection(pageId, shouldSelect) {
  if (shouldSelect) state.selected.add(pageId); else state.selected.delete(pageId);
  const card = els.thumbnailGrid.querySelector(`.thumb-card[data-page-id="${CSS.escape(pageId)}"]`);
  if (card) {
    card.classList.toggle('selected', shouldSelect);
    const check = card.querySelector('.thumb-check');
    if (check) check.checked = shouldSelect;
  }
  updatePageCounts();
}

function selectAllToggle() {
  if (state.selected.size === state.pages.length) state.selected.clear();
  else state.pages.forEach(p => state.selected.add(p.id));
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
  if (!card) return;
  event.preventDefault();

  const before = snapshotPages();
  const startRect = card.getBoundingClientRect();
  const offsetX = event.clientX - startRect.left;
  const offsetY = event.clientY - startRect.top;

  // Keep the grid position occupied while a lightweight ghost follows the pointer.
  // This makes long moves predictable and avoids repeatedly moving the live card
  // underneath the captured pointer.
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
  handle.setPointerCapture?.(event.pointerId);

  state.dragging = {
    card, handle, before, placeholder, ghost,
    pointerId: event.pointerId, offsetX, offsetY,
    startIndex: Number(card.dataset.index), moved: false,
    lastClientY: event.clientY,
  };

  const positionGhost = (e) => {
    ghost.style.transform = `translate3d(${e.clientX - offsetX - startRect.left}px, ${e.clientY - offsetY - startRect.top}px, 0)`;
  };

  const animateGridMove = (mutate) => {
    const items = [...els.thumbnailGrid.querySelectorAll('.thumb-card:not(.drag-source), .thumb-placeholder')];
    const first = new Map(items.map(el => [el, el.getBoundingClientRect()]));
    mutate();
    requestAnimationFrame(() => {
      for (const el of items) {
        if (!el.isConnected || el === placeholder) continue;
        const a = first.get(el);
        const b = el.getBoundingClientRect();
        if (!a || !b) continue;
        const dx = a.left - b.left;
        const dy = a.top - b.top;
        if (!dx && !dy) continue;
        el.animate([
          { transform: `translate(${dx}px, ${dy}px)` },
          { transform: 'translate(0, 0)' }
        ], { duration: 140, easing: 'ease-out' });
      }
    });
  };

  const movePlaceholder = (e) => {
    const candidates = [...els.thumbnailGrid.querySelectorAll('.thumb-card:not(.drag-source)')];
    if (!candidates.length) return;

    // Choose the closest thumbnail center to the pointer.  This works across
    // rows as well as columns and lets one drag jump any distance in the grid.
    let best = null;
    let bestDist = Infinity;
    for (const el of candidates) {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const d = dx * dx + dy * dy;
      if (d < bestDist) { bestDist = d; best = { el, r, cx, cy }; }
    }
    if (!best) return;

    // Before/after is determined primarily by row, then by horizontal position.
    const rowTolerance = best.r.height * 0.42;
    const sameRow = Math.abs(e.clientY - best.cy) <= rowTolerance;
    const putBefore = sameRow ? e.clientX < best.cx : e.clientY < best.cy;
    const reference = putBefore ? best.el : best.el.nextSibling;
    if (reference === placeholder || placeholder.nextSibling === reference) return;

    animateGridMove(() => els.thumbnailGrid.insertBefore(placeholder, reference));
    state.dragging.moved = true;
  };

  const autoScroll = (e) => {
    const r = els.thumbnailGrid.getBoundingClientRect();
    const margin = Math.min(90, r.height * 0.18);
    let delta = 0;
    if (e.clientY < r.top + margin) delta = -Math.ceil((r.top + margin - e.clientY) / 5);
    else if (e.clientY > r.bottom - margin) delta = Math.ceil((e.clientY - (r.bottom - margin)) / 5);
    if (delta) els.thumbnailGrid.scrollTop += Math.max(-24, Math.min(24, delta));
  };

  const move = (e) => {
    if (!state.dragging || e.pointerId !== state.dragging.pointerId) return;
    positionGhost(e);
    autoScroll(e);
    movePlaceholder(e);
  };

  const cleanup = (e, commit) => {
    const drag = state.dragging;
    if (!drag) return;
    try { handle.releasePointerCapture?.(drag.pointerId); } catch {}
    handle.removeEventListener('pointermove', move);
    handle.removeEventListener('pointerup', end);
    handle.removeEventListener('pointercancel', cancel);

    if (commit) {
      // Put the real card at the placeholder position before reading the order.
      els.thumbnailGrid.insertBefore(card, placeholder);
    }
    placeholder.remove();
    ghost.remove();
    card.classList.remove('drag-source');
    state.dragging = null;

    if (!commit || !drag.moved) {
      renderOrganizer();
      return;
    }

    const order = [...els.thumbnailGrid.querySelectorAll('.thumb-card')].map(el => el.dataset.pageId);
    const map = new Map(state.pages.map(p => [p.id, p]));
    state.pages = order.map(id => map.get(id)).filter(Boolean);
    commitHistory(drag.before);
    renderOrganizer();
    setStatus('Pages reordered');
  };

  const end = (e) => cleanup(e, true);
  const cancel = (e) => cleanup(e, false);

  handle.addEventListener('pointermove', move);
  handle.addEventListener('pointerup', end);
  handle.addEventListener('pointercancel', cancel);
  positionGhost(event);
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
  savePref('pdfwb-fit-mode', state.fitMode);
  renderViewer();
}
function updateViewerLabels() {
  const modeLabel = { continuous: 'Continuous', snap: 'Page snap', single: 'Full page' }[state.scrollMode];
  const modeIcon = { continuous: '↕', snap: '⇵', single: '▯' }[state.scrollMode];
  els.scrollModeLabel.textContent = modeLabel;
  els.scrollModeIcon.textContent = modeIcon;
  els.fitModeLabel.textContent = state.fitMode === 'width' ? 'Fit width' : 'Fit page';
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
  scale = clamp(scale, 0.05, 5);
  return { width: Math.max(1, bw * scale), height: Math.max(1, bh * scale) };
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
      if (entry.isIntersecting && entry.intersectionRatio > .01) {
        const page = pageById(entry.target.dataset.pageId);
        const canvas = entry.target.querySelector('canvas');
        if (page && canvas && !entry.target.dataset.rendered) {
          entry.target.dataset.rendered = 'loading';
          renderViewerPage(page, entry.target, canvas, generation).catch(err => renderError(entry.target, err));
        }
        if (!mostVisible || entry.intersectionRatio > mostVisible.intersectionRatio) mostVisible = entry;
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
  }, { root: els.viewer, rootMargin: '90% 0px 90% 0px', threshold: [0.01, .28, .55, .8] });
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
      stage.dataset.rendered = 'loading';
      renderViewerPage(page, stage, canvas, generation).catch(err => renderError(stage, err));
    }
  }
  if (state.scrollMode !== 'single') requestAnimationFrame(() => scrollActivePageIntoView('auto'));
}

async function renderViewerPage(page, stage, canvas, generation) {
  const size = computeCssSize(page);
  if (generation !== state.renderGeneration || !stage.isConnected) return;
  stage.style.width = `${size.width}px`;
  stage.style.height = `${size.height}px`;
  const dpr = clamp(window.devicePixelRatio || 1, 1, 2.5);
  await renderPageToCanvas(page, canvas, size.width, size.height, dpr);
  if (generation !== state.renderGeneration || !stage.isConnected) return;
  stage.dataset.rendered = 'true';
  stage.querySelector('.page-loading')?.remove();
}

async function renderPageToCanvas(page, canvas, cssWidth, cssHeight, dpr=1) {
  const source = state.sources.get(page.sourceId);
  if (!source) throw new Error('Source file is no longer available.');
  const targetW = Math.max(1, Math.round(cssWidth * dpr));
  const targetH = Math.max(1, Math.round(cssHeight * dpr));
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
    await pdfPage.render({ canvasContext: ctx, viewport }).promise;
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
  const loading = stage.querySelector('.page-loading');
  if (loading) loading.textContent = 'Could not render this page';
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

async function enterPresentation() {
  document.body.classList.add('presentation');
  els.presentationExit.classList.remove('hidden');
  try {
    if (document.documentElement.requestFullscreen && !document.fullscreenElement) await document.documentElement.requestFullscreen({ navigationUI: 'hide' });
  } catch {}
  renderViewer();
}
async function exitPresentation() {
  document.body.classList.remove('presentation');
  els.presentationExit.classList.add('hidden');
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
    els.dialogContent.innerHTML = `<h2>Milestone 1</h2>
      <p>This build establishes the cross-platform viewer and non-destructive page model.</p>
      <ul><li>Open multiple PDFs and images as separate documents and switch between them.</li><li>View continuously, with page snapping, or one full page at a time.</li><li>Fit width or page and use presentation mode.</li><li>Reorder pages with a touch-friendly drag handle.</li><li>Select, rotate, duplicate, and delete pages with undo/redo.</li></ul>
      <p><strong>Not in this milestone yet:</strong> PDF export, split/merge output, page-size normalization, compression, saved projects, and pen annotation.</p>`;
  }
  els.infoDialog.showModal();
}

function toggleMoreMenu(force) {
  const open = force ?? els.moreMenu.classList.contains('hidden');
  els.moreMenu.classList.toggle('hidden', !open);
  els.moreBtn.setAttribute('aria-expanded', String(open));
}

let resizeTimer;
function onResize() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => { if (state.pages.length && state.workspaceMode === 'view') renderViewer(); }, 120);
}

function bindEvents() {
  els.openBtn.addEventListener('click', () => els.fileInput.click());
  els.emptyOpenBtn.addEventListener('click', () => els.fileInput.click());
  els.fileInput.addEventListener('change', () => openFiles(els.fileInput.files));
  els.documentSelect.addEventListener('change', () => loadDocumentState(els.documentSelect.value));
  els.viewModeBtn.addEventListener('click', () => showWorkspaceMode('view'));
  els.organizeModeBtn.addEventListener('click', () => showWorkspaceMode('organize'));
  els.scrollModeBtn.addEventListener('click', cycleScrollMode);
  els.fitModeBtn.addEventListener('click', cycleFitMode);
  els.presentBtn.addEventListener('click', enterPresentation);
  els.presentationExit.addEventListener('click', exitPresentation);
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
  document.addEventListener('fullscreenchange', () => { if (!document.fullscreenElement && document.body.classList.contains('presentation')) exitPresentation(); });
  window.addEventListener('resize', onResize);

  els.viewer.addEventListener('wheel', (e) => {
    if (state.scrollMode !== 'single') return;
    e.preventDefault();
    const now = performance.now();
    if (now - state.lastWheelPageChange < 320 || Math.abs(e.deltaY) < 8) return;
    state.lastWheelPageChange = now;
    goPage(e.deltaY > 0 ? 1 : -1);
  }, { passive: false });

  let touchStart = null;
  els.viewer.addEventListener('pointerdown', (e) => {
    if (state.scrollMode === 'single' && e.pointerType === 'touch') touchStart = { id: e.pointerId, x: e.clientX, y: e.clientY, t: performance.now() };
  });
  els.viewer.addEventListener('pointerup', (e) => {
    if (!touchStart || touchStart.id !== e.pointerId || state.scrollMode !== 'single') return;
    const dx = e.clientX - touchStart.x, dy = e.clientY - touchStart.y, dt = performance.now() - touchStart.t;
    touchStart = null;
    if (dt < 800 && Math.abs(dy) > 55 && Math.abs(dy) > Math.abs(dx) * .7) goPage(dy < 0 ? 1 : -1);
  });

  document.addEventListener('keydown', (e) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) return;
    if (e.key === 'Escape' && document.body.classList.contains('presentation')) { e.preventDefault(); exitPresentation(); return; }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') { e.preventDefault(); e.shiftKey ? redo() : undo(); return; }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') { e.preventDefault(); redo(); return; }
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
