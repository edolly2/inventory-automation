// src/components/charts/ChartContainer.jsx
import { Card } from "../layout/Card";
import styles from "./ChartContainer.module.css";

export const ChartContainer = ({
  title,
  subtitle,
  actions,
  children,
  height = 260,
}) => {
  return (
    <Card
      title={title}
      subtitle={subtitle}
      actions={actions}
      className={styles.card}
    >
      <div className={styles.inner} style={{ height }}>
        {children}
      </div>
    </Card>
  );
};
