// src/pages/LoginPage.jsx
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useAuth } from "../contexts/useAuthHook.jsx";
import FormField from "../components/layout/FormField.jsx";

export default function LoginPage() {
  const { login } = useAuth();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const signupSuccess = params.get("signup") === "1";

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError("");

    try {
      const result = await login(form);
      if (!result.success) throw new Error();
    } catch {
      setError("Login failed. Please check your details.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h1 className="auth-title">Inventory Automation</h1>
        <p className="auth-subtitle">
          Multi-client dashboard. Login with your user.
        </p>

        {signupSuccess && (
          <div className="alert alert-success">
            Account created successfully. Please login.
          </div>
        )}

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <FormField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />

          <FormField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />

          <button className="btn btn-primary w-full" disabled={submitting}>
            {submitting ? "Logging in..." : "Login"}
          </button>

          <small>
            <Link to="/signup">Don't have an account? Signup.</Link>
          </small>

          <div className="auth-hint">
            <p>Demo users:</p>
            <ul>
              <li>alice@alpha-shop.com / password123</li>
              <li>bob@beta-warehouse.com / password123</li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
}
