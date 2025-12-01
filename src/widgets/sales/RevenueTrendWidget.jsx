import { ChartContainer } from "../../components/charts/ChartContainer";
import { LineChartBasic } from "../../components/charts/LineChartBasic";

export function RevenueTrendWidget({ data }) {
  const chartData =
    data.trends?.map((t) => ({ label: t.label, value: t.value })) || [];

  return (
    <ChartContainer title="Revenue Trend" subtitle="Recent performance">
      <LineChartBasic data={chartData} xKey="label" yKey="value" />
    </ChartContainer>
  );
}
