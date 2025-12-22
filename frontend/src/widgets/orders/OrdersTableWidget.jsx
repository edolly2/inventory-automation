import { Card } from "../../components/layout/Card";
import { DataTable } from "../../components/data/DataTable";
import { Badge } from "../../components/ui/Badge";

function statusTone(status) {
  const s = (status || "").toLowerCase();
  if (["delivered", "shipped"].includes(s)) return "success";
  if (["pending", "processing", "packed"].includes(s)) return "warning";
  if (["delayed", "canceled"].includes(s)) return "danger";
  return "neutral";
}

export function OrdersTableWidget({ data }) {
  const rows = data.orders || [];

  const columns = [
    { key: "id", header: "Order ID" },
    {
      key: "status",
      header: "Status",
      render: (v) => <Badge tone={statusTone(v)}>{v}</Badge>,
    },
    { key: "date", header: "Date" },
  ];

  return (
    <Card title="Orders">
      <DataTable
        columns={columns}
        data={rows.map((r, idx) => ({ rowId: r.id || idx, ...r }))}
        keyField="rowId"
      />
    </Card>
  );
}
