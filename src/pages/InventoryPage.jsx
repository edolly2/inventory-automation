// src/pages/InventoryPage.jsx

const InventoryPage = () => {
  return (
    <div className="page">
      <div className="page-header">
        <h2>Inventory</h2>
        <p>Future: searchable, filterable SKU grid integrated with backend.</p>
      </div>
      <div className="card">
        <ul>
          <li>List SKUs with pagination</li>
          <li>Allow bulk edits and stock adjustments</li>
          <li>Trigger purchase orders / restocking recommendations</li>
        </ul>
      </div>
    </div>
  );
};

export default InventoryPage;
