export function ordersToTrendData(orders = []) {
  // Group orders by day and return simple trend data: [{ label: 'YYYY-MM-DD', value: count }]
  const map = orders.reduce((acc, o) => {
    const d = o.date ? new Date(o.date).toISOString().slice(0, 10) : "unknown";
    acc[d] = (acc[d] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(map)
    .sort()
    .map((k) => ({ label: k, value: map[k] }));
}

export function inventoryTrend(inventory = []) {
  // Return time-series of total inventory counts if items include a `history` array of {date, qty}
  const aggregated = {};
  inventory.forEach((item) => {
    const history = item.history || [];
    history.forEach((h) => {
      const d = h.date
        ? new Date(h.date).toISOString().slice(0, 10)
        : "unknown";
      aggregated[d] = (aggregated[d] || 0) + (Number(h.qty) || 0);
    });
  });
  return Object.keys(aggregated)
    .sort()
    .map((d) => ({ label: d, value: aggregated[d] }));
}

export function salesTrend(products = []) {
  // Aggregate revenue by date if products have sales records
  const agg = {};
  products.forEach((p) => {
    const sales = p.sales || [];
    sales.forEach((s) => {
      const d = s.date
        ? new Date(s.date).toISOString().slice(0, 10)
        : "unknown";
      agg[d] = (agg[d] || 0) + (Number(s.revenue) || 0);
    });
  });

  return Object.keys(agg)
    .sort()
    .map((d) => ({ label: d, value: agg[d] }));
}
