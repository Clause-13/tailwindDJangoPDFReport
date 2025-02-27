/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // You can customize company colors here
      colors: {
        primary: '#0f172a',
        secondary: '#64748b',
      }
    },
  },
  plugins: [],
}
