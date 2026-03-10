import React from "react";

export default function AuthLayout({ children }) {
  return (
    <div
      className="main-layout d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", backgroundColor: "#f7f9fc" }}
    >
      <div style={{ width: "100%", maxWidth: "400px" }}>{children}</div>
    </div>
  );
}
