import { createContext, useEffect, useMemo, useState } from "react";
import { clientConfigs } from "../config/clientConfigs";

const TenantContext = createContext(null);

export function TenantProvider({ children }) {
  const tenantIds = Object.keys(clientConfigs);
  const defaultTenant = tenantIds[0];

  const [currentTenant, setCurrentTenant] = useState(() => {
    return localStorage.getItem("currentTenant") || defaultTenant;
  });

  // optional: per-tenant/page custom widget order (for drag-and-drop)
  const [layoutOverrides, setLayoutOverrides] = useState(() => {
    const raw = localStorage.getItem("layoutOverrides");
    return raw ? JSON.parse(raw) : {};
  });

  useEffect(() => {
    localStorage.setItem("currentTenant", currentTenant);
  }, [currentTenant]);

  useEffect(() => {
    localStorage.setItem("layoutOverrides", JSON.stringify(layoutOverrides));
  }, [layoutOverrides]);

  // Apply theme (simple: set CSS variable on documentElement)
  useEffect(() => {
    const cfg = clientConfigs[currentTenant];
    const color = cfg?.theme?.primaryColor || "#2563eb";
    document.documentElement.style.setProperty("--primary-color", color);
  }, [currentTenant]);

  const value = useMemo(
    () => ({
      currentTenant,
      setCurrentTenant,
      config: clientConfigs,
      tenantIds,
      layoutOverrides,
      setLayoutOverrides,
    }),
    [currentTenant, layoutOverrides, tenantIds]
  );

  return (
    <TenantContext.Provider value={value}>{children}</TenantContext.Provider>
  );
}

// NOTE: `useTenantContext` hook is provided from a separate file to
// avoid react-refresh fast-refresh export restrictions. See
// `src/contexts/useTenantContext.js`.
