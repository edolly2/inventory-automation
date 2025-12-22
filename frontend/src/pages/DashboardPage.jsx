// src/pages/DashboardPage.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/useAuthHook.jsx";
import { clientConfigs } from "../config/clientConfigs.js";
import { fetchDashboardData } from "../services/apiClient.js";
import MetricCard from "../components/ui/MetricCard.jsx";
import TrendCard from "../components/ui/TrendCard.jsx";
import DataTable from "../components/ui/DataTable.jsx";

const DashboardPage = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "error"

  const clientId = user?.clientId;
  const clientConfig = clientId ? clientConfigs[clientId] : null;

  useEffect(() => {
    // When the component mounts or client changes -> fetch dashboard data.
    async function load() {
      if (!clientId) return;
      setStatus("loading");
      try {
        const result = await fetchDashboardData(clientId, user.token);
        setData(result);
        setStatus("idle");
      } catch (e) {
        console.error(e);
        setStatus("error");
      }
    }
    load();
  }, [clientId, user]);

  if (!clientConfig) {
    return (
      <div>
        <h2>No client configuration</h2>
        <p>
          The logged-in user is not linked to a known client. Check your
          configuration.
        </p>
      </div>
    );
  }

  if (status === "loading" || !data) {
    return (
      <div className="centered">
        <div className="spinner" />
        <p>Loading {clientConfig.displayName} dashboard...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="alert alert-error">
        Failed to load dashboard data. Check the console for details.
      </div>
    );
  }

  const { metrics = {}, trends = [], topProducts = [] /*orders*/ } = data || {};

  // Some client configs don't expose a top-level `widgets` array —
  // fall back to the page definition for the dashboard overview, or an empty list.
  const widgetsList =
    clientConfig.widgets ?? clientConfig.pages?.overview ?? [];

  return (
    <div className="page">
      <div className="page-header">
        <h2>Dashboard</h2>
        <p>
          Client: <strong>{clientConfig.displayName}</strong>
        </p>
      </div>

      {/* Metric cards (config-driven) */}
      <section className="grid grid-4">
        {widgetsList.includes("inventorySummary") && (
          <>
            <MetricCard label="Total SKUs" value={metrics.totalSkus} />
            <MetricCard label="Low Stock Items" value={metrics.lowStockCount} />
            <MetricCard label="Open Orders" value={metrics.openOrders} />
            <MetricCard
              label="Fulfillment Rate"
              value={(metrics.fulfillmentRate * 100).toFixed(1)}
              suffix="%"
            />
          </>
        )}

        {/* Different widget for beta-warehouse */}
        {widgetsList.includes("warehouseUtilization") && (
          <MetricCard
            label="Warehouse Utilization"
            value="78"
            suffix="%"
            accent="Based on current bin occupancy"
          />
        )}

        {widgetsList.includes("orderFulfillment") &&
          !widgetsList.includes("inventorySummary") && (
            <MetricCard
              label="Fulfillment Rate"
              value={(metrics.fulfillmentRate * 100).toFixed(1)}
              suffix="%"
            />
          )}
      </section>

      {/* Trend chart */}
      {trends && trends.length > 0 && (
        <section className="grid grid-1">
          <TrendCard title="Orders per Day (last 5 days)" data={trends} />
        </section>
      )}

      {/* Top products table (only for some clients) */}
      {widgetsList.includes("topSellingProducts") && topProducts && (
        <section className="grid grid-1">
          <DataTable
            title="Top Selling Products"
            columns={[
              { header: "Product", accessor: "name" },
              { header: "SKU", accessor: "sku" },
              { header: "Sold (period)", accessor: "sold" },
              { header: "Current Stock", accessor: "stock" },
            ]}
            rows={topProducts}
          />
        </section>
      )}

      {/* Low stock alerts later */}
    </div>
  );
};

export default DashboardPage;
