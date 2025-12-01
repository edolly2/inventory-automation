import { useTenantContext } from "../contexts/useTenantContext";

const useTenant = () => {
  const {
    currentTenant,
    setCurrentTenant,
    config,
    tenantIds,
    layoutOverrides,
    setLayoutOverrides,
  } = useTenantContext();

  const tenantConfig = config[currentTenant];

  function getPageWidgets(pageKey) {
    const base = tenantConfig.pages?.[pageKey] || [];
    const overrideKey = `${currentTenant}:${pageKey}`;
    const override = layoutOverrides[overrideKey];
    return override && override.length ? override : base;
  }

  function setPageWidgets(pageKey, newOrder) {
    const overrideKey = `${currentTenant}:${pageKey}`;
    setLayoutOverrides((prev) => ({
      ...prev,
      [overrideKey]: newOrder,
    }));
  }

  return {
    currentTenant,
    setCurrentTenant,
    tenantIds,
    tenantConfig,
    getPageWidgets,
    setPageWidgets,
    mockData: tenantConfig.mockData,
  };
};
export { useTenant };
