
// 1. First, create this file at the root of your public directory
// public/firebase-messaging-sw.js

// The importScripts MUST be the first thing in your service worker file
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker
const firebaseConfig =({
  apiKey: "AIzaSyD-H6m6GnS18axWQGGVcaMKT4XsxfMcKWE",
  authDomain: "web-notifications-86d38.firebaseapp.com",
  projectId: "web-notifications-86d38",
  storageBucket: "web-notifications-86d38.firebasestorage.app",
  messagingSenderId: "1045586017049",
  appId: "1:1045586017049:web:85b292b02c4374fc91a388",
  measurementId: "G-H3R6J57VWY"
});
firebase.initializeApp(firebaseConfig);
// Retrieve an instance of Firebase Messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message:', payload);
    const link = payload.fcmOptions?.link || payload.data?.link;

  // const notificationTitle = payload.notification.title || 'Notification';
  // const notificationOptions = {
  //   body: payload.notification.body || '',
  //   icon: payload.notification.icon || '/signLogo.webp',
  //   data: { url: link },
  // };

  // self.registration.showNotification(notificationTitle, notificationOptions);
});
self.addEventListener("notificationclick", function (event) {
  console.log("[firebase-messaging-sw.js] Notification click received.");

  event.notification.close();

  // This checks if the client is already open and if it is, it focuses on the tab. If it is not open, it opens a new tab with the URL passed in the notification payload
  event.waitUntil(
    clients
      // https://developer.mozilla.org/en-US/docs/Web/API/Clients/matchAll
      .matchAll({ type: "window", includeUncontrolled: true })
      .then(function (clientList) {
        const url = event.notification.data.url;

        if (!url) return;

        // If relative URL is passed in firebase console or API route handler, it may open a new window as the client.url is the full URL i.e. https://example.com/ and the url is /about whereas if we passed in the full URL, it will focus on the existing tab i.e. https://example.com/about
        for (const client of clientList) {
          if (client.url === url && "focus" in client) {
            return client.focus();
          }
        }

        if (clients.openWindow) {
          console.log("OPENWINDOW ON CLIENT");
          return clients.openWindow(url);
        }
      })
  );
});
