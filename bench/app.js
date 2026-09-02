const APP_VERSION = '5.4.3';

const PDFJS_URL = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@6.2.108/build/pdf.mjs';
const PDFJS_WORKER_URL = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@6.2.108/build/pdf.worker.mjs';
const PDFJS_WASM_URL = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@6.2.108/wasm/';
const PDFJS_CMAP_URL = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@6.2.108/cmaps/';
const PDFJS_STANDARD_FONT_URL = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@6.2.108/standard_fonts/';
const PDFLIB_URL = 'https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.esm.min.js';
const JSZIP_URL = 'https://cdn.jsdelivr.net/npm/jszip@3.10.1/+esm';

const LIBRARY_DB_NAME = 'pdf-workbench-library';
const LIBRARY_DB_VERSION = 2;
const LIBRARY_SCHEMA_VERSION = 5;
const LIBRARY_BACKUP_FORMAT_VERSION = 1;
const SESSION_CHECKPOINT_KEY = 'pdfwb-session-checkpoint-v2';

const $ = (id) => document.getElementById(id);
const els = {
  app: $('app'), openBtn: $('openBtn'), newBlankDocumentBtn: $('newBlankDocumentBtn'), newGraphDocumentBtn: $('newGraphDocumentBtn'), newTemplateDocumentBtn: $('newTemplateDocumentBtn'), emptyOpenBtn: $('emptyOpenBtn'), fileInput: $('fileInput'), libraryZipImportInput: $('libraryZipImportInput'), imageAssemblyInput: $('imageAssemblyInput'), documentSelect: $('documentSelect'),
  viewModeBtn: $('viewModeBtn'), organizeModeBtn: $('organizeModeBtn'), exportModeBtn: $('exportModeBtn'), viewerControls: $('viewerControls'),
  scrollModeBtn: $('scrollModeBtn'), scrollModeIcon: $('scrollModeIcon'), scrollModeLabel: $('scrollModeLabel'),
  fitModeBtn: $('fitModeBtn'), fitModeIcon: $('fitModeIcon'), fitModeLabel: $('fitModeLabel'), zoomOutBtn: $('zoomOutBtn'), zoomResetBtn: $('zoomResetBtn'), zoomInBtn: $('zoomInBtn'), zoomLabel: $('zoomLabel'), splitViewBtn: $('splitViewBtn'), splitViewLabel: $('splitViewLabel'), viewInsertBtn: $('viewInsertBtn'), presentBtn: $('presentBtn'),
  moreBtn: $('moreBtn'), moreMenu: $('moreMenu'), clearBtn: $('clearBtn'), installHelpBtn: $('installHelpBtn'), inkDiagnosticsBtn: $('inkDiagnosticsBtn'), aboutBtn: $('aboutBtn'),
  emptyState: $('emptyState'), viewerPane: $('viewerPane'), viewer: $('viewer'), splitViewer: $('splitViewer'), organizerPane: $('organizerPane'), exportPane: $('exportPane'), libraryDocumentList: $('libraryDocumentList'), librarySummary: $('librarySummary'), libraryBreadcrumb: $('libraryBreadcrumb'), libraryNewFolderBtn: $('libraryNewFolderBtn'), libraryListViewBtn: $('libraryListViewBtn'), libraryGridViewBtn: $('libraryGridViewBtn'), trashDocumentList: $('trashDocumentList'), trashSummary: $('trashSummary'), libraryStorageSummary: $('libraryStorageSummary'), libraryRefreshBtn: $('libraryRefreshBtn'), libraryImportBtn: $('libraryImportBtn'), libraryImportZipBtn: $('libraryImportZipBtn'), libraryPdfArchiveBtn: $('libraryPdfArchiveBtn'), libraryEditableBackupBtn: $('libraryEditableBackupBtn'), libraryRestoreBackupBtn: $('libraryRestoreBackupBtn'), libraryImportBackupBtn: $('libraryImportBackupBtn'), libraryRestoreInput: $('libraryRestoreInput'), libraryBackupProgress: $('libraryBackupProgress'), filesTemplatesSummary: $('filesTemplatesSummary'), filesManageTemplatesBtn: $('filesManageTemplatesBtn'), requestPersistentStorageBtn: $('requestPersistentStorageBtn'), purgeLibraryBtn: $('purgeLibraryBtn'), factoryResetBtn: $('factoryResetBtn'), storageActionStatus: $('storageActionStatus'), openDocumentList: $('openDocumentList'), fileSelectionSummary: $('fileSelectionSummary'), selectAllFilesBtn: $('selectAllFilesBtn'), clearFileSelectionBtn: $('clearFileSelectionBtn'), exportOperationSummary: $('exportOperationSummary'), exportSummary: $('exportSummary'), exportFilenameLabel: $('exportFilenameLabel'), exportFilename: $('exportFilename'), exportPdfBtn: $('exportPdfBtn'), exportProgress: $('exportProgress'),
  extractSummary: $('extractSummary'), extractFilename: $('extractFilename'), extractPdfBtn: $('extractPdfBtn'), extractProgress: $('extractProgress'),
  splitBaseName: $('splitBaseName'), splitEveryCount: $('splitEveryCount'), splitFixedBtn: $('splitFixedBtn'), splitRanges: $('splitRanges'), splitRangesBtn: $('splitRangesBtn'), splitProgress: $('splitProgress'), splitOperationSummary: $('splitOperationSummary'),
  combineName: $('combineName'), combineList: $('combineList'), combineBtn: $('combineBtn'), combineProgress: $('combineProgress'), combineOperationSummary: $('combineOperationSummary'),
  imageAssemblyChooseBtn: $('imageAssemblyChooseBtn'), imageAssemblyClearBtn: $('imageAssemblyClearBtn'), imageAssemblySummary: $('imageAssemblySummary'), imageAssemblyList: $('imageAssemblyList'), imageAssemblyName: $('imageAssemblyName'), imageAssemblyPageSize: $('imageAssemblyPageSize'), imageAssemblyOrientation: $('imageAssemblyOrientation'), imageAssemblyCreateBtn: $('imageAssemblyCreateBtn'), imageAssemblyProgress: $('imageAssemblyProgress'), imageAssemblyOperationSummary: $('imageAssemblyOperationSummary'),
  compressOperationSummary: $('compressOperationSummary'), compressSummary: $('compressSummary'), compressionMethod: $('compressionMethod'), compressionLevel: $('compressionLevel'), compressionTargetField: $('compressionTargetField'), compressionTargetMb: $('compressionTargetMb'), compressionFilenameLabel: $('compressionFilenameLabel'), compressionFilename: $('compressionFilename'), compressionNormalizeLetter: $('compressionNormalizeLetter'), compressionMethodNote: $('compressionMethodNote'), compressBtn: $('compressBtn'), compressionProgress: $('compressionProgress'),
  splitLeftPane: $('splitLeftPane'), splitLeftViewer: $('splitLeftViewer'), splitLeftDocumentSelect: $('splitLeftDocumentSelect'), splitLeftNav: $('splitLeftNav'), splitLeftPrevBtn: $('splitLeftPrevBtn'), splitLeftNextBtn: $('splitLeftNextBtn'), splitLeftCounter: $('splitLeftCounter'),
  splitRightPane: $('splitRightPane'), splitRightViewer: $('splitRightViewer'), splitRightDocumentSelect: $('splitRightDocumentSelect'), splitRightNav: $('splitRightNav'), splitRightPrevBtn: $('splitRightPrevBtn'), splitRightNextBtn: $('splitRightNextBtn'), splitRightCounter: $('splitRightCounter'),
  thumbnailGrid: $('thumbnailGrid'), pageCountLabel: $('pageCountLabel'), selectionLabel: $('selectionLabel'),
  selectAllBtn: $('selectAllBtn'), rotateBtn: $('rotateBtn'), pageGeometryBtn: $('pageGeometryBtn'), pageEdgeBtn: $('pageEdgeBtn'), insertPageBtn: $('insertPageBtn'), duplicateBtn: $('duplicateBtn'), extractSelectedPagesBtn: $('extractSelectedPagesBtn'), copyPagesBtn: $('copyPagesBtn'), deleteBtn: $('deleteBtn'),
  undoBtn: $('undoBtn'), redoBtn: $('redoBtn'), statusText: $('statusText'), pdfEngineStatus: $('pdfEngineStatus'),
  singlePageNav: $('singlePageNav'), prevPageBtn: $('prevPageBtn'), nextPageBtn: $('nextPageBtn'), pageCounter: $('pageCounter'),
  presentationToolbar: $('presentationToolbar'), inkHandBtn: $('inkHandBtn'), inkPenBtn: $('inkPenBtn'), inkHighlighterBtn: $('inkHighlighterBtn'), inkEraserBtn: $('inkEraserBtn'), inkSelectBtn: $('inkSelectBtn'), penColorGroup: $('penColorGroup'), penWidthGroup: $('penWidthGroup'), highlighterColorGroup: $('highlighterColorGroup'), highlighterWidthGroup: $('highlighterWidthGroup'), eraserSizeGroup: $('eraserSizeGroup'), selectionActionGroup: $('selectionActionGroup'), selectionDeleteBtn: $('selectionDeleteBtn'), selectionDuplicateBtn: $('selectionDuplicateBtn'), selectionCopyBtn: $('selectionCopyBtn'), selectionPasteBtn: $('selectionPasteBtn'), inkUndoBtn: $('inkUndoBtn'), inkRedoBtn: $('inkRedoBtn'), presentationLayoutBtn: $('presentationLayoutBtn'), presentationInsertBtn: $('presentationInsertBtn'), presentationPaneChooser: $('presentationPaneChooser'), presentationLeftPaneBtn: $('presentationLeftPaneBtn'), presentationRightPaneBtn: $('presentationRightPaneBtn'), presentationDocumentSelect: $('presentationDocumentSelect'), presentationScrollModeBtn: $('presentationScrollModeBtn'), presentationFitBtn: $('presentationFitBtn'), presentationZoomOutBtn: $('presentationZoomOutBtn'), presentationZoomInBtn: $('presentationZoomInBtn'), presentationZoomLabel: $('presentationZoomLabel'), presentationExit: $('presentationExit'), insertPageMenu: $('insertPageMenu'), insertDuplicateWithAnnotationsBtn: $('insertDuplicateWithAnnotationsBtn'), insertDuplicateWithoutAnnotationsBtn: $('insertDuplicateWithoutAnnotationsBtn'), insertBlankPageBtn: $('insertBlankPageBtn'), insertGraphPageBtn: $('insertGraphPageBtn'), insertDuplicateWithPreview: $('insertDuplicateWithPreview'), insertDuplicateWithoutPreview: $('insertDuplicateWithoutPreview'), insertBlankPreview: $('insertBlankPreview'), insertGraphPreview: $('insertGraphPreview'), insertTemplateList: $('insertTemplateList'), savePageTemplateBtn: $('savePageTemplateBtn'), manageTemplatesBtn: $('manageTemplatesBtn'), templateNameDialog: $('templateNameDialog'), templateNameForm: $('templateNameForm'), templateNameInput: $('templateNameInput'), templateNameCloseBtn: $('templateNameCloseBtn'), templateNameCancelBtn: $('templateNameCancelBtn'), pageTransferDialog: $('pageTransferDialog'), pageTransferForm: $('pageTransferForm'), pageTransferCloseBtn: $('pageTransferCloseBtn'), pageTransferCancelBtn: $('pageTransferCancelBtn'), pageTransferSummary: $('pageTransferSummary'), pageTransferDestination: $('pageTransferDestination'), pageTransferPosition: $('pageTransferPosition'), pageTransferAfterField: $('pageTransferAfterField'), pageTransferAfterPage: $('pageTransferAfterPage'), pageTransferCopyBtn: $('pageTransferCopyBtn'), pageGeometryDialog: $('pageGeometryDialog'), pageGeometryForm: $('pageGeometryForm'), pageGeometryCloseBtn: $('pageGeometryCloseBtn'), pageGeometryCancelBtn: $('pageGeometryCancelBtn'), pageGeometrySummary: $('pageGeometrySummary'), pageGeometryScope: $('pageGeometryScope'), pageGeometryPreset: $('pageGeometryPreset'), pageGeometryOrientation: $('pageGeometryOrientation'), pageGeometryCustomFields: $('pageGeometryCustomFields'), pageGeometryCustomWidth: $('pageGeometryCustomWidth'), pageGeometryCustomHeight: $('pageGeometryCustomHeight'), pageGeometryPreviewPaper: $('pageGeometryPreviewPaper'), pageGeometryPreviewLabel: $('pageGeometryPreviewLabel'), pageGeometryApplyBtn: $('pageGeometryApplyBtn'), pageEdgeDialog: $('pageEdgeDialog'), pageEdgeForm: $('pageEdgeForm'), pageEdgeCloseBtn: $('pageEdgeCloseBtn'), pageEdgeCancelBtn: $('pageEdgeCancelBtn'), pageEdgeSummary: $('pageEdgeSummary'), pageEdgeScope: $('pageEdgeScope'), pageEdgeOperation: $('pageEdgeOperation'), pageEdgePreset: $('pageEdgePreset'), pageEdgeTop: $('pageEdgeTop'), pageEdgeRight: $('pageEdgeRight'), pageEdgeBottom: $('pageEdgeBottom'), pageEdgeLeft: $('pageEdgeLeft'), pageEdgePreviewPaper: $('pageEdgePreviewPaper'), pageEdgePreviewContent: $('pageEdgePreviewContent'), pageEdgePreviewLabel: $('pageEdgePreviewLabel'), pageEdgeResetBtn: $('pageEdgeResetBtn'), pageEdgeApplyBtn: $('pageEdgeApplyBtn'), closeDocumentDialog: $('closeDocumentDialog'), closeDocumentForm: $('closeDocumentForm'), closeDocumentXBtn: $('closeDocumentXBtn'), closeDocumentTitle: $('closeDocumentTitle'), closeDocumentMessage: $('closeDocumentMessage'), closeDocumentCancelBtn: $('closeDocumentCancelBtn'), closeDocumentWithoutExportBtn: $('closeDocumentWithoutExportBtn'), closeDocumentExportBtn: $('closeDocumentExportBtn'), libraryNameDialog: $('libraryNameDialog'), libraryNameForm: $('libraryNameForm'), libraryNameTitle: $('libraryNameTitle'), libraryNameHelp: $('libraryNameHelp'), libraryNameInput: $('libraryNameInput'), libraryNameCloseBtn: $('libraryNameCloseBtn'), libraryNameCancelBtn: $('libraryNameCancelBtn'), libraryNameSaveBtn: $('libraryNameSaveBtn'), libraryMoveDialog: $('libraryMoveDialog'), libraryMoveForm: $('libraryMoveForm'), libraryMoveTitle: $('libraryMoveTitle'), libraryMoveHelp: $('libraryMoveHelp'), libraryMoveDestination: $('libraryMoveDestination'), libraryMoveCloseBtn: $('libraryMoveCloseBtn'), libraryMoveCancelBtn: $('libraryMoveCancelBtn'), libraryMoveSaveBtn: $('libraryMoveSaveBtn'), infoDialog: $('infoDialog'), dialogContent: $('dialogContent')
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
  annotationTool: safePref('pdfwb-annotation-tool', 'hand', ['hand', 'pen', 'highlighter', 'eraser', 'select']),
  penColor: safePref('pdfwb-pen-color', '#111111', ['#111111','#1565c0','#d32f2f','#2e7d32','#ef6c00']),
  penWidth: Number(safePref('pdfwb-pen-width', '3', ['1.5','3','5.5'])),
  highlighterColor: safePref('pdfwb-highlighter-color', '#ffeb3b', ['#ffeb3b','#ff80ab','#4dd0e1','#81c784']),
  highlighterWidth: Number(safePref('pdfwb-highlighter-width', '14', ['8','14','22'])),
  eraserSize: Number(safePref('pdfwb-eraser-size', '24', ['12','24','40'])),
  inkGesture: null,
  eraserGesture: null,
  selectionGesture: null,
  annotationSelection: { documentId: null, pageId: null, ids: new Set() },
  annotationClipboard: null,
  annotationPasteSerial: 0,
  annotationPasteTargetKey: null,
  eraserCursor: null,
  inkDiagnostics: [],
  inkDiagnosticPointers: new Map(),
  stylusTouchContacts: new Map(),
  penHoverPointers: new Map(),
  penContactPointers: new Map(),
  penPalmGuardViewer: null,
  penPalmGuardUntil: 0,
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
  newLastPageDefault: { kind: 'graph', templateId: null },
  autoAppendLock: false,
  imageAssemblyItems: [],
  imageAssemblySequence: 1,
  insertPreviewGeneration: 0,
  libraryDb: null,
  libraryReady: false,
  libraryRecords: new Map(),
  libraryFolders: new Map(),
  libraryFolderId: null,
  libraryViewMode: safePref('pdfwb-library-view', 'grid', ['grid','list']),
  libraryPreviewObserver: null,
  pendingLibraryMove: null,
  pendingBackupImportMode: 'replace',
  libraryPersistTimer: null,
  sessionCheckpointTimer: null,
  // Do not allow lifecycle events during startup to overwrite the previously
  // saved workspace before restoration has had a chance to read it.
  sessionRestoreHydrated: false,
  sessionExplicitEmpty: false,
  libraryPersisting: false,
  libraryPersistAgain: false,
  libraryRecoveryTimer: null,
  librarySuppressPersist: false,
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
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
function isStandalonePwa() {
  try { return !!navigator.standalone || window.matchMedia?.('(display-mode: standalone)')?.matches; } catch { return false; }
}
function isAppleWebKit() {
  const ua = navigator.userAgent || '';
  return /AppleWebKit/i.test(ua) && !/Android/i.test(ua);
}

// ---------------------------------------------------------------------------
// Milestone 4.0 persistent local Library
// ---------------------------------------------------------------------------
function idbRequest(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('IndexedDB request failed'));
  });
}
function idbTransactionDone(tx) {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error || new Error('IndexedDB transaction failed'));
    tx.onabort = () => reject(tx.error || new Error('IndexedDB transaction aborted'));
  });
}
function kickIndexedDbWarmup() {
  // WebKit has had a long-standing first-open race in Safari/Home Screen apps.
  // Issuing a harmless warm-up open before the real database materially reduces
  // the chance that the first useful indexedDB.open() remains pending forever.
  try {
    const request = indexedDB.open('pdf-workbench-idb-warmup', 1);
    request.onupgradeneeded = () => {};
    request.onsuccess = () => { try { request.result.close(); } catch {} };
    request.onerror = () => {};
    request.onblocked = () => {};
  } catch {}
}
function openLibraryDatabaseOnce(timeoutMs=4500) {
  return new Promise((resolve, reject) => {
    let settled = false;
    let request;
    const finishReject = err => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      reject(err instanceof Error ? err : new Error(String(err || 'IndexedDB open failed')));
    };
    const finishResolve = db => {
      if (settled) { try { db?.close?.(); } catch {} return; }
      settled = true;
      clearTimeout(timer);
      resolve(db);
    };
    const timer = setTimeout(() => finishReject(new Error('IndexedDB did not become ready in time.')), timeoutMs);
    try {
      request = indexedDB.open(LIBRARY_DB_NAME, LIBRARY_DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains('documents')) db.createObjectStore('documents', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('sources')) db.createObjectStore('sources', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('meta')) db.createObjectStore('meta', { keyPath: 'key' });
        if (!db.objectStoreNames.contains('folders')) db.createObjectStore('folders', { keyPath: 'id' });
      };
      request.onsuccess = () => finishResolve(request.result);
      request.onerror = () => finishReject(request.error || new Error('IndexedDB open failed'));
      request.onblocked = () => finishReject(new Error('IndexedDB open is blocked by another PDF Workbench window. Close the other window and retry.'));
    } catch (err) {
      finishReject(err);
    }
  });
}
async function openLibraryDatabase() {
  if (!('indexedDB' in window)) throw new Error('This browser does not provide IndexedDB storage.');
  if (isAppleWebKit()) {
    kickIndexedDbWarmup();
    await sleep(120);
  }
  let lastError = null;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const db = await openLibraryDatabaseOnce(3500 + attempt * 1200);
      db.onversionchange = () => db.close();
      db.onclose = () => {
        if (state.libraryDb === db) {
          state.libraryDb = null;
          state.libraryReady = false;
        }
      };
      return db;
    } catch (err) {
      lastError = err;
      console.warn(`Local Library open attempt ${attempt} failed`, err);
      if (isAppleWebKit()) kickIndexedDbWarmup();
      await sleep(180 * attempt);
    }
  }
  throw lastError || new Error('Could not open the local Library.');
}
function libraryStore(name, mode='readonly') {
  if (!state.libraryDb) throw new Error('Local Library is not ready.');
  const tx = state.libraryDb.transaction(name, mode);
  return { tx, store: tx.objectStore(name) };
}
async function libraryGet(storeName, key) {
  const { store } = libraryStore(storeName);
  return idbRequest(store.get(key));
}
async function libraryGetAll(storeName) {
  const { store } = libraryStore(storeName);
  return idbRequest(store.getAll());
}
async function libraryPut(storeName, value) {
  const { tx, store } = libraryStore(storeName, 'readwrite');
  const done = idbTransactionDone(tx);
  await idbRequest(store.put(value));
  await done;
}
async function libraryDelete(storeName, key) {
  const { tx, store } = libraryStore(storeName, 'readwrite');
  const done = idbTransactionDone(tx);
  await idbRequest(store.delete(key));
  await done;
}
async function libraryClearStore(storeName) {
  const { tx, store } = libraryStore(storeName, 'readwrite');
  const done = idbTransactionDone(tx);
  await idbRequest(store.clear());
  await done;
}
async function reconnectLibraryDatabase() {
  try { state.libraryDb?.close?.(); } catch {}
  state.libraryDb = null;
  state.libraryReady = false;
  const db = await openLibraryDatabase();
  state.libraryDb = db;
  state.libraryReady = true;
  return db;
}
async function pingLibraryDatabase() {
  if (!state.libraryDb) return false;
  try {
    const { store } = libraryStore('meta');
    await idbRequest(store.get('__ping__'));
    return true;
  } catch {
    return false;
  }
}
async function ensureLibraryConnection() {
  if (state.libraryReady && await pingLibraryDatabase()) return true;
  try {
    await reconnectLibraryDatabase();
    return true;
  } catch (err) {
    console.error('Could not reconnect Local Library', err);
    state.libraryReady = false;
    return false;
  }
}
function clonePlain(value) {
  if (value == null) return value;
  try { return structuredClone(value); } catch { return JSON.parse(JSON.stringify(value)); }
}
function cloneInkStroke(stroke) {
  return {
    ...stroke,
    points: Array.isArray(stroke?.points) ? stroke.points.map(point => ({ x: Number(point.x) || 0, y: Number(point.y) || 0 })) : [],
  };
}
function clonePageState(page, options={}) {
  if (!page) return page;
  const includeAnnotations = options.includeAnnotations !== false;
  const copy = { ...page };
  copy.annotations = includeAnnotations && Array.isArray(page.annotations) ? page.annotations.map(cloneInkStroke) : [];
  if (options.newId) copy.id = uid('page');
  return copy;
}
function serializeDocumentForLibrary(doc) {
  return {
    id: doc.id,
    schemaVersion: LIBRARY_SCHEMA_VERSION,
    name: doc.name || 'Untitled.pdf',
    pages: doc.pages.map(page => clonePageState(page)),
    selected: [...(doc.selected || [])],
    selectionAnchorId: doc.selectionAnchorId || null,
    activePageId: doc.activePageId || doc.pages[0]?.id || null,
    history: (doc.history || []).map(snapshot => snapshot.map(page => clonePageState(page))),
    future: (doc.future || []).map(snapshot => snapshot.map(page => clonePageState(page))),
    singleView: copyView(doc.singleView || ensureSingleView(doc)),
    createdAt: doc.createdAt || Date.now(),
    modifiedAt: doc.modifiedAt || Date.now(),
    needsExport: !!doc.needsExport,
    lastExportedAt: doc.lastExportedAt || null,
    folderId: doc.folderId || null,
    favorite: !!doc.favorite,
    trashedAt: doc.trashedAt || null,
    trashBatchId: doc.trashBatchId || null,
  };
}
function hydrateDocumentFromLibrary(record) {
  const pages = (record.pages || []).map(page => clonePageState(page));
  const pageIds = new Set(pages.map(page => page.id));
  const doc = {
    id: record.id,
    name: record.name || 'Untitled.pdf',
    pages,
    selected: new Set((record.selected || []).filter(id => pageIds.has(id))),
    selectionAnchorId: pageIds.has(record.selectionAnchorId) ? record.selectionAnchorId : null,
    activePageId: pageIds.has(record.activePageId) ? record.activePageId : pages[0]?.id || null,
    history: (record.history || []).map(snapshot => snapshot.map(page => clonePageState(page))),
    future: (record.future || []).map(snapshot => snapshot.map(page => clonePageState(page))),
    singleView: copyView(record.singleView) || { zoom: 1, fitMode: state.fitMode, scrollMode: state.scrollMode, activePageId: pages[0]?.id || null, scrollTop: null, scrollLeft: null },
    createdAt: record.createdAt || Date.now(),
    modifiedAt: record.modifiedAt || record.createdAt || Date.now(),
    needsExport: !!record.needsExport,
    lastExportedAt: record.lastExportedAt || null,
    folderId: record.folderId || null,
    favorite: !!record.favorite,
    trashedAt: record.trashedAt || null,
    trashBatchId: record.trashBatchId || null,
    libraryManaged: true,
  };
  return doc;
}
async function persistSourceToLibrary(sourceId) {
  const source = state.sources.get(sourceId);
  if (!source || source.libraryPersisted) return;
  let data = null;
  let mimeType = source.type === 'pdf' ? 'application/pdf' : 'application/octet-stream';
  if (source.type === 'pdf') {
    if (source.bytes) {
      const bytes = source.bytes;
      data = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
    } else if (source.blob instanceof Blob) {
      data = await source.blob.arrayBuffer();
      mimeType = source.blob.type || mimeType;
    }
  } else if (source.type === 'image') {
    const blob = source.file instanceof Blob ? source.file : (source.blob instanceof Blob ? source.blob : null);
    if (blob) {
      data = await blob.arrayBuffer();
      mimeType = blob.type || mimeType;
    }
  }
  if (!data) return;
  // Store binary source payloads as ArrayBuffers. WebKit has historically had
  // more edge cases around Blob/File persistence in Home Screen apps; plain
  // ArrayBuffer structured-clone records are simpler and remain compatible
  // with the Blob-based records written by 4.0.0/4.0.1.
  await libraryPut('sources', {
    id: source.id,
    schemaVersion: LIBRARY_SCHEMA_VERSION,
    type: source.type,
    name: source.name || 'source',
    size: data.byteLength,
    mimeType,
    data,
  });
  source.libraryPersisted = true;
}
async function ensureLibrarySourceLoaded(sourceId) {
  if (!sourceId) return null;
  if (state.sources.has(sourceId)) return state.sources.get(sourceId);
  const record = await libraryGet('sources', sourceId);
  if (!record) throw new Error(`Stored source ${sourceId} is missing from the local Library.`);
  let data = record.data || null;
  if (!data && record.blob instanceof Blob) data = await record.blob.arrayBuffer(); // 4.0.0/4.0.1 compatibility
  if (!data) throw new Error(`Stored source ${sourceId} has no readable binary data.`);
  const mimeType = record.mimeType || (record.type === 'pdf' ? 'application/pdf' : 'application/octet-stream');
  if (record.type === 'pdf') {
    if (!state.pdfjs) throw new Error('The PDF engine is not available to reopen this stored document.');
    const bytes = new Uint8Array(data.slice ? data.slice(0) : data);
    const pdf = await state.pdfjs.getDocument({
      data: bytes.slice(), wasmUrl: PDFJS_WASM_URL, cMapUrl: PDFJS_CMAP_URL,
      cMapPacked: true, standardFontDataUrl: PDFJS_STANDARD_FONT_URL, useWasm: true,
    }).promise;
    const blob = new Blob([bytes], { type: mimeType });
    const source = { id: sourceId, type: 'pdf', name: record.name, size: record.size || bytes.byteLength, bytes, pdf, blob, libraryPersisted: true };
    state.sources.set(sourceId, source);
    return source;
  }
  const blob = new Blob([data], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const source = { id: sourceId, type: 'image', name: record.name, size: record.size || blob.size, file: blob, blob, url, image: null, libraryPersisted: true };
  state.sources.set(sourceId, source);
  return source;
}
function serializeLibrarySession() {
  const paneState = pane => ({
    documentId: pane.documentId || null,
    views: [...pane.views.entries()].map(([id, view]) => [id, copyView(view)]),
  });
  return {
    key: 'session', schemaVersion: LIBRARY_SCHEMA_VERSION,
    openIds: state.documents.map(doc => doc.id),
    currentDocumentId: state.currentDocumentId,
    workspaceMode: state.workspaceMode,
    splitView: !!state.splitView,
    activePaneId: state.activePaneId,
    singleSourcePaneId: state.singleSourcePaneId,
    splitPanes: { left: paneState(state.splitPanes.left), right: paneState(state.splitPanes.right) },
    // An empty workspace is authoritative only when the user deliberately
    // closed the last/all open documents. This distinguishes that from a
    // transient empty startup state before restoration has completed.
    explicitEmpty: state.documents.length === 0 && !!state.sessionExplicitEmpty,
    updatedAt: Date.now(),
  };
}
function writeSessionCheckpoint(session=null, options={}) {
  if (state.librarySuppressPersist) return;
  // bindEvents() runs before IndexedDB restoration. Browsers can emit
  // visibility/page lifecycle events during PWA startup; never let one of
  // those write an empty, newer checkpoint over the session we are about to
  // restore.
  if (!state.sessionRestoreHydrated && !options.force) return;
  try {
    const snapshot = session || serializeLibrarySession();
    localStorage.setItem(SESSION_CHECKPOINT_KEY, JSON.stringify(snapshot));
  } catch {}
}
function readSessionCheckpoint() {
  try {
    const raw = localStorage.getItem(SESSION_CHECKPOINT_KEY);
    if (!raw) return null;
    const value = JSON.parse(raw);
    if (!value || value.key !== 'session') return null;
    if (Number(value.schemaVersion || 1) > LIBRARY_SCHEMA_VERSION) return null;
    return value;
  } catch { return null; }
}
function scheduleSessionCheckpoint(delay=220) {
  if (state.librarySuppressPersist || !state.sessionRestoreHydrated) return;
  clearTimeout(state.sessionCheckpointTimer);
  state.sessionCheckpointTimer = setTimeout(() => {
    state.sessionCheckpointTimer = null;
    writeSessionCheckpoint();
  }, delay);
}
function sessionHasOpenDocuments(session) {
  return Array.isArray(session?.openIds) && session.openIds.length > 0;
}
function newestSavedSession(indexedSession) {
  const checkpoint = readSessionCheckpoint();
  if (!checkpoint) return indexedSession || null;
  if (!indexedSession) return checkpoint;
  const checkpointTime = Number(checkpoint.updatedAt || 0);
  const indexedTime = Number(indexedSession.updatedAt || 0);
  const newer = checkpointTime > indexedTime ? checkpoint : indexedSession;
  const older = newer === checkpoint ? indexedSession : checkpoint;
  // A lifecycle/startup race can produce an empty record. Do not let a newer
  // empty record erase a known non-empty workspace unless that empty state was
  // explicitly created by Close/Close all.
  if (!sessionHasOpenDocuments(newer) && sessionHasOpenDocuments(older) && newer?.explicitEmpty !== true) return older;
  return newer;
}
function checkpointWorkspaceNow(options={}) {
  if (options.explicitEmpty === true) state.sessionExplicitEmpty = true;
  else if (state.documents.length) state.sessionExplicitEmpty = false;
  writeSessionCheckpoint();
}
function serializeTemplatesForLibrary() {
  return {
    key: 'templates', schemaVersion: LIBRARY_SCHEMA_VERSION,
    templates: state.templates.map(template => ({
      id: template.id,
      name: template.name,
      page: template.page ? clonePageState(template.page) : null,
      createdAt: template.createdAt || Date.now(),
      modifiedAt: template.modifiedAt || template.createdAt || Date.now(),
    })),
    newLastPageDefault: {
      kind: ['graph','blank','template'].includes(state.newLastPageDefault?.kind) ? state.newLastPageDefault.kind : 'graph',
      templateId: state.newLastPageDefault?.kind === 'template' ? (state.newLastPageDefault.templateId || null) : null,
    },
    updatedAt: Date.now(),
  };
}
async function restorePersistentTemplates() {
  if (!state.libraryReady) return;
  const saved = await libraryGet('meta', 'templates');
  if (Number(saved?.schemaVersion || 1) > LIBRARY_SCHEMA_VERSION) throw new Error(`Saved templates use a newer Library schema (${saved.schemaVersion}).`);
  state.templates = Array.isArray(saved?.templates)
    ? saved.templates.filter(item => item?.page).map(item => ({
        id: item.id || uid('template'), name: item.name || 'Template', page: clonePageState(item.page),
        createdAt: item.createdAt || Date.now(), modifiedAt: item.modifiedAt || item.createdAt || Date.now(),
      }))
    : [];
  const savedDefault = saved?.newLastPageDefault;
  if (savedDefault?.kind === 'blank') state.newLastPageDefault = { kind:'blank', templateId:null };
  else if (savedDefault?.kind === 'template' && state.templates.some(template => template.id === savedDefault.templateId)) {
    state.newLastPageDefault = { kind:'template', templateId:savedDefault.templateId };
  } else state.newLastPageDefault = { kind:'graph', templateId:null };
  const sourceIds = new Set(state.templates.map(template => template.page?.sourceId).filter(Boolean));
  for (const sourceId of sourceIds) {
    try { await ensureLibrarySourceLoaded(sourceId); }
    catch (err) { console.warn(`Could not preload template source ${sourceId}`, err); }
  }
  renderInsertTemplateList();
}
async function persistLibraryNow(options={}) {
  if (state.librarySuppressPersist) return;
  if (!state.libraryReady || !state.libraryDb) {
    if (!(await ensureLibraryConnection())) return;
  }
  if (state.libraryPersisting) { state.libraryPersistAgain = true; return; }
  state.libraryPersisting = true;
  let failed = null;
  try {
    // Repair any same-id duplicate that may have been created by an older
    // build's asynchronous reopen race before serializing. Without this, the
    // later duplicate could overwrite the same IndexedDB record and multi-file
    // export could list the logical document twice.
    deduplicateOpenDocuments();
    saveCurrentDocumentState({ readViewDom: options.readViewDom !== false, skipLibrarySchedule: true });
    writeSessionCheckpoint();
    for (const doc of state.documents) {
      const sourceIds = new Set(doc.pages.map(page => page.sourceId).filter(Boolean));
      for (const sourceId of sourceIds) await persistSourceToLibrary(sourceId);
      const record = serializeDocumentForLibrary(doc);
      await libraryPut('documents', record);
      state.libraryRecords.set(doc.id, record);
    }
    const templateSourceIds = new Set(state.templates.map(template => template.page?.sourceId).filter(Boolean));
    for (const sourceId of templateSourceIds) await persistSourceToLibrary(sourceId);
    await libraryPut('meta', serializeTemplatesForLibrary());
    // Do not overwrite the saved workspace with the intentionally empty
    // pre-restore startup state. Document/template persistence may still run.
    if (state.sessionRestoreHydrated || options.allowUnhydratedSessionPersist) {
      await libraryPut('meta', serializeLibrarySession());
    }
    renderLibraryDocumentList();
    updateLibraryStorageSummary();
  } catch (err) {
    failed = err;
    console.error('Library persist failed', err);
    if (els.librarySummary) els.librarySummary.textContent = `Local Library save warning: ${err?.message || err}`;
    state.libraryReady = false;
  } finally {
    state.libraryPersisting = false;
  }
  // WebKit can lose an IndexedDB server connection when a Home Screen app is
  // suspended/resumed. Reconnect once and retry rather than silently losing the
  // first save after resume.
  if (failed && !options._reconnected) {
    try {
      if (await ensureLibraryConnection()) {
        await persistLibraryNow({ ...options, _reconnected: true, readViewDom: false });
        failed = null;
      }
    } catch (retryErr) {
      console.error('Library persist retry failed', retryErr);
    }
  }
  if (state.libraryPersistAgain) {
    state.libraryPersistAgain = false;
    scheduleLibraryPersist(80);
  }
}
function scheduleLibraryPersist(delay=550) {
  if (state.librarySuppressPersist) return;
  // IndexedDB writes can be interrupted when an installed PWA is suspended or
  // closed. Keep a throttled tiny workspace/session snapshot in localStorage
  // as well; pagehide/visibilitychange force an immediate final checkpoint.
  scheduleSessionCheckpoint();
  clearTimeout(state.libraryPersistTimer);
  state.libraryPersistTimer = setTimeout(() => persistLibraryNow(), delay);
}
function markDocumentDirty(doc=currentDocument()) {
  if (!doc) return;
  doc.needsExport = true;
  doc.modifiedAt = Date.now();
  scheduleLibraryPersist(180);
}
function markDocumentExported(doc) {
  if (!doc) return;
  doc.needsExport = false;
  doc.lastExportedAt = Date.now();
  scheduleLibraryPersist(100);
}
async function refreshLibraryRecords() {
  if (!state.libraryDb) return;
  const [records, folders] = await Promise.all([
    libraryGetAll('documents'),
    state.libraryDb.objectStoreNames.contains('folders') ? libraryGetAll('folders') : Promise.resolve([]),
  ]);
  state.libraryRecords = new Map(records.map(record => [record.id, record]));
  state.libraryFolders = new Map(folders.map(folder => [folder.id, folder]));
  if (state.libraryFolderId && !state.libraryFolders.has(state.libraryFolderId)) state.libraryFolderId = null;
  renderLibraryDocumentList();
  updateLibraryStorageSummary();
}
async function reopenLibraryDocument(docId, options={}) {
  const already = documentById(docId);
  if (already) {
    if (options.makeActive !== false) loadDocumentState(docId);
    return already;
  }
  const record = state.libraryRecords.get(docId) || await libraryGet('documents', docId);
  if (!record) throw new Error('That Library document is no longer available.');
  if (record.trashedAt) throw new Error('That document is in Trash. Restore it before opening.');
  const sourceIds = new Set((record.pages || []).map(page => page.sourceId).filter(Boolean));
  for (const sourceId of sourceIds) await ensureLibrarySourceLoaded(sourceId);
  // Two rapid Open actions (or an Open racing startup restoration) can both
  // pass the first already-open check before source hydration yields. Recheck
  // after the asynchronous work so only one in-memory object with this Library
  // id can be inserted.
  const racedOpen = documentById(docId);
  if (racedOpen) {
    if (options.makeActive !== false) loadDocumentState(docId);
    return racedOpen;
  }
  const doc = hydrateDocumentFromLibrary(record);
  state.documents.push(doc);
  if (options.makeActive !== false) {
    state.currentDocumentId = doc.id;
    state.pages = doc.pages;
    state.selected = doc.selected;
    state.selectionAnchorId = doc.selectionAnchorId;
    state.activePageId = doc.activePageId;
    state.history = doc.history;
    state.future = doc.future;
    applySingleView(doc, doc.singleView);
    state.workspaceMode = 'view';
  }
  if (!state.fileSelectionInitialized) {
    state.fileSelected = new Set([doc.id]);
    state.fileSelectionInitialized = true;
  }
  ensureSplitPaneDocuments();
  state.sessionExplicitEmpty = false;
  checkpointWorkspaceNow();
  scheduleLibraryPersist(80);
  if (options.render !== false) renderAll({ saveState: false });
  return doc;
}
async function initializePersistentLibrary() {
  try {
    state.libraryDb = await openLibraryDatabase();
    state.libraryReady = true;
    await refreshLibraryRecords();
    await restorePersistentTemplates();
    const incompatible = [...state.libraryRecords.values()].find(record => Number(record.schemaVersion || 1) > LIBRARY_SCHEMA_VERSION);
    if (incompatible) throw new Error(`This local Library uses schema ${incompatible.schemaVersion}, newer than this build understands (${LIBRARY_SCHEMA_VERSION}). Use a newer PDF Workbench build or reset the local Library.`);
    const incompatibleFolder = [...state.libraryFolders.values()].find(folder => Number(folder.schemaVersion || 1) > LIBRARY_SCHEMA_VERSION);
    if (incompatibleFolder) throw new Error(`This local Library folder data uses schema ${incompatibleFolder.schemaVersion}, newer than this build understands (${LIBRARY_SCHEMA_VERSION}).`);
    const indexedSession = await libraryGet('meta', 'session');
    if (Number(indexedSession?.schemaVersion || 1) > LIBRARY_SCHEMA_VERSION) throw new Error(`The saved Library session uses a newer schema (${indexedSession.schemaVersion}).`);
    // Prefer the newest of the durable IndexedDB session and the synchronous
    // localStorage checkpoint. The checkpoint closes the PWA shutdown race in
    // which pagehide starts an IndexedDB write but the OS terminates the app
    // before that small session record commits.
    const session = newestSavedSession(indexedSession);
    // Do not require the in-memory records map as a precondition.
    // reopenLibraryDocument() can fall back to a direct IndexedDB read, which
    // makes restoration resilient to a temporarily incomplete list refresh.
    const openIds = Array.isArray(session?.openIds) ? [...new Set(session.openIds.filter(Boolean))] : [];
    if (['view','organize','export'].includes(session?.workspaceMode)) state.workspaceMode = session.workspaceMode;
    state.librarySuppressPersist = true;
    let restoreFailures = 0;
    for (const id of openIds) {
      try {
        const record = state.libraryRecords.get(id) || await libraryGet('documents', id);
        // A stale session reference to a deleted/trashed Library item is
        // already resolved and should not block future session persistence.
        if (!record || record.trashedAt) continue;
        await reopenLibraryDocument(id, { makeActive: false, render: false });
      } catch (err) { restoreFailures++; console.error(`Could not restore Library document ${id}`, err); }
    }
    if (state.documents.length) {
      const currentId = state.documents.some(doc => doc.id === session?.currentDocumentId) ? session.currentDocumentId : state.documents[0].id;
      state.currentDocumentId = null;
      loadDocumentState(currentId, false);
      state.splitView = !!session?.splitView;
      state.activePaneId = session?.activePaneId === 'right' ? 'right' : 'left';
      state.singleSourcePaneId = session?.singleSourcePaneId === 'right' ? 'right' : 'left';
      for (const paneId of ['left','right']) {
        const saved = session?.splitPanes?.[paneId];
        const pane = state.splitPanes[paneId];
        if (!saved) continue;
        pane.documentId = state.documents.some(doc => doc.id === saved.documentId) ? saved.documentId : null;
        pane.views = new Map((saved.views || []).filter(([id]) => state.documents.some(doc => doc.id === id)).map(([id, view]) => [id, copyView(view)]));
      }
      ensureSplitPaneDocuments();
    }
    // Only begin writing session checkpoints after the prior session has been
    // read and its requested documents have been accounted for. If a document
    // could not be reopened, preserve the old saved session for retry instead
    // of immediately replacing it with a partial/empty one.
    state.sessionRestoreHydrated = restoreFailures === 0;
    state.sessionExplicitEmpty = state.documents.length === 0 && session?.explicitEmpty === true;
    state.librarySuppressPersist = false;
    if (state.sessionRestoreHydrated) writeSessionCheckpoint();
    renderAll({ saveState: false });
    renderLibraryDocumentList();
    updateLibraryStorageSummary();
    if (state.sessionRestoreHydrated) scheduleLibraryPersist(250);
  } catch (err) {
    state.librarySuppressPersist = false;
    state.libraryReady = false;
    try { state.libraryDb?.close?.(); } catch {}
    state.libraryDb = null;
    console.error('Persistent Library unavailable', err);
    const pwaHint = isAppleWebKit() && isStandalonePwa() ? ' Home Screen storage will be retried automatically and can also be retried with Refresh.' : '';
    if (els.librarySummary) els.librarySummary.textContent = `Persistent Library unavailable: ${err?.message || err}.${pwaHint}`;
    if (els.libraryStorageSummary) els.libraryStorageSummary.textContent = 'Documents still work in this session, but persistence is not active until Local Library reconnects.';
    if (isAppleWebKit() && isStandalonePwa()) {
      clearTimeout(state.libraryRecoveryTimer);
      state.libraryRecoveryTimer = setTimeout(() => retryPersistentLibraryAfterFailure(), 900);
    }
  }
}
async function retryPersistentLibraryAfterFailure() {
  if (state.libraryReady || state.librarySuppressPersist) return;
  try {
    if (els.librarySummary) els.librarySummary.textContent = 'Retrying Local Library storage…';
    await reconnectLibraryDatabase();
    await refreshLibraryRecords();
    await restorePersistentTemplates();
    // If documents are already open from the current session, commit them now.
    // If nothing is open, rerun normal initialization so a saved prior session
    // can be restored after a WebKit first-open failure.
    if (state.documents.length) {
      state.sessionRestoreHydrated = true;
      state.sessionExplicitEmpty = false;
      writeSessionCheckpoint();
      await persistLibraryNow({ readViewDom: false, _reconnected: true });
      renderLibraryDocumentList();
      renderLibraryDocumentList();
    } else {
      try { state.libraryDb?.close?.(); } catch {}
      state.libraryDb = null;
      state.libraryReady = false;
      await initializePersistentLibrary();
    }
  } catch (err) {
    state.libraryReady = false;
    console.error('Local Library retry failed', err);
    if (els.librarySummary) els.librarySummary.textContent = `Local Library retry failed: ${err?.message || err}. Tap Refresh to try again.`;
  }
}
async function resumePersistentLibraryConnection() {
  if (document.visibilityState === 'hidden' || state.librarySuppressPersist) return;
  const ok = await ensureLibraryConnection();
  if (!ok) {
    if (els.librarySummary) els.librarySummary.textContent = 'Local Library connection is unavailable. Tap Refresh to retry.';
    return;
  }
  try {
    await refreshLibraryRecords();
    await restorePersistentTemplates();
    if (!state.sessionRestoreHydrated && !state.documents.length) {
      // The first startup restore did not complete. Re-enter the normal restore
      // path instead of saving an empty workspace over the prior session.
      try { state.libraryDb?.close?.(); } catch {}
      state.libraryDb = null;
      state.libraryReady = false;
      await initializePersistentLibrary();
      return;
    }
    if (!state.sessionRestoreHydrated && state.documents.length) {
      state.sessionRestoreHydrated = true;
      state.sessionExplicitEmpty = false;
      writeSessionCheckpoint();
    }
    await persistLibraryNow({ readViewDom: false, _reconnected: true });
  } catch (err) {
    console.warn('Local Library resume refresh failed', err);
  }
}
async function updateLibraryStorageSummary() {
  if (!els.libraryStorageSummary) return;
  try {
    if (!navigator.storage?.estimate) {
      els.libraryStorageSummary.textContent = 'Local Library uses browser storage on this device.';
      return;
    }
    const estimate = await navigator.storage.estimate();
    const used = formatFileSize(estimate.usage || 0);
    const quota = formatFileSize(estimate.quota || 0);
    let persisted = '';
    if (navigator.storage.persisted) persisted = (await navigator.storage.persisted()) ? ' · persistent-storage protection granted' : ' · browser-managed storage';
    els.libraryStorageSummary.textContent = `${used} used of approximately ${quota} available${persisted}.`;
  } catch {
    els.libraryStorageSummary.textContent = 'Local Library uses browser storage on this device.';
  }
}
async function requestPersistentLibraryStorage() {
  if (!navigator.storage?.persist) {
    els.storageActionStatus.textContent = 'This browser does not expose a persistent-storage request API.';
    return;
  }
  try {
    const granted = await navigator.storage.persist();
    els.storageActionStatus.textContent = granted
      ? 'Persistent-storage protection is enabled for this site/app.'
      : 'The browser kept storage under its normal management policy. The Library still works, but the browser may reclaim site data under storage pressure.';
    updateLibraryStorageSummary();
  } catch (err) {
    els.storageActionStatus.textContent = `Could not request persistent storage: ${err?.message || err}`;
  }
}


// ---------------------------------------------------------------------------
// Milestone 4.2 — whole-Library PDF archive and editable backup / restore
// ---------------------------------------------------------------------------
function portableTimestamp() {
  const d = new Date();
  const pad = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}_${pad(d.getHours())}-${pad(d.getMinutes())}`;
}

function zipSafeSegment(name, fallback='Item') {
  const cleaned = String(name || '').replace(/[\\/:*?"<>|\x00-\x1f]+/g, '_').replace(/[. ]+$/g, '').trim();
  return cleaned || fallback;
}

function buildPortableFolderPaths(folders) {
  const byId = new Map(folders.filter(folder => folder && !folder.trashedAt).map(folder => [folder.id, folder]));
  const children = new Map();
  for (const folder of byId.values()) {
    const parent = byId.has(folder.parentId) ? folder.parentId : null;
    if (!children.has(parent)) children.set(parent, []);
    children.get(parent).push(folder);
  }
  for (const list of children.values()) list.sort((a,b) => String(a.name).localeCompare(String(b.name), undefined, { sensitivity: 'base' }));
  const paths = new Map();
  const visit = (parentId, parentPath='') => {
    const used = new Set();
    for (const folder of children.get(parentId) || []) {
      let segment = zipSafeSegment(folder.name, 'Folder');
      const base = segment;
      let n = 2;
      while (used.has(segment.toLocaleLowerCase())) segment = `${base} ${n++}`;
      used.add(segment.toLocaleLowerCase());
      const path = parentPath ? `${parentPath}/${segment}` : segment;
      paths.set(folder.id, path);
      visit(folder.id, path);
    }
  };
  visit(null, '');
  return paths;
}

async function ensureRecordSourcesLoaded(record) {
  const ids = new Set((record?.pages || []).map(page => page.sourceId).filter(Boolean));
  for (const sourceId of ids) await ensureLibrarySourceLoaded(sourceId);
  return ids;
}

async function exportWholeLibraryAsPdfs() {
  if (!state.libraryReady && !(await ensureLibraryConnection())) {
    setStatus('Local Library is not available');
    return;
  }
  try {
    if (els.libraryBackupProgress) els.libraryBackupProgress.textContent = 'Saving current Library state…';
    await persistLibraryNow();
    await refreshLibraryRecords();
    const records = [...state.libraryRecords.values()].filter(record => !record.trashedAt)
      .sort((a,b) => String(a.name).localeCompare(String(b.name), undefined, { sensitivity: 'base' }));
    const folders = [...state.libraryFolders.values()].filter(folder => !folder.trashedAt);
    const templates = state.templates.slice();
    if (!records.length && !templates.length && !folders.length) {
      if (els.libraryBackupProgress) els.libraryBackupProgress.textContent = 'The Local Library is empty.';
      return;
    }
    const JSZip = await loadZipEngine();
    const zip = new JSZip();
    const folderPaths = buildPortableFolderPaths(folders);
    for (const path of folderPaths.values()) zip.folder(path); // keep empty folders in the archive

    let completed = 0;
    const total = records.length + templates.length;
    for (const record of records) {
      completed++;
      if (els.libraryBackupProgress) els.libraryBackupProgress.textContent = `Exporting ${record.name} (${completed} of ${Math.max(1,total)})…`;
      await ensureRecordSourcesLoaded(record);
      const bytes = await buildPdfBytes(record.pages || [], { sourcePdfCache: new Map() });
      const folderPath = record.folderId ? (folderPaths.get(record.folderId) || '') : '';
      const filename = ensurePdfFilename(zipSafeSegment(record.name, 'Document.pdf'));
      zip.file(folderPath ? `${folderPath}/${filename}` : filename, bytes);
    }
    if (templates.length) {
      zip.folder('_Templates');
      const used = new Set();
      for (const template of templates) {
        completed++;
        if (els.libraryBackupProgress) els.libraryBackupProgress.textContent = `Exporting template ${template.name} (${completed} of ${total})…`;
        const record = { pages: template.page ? [template.page] : [] };
        await ensureRecordSourcesLoaded(record);
        const bytes = await buildPdfBytes(record.pages, { sourcePdfCache: new Map() });
        let base = zipSafeSegment(template.name, 'Template');
        let filename = ensurePdfFilename(base);
        let n = 2;
        while (used.has(filename.toLocaleLowerCase())) filename = ensurePdfFilename(`${base} ${n++}`);
        used.add(filename.toLocaleLowerCase());
        zip.file(`_Templates/${filename}`, bytes);
      }
    }
    zip.file('PDF_Workbench_Library_Export.txt', [
      'PDF Workbench Library PDF Archive',
      `Created: ${new Date().toISOString()}`,
      `Application version: ${APP_VERSION}`,
      '',
      'This ZIP contains conventional PDF exports of all non-Trash Library documents.',
      'Folder/subfolder paths mirror the PDF Workbench Local Library.',
      'Saved page templates are included as one-page PDFs under _Templates.',
      'This archive is not an editable PDF Workbench backup. Use Back up editable Library for restoration.',
      ''
    ].join('\n'));
    if (els.libraryBackupProgress) els.libraryBackupProgress.textContent = 'Building Library PDF ZIP…';
    const blob = await zip.generateAsync({ type: 'blob', compression: 'STORE', mimeType: 'application/zip' });
    downloadBlob(blob, `PDF-Workbench-Library-PDFs-${portableTimestamp()}.zip`);
    if (els.libraryBackupProgress) els.libraryBackupProgress.textContent = `Exported ${records.length} document${records.length === 1 ? '' : 's'}${templates.length ? ` and ${templates.length} template${templates.length === 1 ? '' : 's'}` : ''}.`;
    setStatus('Library PDF archive created');
  } catch (err) {
    console.error('Whole Library PDF export failed', err);
    if (els.libraryBackupProgress) els.libraryBackupProgress.textContent = `Library PDF export failed: ${err?.message || err}`;
    setStatus(`Library PDF export failed: ${err?.message || err}`);
  }
}

async function sourceRecordPayload(record) {
  if (!record) return null;
  if (record.data instanceof ArrayBuffer) return new Uint8Array(record.data);
  if (ArrayBuffer.isView(record.data)) return new Uint8Array(record.data.buffer, record.data.byteOffset, record.data.byteLength);
  if (record.blob instanceof Blob) return new Uint8Array(await record.blob.arrayBuffer());
  return null;
}

async function createEditableLibraryBackup() {
  if (!state.libraryReady && !(await ensureLibraryConnection())) {
    setStatus('Local Library is not available');
    return;
  }
  try {
    if (els.libraryBackupProgress) els.libraryBackupProgress.textContent = 'Saving current editable state…';
    await persistLibraryNow();
    const [documents, sources, folders, session, templatesMeta] = await Promise.all([
      libraryGetAll('documents'),
      libraryGetAll('sources'),
      libraryGetAll('folders'),
      libraryGet('meta', 'session'),
      libraryGet('meta', 'templates'),
    ]);
    const JSZip = await loadZipEngine();
    const zip = new JSZip();
    const sourceManifest = [];
    let index = 0;
    for (const source of sources) {
      index++;
      if (els.libraryBackupProgress) els.libraryBackupProgress.textContent = `Packing source ${index} of ${sources.length}…`;
      const payload = await sourceRecordPayload(source);
      if (!payload) throw new Error(`Stored source ${source.name || source.id} has no readable binary data.`);
      const path = `sources/${encodeURIComponent(source.id)}.bin`;
      zip.file(path, payload);
      sourceManifest.push({
        id: source.id,
        schemaVersion: Number(source.schemaVersion || 1),
        type: source.type,
        name: source.name,
        size: payload.byteLength,
        mimeType: source.mimeType || (source.type === 'pdf' ? 'application/pdf' : 'application/octet-stream'),
        path,
      });
    }
    const preferences = {};
    for (const key of ['pdfwb-scroll-mode','pdfwb-fit-mode','pdfwb-library-view']) {
      try { const value = localStorage.getItem(key); if (value != null) preferences[key] = value; } catch {}
    }
    const manifest = {
      format: 'PDF Workbench Editable Library Backup',
      backupFormatVersion: LIBRARY_BACKUP_FORMAT_VERSION,
      applicationVersion: APP_VERSION,
      librarySchemaVersion: LIBRARY_SCHEMA_VERSION,
      createdAt: new Date().toISOString(),
      documents,
      folders,
      sources: sourceManifest,
      meta: { session: session || serializeLibrarySession(), templates: templatesMeta || serializeTemplatesForLibrary() },
      preferences,
    };
    zip.file('manifest.json', JSON.stringify(manifest, null, 2));
    zip.file('README.txt', [
      'PDF Workbench Editable Library Backup',
      '',
      'This is a ZIP-based PDF Workbench backup container.',
      'Restore it from Files > Library backup & export > Restore Library backup.',
      'It contains editable document state, folder hierarchy, Trash state, templates, source PDFs/images, and the saved open/view session.',
      'Do not edit the contents if you intend to restore the backup.',
      ''
    ].join('\n'));
    if (els.libraryBackupProgress) els.libraryBackupProgress.textContent = 'Building editable backup…';
    const blob = await zip.generateAsync({ type: 'blob', compression: 'STORE', mimeType: 'application/zip' });
    downloadBlob(blob, `PDF-Workbench-Library-${portableTimestamp()}.pwbbackup.zip`);
    if (els.libraryBackupProgress) els.libraryBackupProgress.textContent = `Editable backup created: ${documents.length} documents, ${folders.length} folders, ${sourceManifest.length} source files, ${(manifest.meta.templates?.templates || []).length} templates.`;
    setStatus('Editable Library backup created');
  } catch (err) {
    console.error('Editable Library backup failed', err);
    if (els.libraryBackupProgress) els.libraryBackupProgress.textContent = `Editable backup failed: ${err?.message || err}`;
    setStatus(`Editable backup failed: ${err?.message || err}`);
  }
}

async function replaceLibraryStoresAtomically({ documents, sources, folders, templatesMeta, sessionMeta }) {
  if (!state.libraryDb) throw new Error('Local Library is not ready.');
  const tx = state.libraryDb.transaction(['documents','sources','folders','meta'], 'readwrite');
  const done = idbTransactionDone(tx);
  const documentStore = tx.objectStore('documents');
  const sourceStore = tx.objectStore('sources');
  const folderStore = tx.objectStore('folders');
  const metaStore = tx.objectStore('meta');
  documentStore.clear(); sourceStore.clear(); folderStore.clear(); metaStore.clear();
  for (const value of sources) sourceStore.put(value);
  for (const value of folders) folderStore.put(value);
  for (const value of documents) documentStore.put(value);
  metaStore.put(templatesMeta);
  metaStore.put(sessionMeta);
  await done;
}

function validateLibraryBackupManifest(manifest) {
  if (!manifest || manifest.format !== 'PDF Workbench Editable Library Backup') throw new Error('This file is not a PDF Workbench editable Library backup.');
  const formatVersion = Number(manifest.backupFormatVersion || 0);
  if (formatVersion < 1 || formatVersion > LIBRARY_BACKUP_FORMAT_VERSION) throw new Error(`Backup format ${formatVersion} is not supported by this build.`);
  const schemaVersion = Number(manifest.librarySchemaVersion || 1);
  if (schemaVersion > LIBRARY_SCHEMA_VERSION) throw new Error(`This backup uses Library schema ${schemaVersion}, newer than this build understands (${LIBRARY_SCHEMA_VERSION}).`);
  if (!Array.isArray(manifest.documents) || !Array.isArray(manifest.folders) || !Array.isArray(manifest.sources)) throw new Error('The backup manifest is incomplete.');
  const sourceIds = new Set(manifest.sources.map(source => source?.id).filter(Boolean));
  for (const record of manifest.documents) {
    if (!record?.id || !Array.isArray(record.pages)) throw new Error('The backup contains an invalid document record.');
    for (const page of record.pages) if (page?.sourceId && !sourceIds.has(page.sourceId)) throw new Error(`Backup source ${page.sourceId} required by ${record.name || record.id} is missing.`);
  }
  const templates = manifest.meta?.templates?.templates || [];
  for (const template of templates) if (template?.page?.sourceId && !sourceIds.has(template.page.sourceId)) throw new Error(`Backup source ${template.page.sourceId} required by template ${template.name || template.id} is missing.`);
  return true;
}

async function restoreEditableLibraryBackup(file) {
  if (!file) return;
  try {
    const JSZip = await loadZipEngine();
    if (els.libraryBackupProgress) els.libraryBackupProgress.textContent = 'Reading editable Library backup…';
    const zip = await JSZip.loadAsync(file);
    const manifestFile = zip.file('manifest.json');
    if (!manifestFile) throw new Error('The backup does not contain manifest.json.');
    const manifest = JSON.parse(await manifestFile.async('string'));
    validateLibraryBackupManifest(manifest);
    const documentCount = manifest.documents.length;
    const folderCount = manifest.folders.length;
    const templateCount = manifest.meta?.templates?.templates?.length || 0;
    const ok = window.confirm(`Restore this PDF Workbench Library backup?\n\n${documentCount} document(s), ${folderCount} folder(s), ${templateCount} template(s).\n\nThis will REPLACE the current Local Library on this device. Export or back up the current Library first if you need it.`);
    if (!ok) { if (els.libraryBackupProgress) els.libraryBackupProgress.textContent = 'Restore cancelled.'; return; }
    if (!(await ensureLibraryConnection())) throw new Error('Could not connect to Local Library storage.');

    // Validate every binary payload before touching the current Library.
    const restoredSources = [];
    let i = 0;
    for (const source of manifest.sources) {
      i++;
      if (els.libraryBackupProgress) els.libraryBackupProgress.textContent = `Checking source ${i} of ${manifest.sources.length}…`;
      const entry = zip.file(source.path);
      if (!entry) throw new Error(`Backup payload ${source.path} is missing.`);
      const data = await entry.async('arraybuffer');
      if (!data.byteLength && Number(source.size || 0) > 0) throw new Error(`Backup payload for ${source.name || source.id} is empty.`);
      restoredSources.push({
        id: source.id,
        schemaVersion: Math.min(Number(source.schemaVersion || manifest.librarySchemaVersion || 1), LIBRARY_SCHEMA_VERSION),
        type: source.type,
        name: source.name || 'source',
        size: data.byteLength,
        mimeType: source.mimeType || (source.type === 'pdf' ? 'application/pdf' : 'application/octet-stream'),
        data,
      });
    }

    if (els.libraryBackupProgress) els.libraryBackupProgress.textContent = 'Replacing Local Library…';
    state.librarySuppressPersist = true;
    clearAll();
    state.libraryPreviewObserver?.disconnect();
    state.libraryPreviewObserver = null;
    els.libraryDocumentList?.replaceChildren();
    state.templates = [];
    for (const source of state.sources.values()) {
      if (source.url) URL.revokeObjectURL(source.url);
      try { source.pdf?.destroy?.(); } catch {}
    }
    state.sources.clear();
    const restoredFolders = manifest.folders.map(folder => ({ ...folder, schemaVersion: Math.min(Number(folder.schemaVersion || manifest.librarySchemaVersion || 1), LIBRARY_SCHEMA_VERSION) }));
    const restoredDocuments = manifest.documents.map(documentRecord => ({ ...documentRecord, schemaVersion: Math.min(Number(documentRecord.schemaVersion || manifest.librarySchemaVersion || 1), LIBRARY_SCHEMA_VERSION) }));
    const templatesMetaRaw = manifest.meta?.templates || { key:'templates', schemaVersion: manifest.librarySchemaVersion || 1, templates: [] };
    const sessionMetaRaw = manifest.meta?.session || { key:'session', schemaVersion: manifest.librarySchemaVersion || 1, openIds: [], currentDocumentId: null, workspaceMode:'export', splitView:false, splitPanes:{ left:{documentId:null,views:[]}, right:{documentId:null,views:[]} } };
    const templatesMeta = { ...templatesMetaRaw, key:'templates', schemaVersion: Math.min(Number(templatesMetaRaw.schemaVersion || manifest.librarySchemaVersion || 1), LIBRARY_SCHEMA_VERSION) };
    const sessionMeta = { ...sessionMetaRaw, key:'session', schemaVersion: Math.min(Number(sessionMetaRaw.schemaVersion || manifest.librarySchemaVersion || 1), LIBRARY_SCHEMA_VERSION) };
    await replaceLibraryStoresAtomically({ documents: restoredDocuments, sources: restoredSources, folders: restoredFolders, templatesMeta, sessionMeta });
    for (const [key, value] of Object.entries(manifest.preferences || {})) {
      if (['pdfwb-scroll-mode','pdfwb-fit-mode','pdfwb-library-view'].includes(key)) { try { localStorage.setItem(key, String(value)); } catch {} }
    }
    state.librarySuppressPersist = true; // pagehide must not overwrite the restored session
    try { localStorage.removeItem(SESSION_CHECKPOINT_KEY); localStorage.removeItem('pdfwb-session-checkpoint-v1'); } catch {}
    if (els.libraryBackupProgress) els.libraryBackupProgress.textContent = 'Restore complete. Reloading PDF Workbench…';
    setStatus('Library restored · reloading…', true);
    const url = new URL(location.href);
    url.searchParams.set('restore', Date.now().toString());
    setTimeout(() => location.replace(url.href), 180);
  } catch (err) {
    state.librarySuppressPersist = false;
    console.error('Editable Library restore failed', err);
    if (els.libraryBackupProgress) els.libraryBackupProgress.textContent = `Restore failed: ${err?.message || err}`;
    setStatus(`Library restore failed: ${err?.message || err}`);
  } finally {
    if (els.libraryRestoreInput) els.libraryRestoreInput.value = '';
  }
}

// ---------------------------------------------------------------------------
// Milestone 4.2.1 — folder ZIP import and non-destructive backup import
// ---------------------------------------------------------------------------
function safeArchivePathParts(path) {
  const normalized = String(path || '').replace(/\\/g, '/').replace(/^\/+/, '');
  const parts = normalized.split('/').filter(Boolean);
  if (parts.some(part => part === '.' || part === '..')) throw new Error(`Unsafe archive path: ${path}`);
  if (parts.length > 24) throw new Error(`Archive path is nested too deeply: ${path}`);
  return parts;
}

async function ensureLibraryChildFolder(name, parentId) {
  const clean = zipSafeSegment(name, 'Folder');
  const existing = activeLibraryFolders().find(folder => (folder.parentId || null) === (parentId || null) && String(folder.name).toLocaleLowerCase() === clean.toLocaleLowerCase());
  if (existing) return existing.id;
  let finalName = clean; let n = 2;
  while (librarySiblingNameExists(finalName, parentId)) finalName = `${clean} ${n++}`;
  const folder = { id: uid('folder'), schemaVersion: LIBRARY_SCHEMA_VERSION, name: finalName, parentId: parentId || null, createdAt: Date.now(), modifiedAt: Date.now(), trashedAt: null, trashBatchId: null };
  await libraryPut('folders', folder); state.libraryFolders.set(folder.id, folder); return folder.id;
}
async function createLibraryChildFolderAlways(name, parentId) {
  const clean = zipSafeSegment(name, 'Folder');
  let finalName = clean; let n = 2;
  while (librarySiblingNameExists(finalName, parentId)) finalName = `${clean} ${n++}`;
  const folder = { id: uid('folder'), schemaVersion: LIBRARY_SCHEMA_VERSION, name: finalName, parentId: parentId || null, createdAt: Date.now(), modifiedAt: Date.now(), trashedAt: null, trashBatchId: null };
  await libraryPut('folders', folder); state.libraryFolders.set(folder.id, folder); return folder.id;
}

async function importPdfFileDirectToLibrary(file, folderId) {
  const previousCurrent = state.currentDocumentId;
  const previousWorkspace = state.workspaceMode;
  const doc = createDocument(uniqueLibraryDocumentName(file.name, folderId));
  doc.folderId = folderId || null;
  try {
    const added = await addPdf(file);
    if (!added) throw new Error('No pages were found.');
    state.activePageId = state.pages[0]?.id || null;
    doc.needsExport = false; doc.lastExportedAt = Date.now(); doc.modifiedAt = Date.now();
    saveCurrentDocumentState({ readViewDom:false });
    await persistLibraryNow({ readViewDom:false });
    removeDocument(doc.id); state.fileSelected.delete(doc.id); reconcileCombineOrder();
    if (previousCurrent && documentById(previousCurrent)) loadDocumentState(previousCurrent, false);
    state.workspaceMode = previousWorkspace;
    return doc.id;
  } catch (err) {
    if (documentById(doc.id)) removeDocument(doc.id);
    if (previousCurrent && documentById(previousCurrent)) loadDocumentState(previousCurrent, false);
    state.workspaceMode = previousWorkspace;
    throw err;
  }
}

async function importPdfDirectoryZip(file) {
  if (!file) return;
  try {
    if (!(await ensureLibraryConnection())) throw new Error('Local Library is not available.');
    const JSZip = await loadZipEngine();
    if (els.libraryBackupProgress) els.libraryBackupProgress.textContent = 'Reading PDF folder ZIP…';
    const zip = await JSZip.loadAsync(file);
    const entries = Object.values(zip.files).filter(entry => !entry.dir && /\.pdf$/i.test(entry.name) && !entry.name.startsWith('__MACOSX/'));
    if (!entries.length) throw new Error('No PDF files were found in this ZIP.');
    if (entries.length > 1000) throw new Error('This ZIP contains more than 1000 PDFs; split it into smaller archives before importing.');
    const baseFolderId = state.libraryFolderId || null;
    const pathFolderIds = new Map([['', baseFolderId]]);
    let completed = 0;
    const sorted = entries.sort((a,b) => a.name.localeCompare(b.name));
    for (const entry of sorted) {
      const parts = safeArchivePathParts(entry.unsafeOriginalName || entry.name);
      const filename = parts.pop();
      let path = ''; let parentId = baseFolderId;
      for (const segment of parts) {
        path = path ? `${path}/${segment}` : segment;
        if (!pathFolderIds.has(path)) pathFolderIds.set(path, await ensureLibraryChildFolder(segment, parentId));
        parentId = pathFolderIds.get(path);
      }
      completed++;
      if (els.libraryBackupProgress) els.libraryBackupProgress.textContent = `Importing PDF ${completed} of ${sorted.length}: ${filename}`;
      const bytes = await entry.async('uint8array');
      const pdfFile = new File([bytes], filename, { type:'application/pdf' });
      await importPdfFileDirectToLibrary(pdfFile, parentId);
      await new Promise(resolve => setTimeout(resolve, 0));
    }
    state.workspaceMode='export'; await refreshLibraryRecords(); renderAll({saveState:false}); renderLibraryDocumentList();
    if (els.libraryBackupProgress) els.libraryBackupProgress.textContent = `Imported ${completed} PDF${completed===1?'':'s'} and recreated their folder structure.`;
    setStatus(`Imported ${completed} PDFs from ZIP`);
  } catch(err) {
    console.error(err); if(els.libraryBackupProgress) els.libraryBackupProgress.textContent=`PDF ZIP import failed: ${err?.message||err}`; setStatus(`PDF ZIP import failed: ${err?.message||err}`);
  } finally { if(els.libraryZipImportInput) els.libraryZipImportInput.value=''; }
}

function remapPageForImportedBackup(page, sourceMap, pageIdMap) {
  if (!page) return page;
  const oldId = page.id || uid('legacy-page');
  if (!pageIdMap.has(oldId)) pageIdMap.set(oldId, uid('page'));
  return { ...clonePageState(page), id: pageIdMap.get(oldId), sourceId: page.sourceId ? sourceMap.get(page.sourceId) || null : null };
}

async function importEditableBackupAsSubtree(file) {
  if (!file) return;
  try {
    const JSZip=await loadZipEngine();
    if(els.libraryBackupProgress) els.libraryBackupProgress.textContent='Reading backup for subtree import…';
    const zip=await JSZip.loadAsync(file); const manifestFile=zip.file('manifest.json'); if(!manifestFile) throw new Error('The ZIP does not contain a PDF Workbench manifest.json.');
    const manifest=JSON.parse(await manifestFile.async('string')); validateLibraryBackupManifest(manifest);
    if(!(await ensureLibraryConnection())) throw new Error('Local Library is not available.');
    const stem=String(file.name||'Imported Backup').replace(/\.pwbbackup\.zip$/i,'').replace(/\.zip$/i,'') || 'Imported Backup';
    const rootName=await requestLibraryName({title:'Import backup as folder',help:'The backup will be added beneath the current Library folder without replacing existing documents.',suggested:stem,saveLabel:'Import backup'});
    if(!rootName) return;
    const rootId=await createLibraryChildFolderAlways(rootName,state.libraryFolderId||null);
    const sourceMap=new Map(); const sourceRecords=[];
    let i=0;
    for(const source of manifest.sources){
      i++; if(els.libraryBackupProgress) els.libraryBackupProgress.textContent=`Reading backup source ${i} of ${manifest.sources.length}…`;
      const entry=zip.file(source.path); if(!entry) throw new Error(`Backup payload ${source.path} is missing.`);
      const data=await entry.async('arraybuffer'); const newId=uid('src'); sourceMap.set(source.id,newId);
      sourceRecords.push({id:newId,schemaVersion:LIBRARY_SCHEMA_VERSION,type:source.type,name:source.name||'source',size:data.byteLength,mimeType:source.mimeType||(source.type==='pdf'?'application/pdf':'application/octet-stream'),data});
    }
    const folderMap=new Map();
    for(const folder of manifest.folders) folderMap.set(folder.id,uid('folder'));
    const importedFolders=manifest.folders.map(folder=>({
      ...folder,id:folderMap.get(folder.id),schemaVersion:LIBRARY_SCHEMA_VERSION,
      parentId:folder.parentId ? (folderMap.get(folder.parentId)||rootId) : rootId,
      trashBatchId:folder.trashBatchId ? (folderMap.get(folder.trashBatchId)||null) : null,
    }));
    const documentMap=new Map(manifest.documents.map(record=>[record.id,uid('doc')]));
    const importedDocuments=manifest.documents.map(record=>{
      const pageIdMap=new Map(); const pages=(record.pages||[]).map(page=>remapPageForImportedBackup(page,sourceMap,pageIdMap));
      const remapSnapshot=snapshot=>(snapshot||[]).map(page=>remapPageForImportedBackup(page,sourceMap,pageIdMap));
      const folderId=record.folderId ? (folderMap.get(record.folderId)||rootId) : rootId;
      return {...record,id:documentMap.get(record.id),schemaVersion:LIBRARY_SCHEMA_VERSION,folderId,
        pages,selected:(record.selected||[]).map(id=>pageIdMap.get(id)).filter(Boolean),selectionAnchorId:pageIdMap.get(record.selectionAnchorId)||null,
        activePageId:pageIdMap.get(record.activePageId)||pages[0]?.id||null,history:(record.history||[]).map(remapSnapshot),future:(record.future||[]).map(remapSnapshot),
        singleView:record.singleView?{...record.singleView,activePageId:pageIdMap.get(record.singleView.activePageId)||pages[0]?.id||null}:record.singleView,
        trashBatchId:record.trashBatchId ? (folderMap.get(record.trashBatchId)||null) : null,
      };
    });
    const existingTemplateNames=new Set(state.templates.map(t=>String(t.name).toLocaleLowerCase()));
    const importedTemplates=[];
    for(const template of manifest.meta?.templates?.templates||[]){
      let base=String(template.name||'Template'); let name=base; let n=2; while(existingTemplateNames.has(name.toLocaleLowerCase())) name=`${base} ${n++}`; existingTemplateNames.add(name.toLocaleLowerCase());
      importedTemplates.push({id:uid('template'),name,page:remapPageForImportedBackup(template.page,sourceMap,new Map()),createdAt:Date.now(),modifiedAt:Date.now()});
    }
    const tx=state.libraryDb.transaction(['documents','sources','folders'],'readwrite'); const done=idbTransactionDone(tx); const ds=tx.objectStore('documents'),ss=tx.objectStore('sources'),fs=tx.objectStore('folders');
    for(const source of sourceRecords) ss.put(source); for(const folder of importedFolders) fs.put(folder); for(const record of importedDocuments) ds.put(record); await done;
    state.templates.push(...importedTemplates); await libraryPut('meta',serializeTemplatesForLibrary());
    await refreshLibraryRecords(); renderInsertTemplateList(); renderLibraryDocumentList();
    if(els.libraryBackupProgress) els.libraryBackupProgress.textContent=`Imported backup as “${libraryFolderById(rootId)?.name||rootName}”: ${importedDocuments.length} documents, ${importedFolders.length} subfolders, ${importedTemplates.length} templates.`;
    setStatus('Backup imported as Library subtree');
  } catch(err){console.error(err);if(els.libraryBackupProgress) els.libraryBackupProgress.textContent=`Backup subtree import failed: ${err?.message||err}`;setStatus(`Backup import failed: ${err?.message||err}`);}
  finally { if(els.libraryRestoreInput) els.libraryRestoreInput.value=''; state.pendingBackupImportMode='replace'; }
}

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
function hasPageCanvasOverride(page) { return Number.isFinite(page?.canvasWidth) && page.canvasWidth > 0 && Number.isFinite(page?.canvasHeight) && page.canvasHeight > 0; }
function pageCoreCanvasBaseDimensions(page) {
  return hasPageCanvasOverride(page) ? { width: page.canvasWidth, height: page.canvasHeight } : { width: page.width, height: page.height };
}
function pageEdgeAdjustments(page) {
  const clean = (value) => Number.isFinite(value) ? value : 0;
  return {
    top: clean(page?.edgeTop),
    right: clean(page?.edgeRight),
    bottom: clean(page?.edgeBottom),
    left: clean(page?.edgeLeft),
  };
}
function hasPageEdgeAdjustments(page) {
  const edge = pageEdgeAdjustments(page);
  return Math.abs(edge.top) > 0.001 || Math.abs(edge.right) > 0.001 || Math.abs(edge.bottom) > 0.001 || Math.abs(edge.left) > 0.001;
}
function pageCanvasBaseDimensions(page) {
  const core = pageCoreCanvasBaseDimensions(page);
  const edge = pageEdgeAdjustments(page);
  return {
    width: Math.max(1, core.width + edge.left + edge.right),
    height: Math.max(1, core.height + edge.top + edge.bottom),
  };
}
function pageDisplayDimensions(page) {
  const base = pageCanvasBaseDimensions(page);
  return page.rotation % 180 === 0 ? base : { width: base.height, height: base.width };
}
function displayEdgeAdjustments(page) {
  const e = pageEdgeAdjustments(page);
  const rotation = ((page?.rotation || 0) % 360 + 360) % 360;
  if (rotation === 90) return { top: e.left, right: e.top, bottom: e.right, left: e.bottom };
  if (rotation === 180) return { top: e.bottom, right: e.left, bottom: e.top, left: e.right };
  if (rotation === 270) return { top: e.right, right: e.bottom, bottom: e.left, left: e.top };
  return { ...e };
}
function displayedEdgesToBase(page, displayed) {
  const d = displayed;
  const rotation = ((page?.rotation || 0) % 360 + 360) % 360;
  if (rotation === 90) return { top: d.right, right: d.bottom, bottom: d.left, left: d.top };
  if (rotation === 180) return { top: d.bottom, right: d.left, bottom: d.top, left: d.right };
  if (rotation === 270) return { top: d.left, right: d.top, bottom: d.right, left: d.bottom };
  return { ...d };
}
function displayedEdgesToRawPdf(displayed, inheritedRotation=0) {
  const d = displayed;
  const rotation = ((inheritedRotation || 0) % 360 + 360) % 360;
  if (rotation === 90) return { top: d.right, right: d.bottom, bottom: d.left, left: d.top };
  if (rotation === 180) return { top: d.bottom, right: d.left, bottom: d.top, left: d.right };
  if (rotation === 270) return { top: d.left, right: d.top, bottom: d.right, left: d.bottom };
  return { ...d };
}


// ---------------------------------------------------------------------------
// Milestone 5.0 annotation core
// ---------------------------------------------------------------------------
const PEN_COLORS = ['#111111','#1565c0','#d32f2f','#2e7d32','#ef6c00'];
const PEN_WIDTHS = [1.5, 3, 5.5];
const HIGHLIGHTER_COLORS = ['#ffeb3b','#ff80ab','#4dd0e1','#81c784'];
const HIGHLIGHTER_WIDTHS = [8, 14, 22];
const HIGHLIGHTER_OPACITY = 0.34;
const ERASER_SIZES = [12, 24, 40];

function isStylusAnnotationTool(tool=state.annotationTool) {
  return tool === 'pen' || tool === 'highlighter' || tool === 'eraser' || tool === 'select';
}

function normalizedQuarterTurn(value=0) {
  return (((Math.round(Number(value) || 0) % 360) + 360) % 360);
}
function annotationsForPage(page) {
  if (!Array.isArray(page?.annotations)) page.annotations = [];
  return page.annotations;
}
function hasPageAnnotations(page) {
  return Array.isArray(page?.annotations) && page.annotations.some(stroke => Array.isArray(stroke?.points) && stroke.points.length);
}
function basePointToDisplay(page, point) {
  const base = pageCanvasBaseDimensions(page);
  const x = Number(point?.x) || 0, y = Number(point?.y) || 0;
  const rotation = normalizedQuarterTurn(page?.rotation);
  if (rotation === 90) return { x: base.height - y, y: x };
  if (rotation === 180) return { x: base.width - x, y: base.height - y };
  if (rotation === 270) return { x: y, y: base.width - x };
  return { x, y };
}
function displayPointToBase(page, point) {
  const base = pageCanvasBaseDimensions(page);
  const x = Number(point?.x) || 0, y = Number(point?.y) || 0;
  const rotation = normalizedQuarterTurn(page?.rotation);
  if (rotation === 90) return { x: y, y: base.height - x };
  if (rotation === 180) return { x: base.width - x, y: base.height - y };
  if (rotation === 270) return { x: base.width - y, y: x };
  return { x, y };
}
function eventPointOnPage(stage, page, event) {
  const rect = stage?.getBoundingClientRect?.();
  if (!rect || rect.width <= 0 || rect.height <= 0) return null;
  const display = pageDisplayDimensions(page);
  const dx = clamp((event.clientX - rect.left) * display.width / rect.width, 0, display.width);
  const dy = clamp((event.clientY - rect.top) * display.height / rect.height, 0, display.height);
  const point = displayPointToBase(page, { x: dx, y: dy });
  const base = pageCanvasBaseDimensions(page);
  return { x: clamp(point.x, 0, base.width), y: clamp(point.y, 0, base.height) };
}
// Milestone 5.4.0: restrained cardinal-spline rendering. Raw sampled points
// remain the authoritative editable geometry for erasing, lasso transforms,
// persistence, Undo/Redo, and future editing. Smoothing is derived only when
// drawing/exporting so the input path and object model stay unchanged.
const INK_SMOOTHING_FACTOR = 0.13;
const INK_SMOOTHING_HANDLE_CAP = 0.58;
function smoothStrokeControls(points, segmentIndex) {
  const count = points?.length || 0;
  if (count < 2 || segmentIndex < 0 || segmentIndex >= count - 1) return null;
  const p0 = points[Math.max(0, segmentIndex - 1)];
  const p1 = points[segmentIndex];
  const p2 = points[segmentIndex + 1];
  const p3 = points[Math.min(count - 1, segmentIndex + 2)];
  let c1 = {
    x: p1.x + (p2.x - p0.x) * INK_SMOOTHING_FACTOR,
    y: p1.y + (p2.y - p0.y) * INK_SMOOTHING_FACTOR,
  };
  let c2 = {
    x: p2.x - (p3.x - p1.x) * INK_SMOOTHING_FACTOR,
    y: p2.y - (p3.y - p1.y) * INK_SMOOTHING_FACTOR,
  };
  // Dense stylus samples normally keep these handles short already. Cap them
  // relative to the current raw segment so a very uneven sample interval or a
  // sharp reversal cannot create a loop/large overshoot away from the eraser's
  // underlying raw geometry.
  const segmentLength = Math.hypot(p2.x - p1.x, p2.y - p1.y);
  const maxHandle = segmentLength * INK_SMOOTHING_HANDLE_CAP;
  const capFrom = (anchor, control) => {
    const dx = control.x - anchor.x, dy = control.y - anchor.y;
    const length = Math.hypot(dx, dy);
    if (!maxHandle || length <= maxHandle || length < 1e-9) return control;
    const scale = maxHandle / length;
    return { x: anchor.x + dx * scale, y: anchor.y + dy * scale };
  };
  c1 = capFrom(p1, c1);
  c2 = capFrom(p2, c2);
  return { p1, p2, c1, c2 };
}
function traceSmoothedStrokeCanvas(ctx, page, points) {
  if (!ctx || !Array.isArray(points) || !points.length) return;
  const first = basePointToDisplay(page, points[0]);
  ctx.moveTo(first.x, first.y);
  if (points.length === 1) return;
  if (points.length === 2) {
    const second = basePointToDisplay(page, points[1]);
    ctx.lineTo(second.x, second.y);
    return;
  }
  for (let i = 0; i < points.length - 1; i++) {
    const controls = smoothStrokeControls(points, i);
    if (!controls) continue;
    const c1 = basePointToDisplay(page, controls.c1);
    const c2 = basePointToDisplay(page, controls.c2);
    const p2 = basePointToDisplay(page, controls.p2);
    ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, p2.x, p2.y);
  }
}
function traceRawStrokeCanvas(ctx, page, points) {
  if (!ctx || !Array.isArray(points) || !points.length) return;
  const first = basePointToDisplay(page, points[0]);
  ctx.moveTo(first.x, first.y);
  for (let i = 1; i < points.length; i++) {
    const point = basePointToDisplay(page, points[i]);
    ctx.lineTo(point.x, point.y);
  }
}
function drawPageAnnotationsCanvas(page, ctx, pixelWidth, pixelHeight, options={}) {
  if (!ctx || !hasPageAnnotations(page)) return;
  const smooth = options.smooth !== false;
  const isolateHighlighter = smooth && options.isolateHighlighter !== false;
  const excludedStrokeId = options.excludeStrokeId || null;
  const display = pageDisplayDimensions(page);
  const sx = pixelWidth / Math.max(1, display.width);
  const sy = pixelHeight / Math.max(1, display.height);
  let highlighterScratch = null;
  let highlighterScratchCtx = null;

  const ensureHighlighterScratch = () => {
    if (!highlighterScratch) {
      highlighterScratch = document.createElement('canvas');
      highlighterScratch.width = pixelWidth;
      highlighterScratch.height = pixelHeight;
      highlighterScratchCtx = highlighterScratch.getContext('2d');
    }
    return highlighterScratchCtx;
  };
  const drawStrokeGeometry = (targetCtx, stroke, points, useSmooth, opacity) => {
    const width = Math.max(.25, Number(stroke.width) || 3);
    const color = stroke.color || '#111111';
    const first = basePointToDisplay(page, points[0]);
    targetCtx.save();
    targetCtx.scale(sx, sy);
    targetCtx.globalAlpha = opacity;
    targetCtx.strokeStyle = color;
    targetCtx.fillStyle = color;
    targetCtx.lineWidth = width;
    targetCtx.lineCap = 'round';
    targetCtx.lineJoin = 'round';
    if (points.length === 1) {
      targetCtx.beginPath();
      targetCtx.arc(first.x, first.y, width / 2, 0, Math.PI * 2);
      targetCtx.fill();
    } else {
      targetCtx.beginPath();
      if (useSmooth) traceSmoothedStrokeCanvas(targetCtx, page, points);
      else traceRawStrokeCanvas(targetCtx, page, points);
      targetCtx.stroke();
    }
    targetCtx.restore();
  };

  for (const stroke of page.annotations) {
    if (excludedStrokeId && stroke?.id === excludedStrokeId) continue;
    const points = Array.isArray(stroke?.points) ? stroke.points : [];
    if (!points.length) continue;
    const opacity = clamp(Number(stroke.opacity ?? 1), 0, 1);

    // A highlighter stroke is composited once as a translucent object. Drawing
    // its raw sampled geometry directly with globalAlpha can darken tiny
    // backtracks/self-overlaps on Canvas, producing the visible sample "beads"
    // that do not appear in the PDF. Build that one stroke opaquely on a scratch
    // canvas, then alpha-composite the finished stroke once onto the annotation
    // layer. During an active eraser gesture smooth:false bypasses this more
    // expensive polish path in favor of the established fast redraw.
    if (stroke.tool === 'highlighter' && opacity < 1 && isolateHighlighter) {
      const scratchCtx = ensureHighlighterScratch();
      if (scratchCtx) {
        scratchCtx.clearRect(0, 0, pixelWidth, pixelHeight);
        drawStrokeGeometry(scratchCtx, stroke, points, false, 1);
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.drawImage(highlighterScratch, 0, 0);
        ctx.restore();
        continue;
      }
    }

    // Pen retains restrained cardinal-spline smoothing. Highlighter remains a
    // continuous raw polyline; eraser fast redraw can force every tool raw.
    drawStrokeGeometry(ctx, stroke, points, smooth && stroke.tool !== 'highlighter', opacity);
  }
}
function ensureAnnotationOverlay(stage, baseCanvas=null) {
  if (!stage) return null;
  const base = baseCanvas || stage.querySelector('canvas:not(.annotation-canvas):not(.live-highlighter-canvas)');
  if (!base?.width || !base?.height) return null;
  let overlay = stage.querySelector('canvas.annotation-canvas');
  if (!overlay) {
    overlay = document.createElement('canvas');
    overlay.className = 'annotation-canvas';
    overlay.setAttribute('aria-hidden', 'true');
    stage.append(overlay);
  }
  if (overlay.width !== base.width) overlay.width = base.width;
  if (overlay.height !== base.height) overlay.height = base.height;
  overlay.style.width = base.style.width || '100%';
  overlay.style.height = base.style.height || '100%';
  return overlay;
}
function redrawStageAnnotations(stage, page, options={}) {
  if (!stage || !page) return;
  const base = stage.querySelector('canvas:not(.annotation-canvas):not(.live-highlighter-canvas)');
  const overlay = ensureAnnotationOverlay(stage, base);
  if (!overlay) return;
  const ctx = overlay.getContext('2d');
  ctx.clearRect(0, 0, overlay.width, overlay.height);
  drawPageAnnotationsCanvas(page, ctx, overlay.width, overlay.height, options);
  redrawStageAnnotationSelection(stage, page);
}
function redrawPageAnnotationOverlays(page, options={}) {
  if (!page?.id) return;
  const selector = `.page-stage[data-page-id="${CSS.escape(page.id)}"]`;
  for (const stage of document.querySelectorAll(selector)) redrawStageAnnotations(stage, page, options);
}
function drawLiveInkSegment(stage, page, stroke, fromPoint, toPoint) {
  // Retained for the immediate first two samples of an opaque Pen stroke. From
  // the third sample onward drawLiveSmoothedInkProgress() adds finalized cubic
  // segments, keeping latency essentially identical to the raw polyline path.
  const drawOnStage = targetStage => {
    const baseCanvas = targetStage?.querySelector?.('canvas:not(.annotation-canvas):not(.live-highlighter-canvas)');
    const canvas = ensureAnnotationOverlay(targetStage, baseCanvas);
    if (!canvas?.width || !canvas?.height || targetStage.dataset.rendered !== 'true') return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const display = pageDisplayDimensions(page);
    const sx = canvas.width / Math.max(1, display.width);
    const sy = canvas.height / Math.max(1, display.height);
    const a = basePointToDisplay(page, fromPoint);
    const b = basePointToDisplay(page, toPoint);
    ctx.save();
    ctx.scale(sx, sy);
    ctx.globalAlpha = clamp(Number(stroke.opacity ?? 1), 0, 1);
    ctx.strokeStyle = stroke.color || '#111111';
    ctx.fillStyle = stroke.color || '#111111';
    ctx.lineWidth = Math.max(.25, Number(stroke.width) || 3);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    if (Math.hypot(b.x - a.x, b.y - a.y) < .001) {
      ctx.beginPath();
      ctx.arc(a.x, a.y, ctx.lineWidth / 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
    ctx.restore();
  };
  drawOnStage(stage);
  const selector = `.page-stage[data-page-id="${CSS.escape(page.id)}"]`;
  for (const other of document.querySelectorAll(selector)) if (other !== stage) drawOnStage(other);
}
function ensureLiveHighlighterOverlay(stage, baseCanvas=null, opacity=HIGHLIGHTER_OPACITY) {
  if (!stage) return null;
  const base = baseCanvas || stage.querySelector('canvas:not(.annotation-canvas):not(.live-highlighter-canvas)');
  if (!base?.width || !base?.height) return null;
  let overlay = stage.querySelector('canvas.live-highlighter-canvas');
  if (!overlay) {
    overlay = document.createElement('canvas');
    overlay.className = 'live-highlighter-canvas';
    overlay.setAttribute('aria-hidden', 'true');
    stage.append(overlay);
  }
  if (overlay.width !== base.width) overlay.width = base.width;
  if (overlay.height !== base.height) overlay.height = base.height;
  overlay.style.width = base.style.width || '100%';
  overlay.style.height = base.style.height || '100%';
  overlay.style.opacity = String(clamp(Number(opacity ?? HIGHLIGHTER_OPACITY), 0, 1));
  return overlay;
}
function clearLiveHighlighterOverlays(page) {
  if (!page?.id) return;
  const selector = `.page-stage[data-page-id="${CSS.escape(page.id)}"] > canvas.live-highlighter-canvas`;
  for (const overlay of document.querySelectorAll(selector)) overlay.remove();
}
function drawLiveHighlighterSegment(stage, page, stroke, fromPoint, toPoint) {
  // The live Highlighter has its own temporary canvas. Its geometry is drawn
  // opaquely and the canvas element carries the stroke opacity, so overlapping
  // incremental segments do not create dark sample joints. This also avoids
  // clearing/redrawing every Pen and Highlighter already on the page for every
  // Pencil move.
  const drawOnStage = targetStage => {
    const baseCanvas = targetStage?.querySelector?.('canvas:not(.annotation-canvas):not(.live-highlighter-canvas)');
    const canvas = ensureLiveHighlighterOverlay(targetStage, baseCanvas, stroke.opacity);
    if (!canvas?.width || !canvas?.height || targetStage.dataset.rendered !== 'true') return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const display = pageDisplayDimensions(page);
    const sx = canvas.width / Math.max(1, display.width);
    const sy = canvas.height / Math.max(1, display.height);
    const a = basePointToDisplay(page, fromPoint);
    const b = basePointToDisplay(page, toPoint);
    ctx.save();
    ctx.scale(sx, sy);
    ctx.globalAlpha = 1;
    ctx.strokeStyle = stroke.color || '#ffeb3b';
    ctx.fillStyle = stroke.color || '#ffeb3b';
    ctx.lineWidth = Math.max(.25, Number(stroke.width) || 14);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    if (Math.hypot(b.x-a.x,b.y-a.y) < .001) {
      ctx.beginPath();
      ctx.arc(a.x, a.y, ctx.lineWidth / 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
    ctx.restore();
  };
  drawOnStage(stage);
  const selector = `.page-stage[data-page-id="${CSS.escape(page.id)}"]`;
  for (const other of document.querySelectorAll(selector)) if (other !== stage) drawOnStage(other);
}

function drawLiveSmoothedInkProgress(stage, page, stroke) {
  const points = stroke?.points || [];
  const count = points.length;
  if (!count) return;
  // A dot must appear immediately. With two samples, show the first tiny line
  // immediately; its opaque overdraw is cleared by the final smooth redraw.
  if (count === 1) {
    drawLiveInkSegment(stage, page, stroke, points[0], points[0]);
    return;
  }
  if (count === 2) {
    drawLiveInkSegment(stage, page, stroke, points[0], points[1]);
    return;
  }
  // The newly arrived point finalizes the preceding cardinal segment. This
  // leaves only one raw-sample interval of visual tail latency (typically a
  // few milliseconds), avoiding a whole-page redraw while handwriting.
  const segmentIndex = count - 3;
  const controls = smoothStrokeControls(points, segmentIndex);
  if (!controls) return;
  const drawOnStage = targetStage => {
    const baseCanvas = targetStage?.querySelector?.('canvas:not(.annotation-canvas):not(.live-highlighter-canvas)');
    const canvas = ensureAnnotationOverlay(targetStage, baseCanvas);
    if (!canvas?.width || !canvas?.height || targetStage.dataset.rendered !== 'true') return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const display = pageDisplayDimensions(page);
    const sx = canvas.width / Math.max(1, display.width);
    const sy = canvas.height / Math.max(1, display.height);
    const p1 = basePointToDisplay(page, controls.p1);
    const p2 = basePointToDisplay(page, controls.p2);
    const c1 = basePointToDisplay(page, controls.c1);
    const c2 = basePointToDisplay(page, controls.c2);
    ctx.save();
    ctx.scale(sx, sy);
    ctx.globalAlpha = clamp(Number(stroke.opacity ?? 1), 0, 1);
    ctx.strokeStyle = stroke.color || '#111111';
    ctx.lineWidth = Math.max(.25, Number(stroke.width) || 3);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, p2.x, p2.y);
    ctx.stroke();
    ctx.restore();
  };
  drawOnStage(stage);
  const selector = `.page-stage[data-page-id="${CSS.escape(page.id)}"]`;
  for (const other of document.querySelectorAll(selector)) if (other !== stage) drawOnStage(other);
}


// ---------------------------------------------------------------------------
// Milestone 5.2 annotation selection / lasso / manipulation
// ---------------------------------------------------------------------------
function selectedAnnotationPage() {
  const sel = state.annotationSelection;
  if (!sel?.pageId || sel.documentId !== state.currentDocumentId) return null;
  return pageById(sel.pageId);
}
function selectedAnnotations(page=selectedAnnotationPage()) {
  if (!page) return [];
  const ids = state.annotationSelection?.ids || new Set();
  return annotationsForPage(page).filter(annotation => ids.has(annotation.id));
}
function clearAnnotationSelection(redraw=true) {
  const oldPageId = state.annotationSelection?.pageId || null;
  state.annotationSelection = { documentId:null, pageId:null, ids:new Set() };
  if (redraw && oldPageId) {
    for (const stage of document.querySelectorAll(`.page-stage[data-page-id="${CSS.escape(oldPageId)}"]`)) {
      const page = pageById(oldPageId);
      if (page) redrawStageAnnotationSelection(stage, page);
      else stage.querySelector('svg.annotation-selection-layer')?.remove();
    }
  }
  updateSelectionToolbar();
}
function setAnnotationSelection(page, ids, options={}) {
  const normalized = new Set(ids || []);
  const existing = new Set(annotationsForPage(page).map(annotation => annotation.id));
  for (const id of [...normalized]) if (!existing.has(id)) normalized.delete(id);
  state.annotationSelection = {
    documentId: state.currentDocumentId,
    pageId: normalized.size ? page.id : null,
    ids: normalized,
  };
  if (options.redraw !== false) redrawPageAnnotationSelectionOverlays(page);
  updateSelectionToolbar();
}
function reconcileAnnotationSelection() {
  const page = selectedAnnotationPage();
  if (!page) {
    if (state.annotationSelection?.ids?.size) clearAnnotationSelection(false);
    updateSelectionToolbar();
    return;
  }
  const available = new Set(annotationsForPage(page).map(annotation => annotation.id));
  const ids = new Set([...state.annotationSelection.ids].filter(id => available.has(id)));
  if (ids.size !== state.annotationSelection.ids.size) setAnnotationSelection(page, ids);
  else updateSelectionToolbar();
}
function annotationDisplayBounds(page, annotations) {
  const list = annotations || [];
  let minX=Infinity, minY=Infinity, maxX=-Infinity, maxY=-Infinity;
  for (const annotation of list) {
    const half = Math.max(.125, Number(annotation?.width) || 0) / 2;
    for (const raw of annotation?.points || []) {
      const point = basePointToDisplay(page, raw);
      minX = Math.min(minX, point.x-half);
      minY = Math.min(minY, point.y-half);
      maxX = Math.max(maxX, point.x+half);
      maxY = Math.max(maxY, point.y+half);
    }
  }
  return Number.isFinite(minX) ? { minX, minY, maxX, maxY, width:maxX-minX, height:maxY-minY } : null;
}
function annotationBaseBounds(annotations) {
  let minX=Infinity, minY=Infinity, maxX=-Infinity, maxY=-Infinity;
  for (const annotation of annotations || []) {
    const half = Math.max(.125, Number(annotation?.width) || 0) / 2;
    for (const point of annotation?.points || []) {
      minX = Math.min(minX, point.x-half);
      minY = Math.min(minY, point.y-half);
      maxX = Math.max(maxX, point.x+half);
      maxY = Math.max(maxY, point.y+half);
    }
  }
  return Number.isFinite(minX) ? { minX, minY, maxX, maxY, width:maxX-minX, height:maxY-minY } : null;
}
function ensureSelectionOverlay(stage, page) {
  if (!stage || !page) return null;
  let svg = stage.querySelector('svg.annotation-selection-layer');
  if (!svg) {
    svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('annotation-selection-layer');
    svg.setAttribute('aria-hidden','true');
    stage.append(svg);
  }
  const display = pageDisplayDimensions(page);
  svg.setAttribute('viewBox', `0 0 ${display.width} ${display.height}`);
  svg.setAttribute('preserveAspectRatio', 'none');
  return svg;
}
function redrawStageAnnotationSelection(stage, page) {
  if (!stage || !page) return;
  const activeSelection = state.annotationTool === 'select' &&
    state.annotationSelection?.documentId === state.currentDocumentId &&
    state.annotationSelection?.pageId === page.id;
  const activeLasso = state.annotationTool === 'select' &&
    state.selectionGesture?.mode === 'lasso' &&
    state.selectionGesture?.pageId === page.id;
  let svg = stage.querySelector('svg.annotation-selection-layer');
  if (!activeSelection && !activeLasso) {
    svg?.remove();
    return;
  }
  svg = ensureSelectionOverlay(stage, page);
  if (!svg) return;
  svg.replaceChildren();
  const display = pageDisplayDimensions(page);
  const rect = stage.getBoundingClientRect();
  const cssToDisplay = display.width / Math.max(1, rect.width);

  if (activeLasso) {
    const points = state.selectionGesture.points || [];
    if (points.length) {
      const path = document.createElementNS('http://www.w3.org/2000/svg','path');
      const d = points.map((raw,index) => {
        const point = basePointToDisplay(page, raw);
        return `${index ? 'L' : 'M'} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
      }).join(' ');
      path.setAttribute('d', d + (points.length > 2 ? ' Z' : ''));
      path.setAttribute('class','annotation-lasso-path');
      svg.append(path);
    }
  }

  if (activeSelection) {
    const annotations = selectedAnnotations(page);
    const bounds = annotationDisplayBounds(page, annotations);
    if (!bounds) return;
    const box = document.createElementNS('http://www.w3.org/2000/svg','rect');
    box.setAttribute('x', String(bounds.minX));
    box.setAttribute('y', String(bounds.minY));
    box.setAttribute('width', String(Math.max(.01,bounds.width)));
    box.setAttribute('height', String(Math.max(.01,bounds.height)));
    box.setAttribute('rx', String(2.5 * cssToDisplay));
    box.setAttribute('class','annotation-selection-box');
    svg.append(box);
    const radius = Math.max(4 * cssToDisplay, 6.5 * cssToDisplay);
    for (const [name,x,y] of [
      ['nw',bounds.minX,bounds.minY], ['ne',bounds.maxX,bounds.minY],
      ['sw',bounds.minX,bounds.maxY], ['se',bounds.maxX,bounds.maxY],
    ]) {
      const handle = document.createElementNS('http://www.w3.org/2000/svg','circle');
      handle.setAttribute('cx', String(x));
      handle.setAttribute('cy', String(y));
      handle.setAttribute('r', String(radius));
      handle.setAttribute('class','annotation-selection-handle');
      handle.dataset.handle = name;
      svg.append(handle);
    }
  }
}
function redrawPageAnnotationSelectionOverlays(page) {
  if (!page?.id) return;
  const selector = `.page-stage[data-page-id="${CSS.escape(page.id)}"]`;
  for (const stage of document.querySelectorAll(selector)) redrawStageAnnotationSelection(stage, page);
}
function selectionDisplayHit(stage, page, event) {
  if (state.annotationSelection?.pageId !== page.id || state.annotationSelection?.documentId !== state.currentDocumentId) return null;
  const bounds = annotationDisplayBounds(page, selectedAnnotations(page));
  if (!bounds) return null;
  const display = pageDisplayDimensions(page);
  const rect = stage.getBoundingClientRect();
  const px = event.clientX, py = event.clientY;
  const clientPoint = (x,y) => ({
    x: rect.left + x * rect.width / Math.max(1,display.width),
    y: rect.top + y * rect.height / Math.max(1,display.height),
  });
  const corners = {
    nw:clientPoint(bounds.minX,bounds.minY), ne:clientPoint(bounds.maxX,bounds.minY),
    sw:clientPoint(bounds.minX,bounds.maxY), se:clientPoint(bounds.maxX,bounds.maxY),
  };
  for (const [name,point] of Object.entries(corners)) {
    if (Math.hypot(px-point.x, py-point.y) <= 15) return { mode:'resize', handle:name, bounds };
  }
  const left = rect.left + bounds.minX * rect.width / Math.max(1,display.width);
  const right = rect.left + bounds.maxX * rect.width / Math.max(1,display.width);
  const top = rect.top + bounds.minY * rect.height / Math.max(1,display.height);
  const bottom = rect.top + bounds.maxY * rect.height / Math.max(1,display.height);
  if (px >= left-4 && px <= right+4 && py >= top-4 && py <= bottom+4) return { mode:'move', bounds };
  return null;
}
function pointInPolygon(point, polygon) {
  if (!polygon?.length) return false;
  let inside = false;
  for (let i=0,j=polygon.length-1; i<polygon.length; j=i++) {
    const a=polygon[i], b=polygon[j];
    if (pointOnSegment2(point,a,b,1e-5)) return true;
    const crosses = ((a.y > point.y) !== (b.y > point.y)) &&
      (point.x < (b.x-a.x) * (point.y-a.y) / ((b.y-a.y) || 1e-12) + a.x);
    if (crosses) inside = !inside;
  }
  return inside;
}
function strokeIntersectsPolygon(annotation, polygon) {
  const points = annotation?.points || [];
  if (!points.length || !polygon?.length) return false;
  if (points.some(point => pointInPolygon(point, polygon))) return true;
  const bounds = annotationBaseBounds([annotation]);
  if (bounds && pointInPolygon({x:(bounds.minX+bounds.maxX)/2,y:(bounds.minY+bounds.maxY)/2}, polygon)) return true;
  if (points.length < 2 || polygon.length < 2) return false;
  for (let i=1; i<points.length; i++) {
    for (let j=0; j<polygon.length; j++) {
      if (segmentsIntersect2(points[i-1], points[i], polygon[j], polygon[(j+1)%polygon.length])) return true;
    }
  }
  return false;
}
function annotationHitAt(page, point, radius) {
  let best=null, bestDistance=Infinity;
  for (const annotation of annotationsForPage(page)) {
    const points = annotation?.points || [];
    if (!points.length) continue;
    const tolerance = Math.max(2, radius + (Number(annotation.width)||0)/2);
    let distance = Infinity;
    if (points.length === 1) distance = Math.hypot(point.x-points[0].x, point.y-points[0].y);
    else for (let i=1; i<points.length; i++) distance = Math.min(distance, pointSegmentDistance(point, points[i-1], points[i]));
    if (distance <= tolerance && distance < bestDistance) { best=annotation; bestDistance=distance; }
  }
  return best;
}
function selectionOriginals(page) {
  const ids = state.annotationSelection?.ids || new Set();
  return annotationsForPage(page).filter(annotation => ids.has(annotation.id)).map(cloneInkStroke);
}
function applyMoveSelectionGesture(gesture, event) {
  const page = gesture.page;
  const next = eventPointOnPage(gesture.stage, page, event);
  if (!next) return;
  const base = pageCanvasBaseDimensions(page);
  let dx = next.x - gesture.startPoint.x;
  let dy = next.y - gesture.startPoint.y;
  const bounds = gesture.baseBounds;
  dx = clamp(dx, -bounds.minX, base.width-bounds.maxX);
  dy = clamp(dy, -bounds.minY, base.height-bounds.maxY);
  const current = new Map(annotationsForPage(page).map(annotation => [annotation.id,annotation]));
  for (const original of gesture.originals) {
    const annotation = current.get(original.id);
    if (!annotation) continue;
    annotation.points = original.points.map(point => ({x:point.x+dx,y:point.y+dy}));
  }
  gesture.changed = Math.hypot(dx,dy) > .02;
  gesture.lastDelta = {dx,dy};
  redrawPageAnnotationOverlays(page);
}
function resizeCornerPoints(bounds, handle) {
  if (handle === 'nw') return { corner:{x:bounds.minX,y:bounds.minY}, anchor:{x:bounds.maxX,y:bounds.maxY} };
  if (handle === 'ne') return { corner:{x:bounds.maxX,y:bounds.minY}, anchor:{x:bounds.minX,y:bounds.maxY} };
  if (handle === 'sw') return { corner:{x:bounds.minX,y:bounds.maxY}, anchor:{x:bounds.maxX,y:bounds.minY} };
  return { corner:{x:bounds.maxX,y:bounds.maxY}, anchor:{x:bounds.minX,y:bounds.minY} };
}
function applyResizeSelectionGesture(gesture, event) {
  const page = gesture.page;
  const nextBase = eventPointOnPage(gesture.stage, page, event);
  if (!nextBase) return;
  const next = basePointToDisplay(page,nextBase);
  const { corner, anchor } = gesture.resizeFrame;
  const dx0 = corner.x-anchor.x, dy0 = corner.y-anchor.y;
  const denom = dx0*dx0 + dy0*dy0;
  if (denom < 1e-8) return;
  // Corner resize is proportional: handwriting and grouped objects keep their
  // shape instead of being independently stretched in x/y. Project the pointer
  // onto the original corner diagonal, then cap expansion at the page edges.
  const projected = ((next.x-anchor.x)*dx0 + (next.y-anchor.y)*dy0) / denom;
  const display = pageDisplayDimensions(page);
  const maxX = dx0 > 0 ? (display.width-anchor.x)/dx0 : (0-anchor.x)/dx0;
  const maxY = dy0 > 0 ? (display.height-anchor.y)/dy0 : (0-anchor.y)/dy0;
  const scale = clamp(projected, .08, Math.max(.08, Math.min(20,maxX,maxY)));
  const current = new Map(annotationsForPage(page).map(annotation => [annotation.id,annotation]));
  for (const original of gesture.originals) {
    const annotation = current.get(original.id);
    if (!annotation) continue;
    annotation.points = original.points.map(raw => {
      const point = basePointToDisplay(page,raw);
      return displayPointToBase(page,{x:anchor.x+(point.x-anchor.x)*scale,y:anchor.y+(point.y-anchor.y)*scale});
    });
    annotation.width = Math.max(.25,(Number(original.width)||3)*scale);
  }
  gesture.changed = Math.abs(scale-1) > .002;
  gesture.lastScale = {scale};
  redrawPageAnnotationOverlays(page);
}
function beginSelectionGesture(viewer,event) {
  if (state.annotationTool !== 'select') return false;
  if (event.pointerType === 'mouse' && event.button !== 0) return false;
  if (event.pointerType === 'pen' && event.button !== 0) {
    if (event.cancelable) event.preventDefault();
    addInkDiagnostic('selection-begin-non-tip-pen-button',event);
    return true;
  }
  if (event.pointerType === 'pen' && state.selectionGesture?.inputSource === 'stylus-touch' && !event._inkStylusTouch) {
    if (event.cancelable) event.preventDefault();
    addInkDiagnostic('pointer-shadowed-by-stylus-touch',event,{gesture:'select'});
    return true;
  }
  const stage=inkStageForEvent(viewer,event);
  if (!stage) return true;
  const page=pageById(stage.dataset.pageId);
  if (!page) return true;
  const first=eventPointOnPage(stage,page,event);
  if (!first) return true;
  const inputSource=event._inkStylusTouch?'stylus-touch':'pointer';
  const hit=selectionDisplayHit(stage,page,event);
  let gesture;
  if (hit?.mode === 'move' && selectedAnnotations(page).length) {
    const originals=selectionOriginals(page);
    gesture={mode:'move',pointerId:event.pointerId,inputSource,viewer,stage,page,pageId:page.id,documentId:state.currentDocumentId,startPoint:first,originals,baseBounds:annotationBaseBounds(originals),before:snapshotPages(),changed:false};
  } else if (hit?.mode === 'resize' && selectedAnnotations(page).length) {
    const originals=selectionOriginals(page);
    const bounds=annotationDisplayBounds(page,originals);
    gesture={mode:'resize',pointerId:event.pointerId,inputSource,viewer,stage,page,pageId:page.id,documentId:state.currentDocumentId,startPoint:first,originals,before:snapshotPages(),changed:false,handle:hit.handle,resizeFrame:resizeCornerPoints(bounds,hit.handle)};
  } else {
    const additive=!!(event.shiftKey||event.ctrlKey||event.metaKey);
    if (!additive && state.annotationSelection?.ids?.size) clearAnnotationSelection(true);
    gesture={mode:'lasso',pointerId:event.pointerId,inputSource,viewer,stage,page,pageId:page.id,documentId:state.currentDocumentId,points:[first],startClient:{x:event.clientX,y:event.clientY},maxClientDistance:0,additive};
  }
  state.activePageId=page.id;
  state.selectionGesture=gesture;
  if (event.cancelable) event.preventDefault();
  if (inputSource==='pointer') { try{viewer.setPointerCapture?.(event.pointerId);}catch{} }
  redrawPageAnnotationSelectionOverlays(page);
  addInkDiagnostic('selection-begin-accepted',event,{mode:gesture.mode});
  return true;
}
function continueSelectionGesture(viewer,event) {
  const gesture=state.selectionGesture;
  if (!gesture||gesture.pointerId!==event.pointerId||gesture.viewer!==viewer) return false;
  if (event.cancelable) event.preventDefault();
  if (gesture.mode==='move') applyMoveSelectionGesture(gesture,event);
  else if (gesture.mode==='resize') applyResizeSelectionGesture(gesture,event);
  else {
    const next=eventPointOnPage(gesture.stage,gesture.page,event);
    if (next) {
      const prev=gesture.points[gesture.points.length-1];
      if (!prev||Math.hypot(next.x-prev.x,next.y-prev.y)>.35) gesture.points.push(next);
      gesture.maxClientDistance=Math.max(gesture.maxClientDistance,Math.hypot(event.clientX-gesture.startClient.x,event.clientY-gesture.startClient.y));
      redrawPageAnnotationSelectionOverlays(gesture.page);
    }
  }
  return true;
}
function finishSelectionGesture(viewer,event) {
  const gesture=state.selectionGesture;
  if (!gesture||gesture.pointerId!==event.pointerId||gesture.viewer!==viewer) return false;
  if (event.cancelable) event.preventDefault();
  if (event.type==='pointercancel'||event.type==='touchcancel') {
    state.selectionGesture=null;
    if ((gesture.mode==='move'||gesture.mode==='resize')&&gesture.changed) restorePages(gesture.before);
    const restoredPage=pageById(gesture.pageId);
    if (restoredPage) redrawPageAnnotationSelectionOverlays(restoredPage);
    return true;
  }
  continueSelectionGesture(viewer,event);
  if (gesture.inputSource==='pointer') { try{viewer.releasePointerCapture?.(event.pointerId);}catch{} }
  state.selectionGesture=null;
  if (gesture.mode==='lasso') {
    let ids=new Set(gesture.additive&&state.annotationSelection?.pageId===gesture.page.id?[...state.annotationSelection.ids]:[]);
    if (gesture.maxClientDistance < 7) {
      const point=eventPointOnPage(gesture.stage,gesture.page,event)||gesture.points[0];
      const display=pageDisplayDimensions(gesture.page), rect=gesture.stage.getBoundingClientRect();
      const radius=11*display.width/Math.max(1,rect.width);
      const hit=annotationHitAt(gesture.page,point,radius);
      if (hit) {
        if (gesture.additive&&ids.has(hit.id)) ids.delete(hit.id); else ids.add(hit.id);
      } else if (!gesture.additive) ids.clear();
    } else if (gesture.points.length>=3) {
      for (const annotation of annotationsForPage(gesture.page)) if (strokeIntersectsPolygon(annotation,gesture.points)) ids.add(annotation.id);
    }
    setAnnotationSelection(gesture.page,ids);
    const count=ids.size;
    setStatus(count?`${count} annotation object${count===1?'':'s'} selected`:'No annotations selected');
  } else if (gesture.changed) {
    commitHistory(gesture.before);
    saveCurrentDocumentState({readViewDom:false});
    redrawPageAnnotationOverlays(gesture.page);
    setStatus(gesture.mode==='move'?'Moved selected annotations':'Resized selected annotations');
  } else {
    redrawPageAnnotationSelectionOverlays(gesture.page);
  }
  addInkDiagnostic('selection-finish-accepted',event,{mode:gesture.mode,changed:!!gesture.changed,selected:state.annotationSelection?.ids?.size||0});
  return true;
}
function annotationPayloadFromSelection(page=selectedAnnotationPage()) {
  const annotations=selectedAnnotations(page);
  const bounds=annotationDisplayBounds(page,annotations);
  if (!page||!annotations.length||!bounds) return null;
  const display=pageDisplayDimensions(page);
  return {
    sourceDocumentId:state.currentDocumentId,
    sourcePageId:page.id,
    sourceDisplay:{width:display.width,height:display.height},
    origin:{x:bounds.minX,y:bounds.minY},
    size:{width:bounds.width,height:bounds.height},
    items:annotations.map(annotation=>({
      ...cloneInkStroke(annotation),
      id:null,
      points:(annotation.points||[]).map(raw=>{
        const point=basePointToDisplay(page,raw);
        return {x:point.x-bounds.minX,y:point.y-bounds.minY};
      }),
    })),
  };
}
function instantiateAnnotationPayload(payload,page,origin) {
  if (!payload||!page) return [];
  const display=pageDisplayDimensions(page);
  let ox=Number(origin?.x)||0, oy=Number(origin?.y)||0;
  const width=Number(payload.size?.width)||0, height=Number(payload.size?.height)||0;
  ox=clamp(ox,0,Math.max(0,display.width-width));
  oy=clamp(oy,0,Math.max(0,display.height-height));
  return (payload.items||[]).map(item=>({
    ...item,
    id:uid(item.type==='ink'?'ink':'annotation'),
    points:(item.points||[]).map(point=>displayPointToBase(page,{x:ox+point.x,y:oy+point.y})),
  }));
}
function deleteSelectedAnnotations() {
  const page=selectedAnnotationPage();
  const ids=state.annotationSelection?.ids;
  if (!page||!ids?.size) return;
  const before=snapshotPages();
  page.annotations=annotationsForPage(page).filter(annotation=>!ids.has(annotation.id));
  const count=ids.size;
  clearAnnotationSelection(false);
  commitHistory(before);
  saveCurrentDocumentState({readViewDom:false});
  redrawPageAnnotationOverlays(page);
  updateSelectionToolbar();
  setStatus(`Deleted ${count} selected annotation${count===1?'':'s'}`);
}
function duplicateSelectedAnnotations() {
  const page=selectedAnnotationPage();
  const payload=annotationPayloadFromSelection(page);
  if (!page||!payload) return;
  const before=snapshotPages();
  const display=pageDisplayDimensions(page);
  const offset=Math.max(12,Math.min(22,display.width*.03));
  let origin={x:payload.origin.x+offset,y:payload.origin.y+offset};
  if (origin.x+payload.size.width>display.width&&payload.origin.x-offset>=0) origin.x=payload.origin.x-offset;
  if (origin.y+payload.size.height>display.height&&payload.origin.y-offset>=0) origin.y=payload.origin.y-offset;
  const clones=instantiateAnnotationPayload(payload,page,origin);
  annotationsForPage(page).push(...clones);
  setAnnotationSelection(page,new Set(clones.map(item=>item.id)),{redraw:false});
  commitHistory(before);
  saveCurrentDocumentState({readViewDom:false});
  redrawPageAnnotationOverlays(page);
  setStatus(`Duplicated ${clones.length} annotation object${clones.length===1?'':'s'}`);
}
function copySelectedAnnotations() {
  const payload=annotationPayloadFromSelection();
  if (!payload) return;
  state.annotationClipboard=payload;
  state.annotationPasteSerial=0;
  state.annotationPasteTargetKey=null;
  updateSelectionToolbar();
  const count=payload.items.length;
  setStatus(`Copied ${count} annotation object${count===1?'':'s'}`);
}
function activeAnnotationTargetPage() {
  if (state.splitView) {
    const pane=splitPaneState(state.activePaneId), view=paneView(state.activePaneId);
    if (pane?.documentId&&pane.documentId!==state.currentDocumentId) loadDocumentState(pane.documentId,false);
    if (view?.activePageId) state.activePageId=view.activePageId;
  }
  return pageById(state.activePageId)||state.pages[0]||null;
}
function pasteCopiedAnnotations() {
  const payload=state.annotationClipboard;
  const page=activeAnnotationTargetPage();
  if (!payload||!page) return;
  const before=snapshotPages();
  const display=pageDisplayDimensions(page);
  const samePage=payload.sourceDocumentId===state.currentDocumentId&&payload.sourcePageId===page.id;
  const targetKey=`${state.currentDocumentId || ''}:${page.id}`;
  if (state.annotationPasteTargetKey===targetKey) state.annotationPasteSerial += 1;
  else { state.annotationPasteTargetKey=targetKey; state.annotationPasteSerial=1; }
  const serial=state.annotationPasteSerial;
  const step=Math.max(12,Math.min(22,display.width*.03));
  let origin;
  if (samePage) {
    origin={x:payload.origin.x+step*serial,y:payload.origin.y+step*serial};
    if (origin.x+payload.size.width>display.width&&payload.origin.x-step*serial>=0) origin.x=payload.origin.x-step*serial;
    if (origin.y+payload.size.height>display.height&&payload.origin.y-step*serial>=0) origin.y=payload.origin.y-step*serial;
  } else {
    origin={
      x:(payload.origin.x/Math.max(1,payload.sourceDisplay.width))*display.width+step*Math.max(0,serial-1),
      y:(payload.origin.y/Math.max(1,payload.sourceDisplay.height))*display.height+step*Math.max(0,serial-1),
    };
  }
  const clones=instantiateAnnotationPayload(payload,page,origin);
  annotationsForPage(page).push(...clones);
  setAnnotationSelection(page,new Set(clones.map(item=>item.id)),{redraw:false});
  commitHistory(before);
  saveCurrentDocumentState({readViewDom:false});
  redrawPageAnnotationOverlays(page);
  setStatus(`Pasted ${clones.length} annotation object${clones.length===1?'':'s'}`);
}
function updateSelectionToolbar() {
  const active=state.annotationTool==='select';
  els.selectionActionGroup?.classList.toggle('hidden',!active);
  const count=state.annotationSelection?.documentId===state.currentDocumentId?(state.annotationSelection?.ids?.size||0):0;
  if (els.selectionDeleteBtn) els.selectionDeleteBtn.disabled=!count;
  if (els.selectionDuplicateBtn) els.selectionDuplicateBtn.disabled=!count;
  if (els.selectionCopyBtn) els.selectionCopyBtn.disabled=!count;
  if (els.selectionPasteBtn) els.selectionPasteBtn.disabled=!state.annotationClipboard?.items?.length;
}

function updateInkToolbar() {
  const tool = ['hand','pen','highlighter','eraser','select'].includes(state.annotationTool) ? state.annotationTool : 'hand';
  els.inkHandBtn?.classList.toggle('active', tool === 'hand');
  els.inkPenBtn?.classList.toggle('active', tool === 'pen');
  els.inkHighlighterBtn?.classList.toggle('active', tool === 'highlighter');
  els.inkEraserBtn?.classList.toggle('active', tool === 'eraser');
  els.inkSelectBtn?.classList.toggle('active', tool === 'select');
  els.inkHandBtn?.setAttribute('aria-pressed', String(tool === 'hand'));
  els.inkPenBtn?.setAttribute('aria-pressed', String(tool === 'pen'));
  els.inkHighlighterBtn?.setAttribute('aria-pressed', String(tool === 'highlighter'));
  els.inkEraserBtn?.setAttribute('aria-pressed', String(tool === 'eraser'));
  els.inkSelectBtn?.setAttribute('aria-pressed', String(tool === 'select'));
  document.body.classList.toggle('ink-pen-active', isStylusAnnotationTool(tool));
  document.body.classList.toggle('ink-highlighter-active', tool === 'highlighter');
  document.body.classList.toggle('ink-eraser-active', tool === 'eraser');
  document.body.classList.toggle('ink-select-active', tool === 'select');
  els.penColorGroup?.classList.toggle('hidden', tool !== 'pen');
  els.penWidthGroup?.classList.toggle('hidden', tool !== 'pen');
  els.highlighterColorGroup?.classList.toggle('hidden', tool !== 'highlighter');
  els.highlighterWidthGroup?.classList.toggle('hidden', tool !== 'highlighter');
  els.eraserSizeGroup?.classList.toggle('hidden', tool !== 'eraser');
  if (isStylusAnnotationTool(tool)) clearNativeSelection();
  if (tool !== 'eraser') hideEraserCursor();
  for (const button of els.penColorGroup?.querySelectorAll?.('[data-ink-color]') || []) {
    const active = button.dataset.inkColor === state.penColor;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  }
  for (const button of els.penWidthGroup?.querySelectorAll?.('[data-ink-width]') || []) {
    const active = Math.abs(Number(button.dataset.inkWidth) - Number(state.penWidth)) < .01;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  }
  for (const button of els.highlighterColorGroup?.querySelectorAll?.('[data-highlighter-color]') || []) {
    const active = button.dataset.highlighterColor === state.highlighterColor;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  }
  for (const button of els.highlighterWidthGroup?.querySelectorAll?.('[data-highlighter-width]') || []) {
    const active = Math.abs(Number(button.dataset.highlighterWidth) - Number(state.highlighterWidth)) < .01;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  }
  for (const button of els.eraserSizeGroup?.querySelectorAll?.('[data-eraser-size]') || []) {
    const active = Math.abs(Number(button.dataset.eraserSize) - Number(state.eraserSize)) < .01;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  }
  updateSelectionToolbar();
}
function setAnnotationTool(tool) {
  const next = ['pen','highlighter','eraser','select'].includes(tool) ? tool : 'hand';
  if (state.annotationTool === 'select' && next !== 'select') {
    state.selectionGesture = null;
    clearAnnotationSelection(true);
  }
  state.annotationTool = next;
  savePref('pdfwb-annotation-tool', state.annotationTool);
  updateInkToolbar();
  if (next === 'select') {
    const page = selectedAnnotationPage();
    if (page) redrawPageAnnotationSelectionOverlays(page);
  }
}
function setPenColor(color) {
  if (!PEN_COLORS.includes(color)) return;
  state.penColor = color;
  savePref('pdfwb-pen-color', color);
  setAnnotationTool('pen');
}
function setPenWidth(width) {
  const chosen = PEN_WIDTHS.find(value => Math.abs(value - Number(width)) < .01);
  if (!chosen) return;
  state.penWidth = chosen;
  savePref('pdfwb-pen-width', String(chosen));
  setAnnotationTool('pen');
}
function setHighlighterColor(color) {
  if (!HIGHLIGHTER_COLORS.includes(color)) return;
  state.highlighterColor = color;
  savePref('pdfwb-highlighter-color', color);
  setAnnotationTool('highlighter');
}
function setHighlighterWidth(width) {
  const chosen = HIGHLIGHTER_WIDTHS.find(value => Math.abs(value - Number(width)) < .01);
  if (!chosen) return;
  state.highlighterWidth = chosen;
  savePref('pdfwb-highlighter-width', String(chosen));
  setAnnotationTool('highlighter');
}
function setEraserSize(size) {
  const chosen = ERASER_SIZES.find(value => Math.abs(value - Number(size)) < .01);
  if (!chosen) return;
  state.eraserSize = chosen;
  savePref('pdfwb-eraser-size', String(chosen));
  setAnnotationTool('eraser');
}
function appendInkPoint(gesture, event, drawLive=true) {
  const page = pageById(gesture.pageId);
  if (!page || page !== gesture.page || !gesture.stage?.isConnected) return null;
  const next = eventPointOnPage(gesture.stage, page, event);
  if (!next) return null;
  const points = gesture.stroke.points;
  const previous = points[points.length - 1];
  if (previous && Math.hypot(next.x - previous.x, next.y - previous.y) < .18) return null;
  points.push(next);
  if (drawLive) drawLiveSmoothedInkProgress(gesture.stage, page, gesture.stroke);
  return next;
}
function inkStageForEvent(viewer, event) {
  let stage = event.target instanceof Element ? event.target.closest('.page-stage[data-page-id]') : null;
  // iPad/WebKit can occasionally retarget the first event of a Pencil contact
  // to the scrolling viewer rather than the page child beneath the Pencil.
  // Resolve the page geometrically as a fallback so that one retargeted event
  // does not cost the entire short stroke.
  if (!stage && Number.isFinite(event.clientX) && Number.isFinite(event.clientY)) {
    const hit = document.elementFromPoint?.(event.clientX, event.clientY);
    stage = hit instanceof Element ? hit.closest('.page-stage[data-page-id]') : null;
  }
  if (!stage || !viewer.contains(stage) || stage.dataset.rendered !== 'true') return null;
  return stage;
}
function beginInkGesture(viewer, event) {
  if (state.annotationTool !== 'pen' && state.annotationTool !== 'highlighter') return false;
  if (event.pointerType === 'mouse' && event.button !== 0) return false;
  // Cross-platform testing now shows ordinary Apple Pencil, Surface Pen, and
  // ChromeOS stylus tip contacts arriving as button 0. Do not treat a barrel/
  // secondary pen button as a normal ink start. The Safari stylus TouchEvent
  // fallback also synthesizes button 0 for a real Pencil tip contact.
  if (event.pointerType === 'pen' && event.button !== 0) {
    if (event.cancelable) event.preventDefault();
    addInkDiagnostic('handler-begin-non-tip-pen-button', event);
    return true;
  }
  // If a TouchEvent fallback already owns this Apple Pencil contact, ignore the
  // duplicate PointerEvent stream instead of creating a second stroke.
  if (event.pointerType === 'pen' && state.inkGesture?.inputSource === 'stylus-touch' && !event._inkStylusTouch) {
    if (event.cancelable) event.preventDefault();
    addInkDiagnostic('pointer-shadowed-by-stylus-touch', event);
    return true;
  }
  const stage = inkStageForEvent(viewer, event);
  if (!stage) { addInkDiagnostic('handler-begin-stage-miss', event); return true; }
  const page = pageById(stage.dataset.pageId);
  if (!page) { addInkDiagnostic('handler-begin-page-miss', event); return true; }
  const first = eventPointOnPage(stage, page, event);
  if (!first) { addInkDiagnostic('handler-begin-point-miss', event); return true; }
  const drawingTool = state.annotationTool;
  const stroke = {
    id: uid('ink'),
    type: 'ink',
    tool: drawingTool,
    color: drawingTool === 'highlighter' ? state.highlighterColor : state.penColor,
    width: drawingTool === 'highlighter' ? state.highlighterWidth : state.penWidth,
    opacity: drawingTool === 'highlighter' ? HIGHLIGHTER_OPACITY : 1,
    points: [first],
  };
  const before = snapshotPages();
  annotationsForPage(page).push(stroke);
  state.activePageId = page.id;
  const inputSource = event._inkStylusTouch ? 'stylus-touch' : 'pointer';
  state.inkGesture = { pointerId: event.pointerId, inputSource, viewer, stage, page, pageId: page.id, documentId: state.currentDocumentId, stroke, before };
  if (event.cancelable) event.preventDefault();
  if (inputSource === 'pointer') {
    try { viewer.setPointerCapture?.(event.pointerId); } catch {}
  }
  if (drawingTool === 'highlighter') {
    // Keep existing annotations frozen on the persistent overlay while this
    // translucent stroke is drawn incrementally on its own temporary layer.
    redrawPageAnnotationOverlays(page, { excludeStrokeId: stroke.id });
    drawLiveHighlighterSegment(stage, page, stroke, first, first);
  } else drawLiveInkSegment(stage, page, stroke, first, first);
  addInkDiagnostic('handler-begin-accepted', event, { strokeId:stroke.id });
  return true;
}
function continueInkGesture(viewer, event) {
  const gesture = state.inkGesture;
  if (!gesture || gesture.pointerId !== event.pointerId || gesture.viewer !== viewer) return false;
  if (event.cancelable) event.preventDefault();
  const samples = typeof event.getCoalescedEvents === 'function' ? event.getCoalescedEvents() : null;
  const translucent = gesture.stroke?.tool === 'highlighter';
  const appendSample = sample => {
    const previous = gesture.stroke.points[gesture.stroke.points.length - 1] || null;
    const added = appendInkPoint(gesture, sample, !translucent);
    if (translucent && added) drawLiveHighlighterSegment(gesture.stage, gesture.page, gesture.stroke, previous || added, added);
  };
  if (samples?.length) for (const sample of samples) appendSample(sample);
  else appendSample(event);
  return true;
}
function finishInkGesture(viewer, event) {
  const gesture = state.inkGesture;
  if (!gesture || gesture.pointerId !== event.pointerId || gesture.viewer !== viewer) return false;
  if (event.cancelable) event.preventDefault();
  const translucent = gesture.stroke?.tool === 'highlighter';
  appendInkPoint(gesture, event, !translucent);
  // Commit a live Highlighter stroke to the persistent annotation layer only
  // once, on release/cancel. Pen still clears its provisional tail here and
  // receives the normal completed smoothed redraw.
  if (translucent) clearLiveHighlighterOverlays(gesture.page);
  redrawPageAnnotationOverlays(gesture.page);
  if (gesture.inputSource === 'pointer') {
    try { viewer.releasePointerCapture?.(event.pointerId); } catch {}
  }
  state.inkGesture = null;
  if (!gesture.stroke.points.length) return true;
  addInkDiagnostic('handler-finish-accepted', event, { strokeId:gesture.stroke.id, points:gesture.stroke.points.length });
  commitHistory(gesture.before);
  saveCurrentDocumentState({ readViewDom: false });
  return true;
}
// Milestone 5.1.0: partial-stroke vector eraser. The eraser edits the
// stored page-local polyline geometry instead of painting white pixels. A pass
// splits any intersected stroke into ordinary surviving stroke fragments, so
// Undo/Redo, PDF export, duplication, and the upcoming selection tool continue
// to operate on real vector objects.
function pointSegmentDistance(point, a, b) {
  const vx = b.x - a.x, vy = b.y - a.y;
  const wx = point.x - a.x, wy = point.y - a.y;
  const vv = vx * vx + vy * vy;
  if (vv < 1e-12) return Math.hypot(wx, wy);
  const t = clamp((wx * vx + wy * vy) / vv, 0, 1);
  return Math.hypot(point.x - (a.x + vx * t), point.y - (a.y + vy * t));
}
function cross2(a, b, c) {
  return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}
function pointOnSegment2(point, a, b, eps=1e-7) {
  return Math.abs(cross2(a, b, point)) <= eps &&
    point.x >= Math.min(a.x,b.x) - eps && point.x <= Math.max(a.x,b.x) + eps &&
    point.y >= Math.min(a.y,b.y) - eps && point.y <= Math.max(a.y,b.y) + eps;
}
function segmentsIntersect2(a, b, c, d) {
  const c1 = cross2(a,b,c), c2 = cross2(a,b,d), c3 = cross2(c,d,a), c4 = cross2(c,d,b);
  if (((c1 > 0 && c2 < 0) || (c1 < 0 && c2 > 0)) && ((c3 > 0 && c4 < 0) || (c3 < 0 && c4 > 0))) return true;
  return pointOnSegment2(c,a,b) || pointOnSegment2(d,a,b) || pointOnSegment2(a,c,d) || pointOnSegment2(b,c,d);
}
function segmentSegmentDistance(a, b, c, d) {
  if (segmentsIntersect2(a,b,c,d)) return 0;
  return Math.min(pointSegmentDistance(a,c,d), pointSegmentDistance(b,c,d), pointSegmentDistance(c,a,b), pointSegmentDistance(d,a,b));
}
function interpolatePoint(a, b, t) {
  return { x:a.x + (b.x-a.x)*t, y:a.y + (b.y-a.y)*t };
}
function appendDistinctPoint(points, point) {
  const prev = points[points.length - 1];
  if (!prev || Math.hypot(point.x-prev.x, point.y-prev.y) > .01) points.push({ x:point.x, y:point.y });
}
function eraserBoundaryPoint(a, b, aInside, eraseA, eraseB, radius) {
  let lo = 0, hi = 1;
  for (let i=0; i<10; i++) {
    const mid = (lo + hi) / 2;
    const inside = pointSegmentDistance(interpolatePoint(a,b,mid), eraseA, eraseB) <= radius;
    if (inside === aInside) lo = mid; else hi = mid;
  }
  return interpolatePoint(a,b,(lo+hi)/2);
}
function eraseStrokeAlongSegment(stroke, eraseA, eraseB, eraserRadius) {
  const source = Array.isArray(stroke?.points) ? stroke.points : [];
  if (!source.length) return { changed:false, fragments:[stroke] };
  const cutRadius = Math.max(.1, eraserRadius + Math.max(.125, Number(stroke.width) || 3) / 2);
  if (source.length === 1) {
    if (pointSegmentDistance(source[0], eraseA, eraseB) > cutRadius) return { changed:false, fragments:[stroke] };
    return { changed:true, fragments:[] };
  }

  const expanded = [{ x:source[0].x, y:source[0].y }];
  for (let i=1; i<source.length; i++) {
    const a = source[i-1], b = source[i];
    if (segmentSegmentDistance(a,b,eraseA,eraseB) > cutRadius) {
      appendDistinctPoint(expanded, b);
      continue;
    }
    const length = Math.hypot(b.x-a.x, b.y-a.y);
    const spacing = clamp(cutRadius / 5, .65, 1.5);
    const pieces = clamp(Math.ceil(length / spacing), 2, 80);
    for (let j=1; j<=pieces; j++) appendDistinctPoint(expanded, interpolatePoint(a,b,j/pieces));
  }

  const inside = expanded.map(point => pointSegmentDistance(point, eraseA, eraseB) <= cutRadius);
  if (!inside.some(Boolean)) return { changed:false, fragments:[stroke] };

  const pointRuns = [];
  let run = [];
  for (let i=0; i<expanded.length; i++) {
    const pnt = expanded[i];
    if (!inside[i]) {
      if (!run.length && i > 0 && inside[i-1]) {
        appendDistinctPoint(run, eraserBoundaryPoint(expanded[i-1], pnt, true, eraseA, eraseB, cutRadius));
      }
      appendDistinctPoint(run, pnt);
      continue;
    }
    if (run.length) {
      if (i > 0 && !inside[i-1]) appendDistinctPoint(run, eraserBoundaryPoint(expanded[i-1], pnt, false, eraseA, eraseB, cutRadius));
      pointRuns.push(run);
      run = [];
    }
  }
  if (run.length) pointRuns.push(run);

  const fragments = pointRuns
    .filter(points => points.length && (points.length > 1 || pointSegmentDistance(points[0], eraseA, eraseB) > cutRadius))
    .map((points, index) => ({ ...stroke, id:index === 0 ? stroke.id : uid('ink'), points }));
  return { changed:true, fragments };
}
function erasePageAnnotationsAlong(page, eraseA, eraseB, eraserDiameter=state.eraserSize) {
  if (!page || !hasPageAnnotations(page)) return false;
  const radius = Math.max(1, Number(eraserDiameter) || 24) / 2;
  let changed = false;
  const next = [];
  for (const annotation of annotationsForPage(page)) {
    if (!Array.isArray(annotation?.points) || !annotation.points.length || annotation.type !== 'ink') {
      next.push(annotation);
      continue;
    }
    const result = eraseStrokeAlongSegment(annotation, eraseA, eraseB, radius);
    if (result.changed) changed = true;
    next.push(...result.fragments);
  }
  if (!changed) return false;
  page.annotations = next;
  return true;
}
function ensureEraserCursor() {
  if (state.eraserCursor?.isConnected) return state.eraserCursor;
  const cursor = document.createElement('div');
  cursor.className = 'eraser-cursor hidden';
  cursor.setAttribute('aria-hidden','true');
  document.body.append(cursor);
  state.eraserCursor = cursor;
  return cursor;
}
function hideEraserCursor() {
  state.eraserCursor?.classList.add('hidden');
}
function updateEraserCursor(viewer, event) {
  if (state.annotationTool !== 'eraser' || event.pointerType === 'touch') { hideEraserCursor(); return; }
  const stage = inkStageForEvent(viewer, event);
  if (!stage) { hideEraserCursor(); return; }
  const page = pageById(stage.dataset.pageId);
  const rect = stage.getBoundingClientRect();
  if (!page || !rect.width) { hideEraserCursor(); return; }
  const display = pageDisplayDimensions(page);
  const cssDiameter = Math.max(5, state.eraserSize * rect.width / Math.max(1, display.width));
  const cursor = ensureEraserCursor();
  cursor.style.width = `${cssDiameter}px`;
  cursor.style.height = `${cssDiameter}px`;
  cursor.style.left = `${event.clientX - cssDiameter/2}px`;
  cursor.style.top = `${event.clientY - cssDiameter/2}px`;
  cursor.classList.remove('hidden');
}
function beginEraserGesture(viewer, event) {
  if (state.annotationTool !== 'eraser') return false;
  if (event.pointerType === 'mouse' && event.button !== 0) return false;
  if (event.pointerType === 'pen' && event.button !== 0) {
    if (event.cancelable) event.preventDefault();
    addInkDiagnostic('eraser-begin-non-tip-pen-button', event);
    return true;
  }
  if (event.pointerType === 'pen' && state.eraserGesture?.inputSource === 'stylus-touch' && !event._inkStylusTouch) {
    if (event.cancelable) event.preventDefault();
    addInkDiagnostic('pointer-shadowed-by-stylus-touch', event, { gesture:'eraser' });
    return true;
  }
  const stage = inkStageForEvent(viewer, event);
  if (!stage) { addInkDiagnostic('eraser-begin-stage-miss', event); return true; }
  const page = pageById(stage.dataset.pageId);
  if (!page) return true;
  const first = eventPointOnPage(stage, page, event);
  if (!first) return true;
  const inputSource = event._inkStylusTouch ? 'stylus-touch' : 'pointer';
  const before = snapshotPages();
  state.activePageId = page.id;
  state.eraserGesture = { pointerId:event.pointerId, inputSource, viewer, stage, page, pageId:page.id, documentId:state.currentDocumentId, before, lastPoint:first, changed:false };
  if (event.cancelable) event.preventDefault();
  if (inputSource === 'pointer') { try { viewer.setPointerCapture?.(event.pointerId); } catch {} }
  if (erasePageAnnotationsAlong(page, first, first)) {
    state.eraserGesture.changed = true;
    // Erasing repeatedly clears and redraws the annotation overlay. During the
    // gesture use the authoritative raw polyline geometry (the same geometry
    // the eraser edits) so iPad does not have to recompute every cubic spline
    // on every Pencil move. The completed smooth appearance is restored on up.
    redrawPageAnnotationOverlays(page, { smooth:false });
  }
  addInkDiagnostic('eraser-begin-accepted', event, { changed:state.eraserGesture.changed, size:state.eraserSize });
  return true;
}
function appendEraserPoint(gesture, event) {
  const page = pageById(gesture.pageId);
  if (!page || page !== gesture.page || !gesture.stage?.isConnected) return false;
  const next = eventPointOnPage(gesture.stage, page, event);
  if (!next) return false;
  if (Math.hypot(next.x-gesture.lastPoint.x, next.y-gesture.lastPoint.y) < .12) return false;
  const changed = erasePageAnnotationsAlong(page, gesture.lastPoint, next);
  if (changed) gesture.changed = true;
  gesture.lastPoint = next;
  return changed;
}
function continueEraserGesture(viewer, event) {
  const gesture = state.eraserGesture;
  if (!gesture || gesture.pointerId !== event.pointerId || gesture.viewer !== viewer) return false;
  if (event.cancelable) event.preventDefault();
  let changed = false;
  const samples = typeof event.getCoalescedEvents === 'function' ? event.getCoalescedEvents() : null;
  if (samples?.length) for (const sample of samples) changed = appendEraserPoint(gesture, sample) || changed;
  else changed = appendEraserPoint(gesture, event);
  if (changed) redrawPageAnnotationOverlays(gesture.page, { smooth:false });
  return true;
}
function finishEraserGesture(viewer, event) {
  const gesture = state.eraserGesture;
  if (!gesture || gesture.pointerId !== event.pointerId || gesture.viewer !== viewer) return false;
  if (event.cancelable) event.preventDefault();
  const finalChanged = appendEraserPoint(gesture, event);
  // Always restore the normal smoothed render at the end of an eraser pass.
  // This keeps the low-cost raw redraw strictly transient.
  if (gesture.changed || finalChanged) redrawPageAnnotationOverlays(gesture.page);
  if (gesture.inputSource === 'pointer') { try { viewer.releasePointerCapture?.(event.pointerId); } catch {} }
  state.eraserGesture = null;
  addInkDiagnostic('eraser-finish-accepted', event, { changed:gesture.changed, size:state.eraserSize });
  if (gesture.changed) {
    commitHistory(gesture.before);
    saveCurrentDocumentState({ readViewDom:false });
    // Thumbnail previews are not live overlays; refresh them after a completed
    // eraser gesture rather than during every eraser sample.
    if (state.workspaceMode === 'organize') renderOrganizer();
  }
  return true;
}
function activeStylusTouchGesture() {
  if (state.inkGesture?.inputSource === 'stylus-touch') return state.inkGesture;
  if (state.eraserGesture?.inputSource === 'stylus-touch') return state.eraserGesture;
  if (state.selectionGesture?.inputSource === 'stylus-touch') return state.selectionGesture;
  return null;
}

function handleDocumentInkPointer(viewer, event) {
  if (event.pointerType === 'touch') return false;
  updateEraserCursor(viewer, event);
  if (event.pointerType === 'pen' && activeStylusTouchGesture()) {
    if (event.cancelable) event.preventDefault();
    if (event.type === 'pointerdown' || event.type === 'pointerup' || event.type === 'pointercancel') {
      addInkDiagnostic('pointer-shadowed-by-stylus-touch', event, { gesture:state.annotationTool });
    }
    return true;
  }
  if (event.type === 'pointerdown') {
    if (event.pointerType === 'pen' && !isStylusAnnotationTool()) {
      if (event.cancelable) event.preventDefault();
      try { viewer.setPointerCapture?.(event.pointerId); } catch {}
      return true;
    }
    if (event.pointerType === 'pen' || event.pointerType === 'mouse') {
      if (state.annotationTool === 'eraser') return beginEraserGesture(viewer, event);
      if (state.annotationTool === 'select') return beginSelectionGesture(viewer, event);
      if (state.annotationTool === 'pen' || state.annotationTool === 'highlighter') return beginInkGesture(viewer, event);
    }
    return false;
  }
  if (event.type === 'pointermove') {
    if (continueInkGesture(viewer, event)) return true;
    if (continueEraserGesture(viewer, event)) return true;
    if (continueSelectionGesture(viewer, event)) return true;
    if (event.pointerType === 'pen') {
      if (event.cancelable && (event.buttons || event.pressure > 0)) event.preventDefault();
      return true;
    }
    return false;
  }
  if (event.type === 'pointerup' || event.type === 'pointercancel') {
    if (finishInkGesture(viewer, event)) return true;
    if (finishEraserGesture(viewer, event)) return true;
    if (finishSelectionGesture(viewer, event)) return true;
    if (event.pointerType === 'pen') {
      if (event.cancelable) event.preventDefault();
      try { viewer.releasePointerCapture?.(event.pointerId); } catch {}
      return true;
    }
  }
  return false;
}
// Milestone 5.0.8: iPad Safari fallback for whole Apple Pencil contacts that
// never appear in the PointerEvent stream. Safari also exposes Touch Events and
// identifies Apple Pencil touches with Touch.touchType === 'stylus'. Pointer
// Events remain the normal path. A stylus TouchEvent starts ink only when no
// pointer-owned ink gesture is already active; if the TouchEvent arrives first,
// the corresponding PointerEvents are shadowed until that touch ends.
function stylusTouchEventLike(touchEvent, touch, type) {
  const ending = type === 'touchend' || type === 'touchcancel';
  return {
    type,
    pointerType: 'pen',
    pointerId: `stylus-touch-${touch.identifier}`,
    isPrimary: true,
    button: 0,
    buttons: ending ? 0 : 1,
    pressure: Number.isFinite(touch.force) ? touch.force : (ending ? 0 : .08),
    clientX: touch.clientX,
    clientY: touch.clientY,
    target: touch.target || touchEvent.target,
    cancelable: touchEvent.cancelable,
    preventDefault: () => { if (touchEvent.cancelable) touchEvent.preventDefault(); },
    _inkStylusTouch: true,
  };
}
function viewerForStylusTouch(touch) {
  let target = touch?.target instanceof Element ? touch.target : null;
  if ((!target || !target.closest?.('.viewer, .split-pane-viewer')) && Number.isFinite(touch?.clientX) && Number.isFinite(touch?.clientY)) {
    const hit = document.elementFromPoint?.(touch.clientX, touch.clientY);
    if (hit instanceof Element) target = hit;
  }
  return target?.closest?.('.viewer, .split-pane-viewer') || null;
}
function bindStylusTouchInkFallback() {
  if (!('TouchEvent' in window)) return;
  const activeGesture = () => state.inkGesture || state.eraserGesture || state.selectionGesture;
  const beginForTool = (tool, viewer, synthetic) => tool === 'eraser' ? beginEraserGesture(viewer, synthetic) : tool === 'select' ? beginSelectionGesture(viewer, synthetic) : beginInkGesture(viewer, synthetic);
  const continueForTool = (tool, viewer, synthetic) => tool === 'eraser' ? continueEraserGesture(viewer, synthetic) : tool === 'select' ? continueSelectionGesture(viewer, synthetic) : continueInkGesture(viewer, synthetic);
  const finishForTool = (tool, viewer, synthetic) => tool === 'eraser' ? finishEraserGesture(viewer, synthetic) : tool === 'select' ? finishSelectionGesture(viewer, synthetic) : finishInkGesture(viewer, synthetic);

  document.addEventListener('touchstart', (event) => {
    if (!isStylusAnnotationTool()) return;
    for (const touch of event.changedTouches || []) {
      if (touch.touchType !== 'stylus') continue;
      const viewer = viewerForStylusTouch(touch);
      if (!viewer) continue;
      if (event.cancelable) event.preventDefault();
      const synthetic = stylusTouchEventLike(event, touch, 'touchstart');
      const tool = state.annotationTool;
      addInkDiagnostic('raw-stylus-touch-start', synthetic, { touchId:touch.identifier, gesture:tool });
      if (activeGesture()) {
        state.stylusTouchContacts.set(touch.identifier, { mode:'shadow', viewer, tool });
        addInkDiagnostic('stylus-touch-shadowed-by-pointer', synthetic, { touchId:touch.identifier, gesture:tool });
        continue;
      }
      state.stylusTouchContacts.set(touch.identifier, { mode:'fallback', viewer, tool });
      if (beginForTool(tool, viewer, synthetic)) {
        addInkDiagnostic('stylus-touch-fallback-begin', synthetic, { touchId:touch.identifier, gesture:tool });
      }
    }
  }, { capture:true, passive:false });

  document.addEventListener('touchmove', (event) => {
    let handled = false;
    for (const touch of event.changedTouches || []) {
      const contact = state.stylusTouchContacts.get(touch.identifier);
      if (!contact) continue;
      handled = true;
      if (contact.mode !== 'fallback') continue;
      const synthetic = stylusTouchEventLike(event, touch, 'touchmove');
      continueForTool(contact.tool, contact.viewer, synthetic);
    }
    if (handled && event.cancelable) event.preventDefault();
  }, { capture:true, passive:false });

  const finish = (event, cancelled) => {
    let handled = false;
    for (const touch of event.changedTouches || []) {
      const contact = state.stylusTouchContacts.get(touch.identifier);
      if (!contact) continue;
      handled = true;
      const synthetic = stylusTouchEventLike(event, touch, cancelled ? 'touchcancel' : 'touchend');
      addInkDiagnostic(cancelled ? 'raw-stylus-touch-cancel' : 'raw-stylus-touch-end', synthetic, { touchId:touch.identifier, mode:contact.mode, gesture:contact.tool });
      if (contact.mode === 'fallback') finishForTool(contact.tool, contact.viewer, synthetic);
      state.stylusTouchContacts.delete(touch.identifier);
    }
    if (handled && event.cancelable) event.preventDefault();
  };
  document.addEventListener('touchend', event => finish(event, false), { capture:true, passive:false });
  document.addEventListener('touchcancel', event => finish(event, true), { capture:true, passive:false });
}

// Milestone 5.0.7: while an ink tool is active in the viewer, Pencil input must
// win over WebKit's native text-selection machinery. iPadOS was first observed
// selecting a toolbar glyph and, after that region was protected, selecting
// footer text instead. That shows the failure is not tied to one element: a
// Pencil stream can leak into native selection and WebKit may retarget the
// selection elsewhere in the app. Suppress selection/callouts at the input-mode
// level while Pen is active. Hand/View mode deliberately does not use this
// document-wide guard so future intentional text selection can remain possible.
function inkBlocksNativeSelection() {
  return isStylusAnnotationTool() &&
    (state.workspaceMode === 'view' || document.body.classList.contains('presentation'));
}
function clearNativeSelection() {
  const selection = document.getSelection?.();
  if (selection?.rangeCount) selection.removeAllRanges();
}
function bindInkNativeSelectionGuard() {
  document.addEventListener('selectstart', (event) => {
    if (!inkBlocksNativeSelection()) return;
    event.preventDefault();
    clearNativeSelection();
  }, { capture: true, passive: false });
  document.addEventListener('contextmenu', (event) => {
    if (!inkBlocksNativeSelection()) return;
    event.preventDefault();
    clearNativeSelection();
  }, { capture: true, passive: false });
  document.addEventListener('selectionchange', () => {
    if (inkBlocksNativeSelection()) clearNativeSelection();
  });
}

function shiftPageAnnotations(page, dx, dy) {
  if (!hasPageAnnotations(page)) return;
  for (const stroke of page.annotations) for (const point of stroke.points || []) {
    point.x += dx;
    point.y += dy;
  }
}
function fitPageAnnotationsToCanvas(page, oldBase, newBase) {
  if (!hasPageAnnotations(page) || !oldBase || !newBase) return;
  const fit = Math.min(newBase.width / Math.max(1, oldBase.width), newBase.height / Math.max(1, oldBase.height));
  const offsetX = (newBase.width - oldBase.width * fit) / 2;
  const offsetY = (newBase.height - oldBase.height * fit) / 2;
  for (const stroke of page.annotations) {
    for (const point of stroke.points || []) {
      point.x = point.x * fit + offsetX;
      point.y = point.y * fit + offsetY;
    }
    stroke.width = Math.max(.25, Number(stroke.width || 3) * fit);
  }
}
function hexToPdfRgb(hex, rgb) {
  const value = String(hex || '#111111').replace('#','');
  const normalized = value.length === 3 ? value.split('').map(ch => ch + ch).join('') : value.padEnd(6,'0').slice(0,6);
  const n = Number.parseInt(normalized, 16);
  return rgb(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
}
function annotationPointToRawPdf(page, point, pdfPage, inheritedRotation=0) {
  const box = pdfPage.getCropBox?.() || pdfPage.getMediaBox?.() || { x: 0, y: 0, width: pdfPage.getWidth(), height: pdfPage.getHeight() };
  const rotation = normalizedQuarterTurn(inheritedRotation);
  const orientedW = rotation === 90 || rotation === 270 ? box.height : box.width;
  const orientedH = rotation === 90 || rotation === 270 ? box.width : box.height;
  const base = pageCanvasBaseDimensions(page);
  const u = clamp(Number(point?.x) || 0, 0, base.width) * orientedW / Math.max(1, base.width);
  const v = clamp(Number(point?.y) || 0, 0, base.height) * orientedH / Math.max(1, base.height);
  if (rotation === 90) return { x: box.x + v, y: box.y + u };
  if (rotation === 180) return { x: box.x + box.width - u, y: box.y + v };
  if (rotation === 270) return { x: box.x + box.width - v, y: box.y + box.height - u };
  return { x: box.x + u, y: box.y + box.height - v };
}
function drawPageAnnotationsPdf(pdfPage, page, inheritedRotation, pdfLib) {
  if (!hasPageAnnotations(page)) return;
  const { rgb, pushGraphicsState, popGraphicsState, setLineJoin, LineJoinStyle, LineCapStyle } = pdfLib;
  const pathNumber = value => {
    const n = Number(value) || 0;
    const rounded = Math.round(n * 10000) / 10000;
    return Object.is(rounded, -0) ? '0' : String(rounded);
  };
  for (const stroke of page.annotations) {
    const points = Array.isArray(stroke?.points) ? stroke.points : [];
    if (!points.length) continue;
    const color = hexToPdfRgb(stroke.color, rgb);
    const thickness = Math.max(.25, Number(stroke.width) || 3);
    const opacity = clamp(Number(stroke.opacity ?? 1), 0, 1);
    if (points.length === 1) {
      const p = annotationPointToRawPdf(page, points[0], pdfPage, inheritedRotation);
      pdfPage.drawCircle({ x: p.x, y: p.y, size: thickness / 2, color, opacity });
      continue;
    }

    // Export each annotation as ONE continuous PDF path: smoothed cubic geometry
    // for Pen and the raw continuous polyline for Highlighter. Before 5.0.2,
    // export emitted every sampled pair as an independent drawLine operation. At a
    // turn, the flat ends of those separate segments meet only at the center
    // line and can leave a visible white wedge on the inside of a wide curve.
    // drawSvgPath gives us a single stroked subpath; an enclosing round line
    // join plus a round cap makes its geometry match the Canvas renderer.
    // pdf-lib flips SVG Y coordinates internally, so negate the already-mapped
    // raw PDF y value to land at the same PDF coordinate after that transform.
    const first = annotationPointToRawPdf(page, points[0], pdfPage, inheritedRotation);
    let path = `M ${pathNumber(first.x)} ${pathNumber(-first.y)}`;
    if (stroke.tool === 'highlighter') {
      // Keep the highlighter as one continuous raw polyline in the PDF as well.
      // A single stroked path preserves round joins/caps and uniform opacity
      // without paying the cubic-spline cost that is useful for thin Pen ink.
      for (let i = 1; i < points.length; i++) {
        const point = annotationPointToRawPdf(page, points[i], pdfPage, inheritedRotation);
        path += ` L ${pathNumber(point.x)} ${pathNumber(-point.y)}`;
      }
    } else if (points.length === 2) {
      const second = annotationPointToRawPdf(page, points[1], pdfPage, inheritedRotation);
      path += ` L ${pathNumber(second.x)} ${pathNumber(-second.y)}`;
    } else {
      for (let i = 0; i < points.length - 1; i++) {
        const controls = smoothStrokeControls(points, i);
        if (!controls) continue;
        const c1 = annotationPointToRawPdf(page, controls.c1, pdfPage, inheritedRotation);
        const c2 = annotationPointToRawPdf(page, controls.c2, pdfPage, inheritedRotation);
        const p2 = annotationPointToRawPdf(page, controls.p2, pdfPage, inheritedRotation);
        path += ` C ${pathNumber(c1.x)} ${pathNumber(-c1.y)} ${pathNumber(c2.x)} ${pathNumber(-c2.y)} ${pathNumber(p2.x)} ${pathNumber(-p2.y)}`;
      }
    }

    pdfPage.pushOperators(pushGraphicsState(), setLineJoin(LineJoinStyle.Round));
    pdfPage.drawSvgPath(path, {
      x: 0,
      y: 0,
      borderColor: color,
      borderWidth: thickness,
      borderOpacity: opacity,
      borderLineCap: LineCapStyle.Round,
    });
    pdfPage.pushOperators(popGraphicsState());
  }
}
function activeIndex() { return Math.max(0, state.pages.findIndex(p => p.id === state.activePageId)); }
function pageById(id) { return state.pages.find(p => p.id === id); }


function currentDocument() {
  return state.documents.find(d => d.id === state.currentDocumentId) || null;
}

function saveCurrentDocumentState(options={}) {
  const { readViewDom = true, skipLibrarySchedule = false } = options;
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
  if (!skipLibrarySchedule) scheduleLibraryPersist(850);
}

function createDocument(name) {
  saveCurrentDocumentState();
  const doc = {
    id: uid('doc'), name: name || 'Untitled', pages: [], selected: new Set(), selectionAnchorId: null,
    activePageId: null, history: [], future: [],
    createdAt: Date.now(), modifiedAt: Date.now(), needsExport: true, lastExportedAt: null, folderId: null, favorite: false, trashedAt: null, libraryManaged: true,
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
  state.sessionExplicitEmpty = false;
  checkpointWorkspaceNow();
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
  if (state.annotationSelection?.documentId === docId) clearAnnotationSelection(true);
  state.selectionGesture = null;
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
  if (state.annotationSelection?.ids?.size) clearAnnotationSelection(true);
  state.selectionGesture = null;
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
  checkpointWorkspaceNow();
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

function documentAnnotationCount(doc) {
  return (doc?.pages || []).reduce((sum,page) => sum + (Array.isArray(page?.annotations) ? page.annotations.length : 0), 0);
}
function preferredOpenDocumentDuplicate(a,b) {
  // If one duplicate is the actual live object currently backing the viewer,
  // preserve it first. This is important if a reopen race created a second
  // copy and the user subsequently annotated the live copy.
  const aLive = a?.id === state.currentDocumentId && state.pages === a.pages;
  const bLive = b?.id === state.currentDocumentId && state.pages === b.pages;
  if (aLive !== bLive) return aLive ? a : b;
  const aModified = Number(a?.modifiedAt || 0), bModified = Number(b?.modifiedAt || 0);
  if (aModified !== bModified) return aModified > bModified ? a : b;
  const aAnnotations = documentAnnotationCount(a), bAnnotations = documentAnnotationCount(b);
  if (aAnnotations !== bAnnotations) return aAnnotations > bAnnotations ? a : b;
  const aHistory = Array.isArray(a?.history) ? a.history.length : 0;
  const bHistory = Array.isArray(b?.history) ? b.history.length : 0;
  if (aHistory !== bHistory) return aHistory > bHistory ? a : b;
  return b?.needsExport && !a?.needsExport ? b : a;
}
function deduplicateOpenDocuments() {
  if (state.documents.length < 2) return false;
  const byId = new Map();
  const order = [];
  let changed = false;
  for (const doc of state.documents) {
    if (!doc?.id) { order.push(doc); continue; }
    if (!byId.has(doc.id)) {
      byId.set(doc.id, doc);
      order.push(doc);
      continue;
    }
    changed = true;
    const existing = byId.get(doc.id);
    const preferred = preferredOpenDocumentDuplicate(existing, doc);
    if (preferred !== existing) {
      byId.set(doc.id, preferred);
      const index = order.indexOf(existing);
      if (index >= 0) order[index] = preferred;
    }
  }
  if (!changed) return false;
  state.documents = order;
  const active = state.currentDocumentId ? byId.get(state.currentDocumentId) : null;
  if (active) {
    state.pages = active.pages;
    state.selected = active.selected;
    state.selectionAnchorId = active.selectionAnchorId;
    state.activePageId = active.activePageId;
    state.history = active.history;
    state.future = active.future;
  } else if (state.documents.length) {
    state.currentDocumentId = state.documents[0].id;
    const first = state.documents[0];
    state.pages = first.pages;
    state.selected = first.selected;
    state.selectionAnchorId = first.selectionAnchorId;
    state.activePageId = first.activePageId;
    state.history = first.history;
    state.future = first.future;
  }
  return true;
}
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
  scheduleLibraryPersist(1200);
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
  checkpointWorkspaceNow();
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
  return state.pages.map(page => clonePageState(page));
}
function commitHistory(before) {
  state.history.push(before);
  if (state.history.length > 50) state.history.shift();
  state.future = [];
  markDocumentDirty();
  updateHistoryButtons();
}
function restorePages(snapshot) {
  state.pages = snapshot.map(page => clonePageState(page));
  const ids = new Set(state.pages.map(p => p.id));
  state.selected = new Set([...state.selected].filter(id => ids.has(id)));
  if (!state.activePageId || !ids.has(state.activePageId)) state.activePageId = state.pages[0]?.id ?? null;
  reconcileAnnotationSelection();
  renderAll();
}
function undo() {
  if (!state.history.length) return;
  const previous = state.history.pop();
  state.future.push(snapshotPages());
  restorePages(previous);
  markDocumentDirty();
  updateHistoryButtons();
}
function redo() {
  if (!state.future.length) return;
  const next = state.future.pop();
  state.history.push(snapshotPages());
  restorePages(next);
  markDocumentDirty();
  updateHistoryButtons();
}
function updateHistoryButtons() {
  const noUndo = !state.history.length;
  const noRedo = !state.future.length;
  els.undoBtn.disabled = noUndo;
  els.redoBtn.disabled = noRedo;
  if (els.inkUndoBtn) els.inkUndoBtn.disabled = noUndo;
  if (els.inkRedoBtn) els.inkRedoBtn.disabled = noRedo;
}

async function openFiles(fileList, options={}) {
  const files = [...fileList];
  if (!files.length) return;
  const invokedFromFiles = options.fromFiles ?? (state.workspaceMode === 'export');
  const destinationFolderId = options.folderId !== undefined
    ? (options.folderId || null)
    : (invokedFromFiles ? (state.libraryFolderId || null) : null);
  setStatus(`Opening ${files.length} file${files.length === 1 ? '' : 's'}…`, true);
  let opened = 0;
  let pagesAdded = 0;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    setStatus(`Opening ${file.name} (${i + 1} of ${files.length})…`, true);
    const supported = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf') || file.type.startsWith('image/');
    if (!supported) { setStatus(`Skipped unsupported file: ${file.name}`); continue; }
    const doc = createDocument(file.name);
    doc.folderId = destinationFolderId;
    doc.name = uniqueLibraryDocumentName(file.name, destinationFolderId, doc.id);
    try {
      let added = 0;
      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) added = await addPdf(file);
      else added = await addImage(file);
      if (!added) throw new Error('No pages were found.');
      state.activePageId = state.pages[0]?.id ?? null;
      const openedAsPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
      doc.needsExport = !openedAsPdf;
      doc.lastExportedAt = openedAsPdf ? Date.now() : null;
      doc.modifiedAt = Date.now();
      saveCurrentDocumentState({ readViewDom: false });
      await persistLibraryNow({ readViewDom: false });
      opened++;
      pagesAdded += added;
    } catch (err) {
      console.error(err);
      removeDocument(doc.id);
      setStatus(`Could not open ${file.name}: ${err.message || err}`);
    }
  }
  // File-management imports should not interrupt the Library task. Opening from
  // View/Pages retains the existing convenience of going to the newly opened PDF.
  if (opened && !invokedFromFiles) state.workspaceMode = 'view';
  else if (invokedFromFiles) state.workspaceMode = 'export';
  renderAll({ saveState: false });
  renderDocumentSelect();
  if (opened) {
    renderLibraryDocumentList();
    const where = invokedFromFiles && destinationFolderId ? ` into ${libraryFolderById(destinationFolderId)?.name || 'the current folder'}` : '';
    setStatus(`Opened ${opened} document${opened === 1 ? '' : 's'}${where} (${pagesAdded} page${pagesAdded === 1 ? '' : 's'})`);
  }
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
  const source = { id: sourceId, type: 'pdf', name: file.name, size: file.size, bytes, pdf, libraryPersisted: false };
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
  state.sources.set(sourceId, { id: sourceId, type: 'image', name: file.name, size: file.size, file, url, image: null, libraryPersisted: false });
  state.pages.push({ id: uid('page'), sourceId, sourcePage: 1, width: dims.width, height: dims.height, baseRotation: 0, rotation: 0, kind: 'image' });
  return 1;
}

function clearImageAssembly(options={}) {
  const { revoke = true } = options;
  if (revoke) {
    for (const item of state.imageAssemblyItems) {
      try { URL.revokeObjectURL(item.url); } catch {}
    }
  }
  state.imageAssemblyItems = [];
  if (els.imageAssemblyInput) els.imageAssemblyInput.value = '';
  renderImageAssemblyList();
}

async function addImageAssemblyFiles(fileList) {
  const files = [...(fileList || [])].filter(file => file?.type?.startsWith('image/'));
  if (!files.length) {
    setStatus('Choose one or more image files');
    if (els.imageAssemblyInput) els.imageAssemblyInput.value = '';
    return;
  }
  if (els.imageAssemblyProgress) els.imageAssemblyProgress.textContent = `Reading ${files.length} image${files.length === 1 ? '' : 's'}…`;
  let added = 0;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const url = URL.createObjectURL(file);
    try {
      const dims = await readImageDimensions(file, url);
      state.imageAssemblyItems.push({ id: uid('img'), file, url, width: dims.width, height: dims.height });
      added++;
      if (els.imageAssemblyProgress) els.imageAssemblyProgress.textContent = `Reading image ${i + 1} of ${files.length}…`;
    } catch (err) {
      try { URL.revokeObjectURL(url); } catch {}
      console.error(err);
      setStatus(`Could not read ${file.name}`);
    }
  }
  if (els.imageAssemblyInput) els.imageAssemblyInput.value = '';
  renderImageAssemblyList();
  if (els.imageAssemblyProgress) els.imageAssemblyProgress.textContent = added
    ? `${state.imageAssemblyItems.length} image${state.imageAssemblyItems.length === 1 ? '' : 's'} ready. Arrange them, choose page settings, then create the document.`
    : 'No readable images were added.';
  if (added) setStatus(`Added ${added} image${added === 1 ? '' : 's'} to image assembly`);
}

function imageAssemblyTargetSize(item) {
  const preset = els.imageAssemblyPageSize?.value || 'letter';
  const orientation = els.imageAssemblyOrientation?.value || 'auto';
  const naturalLandscape = Number(item?.width) >= Number(item?.height);
  let width, height;
  if (preset === 'a4') [width, height] = [595.28, 841.89];
  else if (preset === 'legal') [width, height] = [612, 1008];
  else if (preset === 'image') {
    const iw = Math.max(1, Number(item?.width) || 1);
    const ih = Math.max(1, Number(item?.height) || 1);
    const longEdge = 792; // 11 inches: bounded, predictable PDF page geometry.
    if (iw >= ih) [width, height] = [longEdge, longEdge * ih / iw];
    else [width, height] = [longEdge * iw / ih, longEdge];
  } else [width, height] = [612, 792];

  const wantLandscape = orientation === 'auto' ? naturalLandscape : orientation === 'landscape';
  const isLandscape = width >= height;
  if (wantLandscape !== isLandscape) [width, height] = [height, width];
  return { width: Math.max(1, width), height: Math.max(1, height) };
}

function renderImageAssemblyList() {
  if (!els.imageAssemblyList) return;
  els.imageAssemblyList.replaceChildren();
  const items = state.imageAssemblyItems;
  items.forEach((item, index) => {
    const row = document.createElement('div');
    row.className = 'image-assembly-row';
    row.dataset.itemId = item.id;

    const preview = document.createElement('div');
    preview.className = 'image-assembly-preview';
    const img = document.createElement('img');
    img.src = item.url;
    img.alt = '';
    preview.append(img);

    const info = document.createElement('div');
    info.className = 'image-assembly-info';
    const name = document.createElement('span');
    name.className = 'image-assembly-name';
    name.textContent = item.file.name;
    name.title = item.file.name;
    const meta = document.createElement('span');
    meta.className = 'image-assembly-meta';
    meta.textContent = `${Math.round(item.width)} × ${Math.round(item.height)} px`;
    info.append(name, meta);

    const up = document.createElement('button');
    up.type = 'button'; up.className = 'image-assembly-move'; up.textContent = '↑'; up.title = 'Move image earlier'; up.setAttribute('aria-label', `Move ${item.file.name} earlier`); up.disabled = index === 0; up.dataset.action = 'up';
    const down = document.createElement('button');
    down.type = 'button'; down.className = 'image-assembly-move'; down.textContent = '↓'; down.title = 'Move image later'; down.setAttribute('aria-label', `Move ${item.file.name} later`); down.disabled = index === items.length - 1; down.dataset.action = 'down';
    const remove = document.createElement('button');
    remove.type = 'button'; remove.className = 'image-assembly-remove'; remove.textContent = '×'; remove.title = 'Remove image'; remove.setAttribute('aria-label', `Remove ${item.file.name}`); remove.dataset.action = 'remove';
    row.append(preview, info, up, down, remove);
    els.imageAssemblyList.append(row);
  });
  updateImageAssemblyUi();
}

function updateImageAssemblyUi() {
  const count = state.imageAssemblyItems.length;
  if (els.imageAssemblySummary) els.imageAssemblySummary.textContent = count
    ? `${count} image${count === 1 ? '' : 's'} selected. This order will become the initial Pages order.`
    : 'No images selected.';
  if (els.imageAssemblyOperationSummary) els.imageAssemblyOperationSummary.textContent = count
    ? `${count} image${count === 1 ? '' : 's'} ready`
    : 'Assemble several images as one document';
  if (els.imageAssemblyCreateBtn) els.imageAssemblyCreateBtn.disabled = count === 0;
  if (els.imageAssemblyClearBtn) els.imageAssemblyClearBtn.disabled = count === 0;
  if (!count && els.imageAssemblyProgress && !/Could not|No readable/i.test(els.imageAssemblyProgress.textContent || '')) els.imageAssemblyProgress.textContent = '';
}

function moveImageAssemblyItem(itemId, delta) {
  const index = state.imageAssemblyItems.findIndex(item => item.id === itemId);
  if (index < 0) return;
  const next = clamp(index + delta, 0, state.imageAssemblyItems.length - 1);
  if (next === index) return;
  const [item] = state.imageAssemblyItems.splice(index, 1);
  state.imageAssemblyItems.splice(next, 0, item);
  renderImageAssemblyList();
}

function removeImageAssemblyItem(itemId) {
  const index = state.imageAssemblyItems.findIndex(item => item.id === itemId);
  if (index < 0) return;
  const [item] = state.imageAssemblyItems.splice(index, 1);
  try { URL.revokeObjectURL(item.url); } catch {}
  renderImageAssemblyList();
}

function createImageAssemblyDocument() {
  const items = [...state.imageAssemblyItems];
  if (!items.length) return;
  const name = ensurePdfFilename(els.imageAssemblyName?.value, `Images ${state.imageAssemblySequence}.pdf`);
  if (els.imageAssemblyCreateBtn) els.imageAssemblyCreateBtn.disabled = true;
  if (els.imageAssemblyProgress) els.imageAssemblyProgress.textContent = `Creating ${items.length}-page image document…`;
  const doc = createDocument(name);
  const pages = [];
  try {
    for (const item of items) {
      const sourceId = uid('src');
      state.sources.set(sourceId, { id: sourceId, type: 'image', name: item.file.name, size: item.file.size, file: item.file, url: item.url, image: null, libraryPersisted: false });
      const target = imageAssemblyTargetSize(item);
      pages.push({
        id: uid('page'), sourceId, sourcePage: 1,
        width: item.width, height: item.height,
        canvasWidth: target.width, canvasHeight: target.height,
        baseRotation: 0, rotation: 0, kind: 'image'
      });
    }
    doc.pages = pages;
    doc.selected = new Set();
    doc.selectionAnchorId = null;
    doc.activePageId = pages[0]?.id || null;
    doc.history = [];
    doc.future = [];
    doc.singleView = { zoom: 1, fitMode: state.fitMode, scrollMode: state.scrollMode, activePageId: doc.activePageId, scrollTop: null, scrollLeft: null };
    state.pages = doc.pages;
    state.selected = doc.selected;
    state.selectionAnchorId = null;
    state.activePageId = doc.activePageId;
    state.history = doc.history;
    state.future = doc.future;
    state.fileSelected = new Set([doc.id]);
    state.fileSelectionInitialized = true;
    state.combineOrder = [doc.id];
    state.workspaceMode = 'organize';
    if (state.splitView) {
      const pane = splitPaneState(state.activePaneId);
      pane.documentId = doc.id;
      pane.views.set(doc.id, defaultPaneView(doc));
    }
    // Ownership of the blob URLs has moved from the pending assembly into
    // state.sources. Clear the pending list without revoking those URLs.
    state.imageAssemblyItems = [];
    if (els.imageAssemblyInput) els.imageAssemblyInput.value = '';
    saveCurrentDocumentState({ readViewDom: false });
    renderImageAssemblyList();
    renderAll({ saveState: false });
    if (els.imageAssemblyProgress) els.imageAssemblyProgress.textContent = `Created ${name} with ${pages.length} image page${pages.length === 1 ? '' : 's'}.`;
    state.imageAssemblySequence += 1;
    if (els.imageAssemblyName) els.imageAssemblyName.value = `Images ${state.imageAssemblySequence}.pdf`;
    setStatus(`Created ${name} from ${pages.length} image${pages.length === 1 ? '' : 's'}`);
    scheduleLibraryPersist(120);
  } catch (err) {
    console.error(err);
    removeDocument(doc.id);
    if (els.imageAssemblyProgress) els.imageAssemblyProgress.textContent = `Could not create image document: ${err?.message || err}`;
    setStatus('Could not create image document');
  } finally {
    updateImageAssemblyUi();
  }
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
  return clonePageState(page, { newId: true, includeAnnotations });
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
  const well = canvas.closest('.insert-choice-preview, .template-manager-preview, .library-document-preview');
  if (!well) return;
  const rect = well.getBoundingClientRect();
  const { width: bw, height: bh } = pageDisplayDimensions(page);
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
      drawPageAnnotationsCanvas(page, canvas.getContext('2d'), canvas.width, canvas.height);
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
    [clonePageState(current, { includeAnnotations: false }), els.insertDuplicateWithoutPreview],
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
    empty.textContent = 'No templates saved';
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
  if (els.newTemplateDocumentBtn) els.newTemplateDocumentBtn.disabled = state.templates.length === 0;
  if (els.filesTemplatesSummary) els.filesTemplatesSummary.textContent = state.templates.length
    ? `${state.templates.length} template${state.templates.length === 1 ? '' : 's'}`
    : 'No templates saved';
  if (els.filesManageTemplatesBtn) els.filesManageTemplatesBtn.disabled = false;
}

function requestTemplateName(suggested, options={}) {
  if (!els.templateNameDialog || !els.templateNameInput) return Promise.resolve(options.chooseAnnotations ? { name:suggested, includeAnnotations:true } : suggested);
  return new Promise(resolve => {
    const dialog = els.templateNameDialog;
    const annotationChoice = $('templateAnnotationChoice');
    els.templateNameInput.value = suggested;
    annotationChoice?.classList.toggle('hidden', !options.chooseAnnotations);
    if (options.chooseAnnotations) {
      const withAnnotations = dialog.querySelector('input[name="templateAnnotationMode"][value="with"]');
      if (withAnnotations) withAnnotations.checked = true;
    }
    const finish = () => {
      dialog.removeEventListener('close', finish);
      const accepted = dialog.returnValue === 'save';
      const value = els.templateNameInput.value.trim();
      if (!accepted) { resolve(null); return; }
      const name = value || suggested;
      if (!options.chooseAnnotations) { resolve(name); return; }
      const mode = dialog.querySelector('input[name="templateAnnotationMode"]:checked')?.value || 'with';
      resolve({ name, includeAnnotations: mode !== 'clean' });
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
  const details = await requestTemplateName(suggested, { chooseAnnotations:true });
  if (details === null) return false;
  const template = {
    id: uid('template'),
    name: details.name,
    page: { ...clonePageState(page, { includeAnnotations:details.includeAnnotations }), id: null },
    createdAt: Date.now(),
    modifiedAt: Date.now(),
  };
  state.templates.push(template);
  renderInsertTemplateList();
  scheduleLibraryPersist(80);
  setStatus(`Saved page as ${details.name}${details.includeAnnotations ? '' : ' (clean)'}`);
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
  if (state.newLastPageDefault?.kind === 'template' && state.newLastPageDefault.templateId === removed.id) {
    state.newLastPageDefault = { kind:'graph', templateId:null };
  }
  renderInsertTemplateList();
  releaseSourceIfUnused(removed.page?.sourceId, { excludingTemplateId: removed.id });
  scheduleLibraryPersist(80);
}

function showTemplateManager() {
  closeInsertPageMenu(false);
  els.infoDialog.classList.add('template-dialog');
  const renderManager = () => {
    els.dialogContent.innerHTML = `<h2>Templates</h2>
      <p>Templates are stored with the Local Library on this device and return when PDF Workbench is reopened.</p>
      <section class="template-default-section">
        <h3>Automatic new last page</h3>
        <p class="small-note">When you pull/scroll past the last page, PDF Workbench can append one page. Graph and Blank match the dimensions of the preceding last page; a saved template keeps its own dimensions. The factory default is Graph paper.</p>
        <label for="newLastPageDefaultSelect">Default page</label>
        <select id="newLastPageDefaultSelect"></select>
      </section>
      <h3>Saved templates</h3>
      <div id="templateManagerList" class="template-manager-list"></div>`;

    const select = $('newLastPageDefaultSelect');
    const addOption = (value, label) => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = label;
      select.append(option);
    };
    addOption('graph', 'Graph paper — same size as last page');
    addOption('blank', 'Blank — same size as last page');
    for (const template of state.templates) addOption(`template:${template.id}`, `Template: ${template.name}`);
    const selectedValue = state.newLastPageDefault?.kind === 'template'
      ? `template:${state.newLastPageDefault.templateId}`
      : (state.newLastPageDefault?.kind === 'blank' ? 'blank' : 'graph');
    select.value = [...select.options].some(option => option.value === selectedValue) ? selectedValue : 'graph';
    select.addEventListener('change', () => {
      const value = select.value;
      if (value.startsWith('template:')) {
        const templateId = value.slice('template:'.length);
        state.newLastPageDefault = state.templates.some(template => template.id === templateId)
          ? { kind:'template', templateId }
          : { kind:'graph', templateId:null };
      } else {
        state.newLastPageDefault = { kind:value === 'blank' ? 'blank' : 'graph', templateId:null };
      }
      scheduleLibraryPersist(80);
      setStatus(`Automatic last page: ${select.options[select.selectedIndex]?.textContent || 'Graph paper'}`);
    });

    const manager = $('templateManagerList');
    if (!state.templates.length) {
      const empty = document.createElement('p');
      empty.textContent = 'No templates are saved.';
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
      const { width: w, height: h } = pageDisplayDimensions(template.page);
      const annotationCount = Array.isArray(template.page?.annotations) ? template.page.annotations.length : 0;
      size.textContent = `${Math.round(w)} × ${Math.round(h)} pt${annotationCount ? ` · ${annotationCount} annotation object${annotationCount === 1 ? '' : 's'}` : ' · clean'}`;
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
        template.modifiedAt = Date.now();
        renderInsertTemplateList();
        scheduleLibraryPersist(80);
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


const END_APPEND_READY_PX = 58;
const END_APPEND_LOCK_MS = 1100;

function automaticLastPageLabel() {
  const pref = state.newLastPageDefault || { kind:'graph', templateId:null };
  if (pref.kind === 'blank') return 'blank page';
  if (pref.kind === 'template') {
    const template = state.templates.find(item => item.id === pref.templateId);
    if (template) return template.name;
  }
  return 'graph paper';
}

function appendEndOfDocumentPullTarget(viewer, documentId, scrollMode) {
  if (!viewer || scrollMode === 'single') return;
  const doc = documentById(documentId);
  if (!doc?.pages?.length) return;
  const target = document.createElement('div');
  target.className = 'end-page-pull';
  target.dataset.documentId = documentId;
  target.setAttribute('aria-hidden', 'true');
  const primary = document.createElement('div');
  primary.className = 'end-page-pull-primary';
  primary.textContent = `Pull to add ${automaticLastPageLabel()}`;
  const secondary = document.createElement('div');
  secondary.className = 'end-page-pull-secondary';
  secondary.textContent = 'Keep scrolling, then release';
  target.append(primary, secondary);
  viewer.append(target);
}

function endAppendProgress(viewer) {
  const target = viewer?.querySelector('.end-page-pull');
  if (!target) return { target:null, visible:0, ready:false };
  const vr = viewer.getBoundingClientRect();
  const tr = target.getBoundingClientRect();
  const visible = Math.max(0, Math.min(vr.bottom, tr.bottom) - Math.max(vr.top, tr.top));
  const ready = visible >= END_APPEND_READY_PX;
  target.classList.toggle('ready', ready);
  const primary = target.querySelector('.end-page-pull-primary');
  const secondary = target.querySelector('.end-page-pull-secondary');
  if (primary) primary.textContent = ready ? `Release to add ${automaticLastPageLabel()}` : `Pull to add ${automaticLastPageLabel()}`;
  if (secondary) secondary.textContent = ready ? 'One new page will be appended' : 'Keep scrolling, then release';
  return { target, visible, ready };
}

function appendAutomaticLastPage(documentId, paneId=null) {
  if (state.autoAppendLock) return false;
  const doc = documentById(documentId);
  if (!doc?.pages?.length) return false;
  const lastPage = doc.pages[doc.pages.length - 1];
  if (!lastPage) return false;

  if (documentId !== state.currentDocumentId) loadDocumentState(documentId, false);
  const pref = state.newLastPageDefault || { kind:'graph', templateId:null };
  let kind = pref.kind;
  let template = null;
  if (kind === 'template') {
    template = state.templates.find(item => item.id === pref.templateId) || null;
    if (!template) {
      state.newLastPageDefault = { kind:'graph', templateId:null };
      kind = 'graph';
      scheduleLibraryPersist(80);
    }
  }
  if (kind !== 'blank' && kind !== 'template') kind = 'graph';

  state.autoAppendLock = true;
  try {
    insertPageAfterCurrent(kind, true, template, {
      documentId,
      pageId: lastPage.id,
      paneId: state.splitView ? (paneId || state.activePaneId) : null,
    });
  } finally {
    setTimeout(() => { state.autoAppendLock = false; }, END_APPEND_LOCK_MS);
  }
  return true;
}

function maybeAppendAtDocumentEnd(viewer, documentId, paneId=null, force=false) {
  if (state.autoAppendLock) return false;
  if (!force) {
    const progress = endAppendProgress(viewer);
    if (!progress.ready) return false;
  }
  return appendAutomaticLastPage(documentId, paneId);
}

function handleEndAppendWheel(viewer, documentId, paneId=null) {
  if (!viewer) return;
  clearTimeout(viewer._endAppendWheelResetTimer);
  viewer._endAppendWheelResetTimer = setTimeout(() => {
    viewer._endAppendWheelConsumed = false;
    viewer._endAppendWheelResetTimer = null;
  }, 520);
  if (viewer._endAppendWheelConsumed) return;
  requestAnimationFrame(() => {
    if (viewer._endAppendWheelConsumed) return;
    if (maybeAppendAtDocumentEnd(viewer, documentId, paneId)) viewer._endAppendWheelConsumed = true;
  });
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
  scheduleLibraryPersist(120);
}

function createNewDocumentFromTemplate(templateId) {
  const template = state.templates.find(item => item.id === templateId);
  if (!template?.page) { setStatus('That template is no longer available'); return; }
  const templateBaseName = String(template.name || 'Template').trim() || 'Template';
  const templatePdfName = /\.pdf$/i.test(templateBaseName) ? templateBaseName : `${templateBaseName}.pdf`;
  const doc = createDocument(uniqueLibraryDocumentName(templatePdfName));
  state.fileSelected = new Set([doc.id]);
  state.fileSelectionInitialized = true;
  state.combineOrder = [doc.id];
  const page = clonePageInstance(template.page, true);
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
  setStatus(`Created new document from template ${template.name}`);
  scheduleLibraryPersist(120);
}

function showNewFromTemplateChooser() {
  if (!state.templates.length) { setStatus('No templates are saved yet'); return; }
  els.infoDialog.classList.add('template-dialog');
  els.dialogContent.innerHTML = `<h2>New from template</h2><p>Choose a saved template. The new document starts with one independent copy of that page.</p><div id="newTemplateChoiceGrid" class="insert-choice-grid" role="group" aria-label="Templates for new document"></div>`;
  const grid = $('newTemplateChoiceGrid');
  for (const template of state.templates) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'insert-choice-card';
    const preview = document.createElement('span');
    preview.className = 'insert-choice-preview';
    const canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    preview.append(canvas);
    const label = document.createElement('span');
    label.className = 'insert-choice-label';
    label.textContent = template.name;
    button.append(preview, label);
    button.addEventListener('click', () => {
      try { els.infoDialog.close(); } catch {}
      createNewDocumentFromTemplate(template.id);
    });
    grid.append(button);
    requestAnimationFrame(() => renderCompactPagePreview(template.page, canvas));
  }
  if (!els.infoDialog.open) els.infoDialog.showModal();
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

function drawGraphPaperPdfInRect(pdfPage, sourceWidth, sourceHeight, x, y, width, height, rgb) {
  const color = rgb(0.46, 0.77, 0.87);
  const sx = width / sourceWidth;
  const sy = height / sourceHeight;
  const marginX = Math.min(GRAPH_GRID_MARGIN_PT, sourceWidth / 4) * sx;
  const marginY = Math.min(GRAPH_GRID_MARGIN_PT, sourceHeight / 4) * sy;
  const spacingX = GRAPH_GRID_SPACING_PT * sx;
  const spacingY = GRAPH_GRID_SPACING_PT * sy;
  for (let gx = marginX; gx <= width - marginX + 0.01; gx += spacingX) {
    pdfPage.drawLine({ start: { x: x + gx, y: y + marginY }, end: { x: x + gx, y: y + height - marginY }, thickness: 0.45 * Math.min(sx, sy), color, opacity: 0.24 });
  }
  for (let gy = marginY; gy <= height - marginY + 0.01; gy += spacingY) {
    pdfPage.drawLine({ start: { x: x + marginX, y: y + gy }, end: { x: x + width - marginX, y: y + gy }, thickness: 0.45 * Math.min(sx, sy), color, opacity: 0.24 });
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

function defaultCompressionFilename(name) {
  return `${cleanFilenameBase(name)}-compressed.pdf`;
}

function formatFileSize(bytes) {
  const n = Math.max(0, Number(bytes) || 0);
  if (n < 1024) return `${Math.round(n)} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(n < 100 * 1024 ? 1 : 0)} KB`;
  return `${(n / (1024 * 1024)).toFixed(n < 10 * 1024 * 1024 ? 2 : 1)} MB`;
}

const COMPRESSION_PROFILES = {
  light: { maxDpi: 200, jpegQuality: 0.84, rasterDpi: 170, rasterQuality: 0.82, label: 'Light' },
  medium: { maxDpi: 150, jpegQuality: 0.72, rasterDpi: 130, rasterQuality: 0.70, label: 'Medium' },
  strong: { maxDpi: 110, jpegQuality: 0.58, rasterDpi: 96, rasterQuality: 0.56, label: 'Strong' },
};

const TARGET_PRESERVE_PROFILES = [
  { maxDpi: 180, jpegQuality: 0.82 },
  { maxDpi: 150, jpegQuality: 0.72 },
  { maxDpi: 120, jpegQuality: 0.62 },
  { maxDpi: 96, jpegQuality: 0.52 },
  { maxDpi: 72, jpegQuality: 0.44 },
];

const TARGET_RASTER_PROFILES = [
  { rasterDpi: 160, rasterQuality: 0.80 },
  { rasterDpi: 135, rasterQuality: 0.72 },
  { rasterDpi: 115, rasterQuality: 0.64 },
  { rasterDpi: 96, rasterQuality: 0.56 },
  { rasterDpi: 82, rasterQuality: 0.48 },
  { rasterDpi: 72, rasterQuality: 0.42 },
  { rasterDpi: 60, rasterQuality: 0.34 },
  { rasterDpi: 50, rasterQuality: 0.30 },
];

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

function isDocumentOpen(docId) { return state.documents.some(doc => doc.id === docId); }

function activeLibraryRecords() {
  const merged = new Map(state.libraryRecords);
  for (const doc of state.documents) merged.set(doc.id, serializeDocumentForLibrary(doc));
  return [...merged.values()].filter(record => !record.trashedAt);
}

function trashedLibraryRecords() {
  return [...state.libraryRecords.values()].filter(record => !!record.trashedAt)
    .sort((a, b) => (b.trashedAt || 0) - (a.trashedAt || 0) || String(a.name).localeCompare(String(b.name)));
}

function activeLibraryFolders() {
  return [...state.libraryFolders.values()].filter(folder => !folder.trashedAt);
}

function libraryFolderById(id) { return id ? state.libraryFolders.get(id) || null : null; }
function libraryFolderChildren(parentId=null) {
  return activeLibraryFolders().filter(folder => (folder.parentId || null) === (parentId || null))
    .sort((a,b) => String(a.name).localeCompare(String(b.name), undefined, { sensitivity: 'base' }));
}
function libraryDocumentsInFolder(folderId=null) {
  return activeLibraryRecords().filter(record => (record.folderId || null) === (folderId || null))
    .sort((a,b) => String(a.name).localeCompare(String(b.name), undefined, { sensitivity: 'base' }));
}
function libraryFolderPath(folderId=state.libraryFolderId) {
  const path = [];
  const seen = new Set();
  let id = folderId;
  while (id && !seen.has(id)) {
    seen.add(id);
    const folder = libraryFolderById(id);
    if (!folder) break;
    path.unshift(folder);
    id = folder.parentId || null;
  }
  return path;
}
function libraryFolderDescendantIds(folderId) {
  const result = new Set();
  const visit = id => {
    for (const child of activeLibraryFolders().filter(folder => (folder.parentId || null) === id)) {
      if (result.has(child.id)) continue;
      result.add(child.id); visit(child.id);
    }
  };
  visit(folderId);
  return result;
}
function libraryFolderSubtreeIds(folderId) {
  const ids = libraryFolderDescendantIds(folderId);
  ids.add(folderId);
  return ids;
}
function libraryFolderSubtreeDocuments(folderId) {
  const ids = libraryFolderSubtreeIds(folderId);
  return activeLibraryRecords().filter(record => ids.has(record.folderId || ''));
}
function trashedFolderRoots() {
  return [...state.libraryFolders.values()].filter(folder => folder.trashedAt && folder.trashBatchId === folder.id)
    .sort((a,b) => (b.trashedAt || 0) - (a.trashedAt || 0) || String(a.name).localeCompare(String(b.name)));
}
function librarySiblingNameExists(name, parentId, excludingId=null) {
  const target = String(name || '').trim().toLocaleLowerCase();
  return activeLibraryFolders().some(folder => folder.id !== excludingId && (folder.parentId || null) === (parentId || null) && String(folder.name || '').trim().toLocaleLowerCase() === target);
}
function uniqueLibraryDocumentName(baseName, folderId=null, excludingId=null) {
  const records = activeLibraryRecords().filter(record => record.id !== excludingId && (record.folderId || null) === (folderId || null));
  const names = new Set(records.map(record => String(record.name || '').toLocaleLowerCase()));
  const raw = String(baseName || 'Untitled.pdf').trim() || 'Untitled.pdf';
  if (!names.has(raw.toLocaleLowerCase())) return raw;
  const dot = raw.lastIndexOf('.');
  const stem = dot > 0 ? raw.slice(0, dot) : raw;
  const ext = dot > 0 ? raw.slice(dot) : '';
  let n = 2;
  let candidate = `${stem} ${n}${ext}`;
  while (names.has(candidate.toLocaleLowerCase())) candidate = `${stem} ${++n}${ext}`;
  return candidate;
}
function defaultDuplicateDocumentName(name, folderId=null) {
  const raw = String(name || 'Untitled.pdf').trim() || 'Untitled.pdf';
  const dot = raw.lastIndexOf('.');
  const stem = dot > 0 ? raw.slice(0, dot) : raw;
  const ext = dot > 0 ? raw.slice(dot) : '';
  const records = activeLibraryRecords().filter(record => (record.folderId || null) === (folderId || null));
  const names = new Set(records.map(record => String(record.name || '').toLocaleLowerCase()));
  let candidate = `${stem} copy${ext}`;
  let n = 2;
  while (names.has(candidate.toLocaleLowerCase())) candidate = `${stem} copy ${n++}${ext}`;
  return candidate;
}

function setLibraryFolder(folderId=null) {
  if (folderId && !state.libraryFolders.has(folderId)) folderId = null;
  state.libraryFolderId = folderId || null;
  renderLibraryDocumentList();
}
function setLibraryViewMode(mode) {
  state.libraryViewMode = mode === 'list' ? 'list' : 'grid';
  savePref('pdfwb-library-view', state.libraryViewMode);
  renderLibraryDocumentList();
}

function renderLibraryBreadcrumb() {
  if (!els.libraryBreadcrumb) return;
  els.libraryBreadcrumb.replaceChildren();
  const root = document.createElement('button');
  root.type = 'button'; root.textContent = 'Library'; root.className = 'library-breadcrumb-button';
  root.disabled = !state.libraryFolderId;
  root.addEventListener('click', () => setLibraryFolder(null));
  els.libraryBreadcrumb.append(root);
  for (const folder of libraryFolderPath()) {
    const sep = document.createElement('span'); sep.className = 'library-breadcrumb-separator'; sep.textContent = '›';
    const button = document.createElement('button');
    button.type = 'button'; button.textContent = folder.name; button.className = 'library-breadcrumb-button';
    button.disabled = folder.id === state.libraryFolderId;
    button.addEventListener('click', () => setLibraryFolder(folder.id));
    els.libraryBreadcrumb.append(sep, button);
  }
}

function ensureLibraryPreviewObserver() {
  if (state.libraryPreviewObserver || !('IntersectionObserver' in window)) return state.libraryPreviewObserver;
  state.libraryPreviewObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const canvas = entry.target;
      state.libraryPreviewObserver.unobserve(canvas);
      const record = activeLibraryRecords().find(item => item.id === canvas.dataset.libraryPreview) || state.libraryRecords.get(canvas.dataset.libraryPreview);
      if (record) renderLibraryFirstPagePreview(record, canvas);
    }
  }, { root: null, rootMargin: '240px 0px', threshold: 0.01 });
  return state.libraryPreviewObserver;
}
async function renderLibraryFirstPagePreview(record, canvas) {
  const page = record?.pages?.[0];
  if (!page || !canvas?.isConnected) return;
  try {
    if (page.sourceId && !state.sources.has(page.sourceId)) await ensureLibrarySourceLoaded(page.sourceId);
    if (!canvas.isConnected) return;
    await renderCompactPagePreview(page, canvas);
  } catch (err) {
    console.warn(`Could not render Library preview for ${record?.name || record?.id}`, err);
    canvas.closest('.library-document-preview')?.classList.add('preview-error');
  }
}
function queueLibraryPreview(record, canvas) {
  canvas.dataset.libraryPreview = record.id;
  const observer = ensureLibraryPreviewObserver();
  if (observer) observer.observe(canvas);
  else requestAnimationFrame(() => renderLibraryFirstPagePreview(record, canvas));
}

function requestLibraryName({ title='Name', help='', suggested='', saveLabel='Save' }={}) {
  if (!els.libraryNameDialog || !els.libraryNameInput) return Promise.resolve(window.prompt(title, suggested));
  return new Promise(resolve => {
    els.libraryNameTitle.textContent = title;
    els.libraryNameHelp.textContent = help;
    els.libraryNameInput.value = suggested;
    els.libraryNameSaveBtn.textContent = saveLabel;
    let finished = false;
    const finish = value => {
      if (finished) return; finished = true;
      try { els.libraryNameDialog.close(); } catch {}
      resolve(value);
    };
    const onSubmit = e => {
      e.preventDefault();
      const value = els.libraryNameInput.value.trim();
      if (!value) { els.libraryNameInput.focus(); return; }
      finish(value);
    };
    els.libraryNameForm.onsubmit = onSubmit;
    els.libraryNameCloseBtn.onclick = () => finish(null);
    els.libraryNameCancelBtn.onclick = () => finish(null);
    els.libraryNameDialog.oncancel = e => { e.preventDefault(); finish(null); };
    els.libraryNameDialog.showModal();
    requestAnimationFrame(() => { els.libraryNameInput.focus({ preventScroll: true }); els.libraryNameInput.select(); });
  });
}

async function createLibraryFolder() {
  if (!state.libraryReady) { setStatus('Local Library is not ready'); return; }
  const name = await requestLibraryName({ title: 'New folder', help: 'The new folder will be created inside the folder currently being viewed.', suggested: 'New Folder', saveLabel: 'Create folder' });
  if (!name) return;
  if (librarySiblingNameExists(name, state.libraryFolderId)) { setStatus('A folder with that name already exists here'); return; }
  const folder = { id: uid('folder'), schemaVersion: LIBRARY_SCHEMA_VERSION, name, parentId: state.libraryFolderId || null, createdAt: Date.now(), modifiedAt: Date.now(), trashedAt: null };
  try {
    await libraryPut('folders', folder); state.libraryFolders.set(folder.id, folder); renderLibraryDocumentList(); setStatus(`Created folder ${name}`);
  } catch (err) { console.error(err); setStatus(`Could not create folder: ${err?.message || err}`); }
}
async function renameLibraryFolder(folderId) {
  const folder = libraryFolderById(folderId); if (!folder) return;
  const name = await requestLibraryName({ title: 'Rename folder', suggested: folder.name, saveLabel: 'Rename' });
  if (!name || name === folder.name) return;
  if (librarySiblingNameExists(name, folder.parentId, folder.id)) { setStatus('A folder with that name already exists there'); return; }
  const updated = { ...folder, name, modifiedAt: Date.now(), schemaVersion: LIBRARY_SCHEMA_VERSION };
  await libraryPut('folders', updated); state.libraryFolders.set(folder.id, updated); renderLibraryDocumentList(); setStatus(`Renamed folder to ${name}`);
}
async function renameLibraryDocument(docId) {
  const openDoc = documentById(docId);
  const record = openDoc ? serializeDocumentForLibrary(openDoc) : state.libraryRecords.get(docId);
  if (!record) return;
  const name = await requestLibraryName({ title: 'Rename document', suggested: record.name, saveLabel: 'Rename' });
  if (!name || name === record.name) return;
  const unique = uniqueLibraryDocumentName(name, record.folderId, record.id);
  if (unique !== name) { setStatus(`A document named ${name} already exists here`); return; }
  const modifiedAt = Date.now();
  if (openDoc) { openDoc.name = name; openDoc.modifiedAt = modifiedAt; }
  const updated = { ...record, name, modifiedAt, schemaVersion: LIBRARY_SCHEMA_VERSION };
  await libraryPut('documents', updated); state.libraryRecords.set(docId, updated);
  renderAll({ saveState: false }); renderLibraryDocumentList(); setStatus(`Renamed document to ${name}`);
}
function cloneDocumentPagesForDuplicate(record) {
  const idMap = new Map();
  const pages = (record.pages || []).map(page => { const id = uid('page'); idMap.set(page.id, id); return { ...clonePlain(page), id }; });
  const remap = id => idMap.get(id) || pages[0]?.id || null;
  return { pages, remap };
}
async function duplicateLibraryDocument(docId) {
  try {
    const openDoc = documentById(docId); if (openDoc) saveCurrentDocumentState();
    if (openDoc) await persistLibraryNow();
    const record = openDoc ? serializeDocumentForLibrary(openDoc) : (state.libraryRecords.get(docId) || await libraryGet('documents', docId));
    if (!record) throw new Error('Document is no longer available.');
    const { pages, remap } = cloneDocumentPagesForDuplicate(record);
    const now = Date.now();
    const copy = {
      ...clonePlain(record), id: uid('doc'), schemaVersion: LIBRARY_SCHEMA_VERSION,
      name: defaultDuplicateDocumentName(record.name, record.folderId), pages,
      selected: [], selectionAnchorId: null, activePageId: remap(record.activePageId), history: [], future: [],
      singleView: { ...copyView(record.singleView), activePageId: remap(record.singleView?.activePageId), scrollTop: null, scrollLeft: null },
      createdAt: now, modifiedAt: now, needsExport: true, lastExportedAt: null, trashedAt: null,
    };
    await libraryPut('documents', copy); state.libraryRecords.set(copy.id, copy); renderLibraryDocumentList(); updateLibraryStorageSummary(); setStatus(`Duplicated ${record.name} as ${copy.name}`);
  } catch (err) { console.error(err); setStatus(`Could not duplicate document: ${err?.message || err}`); }
}

function libraryFolderOptions(excludeFolderId=null) {
  const excluded = excludeFolderId ? libraryFolderDescendantIds(excludeFolderId) : new Set();
  if (excludeFolderId) excluded.add(excludeFolderId);
  const options = [{ id: '', label: 'Library (root)' }];
  const walk = (parentId, depth) => {
    for (const folder of libraryFolderChildren(parentId)) {
      if (excluded.has(folder.id)) continue;
      options.push({ id: folder.id, label: `${'— '.repeat(depth)}${folder.name}` });
      walk(folder.id, depth + 1);
    }
  };
  walk(null, 0);
  return options;
}
function openLibraryMoveDialog(kind, id) {
  if (!els.libraryMoveDialog) return;
  const isFolder = kind === 'folder';
  const item = isFolder ? libraryFolderById(id) : (documentById(id) || state.libraryRecords.get(id));
  if (!item) return;
  state.pendingLibraryMove = { kind, id };
  els.libraryMoveTitle.textContent = `Move ${isFolder ? 'folder' : 'document'}`;
  els.libraryMoveHelp.textContent = `Choose a destination for “${item.name}”.`;
  els.libraryMoveDestination.replaceChildren();
  for (const optionData of libraryFolderOptions(isFolder ? id : null)) {
    const option = document.createElement('option'); option.value = optionData.id; option.textContent = optionData.label;
    els.libraryMoveDestination.append(option);
  }
  const currentParent = isFolder ? (item.parentId || '') : (item.folderId || '');
  if ([...els.libraryMoveDestination.options].some(option => option.value === currentParent)) els.libraryMoveDestination.value = currentParent;
  els.libraryMoveDialog.showModal();
}
async function applyPendingLibraryMove() {
  const pending = state.pendingLibraryMove; if (!pending) return;
  const destination = els.libraryMoveDestination.value || null;
  try {
    if (pending.kind === 'folder') {
      const folder = libraryFolderById(pending.id); if (!folder) throw new Error('Folder is no longer available.');
      if ((folder.parentId || null) === destination) return;
      if (librarySiblingNameExists(folder.name, destination, folder.id)) throw new Error('A folder with that name already exists in the destination.');
      const updated = { ...folder, parentId: destination, modifiedAt: Date.now(), schemaVersion: LIBRARY_SCHEMA_VERSION };
      await libraryPut('folders', updated); state.libraryFolders.set(folder.id, updated);
      setStatus(`Moved folder ${folder.name}`);
    } else {
      const openDoc = documentById(pending.id);
      const record = openDoc ? serializeDocumentForLibrary(openDoc) : state.libraryRecords.get(pending.id);
      if (!record) throw new Error('Document is no longer available.');
      if ((record.folderId || null) === destination) return;
      if (openDoc) { openDoc.folderId = destination; openDoc.modifiedAt = Date.now(); }
      const updated = { ...record, folderId: destination, modifiedAt: Date.now(), schemaVersion: LIBRARY_SCHEMA_VERSION };
      await libraryPut('documents', updated); state.libraryRecords.set(record.id, updated); scheduleLibraryPersist(80);
      setStatus(`Moved ${record.name}`);
    }
    renderLibraryDocumentList();
  } catch (err) { console.error(err); setStatus(`Could not move item: ${err?.message || err}`); }
  finally { state.pendingLibraryMove = null; }
}

async function openLibraryRecordInView(record) {
  try {
    if (!record) return;
    if (isDocumentOpen(record.id)) loadDocumentState(record.id);
    else {
      setStatus(`Opening ${record.name} from Library…`, true);
      await reopenLibraryDocument(record.id);
    }
    state.workspaceMode = 'view';
    renderAll({ saveState: false });
    setStatus(`Opened ${record.name}`);
  } catch (err) {
    console.error(err);
    setStatus(`Could not open ${record?.name || 'document'}: ${err?.message || err}`);
  }
}

async function exportPdfRecordsToZip(records, folders, filename, rootFolderId=null) {
  const JSZip = await loadZipEngine();
  const zip = new JSZip();
  const relevantFolders = folders.filter(folder => folder && !folder.trashedAt);
  let folderPaths;
  if (rootFolderId) {
    const root = relevantFolders.find(folder => folder.id === rootFolderId);
    const rootIds = new Set([rootFolderId]);
    let changed = true;
    while (changed) {
      changed = false;
      for (const folder of relevantFolders) if (rootIds.has(folder.parentId) && !rootIds.has(folder.id)) { rootIds.add(folder.id); changed = true; }
    }
    const subset = relevantFolders.filter(folder => rootIds.has(folder.id));
    const byId = new Map(subset.map(folder => [folder.id, folder]));
    folderPaths = new Map();
    const build = id => {
      if (folderPaths.has(id)) return folderPaths.get(id);
      const folder = byId.get(id); if (!folder) return '';
      const own = zipSafeSegment(folder.name, 'Folder');
      const parentPath = folder.parentId && byId.has(folder.parentId) ? build(folder.parentId) : '';
      const path = parentPath ? `${parentPath}/${own}` : own;
      folderPaths.set(id, path); return path;
    };
    for (const folder of subset) { const path = build(folder.id); if (path) zip.folder(path); }
  } else {
    folderPaths = buildPortableFolderPaths(relevantFolders);
    for (const path of folderPaths.values()) zip.folder(path);
  }
  let n = 0;
  for (const record of records) {
    n++;
    if (els.libraryBackupProgress) els.libraryBackupProgress.textContent = `Exporting ${record.name} (${n} of ${records.length})…`;
    await ensureRecordSourcesLoaded(record);
    const bytes = await buildPdfBytes(record.pages || [], { sourcePdfCache: new Map() });
    const path = record.folderId ? (folderPaths.get(record.folderId) || '') : '';
    zip.file(path ? `${path}/${ensurePdfFilename(zipSafeSegment(record.name, 'Document.pdf'))}` : ensurePdfFilename(zipSafeSegment(record.name, 'Document.pdf')), bytes);
  }
  const blob = await zip.generateAsync({ type:'blob', compression:'STORE', mimeType:'application/zip' });
  downloadBlob(blob, filename);
  return records.length;
}

async function exportLibraryFolderAsPdfs(folderId) {
  const folder = libraryFolderById(folderId); if (!folder) return;
  try {
    await persistLibraryNow(); await refreshLibraryRecords();
    const ids = libraryFolderSubtreeIds(folderId);
    const folders = activeLibraryFolders().filter(item => ids.has(item.id));
    const records = activeLibraryRecords().filter(record => ids.has(record.folderId || ''));
    if (!records.length && !folders.length) throw new Error('This folder is empty.');
    const filename = `${zipSafeSegment(folder.name, 'Folder')}-PDFs.zip`;
    await exportPdfRecordsToZip(records, folders, filename, folderId);
    setStatus(`Exported ${folder.name} as PDF ZIP`);
  } catch (err) { console.error(err); setStatus(`Folder export failed: ${err?.message || err}`); }
}

async function moveLibraryFolderToTrash(folderId) {
  const root = libraryFolderById(folderId); if (!root) return;
  try {
    await persistLibraryNow(); await refreshLibraryRecords();
    const ids = libraryFolderSubtreeIds(folderId);
    const stamp = Date.now();
    const folders = activeLibraryFolders().filter(folder => ids.has(folder.id));
    const records = activeLibraryRecords().filter(record => ids.has(record.folderId || ''));
    const tx = state.libraryDb.transaction(['documents','folders'], 'readwrite');
    const done = idbTransactionDone(tx); const ds=tx.objectStore('documents'), fs=tx.objectStore('folders');
    for (const folder of folders) {
      const updated={...folder,schemaVersion:LIBRARY_SCHEMA_VERSION,trashedAt:stamp,trashBatchId:folderId}; fs.put(updated); state.libraryFolders.set(folder.id,updated);
    }
    for (const record of records) {
      const updated={...record,schemaVersion:LIBRARY_SCHEMA_VERSION,trashedAt:stamp,trashBatchId:folderId}; ds.put(updated); state.libraryRecords.set(record.id,updated);
    }
    await done;
    for (const record of records) if (isDocumentOpen(record.id)) { removeDocument(record.id); state.fileSelected.delete(record.id); }
    reconcileCombineOrder();
    if (ids.has(state.libraryFolderId)) state.libraryFolderId = root.parentId && state.libraryFolders.get(root.parentId)?.trashedAt == null ? root.parentId : null;
    renderAll({saveState:false}); renderLibraryDocumentList(); await persistLibraryNow();
    setStatus(`Moved folder ${root.name} and its contents to Trash`);
  } catch(err){ console.error(err); setStatus(`Could not trash folder: ${err?.message||err}`); }
}

async function restoreLibraryFolderTree(folderId) {
  const root=state.libraryFolders.get(folderId); if(!root) return;
  try {
    const batch=folderId;
    const folders=[...state.libraryFolders.values()].filter(folder=>folder.trashBatchId===batch);
    const records=[...state.libraryRecords.values()].filter(record=>record.trashBatchId===batch);
    const tx=state.libraryDb.transaction(['documents','folders'],'readwrite'); const done=idbTransactionDone(tx); const ds=tx.objectStore('documents'),fs=tx.objectStore('folders');
    for(const folder of folders){let parentId=folder.parentId||null;let name=folder.name;if(folder.id===folderId){if(parentId && (!state.libraryFolders.has(parentId) || state.libraryFolders.get(parentId)?.trashedAt)) parentId=null;const base=String(name||'Folder');let candidate=base,n=2;while(activeLibraryFolders().some(item=>item.id!==folder.id&&(item.parentId||null)===(parentId||null)&&String(item.name).toLocaleLowerCase()===candidate.toLocaleLowerCase())) candidate=`${base} ${n++}`;name=candidate;}const updated={...folder,name,parentId,schemaVersion:LIBRARY_SCHEMA_VERSION,trashedAt:null,trashBatchId:null};fs.put(updated);state.libraryFolders.set(folder.id,updated);}
    for(const record of records){const updated={...record,schemaVersion:LIBRARY_SCHEMA_VERSION,trashedAt:null,trashBatchId:null};ds.put(updated);state.libraryRecords.set(record.id,updated);}
    await done; renderLibraryDocumentList(); setStatus(`Restored folder ${root.name}`);
  } catch(err){console.error(err);setStatus(`Could not restore folder: ${err?.message||err}`);}
}

async function permanentlyDeleteLibraryFolderTree(folderId) {
  const root=state.libraryFolders.get(folderId); if(!root) return;
  const folders=[...state.libraryFolders.values()].filter(folder=>folder.trashBatchId===folderId);
  const records=[...state.libraryRecords.values()].filter(record=>record.trashBatchId===folderId);
  const changed=records.some(record=>record.needsExport);
  let action='delete';
  if(changed){ action=await askPermanentDeleteAction({name:`folder ${root.name}`,needsExport:true}, 'Export PDFs ZIP & delete'); if(action==='cancel') return; }
  else if(!confirm(`Permanently delete folder “${root.name}” and all of its contents? This cannot be undone.`)) return;
  try{
    if(action==='export'){
      // Temporarily describe the trashed tree as active for the ZIP path builder.
      const cleanFolders=folders.map(folder=>({...folder,trashedAt:null}));
      const cleanRecords=records.map(record=>({...record,trashedAt:null}));
      await exportPdfRecordsToZip(cleanRecords,cleanFolders,`${zipSafeSegment(root.name,'Folder')}-before-delete.zip`,folderId);
    }
    const sourceIds=new Set(records.flatMap(record=>(record.pages||[]).map(page=>page.sourceId).filter(Boolean)));
    const tx=state.libraryDb.transaction(['documents','folders'],'readwrite'); const done=idbTransactionDone(tx); const ds=tx.objectStore('documents'),fs=tx.objectStore('folders');
    for(const record of records){ds.delete(record.id);state.libraryRecords.delete(record.id);}
    for(const folder of folders){fs.delete(folder.id);state.libraryFolders.delete(folder.id);}
    await done; await removeUnusedPersistentSources(sourceIds); renderLibraryDocumentList(); updateLibraryStorageSummary(); setStatus(`Permanently deleted folder ${root.name}`);
  }catch(err){console.error(err);setStatus(`Could not permanently delete folder: ${err?.message||err}`);}
}

function createLibraryFolderRow(folder) {
  const row = document.createElement('div'); row.className = 'library-document-row library-folder-row'; row.dataset.folderId = folder.id;
  const preview = document.createElement('button'); preview.type = 'button'; preview.className = 'library-folder-preview'; preview.setAttribute('aria-label', `Open folder ${folder.name}`); preview.innerHTML = '<span class="library-folder-icon" aria-hidden="true"></span>';
  preview.addEventListener('click', () => setLibraryFolder(folder.id));
  const label = document.createElement('div'); label.className = 'library-document-label library-open-target'; label.tabIndex = 0; label.setAttribute('role','button'); label.setAttribute('aria-label',`Open folder ${folder.name}`);
  const name = document.createElement('span'); name.className = 'library-document-name'; name.textContent = folder.name; name.title = folder.name;
  const subtreeIds = libraryFolderSubtreeIds(folder.id);
  const childFolders = subtreeIds.size - 1;
  const childDocs = activeLibraryRecords().filter(record => subtreeIds.has(record.folderId || '')).length;
  const meta = document.createElement('span'); meta.className = 'library-document-meta'; meta.textContent = `${childDocs} document${childDocs===1?'':'s'} · ${childFolders} subfolder${childFolders===1?'':'s'}`;
  label.append(name, meta);
  label.addEventListener('click',()=>setLibraryFolder(folder.id)); label.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setLibraryFolder(folder.id);}});
  const actions = document.createElement('div'); actions.className = 'library-document-actions';
  const open = document.createElement('button'); open.type='button'; open.className='primary-library-action'; open.textContent='Open'; open.addEventListener('click',()=>setLibraryFolder(folder.id));
  const exportBtn=document.createElement('button'); exportBtn.type='button'; exportBtn.textContent='Export PDFs'; exportBtn.addEventListener('click',()=>exportLibraryFolderAsPdfs(folder.id));
  const rename = document.createElement('button'); rename.type='button'; rename.textContent='Rename'; rename.addEventListener('click',()=>renameLibraryFolder(folder.id));
  const move = document.createElement('button'); move.type='button'; move.textContent='Move…'; move.addEventListener('click',()=>openLibraryMoveDialog('folder', folder.id));
  const trash=document.createElement('button'); trash.type='button'; trash.className='trash-action'; trash.textContent='Trash'; trash.addEventListener('click',()=>moveLibraryFolderToTrash(folder.id));
  actions.append(open, exportBtn, rename, move, trash); row.append(preview, label, actions); return row;
}

function createLibraryDocumentRow(record) {
  const open = isDocumentOpen(record.id);
  const row = document.createElement('div'); row.className = `library-document-row library-file-row${open ? ' open' : ''}`; row.dataset.documentId = record.id;
  const preview = document.createElement('div'); preview.className = 'library-document-preview library-open-target'; preview.tabIndex=0; preview.setAttribute('role','button'); preview.setAttribute('aria-label',`Open ${record.name}`);
  const canvas = document.createElement('canvas'); canvas.setAttribute('aria-label', `First page preview of ${record.name}`); preview.append(canvas);
  const label = document.createElement('div'); label.className = 'library-document-label library-open-target'; label.tabIndex=0; label.setAttribute('role','button'); label.setAttribute('aria-label',`Open ${record.name}`);
  const name = document.createElement('span'); name.className = 'library-document-name'; name.textContent = record.name; name.title = record.name;
  const meta = document.createElement('span'); meta.className = 'library-document-meta';
  const pages = record.pages?.length || 0; const changed = record.needsExport ? ' · changes not exported' : '';
  meta.textContent = `${pages} page${pages === 1 ? '' : 's'} · ${open ? 'open' : 'closed'}${changed}`; label.append(name, meta);
  const openFromMain = () => openLibraryRecordInView(record);
  preview.addEventListener('click',openFromMain); label.addEventListener('click',openFromMain);
  for(const el of [preview,label]) el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openFromMain();}});
  const actions = document.createElement('div'); actions.className = 'library-document-actions';
  const action = document.createElement('button'); action.type='button'; action.className='primary-library-action'; action.textContent = open ? (record.id===state.currentDocumentId?'Active':'Use') : 'Open'; action.disabled = open && record.id===state.currentDocumentId;
  action.addEventListener('click', () => openLibraryRecordInView(record));
  actions.append(action);
  if (open) { const close=document.createElement('button'); close.type='button'; close.textContent='Close'; close.title=`Close ${record.name} but keep it in the local Library`; close.addEventListener('click',()=>closeOneOpenDocument(record.id)); actions.append(close); }
  const rename=document.createElement('button'); rename.type='button'; rename.textContent='Rename'; rename.addEventListener('click',()=>renameLibraryDocument(record.id));
  const duplicate=document.createElement('button'); duplicate.type='button'; duplicate.textContent='Duplicate'; duplicate.addEventListener('click',()=>duplicateLibraryDocument(record.id));
  const move=document.createElement('button'); move.type='button'; move.textContent='Move…'; move.addEventListener('click',()=>openLibraryMoveDialog('document', record.id));
  const trash=document.createElement('button'); trash.type='button'; trash.className='trash-action'; trash.textContent='Trash'; trash.title=`Move ${record.name} to Trash`; trash.addEventListener('click',()=>moveLibraryDocumentToTrash(record.id));
  actions.append(rename, duplicate, move, trash); row.append(preview, label, actions); queueLibraryPreview(record, canvas); return row;
}

function renderLibraryDocumentList() {
  if (!els.libraryDocumentList) return;
  state.libraryPreviewObserver?.disconnect();
  const allRecords = activeLibraryRecords();
  const folders = libraryFolderChildren(state.libraryFolderId);
  const records = libraryDocumentsInFolder(state.libraryFolderId);
  els.libraryDocumentList.replaceChildren();
  els.libraryDocumentList.classList.toggle('grid-view', state.libraryViewMode === 'grid');
  els.libraryDocumentList.classList.toggle('list-view', state.libraryViewMode === 'list');
  els.libraryGridViewBtn?.classList.toggle('active', state.libraryViewMode === 'grid');
  els.libraryListViewBtn?.classList.toggle('active', state.libraryViewMode === 'list');
  els.libraryGridViewBtn?.setAttribute('aria-pressed', String(state.libraryViewMode === 'grid'));
  els.libraryListViewBtn?.setAttribute('aria-pressed', String(state.libraryViewMode === 'list'));
  renderLibraryBreadcrumb();
  if (els.librarySummary) {
    els.librarySummary.textContent = state.libraryReady
      ? (allRecords.length ? `${allRecords.length} document${allRecords.length === 1 ? '' : 's'} · ${activeLibraryFolders().length} folder${activeLibraryFolders().length === 1 ? '' : 's'} · ${state.documents.length} open` : 'The local Library is empty. Open or create a document and it will be stored automatically.')
      : 'Persistent Library is not available in this browser/session.';
  }
  for (const folder of folders) els.libraryDocumentList.append(createLibraryFolderRow(folder));
  for (const record of records) els.libraryDocumentList.append(createLibraryDocumentRow(record));
  if (!folders.length && !records.length) {
    const empty = document.createElement('p'); empty.className='small-note library-empty-note';
    empty.textContent = state.libraryFolderId ? 'This folder is empty.' : 'The Library is empty. Open or create a document, or create a folder.';
    els.libraryDocumentList.append(empty);
  }
  renderTrashDocumentList();
}

function renderTrashDocumentList() {
  if (!els.trashDocumentList) return;
  const folderRoots = trashedFolderRoots();
  const records = trashedLibraryRecords().filter(record => !record.trashBatchId);
  els.trashDocumentList.replaceChildren();
  const total = folderRoots.length + records.length;
  if (els.trashSummary) els.trashSummary.textContent = total
    ? `${folderRoots.length ? `${folderRoots.length} folder${folderRoots.length===1?'':'s'}` : ''}${folderRoots.length && records.length ? ' · ' : ''}${records.length ? `${records.length} document${records.length===1?'':'s'}` : ''}`
    : 'Trash is empty';
  if (!total) {
    const empty = document.createElement('p'); empty.className = 'small-note'; empty.textContent = 'Trash is empty.'; els.trashDocumentList.append(empty); return;
  }
  for (const folder of folderRoots) {
    const row=document.createElement('div'); row.className='library-document-row library-folder-row';
    const label=document.createElement('div'); label.className='library-document-label';
    const name=document.createElement('span'); name.className='library-document-name'; name.textContent=folder.name;
    const docCount=[...state.libraryRecords.values()].filter(record=>record.trashBatchId===folder.id).length;
    const folderCount=[...state.libraryFolders.values()].filter(item=>item.trashBatchId===folder.id).length-1;
    const meta=document.createElement('span'); meta.className='library-document-meta'; meta.textContent=`Folder tree · ${docCount} document${docCount===1?'':'s'} · ${Math.max(0,folderCount)} subfolder${folderCount===1?'':'s'}`; label.append(name,meta);
    const actions=document.createElement('div'); actions.className='library-document-actions';
    const restore=document.createElement('button'); restore.type='button'; restore.className='primary-library-action'; restore.textContent='Restore'; restore.addEventListener('click',()=>restoreLibraryFolderTree(folder.id));
    const del=document.createElement('button'); del.type='button'; del.className='trash-action'; del.textContent='Delete permanently…'; del.addEventListener('click',()=>permanentlyDeleteLibraryFolderTree(folder.id));
    actions.append(restore,del); row.append(label,actions); els.trashDocumentList.append(row);
  }
  for (const record of records) {
    const row = document.createElement('div'); row.className = 'library-document-row'; row.dataset.documentId = record.id;
    const label = document.createElement('div'); label.className = 'library-document-label';
    const name = document.createElement('span'); name.className = 'library-document-name'; name.textContent = record.name;
    const meta = document.createElement('span'); meta.className = 'library-document-meta';
    const pages = record.pages?.length || 0; const changed = record.needsExport ? ' · changes not exported' : '';
    meta.textContent = `${pages} page${pages === 1 ? '' : 's'} · in Trash${changed}`; label.append(name, meta);
    const actions = document.createElement('div'); actions.className = 'library-document-actions';
    const restore = document.createElement('button'); restore.type = 'button'; restore.className = 'primary-library-action'; restore.textContent = 'Restore'; restore.addEventListener('click', () => restoreLibraryDocument(record.id));
    const del = document.createElement('button'); del.type = 'button'; del.className = 'trash-action'; del.textContent = 'Delete permanently…'; del.addEventListener('click', () => permanentlyDeleteLibraryDocument(record.id));
    actions.append(restore, del); row.append(label, actions); els.trashDocumentList.append(row);
  }
}

async function closeOneOpenDocument(docId) {
  const doc = documentById(docId);
  if (!doc) return;
  saveCurrentDocumentState();
  await persistLibraryNow();
  removeDocument(docId);
  state.fileSelected.delete(docId);
  reconcileCombineOrder();
  state.sessionExplicitEmpty = state.documents.length === 0;
  checkpointWorkspaceNow({ explicitEmpty: state.sessionExplicitEmpty });
  renderAll({ saveState: false });
  await persistLibraryNow();
  await refreshLibraryRecords();
  setStatus(`Closed ${doc.name} · kept in local Library`);
}

async function closeAllOpenDocuments() {
  if (!state.documents.length) return;
  saveCurrentDocumentState();
  await persistLibraryNow();
  clearAll();
  state.sessionExplicitEmpty = true;
  checkpointWorkspaceNow({ explicitEmpty: true });
  await persistLibraryNow();
  await refreshLibraryRecords();
}

async function moveLibraryDocumentToTrash(docId) {
  try {
    const openDoc = documentById(docId);
    if (openDoc) {
      if (openDoc.id === state.currentDocumentId) saveCurrentDocumentState();
      await persistLibraryNow();
    }
    const base = openDoc ? serializeDocumentForLibrary(openDoc) : (state.libraryRecords.get(docId) || await libraryGet('documents', docId));
    if (!base) throw new Error('That Library document is no longer available.');
    const record = { ...base, schemaVersion: LIBRARY_SCHEMA_VERSION, trashedAt: Date.now(), trashBatchId: null };
    await libraryPut('documents', record);
    state.libraryRecords.set(docId, record);
    if (openDoc) {
      removeDocument(docId);
      state.fileSelected.delete(docId);
      reconcileCombineOrder();
      renderAll({ saveState: false });
      await persistLibraryNow();
    }
    renderLibraryDocumentList();
    setStatus(`Moved ${record.name} to Trash`);
  } catch (err) {
    console.error(err);
    setStatus(`Could not move document to Trash: ${err?.message || err}`);
  }
}

async function restoreLibraryDocument(docId) {
  try {
    const record = state.libraryRecords.get(docId) || await libraryGet('documents', docId);
    if (!record) throw new Error('That Trash item is no longer available.');
    const restored = { ...record, schemaVersion: LIBRARY_SCHEMA_VERSION, trashedAt: null, trashBatchId: null };
    await libraryPut('documents', restored);
    state.libraryRecords.set(docId, restored);
    renderLibraryDocumentList();
    setStatus(`Restored ${restored.name} to Local Library`);
  } catch (err) {
    console.error(err);
    setStatus(`Could not restore document: ${err?.message || err}`);
  }
}

function askPermanentDeleteAction(record, exportLabel='Export PDF & delete') {
  if (!record?.needsExport) {
    return Promise.resolve(window.confirm(`Permanently delete “${record?.name || 'this document'}” from the local Library? This cannot be undone.`) ? 'delete' : 'cancel');
  }
  return new Promise(resolve => {
    els.closeDocumentTitle.textContent = `Permanently delete ${record.name}?`;
    els.closeDocumentMessage.textContent = `${record.name} has changes that have not been exported to PDF.`;
    els.closeDocumentExportBtn.textContent = exportLabel;
    els.closeDocumentWithoutExportBtn.textContent = 'Delete permanently';
    const finish = action => {
      try { els.closeDocumentDialog.close(); } catch {}
      resolve(action);
    };
    els.closeDocumentExportBtn.onclick = () => finish('export');
    els.closeDocumentWithoutExportBtn.onclick = () => finish('delete');
    els.closeDocumentCancelBtn.onclick = () => finish('cancel');
    els.closeDocumentXBtn.onclick = () => finish('cancel');
    els.closeDocumentDialog.oncancel = e => { e.preventDefault(); finish('cancel'); };
    els.closeDocumentDialog.showModal();
  });
}

async function exportLibraryRecordBeforeDelete(record) {
  try {
    const sourceIds = new Set((record.pages || []).map(page => page.sourceId).filter(Boolean));
    for (const sourceId of sourceIds) await ensureLibrarySourceLoaded(sourceId);
    setStatus(`Exporting ${record.name} before permanent deletion…`, true);
    const bytes = await buildPdfBytes(record.pages || [], { sourcePdfCache: new Map() });
    downloadPdfBytes(bytes, defaultExportFilename(record.name));
    return true;
  } catch (err) {
    console.error(err);
    setStatus(`Export before deletion failed: ${err?.message || err}`);
    return false;
  }
}

function librarySourceStillReferenced(sourceId) {
  if (!sourceId) return false;
  for (const record of state.libraryRecords.values()) {
    if ((record.pages || []).some(page => page.sourceId === sourceId)) return true;
  }
  if (state.templates.some(template => template.page?.sourceId === sourceId)) return true;
  return false;
}

async function removeUnusedPersistentSources(sourceIds) {
  for (const sourceId of sourceIds) {
    if (librarySourceStillReferenced(sourceId)) continue;
    await libraryDelete('sources', sourceId).catch(() => {});
    const source = state.sources.get(sourceId);
    if (source?.url) URL.revokeObjectURL(source.url);
    try { source?.pdf?.destroy?.(); } catch {}
    state.sources.delete(sourceId);
  }
}

async function permanentlyDeleteLibraryDocument(docId) {
  try {
    if (isDocumentOpen(docId)) throw new Error('Close or move the document to Trash before permanently deleting it.');
    const record = state.libraryRecords.get(docId) || await libraryGet('documents', docId);
    if (!record) throw new Error('That Library document is no longer available.');
    const action = await askPermanentDeleteAction(record);
    if (action === 'cancel') return;
    if (action === 'export' && !(await exportLibraryRecordBeforeDelete(record))) return;
    const sourceIds = new Set((record.pages || []).map(page => page.sourceId).filter(Boolean));
    await libraryDelete('documents', docId);
    state.libraryRecords.delete(docId);
    await removeUnusedPersistentSources(sourceIds);
    renderLibraryDocumentList();
    updateLibraryStorageSummary();
    setStatus(`Permanently deleted ${record.name}`);
  } catch (err) {
    console.error(err);
    setStatus(`Could not permanently delete document: ${err?.message || err}`);
  }
}

async function purgeLocalLibrary() {
  const ok = confirm('Delete the entire local PDF Workbench Library on this device? This removes stored documents and cannot be undone. Export anything you need first.');
  if (!ok) return;
  try {
    state.librarySuppressPersist = true;
    clearAll();
    state.templates = [];
    for (const [sourceId, source] of state.sources) {
      if (source.url) URL.revokeObjectURL(source.url);
      try { source.pdf?.destroy?.(); } catch {}
      state.sources.delete(sourceId);
    }
    await libraryClearStore('documents');
    await libraryClearStore('sources');
    await libraryClearStore('meta');
    if (state.libraryDb?.objectStoreNames.contains('folders')) await libraryClearStore('folders');
    state.libraryRecords.clear();
    state.libraryFolders.clear();
    state.libraryFolderId = null;
    state.librarySuppressPersist = false;
    state.sessionRestoreHydrated = true;
    state.sessionExplicitEmpty = true;
    writeSessionCheckpoint();
    await libraryPut('meta', serializeTemplatesForLibrary());
    await libraryPut('meta', serializeLibrarySession());
    renderInsertTemplateList();
    renderLibraryDocumentList();
    updateLibraryStorageSummary();
    els.storageActionStatus.textContent = 'Local Library deleted. Application code/cache and preferences were left intact.';
    setStatus('Local Library deleted');
  } catch (err) {
    state.librarySuppressPersist = false;
    console.error(err);
    els.storageActionStatus.textContent = `Could not delete the Library: ${err?.message || err}`;
  }
}

async function factoryResetAllLocalData() {
  const ok = confirm('Factory reset PDF Workbench on this device? This deletes the local Library, templates/session data, preferences, and PDF Workbench app caches. This cannot be undone.');
  if (!ok) return;
  try {
    state.librarySuppressPersist = true;
    clearAll();
    state.libraryDb?.close?.();
    state.libraryDb = null;
    await new Promise((resolve, reject) => {
      const req = indexedDB.deleteDatabase(LIBRARY_DB_NAME);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
      req.onblocked = () => reject(new Error('Close other PDF Workbench tabs/windows and try again.'));
    });
    try { localStorage.clear(); } catch {}
    if ('caches' in window) {
      const keys = await caches.keys();
      await Promise.all(keys.filter(key => key.startsWith('pdf-workbench-')).map(key => caches.delete(key)));
    }
    if ('serviceWorker' in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations().catch(() => []);
      await Promise.all(regs.map(reg => reg.unregister().catch(() => false)));
    }
    els.storageActionStatus.textContent = 'Factory reset complete. Reloading…';
    const url = new URL(location.href);
    url.searchParams.set('reset', Date.now().toString());
    setTimeout(() => location.replace(url.href), 150);
  } catch (err) {
    console.error(err);
    els.storageActionStatus.textContent = `Factory reset could not complete: ${err?.message || err}`;
  }
}

function renderOpenDocumentList() {
  if (!els.openDocumentList) return;
  deduplicateOpenDocuments();
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
    meta.textContent = `${doc.pages.length} page${doc.pages.length === 1 ? '' : 's'}${doc.id === state.currentDocumentId ? ' · active' : ''}${doc.needsExport ? ' · changes not exported' : ''}`;
    label.append(name, meta);

    const activate = document.createElement('button');
    activate.type = 'button';
    activate.className = 'open-document-activate';
    activate.textContent = doc.id === state.currentDocumentId ? 'Active' : 'Use';
    activate.disabled = doc.id === state.currentDocumentId;
    activate.title = doc.id === state.currentDocumentId ? 'This is the active document' : `Make ${doc.name} the active document`;
    activate.addEventListener('click', () => loadDocumentState(doc.id));

    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'open-document-close';
    close.textContent = 'Close';
    close.title = `Close ${doc.name} but keep it in the local Library`;
    close.addEventListener('click', () => closeOneOpenDocument(doc.id));

    row.append(check, label, activate, close);
    els.openDocumentList.append(row);
  }
  if (!state.documents.length) {
    const empty = document.createElement('p');
    empty.className = 'small-note';
    empty.textContent = state.libraryRecords.size ? 'No documents are currently open. Reopen one from Local Library above, use Open, or create a new document.' : 'Use Open in the top bar, or expand New below to start a blank or graph-paper document.';
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

function updateCompressionUi(chosenDocs = selectedFileDocuments()) {
  if (!els.compressBtn) return;
  const selectionKey = chosenDocs.map(d => `${d.id}\n${d.name}`).join('|');
  const method = els.compressionMethod?.value || 'preserve';
  const level = els.compressionLevel?.value || 'medium';
  const targetMode = level === 'target';
  const normalizeLetter = !!els.compressionNormalizeLetter?.checked;
  els.compressionTargetField?.classList.toggle('hidden', !targetMode);

  if (!chosenDocs.length) {
    els.compressOperationSummary.textContent = 'Select one or more documents above';
    els.compressSummary.textContent = 'Select one or more open documents above.';
    els.compressionFilename.disabled = true;
    els.compressBtn.disabled = true;
    els.compressBtn.textContent = 'Compress selected';
  } else {
    const count = chosenDocs.length;
    const targetText = targetMode ? ` · target ${Number(els.compressionTargetMb?.value || 0).toFixed(1)} MB per PDF` : '';
    const letterText = normalizeLetter ? ' · Letter canvas' : '';
    els.compressOperationSummary.textContent = `${count} checked document${count === 1 ? '' : 's'} · ${method === 'raster' ? 'raster' : 'preserve'}${letterText}${targetText}`;
    els.compressSummary.textContent = count === 1
      ? `${chosenDocs[0].name}: create a compressed copy while keeping the current Pages order and edits.`
      : `${count} checked documents will be compressed individually and packaged together in one ZIP.`;
    els.compressionFilename.disabled = false;
    if (els.compressionFilename.dataset.selectionKey !== selectionKey) {
      els.compressionFilename.value = count === 1 ? defaultCompressionFilename(chosenDocs[0].name) : 'PDF-Workbench-Compressed.zip';
      els.compressionFilename.dataset.selectionKey = selectionKey;
      els.compressionProgress.textContent = '';
    }
    const targetValue = Number(els.compressionTargetMb?.value);
    els.compressBtn.disabled = targetMode && (!Number.isFinite(targetValue) || targetValue <= 0);
    els.compressBtn.textContent = count === 1 ? 'Compress PDF' : `Compress ${count} PDFs as ZIP`;
  }

  if (method === 'raster') {
    els.compressionMethodNote.innerHTML = '<strong>Rasterize pages:</strong> every output page becomes a JPEG image. This usually gives much stronger compression for scans, but selectable/searchable text, links, form fields, and vector sharpness are lost.';
  } else {
    els.compressionMethodNote.innerHTML = '<strong>Preserve text / vector:</strong> PDF pages stay structural. Imported image pages are downsampled/recompressed; raster images already embedded inside an opened PDF are retained as-is. A strict target may therefore require the explicit Rasterize method.';
  }
}

function renderExportPane() {
  saveCurrentDocumentState();
  renderLibraryDocumentList();
  renderOpenDocumentList();
  updateImageAssemblyUi();
  const doc = currentDocument();
  const count = state.pages.length;
  const chosenDocs = selectedFileDocuments();
  const selectionKey = chosenDocs.map(d => `${d.id}\n${d.name}`).join('|');

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

  updateCompressionUi(chosenDocs);

  const selectedCount = state.selected.size;
  if (doc) {
    els.extractSummary.textContent = selectedCount
      ? `${selectedCount} selected page${selectedCount === 1 ? '' : 's'} from active document ${doc.name} will be saved in their current Pages order.`
      : `Active document: ${doc.name}. No pages are selected; select pages in Pages first.`;
    const exportDocumentKey = `${doc.id}\n${doc.name}`;
    if (els.extractFilename.dataset.documentKey !== exportDocumentKey) {
      els.extractFilename.value = defaultExtractFilename(doc.name);
      els.extractFilename.dataset.documentKey = exportDocumentKey;
      els.extractProgress.textContent = '';
    }
    if (els.splitBaseName.dataset.documentKey !== exportDocumentKey) {
      els.splitBaseName.value = defaultSplitBaseName(doc.name);
      els.splitBaseName.dataset.documentKey = exportDocumentKey;
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

async function embedImageForExport(outPdf, source, options={}) {
  const name = String(source.name || '').toLowerCase();
  const type = String(source.file?.type || '').toLowerCase();
  const compress = !!options.compress;

  if (!compress) {
    const raw = source.file ? new Uint8Array(await source.file.arrayBuffer()) : null;
    if (raw && (type === 'image/jpeg' || type === 'image/jpg' || /\.jpe?g$/.test(name))) return outPdf.embedJpg(raw);
    if (raw && (type === 'image/png' || /\.png$/.test(name))) return outPdf.embedPng(raw);
  }

  // pdf-lib embeds JPEG/PNG directly for normal export. Compression deliberately
  // redraws imported image pages at the requested effective resolution and JPEG
  // quality. Other browser-decodable formats also use this path.
  const img = await getSourceImage(source);
  const naturalW = Math.max(1, img.naturalWidth || img.width || 1);
  const naturalH = Math.max(1, img.naturalHeight || img.height || 1);
  let pixelW = naturalW;
  let pixelH = naturalH;
  let mime = 'image/png';
  let quality;

  if (compress) {
    const maxDpi = Math.max(36, Number(options.maxDpi) || 150);
    const targetWidthPts = Math.max(1, Number(options.targetWidthPts) || naturalW);
    const targetHeightPts = Math.max(1, Number(options.targetHeightPts) || naturalH);
    const maxW = Math.max(1, Math.ceil(targetWidthPts / 72 * maxDpi));
    const maxH = Math.max(1, Math.ceil(targetHeightPts / 72 * maxDpi));
    let scale = Math.min(1, maxW / naturalW, maxH / naturalH);
    const maxPixels = 12_000_000; // bound temporary canvas memory on iPad
    if (naturalW * naturalH * scale * scale > maxPixels) scale *= Math.sqrt(maxPixels / (naturalW * naturalH * scale * scale));
    pixelW = Math.max(1, Math.round(naturalW * scale));
    pixelH = Math.max(1, Math.round(naturalH * scale));
    mime = 'image/jpeg';
    quality = clamp(Number(options.jpegQuality) || 0.72, 0.25, 0.95);
  }

  const canvas = document.createElement('canvas');
  canvas.width = pixelW;
  canvas.height = pixelH;
  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) throw new Error('Could not create image compression canvas.');
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, pixelW, pixelH);
  ctx.drawImage(img, 0, 0, pixelW, pixelH);
  const blob = await new Promise((resolve, reject) => canvas.toBlob(
    b => b ? resolve(b) : reject(new Error('Could not encode image for PDF export.')),
    mime,
    quality,
  ));
  canvas.width = canvas.height = 1;
  const bytes = new Uint8Array(await blob.arrayBuffer());
  return mime === 'image/jpeg' ? outPdf.embedJpg(bytes) : outPdf.embedPng(bytes);
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


// Milestone 5.0.7 diagnostic instrumentation. This is deliberately lightweight:
// it records contact boundaries and handler decisions, not every Pencil sample,
// so the logger itself should not materially change short-stroke timing.
function inkDiagnosticTarget(event) {
  const target = event?.target instanceof Element ? event.target : null;
  const parts = [];
  if (target) {
    parts.push(target.tagName?.toLowerCase?.() || 'element');
    if (target.id) parts.push(`#${target.id}`);
    const classes = [...(target.classList || [])].slice(0, 3);
    if (classes.length) parts.push(`.${classes.join('.')}`);
  }
  return parts.join('') || '(none)';
}
function inkDiagnosticLocation(event) {
  const target = event?.target instanceof Element ? event.target : null;
  let stage = target?.closest?.('.page-stage[data-page-id]') || null;
  if (!stage && Number.isFinite(event?.clientX) && Number.isFinite(event?.clientY)) {
    const hit = document.elementFromPoint?.(event.clientX, event.clientY);
    stage = hit instanceof Element ? hit.closest('.page-stage[data-page-id]') : null;
  }
  const viewer = target?.closest?.('.viewer, .split-pane-viewer') || stage?.closest?.('.viewer, .split-pane-viewer') || null;
  return { pageId: stage?.dataset?.pageId || null, viewer: viewer?.id || viewer?.className || null };
}
function addInkDiagnostic(kind, event=null, extra={}) {
  const location = event ? inkDiagnosticLocation(event) : { pageId:null, viewer:null };
  const record = {
    n: state.inkDiagnostics.length + 1,
    t: Math.round(performance.now() * 10) / 10,
    kind,
    event: event?.type || null,
    pointerType: event?.pointerType || null,
    pointerId: event?.pointerId ?? null,
    isPrimary: event?.isPrimary ?? null,
    button: event?.button ?? null,
    buttons: event?.buttons ?? null,
    pressure: Number.isFinite(event?.pressure) ? Math.round(event.pressure * 1000) / 1000 : null,
    x: Number.isFinite(event?.clientX) ? Math.round(event.clientX) : null,
    y: Number.isFinite(event?.clientY) ? Math.round(event.clientY) : null,
    target: event ? inkDiagnosticTarget(event) : null,
    pageId: location.pageId,
    viewer: location.viewer,
    tool: state.annotationTool,
    activeGesture: state.inkGesture ? { kind:state.inkGesture.stroke?.tool || 'pen', pointerId: state.inkGesture.pointerId, inputSource: state.inkGesture.inputSource || 'pointer', pageId: state.inkGesture.pageId, points: state.inkGesture.stroke?.points?.length || 0 } : state.eraserGesture ? { kind:'eraser', pointerId:state.eraserGesture.pointerId, inputSource:state.eraserGesture.inputSource || 'pointer', pageId:state.eraserGesture.pageId, changed:!!state.eraserGesture.changed } : state.selectionGesture ? { kind:'select', pointerId:state.selectionGesture.pointerId, inputSource:state.selectionGesture.inputSource || 'pointer', pageId:state.selectionGesture.pageId, mode:state.selectionGesture.mode, changed:!!state.selectionGesture.changed } : null,
    ...extra,
  };
  state.inkDiagnostics.push(record);
  if (state.inkDiagnostics.length > 1200) state.inkDiagnostics.splice(0, state.inkDiagnostics.length - 1200);
}
function bindInkDiagnostics() {
  const relevant = (event) => {
    if (!isStylusAnnotationTool()) return false;
    if (event.pointerType === 'pen') return true;
    if (event.pointerType !== 'touch') return false;
    const target = event.target instanceof Element ? event.target : null;
    if (target?.closest?.('.viewer, .split-pane-viewer, .page-stage')) return true;
    if (Number.isFinite(event.clientX) && Number.isFinite(event.clientY)) {
      const hit = document.elementFromPoint?.(event.clientX, event.clientY);
      return !!(hit instanceof Element && hit.closest('.viewer, .split-pane-viewer, .page-stage'));
    }
    return false;
  };
  document.addEventListener('pointerdown', (event) => {
    if (!relevant(event)) return;
    state.inkDiagnosticPointers.set(event.pointerId, { sawDown:true, moves:0, pointerType:event.pointerType });
    addInkDiagnostic('raw-down', event);
  }, { capture:true, passive:true });
  document.addEventListener('pointermove', (event) => {
    if (!relevant(event)) return;
    if (!(event.buttons || event.pressure > 0 || state.inkGesture?.pointerId === event.pointerId)) return;
    let info = state.inkDiagnosticPointers.get(event.pointerId);
    if (!info) {
      info = { sawDown:false, moves:0, pointerType:event.pointerType };
      state.inkDiagnosticPointers.set(event.pointerId, info);
      addInkDiagnostic('raw-first-contact-move-without-seen-down', event);
    }
    info.moves += 1;
  }, { capture:true, passive:true });
  const finish = (event, kind) => {
    if (!relevant(event) && !state.inkDiagnosticPointers.has(event.pointerId)) return;
    const info = state.inkDiagnosticPointers.get(event.pointerId) || { sawDown:false, moves:0, pointerType:event.pointerType };
    addInkDiagnostic(kind, event, { rawSawDown:info.sawDown, rawMoveEvents:info.moves });
    state.inkDiagnosticPointers.delete(event.pointerId);
  };
  document.addEventListener('pointerup', event => finish(event, 'raw-up'), { capture:true, passive:true });
  document.addEventListener('pointercancel', event => finish(event, 'raw-cancel'), { capture:true, passive:true });
  document.addEventListener('gotpointercapture', event => { if (event.pointerType === 'pen') addInkDiagnostic('got-pointer-capture', event); }, { capture:true, passive:true });
  document.addEventListener('lostpointercapture', event => { if (event.pointerType === 'pen') addInkDiagnostic('lost-pointer-capture', event); }, { capture:true, passive:true });
}
function downloadInkDiagnostics() {
  const header = {
    appVersion: APP_VERSION,
    generatedAt: new Date().toISOString(),
    userAgent: navigator.userAgent,
    platform: navigator.platform || null,
    standalone: isStandalonePwa(),
    note: 'Pointer-boundary diagnostics for Apple Pencil dropped-stroke investigation. No document contents are included.',
  };
  const lines = [JSON.stringify(header), ...state.inkDiagnostics.map(item => JSON.stringify(item))];
  const blob = new Blob([lines.join('\n') + '\n'], { type:'text/plain;charset=utf-8' });
  downloadBlob(blob, `PDF-Workbench-Pencil-Diagnostics-${portableTimestamp()}.txt`);
  setStatus(`Downloaded Pencil diagnostics (${state.inkDiagnostics.length} records)`);
  toggleMoreMenu(false);
}

function unchangedSingleSourcePdfBytes(pageList) {
  if (!Array.isArray(pageList) || !pageList.length) return null;
  const first = pageList[0];
  if (first?.kind !== 'pdf' || !first.sourceId) return null;
  const source = state.sources.get(first.sourceId);
  if (!source || source.type !== 'pdf' || !(source.bytes instanceof Uint8Array)) return null;
  const sourcePageCount = Number(source.pdf?.numPages || 0);
  if (!sourcePageCount || pageList.length !== sourcePageCount) return null;
  for (let i = 0; i < pageList.length; i++) {
    const page = pageList[i];
    if (page?.kind !== 'pdf' || page.sourceId !== first.sourceId || Number(page.sourcePage) !== i + 1) return null;
    if ((page.rotation || 0) !== 0 || hasPageCanvasOverride(page) || hasPageEdgeAdjustments(page) || hasPageAnnotations(page)) return null;
  }
  return source.bytes.slice();
}

async function buildPdfBytes(pageList, options={}) {
  // The most efficient and faithful export of an untouched imported PDF is the
  // original byte stream. View state, Library placement, and open/close state do
  // not require rewriting the PDF at all.
  if (!options.forceRewrite) {
    const passthrough = unchangedSingleSourcePdfBytes(pageList);
    if (passthrough) {
      options.onProgress?.(pageList.length, pageList.length);
      return passthrough;
    }
  }

  const pdfLib = await loadPdfExportEngine();
  const { PDFDocument, degrees, rgb } = pdfLib;
  const output = await PDFDocument.create();
  const sourcePdfCache = options.sourcePdfCache || new Map();
  const embeddedImages = new Map();
  const total = pageList.length;

  // Import all occurrences from each source PDF in ONE copyPages call. pdf-lib
  // then uses one copier/resource map for that source, preserving shared images,
  // fonts, color profiles, etc. The former page-at-a-time copy loop duplicated
  // shared resources dramatically (for example, one slide background 43 times).
  const pdfEntriesBySource = new Map();
  for (let i = 0; i < total; i++) {
    const page = pageList[i];
    if (page?.kind !== 'pdf') continue;
    if (!pdfEntriesBySource.has(page.sourceId)) pdfEntriesBySource.set(page.sourceId, []);
    pdfEntriesBySource.get(page.sourceId).push({ outputIndex: i, page });
  }
  const copiedPdfPages = new Map();
  for (const [sourceId, entries] of pdfEntriesBySource) {
    const source = state.sources.get(sourceId);
    if (!source) throw new Error(`Source data is missing for PDF pages from ${sourceId}.`);
    let srcPdf = sourcePdfCache.get(sourceId);
    if (!srcPdf) {
      srcPdf = await PDFDocument.load(source.bytes, { updateMetadata: false });
      sourcePdfCache.set(sourceId, srcPdf);
    }
    const copies = await output.copyPages(srcPdf, entries.map(entry => entry.page.sourcePage - 1));
    entries.forEach((entry, j) => copiedPdfPages.set(entry.outputIndex, copies[j]));
    await new Promise(resolve => setTimeout(resolve, 0));
  }

  for (let i = 0; i < total; i++) {
    const page = pageList[i];
    const source = page.kind === 'generated' ? null : state.sources.get(page.sourceId);
    if (page.kind !== 'generated' && !source) throw new Error(`Source data is missing for output page ${i + 1}.`);
    options.onProgress?.(i + 1, total);

    if (page.kind === 'generated') {
      const base = pageCanvasBaseDimensions(page);
      const core = pageCoreCanvasBaseDimensions(page);
      const edge = pageEdgeAdjustments(page);
      const outPage = output.addPage([base.width, base.height]);
      if (page.generatedType === 'graph') {
        if (hasPageCanvasOverride(page)) {
          const fit = Math.min(core.width / page.width, core.height / page.height);
          const contentW = page.width * fit;
          const contentH = page.height * fit;
          drawGraphPaperPdfInRect(outPage, page.width, page.height, edge.left + (core.width - contentW) / 2, edge.bottom + (core.height - contentH) / 2, contentW, contentH, rgb);
        } else {
          drawGraphPaperPdfInRect(outPage, page.width, page.height, edge.left, edge.bottom, core.width, core.height, rgb);
        }
      }
      drawPageAnnotationsPdf(outPage, page, 0, pdfLib);
      if (page.rotation) outPage.setRotation(degrees((page.rotation + 360) % 360));
    } else if (source.type === 'pdf') {
      const copied = copiedPdfPages.get(i);
      if (!copied) throw new Error(`Could not import source PDF page ${page.sourcePage}.`);
      const inheritedRotation = copied.getRotation()?.angle || 0;
      if (hasPageCanvasOverride(page)) {
        const core = pageCoreCanvasBaseDimensions(page);
        const oddInherited = ((inheritedRotation % 180) + 180) % 180 !== 0;
        const rawTargetW = oddInherited ? core.height : core.width;
        const rawTargetH = oddInherited ? core.width : core.height;
        const sourceBox = copied.getCropBox?.() || copied.getMediaBox?.() || { x: 0, y: 0, width: copied.getWidth(), height: copied.getHeight() };
        const fit = Math.min(rawTargetW / sourceBox.width, rawTargetH / sourceBox.height);
        copied.scaleContent(fit, fit);
        copied.scaleAnnotations?.(fit, fit);
        const scaledX = sourceBox.x * fit;
        const scaledY = sourceBox.y * fit;
        const scaledW = sourceBox.width * fit;
        const scaledH = sourceBox.height * fit;
        const x = scaledX - (rawTargetW - scaledW) / 2;
        const y = scaledY - (rawTargetH - scaledH) / 2;
        copied.setMediaBox(x, y, rawTargetW, rawTargetH);
        copied.setCropBox?.(x, y, rawTargetW, rawTargetH);
        copied.setBleedBox?.(x, y, rawTargetW, rawTargetH);
        copied.setTrimBox?.(x, y, rawTargetW, rawTargetH);
        copied.setArtBox?.(x, y, rawTargetW, rawTargetH);
      }
      if (hasPageEdgeAdjustments(page)) {
        const edge = displayedEdgesToRawPdf(pageEdgeAdjustments(page), inheritedRotation);
        const box = copied.getCropBox?.() || copied.getMediaBox?.() || { x: 0, y: 0, width: copied.getWidth(), height: copied.getHeight() };
        const x = box.x - edge.left;
        const y = box.y - edge.bottom;
        const width = box.width + edge.left + edge.right;
        const height = box.height + edge.top + edge.bottom;
        copied.setMediaBox(x, y, width, height);
        copied.setCropBox?.(x, y, width, height);
        copied.setBleedBox?.(x, y, width, height);
        copied.setTrimBox?.(x, y, width, height);
        copied.setArtBox?.(x, y, width, height);
      }
      drawPageAnnotationsPdf(copied, page, inheritedRotation, pdfLib);
      copied.setRotation(degrees((inheritedRotation + (page.rotation || 0) + 360) % 360));
      output.addPage(copied);
    } else if (source.type === 'image') {
      const base = pageCanvasBaseDimensions(page);
      const core = pageCoreCanvasBaseDimensions(page);
      const edge = pageEdgeAdjustments(page);
      let drawWidth = page.width;
      let drawHeight = page.height;
      if (hasPageCanvasOverride(page)) {
        const fit = Math.min(core.width / page.width, core.height / page.height);
        drawWidth = page.width * fit;
        drawHeight = page.height * fit;
      }
      const imageCompression = options.imageCompression || null;
      const cacheKey = imageCompression
        ? `${source.id}:${Math.round(drawWidth)}x${Math.round(drawHeight)}:${imageCompression.maxDpi}:${imageCompression.jpegQuality}`
        : source.id;
      let embedded = embeddedImages.get(cacheKey);
      if (!embedded) {
        embedded = await embedImageForExport(output, source, imageCompression ? {
          compress: true,
          maxDpi: imageCompression.maxDpi,
          jpegQuality: imageCompression.jpegQuality,
          targetWidthPts: drawWidth,
          targetHeightPts: drawHeight,
        } : {});
        embeddedImages.set(cacheKey, embedded);
      }
      const outPage = output.addPage([base.width, base.height]);
      if (hasPageCanvasOverride(page)) {
        outPage.drawImage(embedded, { x: edge.left + (core.width - drawWidth) / 2, y: edge.bottom + (core.height - drawHeight) / 2, width: drawWidth, height: drawHeight });
      } else outPage.drawImage(embedded, { x: edge.left, y: edge.bottom, width: drawWidth, height: drawHeight });
      drawPageAnnotationsPdf(outPage, page, 0, pdfLib);
      if (page.rotation) outPage.setRotation(degrees((page.rotation + 360) % 360));
    } else {
      throw new Error(`Unsupported source type on output page ${i + 1}.`);
    }

    if (i % 4 === 3) await new Promise(resolve => setTimeout(resolve, 0));
  }
  return output.save({ useObjectStreams: true, addDefaultPage: false, updateFieldAppearances: false });
}

async function normalizePdfBytesToLetter(inputBytes, options={}) {
  const { PDFDocument } = await loadPdfExportEngine();
  const pdf = await PDFDocument.load(inputBytes, { updateMetadata: false });
  const pages = pdf.getPages();
  const portrait = { width: 612, height: 792 };
  const landscape = { width: 792, height: 612 };

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    options.onProgress?.(i + 1, pages.length);
    const rotation = ((page.getRotation?.().angle || 0) % 360 + 360) % 360;
    const oddRotation = rotation === 90 || rotation === 270;
    const box = page.getCropBox?.() || page.getMediaBox?.() || { x: 0, y: 0, width: page.getWidth(), height: page.getHeight() };
    const displayWidth = oddRotation ? box.height : box.width;
    const displayHeight = oddRotation ? box.width : box.height;
    const targetDisplay = displayWidth > displayHeight ? landscape : portrait;
    const rawTargetWidth = oddRotation ? targetDisplay.height : targetDisplay.width;
    const rawTargetHeight = oddRotation ? targetDisplay.width : targetDisplay.height;

    // Never enlarge smaller scans/pages. Larger pages are reduced just enough
    // to fit the Letter canvas, then every page is centered on that canvas.
    const fit = Math.min(1, rawTargetWidth / box.width, rawTargetHeight / box.height);
    if (fit < 0.999999) {
      page.scaleContent(fit, fit);
      page.scaleAnnotations?.(fit, fit);
    }
    const scaledX = box.x * fit;
    const scaledY = box.y * fit;
    const scaledWidth = box.width * fit;
    const scaledHeight = box.height * fit;
    const x = scaledX - (rawTargetWidth - scaledWidth) / 2;
    const y = scaledY - (rawTargetHeight - scaledHeight) / 2;
    page.setMediaBox(x, y, rawTargetWidth, rawTargetHeight);
    page.setCropBox?.(x, y, rawTargetWidth, rawTargetHeight);
    page.setBleedBox?.(x, y, rawTargetWidth, rawTargetHeight);
    page.setTrimBox?.(x, y, rawTargetWidth, rawTargetHeight);
    page.setArtBox?.(x, y, rawTargetWidth, rawTargetHeight);
    if (i % 6 === 5) await new Promise(resolve => setTimeout(resolve, 0));
  }
  return pdf.save({ useObjectStreams: true, addDefaultPage: false, updateFieldAppearances: false });
}


async function rasterizePdfBytes(inputBytes, profile, options={}) {
  if (!state.pdfjs) await loadPdfEngine();
  if (!state.pdfjs) throw new Error('The PDF rendering engine is unavailable for raster compression.');
  const { PDFDocument } = await loadPdfExportEngine();
  const dpi = Math.max(36, Number(profile.rasterDpi) || 120);
  const quality = clamp(Number(profile.rasterQuality) || 0.65, 0.25, 0.95);
  const input = await state.pdfjs.getDocument({
    data: inputBytes.slice(),
    wasmUrl: PDFJS_WASM_URL,
    cMapUrl: PDFJS_CMAP_URL,
    cMapPacked: true,
    standardFontDataUrl: PDFJS_STANDARD_FONT_URL,
    useWasm: true,
  }).promise;
  const output = await PDFDocument.create();
  const maxPixels = 12_000_000;
  try {
    for (let n = 1; n <= input.numPages; n++) {
      options.onProgress?.(n, input.numPages, `Rasterizing page ${n} of ${input.numPages}…`);
      const pdfPage = await input.getPage(n);
      const baseViewport = pdfPage.getViewport({ scale: 1 });
      let scale = dpi / 72;
      let viewport = pdfPage.getViewport({ scale });
      if (viewport.width * viewport.height > maxPixels) {
        scale *= Math.sqrt(maxPixels / (viewport.width * viewport.height));
        viewport = pdfPage.getViewport({ scale });
      }
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(viewport.width));
      canvas.height = Math.max(1, Math.round(viewport.height));
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) throw new Error('Could not create raster compression canvas.');
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      await pdfPage.render({ canvasContext: ctx, viewport, background: '#ffffff' }).promise;
      const blob = await new Promise((resolve, reject) => canvas.toBlob(
        b => b ? resolve(b) : reject(new Error(`Could not encode rasterized page ${n}.`)),
        'image/jpeg',
        quality,
      ));
      const jpg = await output.embedJpg(new Uint8Array(await blob.arrayBuffer()));
      const outPage = output.addPage([baseViewport.width, baseViewport.height]);
      outPage.drawImage(jpg, { x: 0, y: 0, width: baseViewport.width, height: baseViewport.height });
      canvas.width = canvas.height = 1;
      try { pdfPage.cleanup?.(); } catch {}
      if (n % 2 === 0) await new Promise(resolve => setTimeout(resolve, 0));
    }
  } finally {
    try { await input.cleanup?.(); } catch {}
    try { await input.destroy?.(); } catch {}
  }
  return output.save({ useObjectStreams: true, addDefaultPage: false, updateFieldAppearances: false });
}

function documentHasImportedImagePages(doc) {
  return doc.pages.some(page => page.kind === 'image' || state.sources.get(page.sourceId)?.type === 'image');
}

function targetStartIndexForRaster(structuralSize, targetBytes) {
  const ratio = targetBytes > 0 ? structuralSize / targetBytes : 1;
  if (ratio > 4) return 2;
  if (ratio > 2) return 1;
  return 0;
}

async function compressDocumentBytes(doc, settings, options={}) {
  const method = settings.method || 'preserve';
  const level = settings.level || 'medium';
  const targetBytes = settings.targetBytes || null;
  const sourcePdfCache = new Map();
  const report = (text) => options.onProgress?.(text);

  if (method === 'preserve') {
    const profiles = level === 'target'
      ? (documentHasImportedImagePages(doc) ? TARGET_PRESERVE_PROFILES : [TARGET_PRESERVE_PROFILES[0]])
      : [COMPRESSION_PROFILES[level] || COMPRESSION_PROFILES.medium];
    let best = null;
    for (let i = 0; i < profiles.length; i++) {
      const profile = profiles[i];
      report(level === 'target' ? `Structure-preserving pass ${i + 1} of ${profiles.length}…` : `Compressing imported images (${COMPRESSION_PROFILES[level]?.label || 'Medium'})…`);
      let bytes = await buildPdfBytes(doc.pages, {
        sourcePdfCache,
        imageCompression: { maxDpi: profile.maxDpi, jpegQuality: profile.jpegQuality },
        onProgress: (done, total) => options.onPageProgress?.(done, total),
      });
      if (settings.normalizeLetter) {
        report('Normalizing pages to Letter canvas…');
        bytes = await normalizePdfBytesToLetter(bytes, {
          onProgress: (done, total) => options.onNormalizeProgress?.(done, total),
        });
      }
      if (!best || bytes.length < best.length) best = bytes;
      if (!targetBytes || bytes.length <= targetBytes) return { bytes, metTarget: true };
      await new Promise(resolve => setTimeout(resolve, 0));
    }
    return { bytes: best, metTarget: !targetBytes || best.length <= targetBytes };
  }

  report('Building the edited PDF before raster compression…');
  let structural = await buildPdfBytes(doc.pages, {
    sourcePdfCache,
    onProgress: (done, total) => options.onPageProgress?.(done, total),
  });
  if (settings.normalizeLetter) {
    report('Normalizing pages to Letter canvas…');
    structural = await normalizePdfBytesToLetter(structural, {
      onProgress: (done, total) => options.onNormalizeProgress?.(done, total),
    });
  }
  const profiles = level === 'target'
    ? TARGET_RASTER_PROFILES.slice(targetStartIndexForRaster(structural.length, targetBytes))
    : [{ rasterDpi: COMPRESSION_PROFILES[level]?.rasterDpi || COMPRESSION_PROFILES.medium.rasterDpi, rasterQuality: COMPRESSION_PROFILES[level]?.rasterQuality || COMPRESSION_PROFILES.medium.rasterQuality }];
  let best = null;
  for (let i = 0; i < profiles.length; i++) {
    const profile = profiles[i];
    report(level === 'target'
      ? `Raster pass ${i + 1} of ${profiles.length} · ${profile.rasterDpi} dpi…`
      : `Rasterizing at ${profile.rasterDpi} dpi…`);
    const bytes = await rasterizePdfBytes(structural, profile, {
      onProgress: (done, total, text) => options.onRasterProgress?.(done, total, text),
    });
    if (!best || bytes.length < best.length) best = bytes;
    if (!targetBytes || bytes.length <= targetBytes) return { bytes, metTarget: true };
    await new Promise(resolve => setTimeout(resolve, 0));
  }
  return { bytes: best, metTarget: !targetBytes || best.length <= targetBytes };
}

function uniqueCompressedZipName(doc, used) {
  const base = cleanFilenameBase(doc.name, 'document');
  let candidate = `${base}-compressed.pdf`;
  let n = 2;
  while (used.has(candidate.toLowerCase())) candidate = `${base}-compressed-${n++}.pdf`;
  used.add(candidate.toLowerCase());
  return candidate;
}

async function compressSelectedDocuments() {
  saveCurrentDocumentState();
  const docs = selectedFileDocuments();
  if (!docs.length) return;
  const method = els.compressionMethod?.value || 'preserve';
  const level = els.compressionLevel?.value || 'medium';
  const targetMb = Number(els.compressionTargetMb?.value);
  const targetBytes = level === 'target' ? Math.round(targetMb * 1024 * 1024) : null;
  const normalizeLetter = !!els.compressionNormalizeLetter?.checked;
  if (level === 'target' && (!Number.isFinite(targetMb) || targetMb <= 0)) {
    els.compressionProgress.textContent = 'Enter a maximum file size greater than 0 MB.';
    return;
  }

  els.compressBtn.disabled = true;
  els.compressionProgress.textContent = 'Preparing compression…';
  setStatus('Compressing PDF…', true);
  try {
    const results = [];
    for (let i = 0; i < docs.length; i++) {
      const doc = docs[i];
      const prefix = docs.length > 1 ? `${i + 1} of ${docs.length} · ${doc.name}: ` : '';
      const result = await compressDocumentBytes(doc, { method, level, targetBytes, normalizeLetter }, {
        onProgress: text => {
          els.compressionProgress.textContent = `${prefix}${text}`;
          setStatus(`Compressing ${doc.name}…`, true);
        },
        onPageProgress: (done, total) => {
          els.compressionProgress.textContent = `${prefix}building page ${done} of ${total}…`;
        },
        onRasterProgress: (done, total, text) => {
          els.compressionProgress.textContent = `${prefix}${text || `rasterizing page ${done} of ${total}…`}`;
        },
        onNormalizeProgress: (done, total) => {
          els.compressionProgress.textContent = `${prefix}normalizing page ${done} of ${total} to Letter…`;
        },
      });
      if (targetBytes && !result.metTarget) {
        const advice = method === 'preserve'
          ? 'Choose “Rasterize pages” for a stronger, destructive compression pass.'
          : 'The requested maximum is smaller than the lowest raster setting could reach.';
        throw new Error(`${doc.name}: best result was ${formatFileSize(result.bytes.length)}, above the ${targetMb} MB target. ${advice}`);
      }
      results.push({ doc, bytes: result.bytes });
    }

    if (results.length === 1) {
      const { doc, bytes } = results[0];
      const filename = ensurePdfFilename(els.compressionFilename.value, defaultCompressionFilename(doc.name));
      downloadPdfBytes(bytes, filename);
      markDocumentExported(doc);
      els.compressionProgress.textContent = `Compressed ${doc.name} to ${formatFileSize(bytes.length)} as ${filename}.`;
      setStatus(`Compressed ${filename}`);
    } else {
      const JSZip = await loadZipEngine();
      const zip = new JSZip();
      const used = new Set();
      for (const { doc, bytes } of results) {
        zip.file(uniqueCompressedZipName(doc, used), bytes);
        markDocumentExported(doc);
      }
      els.compressionProgress.textContent = 'Packaging compressed PDFs into ZIP…';
      const blob = await zip.generateAsync({ type: 'blob', compression: 'STORE', mimeType: 'application/zip' });
      const filename = ensureZipFilename(els.compressionFilename.value, 'PDF-Workbench-Compressed.zip');
      downloadBlob(blob, filename);
      els.compressionProgress.textContent = `Compressed ${results.length} PDFs and saved ${filename} (${formatFileSize(blob.size)}).`;
      setStatus(`Compressed ${results.length} PDFs`);
    }
  } catch (err) {
    console.error(err);
    els.compressionProgress.textContent = `Compression stopped: ${err?.message || err}`;
    setStatus('PDF compression stopped');
  } finally {
    updateCompressionUi(selectedFileDocuments());
  }
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
      markDocumentExported(doc);
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
        markDocumentExported(doc);
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
  const extractDocumentKey = `${doc.id}\n${doc.name}`;
  if (els.extractFilename.dataset.documentKey !== extractDocumentKey) {
    els.extractFilename.value = defaultExtractFilename(doc.name);
    els.extractFilename.dataset.documentKey = extractDocumentKey;
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
    for (const page of doc.pages) combinedPages.push(clonePageState(page, { newId: true, includeAnnotations: true }));
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
  scheduleLibraryPersist(120);
}

function showWorkspaceMode(mode) {
  state.workspaceMode = mode;
  if (mode !== 'view' && state.annotationSelection?.ids?.size) clearAnnotationSelection(false);
  if (mode !== 'view') state.selectionGesture = null;
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
  checkpointWorkspaceNow();
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
  if (els.pageGeometryBtn) els.pageGeometryBtn.disabled = !count;
  if (els.pageEdgeBtn) els.pageEdgeBtn.disabled = !count;
  els.duplicateBtn.disabled = !hasSelection;
  if (els.extractSelectedPagesBtn) els.extractSelectedPagesBtn.disabled = !hasSelection;
  if (els.copyPagesBtn) els.copyPagesBtn.disabled = !hasSelection || state.documents.length < 2;
  els.deleteBtn.disabled = !hasSelection;
  els.selectAllBtn.textContent = selectedCount === count && count ? 'Select none' : 'Select all';
  els.pageCounter.textContent = count ? `${activeIndex() + 1} / ${count}` : '0 / 0';
  updateHistoryButtons();
  updateSelectionToolbar();
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
    const { width: w, height: h } = pageDisplayDimensions(page);
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
  const { width: bw, height: bh } = pageDisplayDimensions(page);
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
    drawPageAnnotationsCanvas(page, canvas.getContext('2d'), canvas.width, canvas.height);
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

function copySelectedPagesToDocument() {
  const sourceDoc = currentDocument();
  if (!sourceDoc || !state.selected.size) return;
  const destinationId = els.pageTransferDestination?.value || '';
  const destination = documentById(destinationId);
  if (!destination || destination.id === sourceDoc.id) {
    setStatus('Choose another open document as the destination');
    return;
  }

  const sourcePages = sourceDoc.pages.filter(page => state.selected.has(page.id));
  if (!sourcePages.length) return;

  let insertIndex = destination.pages.length;
  const position = els.pageTransferPosition?.value || 'end';
  if (position === 'beginning') insertIndex = 0;
  else if (position === 'after') {
    const pageNo = Number(els.pageTransferAfterPage?.value);
    if (!Number.isInteger(pageNo) || pageNo < 1 || pageNo > destination.pages.length) {
      setStatus(`Enter a destination page number from 1 to ${Math.max(1, destination.pages.length)}`);
      els.pageTransferAfterPage?.focus();
      return;
    }
    insertIndex = pageNo;
  }

  const before = destination.pages.map(page => clonePageState(page));
  const copies = sourcePages.map(page => clonePageInstance(page, true));
  const oldPages = destination.pages;
  destination.pages = [
    ...oldPages.slice(0, insertIndex),
    ...copies,
    ...oldPages.slice(insertIndex),
  ];

  // Destination undo remains document-local: because Copy changes only the
  // destination, its existing page-history model can undo the operation safely
  // after the user switches to that document. A true cross-document Move is
  // intentionally deferred until there is an atomic multi-document undo model.
  destination.history.push(before);
  if (destination.history.length > 50) destination.history.shift();
  destination.future = [];
  destination.needsExport = true;
  destination.modifiedAt = Date.now();
  scheduleLibraryPersist(180);

  if (!destination.activePageId && destination.pages.length) destination.activePageId = copies[0]?.id || destination.pages[0].id;
  const singleView = ensureSingleView(destination);
  if (!singleView.activePageId && destination.pages.length) singleView.activePageId = destination.activePageId || destination.pages[0].id;

  // If pages were inserted before a stored view's logical current page, its raw
  // scroll offsets belong to the old page stack. Keep page identity, but let the
  // next render restore that logical page instead of applying stale pixels.
  const invalidateViewIfNeeded = (view) => {
    if (!view?.activePageId) return;
    const oldActiveIndex = oldPages.findIndex(page => page.id === view.activePageId);
    if (oldActiveIndex >= 0 && insertIndex <= oldActiveIndex) {
      view.scrollTop = null;
      view.scrollLeft = null;
    }
  };
  invalidateViewIfNeeded(singleView);
  for (const pane of Object.values(state.splitPanes)) {
    const view = pane.views.get(destination.id);
    if (view) invalidateViewIfNeeded(view);
  }

  els.pageTransferDialog?.close();
  renderDocumentSelect();
  setStatus(`Copied ${copies.length} page${copies.length === 1 ? '' : 's'} to ${destination.name}`);
}

function updatePageTransferPositionUi() {
  const destination = documentById(els.pageTransferDestination?.value || '');
  const pageCount = destination?.pages?.length || 0;
  const after = els.pageTransferPosition?.value === 'after';
  els.pageTransferAfterField?.classList.toggle('hidden', !after);
  if (els.pageTransferAfterPage) {
    els.pageTransferAfterPage.max = String(Math.max(1, pageCount));
    els.pageTransferAfterPage.disabled = !after || pageCount === 0;
    if (!Number.isInteger(Number(els.pageTransferAfterPage.value)) || Number(els.pageTransferAfterPage.value) < 1 || Number(els.pageTransferAfterPage.value) > pageCount) {
      els.pageTransferAfterPage.value = pageCount ? String(pageCount) : '';
    }
  }
  const afterOption = els.pageTransferPosition?.querySelector('option[value="after"]');
  if (afterOption) afterOption.disabled = pageCount === 0;
  if (pageCount === 0 && after) els.pageTransferPosition.value = 'end';
}

function openPageTransferDialog() {
  saveCurrentDocumentState({ readViewDom: false });
  const sourceDoc = currentDocument();
  const selectedPages = sourceDoc?.pages?.filter(page => state.selected.has(page.id)) || [];
  const destinations = state.documents.filter(doc => doc.id !== sourceDoc?.id);
  if (!sourceDoc || !selectedPages.length) {
    setStatus('Select one or more pages first');
    return;
  }
  if (!destinations.length) {
    setStatus('Open another document before copying pages');
    return;
  }

  els.pageTransferDestination.replaceChildren();
  for (const doc of destinations) {
    const option = document.createElement('option');
    option.value = doc.id;
    option.textContent = `${doc.name} (${doc.pages.length} page${doc.pages.length === 1 ? '' : 's'})`;
    els.pageTransferDestination.append(option);
  }
  if (els.pageTransferSummary) {
    els.pageTransferSummary.textContent = `${selectedPages.length} selected page${selectedPages.length === 1 ? '' : 's'} from ${sourceDoc.name}.`;
  }
  els.pageTransferPosition.value = 'end';
  updatePageTransferPositionUi();
  els.pageTransferDialog.showModal();
}

const PAGE_SIZE_PRESETS = {
  letter: { label: 'US Letter', width: 612, height: 792 },
  legal: { label: 'US Legal', width: 612, height: 1008 },
  a4: { label: 'A4', width: 595.28, height: 841.89 },
};

function geometryAffectedPages(scope=null) {
  const chosenScope = scope || els.pageGeometryScope?.value || (state.selected.size ? 'selected' : 'all');
  return chosenScope === 'selected' && state.selected.size ? state.pages.filter(page => state.selected.has(page.id)) : [...state.pages];
}

function geometryBaseSizeFromDialog() {
  const preset = els.pageGeometryPreset?.value || 'letter';
  if (preset === 'first') {
    const first = state.pages[0];
    if (!first) return null;
    return pageDisplayDimensions(first);
  }
  if (preset === 'custom') {
    const widthIn = Number(els.pageGeometryCustomWidth?.value);
    const heightIn = Number(els.pageGeometryCustomHeight?.value);
    if (!(widthIn > 0) || !(heightIn > 0) || widthIn > 200 || heightIn > 200) return null;
    return { width: widthIn * 72, height: heightIn * 72 };
  }
  return PAGE_SIZE_PRESETS[preset] || PAGE_SIZE_PRESETS.letter;
}

function orientedGeometrySize(base, orientation, page) {
  let small = Math.min(base.width, base.height);
  let large = Math.max(base.width, base.height);
  if (Math.abs(base.width - base.height) < 0.01) return { width: base.width, height: base.height };
  let landscape;
  if (orientation === 'landscape') landscape = true;
  else if (orientation === 'portrait') landscape = false;
  else {
    const current = pageDisplayDimensions(page);
    landscape = current.width > current.height;
  }
  return landscape ? { width: large, height: small } : { width: small, height: large };
}

function geometryCanvasBaseFromDisplayed(page, displayed) {
  return page.rotation % 180 === 0
    ? { width: displayed.width, height: displayed.height }
    : { width: displayed.height, height: displayed.width };
}

function updatePageGeometryDialog() {
  if (!els.pageGeometryDialog?.open) return;
  const selectedCount = state.selected.size;
  if (els.pageGeometryScope) {
    const selectedOption = els.pageGeometryScope.querySelector('option[value="selected"]');
    if (selectedOption) {
      selectedOption.disabled = !selectedCount;
      selectedOption.textContent = selectedCount ? `Selected pages (${selectedCount})` : 'Selected pages (none)';
    }
    if (!selectedCount && els.pageGeometryScope.value === 'selected') els.pageGeometryScope.value = 'all';
  }
  const scope = els.pageGeometryScope?.value || (selectedCount ? 'selected' : 'all');
  const pages = geometryAffectedPages(scope);
  if (els.pageGeometrySummary) {
    els.pageGeometrySummary.textContent = scope === 'selected'
      ? `${pages.length} selected page${pages.length === 1 ? '' : 's'} will be resized non-destructively.`
      : `All ${pages.length} page${pages.length === 1 ? '' : 's'} will be resized non-destructively.`;
  }
  const custom = els.pageGeometryPreset?.value === 'custom';
  els.pageGeometryCustomFields?.classList.toggle('hidden', !custom);

  const base = geometryBaseSizeFromDialog();
  const sample = pages[0] || state.pages[0];
  if (!base || !sample) {
    if (els.pageGeometryApplyBtn) els.pageGeometryApplyBtn.disabled = true;
    return;
  }
  const displayed = orientedGeometrySize(base, els.pageGeometryOrientation?.value || 'preserve', sample);
  if (els.pageGeometryApplyBtn) els.pageGeometryApplyBtn.disabled = false;
  if (els.pageGeometryPreviewPaper) {
    const ratio = clamp(displayed.width / displayed.height, 0.28, 3.5);
    if (ratio >= 1) {
      els.pageGeometryPreviewPaper.style.width = '154px';
      els.pageGeometryPreviewPaper.style.height = `${154 / ratio}px`;
    } else {
      els.pageGeometryPreviewPaper.style.height = '154px';
      els.pageGeometryPreviewPaper.style.width = `${154 * ratio}px`;
    }
  }
  if (els.pageGeometryPreviewLabel) {
    els.pageGeometryPreviewLabel.textContent = `${(displayed.width / 72).toFixed(2).replace(/\.00$/, '')} × ${(displayed.height / 72).toFixed(2).replace(/\.00$/, '')} in · fit & center`;
  }
}

function openPageGeometryDialog() {
  if (!state.pages.length || !els.pageGeometryDialog) return;
  if (els.pageGeometryPreset) els.pageGeometryPreset.value = 'letter';
  if (els.pageGeometryScope) els.pageGeometryScope.value = state.selected.size ? 'selected' : 'all';
  if (els.pageGeometryOrientation) els.pageGeometryOrientation.value = 'preserve';
  if (els.pageGeometryCustomWidth) els.pageGeometryCustomWidth.value = '8.5';
  if (els.pageGeometryCustomHeight) els.pageGeometryCustomHeight.value = '11';
  els.pageGeometryDialog.showModal();
  updatePageGeometryDialog();
}

function applyPageGeometry() {
  const scope = els.pageGeometryScope?.value || (state.selected.size ? 'selected' : 'all');
  let pages = scope === 'selected' ? state.pages.filter(page => state.selected.has(page.id)) : [...state.pages];
  if (!pages.length) return;
  const base = geometryBaseSizeFromDialog();
  if (!base) {
    setStatus('Enter a valid custom width and height.');
    return;
  }
  const orientation = els.pageGeometryOrientation?.value || 'preserve';
  const before = snapshotPages();
  for (const page of pages) {
    const oldBase = pageCanvasBaseDimensions(page);
    const displayed = orientedGeometrySize(base, orientation, page);
    const canvas = geometryCanvasBaseFromDisplayed(page, displayed);
    fitPageAnnotationsToCanvas(page, oldBase, canvas);
    page.canvasWidth = Math.max(1, canvas.width);
    page.canvasHeight = Math.max(1, canvas.height);
    page.canvasPlacement = 'fit-center';
    // Setting an exact page size starts a fresh canvas. Any prior edge crop or
    // added margins are intentionally cleared so the resulting dimensions are
    // exactly the requested preset/custom size. Apply Crop / margins afterward
    // when both operations are desired.
    page.edgeTop = 0;
    page.edgeRight = 0;
    page.edgeBottom = 0;
    page.edgeLeft = 0;
  }
  commitHistory(before);
  els.pageGeometryDialog?.close();

  // Changing page canvas sizes changes the height of the document stack. Raw
  // scroll offsets from the old geometry are no longer meaningful. Preserve
  // each view instance's logical active page, but let the rebuilt viewer center
  // that page instead of restoring stale pre-resize pixels. This applies
  // independently to same-document split panes.
  const doc = currentDocument();
  if (doc) {
    const single = ensureSingleView(doc);
    if (single) { single.scrollTop = null; single.scrollLeft = null; }
    for (const paneId of ['left', 'right']) {
      const pane = splitPaneState(paneId);
      if (pane.documentId !== doc.id) continue;
      const view = paneView(paneId, doc.id);
      if (view) { view.scrollTop = null; view.scrollLeft = null; }
    }
  }
  saveCurrentDocumentState({ readViewDom: false });
  renderAll({ saveState: false });
  setStatus(`Resized ${pages.length} page${pages.length === 1 ? '' : 's'} · fit & center`);
}


const MIN_PAGE_EDGE_RESULT_PT = 18; // keep at least 1/4 inch in each dimension

function pageEdgeAffectedPages(scope=null) {
  const chosen = scope || els.pageEdgeScope?.value || (state.selected.size ? 'selected' : 'all');
  return chosen === 'selected' ? state.pages.filter(page => state.selected.has(page.id)) : [...state.pages];
}

function pageEdgeAmountsFromDialog() {
  const parse = (input) => Number(input?.value);
  const values = {
    top: parse(els.pageEdgeTop),
    right: parse(els.pageEdgeRight),
    bottom: parse(els.pageEdgeBottom),
    left: parse(els.pageEdgeLeft),
  };
  if (Object.values(values).some(value => !Number.isFinite(value) || value < 0 || value > 100)) return null;
  return {
    top: values.top * 72,
    right: values.right * 72,
    bottom: values.bottom * 72,
    left: values.left * 72,
  };
}

function setPageEdgePreset(value) {
  const amount = Number(value);
  if (!Number.isFinite(amount)) return;
  for (const input of [els.pageEdgeTop, els.pageEdgeRight, els.pageEdgeBottom, els.pageEdgeLeft]) {
    if (input) input.value = String(amount);
  }
}

function proposedDisplayedEdgeDelta() {
  const amount = pageEdgeAmountsFromDialog();
  if (!amount) return null;
  const sign = els.pageEdgeOperation?.value === 'crop' ? -1 : 1;
  return {
    top: amount.top * sign,
    right: amount.right * sign,
    bottom: amount.bottom * sign,
    left: amount.left * sign,
  };
}

function pageEdgesWouldRemainValid(page, displayedDelta) {
  if (!page || !displayedDelta) return false;
  const current = pageDisplayDimensions(page);
  return current.width + displayedDelta.left + displayedDelta.right >= MIN_PAGE_EDGE_RESULT_PT
    && current.height + displayedDelta.top + displayedDelta.bottom >= MIN_PAGE_EDGE_RESULT_PT;
}

function updatePageEdgeDialog() {
  if (!els.pageEdgeDialog?.open) return;
  const selectedCount = state.selected.size;
  if (els.pageEdgeScope) {
    const selectedOption = els.pageEdgeScope.querySelector('option[value="selected"]');
    if (selectedOption) {
      selectedOption.disabled = !selectedCount;
      selectedOption.textContent = selectedCount ? `Selected pages (${selectedCount})` : 'Selected pages (none)';
    }
    if (!selectedCount && els.pageEdgeScope.value === 'selected') els.pageEdgeScope.value = 'all';
  }
  const scope = els.pageEdgeScope?.value || (selectedCount ? 'selected' : 'all');
  const pages = pageEdgeAffectedPages(scope);
  const operation = els.pageEdgeOperation?.value === 'crop' ? 'crop' : 'margin';
  if (els.pageEdgeSummary) {
    const verb = operation === 'crop' ? 'Crop' : 'Add margins to';
    els.pageEdgeSummary.textContent = `${verb} ${scope === 'selected' ? `${pages.length} selected` : `all ${pages.length}`} page${pages.length === 1 ? '' : 's'}.`;
  }

  const delta = proposedDisplayedEdgeDelta();
  const sample = pages[0] || state.pages[0];
  const valid = !!delta && pages.length > 0 && pages.every(page => pageEdgesWouldRemainValid(page, delta));
  if (els.pageEdgeApplyBtn) els.pageEdgeApplyBtn.disabled = !valid;
  if (!sample || !delta) return;

  const current = pageDisplayDimensions(sample);
  const nextW = current.width + delta.left + delta.right;
  const nextH = current.height + delta.top + delta.bottom;
  const ratio = clamp(nextW / nextH, 0.28, 3.5);
  let paperW, paperH;
  if (ratio >= 1) { paperW = 158; paperH = 158 / ratio; }
  else { paperH = 158; paperW = 158 * ratio; }
  if (els.pageEdgePreviewPaper) {
    els.pageEdgePreviewPaper.style.width = `${paperW}px`;
    els.pageEdgePreviewPaper.style.height = `${paperH}px`;
  }
  if (els.pageEdgePreviewContent) {
    // The inner rectangle represents the current page. Positive margins move it
    // inward; crop uses negative offsets so the current page extends beyond the
    // new boundary and is clipped by the preview paper.
    const left = paperW * delta.left / nextW;
    const top = paperH * delta.top / nextH;
    const width = paperW * current.width / nextW;
    const height = paperH * current.height / nextH;
    els.pageEdgePreviewContent.style.left = `${left}px`;
    els.pageEdgePreviewContent.style.top = `${top}px`;
    els.pageEdgePreviewContent.style.width = `${width}px`;
    els.pageEdgePreviewContent.style.height = `${height}px`;
  }
  if (els.pageEdgePreviewLabel) {
    const fmt = value => (value / 72).toFixed(2).replace(/\.00$/, '').replace(/(\.\d)0$/, '$1');
    els.pageEdgePreviewLabel.textContent = valid
      ? `${fmt(nextW)} × ${fmt(nextH)} in · ${operation === 'crop' ? 'crop without scaling' : 'white canvas added'}`
      : 'Crop is too large for at least one affected page.';
  }
}

function openPageEdgeDialog() {
  if (!state.pages.length || !els.pageEdgeDialog) return;
  if (els.pageEdgeScope) els.pageEdgeScope.value = state.selected.size ? 'selected' : 'all';
  if (els.pageEdgeOperation) els.pageEdgeOperation.value = 'margin';
  if (els.pageEdgePreset) els.pageEdgePreset.value = '0.25';
  setPageEdgePreset(0.25);
  els.pageEdgeDialog.showModal();
  updatePageEdgeDialog();
}

function invalidateCurrentDocumentGeometryScroll() {
  const doc = currentDocument();
  if (!doc) return;
  const single = ensureSingleView(doc);
  if (single) { single.scrollTop = null; single.scrollLeft = null; }
  for (const paneId of ['left', 'right']) {
    const pane = splitPaneState(paneId);
    if (pane.documentId !== doc.id) continue;
    const view = paneView(paneId, doc.id);
    if (view) { view.scrollTop = null; view.scrollLeft = null; }
  }
}

function applyPageEdgeChange() {
  const scope = els.pageEdgeScope?.value || (state.selected.size ? 'selected' : 'all');
  const pages = pageEdgeAffectedPages(scope);
  const displayedDelta = proposedDisplayedEdgeDelta();
  if (!pages.length || !displayedDelta) {
    setStatus('Enter valid nonnegative edge amounts.');
    return;
  }
  if (!pages.every(page => pageEdgesWouldRemainValid(page, displayedDelta))) {
    setStatus('Crop is too large for at least one affected page.');
    return;
  }

  const before = snapshotPages();
  for (const page of pages) {
    const baseDelta = displayedEdgesToBase(page, displayedDelta);
    const edge = pageEdgeAdjustments(page);
    shiftPageAnnotations(page, baseDelta.left, baseDelta.top);
    page.edgeTop = edge.top + baseDelta.top;
    page.edgeRight = edge.right + baseDelta.right;
    page.edgeBottom = edge.bottom + baseDelta.bottom;
    page.edgeLeft = edge.left + baseDelta.left;
  }
  commitHistory(before);
  els.pageEdgeDialog?.close();
  invalidateCurrentDocumentGeometryScroll();
  saveCurrentDocumentState({ readViewDom: false });
  renderAll({ saveState: false });
  const operation = els.pageEdgeOperation?.value === 'crop' ? 'Cropped' : 'Added margins to';
  setStatus(`${operation} ${pages.length} page${pages.length === 1 ? '' : 's'}`);
}

function resetPageEdgeAdjustments() {
  const scope = els.pageEdgeScope?.value || (state.selected.size ? 'selected' : 'all');
  const pages = pageEdgeAffectedPages(scope);
  if (!pages.length) return;
  const changed = pages.some(hasPageEdgeAdjustments);
  if (!changed) {
    setStatus('No crop or margin adjustments to reset.');
    return;
  }
  const before = snapshotPages();
  for (const page of pages) {
    const edge = pageEdgeAdjustments(page);
    shiftPageAnnotations(page, -edge.left, -edge.top);
    page.edgeTop = 0;
    page.edgeRight = 0;
    page.edgeBottom = 0;
    page.edgeLeft = 0;
  }
  commitHistory(before);
  els.pageEdgeDialog?.close();
  invalidateCurrentDocumentGeometryScroll();
  saveCurrentDocumentState({ readViewDom: false });
  renderAll({ saveState: false });
  setStatus(`Reset crop/margins on ${pages.length} page${pages.length === 1 ? '' : 's'}`);
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
      const copy = clonePageState(page, { newId: true, includeAnnotations: true });
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
  scheduleLibraryPersist(1200);
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
    // The PDF raster and annotation overlay are separate canvases. Resize
    // both during the live pinch preview so annotations track page geometry
    // continuously instead of remaining at their pre-pinch CSS size until the
    // final crisp rerender.
    stage.querySelectorAll('canvas').forEach(canvas => {
      canvas.style.width = `${size.width}px`;
      canvas.style.height = `${size.height}px`;
    });
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
    // The PDF raster and annotation overlay are separate canvases. Resize
    // both during the live pinch preview so annotations track page geometry
    // continuously instead of remaining at their pre-pinch CSS size until the
    // final crisp rerender.
    stage.querySelectorAll('canvas').forEach(canvas => {
      canvas.style.width = `${size.width}px`;
      canvas.style.height = `${size.height}px`;
    });
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
  checkpointWorkspaceNow();
}

function computeCssSize(page) {
  const { width: bw, height: bh } = pageDisplayDimensions(page);
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
  for (const canvas of stage.querySelectorAll('canvas')) {
    // Resetting width/height releases the browser/GPU backing store. This is
    // essential for long scan-only PDFs, where each visible page can otherwise
    // keep several megabytes (or much more) of decoded raster memory alive.
    canvas.width = 1;
    canvas.height = 1;
  }
  stage.querySelector('svg.annotation-selection-layer')?.remove();
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
  appendEndOfDocumentPullTarget(els.viewer, state.currentDocumentId, state.scrollMode);
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
  const { width: bw, height: bh } = pageDisplayDimensions(page);
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
  appendEndOfDocumentPullTarget(pe.viewer, doc.id, view.scrollMode);

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
  redrawStageAnnotations(stage, page);
  stage.dataset.rendered = 'true';
  stage.querySelector('.page-loading')?.remove();
}

function goPanePage(paneId, delta, allowAppend=false) {
  const pane = splitPaneState(paneId), doc = documentById(pane.documentId), view = paneView(paneId);
  if (!doc?.pages?.length || !view) return;
  const current = splitActiveIndex(doc, view);
  if (allowAppend && delta > 0 && current >= doc.pages.length - 1) {
    appendAutomaticLastPage(doc.id, paneId);
    return;
  }
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
  redrawStageAnnotations(stage, page);
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

  const drawNaturalContent = async (targetCtx, contentW, contentH) => {
    if (page.kind === 'generated') {
      if (page.generatedType === 'graph') {
        const [displayW, displayH] = rotatedDims(page);
        drawGraphPaperCanvas(targetCtx, contentW, contentH, displayW, displayH);
      }
    } else if (source.type === 'pdf') {
      const pdfPage = await getPdfPage(source, page.sourcePage);
      const totalRotation = ((page.baseRotation || 0) + page.rotation) % 360;
      const natural = pdfPage.getViewport({ scale: 1, rotation: totalRotation });
      const scale = contentW / natural.width;
      const viewport = pdfPage.getViewport({ scale, rotation: totalRotation });
      try { await pdfPage.render({ canvasContext: targetCtx, viewport }).promise; }
      finally { try { pdfPage.cleanup?.(); } catch {} }
    } else {
      const img = await getSourceImage(source);
      targetCtx.save();
      const rotation = page.rotation % 360;
      if (rotation === 90) { targetCtx.translate(contentW, 0); targetCtx.rotate(Math.PI / 2); targetCtx.drawImage(img, 0, 0, contentH, contentW); }
      else if (rotation === 180) { targetCtx.translate(contentW, contentH); targetCtx.rotate(Math.PI); targetCtx.drawImage(img, 0, 0, contentW, contentH); }
      else if (rotation === 270) { targetCtx.translate(0, contentH); targetCtx.rotate(-Math.PI / 2); targetCtx.drawImage(img, 0, 0, contentH, contentW); }
      else targetCtx.drawImage(img, 0, 0, contentW, contentH);
      targetCtx.restore();
    }
  };

  // Render the page's core canvas first. Page-size normalization fits the
  // natural source proportionally into that core canvas. Crop / margin changes
  // are a second, independent edge transform around the core: positive edge
  // values add white canvas; negative values crop without rescaling content.
  const coreBase = pageCoreCanvasBaseDimensions(page);
  const coreDisplay = page.rotation % 180 === 0 ? coreBase : { width: coreBase.height, height: coreBase.width };
  const finalDisplay = pageDisplayDimensions(page);
  const edges = displayEdgeAdjustments(page);

  const renderCore = async (targetCtx, corePixelW, corePixelH) => {
    targetCtx.save();
    targetCtx.fillStyle = '#fff';
    targetCtx.fillRect(0, 0, corePixelW, corePixelH);
    targetCtx.restore();
    if (!hasPageCanvasOverride(page)) {
      await drawNaturalContent(targetCtx, corePixelW, corePixelH);
      return;
    }
    const [contentDisplayW, contentDisplayH] = rotatedDims(page);
    const fit = Math.min(coreDisplay.width / contentDisplayW, coreDisplay.height / contentDisplayH);
    const contentW = Math.max(1, Math.round(corePixelW * (contentDisplayW * fit) / coreDisplay.width));
    const contentH = Math.max(1, Math.round(corePixelH * (contentDisplayH * fit) / coreDisplay.height));
    const contentCanvas = document.createElement('canvas');
    contentCanvas.width = contentW;
    contentCanvas.height = contentH;
    const contentCtx = contentCanvas.getContext('2d', { alpha: false });
    contentCtx.fillStyle = '#fff';
    contentCtx.fillRect(0, 0, contentW, contentH);
    await drawNaturalContent(contentCtx, contentW, contentH);
    const x = Math.round((corePixelW - contentW) / 2);
    const y = Math.round((corePixelH - contentH) / 2);
    targetCtx.drawImage(contentCanvas, x, y);
  };

  if (!hasPageEdgeAdjustments(page)) {
    await renderCore(ctx, targetW, targetH);
    return;
  }

  const corePixelW = Math.max(1, Math.round(targetW * coreDisplay.width / finalDisplay.width));
  const corePixelH = Math.max(1, Math.round(targetH * coreDisplay.height / finalDisplay.height));
  const coreCanvas = document.createElement('canvas');
  coreCanvas.width = corePixelW;
  coreCanvas.height = corePixelH;
  const coreCtx = coreCanvas.getContext('2d', { alpha: false });
  await renderCore(coreCtx, corePixelW, corePixelH);
  const x = Math.round(targetW * edges.left / finalDisplay.width);
  const y = Math.round(targetH * edges.top / finalDisplay.height);
  ctx.drawImage(coreCanvas, x, y);
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
function goPage(delta, allowAppend=false) {
  if (!state.pages.length) return;
  const current = activeIndex();
  if (allowAppend && delta > 0 && current >= state.pages.length - 1) {
    appendAutomaticLastPage(state.currentDocumentId, null);
    return;
  }
  const next = clamp(current + delta, 0, state.pages.length - 1);
  if (next === current && state.pages[next]?.id === state.activePageId) return;
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
  // Milestone 5 starts with the unified annotation bar always visible in
  // Presentation so pen color/width/tool changes are genuinely one tap away.
  // Auto-hide will return as an explicit user setting after the core ink tools
  // have been exercised on Surface and iPad.
  clearTimeout(state.presentationControlsTimer);
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
  els.presentationToolbar.classList.remove('hidden');
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
  state.selectionGesture = null;
  state.annotationSelection = { documentId:null, pageId:null, ids:new Set() };
  state.annotationClipboard = null;
  state.annotationPasteSerial = 0;
  state.annotationPasteTargetKey = null;
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
  renderAll({ saveState: false });
  renderLibraryDocumentList();
  scheduleLibraryPersist(120);
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
      <p>Milestone 5.4.3 keeps restrained Pen smoothing while moving live Highlighter ink to a dedicated incremental canvas so highlighting no longer redraws every existing annotation on each Pencil move. Completed Highlighter strokes are composited once per stroke for cleaner on-screen transparency. This build also prevents and repairs same-id duplicate open documents caused by overlapping asynchronous Library-open requests.</p>
      <ul><li><strong>Unified top annotation strip:</strong> the same thin, full-width toolbar appears in View and Presentation. Presentation controls are appended to the same strip rather than floating over the document.</li><li><strong>Pen, Highlighter, partial eraser, and selection:</strong> Hand/View, Pen, Highlighter, Eraser, and Lasso/Select modes. Pen retains five direct colors and three widths; Highlighter has its own yellow/pink/cyan/green palette and three widths; Eraser cuts only touched portions; Select works on whole annotation objects.</li><li><strong>Editable ink:</strong> strokes and eraser-created fragments remain page-local vector point data in PDF/page coordinates, persist in the Local Library and editable backups, participate in Undo/Redo, and can now be moved, resized, deleted, duplicated, copied, and pasted as whole objects.</li><li><strong>PDF output:</strong> Workbench ink is written into exported PDFs as continuous vector paths with round joins/caps. Annotations disable untouched-byte passthrough only on documents that actually contain ink.</li><li><strong>Workspace continuation:</strong> open documents, active workspace/split state, and viewer state are checkpointed for restart restoration. At the document end, pull/scroll beyond the last page and release to append the Template Manager's configured default; Graph paper is the factory default.</li><li><strong>Presentation access:</strong> for this first annotation build the top strip remains visible in Presentation so tool/color/width changes are one tap away. Auto-hide versus always-visible will become a setting after the core tools are validated.</li></ul>
      <p><strong>Next annotation step:</strong> image insertion as selectable annotation objects. The future new-document size refinement will also offer device-derived Presentation canvas sizes alongside US Letter.</p>
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

// Milestone 5.0.9: pen proximity and palm suppression. ChromeOS can report a
// resting palm as a rapid burst of several ordinary touch pointers. If those
// touches are immediately treated as one-finger pan / two-finger pinch, the
// page jumps while the user is trying to write. Track real pen proximity where
// the platform exposes it, and give Pen-mode touch input a very short intent
// window so a 3+ contact palm burst can be rejected before navigation starts.
// Pointer/stylus ink itself remains on the 5.0.8 path.
const PEN_TOUCH_INTENT_DELAY_MS = 120;
const PEN_PALM_GUARD_AFTER_CONTACT_MS = 420;
const PEN_PALM_GUARD_AFTER_HOVER_MS = 220;

function mapHasViewer(map, viewer) {
  for (const value of map.values()) if ((value?.viewer || value) === viewer) return true;
  return false;
}
function mapHasRecentViewer(map, viewer, maxAgeMs) {
  const now = performance.now();
  for (const value of map.values()) {
    if ((value?.viewer || value) !== viewer) continue;
    if (!Number.isFinite(value?.lastSeen) || now - value.lastSeen <= maxAgeMs) return true;
  }
  return false;
}
function setPenPalmGuard(viewer, ms) {
  if (!viewer) return;
  state.penPalmGuardViewer = viewer;
  state.penPalmGuardUntil = Math.max(state.penPalmGuardUntil || 0, performance.now() + ms);
}
function penPalmGuardActive(viewer) {
  if (!isStylusAnnotationTool()) return false;
  if (mapHasViewer(state.penContactPointers, viewer)) return true;
  // Do not let a stale missing pointerleave permanently disable deliberate
  // finger navigation. Fresh hover events still provide strong palm evidence.
  if (mapHasRecentViewer(state.penHoverPointers, viewer, 700)) return true;
  return state.penPalmGuardViewer === viewer && performance.now() < state.penPalmGuardUntil;
}
function updateViewerPenCursor(viewer) {
  const present = mapHasViewer(state.penHoverPointers, viewer) || mapHasViewer(state.penContactPointers, viewer);
  viewer.classList.toggle('pen-pointer-present', present);
}
function bindViewerPenProximity(viewer) {
  if (!viewer || viewer.dataset.penProximityBound === 'true') return;
  viewer.dataset.penProximityBound = 'true';

  const enterOrMove = (event) => {
    if (event.pointerType !== 'pen') return;
    state.penHoverPointers.set(event.pointerId, { viewer, lastSeen:performance.now() });
    if (event.buttons || event.pressure > 0) {
      state.penContactPointers.set(event.pointerId, { viewer, lastSeen:performance.now() });
      setPenPalmGuard(viewer, PEN_PALM_GUARD_AFTER_CONTACT_MS);
    } else {
      setPenPalmGuard(viewer, PEN_PALM_GUARD_AFTER_HOVER_MS);
    }
    updateViewerPenCursor(viewer);
  };
  viewer.addEventListener('pointerenter', enterOrMove, { passive:true });
  viewer.addEventListener('pointermove', enterOrMove, { passive:true });
  const restoreMouseCursor = (event) => {
    if (event.pointerType === 'mouse') viewer.classList.remove('pen-pointer-present');
  };
  viewer.addEventListener('pointerenter', restoreMouseCursor, { passive:true });
  viewer.addEventListener('pointermove', restoreMouseCursor, { passive:true });
  viewer.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'pen') return;
    state.penHoverPointers.set(event.pointerId, { viewer, lastSeen:performance.now() });
    state.penContactPointers.set(event.pointerId, { viewer, lastSeen:performance.now() });
    setPenPalmGuard(viewer, PEN_PALM_GUARD_AFTER_CONTACT_MS);
    updateViewerPenCursor(viewer);
  }, { passive:true });
  viewer.addEventListener('pointerup', (event) => {
    if (event.pointerType !== 'pen') return;
    state.penContactPointers.delete(event.pointerId);
    // A pen that has just lifted is normally still in range; keep the hover
    // entry until pointerleave so the Surface/Chromebook pen cursor stays hidden.
    state.penHoverPointers.set(event.pointerId, { viewer, lastSeen:performance.now() });
    setPenPalmGuard(viewer, PEN_PALM_GUARD_AFTER_CONTACT_MS);
    updateViewerPenCursor(viewer);
  }, { passive:true });
  viewer.addEventListener('pointercancel', (event) => {
    if (state.annotationTool === 'eraser') hideEraserCursor();
    if (event.pointerType !== 'pen') return;
    state.penContactPointers.delete(event.pointerId);
    state.penHoverPointers.delete(event.pointerId);
    setPenPalmGuard(viewer, PEN_PALM_GUARD_AFTER_CONTACT_MS);
    updateViewerPenCursor(viewer);
  }, { passive:true });
  viewer.addEventListener('pointerleave', (event) => {
    if (state.annotationTool === 'eraser') hideEraserCursor();
    if (event.pointerType !== 'pen') return;
    state.penContactPointers.delete(event.pointerId);
    state.penHoverPointers.delete(event.pointerId);
    setPenPalmGuard(viewer, PEN_PALM_GUARD_AFTER_HOVER_MS);
    updateViewerPenCursor(viewer);
  }, { passive:true });
}

// The PDF surface uses touch-action:none so browsers never get permission to
// turn a Pencil/stylus stroke into native scrolling. Finger navigation is then
// implemented explicitly here: one finger pans, two fingers pinch/zoom. In Pen
// mode, 5.0.9 adds a short touch-intent gate so palm bursts do not become page
// navigation, while deliberate one/two-finger navigation still works once the
// pen is away. This is scoped to viewer surfaces only.
function bindManualViewerTouch(viewer, owner, config) {
  if (!owner.touchPointers) owner.touchPointers = new Map();
  if (!owner.palmIgnoredPointers) owner.palmIgnoredPointers = new Set();
  if (!owner.touchIntent) owner.touchIntent = 'idle';
  if (!('touchIntentTimer' in owner)) owner.touchIntentTimer = null;
  bindViewerPenProximity(viewer);

  const clearTouchIntentTimer = () => {
    if (owner.touchIntentTimer) clearTimeout(owner.touchIntentTimer);
    owner.touchIntentTimer = null;
  };
  const resetTouchIntent = () => {
    clearTouchIntentTimer();
    owner.touchIntent = 'idle';
    owner.palmIgnoredPointers.clear();
  };

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

  const startIntentionalTouchNavigation = (event=null) => {
    clearTouchIntentTimer();
    if (!owner.touchPointers.size) { resetTouchIntent(); return; }
    owner.touchIntent = 'intentional';
    viewer.classList.add('manual-touching');
    const points = [...owner.touchPointers.values()];
    if (points.length >= 2) {
      beginPinch();
    } else {
      const point = points[0];
      owner.touchStart = { id: point.id, x: point.x, y: point.y, t: performance.now() };
      if (config.getScrollMode() !== 'single') startViewerTouchPan(owner, point);
    }
    if (event) addInkDiagnostic('touch-navigation-intentional', event, { touchCount:owner.touchPointers.size });
  };

  const markPalmTouch = (event, reason) => {
    if (owner.touchIntent === 'palm') return;
    clearTouchIntentTimer();
    owner.touchIntent = 'palm';
    owner.touchStart = null;
    owner.touchPan = null;
    // The short intent delay normally catches a palm before a pinch begins.
    // If a late classification occurs, stop further navigation rather than
    // repeatedly switching pan/pinch modes as more palm contacts arrive.
    owner.pinchGesture = null;
    owner.pinchNeedsRender = false;
    viewer.classList.remove('pinching', 'manual-touching');
    addInkDiagnostic('palm-touch-suppressed', event, { reason, touchCount:owner.touchPointers.size });
  };

  const scheduleTouchIntentDecision = (event) => {
    if (owner.touchIntentTimer) return;
    owner.touchIntent = 'pending';
    owner.touchIntentTimer = setTimeout(() => {
      owner.touchIntentTimer = null;
      if (!owner.touchPointers.size) { resetTouchIntent(); return; }
      if (isStylusAnnotationTool()) {
        if (owner.touchPointers.size >= 3) {
          markPalmTouch(event, 'three-or-more-contacts');
          return;
        }
        if (penPalmGuardActive(viewer)) {
          markPalmTouch(event, 'pen-in-range-or-recent');
          return;
        }
      }
      startIntentionalTouchNavigation(event);
    }, PEN_TOUCH_INTENT_DELAY_MS);
  };

  const flushLivePinch = () => {
    if (!owner.pinchGesture) return;
    config.flushLiveZoom?.();
    config.saveScroll?.();
  };

  const finishAllTouches = (lastEvent, cancelled) => {
    const mode = config.getScrollMode();
    // Capture the pull threshold before removing manual-touching. In Page Snap
    // mode that class temporarily disables CSS snapping; once removed the
    // browser is free to snap back toward the last page.
    const appendReadyOnRelease = !cancelled && mode !== 'single' && !!owner.touchPan && endAppendProgress(viewer).ready;
    viewer.classList.remove('manual-touching', 'pinching');

    if (owner.pinchNeedsRender) {
      flushLivePinch();
      owner.pinchGesture = null;
      owner.pinchNeedsRender = false;
      owner.touchPan = null;
      owner.touchStart = null;
      config.finalizePinch?.();
      resetTouchIntent();
      return;
    }

    if (appendReadyOnRelease && config.maybeAppendEnd?.(true)) {
      owner.touchStart = null;
      owner.touchPan = null;
      resetTouchIntent();
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
    resetTouchIntent();
  };

  viewer.addEventListener('pointermove', (e) => {
    if (handleDocumentInkPointer(viewer, e)) return;
    if (document.body.classList.contains('presentation') && e.pointerType === 'mouse' && e.clientY < 90) {
      showPresentationControls();
    }
    if (e.pointerType !== 'touch') return;
    if (owner.palmIgnoredPointers.has(e.pointerId)) { if (e.cancelable) e.preventDefault(); return; }
    if (!owner.touchPointers.has(e.pointerId)) return;
    e.preventDefault();
    const point = owner.touchPointers.get(e.pointerId);
    point.x = e.clientX; point.y = e.clientY;

    if (isStylusAnnotationTool()) {
      if (owner.touchIntent === 'palm') return;
      if (owner.touchIntent === 'pending') {
        if (owner.touchPointers.size >= 3) markPalmTouch(e, 'three-or-more-contacts');
        else if (penPalmGuardActive(viewer)) markPalmTouch(e, 'pen-in-range-or-recent');
        return;
      }
    }

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
      endAppendProgress(viewer);
    }
  }, { passive: false });

  viewer.addEventListener('pointerdown', (e) => {
    config.activate?.();
    if (handleDocumentInkPointer(viewer, e)) return;
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

    // Once a deliberate two-finger gesture has been accepted, ignore any extra
    // contacts instead of allowing a third finger/palm edge to redefine it.
    if (isStylusAnnotationTool() && owner.touchIntent === 'intentional' && owner.touchPointers.size >= 2) {
      owner.palmIgnoredPointers.add(e.pointerId);
      addInkDiagnostic('extra-touch-ignored-during-navigation', e, { touchCount:owner.touchPointers.size + 1 });
      return;
    }

    const point = { id: e.pointerId, x: e.clientX, y: e.clientY };
    owner.touchPointers.set(e.pointerId, point);

    if (isStylusAnnotationTool()) {
      if (owner.touchIntent === 'palm') return;
      if (penPalmGuardActive(viewer)) {
        markPalmTouch(e, 'pen-in-range-or-recent');
        return;
      }
      if (owner.touchPointers.size >= 3) {
        markPalmTouch(e, 'three-or-more-contacts');
        return;
      }
      scheduleTouchIntentDecision(e);
      return;
    }

    // Hand mode and other non-inking modes retain the immediate navigation path.
    owner.touchIntent = 'intentional';
    viewer.classList.add('manual-touching');
    if (owner.touchPointers.size === 1) {
      owner.touchStart = { id: e.pointerId, x: e.clientX, y: e.clientY, t: performance.now() };
      if (config.getScrollMode() !== 'single') startViewerTouchPan(owner, point);
    } else if (owner.touchPointers.size === 2) {
      beginPinch();
    }
  }, { passive: false });

  const finishPointer = (e, cancelled=false) => {
    if (handleDocumentInkPointer(viewer, e)) return;
    if (e.pointerType !== 'touch') return;
    e.preventDefault();

    if (state.presentationRevealPointerId === e.pointerId) {
      state.presentationRevealPointerId = null;
      state.presentationSuppressClicksUntil = performance.now() + 700;
      if (!cancelled) showPresentationControls();
      try { viewer.releasePointerCapture?.(e.pointerId); } catch {}
      return;
    }

    if (owner.palmIgnoredPointers.has(e.pointerId)) {
      owner.palmIgnoredPointers.delete(e.pointerId);
      try { viewer.releasePointerCapture?.(e.pointerId); } catch {}
      return;
    }

    const lastPoint = owner.touchPointers.get(e.pointerId) || { id: e.pointerId, x: e.clientX, y: e.clientY };
    lastPoint.x = e.clientX; lastPoint.y = e.clientY;
    const hadActivePinch = !!owner.pinchGesture;
    owner.touchPointers.delete(e.pointerId);

    if (isStylusAnnotationTool() && (owner.touchIntent === 'pending' || owner.touchIntent === 'palm')) {
      try { viewer.releasePointerCapture?.(e.pointerId); } catch {}
      if (owner.touchPointers.size === 0) {
        viewer.classList.remove('manual-touching', 'pinching');
        owner.touchStart = null;
        owner.touchPan = null;
        owner.pinchGesture = null;
        owner.pinchNeedsRender = false;
        resetTouchIntent();
      }
      return;
    }

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
    endAppendProgress(viewer);
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
    if (view.scrollMode !== 'single') {
      if (e.deltaY > 0) handleEndAppendWheel(viewer, pane.documentId, paneId);
      return;
    }
    e.preventDefault();
    const now = performance.now();
    if (now - pane.lastWheelPageChange < 320 || Math.abs(e.deltaY) < 8) return;
    pane.lastWheelPageChange = now;
    goPanePage(paneId, e.deltaY > 0 ? 1 : -1, true);
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
    goPage: (delta) => goPanePage(paneId, delta, true),
    maybeAppendEnd: (force=false) => maybeAppendAtDocumentEnd(viewer, pane.documentId, paneId, force),
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
  els.newTemplateDocumentBtn?.addEventListener('click', showNewFromTemplateChooser);
  els.emptyOpenBtn.addEventListener('click', () => els.fileInput.click());
  els.fileInput.addEventListener('change', () => openFiles(els.fileInput.files));
  els.imageAssemblyChooseBtn?.addEventListener('click', () => els.imageAssemblyInput?.click());
  els.imageAssemblyInput?.addEventListener('change', () => addImageAssemblyFiles(els.imageAssemblyInput.files));
  els.imageAssemblyClearBtn?.addEventListener('click', () => { clearImageAssembly(); if (els.imageAssemblyProgress) els.imageAssemblyProgress.textContent = ''; });
  els.imageAssemblyList?.addEventListener('click', (e) => {
    const row = e.target.closest('.image-assembly-row');
    const action = e.target.closest('[data-action]')?.dataset.action;
    if (!row || !action) return;
    if (action === 'up') moveImageAssemblyItem(row.dataset.itemId, -1);
    else if (action === 'down') moveImageAssemblyItem(row.dataset.itemId, 1);
    else if (action === 'remove') removeImageAssemblyItem(row.dataset.itemId);
  });
  els.imageAssemblyCreateBtn?.addEventListener('click', createImageAssemblyDocument);
  els.imageAssemblyPageSize?.addEventListener('change', updateImageAssemblyUi);
  els.imageAssemblyOrientation?.addEventListener('change', updateImageAssemblyUi);
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
  els.libraryRefreshBtn?.addEventListener('click', async () => {
    try {
      if (!(await ensureLibraryConnection())) throw new Error('Could not connect to local storage.');
      await persistLibraryNow({ readViewDom: false, _reconnected: true });
      await refreshLibraryRecords();
      await restorePersistentTemplates();
      renderLibraryDocumentList();
      setStatus('Local Library refreshed');
    } catch (err) {
      console.error(err);
      setStatus(`Local Library refresh failed: ${err?.message || err}`);
      if (els.librarySummary) els.librarySummary.textContent = `Local Library refresh failed: ${err?.message || err}`;
    }
  });
  els.inkDiagnosticsBtn?.addEventListener('click', downloadInkDiagnostics);
  els.libraryPdfArchiveBtn?.addEventListener('click', exportWholeLibraryAsPdfs);
  els.libraryEditableBackupBtn?.addEventListener('click', createEditableLibraryBackup);
  els.libraryRestoreBackupBtn?.addEventListener('click', () => { state.pendingBackupImportMode='replace'; els.libraryRestoreInput?.click(); });
  els.libraryImportBackupBtn?.addEventListener('click', () => { state.pendingBackupImportMode='subtree'; els.libraryRestoreInput?.click(); });
  els.libraryRestoreInput?.addEventListener('change', () => { const file=els.libraryRestoreInput.files?.[0]; if(state.pendingBackupImportMode==='subtree') importEditableBackupAsSubtree(file); else restoreEditableLibraryBackup(file); });
  els.libraryImportBtn?.addEventListener('click', () => els.fileInput?.click());
  els.libraryImportZipBtn?.addEventListener('click', () => els.libraryZipImportInput?.click());
  els.libraryZipImportInput?.addEventListener('change', () => importPdfDirectoryZip(els.libraryZipImportInput.files?.[0]));
  els.libraryNewFolderBtn?.addEventListener('click', createLibraryFolder);
  els.libraryListViewBtn?.addEventListener('click', () => setLibraryViewMode('list'));
  els.libraryGridViewBtn?.addEventListener('click', () => setLibraryViewMode('grid'));
  els.filesManageTemplatesBtn?.addEventListener('click', showTemplateManager);
  els.libraryNameCloseBtn?.addEventListener('click', () => els.libraryNameDialog?.close());
  els.libraryNameCancelBtn?.addEventListener('click', () => els.libraryNameDialog?.close());
  els.libraryMoveCloseBtn?.addEventListener('click', () => { state.pendingLibraryMove = null; els.libraryMoveDialog?.close(); });
  els.libraryMoveCancelBtn?.addEventListener('click', () => { state.pendingLibraryMove = null; els.libraryMoveDialog?.close(); });
  els.libraryMoveForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    try { els.libraryMoveDialog?.close(); } catch {}
    await applyPendingLibraryMove();
  });
  els.requestPersistentStorageBtn?.addEventListener('click', requestPersistentLibraryStorage);
  els.purgeLibraryBtn?.addEventListener('click', purgeLocalLibrary);
  els.factoryResetBtn?.addEventListener('click', factoryResetAllLocalData);
  els.exportPdfBtn.addEventListener('click', exportSelectedDocuments);
  els.compressionMethod?.addEventListener('change', () => updateCompressionUi(selectedFileDocuments()));
  els.compressionLevel?.addEventListener('change', () => updateCompressionUi(selectedFileDocuments()));
  els.compressionTargetMb?.addEventListener('input', () => updateCompressionUi(selectedFileDocuments()));
  els.compressionNormalizeLetter?.addEventListener('change', () => updateCompressionUi(selectedFileDocuments()));
  els.compressBtn?.addEventListener('click', compressSelectedDocuments);
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
  bindInkNativeSelectionGuard();
  bindStylusTouchInkFallback();
  bindInkDiagnostics();
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
  els.pageGeometryBtn?.addEventListener('click', openPageGeometryDialog);
  els.pageGeometryCloseBtn?.addEventListener('click', () => els.pageGeometryDialog?.close());
  els.pageGeometryCancelBtn?.addEventListener('click', () => els.pageGeometryDialog?.close());
  els.pageGeometryPreset?.addEventListener('change', updatePageGeometryDialog);
  els.pageGeometryOrientation?.addEventListener('change', updatePageGeometryDialog);
  els.pageGeometryCustomWidth?.addEventListener('input', updatePageGeometryDialog);
  els.pageGeometryCustomHeight?.addEventListener('input', updatePageGeometryDialog);
  els.pageGeometryScope?.addEventListener('change', updatePageGeometryDialog);
  els.pageGeometryForm?.addEventListener('submit', (e) => { e.preventDefault(); applyPageGeometry(); });
  els.pageEdgeBtn?.addEventListener('click', openPageEdgeDialog);
  els.pageEdgeCloseBtn?.addEventListener('click', () => els.pageEdgeDialog?.close());
  els.pageEdgeCancelBtn?.addEventListener('click', () => els.pageEdgeDialog?.close());
  els.pageEdgeScope?.addEventListener('change', updatePageEdgeDialog);
  els.pageEdgeOperation?.addEventListener('change', updatePageEdgeDialog);
  els.pageEdgePreset?.addEventListener('change', () => {
    if (els.pageEdgePreset.value !== 'custom') setPageEdgePreset(els.pageEdgePreset.value);
    updatePageEdgeDialog();
  });
  for (const input of [els.pageEdgeTop, els.pageEdgeRight, els.pageEdgeBottom, els.pageEdgeLeft]) {
    input?.addEventListener('input', () => {
      if (els.pageEdgePreset) els.pageEdgePreset.value = 'custom';
      updatePageEdgeDialog();
    });
  }
  els.pageEdgeResetBtn?.addEventListener('click', resetPageEdgeAdjustments);
  els.pageEdgeForm?.addEventListener('submit', (e) => { e.preventDefault(); applyPageEdgeChange(); });
  els.insertPageBtn.addEventListener('click', (e) => { e.stopPropagation(); openInsertPageMenu(els.insertPageBtn); });
  els.duplicateBtn.addEventListener('click', duplicateSelected);
  els.extractSelectedPagesBtn?.addEventListener('click', extractSelectedPdf);
  els.copyPagesBtn?.addEventListener('click', openPageTransferDialog);
  els.pageTransferDestination?.addEventListener('change', updatePageTransferPositionUi);
  els.pageTransferPosition?.addEventListener('change', updatePageTransferPositionUi);
  els.pageTransferCloseBtn?.addEventListener('click', () => els.pageTransferDialog?.close());
  els.pageTransferCancelBtn?.addEventListener('click', () => els.pageTransferDialog?.close());
  els.pageTransferForm?.addEventListener('submit', (e) => { e.preventDefault(); copySelectedPagesToDocument(); });
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
  els.inkUndoBtn?.addEventListener('click', undo);
  els.inkRedoBtn?.addEventListener('click', redo);
  els.inkHandBtn?.addEventListener('click', () => setAnnotationTool('hand'));
  els.inkPenBtn?.addEventListener('click', () => setAnnotationTool('pen'));
  els.inkHighlighterBtn?.addEventListener('click', () => setAnnotationTool('highlighter'));
  els.inkEraserBtn?.addEventListener('click', () => setAnnotationTool('eraser'));
  els.inkSelectBtn?.addEventListener('click', () => setAnnotationTool('select'));
  els.selectionDeleteBtn?.addEventListener('click', deleteSelectedAnnotations);
  els.selectionDuplicateBtn?.addEventListener('click', duplicateSelectedAnnotations);
  els.selectionCopyBtn?.addEventListener('click', copySelectedAnnotations);
  els.selectionPasteBtn?.addEventListener('click', pasteCopiedAnnotations);
  els.penColorGroup?.addEventListener('click', (event) => {
    const button = event.target instanceof Element ? event.target.closest('[data-ink-color]') : null;
    if (button) setPenColor(button.dataset.inkColor);
  });
  els.penWidthGroup?.addEventListener('click', (event) => {
    const button = event.target instanceof Element ? event.target.closest('[data-ink-width]') : null;
    if (button) setPenWidth(Number(button.dataset.inkWidth));
  });
  els.highlighterColorGroup?.addEventListener('click', (event) => {
    const button = event.target instanceof Element ? event.target.closest('[data-highlighter-color]') : null;
    if (button) setHighlighterColor(button.dataset.highlighterColor);
  });
  els.highlighterWidthGroup?.addEventListener('click', (event) => {
    const button = event.target instanceof Element ? event.target.closest('[data-highlighter-width]') : null;
    if (button) setHighlighterWidth(Number(button.dataset.highlighterWidth));
  });
  els.eraserSizeGroup?.addEventListener('click', (event) => {
    const button = event.target instanceof Element ? event.target.closest('[data-eraser-size]') : null;
    if (button) setEraserSize(Number(button.dataset.eraserSize));
  });
  els.moreBtn.addEventListener('click', (e) => { e.stopPropagation(); closeInsertPageMenu(); toggleMoreMenu(); });
  els.clearBtn.addEventListener('click', () => { toggleMoreMenu(false); closeAllOpenDocuments(); });
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
  document.addEventListener('keydown', (event) => {
    if (state.annotationTool !== 'select') return;
    const target = event.target;
    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement || target?.isContentEditable) return;
    const accel = event.ctrlKey || event.metaKey;
    if ((event.key === 'Delete' || event.key === 'Backspace') && state.annotationSelection?.ids?.size) {
      event.preventDefault();
      deleteSelectedAnnotations();
      return;
    }
    if (accel && event.key.toLowerCase() === 'c' && state.annotationSelection?.ids?.size) {
      event.preventDefault();
      copySelectedAnnotations();
      return;
    }
    if (accel && event.key.toLowerCase() === 'v' && state.annotationClipboard?.items?.length) {
      event.preventDefault();
      pasteCopiedAnnotations();
      return;
    }
    if (accel && event.key.toLowerCase() === 'd' && state.annotationSelection?.ids?.size) {
      event.preventDefault();
      duplicateSelectedAnnotations();
    }
  });

  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement && document.body.classList.contains('presentation') && !isIPadLike()) exitPresentation();
  });
  window.addEventListener('resize', onResize);
  bindSplitViewerEvents('left');
  bindSplitViewerEvents('right');

  els.viewer.addEventListener('scroll', () => {
    scheduleSingleActivePageSync();
    endAppendProgress(els.viewer);
  }, { passive: true });

  els.viewer.addEventListener('wheel', (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      zoomBy(e.deltaY < 0 ? 1.12 : 1 / 1.12);
      if (document.body.classList.contains('presentation')) showPresentationControls();
      return;
    }
    if (state.scrollMode !== 'single') {
      if (e.deltaY > 0) handleEndAppendWheel(els.viewer, state.currentDocumentId, null);
      return;
    }
    e.preventDefault();
    const now = performance.now();
    if (now - state.lastWheelPageChange < 320 || Math.abs(e.deltaY) < 8) return;
    state.lastWheelPageChange = now;
    goPage(e.deltaY > 0 ? 1 : -1, true);
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
    goPage: (delta) => goPage(delta, true),
    maybeAppendEnd: (force=false) => maybeAppendAtDocumentEnd(els.viewer, state.currentDocumentId, null, force),
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
  window.addEventListener('pagehide', () => {
    saveCurrentDocumentState();
    writeSessionCheckpoint();
    persistLibraryNow();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      saveCurrentDocumentState();
      writeSessionCheckpoint();
      persistLibraryNow();
    } else {
      resumePersistentLibraryConnection();
    }
  });
  window.addEventListener('pageshow', () => { resumePersistentLibraryConnection(); });
}

async function init() {
  bindEvents();
  updateInkToolbar();
  updateViewerLabels();
  renderAll();
  await registerServiceWorker();
  await loadPdfEngine();
  setStatus('Restoring local Library…', true);
  await initializePersistentLibrary();
  setStatus(state.documents.length ? `Restored ${state.documents.length} open document${state.documents.length === 1 ? '' : 's'} from local Library` : 'Ready');
}

init();
