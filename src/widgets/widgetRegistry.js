import { TodaySalesWidget } from "./overview/TodaySalesWidget";
import { OrdersTodayWidget } from "./overview/OrdersTodayWidget";
import { LowStockWidget } from "./overview/LowStockWidget";

import { RevenueTrendWidget } from "./sales/RevenueTrendWidget";
import { SalesByChannelWidget } from "./sales/SalesByChannelWidget";
import { TopProductsWidget } from "./sales/TopProductsWidget";
import { HourlyHeatmapWidget } from "./sales/HourlyHeatmapWidget";

import { InventorySummaryWidget } from "./inventory/InventorySummaryWidget";
import { InventoryLowStockWidget } from "./inventory/InventoryLowStockWidget";
import { InventoryTopProductsWidget } from "./inventory/InventoryTopProductsWidget";

import { OrdersTableWidget } from "./orders/OrdersTableWidget";
import { OrdersKanbanWidget } from "./orders/OrdersKanbanWidget";

import { SupplierListWidget } from "./suppliers/SupplierListWidget";
import { POListWidget } from "./purchaseOrders/POListWidget";

export const widgetRegistry = {
  "overview.todaySales": TodaySalesWidget,
  "overview.ordersToday": OrdersTodayWidget,
  "overview.lowStock": LowStockWidget,

  "sales.revenueTrend": RevenueTrendWidget,
  "sales.byChannel": SalesByChannelWidget,
  "sales.topProducts": TopProductsWidget,
  "sales.hourlyHeatmap": HourlyHeatmapWidget,

  "inventory.summary": InventorySummaryWidget,
  "inventory.lowStock": InventoryLowStockWidget,
  "inventory.topProducts": InventoryTopProductsWidget,

  "orders.table": OrdersTableWidget,
  "orders.kanban": OrdersKanbanWidget,

  "suppliers.list": SupplierListWidget,

  "po.list": POListWidget,
};
