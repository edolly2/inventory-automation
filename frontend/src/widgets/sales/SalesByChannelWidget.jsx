import { ChartContainer } from "../../components/charts/ChartContainer";
import { DonutChartBasic } from "../../components/charts/DonutChartBasic";

export function SalesByChannelWidget({ data }) {
  // dummy split for now
  const base = data.trends || [];
  const total = base.reduce((s, d) => s + d.value, 0);
  const chartData = [
    { channel: "Online", revenue: Math.round(total * 0.6) },
    { channel: "Marketplace", revenue: Math.round(total * 0.3) },
    { channel: "POS", revenue: Math.round(total * 0.1) },
  ];

  return (
    <ChartContainer title="Sales by Channel">
      <DonutChartBasic data={chartData} nameKey="channel" valueKey="revenue" />
    </ChartContainer>
  );
}
