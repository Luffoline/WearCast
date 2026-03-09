const CACHE_NAME = "wearcast-cache-v1";
const iSPROD = false;

self.addEventListener("install", event => {
  if (iSPROD) {
    event.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        return cache.addAll([
          "/",
          "/index.html",
          "/main_app.mjs",
          "/main_style.css",
          "/manifest.json",

          "/views/signin.html",
          "/views/signup.html",
          "/views/dashboard.html",
          "/views/edit_acc.html",

          "/assets/icon192.png",
          "/assets/icon512.png"
        ]);
      })
    );
  }
});

self.addEventListener("fetch", event => {
  if(iSPROD){
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
  }else{
    event.respondWith(fetch(event.request));
  }
});