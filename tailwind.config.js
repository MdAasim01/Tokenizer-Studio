/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        panel: "#f8fafc",
        edge: "#e2e8f0",
        accent: "#0ea5a4",
        accent2: "#7c3aed",
        warn: "#ea580c",
      },
    },
  },
  plugins: [],
};
