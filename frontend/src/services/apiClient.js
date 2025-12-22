// src/services/apiClient.js
import { clientConfigs } from "../config/clientConfigs.js";

// Use real backend when Vite env var `VITE_API_BASE` is set.
const API_BASE = import.meta.env.VITE_API_BASE || "";

// TODO: Production configure:
// - BASE_URL (from environment variables)
// - auth headers with token
// - error handling and retries

// Fetching dashboard data per client.
export async function fetchDashboardData(clientId /*token*/) {
  // If an API base is configured, call the real backend.
  if (API_BASE) {
    const url = `${API_BASE.replace(/\/$/, "")}/clients/${encodeURIComponent(
      clientId
    )}/dashboard`;
    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to fetch dashboard data: ${res.status} ${text}`);
    }
    return res.json();
  }

  // Otherwise, fall back to the embedded mock driven by clientConfigs.
  // Simulate network delay for parity with real API.
  await new Promise((resolve) => setTimeout(resolve, 300));

  const config = clientConfigs[clientId];
  if (!config) {
    throw new Error(`No config found for client: ${clientId}`);
  }

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

export async function fetchInventoryList(clientId) {
  if (API_BASE) {
    const url = `${API_BASE.replace(/\/$/, "")}/clients/${encodeURIComponent(
      clientId
    )}/inventory`;
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error(`Failed to fetch inventory: ${res.status}`);
    return res.json();
  }

  // Fallback: return empty list or mock if available
  await new Promise((r) => setTimeout(r, 200));
  const config = clientConfigs[clientId];
  return {
    items: (config && config.mockData && config.mockData.inventory) || [],
  };
}

export async function createInventoryItem(clientId, { sku, quantity }) {
  if (API_BASE) {
    const url = `${API_BASE.replace(/\/$/, "")}/clients/${encodeURIComponent(
      clientId
    )}/inventory`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sku, quantity }),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to create inventory item: ${res.status} ${text}`);
    }
    return res.json();
  }

  // Fallback: pretend we created it
  await new Promise((r) => setTimeout(r, 150));
  return { id: `mock-${Date.now()}`, sku, quantity };
}
