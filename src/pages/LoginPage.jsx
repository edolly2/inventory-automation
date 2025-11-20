// src/pages/LoginPage.jsx
import { useState } from "react";
import { useAuth } from "../contexts/useAuthHook.jsx";

const LoginPage = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const result = await login(form);

    if (!result.success) {
      setError(result.message || "Login failed");
    }

    setSubmitting(false);
  }

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h1 className="auth-title">Inventory Automation</h1>
        <p className="auth-subtitle">
          Multi-client dashboard. Log in with a client user.
        </p>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="form-field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
          <label className="form-field">
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>
          <button className="btn btn-primary w-full" disabled={submitting}>
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="auth-hint">
          <p>Demo users:</p>
          <ul>
            <li>alice@alpha-shop.com / password123</li>
            <li>bob@beta-warehouse.com / password123</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
