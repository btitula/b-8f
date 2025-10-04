module.exports = {
  content: ["./src/**/*.{html,js}", "./public/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'light-coffee': '#C89F94',
      },
      fontFamily: {
        'karla': ['Karla', 'sans-serif']
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100%)' },
        }
      },
      animation: {
        slideDown: 'slideDown 0.3s ease-in-out',
        slideUp: 'slideUp 0.2s linear',
      },
      backgroundImage: {
        'slider-bg': "url('./images/slider-bg.jpg')",
      }
    },
  },
  plugins: [],
}
