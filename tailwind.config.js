/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'cosmic-black': '#0A0A12',
        'matte-charcoal': '#1E1E2E',
        'nebula-teal': '#00D1D1',
        'muted-violet': '#7A5BFF',
        'champagne-gold': '#E6C190',
        'dark-bg': '#0A0A12',
        'dark-surface': '#1E1E2E',
        'dark-border': '#2A2A3A',
      },
      fontFamily: {
        'clash': ['Clash Display', 'sans-serif'],
        'sohne': ['Söhne', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'draw-line': 'draw-line 0.3s ease-in-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'draw-line': {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
      boxShadow: {
        'edge-light': '0 0 1px #E6C190',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};