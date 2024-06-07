import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

export function useUser() {
  const { user, setUser } = useContext(UserContext);

  return { user, setUser };
}
