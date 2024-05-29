/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      tablet: '640px',
      laptop: '1024px',
    },
    extend: {
      boxShadow: {
        'cst': '0px 9px 5px -4px rgba(0,0,0,0.4)',
        'sm-cst': '0px 4px 4px 0.5px rgba(0,0,0,0.2)',
      }
    },
  },
  plugins: [],
}
