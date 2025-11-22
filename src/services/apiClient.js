// src/services/apiClient.js
import { clientConfigs } from "../config/clientConfigs.js";

// TODO: Production configure:
// - BASE_URL (from environment variables)
// - auth headers with token
// - error handling and retries

// Fetching dashboard data per client.
export async function fetchDashboardData(clientId /*token*/) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // TODO: Example implementation:
  // const res = await fetch(`${BASE_URL}/clients/${clientId}/dashboard`, {
  //   headers: { Authorization: `Bearer ${token}` },
  // });
  // if (!res.ok) throw new Error("Failed to fetch dashboard data");
  // return res.json();

  // Testing: return mock data, driven by config for that client.
  const config = clientConfigs[clientId];

  if (!config) {
    throw new Error(`No config found for client: ${clientId}`);
  }

  // Return simple object that matches the dashboard components.
  return {
    metrics: {
      totalSkus: config.mockData.totalSkus,
      lowStockCount: config.mockData.lowStockCount,
      openOrders: config.mockData.openOrders,
      fulfillmentRate: config.mockData.fulfillmentRate,
    },
    trends: config.mockData.trends,
    topProducts: config.mockData.topProducts,
    orders: {
      pendingOrders: config.mockData.pendingOrders,
      shippedOrders: config.mockData.shippedOrders,
      delayedOrders: config.mockData.delayedOrders,
      deliveredOrders: config.mockData.deliveredOrders,
    },
  };
}
