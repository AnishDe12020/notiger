import admin from "firebase-admin";
import { getMessaging } from "firebase-admin/messaging";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      privateKey: (process.env.FIREBASE_PRIVATE_KEY as string).replace(
        /\\n/g,
        "\n"
      ),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  });
}

const messaging = getMessaging();

export { messaging };
