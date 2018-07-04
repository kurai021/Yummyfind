const config = {
    version: 'v0.10',
    precache_urls: [
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
      '/javascripts/getrecipe-form.js',
      '/javascripts/score.js',
      '/javascripts/gamification.js'
    ]
  },
  preCacheName = "precache-" + config.version,
  preCacheNoDependencyName = "precache-no-dependency-" + config.version,
  dynamicCacheName = "dynamic-cache-" + config.version;

function cacheName(key, opts) {
  return key + "-" + opts.version;
}

//abstract the add to cache functionality to a common function
function addToCache(cacheKey, request, response) {

  //only cache good responses (200)
  if (response.ok) {

    var copy = response.clone();

    caches.open(cacheKey).then(cache => {
      cache.put(request, copy);
    });

  }

  return response;

}

//abstract the fetching from cache functionality to a common function
function fetchFromCache(event) {

  return caches.match(event.request).then(response => {

    if (!response) {
      //fall back to the network fetch here
      throw Error(`${event.request.url} not found in cache`);
    }

    return response;

  });
}

//offline fallback functionality
function offlineResponse(resourceType, opts) {

  if (resourceType === 'image' || resourceType === 'product-img') {

    //return custom response with a placeholder image
    return new Response(opts.offlineImage, {
      headers: {
        'Content-Type': 'image/svg+xml'
      }
    });

  } else if (resourceType === 'content' || resourceType === 'product') {
    return caches.match(opts.offlinePage);
  }

  //can't do a common fallback for other file types like css & JavaScript
  return undefined;
}

function getURL(event) {

  return new URL(event.request.url);

}

//copied froma Jeremy Kieth article - https://adactio.com/journal/9888
//common method to reduce the amount of records cached so you don't
//bloat the customer's hard drive.
//remember many smart phone have limited space available and we don't
//have a good way to know if we are consuming too much.
function trimCache(cacheName, maxItems) {

  caches.open(cacheName)
    .then(function (cache) {
      cache.keys()
        .then(function (keys) {
          if (keys.length > maxItems) {

            cache.delete(keys[0])
              //recursively call trimCache function until we have the max # of items cached
              .then(trimCache(cacheName, maxItems));
          }
        });
    });

};

self.addEventListener("install", event => {

  caches.open(preCacheName).then(cache => {

    return cache.addAll(preCacheFiles);

  });


});

self.addEventListener("activate", event => {

  //on activate
  event.waitUntil(caches.keys()
    .then(function (cacheNames) {

      cacheNames.forEach(value => {

        if (value.indexOf(config.version) < 0) {

          caches.delete(value);

        }

      });

      return;

    })
  );

});


self.addEventListener("fetch", function (event) {

  //  return fetch(event.request);

  event.respondWith(

    caches.match(event.request).then(response => {

      if (!response) {

        //fall back to the network fetch
        return fetch(event.request);

      }

      return response;

    })

  )

});
