import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import fetcher from "../utils/fetcher";
import { Toaster } from "react-hot-toast";
import NextNProgress from "nextjs-progressbar";
import { useEffect } from "react";
import getFCMToken from "../lib/firebase";

function Application({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  useEffect(() => {
    const setToken = async () => {
      try {
        const token = await getFCMToken();
        if (token) {
          console.log(token);
        }
      } catch (err) {
        console.error(err);
      }
    };

    setToken();

    if ("serviceWorker" in navigator) {
      // Convert environment variables to URL `search` parameters
      const firebaseConfig = new URLSearchParams({
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      }).toString();

      // Service worker URL w/config variables
      const swUrl = `firebase-messaging-sw.js?${firebaseConfig}`;

      navigator.serviceWorker.register(swUrl).then(
        registration =>
          console.log(
            "Firebase sw registered with scope: ",
            registration.scope
          ),
        err => console.log(err)
      );
    }
  }, []);

  return (
    <SWRConfig value={{ fetcher: fetcher }}>
      <SessionProvider session={session}>
        <NextNProgress color="#d1d5db" options={{ showSpinner: false }} />
        <Toaster
          toastOptions={{
            style: { backgroundColor: "#333333", color: "#ffffff" },
          }}
        />
        <Component {...pageProps} />
      </SessionProvider>
    </SWRConfig>
  );
}

export default Application;
