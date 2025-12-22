// src/components/charts/BarChartBasic.jsx
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export const BarChartBasic = ({
  data,
  xKey,
  yKey,
  fill = "#2563eb",
  showGrid = true,
  layout = "vertical", // "vertical" | "horizontal"
}) => {
  const isVertical = layout === "vertical";

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        layout={isVertical ? "horizontal" : "vertical"}
        margin={{ top: 4, right: 16, left: 0, bottom: 4 }}
      >
        {showGrid && (
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={isVertical}
            vertical={!isVertical}
            stroke="#e5e7eb"
          />
        )}

        {isVertical ? (
          <>
            <XAxis
              dataKey={xKey}
              tickLine={false}
              axisLine={{ stroke: "#e5e7eb" }}
              tickMargin={6}
              style={{ fontSize: "0.7rem", fill: "#6b7280" }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ stroke: "#e5e7eb" }}
              tickMargin={8}
              style={{ fontSize: "0.7rem", fill: "#6b7280" }}
            />
          </>
        ) : (
          <>
            <XAxis
              type="number"
              tickLine={false}
              axisLine={{ stroke: "#e5e7eb" }}
              tickMargin={6}
              style={{ fontSize: "0.7rem", fill: "#6b7280" }}
            />
            <YAxis
              type="category"
              dataKey={xKey}
              width={90}
              tickLine={false}
              axisLine={{ stroke: "#e5e7eb" }}
              style={{ fontSize: "0.7rem", fill: "#6b7280" }}
            />
          </>
        )}

        <Tooltip
          contentStyle={{
            borderRadius: 8,
            borderColor: "#e5e7eb",
            fontSize: "0.75rem",
          }}
        />
        <Bar dataKey={yKey} fill={fill} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
