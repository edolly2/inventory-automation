// src/components/layout/Topbar.jsx
import { useAuth } from "../../contexts/useAuthHook.jsx";
import { clientConfigs } from "../../config/clientConfigs.js";

// Topbar -> user name -> client name -> logout button.
const Topbar = () => {
  const { user, logout } = useAuth();
  const clientConfig = user ? clientConfigs[user.clientId] : null;

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1 className="topbar-title">
          {clientConfig ? clientConfig.displayName : "Dashboard"}
        </h1>
      </div>
      <div className="topbar-right">
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
