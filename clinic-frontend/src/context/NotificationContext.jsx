import React, { createContext, useState, useCallback } from "react";

export const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [message, setMessage] = useState(null);

  const showNotification = useCallback((text, type = "info") => {
    setMessage({ text, type });
  }, []);

  const hideNotification = useCallback(() => {
    setMessage(null);
  }, []);

  const value = {
    message,
    showNotification,
    hideNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}
