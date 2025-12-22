import { Card } from "../../components/layout/Card";
import { KanbanBoard } from "../../components/data/KanbanBoard";

const ORDER_COLUMNS = [
  { id: "Pending", title: "Pending" },
  { id: "Processing", title: "Processing" },
  { id: "Packed", title: "Packed" },
  { id: "Shipped", title: "Shipped" },
  { id: "Delivered", title: "Delivered" },
  { id: "Delayed", title: "Delayed" },
];

export function OrdersKanbanWidget({ data }) {
  const orders = data.orders || [];

  const items = orders.map((o) => ({
    id: o.id,
    status: o.status,
    title: o.id,
    subtitle: o.date,
    meta: [o.status],
  }));

  return (
    <Card title="Fulfillment Workflow">
      <KanbanBoard columns={ORDER_COLUMNS} items={items} />
    </Card>
  );
}
