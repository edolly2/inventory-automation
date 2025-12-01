import { useState } from "react";
import { Grid } from "../layout/Grid";
import { WidgetRenderer } from "./WidgetRenderer";
import { useTenant } from "../../hooks/useTenant";

export function DraggableWidgetGrid({ pageKey, minWidth = "280px" }) {
  const { getPageWidgets, setPageWidgets } = useTenant();
  const [draggingId, setDraggingId] = useState(null);

  const widgets = getPageWidgets(pageKey);

  function handleDragStart(e, id) {
    setDraggingId(id);
    e.dataTransfer.effectAllowed = "move";
  }

  function handleDragOver(e, targetId) {
    e.preventDefault();
    if (!draggingId || draggingId === targetId) return;

    const currentIndex = widgets.indexOf(draggingId);
    const targetIndex = widgets.indexOf(targetId);
    if (currentIndex === -1 || targetIndex === -1) return;

    const newOrder = [...widgets];
    newOrder.splice(currentIndex, 1);
    newOrder.splice(targetIndex, 0, draggingId);
    setPageWidgets(pageKey, newOrder);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDraggingId(null);
  }

  return (
    <Grid minWidth={minWidth} gap="1.2rem">
      {widgets.map((id) => (
        <div
          key={id}
          draggable
          onDragStart={(e) => handleDragStart(e, id)}
          onDragOver={(e) => handleDragOver(e, id)}
          onDrop={handleDrop}
          style={{ opacity: draggingId === id ? 0.4 : 1 }}
        >
          <WidgetRenderer widgetId={id} />
        </div>
      ))}
    </Grid>
  );
}
