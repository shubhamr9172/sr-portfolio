import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MetricsProvider } from "@/context/MetricsContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MetricsProvider>
      <Component {...pageProps} />
    </MetricsProvider>
  );
}
