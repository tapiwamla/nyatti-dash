/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#16876b',
        'primary-dark': '#0f6b54',
        'primary-light': '#1da87a',
      }
    },
  },
  plugins: [],
}