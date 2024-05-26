import { NextApiResponse } from "next";
import queryString from "query-string";

const loginHandler = (res: NextApiResponse) => {
  const queryParams = queryString.stringify({
    client_id: process.env.CLIENT_ID,
    redirect_uri: process.env.REDIRECT_URI,
    response_type: "code",
    scope: "user-top-read user-read-email user-read-private",
  });

  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
};

export default loginHandler;
