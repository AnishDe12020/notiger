import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import fetcher from "../utils/fetcher";

function Application({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SWRConfig value={{ fetcher: fetcher }}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </SWRConfig>
  );
}

export default Application;
