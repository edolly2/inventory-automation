// src/components/ui/ProgressBar.jsx
import styles from "./ProgressBar.module.css";

export const ProgressBar = ({ value, max = 100, label, tone = "primary" }) => {
  const percent = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={styles.container}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.track}>
        <div
          className={`${styles.fill} ${styles[tone]}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};
