export function countLowStock(inventory = [], threshold = 10) {
  if (!Array.isArray(inventory)) return 0;
  return inventory.filter((it) => Number(it.qty) < Number(threshold)).length;
}

export function totalSkus(inventory = []) {
  if (!Array.isArray(inventory)) return 0;
  // assume each item may represent a SKU
  return inventory.length;
}

export function computeStockValue(inventory = []) {
  // sum of qty * costPerUnit when available
  return inventory.reduce((acc, it) => {
    const qty = Number(it.qty) || 0;
    const cost = Number(it.cost) || 0;
    return acc + qty * cost;
  }, 0);
}

export function computeReorderAlerts(inventory = [], threshold = 10) {
  if (!Array.isArray(inventory)) return [];
  return inventory.filter(
    (i) => Number(i.qty) <= Number(i.reorderLevel ?? threshold)
  );
}
