/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-black': '#00030A',
        'brand-navy': '#01060F',
        'brand-navy-2': '#020810',
        'brand-navy-3': '#050F1E',
        'brand-silver': '#EDD07A',
        'brand-silver-light': '#F8F4EE',
        'brand-muted': '#7A8BA8',
        'brand-blue': '#D4A843',
        'brand-blue-light': '#EDD07A',
        'brand-blue-dark': '#A87828',
        'brand-ice': '#F8E8C0',
        'brand-beige': '#D4A843',
        'brand-beige-light': '#EDD07A',
        'brand-beige-dark': '#A87828',
      },
      fontFamily: {
        display: ['"DM Sans"', 'Space Grotesk', 'sans-serif'],
        body: ['"DM Sans"', 'Space Grotesk', 'sans-serif'],
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
          '0%': { boxShadow: '0 0 20px rgba(212,168,67,0.15)' },
          '100%': { boxShadow: '0 0 50px rgba(212,168,67,0.35)' },
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
