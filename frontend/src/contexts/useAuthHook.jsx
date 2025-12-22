import { useContext } from "react";
import { AuthContext } from "./AuthContext";

// Custom hook for (const { user, login, logout } = useAuth();)
export function useAuth() {
  return useContext(AuthContext);
}
