/** @type {import('tailwindcss').Config} */
module.exports = {

  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],

  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        blue1: "#708FFF",
        // blue1: "#FFF",
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
