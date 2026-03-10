import React from "react";

export default function Alert({
  type = "info",
  message,
  dismissible = true,
  onClose,
}) {
  const alertClass = `alert alert-${type === "error" ? "danger" : type}${
    dismissible ? " alert-dismissible fade show" : ""
  }`;

  return (
    <div className={alertClass} role="alert">
      {message}
      {dismissible && (
        <button type="button" className="btn-close" onClick={onClose}></button>
      )}
    </div>
  );
}
