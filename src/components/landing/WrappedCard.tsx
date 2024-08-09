import React, { useEffect, useState } from "react";
import { SpotifyTrack, SpotifyUser } from "@/interfaces/SpotifyTypes";
import { AudioFeatures } from "@/interfaces/AudioFeatures";
import { getAudioFeatures } from "@/services/Calls";

interface WrappedCardProps {
  token: string;
  tracks: SpotifyTrack[];
  session: any;
}

const WrappedCard: React.FC<WrappedCardProps> = ({
  tracks,
  token,
  session,
}) => {
  const [audioFeatures, setAudioFeatures] = useState<AudioFeatures[]>([]);

  console.log("tracks in wrapped", tracks);

  useEffect(() => {
    const fetchAudioFeatures = async () => {
      const result: AudioFeatures[] = [];
      for (const track of tracks) {
        try {
          const trackFeatures = await getAudioFeatures(token, track?.id ?? "");
          result.push(trackFeatures);
        } catch (error) {
          console.error(
            `Failed to fetch audio features for track ${track.id}:`,
            error
          );
        }
      }
      setAudioFeatures(result);
    };

    fetchAudioFeatures();
  }, [token, tracks]);
  console.log("audioFeatures", audioFeatures);

  /*   type TrackInfo = SpotifyTrack & {
    audioFeatures: AudioFeatures[];
  };

  const combineTrackInfo = (
    tracks: SpotifyTrack[],
    audioFeatures: AudioFeatures[]
  ): TrackInfo[] => {
    return tracks.map((track) => {
      const trackAudioFeatures = audioFeatures.filter(
        (feature) => feature.id === track.id
      );
      return {
        ...track,
        audioFeatures: trackAudioFeatures,
      };
    });
  };

  const trackInfoList = combineTrackInfo(tracks, audioFeatures);
  console.log("trackInfoList: ", trackInfoList);

  const trackInfoDisplay = trackInfoList.map((trackInfo, idx) => {
    return (
      <li
        key={idx}
        className="flex w-full h-16 text-white bg-green-900 rounded-lg p-3"
      >
        <div id="track-name" className="w-1/2">
          {trackInfo.name}
        </div>
        <div className="w-1/2">
          <div
            key={idx}
            className="flex flex-row w-full gap-3 overflow-x-scroll "
          >
            <p className="text-white text-nowrap">
              danceability: {trackInfo.danceability}
            </p>
            <p className="text-white text-nowrap">energy: {trackInfo.energy}</p>
            <p className="text-white text-nowrap">key: {trackInfo.key}</p>
            <p className="text-white text-nowrap">
              loudness: {trackInfo.loudness}
            </p>
            <p className="text-white text-nowrap">mode: {trackInfo.mode}</p>
            <p className="text-white text-nowrap">
              speechiness: {trackInfo.speechiness}
            </p>
            <p className="text-white text-nowrap">
              acousticness: {trackInfo.acousticness}
            </p>
            <p className="text-white text-nowrap">
              instrumentalness: {trackInfo.instrumentalness}
            </p>
            <p className="text-white text-nowrap">
              liveness: {trackInfo.liveness}
            </p>
            <p className="text-white text-nowrap">
              valence: {trackInfo.valence}
            </p>
            <p className="text-white text-nowrap">tempo: {trackInfo.tempo}</p>
            <p className="text-white text-nowrap">
              duration_ms: {trackInfo.duration_ms}
            </p>
            <p className="text-white text-nowrap">
              time_signature: {trackInfo.time_signature}
            </p>
          </div>
        </div>
      </li>
    );
  }); */

  const trackInfoDisplay = tracks?.map((track, idx) => {
    const trackAudioFeatures = audioFeatures.filter(
      (feature) => feature.id === track.id
    );
    return (
      <li
        key={idx}
        className="flex w-full h-16 text-white bg-green-900 rounded-lg p-3"
      >
        <div className="w-1/2">{track.name}</div>

        <div className="w-1/2">
          {trackAudioFeatures.map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-row w-full gap-3 overflow-x-scroll "
            >
              <p className="text-white text-nowrap">
                danceability: {feature.danceability}
              </p>
              <p className="text-white text-nowrap">energy: {feature.energy}</p>
              <p className="text-white text-nowrap">key: {feature.key}</p>
              <p className="text-white text-nowrap">
                loudness: {feature.loudness}
              </p>
              <p className="text-white text-nowrap">mode: {feature.mode}</p>
              <p className="text-white text-nowrap">
                speechiness: {feature.speechiness}
              </p>
              <p className="text-white text-nowrap">
                acousticness: {feature.acousticness}
              </p>
              <p className="text-white text-nowrap">
                instrumentalness: {feature.instrumentalness}
              </p>
              <p className="text-white text-nowrap">
                liveness: {feature.liveness}
              </p>
              <p className="text-white text-nowrap">
                valence: {feature.valence}
              </p>
              <p className="text-white text-nowrap">tempo: {feature.tempo}</p>
              <p className="text-white text-nowrap">
                duration_ms: {feature.duration_ms}
              </p>
              <p className="text-white text-nowrap">
                time_signature: {feature.time_signature}
              </p>
            </div>
          ))}
        </div>
      </li>
    );
  });
  // console.log("trackInfo", trackInfo);

  return (
    <div
      id="wrapped-card"
      className="w-full flex flex-col h-full overflow-y-auto justify-start text-8xl p-5 rounded-lg z-50 bg-lime-950"
    >
      Hello, {session?.user?.name}
      <div id="top-tracks" className="flex flex-col w-full py-3">
        {/* ------------- Top Track Information ----------------- */}
        <div className="text-5xl">Top Track Infos</div>
        <div className="flex flex-col my-5 w-full gap-12 text-lg bg-lime-800 rounded-lg p-3">
          {/* {trackInfo} */}
          {trackInfoDisplay}
        </div>
        {/* -------------------------------------------------------- */}
      </div>
    </div>
  );
};

export default WrappedCard;
