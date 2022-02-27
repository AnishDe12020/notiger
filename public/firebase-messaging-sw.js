importScripts("https://www.gstatic.com/firebasejs/9.6.7/firebase-app-compat.js")
importScripts("https://www.gstatic.com/firebasejs/9.6.7/firebase-messaging-compat.js")

// self.addEventListener('fetch', () => {
//   const urlParams = new URLSearchParams(location.search);
//   self.firebaseConfig = Object.fromEntries(urlParams);
//   console.log("Firebase: ", self.firebaseConfig);
// });

const firebaseConfig = {
  apiKey: "AIzaSyA1mvBGjexDPV7vFF2c9oxwIa1_vu5BWPU",
  authDomain: "notiger-340507.firebaseapp.com",
  projectId: "notiger-340507",
  storageBucket: "notiger-340507.appspot.com",
  messagingSenderId: "454416111078",
  appId: "1:454416111078:web:2f07218e3dcdbbd2793227"
};

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);

console.log("From service worker")

messaging.onBackgroundMessage((payload) => {
  console.log("Notification payload: ", payload);

  return self.registration.showNotification(payload.data.name || "New Event", {
    body: payload.data.description || "",
  });
})
