import { AudioFeatures } from "@/interfaces/AudioFeatures";
import { SpotifyTrack } from "@/interfaces/SpotifyTypes";
import { getMultipleAudioFeatures, getTopTracks } from "@/services/Calls";
import { LinearProgress } from "@mui/material";
import { set } from "lodash";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";

interface WrappedCardProps {}
const WrappedCard: React.FC<WrappedCardProps> = ({}) => {
  const [audioFeatures, setAudioFeatures] = useState<AudioFeatures[]>([]);
  const [trackInfo, setTrackInfo] = useState<TrackInfo[]>([]);

  const { data: session } = useSession();
  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
  const isCalling = useRef(false);

  const musicalKeys: { [key: number]: string } = {
    0: "c",
    1: "c♯/d♭",
    2: "d",
    3: "d♯/e♭",
    4: "e",
    5: "f",
    6: "f♯/g♭",
    7: "g",
    8: "g♯/a♭",
    9: "a",
    10: "a♯/b♭",
    11: "b",
  };

  useEffect(() => {
    const fetchData = async (token: string) => {
      console.log("fetching top tracks data");
      if (token) {
        try {
          console.log(token);
          const response = await fetch("/api/toptracks", {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          const data = await response.json();
          console.log("data", data.items);
          setTracks(data.items as SpotifyTrack[]);
        } catch (error) {
          console.error("Error fetching top tracks:", error);
        }
      }
    };

    if (session?.user?.accessToken) {
      console.log("fetching data");
      fetchData(session.user.accessToken);
    }
  }, [session?.user.accessToken]);

  useEffect(() => {
    const access_token = session?.user?.accessToken;

    const fetchUserData = async (token: string) => {
      try {
        const response = await fetch("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
      } catch (error) {}
    };

    if (access_token) {
      fetchUserData(access_token as string);
    }
  }, [session]);

  useEffect(() => {
    const fetchAudioFeatures = async (token: string) => {
      console.log("fetching audio features", tracks);

      // Create an array of track ids
      const trackIds = tracks
        .map((track) => {
          if (track.id) {
            return track.id;
          }
        })
        .filter((id) => id !== undefined) as string[];

      console.log("trackIds", trackIds);

      try {
        const severalAudio = await fetch(
          `/api/multiaudio?ids=${trackIds.join(",")}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        const data = await severalAudio.json();
        console.log(data.audio_features);
        setAudioFeatures(data.audio_features as AudioFeatures[]);
      } catch (error) {
        console.error(`Failed to fetch audio features for tracks:`, error);
      }

      isCalling.current = false;
    };
    if (!isCalling.current && session?.user?.accessToken && tracks.length > 0) {
      fetchAudioFeatures(session.user.accessToken);
      isCalling.current = true;
    }
  }, [session?.user.accessToken, tracks]);

  type TrackInfo = SpotifyTrack & {
    audioFeatures: AudioFeatures;
  };

  useEffect(() => {
    if (tracks.length > 0 && audioFeatures.length > 0) {
      console.log(tracks, audioFeatures);

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
            audioFeatures: trackAudioFeatures[0],
          };
        });
      };

      console.log(tracks, audioFeatures);
      console.log(combineTrackInfo(tracks, audioFeatures));
      setTrackInfo(combineTrackInfo(tracks, audioFeatures));
    }
  }, [tracks, audioFeatures]);

  const wantedAudioFeatures: (keyof AudioFeatures)[] = [
    "danceability",
    "energy",
    "key",
    "loudness",
    "mode",
    "speechiness",
    "acousticness",
    "instrumentalness",
    "liveness",
    "valence",
    "tempo",
    "duration_ms",
    "time_signature",
  ];

  type Range = {
    min: number;
    max: number;
  };

  type ExcludedKeys =
    | "analysis_url"
    | "duration_ms"
    | "id"
    | "key"
    | "mode"
    | "time_signature"
    | "track_href"
    | "type"
    | "uri"; // Keys to exclude

  type FilteredAudioFeatures = Omit<AudioFeatures, ExcludedKeys>;

  // Define a mapped type for audio ranges
  type AudioRanges = {
    [K in keyof FilteredAudioFeatures]: Range;
  };

  // Create the audioRanges object using the mapped type
  const audioRanges: AudioRanges = {
    danceability: { min: 0, max: 1 },
    energy: { min: 0, max: 1 },
    loudness: { min: -60, max: 0 }, // Adjusted for loudness range
    speechiness: { min: 0, max: 1 },
    acousticness: { min: 0, max: 1 },
    instrumentalness: { min: 0, max: 1 },
    liveness: { min: 0, max: 1 },
    valence: { min: 0, max: 1 },
    tempo: { min: 0, max: 200 },
  };

  const audioRangesKeys = Object.keys(audioRanges) as (keyof AudioRanges)[];

  const TrackInfoDisplay = trackInfo?.map((track, idx) => {
    return (
      <li
        key={idx}
        className="flex flex-col space-y-3 sm:flex-col md:flex-row md:space-x-5 items-start w-full h-1/2 text-white bg-green-900 rounded-lg p-3"
      >
        <h1 className="text-4xl text-white">{idx + 1}</h1>
        <div className="w-full sm:w-1/2">
          <iframe
            src={`https://open.spotify.com/embed/track/${track.id}`}
            width="100%"
            height="352"
            allowTransparency={true}
            allow="encrypted-media"
          ></iframe>
        </div>

        <div className="w-1/2 flex flex-col items-start">
          <div className="w-full flex flex-col items-center">
            <h2 className="text-2xl text-white">{track.name}</h2>

            <p className="text-white text-nowrap capitalize">
              {track.artists?.[0]?.name ?? "N/A"}
            </p>
            <div className="flex flex-row space-x-4">
              <p>
                {musicalKeys[track.audioFeatures.key ?? 0]}{" "}
                {track.audioFeatures.mode === 1 ? "major" : "minor"}
              </p>
              <p>{Math.round(track.audioFeatures.tempo)} BPM</p>
            </div>
          </div>
          <div className="items-start">
            {audioRangesKeys.map((feature, index) => (
              <div
                className="flex flex-row items-center space-x-4 "
                key={index}
              >
                <p className="text-white text-nowrap capitalize ">
                  {feature}: {track.audioFeatures[feature] ?? "N/A"}
                </p>
                <LinearProgress
                  value={
                    (((track.audioFeatures[feature] as number) -
                      audioRanges[feature].min) *
                      100) /
                    (audioRanges[feature].max - audioRanges[feature].min)
                  }
                  className="w-24 h-2"
                  variant="determinate"
                />
              </div>
            ))}
          </div>
        </div>
      </li>
    );
  });
  // console.log("trackInfo", trackInfo);

  return (
    <div
      id="wrapped-card"
      className="w-full flex flex-col h-full  justify-start sm:text-8xl text-6xl p-5 rounded-lg  bg-lime-950 text-white"
    >
      Hello, {session?.user?.name}
      <div id="top-tracks" className="flex flex-col w-full py-3">
        {/* ------------- Top Track Information ----------------- */}
        <div className="sm:text-5xl text-3xl text-white">Top Track Infos</div>
        <div className="flex flex-col my-5 w-full gap-12 text-lg bg-lime-800 rounded-lg p-3">
          {/* {trackInfo} */}
          {TrackInfoDisplay}
        </div>
        {/* -------------------------------------------------------- */}
      </div>
    </div>
  );
};

export default WrappedCard;
