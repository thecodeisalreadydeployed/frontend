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
    extend: {
      fontFamily: {
        sora: ["Sora", "sans-serif"],
      },
    },
    container: {
      center: true,
      padding: "1.5rem",
    },
  },
};
