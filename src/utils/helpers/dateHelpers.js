export function toDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function formatDate(date) {
  const d = date instanceof Date ? date : toDate(date);
  if (!d) return "";
  return d.toLocaleDateString("en-US");
}

export function getDayOfWeek(date) {
  const d = date instanceof Date ? date : toDate(date);
  if (!d) return "";
  return d.toLocaleDateString("en-US", { weekday: "short" });
}
