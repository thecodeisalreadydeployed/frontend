const baseColors = require("./styles/colors");
const baseBorderRadii = require("./styles/border-radii");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: baseColors,
    borderRadius: baseBorderRadii,
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
