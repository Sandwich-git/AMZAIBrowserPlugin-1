import daisyui from "daisyui"
import tailwindScrollbar from "tailwind-scrollbar"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,html}"],
  darkMode: "media",
  plugins: [daisyui, tailwindScrollbar]
}
