/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom brand colors based on design
        primary: {
          orange: '#FC8A06',
          dark: '#03081F',
        },
      },
    },
  },
  plugins: [],
}
