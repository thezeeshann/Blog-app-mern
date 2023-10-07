/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        bgColorTwo:"#1e293b"
      },
      screens: {
        'xs': '500px',
        'small-xs':'350px',
        ...defaultTheme.screens,
      },
    },
  },
  plugins: [],
}
