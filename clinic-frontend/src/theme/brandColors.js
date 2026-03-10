/**
 * DAWA Clinic Brand Colors and Theme Configuration
 */

export const brandColors = {
  // Primary Colors - from DAWA logo
  primary: "#003DA5", // Deep Navy Blue
  primaryDark: "#002B7D",
  primaryLight: "#1B5FD6",

  // Secondary Colors - from DAWA logo
  secondary: "#B8D700", // Lime Green
  secondaryDark: "#9DB500",
  secondaryLight: "#D4FF00",

  // Neutral Colors
  dark: "#0F172A",
  darkAlt: "#1E293B",
  light: "#F8FAFC",
  white: "#FFFFFF",

  // Status Colors
  success: "#22C55E",
  error: "#EF4444",
  warning: "#F59E0B",
  info: "#3B82F6",

  // Backgrounds
  bgDark: "linear-gradient(135deg, #0F172A 0%, #1A2347 50%, #0F172A 100%)",
  bgGradient: "linear-gradient(135deg, #003DA5 0%, #B8D700 100%)",
};

export const getTheme = () => ({
  colors: brandColors,
  header: {
    background: "rgba(255, 255, 255, 0.05)",
    border: "rgba(255, 255, 255, 0.1)",
  },
});
