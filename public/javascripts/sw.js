var cacheName = 'YummyFind';
var filesToCache = [
  '/',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  '/client/materialize-css/dist/css/materialize.min.css',
  '/stylesheets/style.css',
  '/client/jquery/dist/jquery.min.js',
  '/client/materialize-css/dist/js/materialize.min.js',
  '/client/handlebars/dist/handlebars.min.js',
  '/socket.io/socket.io.js',
  '/javascripts/init.js',
  '/javascripts/video.js',
  '/javascripts/getrecipe-socket.js',
  '/javascripts/getrecipe-form.js'
];

var isTooSoon = true;
self.addEventListener("beforeinstallprompt", function(e) {
  if (isTooSoon) {
    e.preventDefault(); // Prevents prompt display
    // Prompt later instead:
    setTimeout(function() {
      isTooSoon = false;
      e.prompt(); // Throws if called more than once or default not prevented
    }, 10000);
  }
  // The event was re-dispatched in response to our request
  // ...
});

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});
