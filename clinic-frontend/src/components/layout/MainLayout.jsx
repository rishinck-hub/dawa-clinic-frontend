import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function MainLayout({ children, sidebarLinks = [] }) {
  return (
    <div className="main-layout">
      <Navbar />
      <div className="d-flex">
        <Sidebar links={sidebarLinks} />
        <main style={{ flex: 1 }} className="p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
