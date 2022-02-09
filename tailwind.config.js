module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontWeight: {
      light: 200,
      normal: 400,
      bold: 600,
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      "roboto-mono": ["Roboto Mono", "monospace"],
    },
    container: {
      center: true,
      padding: "1.5rem",
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
