/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        garamond: ['EB Garamond', 'serif'],
      },
      colors: {
        parchment: '#fdf6e3',
        midnight: '#0d0d1e',
        twilight: '#1a1a2e',
        gold: '#ffd700',
        shadow: '#111111',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%, 100%': { textShadow: '0 0 12px rgba(255,223,0,0.6)' },
          '50%': { textShadow: '0 0 24px rgba(255,223,0,1)' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite',
        'fade-in': 'fade-in 1s ease-out forwards',
        'spin-slow': 'spin-slow 8s linear infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
};

