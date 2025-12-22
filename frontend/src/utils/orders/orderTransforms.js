export function normalizeOrder(order = {}) {
  return {
    id: order.id ?? order.orderId ?? null,
    date: order.date ?? order.createdAt ?? null,
    status: order.status ?? "Unknown",
    items: Array.isArray(order.items)
      ? order.items
      : order.items
      ? [order.items]
      : [],
    total: Number(order.total) || 0,
    customer: order.customer ?? order.customerName ?? null,
    ...order,
  };
}

export function prepareOrderForChart(order = {}) {
  // Turn a normalized order into a small object suitable for charting
  const o = normalizeOrder(order);
  return {
    date: o.date ? new Date(o.date).toISOString().slice(0, 10) : "unknown",
    value: o.total || 0,
  };
}
