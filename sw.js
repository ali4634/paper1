const staticCacheName = 'paper1-app-final-v1';
const assets = [
  '/paper1/',
  '/paper1/index.html',
  '/paper1/manifest.json',
  '/paper1/icons/icon-192.png',
  '/paper1/icons/icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.min.js'
];
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(staticCacheName).then(cache => {
      console.log('caching shell assets for paper1 app');
      return cache.addAll(assets);
    })
  );
});
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});
