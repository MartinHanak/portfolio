/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xmd: '800px',
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      transformOrigin: {
        'card-animation': 'center 250%',
      },
       gridTemplateRows: { 
          'content': 'auto 1fr',
       },
       gridTemplateColumns: { 
          'third': '1fr 2fr',
       },
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
        waveReverse: 'waveReverse 20s linear infinite',
        slideIn: 'slideIn 1s ease-in-out'
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
        },
        slideIn: {
          '0%' : {
            transform: 'translateX(-100%)'
          },
          '100%' : {
            transform: 'translateX(0%)'
          }
        }
      }
    },
  },
  plugins: [],
}
