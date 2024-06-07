import { UserContextValue } from "@/interfaces/ContextInterfaces";
import { createContext } from "react";

export const UserContext = createContext<UserContextValue>({
  user: null,
  setUser: () => null,
});
