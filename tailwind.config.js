/* eslint-disable @typescript-eslint/no-var-requires */
const baseColors = require(`${__dirname}/styles/colors`);
const baseBorderRadii = require(`${__dirname}/styles/border-radii`);

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {},
    colors: baseColors,
    borderRadius: baseBorderRadii,
    container: {
      center: true,
      padding: "1.5rem",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
