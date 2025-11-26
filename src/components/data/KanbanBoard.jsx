// src/components/data/KanbanBoard.jsx
import styles from "./KanbanBoard.module.css";

export const KanbanBoard = ({
  columns,
  items,
  getColumnId = (item) => item.status,
}) => {
  const grouped = columns.reduce((acc, col) => {
    acc[col.id] = [];
    return acc;
  }, {});

  items.forEach((item) => {
    const colId = getColumnId(item);
    if (!grouped[colId]) grouped[colId] = [];
    grouped[colId].push(item);
  });

  return (
    <div className={styles.board}>
      {columns.map((col) => (
        <section key={col.id} className={styles.column}>
          <header className={styles.header}>
            <span className={styles.title}>{col.title}</span>
            <span className={styles.count}>{grouped[col.id]?.length ?? 0}</span>
          </header>
          <div className={styles.list}>
            {(grouped[col.id] ?? []).map((item) => (
              <article key={item.id} className={styles.card}>
                <div className={styles.mainLine}>
                  <span className={styles.primary}>{item.title}</span>
                  {item.badge && (
                    <span className={styles.badge}>{item.badge}</span>
                  )}
                </div>
                {item.subtitle && (
                  <p className={styles.subtitle}>{item.subtitle}</p>
                )}
                {item.meta && (
                  <div className={styles.meta}>
                    {item.meta.map((m) => (
                      <span key={m} className={styles.metaChip}>
                        {m}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
