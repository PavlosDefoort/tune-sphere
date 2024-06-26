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
      "v1/me/top/tracks?time_range=short_term&limit=10",
      "GET",
      null,
      token
    )
  ).items;
}
