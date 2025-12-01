// src/components/layout/Topbar.jsx
import { useAuth } from "../../contexts/useAuthHook.jsx";
import { clientConfigs } from "../../config/clientConfigs.js";
import { useEffect, useState } from "react";

const Topbar = () => {
  const { user, logout } = useAuth();

  // -----------------------------
  // ⭐ Tenant switching state
  // -----------------------------
  const [activeClient, setActiveClient] = useState(() => {
    return (
      localStorage.getItem("activeClient") ||
      (user ? user.clientId : Object.keys(clientConfigs)[0])
    );
  });

  // persist tenant selection
  useEffect(() => {
    localStorage.setItem("activeClient", activeClient);
  }, [activeClient]);

  // the config of the selected client
  const clientConfig = clientConfigs[activeClient];

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1 className="topbar-title">
          {clientConfig ? clientConfig.displayName : "Dashboard"}
        </h1>
      </div>

      <div className="topbar-right">
        {/* ⭐ Tenant Switcher */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginRight: "1rem",
          }}
        >
          <span className="topbar-user">Client:</span>

          <select
            value={activeClient}
            onChange={(e) => setActiveClient(e.target.value)}
            style={{
              background: "var(--bg-card)",
              color: "var(--text-main)",
              borderRadius: "8px",
              padding: "0.35rem 0.5rem",
              border: "1px solid var(--border-subtle)",
              outline: "none",
              fontSize: "0.85rem",
            }}
          >
            {Object.keys(clientConfigs).map((id) => (
              <option key={id} value={id}>
                {clientConfigs[id].displayName || id}
              </option>
            ))}
          </select>
        </div>

        {/* Existing User UI (untouched) */}
        {user && (
          <>
            <span className="topbar-user">
              {user.name} &bull; {user.role}
            </span>

            <button className="btn btn-outline" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Topbar;
