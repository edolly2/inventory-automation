// src/pages/SettingsPage.jsx
import { useAuth } from "../contexts/useAuthHook.jsx";

function SettingsPage() {
  const { user } = useAuth();

  return (
    <div className="page">
      <div className="page-header">
        <h2>Settings</h2>
        <p>Client-specific & user-specific configuration.</p>
      </div>
      <div className="card">
        <p>
          Logged in as <strong>{user?.name}</strong> ({user?.email})
        </p>
        <p>
          Client: <strong>{user?.clientId}</strong>
        </p>
        <p>
          Role: <strong>{user?.role}</strong>
        </p>
        <p className="mt-2">Production configure:</p>
        <ul>
          <li>Which metrics to show by default</li>
          <li>Which stores/locations to track</li>
          <li>Integrations (Shopify, custom API endpoints, etc.)</li>
        </ul>
      </div>
    </div>
  );
}

export default SettingsPage;
