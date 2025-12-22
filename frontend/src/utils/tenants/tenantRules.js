import { AUTO_ORDER } from "../inventory/stockRules";

export const tenantRules = {
  "alpha-shop": {
    lowStockThreshold: 8,
    treatShippedAsFulfilled: false,
    AUTO_ORDER: true,
  },
  "beta-warehouse": {
    lowStockThreshold: 20,
    treatShippedAsFulfilled: true,
    AUTO_ORDER: false,
  },
};
