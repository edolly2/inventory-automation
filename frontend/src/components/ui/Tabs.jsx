import { NavLink } from "react-router-dom";
import styles from "./Tabs.module.css";

const Tabs = ({ tabs, basePath = "", className = "" }) => {
  const buildHref = (to) => {
    if (!to) return basePath;
    return to.startsWith("/") ? to : `${basePath}${to}`;
  };

  return (
    <div className={`${styles.tabs} ${className}`}>
      <div className={styles.list}>
        {tabs.map((tab) => {
          const target = buildHref(tab.to);
          return (
            <NavLink
              key={tab.to || tab.label}
              to={target}
              end={tab.exact}
              className={({ isActive }) =>
                `${styles.tab} ${isActive ? styles.active : ""}`
              }
            >
              <span className={styles.label}>{tab.label}</span>
              {tab.badge && <span className={styles.badge}>{tab.badge}</span>}
              {tab.meta && <span className={styles.meta}>{tab.meta}</span>}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
