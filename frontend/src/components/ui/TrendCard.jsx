// src/components/ui/TrendCard.jsx

const TrendCard = ({ title, data }) => {
  const maxValue = data.reduce(
    (max, point) => (point.value > max ? point.value : max),
    0
  );

  return (
    <div className="card trend-card">
      <div className="card-header">{title}</div>
      <div className="trend-chart">
        {data.map((point) => {
          const height = maxValue ? (point.value / maxValue) * 100 : 0;
          return (
            <div key={point.label} className="trend-bar">
              <div
                className="trend-bar-fill"
                style={{ height: `${height}%` }}
              />
              <div className="trend-bar-label">{point.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrendCard;
