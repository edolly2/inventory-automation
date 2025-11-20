// src/contexts/AuthContext.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fakeLogin, fakeLogout } from "../services/fakeAuthService.js";
import { AuthContext } from "./AuthContext.jsx";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("inventory_auth_user");

    if (saved) {
      queueMicrotask(() => {
        try {
          setUser(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to parse saved user", e);
          localStorage.removeItem("inventory_auth_user");
        }
      });
    }

    // Remove loading after microtask settles
    queueMicrotask(() => {
      setLoading(false);
    });
  }, []);

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
