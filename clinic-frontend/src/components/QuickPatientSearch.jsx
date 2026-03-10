import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function QuickPatientSearch() {
  const [search, setSearch] = useState("");
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientHistory, setPatientHistory] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearch(query);

    if (query.length < 2) {
      setPatients([]);
      return;
    }

    setLoadingSearch(true);
    try {
      const res = await api.get("doctor/patients/", {
        params: { search: query },
      });
      setPatients(res.data || []);
    } catch (err) {
      console.error("Error searching patients:", err);
    } finally {
      setLoadingSearch(false);
    }
  };

  const viewPatientHistory = async (patient) => {
    setSelectedPatient(patient);
    setLoadingHistory(true);
    try {
      const res = await api.get(
        `doctor/consultations/history/?search=${patient.name}`,
      );
      setPatientHistory(res.data || []);
    } catch (err) {
      console.error("Error fetching history:", err);
      setPatientHistory([]);
    } finally {
      setLoadingHistory(false);
    }
  };

  const startNewConsultation = (patient) => {
    navigate("/doctor/add-consultation", {
      state: { preselectedPatient: patient },
    });
  };

  return (
    <div
      style={{
        padding: "1.5rem",
        background: "rgba(255, 255, 255, 0.05)",
        border: "2px solid rgba(59, 130, 246, 0.2)",
        borderRadius: "1rem",
      }}
    >
      <h3
        style={{
          fontSize: "1.2rem",
          fontWeight: "bold",
          color: "#e2e8f0",
          marginBottom: "1rem",
          margin: "0 0 1rem 0",
        }}
      >
        🔍 Quick Patient Lookup
      </h3>

      <div style={{ position: "relative", marginBottom: "1.5rem" }}>
        <input
          type="text"
          placeholder="Search patient by name or phone..."
          value={search}
          onChange={handleSearch}
          className="form-input"
          style={{
            width: "100%",
          }}
        />
        {loadingSearch && (
          <div
            style={{
              position: "absolute",
              right: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#93c5fd",
            }}
          >
            🔄
          </div>
        )}

        {/* Search Results Dropdown */}
        {patients.length > 0 && search.length > 1 && !selectedPatient && (
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
              maxHeight: "250px",
              overflowY: "auto",
            }}
          >
            {patients.map((patient) => (
              <div
                key={patient.id}
                onClick={() => viewPatientHistory(patient)}
                style={{
                  padding: "1rem",
                  cursor: "pointer",
                  borderBottom: "1px solid rgba(148, 163, 184, 0.2)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(148, 163, 184, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <div
                  style={{
                    color: "#e2e8f0",
                    fontWeight: "600",
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
            ))}
          </div>
        )}
      </div>

      {/* Selected Patient Info */}
      {selectedPatient && (
        <div
          style={{
            padding: "1rem",
            background: "rgba(34, 197, 94, 0.15)",
            border: "2px solid rgba(34, 197, 94, 0.3)",
            borderRadius: "0.75rem",
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h4
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  color: "#86efac",
                  margin: "0 0 0.5rem 0",
                }}
              >
                ✓ {selectedPatient.name}
              </h4>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.7)",
                  margin: "0 0 0.25rem 0",
                }}
              >
                📱 {selectedPatient.phone}
              </p>
              {(selectedPatient.age || selectedPatient.gender) && (
                <p style={{ color: "rgba(255, 255, 255, 0.7)", margin: "0" }}>
                  {selectedPatient.age ? `Age: ${selectedPatient.age}` : ""}
                  {selectedPatient.age && selectedPatient.gender ? " • " : ""}
                  {selectedPatient.gender || ""}
                </p>
              )}
            </div>
            <button
              onClick={() => {
                setSelectedPatient(null);
                setSearch("");
                setPatientHistory([]);
              }}
              style={{
                padding: "0.5rem 1rem",
                background: "rgba(248, 113, 113, 0.2)",
                color: "#fca5a5",
                border: "none",
                borderRadius: "0.5rem",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              ✕ Clear
            </button>
          </div>
        </div>
      )}

      {/* Recent History */}
      {selectedPatient && (
        <div>
          <h4
            style={{
              fontSize: "1rem",
              fontWeight: "bold",
              color: "rgba(59, 130, 246, 0.7)",
              marginBottom: "1rem",
              margin: "0 0 1rem 0",
            }}
          >
            📜 Recent Consultations ({patientHistory.length})
          </h4>

          {loadingHistory ? (
            <div style={{ textAlign: "center", padding: "1rem" }}>
              <div className="loading"></div>
            </div>
          ) : patientHistory.length > 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {patientHistory.slice(0, 3).map((consultation) => (
                <div
                  key={consultation.id}
                  style={{
                    padding: "0.75rem",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "1rem",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          color: "#93c5fd",
                          fontSize: "0.875rem",
                          margin: "0 0 0.25rem 0",
                        }}
                      >
                        📅 {new Date(consultation.date).toLocaleDateString()} at{" "}
                        {new Date(consultation.date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      {consultation.medicines &&
                        consultation.medicines.length > 0 && (
                          <p
                            style={{
                              color: "rgba(255, 255, 255, 0.6)",
                              fontSize: "0.8rem",
                              margin: "0",
                            }}
                          >
                            💊 {consultation.medicines.length} medicine
                            {consultation.medicines.length !== 1 ? "s" : ""}
                          </p>
                        )}
                    </div>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        padding: "0.25rem 0.5rem",
                        background: "rgba(34, 197, 94, 0.2)",
                        color: "#86efac",
                        borderRadius: "0.25rem",
                      }}
                    >
                      ✓ Done
                    </span>
                  </div>
                  {consultation.notes && (
                    <p
                      style={{
                        color: "rgba(255, 255, 255, 0.5)",
                        fontSize: "0.75rem",
                        marginTop: "0.5rem",
                        marginBottom: "0",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      "{consultation.notes}"
                    </p>
                  )}
                </div>
              ))}
              {patientHistory.length > 3 && (
                <p
                  style={{
                    color: "rgba(59, 130, 246, 0.7)",
                    fontSize: "0.875rem",
                    margin: "0.5rem 0 0 0",
                    fontStyle: "italic",
                  }}
                >
                  +{patientHistory.length - 3} more consultation
                  {patientHistory.length - 3 !== 1 ? "s" : ""}
                </p>
              )}
            </div>
          ) : (
            <p style={{ color: "rgba(255, 255, 255, 0.5)", margin: "0" }}>
              No previous consultations found
            </p>
          )}

          <button
            onClick={() => startNewConsultation(selectedPatient)}
            style={{
              width: "100%",
              marginTop: "1rem",
              padding: "0.75rem 1rem",
              background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
              color: "white",
              border: "none",
              borderRadius: "0.5rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 10px 20px rgba(59, 130, 246, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }}
          >
            ➕ New Consultation for {selectedPatient.name}
          </button>
        </div>
      )}
    </div>
  );
}
