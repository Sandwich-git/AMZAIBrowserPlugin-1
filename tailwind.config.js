import daisyui from "daisyui"
import tailwindScrollbar from "tailwind-scrollbar"

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  darkMode: "media",
  plugins: [daisyui, tailwindScrollbar],
}
