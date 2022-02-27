import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import localforage from "localforage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const getTokenInLocalForage = async () => {
  return localforage.getItem("fcmToken");
};

const getFCMToken = async () => {
  try {
    const tokenInLocalForage = await getTokenInLocalForage();
    if (tokenInLocalForage) {
      return tokenInLocalForage;
    }

    const status = await Notification.requestPermission();

    if (status && status === "granted") {
      const fcmToken = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      });

      if (fcmToken) {
        localforage.setItem("fcmToken", fcmToken);
        return fcmToken;
      }
    }
  } catch (err) {
    console.error(err);
  }
};

export default getFCMToken;
