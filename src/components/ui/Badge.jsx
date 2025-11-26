// src/components/ui/Badge.jsx
import styles from "./Badge.module.css";

export const Badge = ({ children, tone = "neutral" }) => {
  return <span className={`${styles.badge} ${styles[tone]}`}>{children}</span>;
};
