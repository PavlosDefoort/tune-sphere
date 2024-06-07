import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Josefin_Sans } from "next/font/google";
import { UserContext } from "@/context/UserContext";
import { useState } from "react";
import { SpotifyUser } from "@/interfaces/SpotifyTypes";

const josephine = Josefin_Sans({ subsets: ["latin"], weight: ["400"] });

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<SpotifyUser | null>(null);

  return (
    <main className={`${josephine.className}`}>
      <UserContext.Provider value={{ user: user, setUser: setUser }}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </main>
  );
}
