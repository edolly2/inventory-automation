import { Card } from "../../components/layout/Card";
import { DataTable } from "../../components/data/DataTable";

export function InventoryTopProductsWidget({ data }) {
  const rows = data.topProducts || [];

  const columns = [
    { key: "name", header: "Product" },
    { key: "sku", header: "SKU" },
    { key: "stock", header: "On Hand" },
    { key: "sold", header: "Last Period Sales" },
  ];

  return (
    <Card title="Key Inventory Items">
      <DataTable
        columns={columns}
        data={rows.map((r, idx) => ({ id: r.sku || idx, ...r }))}
        keyField="id"
      />
    </Card>
  );
}
