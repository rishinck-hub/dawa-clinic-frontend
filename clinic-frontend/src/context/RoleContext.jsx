import React, { createContext, useState } from "react";

export const RoleContext = createContext();

export function RoleProvider({ children }) {
  const [role, setRole] = useState(null);

  const value = {
    role,
    setRole,
  };

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}
