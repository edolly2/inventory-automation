// src/components/ui/KpiCard.jsx
import styles from "./KpiCard.module.css";

export const KpiCard = ({
  label,
  value,
  delta,
  deltaType = "neutral", // "positive" | "negative" | "neutral"
  secondary,
  onClick,
}) => {
  return (
    <button
      type="button"
      className={styles.card}
      onClick={onClick}
      // disabled={!onClick}
    >
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
      <div className={styles.footer}>
        {typeof delta !== "undefined" && (
          <span
            className={`${styles.delta} ${
              deltaType === "positive"
                ? styles.positive
                : deltaType === "negative"
                ? styles.negative
                : ""
            }`}
          >
            {delta}
          </span>
        )}
        {secondary && <span className={styles.secondary}>{secondary}</span>}
      </div>
    </button>
  );
};
