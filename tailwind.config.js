/* eslint-disable @typescript-eslint/no-var-requires */
const baseColors = require(`${__dirname}/styles/colors`);
const baseBorderRadii = require(`${__dirname}/styles/border-radii`);

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: baseColors,
    borderRadius: baseBorderRadii,
    container: {
      center: true,
      padding: "1.5rem",
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
