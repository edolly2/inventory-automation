// src/config/clientConfigs.js

// Tenant-specific configuration.
// Each client can see different metrics, trends, or modules.
export const clientConfigs = {
  "alpha-shop": {
    displayName: "Alpha Shop (Shopify)",
    theme: {
      primaryColor: "#2563eb",
    },
    widgets: [
      "inventorySummary",
      "orderFulfillment",
      "topSellingProducts",
      "lowStockAlerts",
    ],
    mockData: {
      totalSkus: 350,
      lowStockCount: 18,
      openOrders: 42,
      fulfillmentRate: 0.97,
      trends: [
        { label: "Mon", value: 120 },
        { label: "Tue", value: 140 },
        { label: "Wed", value: 130 },
        { label: "Thu", value: 160 },
        { label: "Fri", value: 180 },
      ],
      topProducts: [
        { name: "Brake Pads A", sku: "BP-100", sold: 52, stock: 120 },
        { name: "Air Filter X", sku: "AF-300", sold: 37, stock: 80 },
        { name: "Oil Filter Z", sku: "OF-900", sold: 29, stock: 40 },
      ],
    },
  },
  "beta-warehouse": {
    displayName: "Beta Warehouse (Standalone)",
    theme: {
      primaryColor: "#16a34a",
    },
    widgets: ["inventorySummary", "warehouseUtilization", "lowStockAlerts"],
    mockData: {
      totalSkus: 1200,
      lowStockCount: 75,
      openOrders: 10,
      fulfillmentRate: 0.92,
      trends: [
        { label: "Mon", value: 300 },
        { label: "Tue", value: 310 },
        { label: "Wed", value: 295 },
        { label: "Thu", value: 330 },
        { label: "Fri", value: 345 },
      ],
      topProducts: [
        { name: "Pallet Screw Pack", sku: "PS-120", sold: 100, stock: 400 },
        { name: "Warehouse Gloves", sku: "WG-040", sold: 64, stock: 200 },
      ],
    },
  },
};
