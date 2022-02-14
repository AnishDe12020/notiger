import "../styles/globals.css";
import type { AppProps } from "next/app";

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/nextjs";

function Application({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider>
      <SignedIn>
        <Component {...pageProps} />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  );
}

export default Application;
