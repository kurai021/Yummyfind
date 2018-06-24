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

var installPromptEvent;

self.addEventListener('beforeinstallprompt', function(e){
  // Prevent Chrome <= 67 from automatically showing the prompt
  event.preventDefault();
  // Stash the event so it can be triggered later.
  installPromptEvent = event;
  // Update the install UI to notify the user app can be installed
  document.querySelector('#install-button').disabled = false;
});

document.querySelector('#install-button').addEventListener('click', function(){
  // Update the install UI to remove the install button
  document.querySelector('#install-button').disabled = true;
  // Show the modal add to home screen dialog
  installPromptEvent.prompt();
  // Wait for the user to respond to the prompt
  installPromptEvent.userChoice.then(function(choice) {
    if (choice.outcome === 'accepted') {
      console.log('User accepted the A2HS prompt');
    } else {
      console.log('User dismissed the A2HS prompt');
    }
    // Clear the saved prompt since it can't be used again
    installPromptEvent = null;
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
