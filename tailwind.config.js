const baseColors = require("./theme/colors");
const baseBorderRadii = require("./theme/border-radii");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
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
