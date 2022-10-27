/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-img': "url('./assets/img/pexels-michael-fiukowski-6036173.jpg')",
      }
    },
  },
  plugins: [],
}