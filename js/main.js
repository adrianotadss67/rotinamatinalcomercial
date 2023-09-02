window.onload = () => {
  'use strict';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(registration => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch(error => {
      console.error('Service Worker registration failed:', error);
    });
}

// Periodic background sync
if ('PeriodicSyncManager' in self) {
  navigator.serviceWorker.ready.then(registration => {
    if ('periodicSync' in registration) {
      registration.periodicSync.register('syncData', {
        minInterval: 24 * 60 * 60 * 1000, // 24 hours
      })
      .then(tag => {
        console.log(`Periodic background sync registered with tag: ${tag}`);
      })
      .catch(error => {
        console.error('Periodic background sync registration failed:', error);
      });
    }
  });
}
}
