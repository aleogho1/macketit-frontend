/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react'
// import tailwindCssAnimated from 'tailwindcss-animated'
import scrollbar from 'tailwind-scrollbar'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      Manrope: ['Manrope', 'sans-serif'],
      RedHat: ['Red Hat Display', 'sans-serif'],
    },
    extend: {
      colors: {
        primaryBg: '#0c2d48',
      },
    },
  },
  darkMode: 'class',

  plugins: [
    scrollbar,
    nextui({
      themes: {
        light: {
          colors: {
            secondary: '#FF6DFB',
            border: '#E879F9',
          },
        },
        dark: {
          colors: {},
        },
      },
    }),
  ],
}
