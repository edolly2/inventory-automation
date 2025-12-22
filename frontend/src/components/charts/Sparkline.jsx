// src/components/charts/Sparkline.jsx
import { ResponsiveContainer, LineChart, Line } from "recharts";

export const Sparkline = ({ data, dataKey, stroke = "#16a34a" }) => {
  return (
    <div style={{ width: "100%", height: 40 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={stroke}
            strokeWidth={1.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
