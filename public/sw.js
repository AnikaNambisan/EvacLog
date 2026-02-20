const CACHE_NAME = "evaclog-v1";

const APP_SHELL = [
  "/",
  "/dashboard",
  "/dashboard/inventory",
  "/dashboard/settings",
  "/offline",
  "/manifest.json",
  "/logo.png",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
];

/* ═══════════════════ Install ═══════════════════ */

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

/* ═══════════════════ Activate ═══════════════════ */

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

/* ═══════════════════ Fetch ═══════════════════ */

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== self.location.origin) return;

  // Navigation requests → network-first, fallback to cache, then /offline
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() =>
          caches.match(request).then(
            (cached) => cached || caches.match("/offline")
          )
        )
    );
    return;
  }

  // Static assets → cache-first
  const isStaticAsset =
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "image" ||
    request.destination === "font";

  if (isStaticAsset) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
            return response;
          })
      )
    );
    return;
  }

  // Default → network-first
  event.respondWith(
    fetch(request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        return response;
      })
      .catch(() => caches.match(request))
  );
});

/* ═══════════════════ Background Sync (mock) ═══════════════════ */

self.addEventListener("sync", (event) => {
  if (event.tag === "sync-photos") {
    console.log("[SW] Background sync: sync-photos triggered");
    event.waitUntil(Promise.resolve());
  }
  if (event.tag === "sync-purchases") {
    console.log("[SW] Background sync: sync-purchases triggered");
    event.waitUntil(Promise.resolve());
  }
});

/* ═══════════════════ Push Notifications (mock) ═══════════════════ */

self.addEventListener("push", (event) => {
  const data = event.data
    ? event.data.json()
    : { title: "EvacLog", body: "You have a new notification." };

  event.waitUntil(
    self.registration.showNotification(data.title || "EvacLog", {
      body: data.body || "You have a new notification.",
      icon: "/icons/icon-192x192.png",
      badge: "/icons/icon-192x192.png",
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow("/dashboard"));
});
