import { Card } from "../../components/layout/Card";
import { DataTable } from "../../components/data/DataTable";

export function TopProductsWidget({ data }) {
  const rows = data.topProducts || [];

  const columns = [
    { key: "name", header: "Product" },
    { key: "sku", header: "SKU" },
    { key: "sold", header: "Units Sold" },
    { key: "stock", header: "Stock" },
  ];

  return (
    <Card title="Top Products">
      <DataTable
        columns={columns}
        data={rows.map((r, idx) => ({ id: r.sku || idx, ...r }))}
        keyField="id"
      />
    </Card>
  );
}
