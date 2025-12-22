import { Card } from "../../components/layout/Card.jsx";

const rows = [
  {
    ts: "2024-10-12 14:22",
    actor: "cfo@acme.com",
    action: "Updated billing contact",
    ip: "10.0.0.14",
  },
  {
    ts: "2024-10-11 09:10",
    actor: "ops@acme.com",
    action: "Created API key",
    ip: "10.0.0.18",
  },
  {
    ts: "2024-10-10 20:04",
    actor: "admin@acme.com",
    action: "Added team member",
    ip: "10.0.0.21",
  },
];

const AuditLogSection = () => {
  return (
    <Card
      title="Audit log"
      subtitle="Recent high-signal actions across the workspace."
    >
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>User</th>
              <th>Action</th>
              <th>IP</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${row.ts}-${row.actor}`}>
                <td>{row.ts}</td>
                <td>{row.actor}</td>
                <td>{row.action}</td>
                <td>{row.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default AuditLogSection;
