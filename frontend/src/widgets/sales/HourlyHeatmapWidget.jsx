import { Card } from "../../components/layout/Card";
import { HeatmapGrid } from "../../components/data/HeatmapGrid";

// just mock a simple day x time grid
const hours = [
  { id: "9", label: "09:00" },
  { id: "12", label: "12:00" },
  { id: "15", label: "15:00" },
  { id: "18", label: "18:00" },
];

export function HourlyHeatmapWidget({ data }) {
  const rows = data.trends?.map((d) => ({ id: d.label, label: d.label })) || [];

  function getValue(row, col) {
    // just fake something based on index
    const base = data.trends?.find((t) => t.label === row.id)?.value ?? 0;
    const multiplier = parseInt(col.id, 10) / 24;
    return Math.round(base * multiplier * 0.4);
  }

  return (
    <Card title="Hourly Sales Heatmap" subtitle="Approximate activity">
      <HeatmapGrid
        rows={rows}
        columns={hours}
        values={null}
        getValue={getValue}
      />
    </Card>
  );
}
