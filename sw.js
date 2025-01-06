const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/manifest.json',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
];

// インストール時にリソースをキャッシュする
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching app resources');
                return cache.addAll(urlsToCache);
            })
    );
});

// リクエストに応じてキャッシュからリソースを返す
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                // キャッシュがヒットした場合はそれを返す
                if (cachedResponse) {
                    return cachedResponse;
                }
                // キャッシュが無い場合はネットワークから取得
                return fetch(event.request);
            })
    );
});

// サービスワーカーの更新時に古いキャッシュを削除する
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
