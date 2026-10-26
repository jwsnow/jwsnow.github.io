// PDF Workbench editable Library backup worker (iPad/WebKit).
// A dedicated worker owns both IndexedDB source copies and the OPFS synchronous
// access handle. This avoids retaining a growing archive in the UI process's
// FileSystemWritableFileStream, while keeping the existing v1 backup format.
'use strict';

const DB_NAME = 'pdf-workbench-library';
const ZIP_LIMIT = 0xFFFFFFFF;
const WRITE_CHUNK_BYTES = 256 * 1024;
const FLUSH_INTERVAL_BYTES = 8 * 1024 * 1024;
const encoder = new TextEncoder();
const crcTable = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) c = (c >>> 1) ^ ((c & 1) ? 0xEDB88320 : 0);
    table[i] = c >>> 0;
  }
  return table;
})();
const pause = () => new Promise(resolve => setTimeout(resolve, 0));
const requestResult = req => new Promise((resolve, reject) => {
  req.onsuccess = () => resolve(req.result);
  req.onerror = () => reject(req.error || new Error('IndexedDB read failed.'));
});
// Keep source bytes and rich Library metadata out of memory at the same time.
// The backup manifest is assembled *after* the binary sources, one store at a
// time, and serialized incrementally, rather than JSON.stringify-ing a single
// potentially large all-records object while earlier source data may linger.
async function* streamBackupManifest(db, header, sourceManifest, onStorePhase) {
  const getAll = store => requestResult(db.transaction(store, 'readonly').objectStore(store).getAll());
  const getMeta = key => requestResult(db.transaction('meta', 'readonly').objectStore('meta').get(key));
  // The document store contains rich annotation state; reading every record
  // with getAll() can overload WebKit's IndexedDB process. Read just two
  // documents per transaction, write them immediately, and release each batch.
  // Other metadata stores are small enough to preserve their existing reads.
  async function* documentBatches() {
    let lastKey = null, batch = 0, count = 0;
    for (;;) {
      let records, lastError;
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          const store = db.transaction('documents', 'readonly').objectStore('documents');
          const range = lastKey === null ? undefined : IDBKeyRange.lowerBound(lastKey, true);
          records = await requestResult(store.getAll(range, 2));
          break;
        } catch (err) {
          lastError = err;
          onStorePhase('documents', 'read-retry', count);
          if (attempt < 2) await new Promise(resolve => setTimeout(resolve, 120));
        }
      }
      if (!records) throw lastError || new Error('Could not read backup document metadata.');
      if (!records.length) break;
      count += records.length;
      batch++;
      yield records;
      lastKey = records[records.length - 1].id;
      if (batch % 8 === 0) { onStorePhase('documents', 'batch', count); await pause(); }
      if (records.length < 2) break;
    }
  }
  // This header is deliberately small (format, versions, date, preferences).
  yield JSON.stringify(header).slice(0, -1);
  for (const store of ['documents','folders','assets','assetFolders']) {
    onStorePhase(store, 'start');
    yield `,${JSON.stringify(store)}:[`;
    let written = 0;
    if (store === 'documents') {
      for await (const records of documentBatches()) {
        for (const record of records) {
          if (written++) yield ',';
          yield JSON.stringify(record);
        }
        await pause();
      }
      onStorePhase(store, 'loaded', written);
    } else {
      const records = await getAll(store);
      onStorePhase(store, 'loaded', records.length);
      for (const record of records) {
        if (written++) yield ',';
        yield JSON.stringify(record);
      }
    }
    yield ']';
    onStorePhase(store, 'written', written);
    await pause();
  }
  const session = await getMeta('session') || {
    key:'session',schemaVersion:header.librarySchemaVersion,openIds:[],
    currentDocumentId:null,workspaceMode:'export',splitView:false,
  };
  const templates = await getMeta('templates') || {
    key:'templates',schemaVersion:header.librarySchemaVersion,
    templates:[],newLastPageDefault:{kind:'graph',templateId:null},updatedAt:Date.now(),
  };
  yield `,"meta":{"session":${JSON.stringify(session)},"templates":${JSON.stringify(templates)}}`;
  yield `,"sources":${JSON.stringify(sourceManifest)}}`;
}
const startupPhase = phase => self.postMessage({type:'startup-phase',phase});
const uint16 = (view, offset, value) => view.setUint16(offset, value, true);
const uint32 = (view, offset, value) => view.setUint32(offset, value >>> 0, true);

function createZip(handle) {
  const entries = [];
  let position = 0;
  let lastFlush = 0;
  function writeBuffer(bytes) {
    if (position + bytes.byteLength >= ZIP_LIMIT) throw new Error('Editable backup exceeds ZIP32 4 GB limit.');
    let done = 0;
    while (done < bytes.byteLength) {
      const written = handle.write(bytes.subarray(done), { at: position });
      if (!Number.isInteger(written) || written <= 0) throw new Error('Backup file write was incomplete.');
      position += written;
      done += written;
    }
    if (position - lastFlush >= FLUSH_INTERVAL_BYTES) {
      handle.flush();
      lastFlush = position;
    }
  }
  async function addFile(filename, payload) {
    if (entries.length >= 65535) throw new Error('Too many backup ZIP entries.');
    const name = encoder.encode(filename);
    if (name.byteLength > 65535) throw new Error('Backup filename is too long.');
    const localOffset = position;
    const local = new Uint8Array(30 + name.length);
    const dv = new DataView(local.buffer);
    uint32(dv, 0, 0x04034B50); uint16(dv, 4, 20); uint16(dv, 6, 0x0808);
    uint16(dv, 26, name.length); local.set(name, 30);
    writeBuffer(local);
    let crc = 0xFFFFFFFF, size = 0;
    async function chunk(bytes) {
      size += bytes.byteLength;
      if (size >= ZIP_LIMIT) throw new Error('One PDF source exceeds the ZIP entry size limit.');
      for (let j = 0; j < bytes.byteLength; j++) crc = crcTable[(crc ^ bytes[j]) & 255] ^ (crc >>> 8);
      writeBuffer(bytes);
    }
    if (payload && typeof payload[Symbol.asyncIterator] === 'function') {
      // JSON text can be many megabytes; do not build one giant UTF-8 buffer.
      for await (const piece of payload) {
        const bytes = typeof piece === 'string' ? encoder.encode(piece) : piece;
        for (let start = 0; start < bytes.byteLength; start += WRITE_CHUNK_BYTES) {
          await chunk(bytes.subarray(start, start + WRITE_CHUNK_BYTES));
        }
        await pause();
      }
    } else if (payload instanceof Blob) {
      for (let start = 0; start < payload.size; start += WRITE_CHUNK_BYTES) {
        const part = new Uint8Array(await payload.slice(start, start + WRITE_CHUNK_BYTES).arrayBuffer());
        await chunk(part);
        if (start && start % (4 * WRITE_CHUNK_BYTES) === 0) await pause();
      }
    } else {
      const bytes = typeof payload === 'string' ? encoder.encode(payload) : payload;
      for (let start = 0; start < bytes.byteLength; start += WRITE_CHUNK_BYTES) {
        await chunk(bytes.subarray(start, start + WRITE_CHUNK_BYTES));
        if (start && start % (4 * WRITE_CHUNK_BYTES) === 0) await pause();
      }
    }
    crc = (crc ^ 0xFFFFFFFF) >>> 0;
    const desc = new Uint8Array(16), descriptor = new DataView(desc.buffer);
    uint32(descriptor, 0, 0x08074B50); uint32(descriptor, 4, crc);
    uint32(descriptor, 8, size); uint32(descriptor, 12, size);
    writeBuffer(desc);
    entries.push({ name, crc, size, localOffset });
  }
  function finish() {
    const dirOffset = position;
    for (const entry of entries) {
      const header = new Uint8Array(46 + entry.name.length), dv = new DataView(header.buffer);
      uint32(dv, 0, 0x02014B50); uint16(dv, 4, 20); uint16(dv, 6, 20);
      uint16(dv, 8, 0x0808); uint32(dv, 16, entry.crc);
      uint32(dv, 20, entry.size); uint32(dv, 24, entry.size);
      uint16(dv, 28, entry.name.length); uint32(dv, 42, entry.localOffset);
      header.set(entry.name, 46); writeBuffer(header);
    }
    const directorySize = position - dirOffset;
    const end = new Uint8Array(22), dv = new DataView(end.buffer);
    uint32(dv, 0, 0x06054B50); uint16(dv, 8, entries.length);
    uint16(dv, 10, entries.length); uint32(dv, 12, directorySize);
    uint32(dv, 16, dirOffset); writeBuffer(end);
    handle.truncate(position);
    handle.flush();
    return { bytes: position, entries: entries.length };
  }
  return { addFile, finish, get bytes() { return position; } };
}

async function runBackup(job) {
  startupPhase('begin');
  if (!self.navigator.storage?.getDirectory) throw new Error('OPFS storage is not available.');
  const root = await self.navigator.storage.getDirectory();
  startupPhase('opfs-root-open');
  const file = await root.getFileHandle(job.slot, { create: true });
  if (typeof file.createSyncAccessHandle !== 'function') {
    throw new Error('This iPad browser does not support direct incremental file writes. Use Windows Workbench for full editable backup.');
  }
  let handle = null, db = null, finished = false;
  try {
    handle = await file.createSyncAccessHandle();
    startupPhase('sync-handle-open');
    handle.truncate(0);
    const zip = createZip(handle);
    db = await new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error || new Error('Could not open Library in backup worker.'));
      req.onupgradeneeded = () => reject(new Error('Library database is not initialized.'));
    });
    startupPhase('worker-db-open');
    // Do not read rich Library metadata until *after* all binary sources have
    // been written: holding both was an avoidable memory peak in 5.8.63.
    startupPhase('worker-db-ready');
    const sourceManifest = [];
    for (let i = 0; i < job.sourceIds.length; i++) {
      // Per-item function scope helps reclaim large IndexedDB ArrayBuffer clones.
      async function writeOneSource() {
        const tx = db.transaction('sources', 'readonly');
        const source = await requestResult(tx.objectStore('sources').get(job.sourceIds[i]));
        if (!source) throw new Error(`Stored source ${i + 1} disappeared during backup.`);
        let payload = null;
        if (source.blob instanceof Blob) payload = source.blob;
        else if (source.data instanceof ArrayBuffer) payload = new Uint8Array(source.data);
        else if (ArrayBuffer.isView(source.data)) payload = new Uint8Array(source.data.buffer, source.data.byteOffset, source.data.byteLength);
        if (!payload) throw new Error(`Stored source ${i + 1} has no binary data.`);
        const payloadSize = payload instanceof Blob ? payload.size : payload.byteLength;
        self.postMessage({ type: 'source-start', completed: i, total: job.sourceIds.length, bytes: zip.bytes, sourceSize: payloadSize });
        const path = `sources/${encodeURIComponent(source.id)}.bin`;
        await zip.addFile(path, payload);
        sourceManifest.push({
          id: source.id, schemaVersion: Number(source.schemaVersion || 1),
          type: source.type, name: source.name, size: payloadSize,
          mimeType: source.mimeType || (source.type === 'pdf' ? 'application/pdf' : 'application/octet-stream'), path,
        });
      }
      await writeOneSource();
      self.postMessage({ type: 'progress', completed: i + 1, total: job.sourceIds.length, bytes: zip.bytes });
      await pause();
    }
    self.postMessage({ type: 'phase', phase: 'manifest', completed: job.sourceIds.length, total: job.sourceIds.length, bytes: zip.bytes });
    handle.flush(); // Give the written source archive a durable checkpoint.
    await pause();
    const onStorePhase = (store, step, count) => self.postMessage({
      type:'phase',phase:`manifest-${store}-${step}`,
      completed:job.sourceIds.length,total:job.sourceIds.length,bytes:zip.bytes,
      manifestRecords:count,
    });
    await zip.addFile('manifest.json', streamBackupManifest(db, job.header, sourceManifest, onStorePhase));
    self.postMessage({ type:'phase', phase:'manifest-written', completed:job.sourceIds.length, total:job.sourceIds.length, bytes:zip.bytes });
    await zip.addFile('README.txt', [
      'PDF Workbench Editable Library Backup', '',
      'This is a ZIP-based PDF Workbench backup container.',
      'Restore it from Files > Backup & transfer > Restore backup.',
      'It preserves editable documents, folders, templates, assets, sources, and the workspace session.',
      'Do not modify the archive if you intend to restore it.', '',
    ].join('\n'));
    self.postMessage({ type: 'phase', phase: 'finalize', completed: job.sourceIds.length, total: job.sourceIds.length, bytes: zip.bytes });
    const result = zip.finish();
    if (handle.getSize() !== result.bytes) throw new Error('Staged ZIP size verification failed.');
    finished = true;
    handle.close(); handle = null;
    db.close(); db = null;
    self.postMessage({ type: 'ready', ...result, documents:job.documentCount, total: job.sourceIds.length });
  } finally {
    if (db) { try { db.close(); } catch {} }
    if (handle) { try { handle.close(); } catch {} }
    if (!finished) { try { await root.removeEntry(job.slot); } catch {} }
  }
}

self.onmessage = event => {
  if (event.data?.type !== 'prepare') return;
  self.postMessage({type:'prepare-received'});
  runBackup(event.data).catch(err => {
    self.postMessage({ type: 'error', message: String(err?.message || err) });
  });
};

// Confirms that the worker script loaded, before any backup storage is touched.
self.postMessage({type:'worker-loaded'});
