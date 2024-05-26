import Header from "@/components/landing/Header";
import { SpotifyTrack, SpotifyUser } from "@/interfaces/spotifyTypes";
import { getTopTracks } from "@/services/calls";
import { Josefin_Sans } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const josephine = Josefin_Sans({ subsets: ["latin"], weight: ["300"] });

export default function Home() {
  const router = useRouter();
  const [userData, setUserData] = useState<SpotifyUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);

  useEffect(() => {
    const { access_token } = router.query;
    console.log("access_token", access_token);

    if (access_token) {
      console.log(access_token);
      setToken(access_token as string);
      fetchUserData(access_token as string);
    }
  }, [router.query]);

  const fetchUserData = async (token: string) => {
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      setError("Failed to fetch user data");
    }
  };

  return (
    <main className={`min-h-screen w-screen ${josephine.className}`}>
      <Header />
      <div>
        <h1>Spotify Login</h1>
        {!userData ? (
          <div className="flex flex-row space-x-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 496 512"
              className="bg-green-500 text-white h-16 w-16 rounded-full p-2 hover:scale-125"
            >
              <path d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z" />
            </svg>
            <Link href="/api/login">
              <button className="text-5xl bg-green-500 rounded-xl hover:bg-green-600 text-white h-16">
                Login with Spotify
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <h2>Welcome, {userData.display_name}</h2>
            <p>Country: {userData.country}</p>
            <p>Email: {userData.email}</p>
            <button
              className="text-5xl bg-green-500 rounded-xl hover:bg-green-600 text-white h-16"
              onClick={async () => {
                if (!token) return;
                console.log("token", token);
                const newTracks = await getTopTracks(token);
                if (newTracks.length > 0) {
                  setTracks(newTracks);
                }
                console.log(newTracks);
              }}
            >
              Get top tracks
            </button>
            {/* <Image
              src={userData.images[0]?.url}
              alt="User profile"
              width="100"
              height="100"
            /> */}
          </div>
        )}
        {error && <p>{error}</p>}
      </div>

      <div className="flex flex-col space-x-5 justify-center">
        {tracks.map((track, index) => {
          return (
            <div key={index}>
              <h3>{track.name}</h3>
              {track.artists && <p>{track.artists[0].name}</p>}
              {track.album && track.album.images && track.album.images[0] && (
                <iframe
                  src={`https://open.spotify.com/embed/track/${
                    track.uri?.split(":")[2]
                  }?utm_source=generator`}
                  width="100%"
                  height="352"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
