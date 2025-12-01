import { KpiCard } from "../../components/ui/KpiCard";
import { Card } from "../../components/layout/Card";

export function TodaySalesWidget({ data }) {
  // placeholder: compute from mockData.trends
  const total = (data.trends || []).reduce((sum, d) => sum + d.value, 0);
  const today = data.trends?.[data.trends.length - 1]?.value ?? 0;

  return (
    <Card title="Today’s Sales">
      <KpiCard
        label="Today"
        value={`$${today.toLocaleString()}`}
        delta="+0%"
        deltaType="neutral"
        secondary={`Last 5 days: $${total.toLocaleString()}`}
      />
    </Card>
  );
}
