/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bolt-green': '#32BB78',
        'bolt-green-dark': '#29a366',
        'bolt-dark': '#2F313F',
        'bolt-gray': '#F5F6F7',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

