import React, { useEffect, useState } from "react";
import { SpotifyTrack, SpotifyUser } from "@/interfaces/SpotifyTypes";
import { getAudioFeatures } from "@/services/Calls";
import { get } from "lodash";

interface MiniWrappedProps {
  token: string;
  tracks: SpotifyTrack[];
}

const MiniWrapped: React.FC<MiniWrappedProps> = ({ tracks, token }) => {
  const [audioFeatures, setAudioFeatures] = useState<any[]>([]);

  console.log("tracks in miniwrapped", tracks);

  const testAudioFeatures = async () => {
    console.log("id", tracks[0]?.id ?? "");
    const id = tracks[0]?.id ?? "";
    try {
      const result = await getAudioFeatures(token, id);
      console.log("audio features:", result);
    } catch (error) {
      console.error("Error fetching audio features:", error);
    }
  };
  testAudioFeatures();

  useEffect(() => {
    const fetchAudioFeatures = async () => {
      const features: SpotifyTrack[] = [];
      for (const track of tracks) {
        try {
          const feature = await getAudioFeatures(token, track?.id ?? "");
          features.push(feature);
        } catch (error) {
          console.error(
            `Failed to fetch audio features for track ${track.id}:`,
            error
          );
        }
      }
      setAudioFeatures(features);
    };

    fetchAudioFeatures();
  }, [token, tracks]);

  return (
    <div
      id="mini-wrapped"
      className="w-full h-full flex justify-center items-center bg-slate-500 overflow-y-scroll"
    >
      <div
        id="mini-wrapped-content"
        className="flex flex-col w-full justify-center items-center "
      >
        <h1 className="text-2xl font-bold text-white">Your Top Tracks</h1>
        <div className="flex flex-col w-full px-3 gap-9">
          {tracks?.map((track, idx) => (
            <div key={idx} className="flex justify-between w-full ">
              <p className="text-white">{track.name}</p>
              <p className="text-white">{track.artists?.[0]?.name}</p>
              <p className="text-white">{track.popularity}</p>
            </div>
          ))}
        </div>
      </div>
      <ul className="text-green-600">
        {audioFeatures.map((feature) => (
          <li key={feature.id}>
            <p>ID: {feature.id}</p>
            <p>Danceability: {feature.danceability}</p>
            <p>Energy: {feature.energy}</p>
            <p>Tempo: {feature.tempo}</p>
            {/* Add other feature properties as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MiniWrapped;
