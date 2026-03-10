import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

export default function MedicineList() {
  const [medicines, setMedicines] = useState([]);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [deleteId, setDeleteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchMedicines = async (query = "") => {
    try {
      const res = await api.get("admin/medicines/", {
        params: { search: query },
      });
      setMedicines(res.data);
    } catch (err) {
      setError("Error loading medicines");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchMedicines(query);
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const addMedicine = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setAdding(true);
    try {
      const res = await api.post("admin/medicines/", form);
      setMedicines([...medicines, res.data]);
      setForm({});
      setSuccess("Medicine added successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.detail || "Error adding medicine");
    } finally {
      setAdding(false);
    }
  };

  const handleEdit = (medicine) => {
    setEditingId(medicine.id);
    setEditForm({ name: medicine.name, dosage: medicine.dosage });
  };

  const handleSaveEdit = async () => {
    try {
      await api.put(`admin/medicines/${editingId}/`, editForm);
      setEditingId(null);
      fetchMedicines();
    } catch (err) {
      alert("Error updating medicine");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`admin/medicines/${id}/`);
      setDeleteId(null);
      fetchMedicines();
    } catch (err) {
      alert("Error deleting medicine");
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
          <h1 className="section-title" style={{ marginBottom: "1rem" }}>
            💊 Medicines Management
          </h1>
          <Link
            to="/admin"
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
        <div className="form-container" style={{ maxWidth: "100%" }}>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "var(--text)",
              marginBottom: "2rem",
            }}
          >
            ➕ Add New Medicine
          </h2>
          <form onSubmit={addMedicine}>
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
            {success && (
              <div
                style={{
                  padding: "1.25rem",
                  background: "rgba(34, 197, 94, 0.15)",
                  border: "2px solid rgba(34, 197, 94, 0.5)",
                  borderRadius: "0.75rem",
                  marginBottom: "1.5rem",
                }}
              >
                <p style={{ color: "#86efac", fontWeight: 700 }}>
                  ✅ {success}
                </p>
              </div>
            )}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "1.5rem",
                marginBottom: "1.5rem",
              }}
            >
              <div className="form-input-group">
                <label className="form-label">💊 Medicine Name</label>
                <input
                  type="text"
                  placeholder="e.g., Aspirin"
                  value={form.name || ""}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-input-group">
                <label className="form-label">📊 Dosage</label>
                <input
                  type="text"
                  placeholder="e.g., 500mg"
                  value={form.dosage || ""}
                  onChange={(e) => setForm({ ...form, dosage: e.target.value })}
                  required
                  className="form-input"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={adding}
              className="btn btn-primary"
              style={{ width: "100%" }}
            >
              {adding ? "🔄 Adding..." : "✅ Add Medicine"}
            </button>
          </form>
        </div>

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
                Loading medicines...
              </p>
            </div>
          </div>
        ) : medicines.length === 0 ? (
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
              📋 No medicines found. Add your first medicine above to get
              started.
            </p>
          </div>
        ) : (
          <div>
            <h2 className="section-title" style={{ marginBottom: "1rem" }}>
              📋 Medicines List
            </h2>
            <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
              <input
                type="text"
                placeholder="🔍 Search by name or ID..."
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
            <h2 className="section-title" style={{ marginBottom: "2rem" }}>
              📦 Available Medicines{" "}
              <span style={{ color: "#60a5fa" }}>({medicines.length})</span>
            </h2>
            <div className="list-container">
              {medicines.map((medicine) => (
                <div key={medicine.id} className="item-card">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "1rem",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                        }}
                      >
                        <div
                          style={{
                            width: "64px",
                            height: "64px",
                            background:
                              "linear-gradient(135deg, #22c55e 0%, #14b8a6 50%, #22c55e 100%)",
                            borderRadius: "1rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "1.875rem",
                            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
                            flexShrink: 0,
                          }}
                        >
                          💊
                        </div>
                        <div>
                          <h3
                            style={{
                              fontSize: "1.25rem",
                              fontWeight: 700,
                              color: "var(--text)",
                              marginBottom: "0.75rem",
                            }}
                          >
                            {medicine.name}
                          </h3>
                          <p
                            style={{
                              color: "#4ade80",
                              fontWeight: 600,
                              marginBottom: "0.5rem",
                            }}
                          >
                            📊 {medicine.dosage}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}
                    >
                      <button
                        onClick={() => handleEdit(medicine)}
                        className="btn btn-primary"
                        style={{
                          padding: "0.5rem 1rem",
                          fontSize: "0.875rem",
                          whiteSpace: "nowrap",
                        }}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => setDeleteId(medicine.id)}
                        className="btn btn-primary"
                        style={{
                          padding: "0.5rem 1rem",
                          fontSize: "0.875rem",
                          background: "rgba(239, 68, 68, 0.8)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
              Edit Medicine
            </h2>
            {["name", "dosage"].map((field) => (
              <div key={field} className="form-input-group">
                <label className="form-label">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={editForm[field] || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, [field]: e.target.value })
                  }
                  required
                />
              </div>
            ))}
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
              Delete Medicine?
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
    </div>
  );
}
