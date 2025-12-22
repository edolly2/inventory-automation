// src/components/ui/AlertList.jsx
import styles from "./AlertList.module.css";
import { Badge } from "./Badge";

export const AlertList = ({ alerts = [] }) => {
  if (!alerts.length) return <p className={styles.empty}>No active alerts.</p>;

  return (
    <ul className={styles.list}>
      {alerts.map((alert) => (
        <li key={alert.id} className={styles.item}>
          <div className={styles.main}>
            <span className={styles.title}>{alert.title}</span>
            {alert.severity && (
              <Badge tone={alert.severity}>
                {alert.severityLabel ?? alert.severity}
              </Badge>
            )}
          </div>
          {alert.description && (
            <p className={styles.description}>{alert.description}</p>
          )}
          {alert.meta && (
            <div className={styles.meta}>
              {alert.meta.map((chip) => (
                <span key={chip} className={styles.chip}>
                  {chip}
                </span>
              ))}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};
