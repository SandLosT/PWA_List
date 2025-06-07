const CACHE_NAME = 'make-it-list-cache-v1';
const urlsToCache = [
  '/',
  '/images/favicon/android-chrome-192x192.png',
  '/images/favicon/android-chrome-512x512.png',
  '/images/favicon/apple-touch-icon.png',
  '/images/favicon/favicon-16x16.png',
  '/images/favicon/favicon-32x32.png',
  '/images/favicon/favicon.ico',
  '/plugins/bootstrap-5.3.5-dist/css/bootstrap.min.css',
  '/plugins/bootstrap-5.3.5-dist/js/bootstrap.bundle.min.js',
  '/plugins/bootstrap-5.3.5-dist/js/bootstrap.min.js',
  '/plugins/fontawesome-free-6.7.2-web/css/all.min.css',
  '/styles/base/reset.css',
  '/styles/base/typography.css',
  '/styles/layout/aside.css',
  '/styles/layout/footer.css',
  '/styles/layout/header.css',
  '/styles/layout/main.css',
  '/styles/layout/sidebar.css',
  '/styles/theme/claro.css',
  '/styles/theme/escuro.css',
  '/manifest.json',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});