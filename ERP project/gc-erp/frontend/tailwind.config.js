/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          500: '#0284c7',
          600: '#0265d2',
          700: '#034ea2',
          900: '#0f172a',
        }
      },
      fontFamily: {
        sans: ['"Asap"', 'system-ui', '-apple-system', 'sans-serif'],
        asap: ['"Asap"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
