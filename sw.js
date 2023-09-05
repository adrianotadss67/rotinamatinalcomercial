var cacheName = 'matinal-pwa';
var filesToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/main.js'
];

self.addEventListener('sync', event => {
  if (event.tag === 'syncData') {
    event.waitUntil(syncData());
  }
});

function syncData() {
  return fetch('/api/data')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Process the synchronized data
      console.log('Synchronized data:', data);
    })
    .catch(error => {
      console.error('Data synchronization failed:', error);
    });
}


/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
  self.skipWaiting();
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
