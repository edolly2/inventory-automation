import { useState } from "react";
import { Card } from "../../components/layout/Card.jsx";
import FormField from "../../components/layout/FormField.jsx";

const PreferencesSection = () => {
  const [prefs, setPrefs] = useState({
    theme: "dark",
    density: "comfortable",
    timeFormat: "24h",
    defaultView: "dashboard",
    enableHints: true,
    experimentalCharts: false,
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setPrefs((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  return (
    <div className="grid grid-2">
      <Card title="Display" subtitle="How the app looks and feels for you.">
        <div style={{ display: "grid", gap: "0.9rem" }}>
          <label className="form-field">
            <span>Theme</span>
            <select name="theme" value={prefs.theme} onChange={handleChange}>
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="auto">Follow system</option>
            </select>
          </label>

          <label className="form-field">
            <span>Density</span>
            <select
              name="density"
              value={prefs.density}
              onChange={handleChange}
            >
              <option value="comfortable">Comfortable</option>
              <option value="compact">Compact</option>
            </select>
          </label>

          <label className="form-field">
            <span>Time format</span>
            <select
              name="timeFormat"
              value={prefs.timeFormat}
              onChange={handleChange}
            >
              <option value="12h">12-hour</option>
              <option value="24h">24-hour</option>
            </select>
          </label>

          <FormField
            label="Default landing view"
            name="defaultView"
            value={prefs.defaultView}
            onChange={handleChange}
          />
        </div>
      </Card>

      <Card title="Productivity" subtitle="Small accelerators for power users.">
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
              name="enableHints"
              checked={prefs.enableHints}
              onChange={handleChange}
            />
            <div>
              <div style={{ fontWeight: 600 }}>Show inline hints</div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                Short guidance on complex settings and workflows.
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
              name="experimentalCharts"
              checked={prefs.experimentalCharts}
              onChange={handleChange}
            />
            <div>
              <div style={{ fontWeight: 600 }}>Enable experimental charts</div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                Try the new visuals in dashboards and exports.
              </div>
            </div>
          </label>
        </div>
      </Card>
    </div>
  );
};

export default PreferencesSection;
