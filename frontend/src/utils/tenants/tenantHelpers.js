import { tenantRules } from "./tenantRules";

export function getTenantRules(tenantId) {
  return tenantRules[tenantId] || {};
}
