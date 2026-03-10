import React, { useState, useEffect } from "react";

export default function Toast({ show, message, type = "info", onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  const alertClass = `alert alert-${
    type === "error" ? "danger" : type
  } alert-dismissible fade show`;

  return (
    <div
      className={alertClass}
      role="alert"
      style={{ position: "fixed", top: "20px", right: "20px", zIndex: 9999 }}
    >
      {message}
      <button type="button" className="btn-close" onClick={onClose}></button>
    </div>
  );
}
