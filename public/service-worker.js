const CACHE_NAME = 'make-it-list-cache-v1';
const urlsToCache = [
  '/',
  '/images/favicon/android-chrome-192x192.png',
  '/images/favicon/android-chrome-512x512.png',
  '/images/favicon/apple-touch-icon.png',
  '/images/favicon/favicon-16x16.png',
  '/images/favicon/favicon-32x32.png',
  '/images/favicon/favicon.ico',
  '/pages/auth/login.html',
  '/pages/auth/register.html',
  '/pages/home/index.html',
  '/pages/item/criar.html',
  '/pages/item/editar.html',
  '/pages/item/index.html',
  '/pages/lista/criar.html',
  '/pages/lista/editar.html',
  '/pages/lista/index.html',
  '/pages/lista/visualizar.html',
  '/pages/usuario/editar.html',
  '/pages/usuario/index.html',
  '/styles/base/reset.css',
  '/styles/base/typography.css',
  '/styles/layout/aside.css',
  '/styles/layout/footer.css',
  '/styles/layout/header.css',
  '/styles/layout/main.css',
  '/styles/layout/sidebar.css',
  '/styles/module/banner.css',
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