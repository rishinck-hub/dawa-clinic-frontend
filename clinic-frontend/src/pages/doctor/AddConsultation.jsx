import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link, useNavigate } from "react-router-dom";

export default function AddConsultation() {
  const [patients, setPatients] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [form, setForm] = useState({ medicines: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [medicinesLoading, setMedicinesLoading] = useState(true);
  const [patientSearch, setPatientSearch] = useState("");
  const [showPatientDropdown, setShowPatientDropdown] = useState(false);
  const [medicineSearches, setMedicineSearches] = useState({});
  const [showMedicineDropdowns, setShowMedicineDropdowns] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setMedicinesLoading(true);
      try {
        const patientsRes = await api.get("doctor/patients/");
        setPatients(patientsRes.data || []);
      } catch (err) {
        console.error("Error fetching patients:", err);
        setError("Failed to load patients. Please refresh the page.");
      }

      try {
        const medicinesRes = await api.get("admin/medicines/");
        setMedicines(medicinesRes.data || []);
      } catch (err) {
        console.error("Error fetching medicines:", err);
        setError("Failed to load medicines. Please refresh the page.");
      } finally {
        setMedicinesLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
      p.phone.includes(patientSearch),
  );

  const getFilteredMedicines = (index) => {
    const searchTerm = medicineSearches[index] || "";
    return medicines.filter(
      (m) =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.id.toString().includes(searchTerm),
    );
  };

  const selectPatient = (patient) => {
    setForm({ ...form, patient: patient.id });
    setPatientSearch(patient.name);
    setShowPatientDropdown(false);
  };

  const selectMedicine = (index, medicine) => {
    const meds = [...form.medicines];
    meds[index].medicine_id = medicine.id;
    meds[index].medicine_name = medicine.name;
    setForm({ ...form, medicines: meds });
    setMedicineSearches({ ...medicineSearches, [index]: medicine.name });
    setShowMedicineDropdowns({ ...showMedicineDropdowns, [index]: false });
  };

  const addMedicine = () => {
    setForm({ ...form, medicines: [...form.medicines, {}] });
  };

  const removeMedicine = (index) => {
    const meds = form.medicines.filter((_, i) => i !== index);
    setForm({ ...form, medicines: meds });
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("doctor/consultations/", form);
      navigate("/doctor/history");
    } catch (err) {
      setError(err.response?.data?.detail || "Error saving consultation");
    } finally {
      setLoading(false);
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
            maxWidth: "768px",
            margin: "0 auto",
            padding: "1.5rem 1rem",
          }}
        >
          <h1 className="section-title" style={{ marginBottom: "1rem" }}>
            📋 New Consultation
          </h1>
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

      <main
        style={{
          maxWidth: "768px",
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

            <div className="form-input-group">
              <label className="form-label">
                👤 Select Patient <span style={{ color: "#fca5a5" }}>*</span>
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  placeholder="🔍 Search patient by name or phone..."
                  value={patientSearch}
                  onChange={(e) => {
                    setPatientSearch(e.target.value);
                    setShowPatientDropdown(true);
                  }}
                  onFocus={() => setShowPatientDropdown(true)}
                  className="form-input"
                  required={!form.patient}
                />
                {showPatientDropdown && patientSearch && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      right: 0,
                      marginTop: "0.25rem",
                      background: "#1e293b",
                      border: "1px solid rgba(148, 163, 184, 0.3)",
                      borderRadius: "0.5rem",
                      zIndex: 50,
                      maxHeight: "200px",
                      overflowY: "auto",
                    }}
                  >
                    {filteredPatients.length > 0 ? (
                      filteredPatients.map((patient) => (
                        <div
                          key={patient.id}
                          onClick={() => selectPatient(patient)}
                          style={{
                            padding: "1rem",
                            cursor: "pointer",
                            borderBottom: "1px solid rgba(148, 163, 184, 0.2)",
                            transition: "all 0.2s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                              "rgba(148, 163, 184, 0.2)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                          }}
                        >
                          <div
                            style={{
                              color: "#e2e8f0",
                              fontWeight: 600,
                              fontSize: "1rem",
                            }}
                          >
                            👤 {patient.name}
                          </div>
                          <div
                            style={{
                              color: "#93c5fd",
                              fontSize: "0.875rem",
                              marginTop: "0.25rem",
                            }}
                          >
                            📱 {patient.phone}
                          </div>
                          {(patient.age || patient.gender) && (
                            <div
                              style={{
                                color: "#cbd5e1",
                                fontSize: "0.75rem",
                                marginTop: "0.25rem",
                              }}
                            >
                              {patient.age ? `Age: ${patient.age}` : ""}
                              {patient.age && patient.gender ? " • " : ""}
                              {patient.gender || ""}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div
                        style={{
                          padding: "1rem",
                          color: "#93c5fd",
                          textAlign: "center",
                        }}
                      >
                        No patients found
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="form-input-group">
              <label className="form-label">📝 Consultation Notes</label>
              <textarea
                placeholder="Enter consultation notes, diagnosis, observations..."
                value={form.notes || ""}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="form-input"
                style={{ minHeight: "120px", resize: "vertical" }}
              />
            </div>

            <div className="form-section">
              <h3>
                💊 Prescribed Medicines{" "}
                {medicines.length === 0 && medicinesLoading && (
                  <span style={{ color: "#93c5fd", fontSize: "0.875rem" }}>
                    Loading...
                  </span>
                )}
              </h3>
              {medicines.length === 0 && !medicinesLoading && (
                <div
                  style={{
                    padding: "1rem",
                    background: "rgba(252, 165, 165, 0.1)",
                    borderRadius: "0.5rem",
                    marginBottom: "1rem",
                  }}
                >
                  <p style={{ color: "#fca5a5", margin: 0 }}>
                    ⚠️ No medicines available. Please add medicines from the
                    admin panel first.
                  </p>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {form.medicines.map((medicine, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "1.5rem",
                      background: medicine.medicine_id
                        ? "rgba(34, 197, 94, 0.15)"
                        : "rgba(255, 255, 255, 0.08)",
                      border: medicine.medicine_id
                        ? "2px solid rgba(34, 197, 94, 0.5)"
                        : "2px solid rgba(34, 197, 94, 0.3)",
                      borderRadius: "0.75rem",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "1rem",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "1.1rem",
                          fontWeight: "bold",
                          color: "rgba(34, 197, 94, 0.7)",
                        }}
                      >
                        💊 Medicine #{i + 1}
                      </div>
                      {medicine.medicine_id && (
                        <span
                          style={{
                            fontSize: "0.75rem",
                            padding: "0.25rem 0.75rem",
                            background: "rgba(34, 197, 94, 0.3)",
                            color: "#86efac",
                            borderRadius: "999px",
                            fontWeight: "bold",
                          }}
                        >
                          ✓ SELECTED
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "1rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <div>
                        <label
                          className="form-label"
                          style={{ fontSize: "0.75rem" }}
                        >
                          💊 Medicine
                        </label>
                        <div style={{ position: "relative" }}>
                          {medicine.medicine_id && (
                            <div
                              style={{
                                padding: "0.75rem",
                                background: "rgba(34, 197, 94, 0.2)",
                                border: "2px solid rgba(34, 197, 94, 0.4)",
                                borderRadius: "0.5rem",
                                marginBottom: "0.5rem",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <div>
                                <span
                                  style={{
                                    color: "#86efac",
                                    fontWeight: "600",
                                  }}
                                >
                                  {medicine.medicine_name}
                                </span>
                                <div
                                  style={{
                                    color: "#93c5fd",
                                    fontSize: "0.75rem",
                                    marginTop: "0.25rem",
                                  }}
                                >
                                  📏{" "}
                                  {(() => {
                                    const med = medicines.find(
                                      (m) => m.id === medicine.medicine_id,
                                    );
                                    return med?.dosage || "N/A";
                                  })()}
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  const meds = [...form.medicines];
                                  meds[i] = {};
                                  setForm({ ...form, medicines: meds });
                                  setMedicineSearches({
                                    ...medicineSearches,
                                    [i]: "",
                                  });
                                }}
                                style={{
                                  background: "rgba(248, 113, 113, 0.2)",
                                  color: "#fca5a5",
                                  border: "none",
                                  borderRadius: "0.25rem",
                                  padding: "0.25rem 0.5rem",
                                  cursor: "pointer",
                                  fontSize: "0.75rem",
                                }}
                              >
                                ✕ Clear
                              </button>
                            </div>
                          )}
                          <input
                            type="text"
                            placeholder="🔍 Search medicine..."
                            value={medicineSearches[i] || ""}
                            onChange={(e) => {
                              setMedicineSearches({
                                ...medicineSearches,
                                [i]: e.target.value,
                              });
                              setShowMedicineDropdowns({
                                ...showMedicineDropdowns,
                                [i]: true,
                              });
                            }}
                            onFocus={() => {
                              setShowMedicineDropdowns({
                                ...showMedicineDropdowns,
                                [i]: true,
                              });
                            }}
                            className="form-input"
                            style={{ fontSize: "0.875rem" }}
                            required={!form.medicines[i]?.medicine_id}
                          />
                          {showMedicineDropdowns[i] &&
                            (medicineSearches[i] || "").length > 0 && (
                              <div
                                style={{
                                  position: "absolute",
                                  top: "100%",
                                  left: 0,
                                  right: 0,
                                  marginTop: "0.25rem",
                                  background: "#1e293b",
                                  border: "1px solid rgba(148, 163, 184, 0.3)",
                                  borderRadius: "0.5rem",
                                  zIndex: 50,
                                  maxHeight: "150px",
                                  overflowY: "auto",
                                }}
                              >
                                {getFilteredMedicines(i).length > 0 ? (
                                  getFilteredMedicines(i).map((med) => (
                                    <div
                                      key={med.id}
                                      onClick={() => selectMedicine(i, med)}
                                      style={{
                                        padding: "0.5rem 1rem",
                                        cursor: "pointer",
                                        borderBottom:
                                          "1px solid rgba(148, 163, 184, 0.2)",
                                        fontSize: "0.875rem",
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.background =
                                          "rgba(148, 163, 184, 0.2)";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.background =
                                          "transparent";
                                      }}
                                    >
                                      <div
                                        style={{
                                          color: "#e2e8f0",
                                          fontWeight: "600",
                                        }}
                                      >
                                        💊 {med.name}
                                      </div>
                                      <div
                                        style={{
                                          color: "#93c5fd",
                                          fontSize: "0.75rem",
                                          marginTop: "0.25rem",
                                          fontWeight: "500",
                                        }}
                                      >
                                        📏 {med.dosage}
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <div
                                    style={{
                                      padding: "0.75rem 1rem",
                                      color: "#93c5fd",
                                      textAlign: "center",
                                      fontSize: "0.875rem",
                                    }}
                                  >
                                    No medicines found
                                  </div>
                                )}
                              </div>
                            )}
                        </div>
                      </div>
                      <div>
                        <label
                          className="form-label"
                          style={{ fontSize: "0.75rem" }}
                        >
                          📋 Instructions
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., 2 tablets twice daily"
                          value={medicine.instructions || ""}
                          onChange={(e) => {
                            const meds = [...form.medicines];
                            meds[i].instructions = e.target.value;
                            setForm({ ...form, medicines: meds });
                          }}
                          className="form-input"
                          style={{ fontSize: "0.875rem" }}
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeMedicine(i)}
                      style={{
                        color: "#fca5a5",
                        fontWeight: 700,
                        fontSize: "0.875rem",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "0.5rem",
                        background: "rgba(252, 165, 165, 0.2)",
                        cursor: "pointer",
                        border: "none",
                      }}
                    >
                      ✕ Remove
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addMedicine}
                className="btn btn-primary"
                style={{ width: "100%", marginTop: "1rem" }}
              >
                ➕ Add Medicine
              </button>
            </div>

            <div className="button-group">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? "🔄 Saving..." : "💾 Save Consultation"}
              </button>
              <Link to="/doctor" className="btn btn-secondary">
                ✕ Cancel
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
