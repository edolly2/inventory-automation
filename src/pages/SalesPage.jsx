// src/pages/SalesPage.jsx
import { Grid } from "../components/layout/Grid";
import { KpiCard } from "../components/ui/KpiCard";
import { ChartContainer } from "../components/charts/ChartContainer";
import { LineChartBasic } from "../components/charts/LineChartBasic";
import { BarChartBasic } from "../components/charts/BarChartBasic";
import { DonutChartBasic } from "../components/charts/DonutChartBasic";
import { DataTable } from "../components/data/DataTable";
import { WidgetRenderer } from "../components/widgets/WidgetRenderer";
import { clientConfigs } from "../config/clientConfigs.js";
import { DraggableWidgetGrid } from "../components/widgets/DraggableWidgetGrid.jsx";

const tenant = import.meta.env.VITE_TENANT || "default";

const salesTrend = [
  { date: "Mon", revenue: 1200 },
  { date: "Tue", revenue: 1800 },
  { date: "Wed", revenue: 1600 },
  { date: "Thu", revenue: 2200 },
  { date: "Fri", revenue: 2400 },
];

// const kpiSparkline = [
//   { t: 1, v: 800 },
//   { t: 2, v: 900 },
//   { t: 3, v: 1000 },
//   { t: 4, v: 950 },
// ];

// Defensive lookup: tenant may be missing from configs (e.g. local env unset)
const clientConfig =
  clientConfigs[tenant] || Object.values(clientConfigs)[0] || {};

const widgets = (clientConfig.pages && clientConfig.pages.sales) || [];

const SalesPage = () => {
  return (
    <div className="page">
      <Grid minWidth="200px">
        <KpiCard
          label="Today’s Sales"
          value="$7,400"
          delta="+12.4%"
          deltaType="positive"
          secondary="vs. yesterday"
        />
        <KpiCard
          label="Orders"
          value="128"
          delta="-3.2%"
          deltaType="negative"
          secondary="vs. 7d avg"
        />
        <KpiCard
          label="Avg. Order Value"
          value="$57.80"
          delta="+4.1%"
          deltaType="positive"
        />
        <KpiCard
          label="Refund Rate"
          value="1.3%"
          delta="-0.2%"
          deltaType="positive"
        />
      </Grid>

      <Grid minWidth="260px" gap="1.2rem">
        <ChartContainer title="Revenue (Last 7 Days)">
          <LineChartBasic data={salesTrend} xKey="date" yKey="revenue" />
        </ChartContainer>

        {/* <ChartContainer title="Sales by Channel">
          <DonutChartBasic
            data={salesByChannel}
            valueKey="revenue"
            nameKey="channel"
          />
        </ChartContainer> */}
      </Grid>

      {/* <Grid minWidth="300px" gap="1.2rem">
        {widgets.map((id) => (
          <WidgetRenderer key={id} widgetId={id} />
        ))}
      </Grid> */}

      {/* <ChartContainer title="Top Products">
        <DataTable
          columns={[
            { key: "name", header: "Product" },
            { key: "revenue", header: "Revenue", render: (v) => `$${v}` },
            { key: "units", header: "Units Sold" },
          ]}
          data={topProducts}
          keyField="id"
        />
      </ChartContainer> */}
      <DraggableWidgetGrid pageKey="sales" minWidth="300px" />
    </div>
  );
};

export default SalesPage;
