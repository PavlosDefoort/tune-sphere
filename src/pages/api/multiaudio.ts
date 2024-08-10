import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // GET request for https://api.spotify.com/v1/audio-features/${trackIds}
  // This will return the audio features for a an array of track ids

  // Get the track ids from the query
  const { ids } = req.query;

  // Get the token from the headers
  const token = req.headers.authorization;

  // Check if the token is present
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  // Check if the ids are present
  if (!ids) {
    return res.status(400).json({ error: "No ids provided" });
  }

  // Fetch the audio features
  const response = await fetch(
    `https://api.spotify.com/v1/audio-features?ids=${ids}`,
    {
      headers: {
        Authorization: token as string,
      },
    }
  );

  // Return the response
  res.status(response.status).json(await response.json());
}
