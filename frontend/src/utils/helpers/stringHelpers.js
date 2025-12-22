export function capitalize(str = "") {
  if (!str) return "";
  return String(str).charAt(0).toUpperCase() + String(str).slice(1);
}

export function toId(str = "") {
  if (!str) return "";
  return String(str)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
