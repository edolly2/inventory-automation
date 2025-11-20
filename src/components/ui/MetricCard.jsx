// src/components/ui/MetricCard.jsx

// Single numeric KPI (e.g. total SKUs).
const MetricCard = ({ label, value, suffix, accent }) => {
  return (
    <div className="card metric-card">
      <div className="metric-label">{label}</div>
      <div className="metric-value">
        {value}
        {suffix && <span className="metric-suffix">{suffix}</span>}
      </div>
      {accent && <div className="metric-accent">{accent}</div>}
    </div>
  );
};

export default MetricCard;
