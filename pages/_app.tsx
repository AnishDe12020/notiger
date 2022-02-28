import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import fetcher from "../utils/fetcher";
import toast, { Toaster } from "react-hot-toast";
import NextNProgress from "nextjs-progressbar";
import { useEffect } from "react";
import Header from "../components/Header";
import EventToast from "../components/EventToast";
import { onMessage } from "firebase/messaging";
import NotificationButton from "../components/NotificationButton";
import { DefaultSeo } from "next-seo";
import SEO from "../seo.config";

function Application({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  useEffect(() => {
    import("../lib/firebase").then(({ messaging }) => {
      onMessage(messaging, payload => {
        toast.custom(t => <EventToast t={t} payload={payload} />);
      });
    });
  }, []);

  return (
    <SWRConfig value={{ fetcher: fetcher }}>
      <SessionProvider session={session}>
        <DefaultSeo {...SEO} />
        <Header />
        <NotificationButton />
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
