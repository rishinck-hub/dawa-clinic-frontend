import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [deleteId, setDeleteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [historyPatient, setHistoryPatient] = useState(null);
  const [historyConsultations, setHistoryConsultations] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState("");

  const fetchPatients = async (query = "") => {
    try {
      const res = await api.get("doctor/patients/", {
        params: { search: query },
      });
      setPatients(res.data);
    } catch (err) {
      console.error("Error fetching patients:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchPatients(query);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleEdit = (patient) => {
    setEditingId(patient.id);
    setEditForm({
      name: patient.name,
      phone: patient.phone,
      age: patient.age || "",
      gender: patient.gender || "",
      address: patient.address || "",
    });
  };

  const handleSaveEdit = async () => {
    try {
      await api.put(`doctor/patients/${editingId}/`, editForm);
      setEditingId(null);
      fetchPatients();
    } catch (err) {
      alert("Error updating patient");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`doctor/patients/${id}/`);
      setDeleteId(null);
      fetchPatients();
    } catch (err) {
      alert("Error deleting patient");
    }
  };

  const openHistory = async (patient) => {
    setHistoryPatient(patient);
    setHistoryLoading(true);
    setHistoryError("");
    try {
      const res = await api.get(
        `doctor/patients/${patient.id}/consultations/`
      );
      setHistoryConsultations(res.data || []);
    } catch (err) {
      setHistoryConsultations([]);
      setHistoryError("Failed to load consultation history.");
    } finally {
      setHistoryLoading(false);
    }
  };

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
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "1.5rem 1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <h1 className="section-title" style={{ marginBottom: 0 }}>
              👥 My Patients
            </h1>
            <Link
              to="/doctor/add-patient"
              className="btn btn-primary"
              style={{ padding: "0.75rem 1.5rem", margin: 0, flex: "none" }}
            >
              ➕ Add Patient
            </Link>
          </div>
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
            <input
              type="text"
              placeholder="🔍 Search by name, phone, ID, or PL00 code..."
              value={searchQuery}
              onChange={handleSearch}
              style={{
                flex: 1,
                padding: "0.75rem 1rem",
                background: "rgba(148, 163, 184, 0.1)",
                border: "1px solid rgba(148, 163, 184, 0.3)",
                borderRadius: "0.5rem",
                color: "#e2e8f0",
                fontSize: "0.875rem",
              }}
            />
          </div>
          <Link
            to="/doctor"
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
            ← Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="main-content">
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "384px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                className="loading"
                style={{ width: "64px", height: "64px", margin: "0 auto 1rem" }}
              ></div>
              <p
                style={{
                  color: "#93c5fd",
                  fontSize: "1.125rem",
                  fontWeight: 600,
                }}
              >
                Loading patients...
              </p>
            </div>
          </div>
        ) : patients.length === 0 ? (
          <div
            className="item-card"
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              padding: "4rem",
            }}
          >
            <p
              style={{ color: "#93c5fd", fontSize: "1.25rem", fontWeight: 600 }}
            >
              📋 No patients found. Add a new one to get started.
            </p>
          </div>
        ) : (
          <div className="list-container">
            {patients.map((patient) => (
              <div key={patient.id} className="item-card">
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                  }}
                >
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      background:
                        "linear-gradient(135deg, #3b82f6 0%, #1e40af 50%, #16a34a 100%)",
                      borderRadius: "1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.875rem",
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    👤
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      onClick={() => handleEdit(patient)}
                      className="btn btn-primary"
                      style={{ padding: "0.5rem 1rem", fontSize: "0.875rem" }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => openHistory(patient)}
                      className="btn btn-primary"
                      style={{
                        padding: "0.5rem 1rem",
                        fontSize: "0.875rem",
                        background: "rgba(59, 130, 246, 0.8)",
                      }}
                    >
                      📜 History
                    </button>
                    <button
                      onClick={() => setDeleteId(patient.id)}
                      className="btn btn-primary"
                      style={{
                        padding: "0.5rem 1rem",
                        fontSize: "0.875rem",
                        background: "rgba(239, 68, 68, 0.8)",
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "var(--text)",
                    marginBottom: "0.25rem",
                  }}
                >
                  {patient.name}
                </h3>
                {patient.patient_code && (
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.25rem 0.6rem",
                      borderRadius: "999px",
                      background: "rgba(59, 130, 246, 0.15)",
                      color: "#93c5fd",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.02em",
                      marginBottom: "0.75rem",
                    }}
                  >
                    ID: {patient.patient_code}
                  </div>
                )}

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                    fontSize: "0.875rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.75rem",
                      padding: "0.5rem",
                      borderRadius: "0.5rem",
                      background: "var(--surface-alt)",
                    }}
                  >
                    <span style={{ fontSize: "1rem", marginTop: "0.25rem" }}>
                      📞
                    </span>
                    <div>
                      <p
                        style={{
                          color: "var(--text-muted)",
                          fontSize: "0.75rem",
                          textTransform: "uppercase",
                          fontWeight: 600,
                        }}
                      >
                        Phone
                      </p>
                      <p style={{ color: "var(--text)", fontWeight: 500 }}>
                        {patient.phone}
                      </p>
                    </div>
                  </div>
                  {patient.age && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.75rem",
                        padding: "0.5rem",
                        borderRadius: "0.5rem",
                        background: "var(--surface-alt)",
                      }}
                    >
                      <span style={{ fontSize: "1rem", marginTop: "0.25rem" }}>
                        🎂
                      </span>
                      <div>
                        <p
                          style={{
                            color: "var(--text-muted)",
                            fontSize: "0.75rem",
                            textTransform: "uppercase",
                            fontWeight: 600,
                          }}
                        >
                          Age
                        </p>
                        <p style={{ color: "var(--text)", fontWeight: 500 }}>
                          {patient.age} years
                        </p>
                      </div>
                    </div>
                  )}
                  {patient.gender && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.75rem",
                        padding: "0.5rem",
                        borderRadius: "0.5rem",
                        background: "var(--surface-alt)",
                      }}
                    >
                      <span style={{ fontSize: "1rem", marginTop: "0.25rem" }}>
                        👥
                      </span>
                      <div>
                        <p
                          style={{
                            color: "var(--text-muted)",
                            fontSize: "0.75rem",
                            textTransform: "uppercase",
                            fontWeight: 600,
                          }}
                        >
                          Gender
                        </p>
                        <p style={{ color: "var(--text)", fontWeight: 500 }}>
                          {patient.gender}
                        </p>
                      </div>
                    </div>
                  )}
                  {patient.address && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.75rem",
                        padding: "0.5rem",
                        borderRadius: "0.5rem",
                        background: "var(--surface-alt)",
                      }}
                    >
                      <span style={{ fontSize: "1rem", marginTop: "0.25rem" }}>
                        📍
                      </span>
                      <div>
                        <p
                          style={{
                            color: "var(--text-muted)",
                            fontSize: "0.75rem",
                            textTransform: "uppercase",
                            fontWeight: 600,
                          }}
                        >
                          Address
                        </p>
                        <p style={{ color: "var(--text)", fontWeight: 500 }}>
                          {patient.address}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Edit Modal */}
      {editingId && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
        >
          <div
            style={{
              background: "#0f172a",
              borderRadius: "1rem",
              padding: "2rem",
              maxWidth: "500px",
              width: "90%",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <h2
              style={{
                color: "var(--text)",
                fontSize: "1.5rem",
                fontWeight: 700,
                marginBottom: "1.5rem",
              }}
            >
              Edit Patient
            </h2>
            {[
              { key: "name", label: "Patient Name", type: "text" },
              { key: "phone", label: "Phone Number", type: "tel" },
              { key: "age", label: "Age", type: "number" },
              { key: "address", label: "Address", type: "text" },
            ].map((field) => (
              <div key={field.key} className="form-input-group">
                <label className="form-label">{field.label}</label>
                <input
                  type={field.type}
                  className="form-input"
                  value={editForm[field.key] || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, [field.key]: e.target.value })
                  }
                  required
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
                      name="editGender"
                      value={opt.value}
                      checked={(editForm.gender || "") === opt.value}
                      required
                      onChange={(e) =>
                        setEditForm({ ...editForm, gender: e.target.value })
                      }
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>
            <div className="button-group" style={{ marginTop: "2rem" }}>
              <button onClick={handleSaveEdit} className="btn btn-primary">
                💾 Save
              </button>
              <button
                onClick={() => setEditingId(null)}
                className="btn btn-secondary"
              >
                ✕ Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteId && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
        >
          <div
            style={{
              background: "#0f172a",
              borderRadius: "1rem",
              padding: "2rem",
              maxWidth: "400px",
              width: "90%",
            }}
          >
            <h2
              style={{
                color: "var(--text)",
                fontSize: "1.5rem",
                fontWeight: 700,
                marginBottom: "1rem",
              }}
            >
              Delete Patient?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "2rem" }}>
              This action cannot be undone.
            </p>
            <div className="button-group">
              <button
                onClick={() => handleDelete(deleteId)}
                className="btn btn-primary"
                style={{ background: "rgba(239, 68, 68, 0.8)" }}
              >
                🗑️ Delete
              </button>
              <button
                onClick={() => setDeleteId(null)}
                className="btn btn-secondary"
              >
                ✕ Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* History Modal */}
      {historyPatient && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
        >
          <div
            style={{
              background: "#0f172a",
              borderRadius: "1rem",
              padding: "2rem",
              maxWidth: "700px",
              width: "92%",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <div>
                <h2
                  style={{
                    color: "var(--text)",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    marginBottom: "0.25rem",
                  }}
                >
                  Consultation History
                </h2>
                <p style={{ color: "rgba(255,255,255,0.7)" }}>
                  {historyPatient.name}{" "}
                  {historyPatient.patient_code
                    ? `(${historyPatient.patient_code})`
                    : ""}
                </p>
              </div>
              <button
                onClick={() => setHistoryPatient(null)}
                className="btn btn-secondary"
              >
                ✕ Close
              </button>
            </div>

            {historyLoading ? (
              <p style={{ color: "#93c5fd", fontWeight: 600 }}>
                Loading consultations...
              </p>
            ) : historyError ? (
              <p style={{ color: "#fca5a5", fontWeight: 600 }}>
                {historyError}
              </p>
            ) : historyConsultations.length === 0 ? (
              <p style={{ color: "#93c5fd", fontWeight: 600 }}>
                No past consultations found.
              </p>
            ) : (
              <div style={{ display: "grid", gap: "1rem" }}>
                {historyConsultations.map((c) => (
                  <div
                    key={c.id}
                    style={{
                      padding: "1rem",
                      borderRadius: "0.75rem",
                      background: "rgba(15, 23, 42, 0.6)",
                      border: "1px solid rgba(148, 163, 184, 0.2)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <strong style={{ color: "var(--text)" }}>
                        📅{" "}
                        {new Date(c.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        {new Date(c.date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </strong>
                      <span style={{ color: "#93c5fd", fontSize: "0.8rem" }}>
                        #{c.id}
                      </span>
                    </div>
                    <div style={{ color: "rgba(255,255,255,0.8)" }}>
                      {c.notes || "No notes provided"}
                    </div>
                    {c.medicines && c.medicines.length > 0 && (
                      <div
                        style={{
                          marginTop: "0.75rem",
                          color: "rgba(255,255,255,0.7)",
                          fontSize: "0.85rem",
                        }}
                      >
                        💊 {c.medicines.length} medicine
                        {c.medicines.length !== 1 ? "s" : ""}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

