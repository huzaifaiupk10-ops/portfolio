/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-black': '#010508',
        'brand-navy': '#020A14',
        'brand-navy-2': '#04101C',
        'brand-navy-3': '#081828',
        'brand-silver': '#E8D5B7',
        'brand-silver-light': '#F8F4EE',
        'brand-muted': '#7A8BA8',
        'brand-blue': '#C9A880',
        'brand-blue-light': '#E8D5B7',
        'brand-blue-dark': '#A0814D',
        'brand-ice': '#F5EDD9',
        'brand-beige': '#C9A880',
        'brand-beige-light': '#E8D5B7',
        'brand-beige-dark': '#A0814D',
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
          '0%': { boxShadow: '0 0 20px rgba(201,168,128,0.15)' },
          '100%': { boxShadow: '0 0 50px rgba(201,168,128,0.35)' },
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
