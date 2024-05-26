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
    <main
      className={`flex min-h-screen w-screen flex-col items-center justify-between p-24 ${josephine.className}`}
    >
      <div>
        <h1>Spotify Login</h1>
        {!userData ? (
          <Link href="/api/login">
            <button className="text-5xl bg-green-500 rounded-xl hover:bg-green-600 text-white h-16">
              Login with Spotify
            </button>
          </Link>
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
