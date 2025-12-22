export function normalizeProducts(products = []) {
  return (products || []).map((p) => ({
    id: p.id ?? p.sku ?? null,
    name: p.name ?? p.title ?? p.label ?? "",
    sold: Number(p.sold) || 0,
    stock: Number(p.stock) || 0,
    revenue: Number(p.revenue) || 0,
    ...p,
  }));
}

export function prepareProductsForChart(products = []) {
  return normalizeProducts(products).map((p) => ({
    name: p.name || p.id,
    value: p.revenue || p.sold,
  }));
}

export function sortProducts(products = [], criteria = "sold") {
  return [...(products || [])].sort(
    (a, b) => Number(b[criteria] || 0) - Number(a[criteria] || 0)
  );
}
