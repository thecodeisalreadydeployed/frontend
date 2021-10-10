const baseColors = require(`${__dirname}/theme/colors`);
const baseBorderRadii = require(`${__dirname}/theme/border-radii`);

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
