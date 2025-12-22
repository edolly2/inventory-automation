import { useState } from "react";
import { Card } from "../../components/layout/Card.jsx";

const NotificationsSection = () => {
  const [channels, setChannels] = useState({
    email: true,
    sms: false,
    push: true,
  });

  const [alerts, setAlerts] = useState({
    lowStock: true,
    newOrders: true,
    failedPayments: true,
    weeklyDigest: false,
  });

  function handleChannelChange(e) {
    const { name, checked } = e.target;
    setChannels((prev) => ({ ...prev, [name]: checked }));
  }

  function handleAlertChange(e) {
    const { name, checked } = e.target;
    setAlerts((prev) => ({ ...prev, [name]: checked }));
  }

  return (
    <div className="grid grid-2">
      <Card
        title="Notification channels"
        subtitle="Choose where alerts arrive."
      >
        <div style={{ display: "grid", gap: "0.75rem" }}>
          {[
            { key: "email", label: "Email", desc: "Best for detailed alerts" },
            { key: "sms", label: "SMS", desc: "For on-call incidents" },
            { key: "push", label: "In-app", desc: "Lightweight banners" },
          ].map((channel) => (
            <label
              key={channel.key}
              className="form-field"
              style={{
                flexDirection: "row",
                gap: "0.75rem",
                alignItems: "center",
              }}
            >
              <input
                type="checkbox"
                name={channel.key}
                checked={channels[channel.key]}
                onChange={handleChannelChange}
              />
              <div>
                <div style={{ fontWeight: 600 }}>{channel.label}</div>
                <div style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                  {channel.desc}
                </div>
              </div>
            </label>
          ))}
        </div>
      </Card>

      <Card title="Alert types" subtitle="Control which events notify you.">
        <div style={{ display: "grid", gap: "0.75rem" }}>
          {[
            {
              key: "lowStock",
              label: "Low stock",
              desc: "When inventory drops below thresholds.",
            },
            {
              key: "newOrders",
              label: "New orders",
              desc: "New order created or paid.",
            },
            {
              key: "failedPayments",
              label: "Failed payments",
              desc: "Billing errors that need attention.",
            },
            {
              key: "weeklyDigest",
              label: "Weekly digest",
              desc: "Summary every Monday.",
            },
          ].map((alert) => (
            <label
              key={alert.key}
              className="form-field"
              style={{
                flexDirection: "row",
                gap: "0.75rem",
                alignItems: "center",
              }}
            >
              <input
                type="checkbox"
                name={alert.key}
                checked={alerts[alert.key]}
                onChange={handleAlertChange}
              />
              <div>
                <div style={{ fontWeight: 600 }}>{alert.label}</div>
                <div style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                  {alert.desc}
                </div>
              </div>
            </label>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default NotificationsSection;
