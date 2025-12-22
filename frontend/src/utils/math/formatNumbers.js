export function formatCurrency(value) {
  const v = Number(value) || 0;
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(v);
  } catch {
    return `$${v.toFixed(2)}`;
  }
}

export function formatNumber(value) {
  const v = Number(value);
  if (!Number.isFinite(v)) return "0";
  return new Intl.NumberFormat("en-US").format(v);
}
