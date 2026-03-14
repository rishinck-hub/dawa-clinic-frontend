import React from "react";

/**
 * DAWA Clinic Logo Component
 * Displays the clinic logo and name with consistent branding
 */
export default function DAWALogo({
  size = "medium",
  showName = true,
  logoSrc = "/dawa-logo.png",
  logoAlt = "DAWA Homeo Clinic logo",
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
          background: "transparent",
          borderRadius: currentSize.width / 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.25)",
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
        <img
          src={logoSrc}
          alt={logoAlt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            borderRadius: currentSize.width / 10,
          }}
        />
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
              color: "#ffffff",
            }}
          >
            DAWA
          </div>
          <div
            style={{
              fontSize: currentSize.width > 50 ? "0.75rem" : "0.625rem",
              color: "#ffffff",
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
