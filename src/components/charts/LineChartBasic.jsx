// src/components/charts/LineChartBasic.jsx
import {
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export const LineChartBasic = ({
  data,
  xKey,
  yKey,
  stroke = "#2563eb",
  showGrid = true,
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        {showGrid && (
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e5e7eb"
          />
        )}
        <XAxis
          dataKey={xKey}
          tickLine={false}
          axisLine={{ stroke: "#e5e7eb" }}
          tickMargin={8}
          style={{ fontSize: "0.7rem", fill: "#6b7280" }}
        />
        <YAxis
          tickLine={false}
          axisLine={{ stroke: "#e5e7eb" }}
          tickMargin={8}
          style={{ fontSize: "0.7rem", fill: "#6b7280" }}
        />
        <Tooltip
          contentStyle={{
            borderRadius: 8,
            borderColor: "#e5e7eb",
            fontSize: "0.75rem",
          }}
        />
        <Line
          type="monotone"
          dataKey={yKey}
          stroke={stroke}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
