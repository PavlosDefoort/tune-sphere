import { AudioFeatures } from "@/interfaces/AudioFeatures";
import { SpotifyTrack } from "@/interfaces/SpotifyTypes";

export async function fetchWebApi(
  endpoint: string,
  method: string,
  body: any,
  token: string
) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
  });
  return await res.json();
}

export async function getTopTracks(token: string): Promise<SpotifyTrack[]> {
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (
    await fetchWebApi(
      "v1/me/top/tracks?time_range=short_term&limit=1",
      "GET",
      null,
      token
    )
  ).items;
}

export async function getMultipleAudioFeatures(
  token: string,
  trackIds: string[]
): Promise<any> {
  console.log("fetching audio features", trackIds);
  const response = await fetchWebApi(
    `v1/audio-features?ids=${trackIds.join(",")}`,
    "GET",
    null,
    token
  );
  return response.audio_features;
}

export async function getAudioFeatures(
  token: string,
  trackId: string
): Promise<any> {
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-audio-features
  const response = await fetchWebApi(
    `v1/audio-features/${trackId}`,
    "GET",
    null,
    token
  );
  return response;
}
