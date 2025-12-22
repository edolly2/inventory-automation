// src/pages/InventoryPage.jsx

import React from "react";
import { InventoryListWidget } from "../widgets/inventory/InventoryListWidget.jsx";

const InventoryPage = () => {
  return (
    <div className="page">
      <div className="page-header">
        <h2>Inventory</h2>
        <p>Searchable SKU grid and live backend integration.</p>
      </div>
      <div className="card">
        <InventoryListWidget />
      </div>
    </div>
  );
};

export default InventoryPage;
