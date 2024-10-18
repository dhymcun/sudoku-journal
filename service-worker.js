const CACHE_NAME = 'sudoku-journal-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css', // If you have a CSS file
    '/manifest.json',
    '/icon-192x192.png',
    '/icon-512x512.png',
    // Add other assets you want to cache here
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request).catch(() => {
                    return caches.match('/index.html');
                });
            })
    );
});

