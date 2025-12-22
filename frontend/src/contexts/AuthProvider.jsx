// src/contexts/AuthContext.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fakeLogin, fakeLogout } from "../services/fakeAuthService.js";
import { AuthContext } from "./AuthContext.jsx";

export function AuthProvider({ children }) {
  // Lazily initialize user from localStorage so we don't call setState inside an effect
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("inventory_auth_user");
    if (!saved) return null;
    try {
      return JSON.parse(saved);
    } catch {
      // If parsing fails remove bad data and continue with null
      localStorage.removeItem("inventory_auth_user");
      return null;
    }
  });

  // Use a simple loading flag — lazy init removes the need for initial loading
  const loading = false;
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      localStorage.setItem("inventory_auth_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("inventory_auth_user");
    }
  }, [user]);

  /**
   * Login function
   */
  async function login(credentials) {
    const result = await fakeLogin(credentials);

    if (result.success) {
      setUser(result.user);
      navigate("/dashboard");
      return { success: true };
    }
    return { success: false, message: result.message };
  }

  /**
   * Logout function
   */
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
