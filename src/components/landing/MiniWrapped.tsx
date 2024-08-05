import React, { useEffect, useState } from "react";
import { SpotifyTrack, SpotifyUser } from "@/interfaces/SpotifyTypes";
import { getAudioFeatures } from "@/services/Calls";
import { get } from "lodash";

interface MiniWrappedProps {
  token: string;
  tracks: SpotifyTrack[];
}

const MiniWrapped: React.FC<MiniWrappedProps> = ({ tracks, token }) => {
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

  return (
    <div
      id="mini-wrapped"
      className="w-full h-60 flex justify-center items-center bg-slate-500"
    >
      <div
        id="mini-wrapped-content"
        className="flex flex-col justify-center items-center"
      >
        <h1 className="text-2xl font-bold text-white">Your Top Tracks</h1>
        <div className="flex flex-col">
          {tracks?.map((track, idx) => (
            <div key={idx} className="flex justify-between w-full">
              <p className="text-white">{track.album?.name}</p>
              <p className="text-white">{track.album?.artists[0].name}</p>
              <p className="text-white">{track.popularity}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MiniWrapped;
