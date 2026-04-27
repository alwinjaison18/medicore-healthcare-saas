/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#0A2540", light: "#1E3A5F" },
        accent: { DEFAULT: "#0096C7", light: "#00B4D8", dark: "#0077A8" },
        success: "#06D6A0",
        warning: "#FFB703",
        danger: "#EF476F",
        highlight: "#7C3AED",
        surface: "#F8FAFC",
        text: "#1E293B",
      },
      fontFamily: {
        display: ["DM Serif Display", "serif"],
        sans: ["DM Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(0, 0, 0, 0.06), 0 4px 16px rgba(0, 0, 0, 0.04)",
        hover: "0 4px 12px rgba(0, 0, 0, 0.10), 0 8px 32px rgba(0, 0, 0, 0.06)",
      },
    },
  },
  plugins: [],
};
