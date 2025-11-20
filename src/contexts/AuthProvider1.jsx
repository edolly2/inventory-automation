// src/contexts/AuthContext.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fakeLogin, fakeLogout } from "../services/fakeAuthService.js";
import { AuthContext } from "./AuthContext.jsx";

// Possible user data example:
// {
//   id: "user-1",
//   name: "Alice",
//   email: "alice@example.com",
//   clientId: "alpha-shop",
//   role: "admin",
//   token: "fake-jwt-here-motha-fucker"
// }

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // currently logged-in user
  const [loading, setLoading] = useState(true); // while checking localStorage
  const navigate = useNavigate();

  // On first load, restore user from localStorage if present.
  // TODO:
  useEffect(() => {
    const saved = localStorage.getItem("inventory_auth_user");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved user", e);
        localStorage.removeItem("inventory_auth_user");
      }
    }
    setLoading(false);
  }, []);

  // Persist user to localStorage on change.
  useEffect(() => {
    if (user) {
      localStorage.setItem("inventory_auth_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("inventory_auth_user");
    }
  }, [user]);

  // login function to be called from LoginPage
  async function login(credentials) {
    // credentials: { email, password }
    const result = await fakeLogin(credentials);
    if (result.success) {
      setUser(result.user);
      navigate("/dashboard");
      return { success: true };
    } else {
      return { success: false, message: result.message };
    }
  }

  function logout() {
    fakeLogout();
    setUser(null);
    navigate("/login");
  }

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
