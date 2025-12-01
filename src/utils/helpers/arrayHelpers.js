export function groupBy(arr = [], prop) {
  if (typeof prop === "function") {
    return arr.reduce((acc, item) => {
      const key = prop(item);
      (acc[key] = acc[key] || []).push(item);
      return acc;
    }, {});
  }

  return arr.reduce((acc, item) => {
    const key = item && item[prop] != null ? item[prop] : "__undefined";
    (acc[key] = acc[key] || []).push(item);
    return acc;
  }, {});
}

export function chunkArray(arr = [], size = 1) {
  const out = [];
  if (size <= 0) return out;
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}
