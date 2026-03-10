import React from "react";

/**
 * DAWA Clinic Logo Component
 * Displays the clinic logo and name with consistent branding
 */
export default function DAWALogo({
  size = "medium",
  showName = true,
  className = "",
}) {
  const sizes = {
    small: { width: 40, height: 40, fontSize: "0.875rem" },
    medium: { width: 56, height: 56, fontSize: "1.125rem" },
    large: { width: 96, height: 96, fontSize: "1.75rem" },
  };

  const currentSize = sizes[size] || sizes.medium;

  return (
    <div
      className={className}
      style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
    >
      {/* Logo Container */}
      <div
        style={{
          width: currentSize.width,
          height: currentSize.height,
          background:
            "linear-gradient(135deg, #003da5 0%, #0a3b7d 50%, #b8d700 100%)",
          borderRadius: currentSize.width / 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 10px 15px -3px rgba(0, 61, 165, 0.3)",
          transition: "transform 0.3s ease",
          fontSize: currentSize.fontSize,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        🩺
      </div>

      {/* Clinic Name & Tagline */}
      {showName && (
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}
        >
          <div
            style={{
              fontSize: currentSize.width > 50 ? "1.125rem" : "0.875rem",
              fontWeight: 900,
              background: "linear-gradient(90deg, #003da5 0%, #b8d700 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            DAWA
          </div>
          <div
            style={{
              fontSize: currentSize.width > 50 ? "0.75rem" : "0.625rem",
              color: "#b8d700",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Homeo Clinic
          </div>
        </div>
      )}
    </div>
  );
}
