module.exports = {
  content: ["./src/**/*.{html,js}", "./public/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        // 'light-coffee': '#C89F94',
        // 'dark-coffee': '#A25F4B',
        'coffee': {
          '100': '#ECDEDB',
          '200': '#A25F4B',
        }
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
        },
        fadeIn: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(-50%)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        fadeOut: {
          '0%': { 
            opacity: '1',
            transform: 'translateY(0)'
          },
          '100%': { 
            opacity: '0',
            transform: 'translateY(-50%)'
          },
        },
      },
      animation: {
        slideDown: 'slideDown 0.3s ease-in-out',
        slideUp: 'slideUp 0.2s linear',
        fadeIn: 'fadeIn 0.5s ease-in-out',
        fadeOut: 'fadeOut 0.3s linear',
      },
      backgroundImage: {
        'slider-bg': "url('/images/slider-bg.jpg')",
      }
    },
  },
  plugins: [],
}
