// src/components/charts/DonutChartBasic.jsx
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from "recharts";

const DEFAULT_COLORS = ["#2563eb", "#10b981", "#f97316", "#6366f1", "#ec4899"];

export const DonutChartBasic = ({
  data,
  valueKey,
  nameKey,
  colors = DEFAULT_COLORS,
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey={valueKey}
          nameKey={nameKey}
          innerRadius="55%"
          outerRadius="80%"
          paddingAngle={3}
        >
          {data.map((entry, index) => (
            <Cell key={entry[nameKey]} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            borderRadius: 8,
            borderColor: "#e5e7eb",
            fontSize: "0.75rem",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};
