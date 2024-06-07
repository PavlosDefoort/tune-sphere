import { SpotifyUser } from "./SpotifyTypes";

export interface UserContextValue {
  user: SpotifyUser | null;
  setUser: (user: SpotifyUser) => void;
}
