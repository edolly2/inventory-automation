export function average(values) {
  if (!Array.isArray(values) || values.length === 0) return 0;
  const nums = values.filter(
    (v) => typeof v === "number" && Number.isFinite(v)
  );
  if (nums.length === 0) return 0;
  const sum = nums.reduce((a, b) => a + b, 0);
  return sum / nums.length;
}

export function weightedAverage(values, weights) {
  if (!Array.isArray(values) || values.length === 0) return 0;
  if (!Array.isArray(weights) || weights.length !== values.length)
    return average(values);
  let totalWeight = 0;
  let weightedSum = 0;
  for (let i = 0; i < values.length; i++) {
    const v = Number(values[i]) || 0;
    const w = Number(weights[i]) || 0;
    weightedSum += v * w;
    totalWeight += w;
  }
  return totalWeight ? weightedSum / totalWeight : 0;
}
