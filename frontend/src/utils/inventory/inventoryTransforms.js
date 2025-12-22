export function hydrateSKU(data = {}) {
  // Ensure minimal SKU fields exist.
  return {
    id: data.id ?? data.sku ?? `sku-${Math.random().toString(36).slice(2, 8)}`,
    sku: data.sku ?? data.id ?? "",
    label: data.label ?? data.name ?? data.title ?? "",
    qty: Number(data.qty) || 0,
    cost: Number(data.cost) || 0,
    ...data,
  };
}

export function formatInventoryRow(row = {}) {
  const r = hydrateSKU(row);
  return {
    id: r.id,
    sku: r.sku,
    name: r.label || r.name || r.title,
    qty: Number(r.qty) || 0,
    cost: Number(r.cost) || 0,
    location: r.location || null,
  };
}
