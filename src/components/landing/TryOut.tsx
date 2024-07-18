//  Mini Wrapped
// 1. Get top 5 tracks
// 2. Display them in a list of iframes

import { useUser } from "@/hooks/useUser";
import { SpotifyTrack, SpotifyUser } from "@/interfaces/SpotifyTypes";
import { getTopTracks } from "@/services/Calls";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const TryOut: React.FC = () => {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [token, setToken] = useState<string | null>(null);
  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const { access_token } = router.query;
    console.log("access_token", access_token);

    if (access_token) {
      console.log(access_token);
      setToken(access_token as string);
      fetchUserData(access_token as string);
    }
  }, [router.query]);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        const data = await getTopTracks(token);
        setTracks(data);
      }
    };
    if (user && token) {
      fetchData();
    }
  }, [user, token]);

  const fetchUserData = async (token: string) => {
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUser(data as SpotifyUser);
    } catch (error) {
      setError("Failed to fetch user data");
    }
  };

  useEffect(() => {
    console.log("tracks", tracks);
  }, [tracks]);

  return (
    <div className="h-full bg-gradient-to-r from-rose-200 to-pink-200 rounded-2xl flex flex-col justify-center items-center">
      {!user && (
        <div className="h-full flex justify-center items-center">
          <Link href="/api/login">
            <button className="text-lg bg-white rounded-xl hover:bg-pink-600 hover:text-white text-rose-400 h-10 w-40">
              See Mini-Wrapped
            </button>
          </Link>
        </div>
      )}
      {user && (
        <div className="w-2/3 flex flex-col ">
          <div className="text-xl">Your Top 10 Tracks</div>
          <div
            className="h-80 flex flex-col bg-black overflow-y-scroll items-center space-y-3 rounded-xl"
            style={{
              scrollbarColor: "#f9a8d4 #f9a8d4",
              scrollbarWidth: "thin",
              scrollbarGutter: "revert",
            }}
          >
            {tracks.map((track, index) => {
              return (
                <div key={index}>
                  {track.album &&
                    track.album.images &&
                    track.album.images[0] && (
                      <iframe
                        src={`https://open.spotify.com/embed/track/${
                          track.uri?.split(":")[2]
                        }?utm_source=generator`}
                        width="100%"
                        height="152"
                        className="mt-2 scale-100"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                      ></iframe>
                    )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TryOut;
