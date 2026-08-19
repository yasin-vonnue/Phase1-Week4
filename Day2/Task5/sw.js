const CACHE_NAME = "task5-cache-v2";

const STATIC_ASSETS = [
  "./",
  "./index.html",
  "./css/main.css",
  "./js/main.js",
  "./images/offline-demo.jpg",
];

self.addEventListener("install", (event) => {
  console.log("Service Worker: install event");

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching static assets...");

      return cache.addAll(STATIC_ASSETS);
    }),
  );

  self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  if (url.origin === self.location.origin) {
    event.respondWith(cacheFirst(request));
    return;
  }

  if (url.hostname === "jsonplaceholder.typicode.com") {
    event.respondWith(networkFirst(request));
  }
});

async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);

  if (cachedResponse) {
    console.log("Cache hit:", request.url);

    return cachedResponse;
  }

  console.log("Cache miss:", request.url);

  const networkResponse = await fetch(request);

  const cache = await caches.open(CACHE_NAME);

  await cache.put(request, networkResponse.clone());

  return networkResponse;
}

async function networkFirst(request) {
  try {
    console.log("API: trying network first:", request.url);

    const networkResponse = await fetch(request);

    const cache = await caches.open("CACHE_NAME");

    await cache.put(request, networkResponse.clone());

    return networkResponse;
  } catch (error) {
    console.warn("API network failed, checking cache:", request.url);

    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    return new Response(
      JSON.stringify({
        error: "Offline and no cached API response.",
      }),
      {
        status: 503,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}

self.addEventListener("activate", (event) => {
  console.log("Service Worker: activate event");

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return (
              cacheName.startsWith("task5-cache-") && cacheName !== CACHE_NAME
            );
          })
          .map((cacheName) => {
            console.log("Deleting stale cache:", cacheName);

            return caches.delete(cacheName);
          }),
      );
    }),
  );

  self.clients.claim();
});
