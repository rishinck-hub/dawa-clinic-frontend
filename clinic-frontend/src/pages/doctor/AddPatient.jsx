import { useState } from "react";
import api from "../../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function AddPatient() {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("doctor/patients/", form);
      navigate("/doctor/patients");
    } catch (err) {
      setError(err.response?.data?.detail || "Error adding patient");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      label: "Patient Name",
      key: "name",
      type: "text",
      required: true,
      icon: "👤",
    },
    {
      label: "Phone Number",
      key: "phone",
      type: "tel",
      required: true,
      icon: "📞",
    },
    { label: "Age", key: "age", type: "number", icon: "🎂", required: true },
    {
      label: "Address",
      key: "address",
      type: "text",
      icon: "📍",
      required: true,
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
            ➕ Add New Patient
          </h1>
          <Link
            to="/doctor/patients"
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
            ← Back to Patients
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
                <p className="error-message">⚠️ {error}</p>
              </div>
            )}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
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
              <div className="form-input-group">
                <label className="form-label">Gender</label>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "1rem",
                    padding: "0.75rem",
                    background: "rgba(148, 163, 184, 0.1)",
                    border: "1px solid rgba(148, 163, 184, 0.3)",
                    borderRadius: "0.5rem",
                  }}
                >
                  {[
                    { label: "Male", value: "Male" },
                    { label: "Female", value: "Female" },
                  ].map((opt) => (
                    <label
                      key={opt.label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        color: "#e2e8f0",
                        fontSize: "0.875rem",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="radio"
                        name="gender"
                        value={opt.value}
                        checked={(form.gender || "") === opt.value}
                        required
                        onChange={(e) =>
                          setForm({ ...form, gender: e.target.value })
                        }
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="button-group">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? "🔄 Saving..." : "💾 Save Patient"}
              </button>
              <Link to="/doctor/patients" className="btn btn-secondary">
                ✕ Cancel
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

