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
        'brand-silver': '#E0B898',
        'brand-silver-light': '#F8F4EE',
        'brand-muted': '#7A8BA8',
        'brand-blue': '#C8956A',
        'brand-blue-light': '#E0B898',
        'brand-blue-dark': '#9A6840',
        'brand-ice': '#F5E0CC',
        'brand-beige': '#C8956A',
        'brand-beige-light': '#E0B898',
        'brand-beige-dark': '#9A6840',
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
          '0%': { boxShadow: '0 0 20px rgba(200,149,106,0.15)' },
          '100%': { boxShadow: '0 0 50px rgba(200,149,106,0.35)' },
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
