// src/pages/AccountPage.jsx
import { Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/useAuthHook";
import Tabs from "../../components/ui/Tabs.jsx";

const tabs = [
  { label: "Profile", to: "profile" },
  { label: "Security", to: "security" },
  { label: "Preferences", to: "preferences" },
  { label: "Notifications", to: "notifications" },
  { label: "Billing", to: "billing" },
  { label: "Team", to: "team" },
  { label: "API", to: "api" },
  { label: "Audit Log", to: "audit" },
];

const AccountPage = () => {
  const { user } = useAuth();

  return (
    <div className="page">
      <div className="page-header">
        <h1>Account</h1>
        <p>
          Manage your workspace for{" "}
          <strong>{user?.clientId || "tenant"}</strong>
        </p>
      </div>

      <section className="card" style={{ padding: "1.25rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            flexWrap: "wrap",
            marginBottom: "0.75rem",
          }}
        >
          <div>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>
              {user?.email || "User"}
            </div>
            <div style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
              {user?.clientId || "Workspace"}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                padding: "0.35rem 0.65rem",
                borderRadius: "999px",
                background: "var(--accent-soft)",
                color: "var(--accent)",
                fontWeight: 700,
                fontSize: "0.8rem",
              }}
            >
              Admin
            </span>
            <span
              style={{
                padding: "0.35rem 0.65rem",
                borderRadius: "999px",
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-muted)",
                fontSize: "0.8rem",
              }}
            >
              Signed in
            </span>
          </div>
        </div>

        <Tabs tabs={tabs} basePath="/account/" />

        <div style={{ marginTop: "1rem" }}>
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default AccountPage;
