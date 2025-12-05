import { createContext } from "react";

// Keep only the context creation in this small module. This avoids
// react-refresh's restriction about exporting both components and values
// from the same file.
export const TenantContext = createContext(null);

export default TenantContext;
