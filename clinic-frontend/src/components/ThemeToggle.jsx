import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <span className="toggle-icon" aria-hidden="true">
        {isDark ? "☀️" : "🌙"}
      </span>
      <span className="toggle-text">{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}
