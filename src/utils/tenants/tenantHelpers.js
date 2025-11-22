export function getTenantRules(tenantId) {
  return tenantRules[tenantId] || {};
}
