import { useMemo, useState } from "react";
import { Card } from "../../components/layout/Card.jsx";
import FormField from "../../components/layout/FormField.jsx";

const SecuritySection = () => {
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const sessions = useMemo(
    () => [
      {
        device: "Chrome on macOS",
        location: "Omaha, NE",
        ip: "10.0.0.14",
        lastActive: "Just now",
      },
      {
        device: "Safari on iOS",
        location: "Omaha, NE",
        ip: "10.0.0.22",
        lastActive: "2 hours ago",
      },
    ],
    []
  );

  function handlePasswordChange(e) {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  }

  function handlePasswordSubmit(e) {
    e.preventDefault();
    // TODO: wire to backend
  }

  return (
    <div className="grid grid-2">
      <Card
        title="Change password"
        subtitle="Use 12+ characters with a mix of symbols."
      >
        <form
          onSubmit={handlePasswordSubmit}
          style={{ display: "grid", gap: "0.85rem" }}
        >
          <FormField
            label="Current password"
            type="password"
            name="currentPassword"
            value={passwords.currentPassword}
            onChange={handlePasswordChange}
            autoComplete="current-password"
          />
          <FormField
            label="New password"
            type="password"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handlePasswordChange}
            autoComplete="new-password"
          />
          <FormField
            label="Confirm new password"
            type="password"
            name="confirmPassword"
            value={passwords.confirmPassword}
            onChange={handlePasswordChange}
            autoComplete="new-password"
          />
          <button className="btn btn-primary" type="submit">
            Update password
          </button>
        </form>
      </Card>

      <Card
        title="Login protection"
        subtitle="Keep accounts locked down across devices."
      >
        <div style={{ display: "grid", gap: "0.75rem" }}>
          <label
            className="form-field"
            style={{
              flexDirection: "row",
              gap: "0.75rem",
              alignItems: "center",
            }}
          >
            <input
              type="checkbox"
              checked={mfaEnabled}
              onChange={(e) => setMfaEnabled(e.target.checked)}
            />
            <div>
              <div style={{ fontWeight: 600 }}>Require MFA on login</div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                Enforce OTP for all admins and managers.
              </div>
            </div>
          </label>

          <label
            className="form-field"
            style={{
              flexDirection: "row",
              gap: "0.75rem",
              alignItems: "center",
            }}
          >
            <input
              type="checkbox"
              checked={loginAlerts}
              onChange={(e) => setLoginAlerts(e.target.checked)}
            />
            <div>
              <div style={{ fontWeight: 600 }}>Send login alerts</div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                Email when logins come from a new device or country.
              </div>
            </div>
          </label>
        </div>
      </Card>

      <Card
        title="Active sessions"
        subtitle="Devices currently signed in to your account."
      >
        <div style={{ display: "grid", gap: "0.75rem" }}>
          {sessions.map((session) => (
            <div
              key={`${session.device}-${session.ip}`}
              style={{
                padding: "0.75rem",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-md)",
                background: "var(--bg-elevated)",
              }}
            >
              <div style={{ fontWeight: 600 }}>{session.device}</div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                {session.location} · {session.ip} · {session.lastActive}
              </div>
            </div>
          ))}
          <button className="btn" type="button">
            Sign out of all sessions
          </button>
        </div>
      </Card>
    </div>
  );
};

export default SecuritySection;
