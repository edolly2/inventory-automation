// src/config/clientConfigs.js

// Tenant-specific configuration.
// Each client can see different metrics, trends, or modules.

export const clientConfigs = {
  "alpha-shop": {
    displayName: "Alpha Shop (Shopify)",
    theme: { primaryColor: "#2563eb" },

    // ** Multi-page widget system
    pages: {
      overview: [
        "overview.todaySales",
        "overview.ordersToday",
        "overview.alerts",
        "sales.revenueTrend",
      ],
      sales: [
        "sales.revenueTrend",
        "sales.byChannel",
        "sales.topProducts",
        "sales.hourlyHeatmap",
      ],
      inventory: [
        "inventory.list",
        "inventory.stockHealth",
        "inventory.velocity",
      ],
      orders: ["orders.kanban", "orders.table"],
      suppliers: ["suppliers.list", "suppliers.leadTimeTrend"],
      purchaseOrders: ["po.list", "po.receivedProgress"],
      settings: [],
      account: [],
    },

    // ** Tenant-specific mock data
    mockData: {
      orders: [
        { id: "ORD-1001", status: "Pending", date: "2024-06-10" },
        { id: "ORD-1002", status: "Shipped", date: "2024-06-09" },
        { id: "ORD-1003", status: "Delivered", date: "2024-06-08" },
        { id: "ORD-1004", status: "Delayed", date: "2024-06-07" },
      ],

      topProducts: [
        { name: "Brake Pads A", sku: "BP-100", sold: 52, stock: 120 },
        { name: "Air Filter X", sku: "AF-300", sold: 37, stock: 80 },
        { name: "Oil Filter Z", sku: "OF-900", sold: 29, stock: 40 },
      ],

      totalSkus: 350,
      lowStockCount: 18,
      openOrders: 42,

      get fulfillmentRate() {
        const orders = this.orders ?? [];
        return orders.length
          ? orders.filter((o) => o.status === "Delivered").length /
              orders.length
          : 0;
      },

      trends: [
        { label: "Mon", value: 120 },
        { label: "Tue", value: 140 },
        { label: "Wed", value: 130 },
        { label: "Thu", value: 160 },
        { label: "Fri", value: 180 },
      ],
    },
  },

  // SECOND TENANT
  "beta-warehouse": {
    displayName: "Beta Warehouse (Standalone)",
    theme: { primaryColor: "#16a34a" },

    pages: {
      overview: [
        "overview.todaySales",
        "overview.ordersToday",
        "overview.alerts",
        "inventory.stockHealth",
      ],
      sales: ["sales.revenueTrend", "sales.topProducts"],
      inventory: [
        "inventory.list",
        "inventory.stockHealth",
        "inventory.velocity",
      ],
      orders: ["orders.table"],
      suppliers: ["suppliers.list"],
      purchaseOrders: ["po.list"],
      settings: [],
      account: [],
    },

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
