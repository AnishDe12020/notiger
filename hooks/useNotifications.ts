import axios from "axios";
import { getToken } from "firebase/messaging";
import localforage from "localforage";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useNotifications = () => {
  const [isSetup, setIsSetup] = useState<boolean>();

  useEffect(() => {
    const checkIsSetup = async () => {
      console.log(
        "Token in local forage: ",
        await localforage.getItem("fcmToken")
      );

      if (
        (await localforage.getItem("fcmToken")) &&
        isSupported() &&
        isPermissionGranted() &&
        (await navigator.serviceWorker.getRegistration(
          "firebase-messaging-sw.js"
        ))
      ) {
        setIsSetup(true);
      } else {
        setIsSetup(false);
      }
    };

    checkIsSetup();
  });

  const getTokenInLocalForage = async () => {
    return localforage.getItem("fcmToken");
  };

  const getFCMToken = async () => {
    try {
      const status = await Notification.requestPermission();
      const tokenInLocalForage = await getTokenInLocalForage();
      if (tokenInLocalForage) {
        return tokenInLocalForage;
      }

      if (status && status === "granted") {
        import("../lib/firebase").then(async ({ messaging }) => {
          const fcmToken = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
          });

          if (fcmToken) {
            await axios.post("/api/fcmtokens", {
              fcmToken: fcmToken,
            });

            localforage.setItem("fcmToken", fcmToken);
            return fcmToken;
          }
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const setUpNotifications = async () => {
    if (!navigator) return;

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/firebase-messaging-sw.js").then(
        registration =>
          console.log(
            "Firebase sw registered with scope: ",
            registration.scope
          ),
        err => console.error(err)
      );
    }

    await getFCMToken();

    toast.success("Notifications enabled!");

    setIsSetup(true);
  };

  const isSupported = () => {
    return "Notification" in window;
  };

  const isPermissionGranted = () => {
    return Notification.permission === "granted";
  };

  return {
    setUpNotifications,
    isPermissionGranted,
    isSupported,
    isSetup,
  };
};

export default useNotifications;
