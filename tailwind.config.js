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
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
  ],
};
