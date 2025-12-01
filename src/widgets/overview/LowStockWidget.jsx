import { KpiCard } from "../../components/ui/KpiCard";
import { Card } from "../../components/layout/Card";

export function LowStockWidget({ data }) {
  const lowStock = data.lowStockCount ?? 0;
  const totalSkus = data.totalSkus ?? 0;
  const percent =
    totalSkus > 0 ? ((lowStock / totalSkus) * 100).toFixed(1) : "0.0";

  return (
    <Card title="Low-Stock SKUs">
      <KpiCard
        label="Low Stock"
        value={lowStock}
        delta={`${percent}% of catalog`}
        deltaType={lowStock > 0 ? "negative" : "positive"}
        secondary={`Total SKUs: ${totalSkus}`}
      />
    </Card>
  );
}
