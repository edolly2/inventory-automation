import { widgetRegistry } from "../../widgets/widgetRegistry";
import { clientConfigs } from "../../config/clientConfigs";

export function WidgetRenderer({ widgetId }) {
  const clientId = localStorage.getItem("activeClient");
  const mockData = clientConfigs[clientId].mockData;
  const Widget = widgetRegistry[widgetId];

  if (!Widget) {
    return <div>Unknown widget: {widgetId}</div>;
  }

  return <Widget data={mockData} />;
}
