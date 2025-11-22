// src/pages/OrdersPage.jsx
import React from "react";
import DataTable from "../components/ui/DataTable";

const OrdersPage = () => {
  return (
    <div className="page">
      <div className="page-header">
        <h2>Orders</h2>
        <p>Future: searchable, filterable SKU grid integrated with backend.</p>
      </div>
      <div className="card">
        {/* <h3 className="card-header">Pending Orders</h3> */}
        {/* <div className="card-nav">
          <ul className="card-nav-list">
            <li>
              <button>Pending Orders</button>
            </li>
            <li>
              <button>Orders in Transit</button>
            </li>
            <li>
              <button>Delivered Orders</button>
            </li>
            <li>
              <button>Delayed Orders</button>
            </li>
          </ul>

        </div> */}
        <DataTable />
      </div>
    </div>
  );
};

export default OrdersPage;
