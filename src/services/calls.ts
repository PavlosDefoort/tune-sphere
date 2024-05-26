import { SpotifyTrack } from "@/interfaces/spotifyTypes";

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
      "v1/me/top/tracks?time_range=long_term&limit=50",
      "GET",
      null,
      token
    )
  ).items;
}
