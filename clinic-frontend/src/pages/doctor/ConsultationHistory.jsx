import { useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import { generateConsultationPDF } from "../../utils/pdfExport";

export default function ConsultationHistory() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("date-desc");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");
  const [expandedConsultation, setExpandedConsultation] = useState(null);

  const fetchHistory = async (e) => {
    e?.preventDefault();
    setLoading(true);
    try {
      const res = await api.get(
        `doctor/consultations/history/?search=${search}`,
      );
      setResults(res.data);
    } catch (err) {
      console.error("Error fetching history:", err);
    } finally {
      setLoading(false);
    }
  };

  const getSortedAndFilteredResults = () => {
    let filtered = [...results];

    // Date filter
    if (filterDateFrom || filterDateTo) {
      filtered = filtered.filter((c) => {
        const consultationDate = new Date(c.date);
        if (filterDateFrom && consultationDate < new Date(filterDateFrom))
          return false;
        if (filterDateTo) {
          const toDate = new Date(filterDateTo);
          toDate.setHours(23, 59, 59, 999);
          if (consultationDate > toDate) return false;
        }
        return true;
      });
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return new Date(b.date) - new Date(a.date);
        case "date-asc":
          return new Date(a.date) - new Date(b.date);
        case "patient-asc":
          return a.patient_name.localeCompare(b.patient_name);
        case "patient-desc":
          return b.patient_name.localeCompare(a.patient_name);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const exportSinglePDF = async (consultation) => {
    try {
      const result = await generateConsultationPDF(consultation);
      if (!result.success) {
        alert(`Failed to export PDF: ${result.error}`);
      }
    } catch (error) {
      console.error("Error exporting PDF:", error);
      alert("Failed to export PDF");
    }
  };

  const exportPDF = async () => {
    alert("Exporting multiple consultations. Please use individual exports.");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-background">
        <div className="blob blob-blue"></div>
        <div className="blob blob-green"></div>
      </div>

      <header className="dashboard-header">
        <div>
          <h1 className="section-title">📜 Consultation History</h1>
          <Link
            to="/doctor"
            style={{
              color: "rgba(59, 130, 246, 0.7)",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginTop: "0.5rem",
            }}
          >
            ← Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="main-content">
        {/* Search & Filter Section */}
        <div className="form-container" style={{ marginBottom: "2rem" }}>
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: "bold",
              color: "#e2e8f0",
              marginBottom: "1.5rem",
            }}
          >
            🔍 Search & Filter
          </h3>
          <form
            onSubmit={fetchHistory}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <input
                type="text"
                placeholder="Search by patient name or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-input"
                style={{ flex: "1", minWidth: "200px" }}
              />
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? "🔄 Searching..." : "🔍 Search"}
              </button>
            </div>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: "150px" }}>
                <label className="form-label">📅 Date From</label>
                <input
                  type="date"
                  value={filterDateFrom}
                  onChange={(e) => setFilterDateFrom(e.target.value)}
                  className="form-input"
                  style={{ fontSize: "0.9rem" }}
                />
              </div>
              <div style={{ flex: 1, minWidth: "150px" }}>
                <label className="form-label">📅 Date To</label>
                <input
                  type="date"
                  value={filterDateTo}
                  onChange={(e) => setFilterDateTo(e.target.value)}
                  className="form-input"
                  style={{ fontSize: "0.9rem" }}
                />
              </div>
              <div style={{ flex: 1, minWidth: "150px" }}>
                <label className="form-label">↕️ Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="form-input"
                  style={{ fontSize: "0.9rem" }}
                >
                  <option value="date-desc">📅 Recent First</option>
                  <option value="date-asc">📅 Oldest First</option>
                  <option value="patient-asc">👤 Patient (A-Z)</option>
                  <option value="patient-desc">👤 Patient (Z-A)</option>
                </select>
              </div>
            </div>
          </form>
        </div>

        {/* Results Summary */}
        {results.length > 0 && !loading && (
          <div
            style={{
              padding: "1rem",
              background: "rgba(34, 197, 94, 0.1)",
              border: "2px solid rgba(34, 197, 94, 0.3)",
              borderRadius: "0.75rem",
              marginBottom: "2rem",
            }}
          >
            <p style={{ color: "#86efac", fontWeight: "600", margin: "0" }}>
              ✓ Found {results.length} consultation
              {results.length !== 1 ? "s" : ""} - Showing{" "}
              {getSortedAndFilteredResults().length} after filters
            </p>
          </div>
        )}

        {/* Empty State */}
        {getSortedAndFilteredResults().length === 0 && !loading && (
          <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
            <p
              style={{
                color: "rgba(59, 130, 246, 0.7)",
                fontSize: "1.1rem",
                fontWeight: "500",
              }}
            >
              {results.length === 0
                ? "🔎 No consultations found. Search above to get started."
                : "⚠️ No consultations match your filters."}
            </p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <div className="loading"></div>
          </div>
        )}

        {/* Consultation Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {getSortedAndFilteredResults().map((consultation, idx) => (
            <div
              key={consultation.id}
              id={`consultation-${consultation.id}`}
              style={{
                padding: "2rem",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "1rem",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onClick={() =>
                setExpandedConsultation(
                  expandedConsultation === consultation.id
                    ? null
                    : consultation.id,
                )
              }
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.background = "var(--surface-alt)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.background = "var(--surface)";
              }}
            >
              {/* Header */}
              <div
                style={{
                  paddingBottom: "1.5rem",
                  borderBottom: "1px solid var(--border)",
                  marginBottom: "1.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ flex: 1, minWidth: "200px" }}>
                  <h3
                    style={{
                      fontSize: "1.75rem",
                      fontWeight: "bold",
                      color: "var(--text)",
                      margin: "0",
                    }}
                  >
                    👤 {consultation.patient_name}
                  </h3>
                  <p
                    style={{
                      color: "rgba(59, 130, 246, 0.7)",
                      fontSize: "0.9rem",
                      margin: "0.5rem 0 0 0",
                    }}
                  >
                    📅{" "}
                    {new Date(consultation.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    {new Date(consultation.date).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div
                  style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
                >
                  <span
                    style={{
                      padding: "0.5rem 1rem",
                      background: "rgba(34, 197, 94, 0.3)",
                      color: "#86efac",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                      borderRadius: "9999px",
                      border: "2px solid rgba(34, 197, 94, 0.5)",
                      textTransform: "uppercase",
                    }}
                  >
                    ✓ Completed
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      exportSinglePDF(consultation);
                    }}
                    style={{
                      padding: "0.5rem 1rem",
                      background: "rgba(59, 130, 246, 0.2)",
                      color: "#93c5fd",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                      borderRadius: "9999px",
                      border: "2px solid rgba(59, 130, 246, 0.5)",
                      cursor: "pointer",
                      textTransform: "uppercase",
                    }}
                  >
                    📥 Export
                  </button>
                </div>
              </div>

              {/* Notes */}
              {expandedConsultation === consultation.id && (
                <>
                  <div style={{ marginBottom: "2rem" }}>
                    <h4
                      style={{
                        fontSize: "1rem",
                        fontWeight: "bold",
                        color: "rgba(59, 130, 246, 0.7)",
                        marginBottom: "1rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        margin: "0 0 1rem 0",
                      }}
                    >
                      📝 Consultation Notes
                    </h4>
                    <p
                      style={{
                        color: "var(--text)",
                        background: "var(--surface-alt)",
                        padding: "1.5rem",
                        borderRadius: "0.75rem",
                        border: "1px solid var(--border)",
                        lineHeight: "1.6",
                        margin: "0",
                      }}
                    >
                      {consultation.notes || "No notes provided"}
                    </p>
                  </div>

                  {/* Medicines */}
                  <div>
                    <h4
                      style={{
                        fontSize: "1rem",
                        fontWeight: "bold",
                        color: "rgba(34, 197, 94, 0.7)",
                        marginBottom: "1rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        margin: "0 0 1rem 0",
                      }}
                    >
                      💊 Prescribed Medicines
                    </h4>
                    {consultation.medicines &&
                    consultation.medicines.length > 0 ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "1rem",
                        }}
                      >
                        {consultation.medicines.map((medicine, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: "flex",
                              gap: "1rem",
                              padding: "1.25rem",
                              background: "rgba(34, 197, 94, 0.15)",
                              borderRadius: "0.75rem",
                              border: "2px solid rgba(34, 197, 94, 0.3)",
                              transition: "all 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor =
                                "rgba(34, 197, 94, 0.5)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor =
                                "rgba(34, 197, 94, 0.3)";
                            }}
                          >
                            <span
                              style={{
                                fontSize: "1.5rem",
                                marginTop: "0.25rem",
                                flexShrink: 0,
                              }}
                            >
                              💊
                            </span>
                            <div style={{ flex: 1 }}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "flex-start",
                                  gap: "1rem",
                                  marginBottom: "0.5rem",
                                }}
                              >
                                <h5
                                  style={{
                                    fontWeight: "bold",
                                    color: "var(--text)",
                                    fontSize: "1.1rem",
                                    margin: "0",
                                  }}
                                >
                                  {medicine.medicine_name}
                                </h5>
                                <span
                                  style={{
                                    fontSize: "0.75rem",
                                    padding: "0.25rem 0.75rem",
                                    background: "rgba(59, 130, 246, 0.3)",
                                    color: "#93c5fd",
                                    borderRadius: "999px",
                                    fontWeight: "600",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  📏 {medicine.dosage || "N/A"}
                                </span>
                              </div>
                              <p
                                style={{
                                  color: "var(--text-muted)",
                                  fontSize: "0.9rem",
                                  margin: "0.5rem 0 0 0",
                                }}
                              >
                                <span
                                  style={{
                                    fontWeight: "600",
                                    color: "rgba(34, 197, 94, 0.8)",
                                  }}
                                >
                                  📋 Instructions:
                                </span>{" "}
                                {medicine.instructions || "As prescribed"}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p
                        style={{
                          color: "var(--text-muted)",
                          fontStyle: "italic",
                          margin: "0",
                        }}
                      >
                        No medicines prescribed
                      </p>
                    )}
                  </div>
                </>
              )}

              {expandedConsultation !== consultation.id && (
                <div
                  style={{
                    textAlign: "center",
                    color: "var(--text-muted)",
                  }}
                >
                  <p style={{ margin: "0", fontSize: "0.9rem" }}>
                    💾 {consultation.medicines?.length || 0} medicines
                    prescribed • Click to expand
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
