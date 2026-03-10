import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import DAWALogo from "../components/DAWALogo";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch(
        "https://dawa-clinic-backend.onrender.com/api/login/",
        {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Invalid credentials");
      }

      localStorage.setItem("token", data.access);
      localStorage.setItem("role", data.role);

      if (data.role === "ADMIN") navigate("/admin");
      else navigate("/doctor");
    } catch (err) {
      console.error("Login error:", err.message);
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="blob blob-blue"></div>
        <div className="blob blob-green"></div>
        <div className="blob blob-blue-2"></div>
      </div>

      <div className="login-wrapper">
        <div className="login-header">
          <DAWALogo size="large" showName={true} />
          <p className="login-subtitle">
            Professional Healthcare Management System
          </p>
        </div>

        <div className="login-card">
          <h2>Welcome Back</h2>
          <p>Access your healthcare dashboard</p>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">👤 Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">🔐 Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                required
              />
            </div>

            {error && (
              <div
                style={{
                  padding: "1rem",
                  background: "rgba(252, 165, 165, 0.15)",
                  border: "2px solid rgba(252, 165, 165, 0.5)",
                  borderRadius: "0.75rem",
                  marginBottom: "1rem",
                }}
              >
                <p className="error-message">⚠️ {error}</p>
              </div>
            )}

            <button type="submit" disabled={loading} className="login-button">
              {loading ? "🔄 Signing in..." : "✨ Sign In"}
            </button>
          </form>          <p
          style={{
            textAlign: "center",
            color: "rgba(107, 167, 255, 0.7)",
            fontSize: "0.875rem",
            marginTop: "2rem",
            fontWeight: "500",
          }}
        >
          🚀 Modern Healthcare Management Platform
        </p>
      </div>
    </div>
  );
}

