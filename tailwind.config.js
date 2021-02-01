module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        'wiggle': {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'growDown': {
          '0%': { transform: 'scaleY(0)', opacity: 0 },
          '80%': { transform: 'scaleY(1.1)', opacity: 100 },
          '100%': { transform: 'scaleY(1)', opacity: 50 }
        }
      },
      animation: {
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'growDown': 'growDown 300ms ease-in-out forwards',
      }
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    }
  },
  plugins: [],
};
