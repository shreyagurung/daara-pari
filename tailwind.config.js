/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: '#1f3d2b',
        beige: '#f3e9dc',
        mud: '#6b4f3a',
        mist: '#d9d9d9',
        terracotta: '#c26d4a',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
        hindi: ['Martel', 'serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'zoom-in': 'zoomIn 10s ease-out forwards',
        'soft-pulse': 'softPulse 3.6s ease-in-out infinite',
        'lamp-glow': 'lampGlow 3.2s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        zoomIn: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        },
        softPulse: {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.18)' },
        },
        lampGlow: {
          '0%, 100%': { transform: 'translateY(0) scale(1)', opacity: '0.88' },
          '50%': { transform: 'translateY(-2px) scale(1.12)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
