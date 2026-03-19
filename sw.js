// Service Worker - Seguimiento de Lactancia
const CACHE_NAME = 'lactancia-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});

// Notification actions
self.addEventListener('notificationclick', e => {
  e.notification.close();

  const action = e.action;

  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      const existingClient = clientList.find(c => c.url && c.focused);
      const target = clientList[0];

      if (action === 'start') {
        if (target) {
          target.focus();
          target.postMessage({ type: 'START_FEED' });
        } else {
          clients.openWindow('/?action=start');
        }
      } else if (action === 'snooze') {
        if (target) {
          target.focus();
          target.postMessage({ type: 'SNOOZE' });
        }
      } else if (action === 'extend') {
        if (target) {
          target.focus();
          target.postMessage({ type: 'EXTEND', minutes: 10 });
        }
      } else if (action === 'finish') {
        if (target) {
          target.focus();
          target.postMessage({ type: 'FINISH_FEED' });
        }
      } else {
        if (target) target.focus();
        else clients.openWindow('/');
      }
    })
  );
});
