// utils/helpers/formatClientName.js
export function formatClientName(clientId) {
  if (!clientId) return "";

  return clientId
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
