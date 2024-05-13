import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Jacquard_24 } from "next/font/google";

const jackquard = Jacquard_24({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${jackquard.className}`}>
      <Component {...pageProps} />
    </main>
  );
}
