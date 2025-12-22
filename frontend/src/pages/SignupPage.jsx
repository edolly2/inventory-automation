import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormField from "../components/layout/FormField.jsx";

export default function SignupPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    adminName: "",
    companyName: "",
    companyAddress: "",
    suEmail: "",
    suPassword: "",
    suRePassword: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validateForm() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.suEmail)) {
      return "Enter a valid email.";
    }

    if (form.suPassword.length < 12) {
      return "Password must be at least 12 characters.";
    }

    if (form.suPassword !== form.suRePassword) {
      return "Passwords do not match.";
    }

    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setError("");

    const validation = validateForm();
    if (validation) {
      setError(validation);
      setSubmitting(false);
      return;
    }

    try {
      const payload = {
        adminName: form.adminName,
        companyName: form.companyName,
        companyAddress: form.companyAddress,
        email: form.suEmail,
        password: form.suPassword,
      };

      const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";
      const signupUrl = `${API_BASE.replace(/\/$/, "")}/api/signup`;

      const res = await fetch(signupUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!data.success) throw new Error();

      navigate("/login?signup=1");
    } catch {
      setError("Signup failed. Please check your details.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h1 className="auth-title">AutoStock Solutions</h1>
        <p className="auth-subtitle">Create your global admin account.</p>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <FormField
            label="Administrator Name"
            name="adminName"
            type="text"
            value={form.adminName}
            onChange={handleChange}
            required
            autoComplete="name"
          />

          <FormField
            label="Company Name"
            name="companyName"
            type="text"
            value={form.companyName}
            onChange={handleChange}
            required
            autoComplete="organization"
          />

          <FormField
            label="Company Address"
            name="companyAddress"
            type="text"
            value={form.companyAddress}
            onChange={handleChange}
            required
            autoComplete="address-line1"
          />

          <FormField
            label="Email"
            name="suEmail"
            type="email"
            value={form.suEmail}
            onChange={handleChange}
            required
            autoComplete="email"
          />

          <FormField
            label="Password"
            name="suPassword"
            type="password"
            value={form.suPassword}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />

          <FormField
            label="Confirm Password"
            name="suRePassword"
            type="password"
            value={form.suRePassword}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />

          <button className="btn btn-primary w-full" disabled={submitting}>
            {submitting ? "Processing..." : "Signup"}
          </button>

          <small>
            <Link to="/login">Already have an account? Login.</Link>
          </small>
        </form>
      </div>
    </div>
  );
}
