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

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  btnAdd.style.display = 'block';

  btnAdd.addEventListener('click', (e) => {
  // hide our user interface that shows our A2HS button
  btnAdd.style.display = 'none';
  // Show the prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice
    .then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
  });
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
