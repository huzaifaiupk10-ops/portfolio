/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-black': '#000000',
        'brand-navy': '#050d1a',
        'brand-navy-2': '#070f1e',
        'brand-silver': '#CBD5E1',
        'brand-silver-light': '#F1F5F9',
        'brand-muted': '#64748B',
        'brand-blue': '#2563EB',
        'brand-blue-light': '#60A5FA',
        'brand-blue-dark': '#1D4ED8',
        'brand-ice': '#BAE6FD',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
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
