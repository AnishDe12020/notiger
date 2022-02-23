import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import fetcher from "../utils/fetcher";
import { Toaster } from "react-hot-toast";
import NextNProgress from "nextjs-progressbar";

function Application({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
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
