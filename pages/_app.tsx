import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import fetcher from "../utils/fetcher";
import toast, { Toaster } from "react-hot-toast";
import NextNProgress from "nextjs-progressbar";
import { useEffect } from "react";
import getFCMToken, { onMessageListener } from "../lib/firebase";
import Header from "../components/Header";
import { Transition } from "@headlessui/react";
import Twemoji from "react-twemoji";

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
          onMessageListener()
            .then(payload => {
              toast.custom(t => (
                <Transition
                  show={t.visible}
                  className="flex space-x-2 rounded-2xl bg-secondary px-4 py-3 transition duration-200"
                  enter="transition duration-1000"
                  enterFrom="-translate-y-full"
                  enterTo="translate-y-0"
                  leave="transition duration-200"
                  leaveFrom="translate-y-0"
                  leaveTo="-translate-y-full"
                >
                  <Twemoji
                    className="flex h-fit w-fit items-center justify-center rounded-full bg-gray-800 p-3"
                    options={{ className: "h-4 w-4 md:h-6 md:w-6" }}
                  >
                    {/* @ts-ignore */}
                    {payload?.data.icon || "🔔"}
                  </Twemoji>
                  <div className="flex flex-col text-gray-100">
                    <h3 className="text-md text-normal">
                      {/* @ts-ignore */}
                      {payload?.data.name || "New Event"}
                    </h3>
                    <p className="text-sm text-gray-300">
                      {/* @ts-ignore */}
                      {payload?.data.description}
                    </p>
                  </div>
                </Transition>
              ));

              console.log(payload);
            })
            .catch(err => console.error(err));
        }
      } catch (err) {
        console.error(err);
      }
    };

    setToken();

    if ("serviceWorker" in navigator) {
      // Convert environment variables to URL `search` parameters
      // const firebaseConfig = new URLSearchParams({
      //   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      //   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      //   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      //   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      //   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      //   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      // }).toString();

      // Service worker URL w/config variables
      // const swUrl = `/firebase-messaging-sw.js?${firebaseConfig}`;

      navigator.serviceWorker.register("/firebase-messaging-sw.js").then(
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
        <Header />
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
