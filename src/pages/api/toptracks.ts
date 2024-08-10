import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get the token from the headers
  const token = req.headers.authorization;

  // Check if the token is present
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  // Fetch the top tracks
  const response = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10",
    {
      headers: {
        Authorization: token as string,
      },
    }
  );

  // Return the response
  res.status(response.status).json(await response.json());
}
