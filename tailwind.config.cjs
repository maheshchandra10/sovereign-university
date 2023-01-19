/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: "#1b263e",
        purple: "#363d72",
        orange: "#f49739",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
