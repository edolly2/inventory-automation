// src/components/layout/Grid.jsx
import styles from "./Grid.module.css";

export const Grid = ({
  columns = "auto-fit",
  minWidth = "240px",
  gap = "1rem",
  children,
}) => {
  const style = {
    "--grid-columns": columns,
    "--grid-min-width": minWidth,
    "--grid-gap": gap,
  };
  return (
    <div className={styles.grid} style={style}>
      {children}
    </div>
  );
};
