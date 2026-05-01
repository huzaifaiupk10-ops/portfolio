/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-black': '#05070A',
        'brand-navy': '#0B1220',
        'brand-navy-2': '#111827',
        'brand-silver': '#C0C7D1',
        'brand-silver-light': '#E5E7EB',
        'brand-muted': '#94A3B8',
        'brand-blue': '#3B82F6',
        'brand-blue-dark': '#1E40AF',
      },
      fontFamily: {
        display: ['Sora', 'Space Grotesk', 'sans-serif'],
        body: ['Inter', 'Manrope', 'sans-serif'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite alternate',
        'spin-slow': 'spin 25s linear infinite',
        shimmer: 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        glowPulse: {
          '0%': { boxShadow: '0 0 20px rgba(59,130,246,0.2)' },
          '100%': { boxShadow: '0 0 50px rgba(59,130,246,0.5)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
};
