import { Card } from "../../components/layout/Card";
import { DataTable } from "../../components/data/DataTable";

export function POListWidget() {
  const rows = [
    {
      id: "PO-1001",
      supplier: "ACME Parts",
      status: "Open",
      eta: "2024-06-20",
    },
    {
      id: "PO-1002",
      supplier: "Global Auto",
      status: "Received",
      eta: "2024-06-10",
    },
  ];

  const columns = [
    { key: "id", header: "PO #" },
    { key: "supplier", header: "Supplier" },
    { key: "status", header: "Status" },
    { key: "eta", header: "ETA" },
  ];

  return (
    <Card title="Purchase Orders">
      <DataTable columns={columns} data={rows} keyField="id" />
    </Card>
  );
}
