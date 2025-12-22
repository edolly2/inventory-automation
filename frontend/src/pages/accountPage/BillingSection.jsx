import { Card } from "../../components/layout/Card.jsx";

const invoices = [
  { id: "INV-2041", period: "Oct 2024", amount: "$420.00", status: "Paid" },
  { id: "INV-2040", period: "Sep 2024", amount: "$420.00", status: "Paid" },
  { id: "INV-2039", period: "Aug 2024", amount: "$395.00", status: "Paid" },
];

const BillingSection = () => {
  return (
    <div className="grid grid-2">
      <Card
        title="Current plan"
        subtitle="Update seats and limits for your workspace."
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>Growth</div>
            <div style={{ color: "var(--text-muted)", marginTop: 4 }}>
              25 seats · 200k API calls / mo
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontWeight: 700 }}>$420 / mo</div>
            <div style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
              Billed monthly
            </div>
          </div>
        </div>
        <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
          <button className="btn btn-primary" type="button">
            Manage plan
          </button>
          <button className="btn" type="button">
            Update seats
          </button>
        </div>
      </Card>

      <Card title="Payment method" subtitle="Card on file for subscription.">
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              width: 42,
              height: 28,
              borderRadius: 6,
              background: "linear-gradient(135deg, #2563eb, #38bdf8)",
            }}
            aria-hidden
          />
          <div>
            <div style={{ fontWeight: 700 }}>Visa •••• 4242</div>
            <div style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
              Expires 08/27 · Billing contact: finance@acme.com
            </div>
          </div>
        </div>
        <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.5rem" }}>
          <button className="btn" type="button">
            Update card
          </button>
          <button className="btn" type="button">
            Add backup method
          </button>
        </div>
      </Card>

      <Card
        title="Invoices"
        subtitle="Download receipts for your records."
        className="grid-span-2"
      >
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Period</th>
                <th>Amount</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id}>
                  <td>{inv.id}</td>
                  <td>{inv.period}</td>
                  <td>{inv.amount}</td>
                  <td>{inv.status}</td>
                  <td>
                    <button className="btn" type="button">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default BillingSection;
