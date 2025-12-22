import { useState } from "react";
import { Card } from "../../components/layout/Card.jsx";

const APISection = () => {
  const [apiKey, setApiKey] = useState("sk_live_9f8d-****-z12c");
  const [revealed, setRevealed] = useState(false);

  function regenerateKey() {
    const suffix = Math.random().toString(36).slice(-8);
    setApiKey(`sk_live_${suffix}`);
    setRevealed(false);
  }

  return (
    <div className="grid grid-2">
      <Card
        title="Private API key"
        subtitle="Store securely. Rotate if you suspect compromise."
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
            flexWrap: "wrap",
          }}
        >
          <code
            style={{
              padding: "0.65rem 0.9rem",
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-md)",
              minWidth: "240px",
              display: "inline-block",
            }}
          >
            {revealed ? apiKey : `${apiKey.slice(0, 7)}•••••••`}
          </code>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <button
              className="btn"
              type="button"
              onClick={() => setRevealed((v) => !v)}
            >
              {revealed ? "Hide" : "Reveal"}
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={regenerateKey}
            >
              Regenerate
            </button>
          </div>
        </div>
        <p style={{ color: "var(--text-muted)", marginTop: "0.75rem" }}>
          Calls should include this key in the Authorization header as a Bearer
          token.
        </p>
      </Card>

      <Card
        title="Webhook security"
        subtitle="Verify requests from AutoStock Solutions."
      >
        <ul style={{ margin: 0, padding: 0, display: "grid", gap: "0.4rem" }}>
          <li>• Rotate the signing secret every 90 days.</li>
          <li>• Validate the signature header and timestamp.</li>
          <li>
            • Respond within 5 seconds; retries will be attempted on failure.
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default APISection;
