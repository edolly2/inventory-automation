// src/services/fakeAuthService.js

// clientId ties a user to a tenant.
const FAKE_USERS = [
  {
    id: "u1",
    name: "Alice Manager",
    email: "alice@alpha-shop.com",
    password: "password123",
    clientId: "alpha-shop",
    role: "admin",
  },
  {
    id: "u2",
    name: "Bob Ops",
    email: "bob@beta-warehouse.com",
    password: "password123",
    clientId: "beta-warehouse",
    role: "manager",
  },
];

// Default to hitting the local backend so signup + login work out of the box.
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

// Simulate a login call.
export async function fakeLogin({ email, password }) {
  const url = `${API_BASE.replace(/\/$/, "")}/auth/login`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    // Fall back to in-memory users for offline dev only if network fails
    console.warn("Login via backend failed, using in-memory fallback", err);

    // Simulate network latency.
    await new Promise((resolve) => setTimeout(resolve, 400));

    const user = FAKE_USERS.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      return { success: false, message: "Invalid email or password" };
    }

    // Fake token.
    const token = `fake-token-${user.id}-${Date.now()}`;

    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        clientId: user.clientId,
        role: user.role,
        token,
      },
    };
  }
}

export function fakeLogout() {
  // Production backend, notify the server, clear cookies, etc.
  return true;
}
