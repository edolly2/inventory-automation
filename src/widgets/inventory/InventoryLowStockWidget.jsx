import { Card } from "../../components/layout/Card";
import { DataTable } from "../../components/data/DataTable";

export function InventoryLowStockWidget({ data }) {
  // use topProducts as a stand-in and filter for stock < threshold
  const threshold = 50;
  const rows = (data.topProducts || []).filter((p) => p.stock < threshold);

  const columns = [
    { key: "name", header: "Product" },
    { key: "sku", header: "SKU" },
    { key: "stock", header: "Stock" },
    { key: "sold", header: "Units Sold" },
  ];

  return (
    <Card title="Low-Stock Products">
      <DataTable
        columns={columns}
        data={rows.map((r, idx) => ({ id: r.sku || idx, ...r }))}
        keyField="id"
      />
    </Card>
  );
}
