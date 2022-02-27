import getFCMToken from "../lib/firebase";

const setUpNotifications = async () => {
  if (!navigator) return;

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/firebase-messaging-sw.js").then(
      registration =>
        console.log("Firebase sw registered with scope: ", registration.scope),
      err => console.error(err)
    );
  }

  await getFCMToken();
};

export default setUpNotifications;
