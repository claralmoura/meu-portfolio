import colors from 'tailwindcss/colors'

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neutral-900': colors.neutral[900],
        'neutral-100': colors.neutral[100],
        'gradient-start': '#FFEDD5',
        'gradient-end': '#FECACA',
        'dark-gradient-start': colors.neutral[900],
        'dark-gradient-end': colors.neutral[800],
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'blob': 'blob 10s infinite',
        'color-1': 'color-1 15s infinite linear alternate',
        'color-2': 'color-2 15s infinite linear alternate',
        'color-3': 'color-3 15s infinite linear alternate',
      },
      keyframes: {
        'blob': {
          '0%, 100%': {
            transform: 'translate(0, 0) scale(1)',
            opacity: '0.3',
          },
          '25%': {
            transform: 'translate(20px, -30px) scale(1.1)',
            opacity: '0.5',
          },
          '50%': {
            transform: 'translate(0, 40px) scale(0.9)',
            opacity: '0.4',
          },
          '75%': {
            transform: 'translate(-30px, 10px) scale(1.05)',
            opacity: '0.5',
          },
        },
        'color-1': {
          '0%, 100%': { backgroundColor: '#38bdf8' },
          '50%': { backgroundColor: '#d8b4fe' },
        },
        'color-2': {
          '0%, 100%': { backgroundColor: '#d8b4fe' },
          '50%': { backgroundColor: '#f97316' },
        },
        'color-3': {
          '0%, 100%': { backgroundColor: '#06b6d4' },
          '50%': { backgroundColor: '#65a30d' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
