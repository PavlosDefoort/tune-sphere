//  Mini Wrapped
// 1. Get top 5 tracks
// 2. Display them in a list of iframes

import { useUser } from "@/hooks/useUser";
import { SpotifyTrack, SpotifyUser } from "@/interfaces/SpotifyTypes";
import Nextauth from "@/pages/api/auth/[...nextauth]";
import { getTopTracks } from "@/services/Calls";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const TryOut: React.FC = () => {
  // const router = useRouter();
  const { data: session, status } = useSession();
  const { user, setUser } = useUser();
  const [token, setToken] = useState<string | null>(null);
  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const access_token = session?.user?.accessToken;
    console.log("access_token", access_token);

    if (access_token) {
      setToken(access_token as string);
      fetchUserData(access_token as string);
    }
  }, [status, session]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching top tracks data");
      if (token) {
        try {
          const data = await getTopTracks(token);
          console.log("topTracks", data);
          setTracks(data);
        } catch (error) {
          setError("Failed to fetch top tracks.");
          console.error("Error fetching top tracks:", error);
        }
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  const fetchUserData = async (token: string) => {
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("userData", data);
      setUser(data as SpotifyUser);
    } catch (error) {
      setError("Failed to fetch user data");
    }
  };

  useEffect(() => {
    console.log("current user state: ", user);
  }, [user]);

  return (
    <div className="h-full bg-rose-200 rounded-2xl flex flex-col justify-center items-center mr-3 max-w-[30rem]">
      {!token && (
        <div className="h-full flex justify-center items-center">
          <Link href="/login">
            <button className="text-lg bg-white rounded-xl hover:bg-pink-600 hover:text-white text-rose-400 h-10 w-40">
              See Mini-Wrapped
            </button>
          </Link>
        </div>
      )}
      {token && (
        <div className="flex flex-col w-full h-full px-0">
          <div className="text-xl text-center mt-3">Your Top 10 Tracks</div>
          <div
            className="h-[65vh] flex flex-col mb-3 py-0 bg-rose-200 overflow-y-scroll items-center rounded-xl"
            style={{
              scrollbarColor: "#f9a8d4 #f9a8d4",
              scrollbarWidth: "thin",
              scrollbarGutter: "revert",
            }}
          >
            {tracks.length === 0 && <div>No tracks available</div>}
            {tracks.map((track, index) => {
              // console.log("track id: ", track.uri?.split(":")[2]);
              // console.log("track id: ", track.id);
              return (
                <div key={index}>
                  {track.album &&
                    track.album.images &&
                    track.album.images[0] && (
                      <iframe
                        src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator`}
                        height="152"
                        className="mt-2 scale-100"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        width="100%"
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
