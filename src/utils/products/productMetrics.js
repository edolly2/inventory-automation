export function getTopProducts(products = [], n = 5) {
  return [...products]
    .filter((p) => p != null)
    .sort(
      (a, b) =>
        Number(b.sold ?? b.revenue ?? 0) - Number(a.sold ?? a.revenue ?? 0)
    )
    .slice(0, n);
}

export function getBottomProducts(products = [], n = 5) {
  return [...products]
    .filter((p) => p != null)
    .sort(
      (a, b) =>
        Number(a.sold ?? a.revenue ?? 0) - Number(b.sold ?? b.revenue ?? 0)
    )
    .slice(0, n);
}

export function computeSellThroughRate(product = {}) {
  // sell-through = sold /(sold + stock) when available
  const sold = Number(product.sold) || 0;
  const stock = Number(product.stock) || 0;
  const denom = sold + stock;
  return denom ? sold / denom : 0;
}
