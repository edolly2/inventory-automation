import { Card } from "../../components/layout/Card";
import { Grid } from "../../components/layout/Grid";
import { KpiCard } from "../../components/ui/KpiCard";

export function InventorySummaryWidget({ data }) {
  const totalSkus = data.totalSkus ?? 0;
  const lowStock = data.lowStockCount ?? 0;
  const openOrders = data.openOrders ?? 0;
  const fulfillment = data.fulfillmentRate ?? 0;

  return (
    <Card title="Inventory Summary">
      <Grid minWidth="160px" gap="0.75rem">
        <KpiCard label="Total SKUs" value={totalSkus} />
        <KpiCard label="Low Stock" value={lowStock} />
        <KpiCard label="Open Orders" value={openOrders} />
        <KpiCard
          label="Fulfillment Rate"
          value={`${(fulfillment * 100).toFixed(1)}%`}
        />
      </Grid>
    </Card>
  );
}
