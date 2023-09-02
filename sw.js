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

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('my-cache').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/js/main.js',
        '/css/style.css',
        '/images/hello-icon-192.png',
        // Add other assets you want to cache
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
