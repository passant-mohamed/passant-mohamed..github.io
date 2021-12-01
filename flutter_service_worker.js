'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "firebase-debug.log": "3a82574f5de4c1b133b5112c716eed84",
"version.json": "3b9f2c019f9783ed52fe3c6d99c1636d",
"index.html": "802ac238f4fc2c5a66dbe5d5a06e5c31",
"/": "802ac238f4fc2c5a66dbe5d5a06e5c31",
"firebase-messaging-sw.js": "a3d9bf42786982b35619d666e85b6a58",
"main.dart.js": "2308d3ba337e796dabceb087bc1cfc21",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "15ed1cefc2bb575a8724b35baf1bbdb4",
"firebase.json": "18500ee9b0fa2255ec701badcc73425d",
"assets/AssetManifest.json": "fa95b480c1e2993b1a1aa7b2af5d25a0",
"assets/NOTICES": "8bb20119903703ee3974b73e824172ff",
"assets/FontManifest.json": "bccc6027a25b7733722940062a02b6a6",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/flutter_sound_web/js/flutter_sound/flutter_sound_recorder.js": "f7ac74c4e0fd5cd472d86c3fe93883fc",
"assets/packages/flutter_sound_web/js/flutter_sound/flutter_sound_player.js": "ab009562c726b262f996cb55447ef32a",
"assets/packages/flutter_sound_web/js/flutter_sound/flutter_sound.js": "aecd83c80bf4faace0bcea4cd47ab307",
"assets/packages/flutter_sound_web/js/howler/howler.js": "2bba823e6b4d71ea019d81d384672823",
"assets/packages/flutter_sound_web/js/howler/howler.spatial.min.js": "28305f7b4898c9b49d523b2e80293ec8",
"assets/packages/flutter_sound_web/js/howler/howler.min.js": "0245b64fba989b9e3fd5b253f683d0e4",
"assets/packages/flutter_sound_web/js/howler/howler.core.min.js": "55e0af0319483be8a7371a2cceacf921",
"assets/lib/localization/lang/en.json": "b0d8afa2c75b92e69c5db76a33741d72",
"assets/lib/localization/lang/ar.json": "077d051dd8c1b2c94dc8a26ba3ae85ed",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/assets/images/white_logo.png": "30340299e2faf45aceaac65209b1058d",
"assets/assets/images/white_wheel_logo.png": "c6b6d8690663875d01cd4a02b91cdda3",
"assets/assets/images/splash_pg.png": "df8a72eeb6b1779cd7b4149d2c42adba",
"assets/assets/images/logo.png": "1f799d4443a06a0f9fced705a2958c16",
"assets/assets/images/portal_bg.png": "0f0c306282ed6778e9840effc53ac55e",
"assets/assets/icons/add.png": "ab6fffd97c9dce77a3a2aad0786478d7",
"assets/assets/icons/person.png": "44ddedaf5c7469d8dcd7435f5db6c1a9",
"assets/assets/icons/notifications.png": "31c34a496abbd98af4ded2eaa297cc23",
"assets/assets/icons/frame.png": "9d7f10b0df65dee8cf9728320713794c",
"assets/assets/icons/ic_menu.png": "f908320a0acc4096b492bdf22f5ab192",
"assets/assets/icons/grid_view.png": "64f8db3b8163d07287166589cf9baaba",
"assets/assets/font/Tajawal-Light.ttf": "fbca61ce5f0321ab500bdbb168b775b0",
"assets/assets/font/Tajawal-Bold.ttf": "79bb19e04937c19974260fcb4128270e",
"assets/assets/font/Tajawal-ExtraLight.ttf": "8c37c5fa0335c5d15c2a9f182af1eeb0",
"assets/assets/font/Tajawal-Regular.ttf": "6b10b55e4df612910047b7e5d596a9d5",
"assets/assets/font/Tajawal-Medium.ttf": "2bfe3ee2145f6755e4b5960310daee03",
"assets/assets/font/Tajawal-Black.ttf": "a515f84cb1a7ed89288dba4be9719722"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
