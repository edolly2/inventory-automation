import { KpiCard } from "../../components/ui/KpiCard";
import { Card } from "../../components/layout/Card";

export function OrdersTodayWidget({ data }) {
  const openOrders = data.openOrders ?? (data.orders?.length || 0);

  return (
    <Card title="Open Orders">
      <KpiCard
        label="Open Orders"
        value={openOrders}
        delta=""
        deltaType="neutral"
        secondary="Awaiting fulfillment"
      />
    </Card>
  );
}
