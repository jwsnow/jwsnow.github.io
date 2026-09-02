const CACHE_NAME = 'pdf-workbench-m5.4.8-v1';
const APP_SHELL = [
  './',
  './index.html',
  './styles.css?v=5.4.8',
  './app.js?v=5.4.8',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    // Force the release shell to come from the network rather than a stale
    // browser HTTP cache. This keeps installed PWAs from combining a newer
    // index.html with older CSS/JavaScript after an update.
    for (const url of APP_SHELL) {
      const request = new Request(url, { cache: 'reload' });
      const response = await fetch(request);
      if (!response || !response.ok) throw new Error(`Failed to cache ${url}`);
      await cache.put(request, response.clone());
    }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    event.waitUntil(self.skipWaiting());
    return;
  }
  if (event.data?.type !== 'CACHE_EXTERNAL' || !Array.isArray(event.data.urls)) return;
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    for (const url of event.data.urls) {
      try {
        const request = new Request(url, { mode: 'cors' });
        const response = await fetch(request);
        if (response.ok) await cache.put(request, response.clone());
      } catch {}
    }
  })());
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith((async () => {
    const cached = await caches.match(event.request);
    if (cached) return cached;
    try {
      const response = await fetch(event.request);
      if (response && (response.ok || response.type === 'opaque')) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(event.request, response.clone()).catch(() => {});
      }
      return response;
    } catch (err) {
      if (event.request.mode === 'navigate') {
        return (await caches.match('./')) || (await caches.match('./index.html')) || Response.error();
      }
      throw err;
    }
  })());
});
