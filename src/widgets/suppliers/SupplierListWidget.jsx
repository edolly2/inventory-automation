import { Card } from "../../components/layout/Card";
import { DataTable } from "../../components/data/DataTable";

export function SupplierListWidget() {
  const rows = [
    { id: "SUP-1", name: "ACME Parts", leadTime: "4 days", reliability: "A" },
    { id: "SUP-2", name: "Global Auto", leadTime: "6 days", reliability: "B+" },
  ];

  const columns = [
    { key: "name", header: "Supplier" },
    { key: "leadTime", header: "Lead Time" },
    { key: "reliability", header: "Reliability" },
  ];

  return (
    <Card title="Suppliers">
      <DataTable columns={columns} data={rows} keyField="id" />
    </Card>
  );
}
