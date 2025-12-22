export function computeFulfillmentRate(orders = []) {
  if (!Array.isArray(orders) || orders.length === 0) return 0;
  const fulfilled = orders.filter(
    (o) => o.status === "Delivered" || o.status === "Fulfilled"
  ).length;
  return fulfilled / orders.length;
}

export function countOpenOrders(orders = []) {
  return orders.filter(
    (o) => !["Delivered", "Cancelled", "Fulfilled"].includes(o.status)
  ).length;
}

export function countDelayedOrders(orders = []) {
  return orders.filter((o) => o.status === "Delayed").length;
}

export function getOrderStatusCounts(orders = []) {
  return orders.reduce((acc, o) => {
    const s = o.status || "unknown";
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});
}

export function getDailyOrderCounts(orders = []) {
  return orders.reduce((acc, o) => {
    const d = o.date ? new Date(o.date).toISOString().slice(0, 10) : "unknown";
    acc[d] = (acc[d] || 0) + 1;
    return acc;
  }, {});
}
