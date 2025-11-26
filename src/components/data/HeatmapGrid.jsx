// src/components/data/HeatmapGrid.jsx
import styles from "./HeatmapGrid.module.css";

export const HeatmapGrid = ({ rows, columns, values, getValue, maxValue }) => {
  // values is a 2D array or flat map; getValue(row, col) -> number
  const localMax =
    typeof maxValue === "number"
      ? maxValue
      : Math.max(
          ...rows.flatMap((r) => columns.map((c) => getValue(r, c) ?? 0))
        );

  const intensity = (v) => (localMax ? v / localMax : 0);

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerRow}>
        <div className={styles.corner} />
        {columns.map((c) => (
          <div key={c.id} className={styles.colHeader}>
            {c.label}
          </div>
        ))}
      </div>
      <div className={styles.body}>
        {rows.map((r) => (
          <div key={r.id} className={styles.row}>
            <div className={styles.rowHeader}>{r.label}</div>
            {columns.map((c) => {
              const v = getValue(r, c) ?? 0;
              const t = intensity(v);
              return (
                <div
                  key={c.id}
                  className={styles.cell}
                  style={{ "--intensity": t }}
                  title={`${r.label} / ${c.label}: ${v}`}
                >
                  {v > 0 && <span className={styles.value}>{v}</span>}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
