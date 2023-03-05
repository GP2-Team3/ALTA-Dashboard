/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        "dark-alta": "#19345E",
        "orange-alta": "#F47522",
      },
    },
  },
  plugins: [require("daisyui")],
}
