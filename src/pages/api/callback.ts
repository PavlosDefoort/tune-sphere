import { NextApiRequest, NextApiResponse } from "next";
import queryString from "query-string";

const callbackHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const code = req.query.code as string;

  if (!code) {
    return res.status(400).json({ error: "Missing code" });
  }

  const authOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(
          `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
        ).toString("base64"),
    },
    body: queryString.stringify({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: process.env.REDIRECT_URI,
    }),
  };

  try {
    const response = await fetch(
      "https://accounts.spotify.com/api/token",
      authOptions
    );
    const data = await response.json();
    const accessToken = data.access_token;

    console.log("accessToken", accessToken);

    res.redirect(
      `http://localhost:3000/?${queryString.stringify({
        access_token: accessToken,
      })}`
    );
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch access token or user data" });
  }
};

export default callbackHandler;
