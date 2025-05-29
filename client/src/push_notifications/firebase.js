// 2. Updated Firebase initialization file
// firebase.js
import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage ,isSupported} from "firebase/messaging";
import { jwtDecode } from "jwt-decode";

const firebaseConfig = {
  apiKey: "AIzaSyD-H6m6GnS18axWQGGVcaMKT4XsxfMcKWE",
  authDomain: "web-notifications-86d38.firebaseapp.com",
  projectId: "web-notifications-86d38",
  storageBucket: "web-notifications-86d38.firebasestorage.app",
  messagingSenderId: "1045586017049",
  appId: "1:1045586017049:web:85b292b02c4374fc91a388",
  measurementId: "G-H3R6J57VWY"
};

// Initialize Firebase
export const app = getApps().length === 0 ? initializeApp(firebaseConfig): getApp();
export const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};
const getDeviceInfo = () => {
  const userAgent = navigator.userAgent;
  let osName = 'Unknown OS';
  let browserName = 'Unknown Browser';

  // Detect Operating System
  if (/iPhone|iPad|iPod/.test(userAgent)) {
    osName = /iPad/.test(userAgent) ? 'iPad' : 'iPhone';
  } else if (/Android/.test(userAgent)) {
    osName = 'Android';
  } else if (/Mac|Macintosh/.test(userAgent)) {
    osName = 'Mac';
  } else if (/Linux/.test(userAgent)) {
    osName = 'Linux';
  } else if (/Windows/.test(userAgent)) {
    osName = 'Windows';
  } else if (/CrOS/.test(userAgent)) {
    osName = 'Chrome OS';
  }

  // Detect Browser
  if (userAgent.includes('Edg/')) {
    browserName = 'Edge';
  } else if (userAgent.includes('Chrome/') && !userAgent.includes('Edg/')) {
    browserName = 'Chrome';
  } else if (userAgent.includes('Firefox/')) {
    browserName = 'Firefox';
  } else if (userAgent.includes('Safari/') && !userAgent.includes('Chrome/')) {
    browserName = 'Safari';
  } else if (userAgent.includes('Opera/') || userAgent.includes('OPR/')) {
    browserName = 'Opera';
  }

  return `${browserName} on ${osName}`;
};
export const fetchToken = async () => {
      const token = localStorage.getItem('token');
        if (!token) {return null;}
        else {
          jwtDecode(token);
        }
        // Check if the token is expired
        const decodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken);
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const fToken = await getToken(fcmMessaging, {
        vapidKey: "BFNxKyEA-_nPG7aMSXzQps9SGWfF5MnmYNrSjs9qKcE2SI04Jpp7DJ7Ok7t-37FGurimgPua8o3MtZxkHowf_wI",
      });
      // check if token exists
      if (!fToken ) {
        console.log("No registration token available. Request permission to generate one.");
        return null;
      }
      const hasToken = decodedToken.token?.includes(fToken);
      const deviceName = getDeviceInfo();
      console.log("Device Name:", deviceName);

      if(!hasToken){
        const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/auth/save-notification-token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({  
              userId: decodedToken.userId,
              token: fToken ,
              deviceName
            }),
        });
        
        const data = await response.json();
        console.log(data);
        localStorage.setItem("token", data.accessToken);
    };
      // if note save it 
      
      // if yes do nothing
      return fToken;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};
// Helper function to register service worker
// const registerServiceWorker = async () => {
//   if ('serviceWorker' in navigator) {
//     try {
//       // For Vite/development environments, we need to use the correct path
//       // that includes the base URL path
//       const swPath = import.meta.env.DEV ? '/firebase-messaging-sw.js' : '/firebase-messaging-sw.js';
      
//       // Get existing service worker registrations first
//       const existingRegistrations = await navigator.serviceWorker.getRegistrations();
//       for (const reg of existingRegistrations) {
//         if (reg.scope.includes(window.location.origin)) {
//           console.log('Using existing service worker registration:', reg);
//           return reg;
//         }
//       }
      
//       const registration = await navigator.serviceWorker.register(swPath, {
//         scope: '/'
//       });
//       console.log('Service Worker registered with scope:', registration.scope);
//       return registration;
//     } catch (error) {
//       console.error('Service Worker registration failed:', error);
//       return null;
//     }
//   }
//   return null;
// };

// export const initializeFirebaseMessaging = async () => {
//   try {
//     // Register service worker first
//     const swRegistration = await registerServiceWorker();
    
//     // Request notification permission
//     const permission = await Notification.requestPermission();
//     console.log("Notification permission:", permission);
    
//     if (permission === "granted") {
//       // Make sure we wait for the service worker to be ready
//       if (swRegistration && swRegistration.installing) {
//         console.log('Waiting for service worker to be installed...');
//         await new Promise(resolve => {
//           swRegistration.installing.addEventListener('statechange', (e) => {
//             if (e.target.state === 'activated') {
//               console.log('Service worker now activated');
//               resolve();
//             }
//           });
//         });
//       }
      
//       // Get FCM token with the service worker registration
//       const token = await getToken(messaging, {
//         vapidKey: "BFNxKyEA-_nPG7aMSXzQps9SGWfF5MnmYNrSjs9qKcE2SI04Jpp7DJ7Ok7t-37FGurimgPua8o3MtZxkHowf_wI",
//         serviceWorkerRegistration: swRegistration
//       });
      
//       if (token) {
//         console.log("FCM Token generated:", token);
//         // Here you would typically send this token to your server
//         return token;
//       } else {
//         console.error("No token received");
//         return null;
//       }
//     } else {
//       console.warn("Notification permission denied");
//       return null;
//     }
//   } catch (error) {
//     console.error("Error initializing Firebase messaging:", error);
//     return null;
//   }
// };

// Setup foreground notification handler
// export const setupForegroundNotificationListener = () => {
//   onMessage(messaging, (payload) => {
//     console.log("Foreground message received:", payload);
    
//     // Display notification manually for foreground messages
//     if (Notification.permission === "granted" && payload.notification) {
//       const notificationTitle = payload.notification.title || 'New Notification';
//       const notificationOptions = {
//         body: payload.notification.body || '',
//         icon: payload.notification.icon || '/icon.png'
//       };
      
//       new Notification(notificationTitle, notificationOptions);
//     }
//   });
// }