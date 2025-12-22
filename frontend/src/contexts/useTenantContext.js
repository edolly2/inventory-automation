import { useContext } from "react";
import { TenantContext } from "./tenantContextObject";

export function useTenantContext() {
  const ctx = useContext(TenantContext);
  if (!ctx)
    throw new Error("useTenantContext must be used inside TenantProvider");
  return ctx;
}
