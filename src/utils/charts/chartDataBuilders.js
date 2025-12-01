/**
 * Helpers to transform raw data into simple structures used by the demo charts.
 * These functions are intentionally small and defensive for the example app.
 */
export function buildLineChartData(data = []) {
  // Expect data to be array of { x, y } or { date, value } forms.
  return data.map((d) => {
    if (typeof d === "object") {
      return {
        x: d.x ?? d.date ?? d.label,
        y: d.y ?? d.value ?? d.revenue ?? 0,
      };
    }
    return { x: d, y: 0 };
  });
}

export function buildBarChartData(data = []) {
  // Similar mapping, but preserve keys for bars
  return data.map((d) => ({
    name: d.name ?? d.label ?? d.channel ?? "",
    value: d.value ?? d.revenue ?? 0,
  }));
}

export function buildPieChartData(data = []) {
  // Make sure pie chart data has a label and a numeric value
  return data.map((d) => ({
    name: d.name ?? d.label ?? d.channel ?? "",
    value: Number(d.value ?? d.revenue ?? d.count ?? 0),
  }));
}
