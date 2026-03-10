import { useState } from "react";
import api from "../../services/api";
import { useNavigate, Link } from "react-router-dom";
import useNotification from "../../hooks/useNotification";

export default function AddDoctor() {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await api.post("admin/doctors/", form);
      if (response.status === 201) {
        showNotification("Doctor created successfully.", "success");
        navigate("/admin");
      }
    } catch (err) {
      console.error("Error creating doctor:", err);
      const data = err.response?.data;
      let errorMessage =
        data?.detail ||
        data?.username?.[0] ||
        data?.password?.[0] ||
        (Array.isArray(data?.non_field_errors) ? data.non_field_errors[0] : "") ||
        (typeof data === "string" ? data : "") ||
        Object.values(data || {})?.[0]?.[0] ||
        "Error creating doctor. Please check all fields and try again.";
      if (!errorMessage || !String(errorMessage).trim()) {
        errorMessage = "Error creating doctor. Please check all fields and try again.";
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      label: "Full Name",
      key: "name",
      type: "text",
      required: true,
      icon: "👤",
    },
    {
      label: "Specialization",
      key: "specialization",
      type: "text",
      required: true,
      icon: "🏥",
    },
    {
      label: "Phone Number",
      key: "phone",
      type: "tel",
      required: true,
      icon: "📞",
    },
    {
      label: "Email Address",
      key: "email",
      type: "email",
      required: true,
      icon: "📧",
    },
    {
      label: "Username",
      key: "username",
      type: "text",
      required: true,
      icon: "🔑",
    },
    {
      label: "Password",
      key: "password",
      type: "password",
      required: true,
      icon: "🔐",
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
        <div
          style={{
            maxWidth: "672px",
            margin: "0 auto",
            padding: "1.5rem 1rem",
          }}
        >
          <h1 className="section-title" style={{ marginBottom: "1rem" }}>
            ➕ Add New Doctor
          </h1>
          <Link
            to="/admin/doctors"
            style={{
              color: "#93c5fd",
              fontSize: "0.875rem",
              fontWeight: 600,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            ← Back to Doctors
          </Link>
        </div>
      </header>

      <main
        style={{
          maxWidth: "672px",
          margin: "0 auto",
          padding: "3rem 1rem",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div className="form-container">
          <form onSubmit={submit}>
            {error && (
              <div
                style={{
                  padding: "1.25rem",
                  background: "rgba(252, 165, 165, 0.15)",
                  border: "2px solid rgba(252, 165, 165, 0.5)",
                  borderRadius: "0.75rem",
                  marginBottom: "1.5rem",
                }}
              >
                <p className="error-message">
                  ⚠️ {String(error).trim() || "Error creating doctor. Please check all fields and try again."}
                </p>
              </div>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.5rem",
                marginBottom: "1.5rem",
              }}
            >
              {fields.map((field) => (
                <div key={field.key} className="form-input-group">
                  <label className="form-label">
                    {field.icon} {field.label}
                    {field.required && (
                      <span style={{ color: "#fca5a5", marginLeft: "0.25rem" }}>
                        *
                      </span>
                    )}
                  </label>
                  <input
                    type={field.type}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    value={form[field.key] || ""}
                    onChange={(e) =>
                      setForm({ ...form, [field.key]: e.target.value })
                    }
                    required={field.required}
                    className="form-input"
                  />
                </div>
              ))}
            </div>

            <div className="button-group">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? "🔄 Creating..." : "✅ Create Doctor"}
              </button>
              <Link to="/admin/doctors" className="btn btn-secondary">
                ✕ Cancel
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
