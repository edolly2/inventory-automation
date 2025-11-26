// src/components/data/DataTable.jsx
import styles from "./DataTable.module.css";

export const DataTable = ({
  columns,
  data,
  keyField,
  dense = false,
  responsiveStack = true,
}) => {
  return (
    <div
      className={`${styles.wrapper} ${
        responsiveStack ? styles.responsive : ""
      }`}
    >
      <table className={`${styles.table} ${dense ? styles.dense : ""}`}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={{ width: col.width }}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className={styles.empty}>
                No data available
              </td>
            </tr>
          )}

          {data.map((row) => (
            <tr key={row[keyField]}>
              {columns.map((col) => (
                <td key={col.key} data-label={col.header}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
