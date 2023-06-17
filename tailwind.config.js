/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['var(--font-IBM)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      aspectRatio: {
        'hexagon': '1.1547',
      },
      animation: {
        wave: 'waveDisappearAppear 20s linear infinite',
        waveReverse: 'waveReverse 20s linear infinite'
      },
      keyframes: {
        waveDisappearAppear: {
          '0%' : {
            opacity: 1,
            transform: 'scale(1.0)'
          },
          '10%' : {
            opacity: 0,
            transform: 'scale(1.0)'
          },
          '30%': {
            opacity: 0,
          },
          '40%' : {
            opacity: 1,
            transform: 'scale(1.0)'
          },
          '70%' : {
            opacity: 1,
            transform: 'scale(1.0)'
          },
          '90%' : {
            opacity: 1
          },
          '100%' : {
            opacity: 1
          }
        },
        waveReverse: {
          '0%' : {
            opacity: 0,
            transform: 'scale(1.0)'
          },
          '20%' : {
            opacity: 1,
            transform: 'scale(1.0)'
          },
          '40%': {
            opacity: 1,
          },
          '50%' : {
            opacity: 0,
            transform: 'scale(1.0)'
          },
          '70%' : {
            opacity: 0,
            transform: 'scale(1.0)'
          },
          '90%' : {
            opacity: 0
          },
          '100%' : {
            opacity: 0
          }
        }
      }
    },
  },
  plugins: [],
}
