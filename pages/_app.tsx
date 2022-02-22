import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import fetcher from "../utils/fetcher";
import { Toaster } from "react-hot-toast";

function Application({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SWRConfig value={{ fetcher: fetcher }}>
      <SessionProvider session={session}>
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
