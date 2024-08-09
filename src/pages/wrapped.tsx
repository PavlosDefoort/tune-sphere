import Header from "@/components/landing/Header";
import { useUser } from "@/hooks/useUser";
import { SpotifyTrack, SpotifyUser } from "@/interfaces/SpotifyTypes";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getTopTracks } from "@/services/Calls";
import React from "react";
import WrappedCard from "@/components/landing/WrappedCard";
import Footer from "@/components/landing/Footer";

const Wrapped: React.FC = () => {
  const { data: session, status } = useSession();
  const { user, setUser } = useUser();
  const [token, setToken] = useState<string | null>(null);
  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
  const [error, setError] = useState<string | null>(null);

  console.log("session", session);

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

  useEffect(() => {
    const access_token = session?.user?.accessToken;
    console.log("access_token", access_token);

    if (access_token) {
      setToken(access_token as string);
      fetchUserData(access_token as string);
    }
  }, [status, session]);

  return (
    <main className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-grow bg-backgroundColor-dark px-5">
        {token && session && (
          <WrappedCard session={session} tracks={tracks} token={token} />
        )}
      </div>
      <Footer />
    </main>
  );
};

export default Wrapped;
