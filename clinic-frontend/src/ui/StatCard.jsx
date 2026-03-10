import React from "react";

export default function StatCard({ title, value, icon, color = "primary" }) {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="d-flex align-items-center">
          <div
            className={`bg-${color} text-white rounded p-3 me-3`}
            style={{
              width: "60px",
              height: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon && <i className={`${icon} fs-5`}></i>}
          </div>
          <div>
            <small className="text-muted">{title}</small>
            <h5 className="mb-0">{value}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
