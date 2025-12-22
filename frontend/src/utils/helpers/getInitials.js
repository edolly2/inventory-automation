export const getInitials = (name) => {
  const parts = name
    .trim()
    .toLowerCase()
    .split(/[\s-]+/)
    .filter(Boolean);

  if (parts.length !== 2) return "";

  return parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
};
