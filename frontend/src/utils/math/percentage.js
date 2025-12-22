export function percent(numerator, denominator) {
  const num = Number(numerator) || 0;
  const den = Number(denominator) || 0;
  if (!den) return 0;
  return (num / den) * 100;
}
