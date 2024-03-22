import "@/styles/globals.css";
import { I18nextProvider } from "react-i18next";
import { useEffect, useState } from "react";
import Script from "next/script";
import i18n from "../i18n";

export default function App({ Component, pageProps }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set isMounted to true when the component is mounted
    setIsMounted(true);
  }, []);

  // If the component is not mounted yet, return null to suppress hydration errors
  if (!isMounted) {
    return null;
  }
  return (
    <I18nextProvider i18n={i18n}>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossOrigin="anonymous"
      />
      <Component {...pageProps} />
    </I18nextProvider>
  );
}
