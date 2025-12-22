import React, { useEffect, useState } from "react";
import {
  fetchInventoryList,
  createInventoryItem,
} from "../../services/apiClient.js";

export function InventoryListWidget() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sku, setSku] = useState("");
  const [qty, setQty] = useState(0);

  async function load() {
    setLoading(true);
    try {
      const res = await fetchInventoryList("alpha-shop");
      setItems(res.items || []);
    } catch (err) {
      console.error("load inventory failed", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    try {
      const created = await createInventoryItem("alpha-shop", {
        sku,
        quantity: Number(qty),
      });
      setItems((s) => [...s, created]);
      setSku("");
      setQty(0);
    } catch (err) {
      console.error("create inventory failed", err);
      alert("Failed to create inventory item: " + err.message);
    }
  }

  return (
    <div className="inventory-widget card">
      <h3>Inventory (alpha-shop)</h3>
      {loading ? (
        <div>Loading…</div>
      ) : (
        <ul>
          {items.map((it) => (
            <li key={it.id || `${it.sku}-${it.quantity}`}>
              {it.sku} — {it.quantity}
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleCreate} style={{ marginTop: 12 }}>
        <input
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          placeholder="SKU"
        />
        <input
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          placeholder="Quantity"
          type="number"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
