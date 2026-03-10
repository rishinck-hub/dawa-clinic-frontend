import { Link } from "react-router-dom";
import Logout from "../components/Logout";
import QuickPatientSearch from "../components/QuickPatientSearch";
import DAWALogo from "../components/DAWALogo";

export default function DoctorDashboard() {
  const menuItems = [
    {
      label: "My Patients",
      path: "patients",
      icon: "👥",
      desc: "View and manage patient records",
    },
    {
      label: "New Consultation",
      path: "consult",
      icon: "📋",
      desc: "Create a new patient consultation",
    },
    {
      label: "Consultation History",
      path: "history",
      icon: "📜",
      desc: "Review past consultations",
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
          style={{
            width: "384px",
            height: "384px",
            opacity: "0.1",
            animationDelay: "2s",
          }}
        ></div>
      </div>

      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <DAWALogo size="medium" showName={true} />
            <div className="header-info">
              <h1>Doctor Portal</h1>
              <p>Patient Management & Consultations</p>
            </div>
          </div>
          <Logout />
        </div>
      </header>

      <main className="main-content">
        <div style={{ marginBottom: "3rem" }}>
          <h2 className="section-title">Welcome, Doctor</h2>
          <p className="section-subtitle">
            Manage your patients and clinical records
          </p>
        </div>

        <div className="menu-grid" style={{ marginBottom: "4rem" }}>
          {menuItems.map((item, idx) => (
            <Link
              key={item.path}
              to={item.path}
              className="menu-card"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="menu-icon">{item.icon}</div>
              <h3 className="menu-label">{item.label}</h3>
              <p className="menu-description">{item.desc}</p>
            </Link>
          ))}
        </div>

        {/* Quick Patient Search Section */}
        <div style={{ marginBottom: "4rem" }}>
          <QuickPatientSearch />
        </div>

        <div className="stats-grid">
          {[
            { label: "Patients Today", value: "8", icon: "👤" },
            { label: "Consultations", value: "24", icon: "📋" },
            { label: "Pending Cases", value: "3", icon: "⏳" },
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
