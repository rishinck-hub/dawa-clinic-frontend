import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logout from "../components/Logout";
import DAWALogo from "../components/DAWALogo";
import api from "../services/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total_doctors: 0,
    total_medicines: 0,
    total_patients: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("admin/stats/")
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Error fetching stats:", err))
      .finally(() => setLoading(false));
  }, []);

  const menuItems = [
    {
      label: "View Doctors",
      path: "doctors",
      icon: "👨‍⚕️",
    },
    {
      label: "Add New Doctor",
      path: "add-doctor",
      icon: "➕",
    },
    {
      label: "Manage Medicines",
      path: "medicines",
      icon: "💊",
    },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-background">
        <div
          className="blob blob-blue"
          style={{ width: "384px", height: "384px", opacity: "0.1" }}
        ></div>
        <div
          className="blob blob-green"
          style={{ width: "384px", height: "384px", opacity: "0.1" }}
        ></div>
      </div>

      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <DAWALogo size="medium" showName={true} />
            <div className="header-info">
              <h1>Admin Dashboard</h1>
              <p>Clinic Administration & Configuration</p>
            </div>
          </div>
          <Logout />
        </div>
      </header>

      <main className="main-content">
        <div style={{ marginBottom: "3rem" }}>
          <h2 className="section-title">Welcome, Administrator</h2>
          <p className="section-subtitle">
            Manage doctors, medicines, and clinic operations
          </p>
        </div>

        <div className="menu-grid">
          {menuItems.map((item, idx) => (
            <Link
              key={item.path}
              to={item.path}
              className="menu-card"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="menu-icon">{item.icon}</div>
              <h3 className="menu-label">{item.label}</h3>
              <p className="menu-description">
                Access and manage {item.label.toLowerCase()}
              </p>
            </Link>
          ))}
        </div>

        <div className="stats-grid">
          {[
            {
              label: "Total Doctors",
              value: loading ? "..." : stats.total_doctors,
              icon: "👨‍⚕️",
            },
            {
              label: "Total Medicines",
              value: loading ? "..." : stats.total_medicines,
              icon: "💊",
            },
            {
              label: "Total Patients",
              value: loading ? "..." : stats.total_patients,
              icon: "👥",
            },
          ].map((stat) => (
            <div key={stat.label} className="stat-card">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
