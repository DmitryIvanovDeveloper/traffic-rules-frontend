/** @type {import('tailwindcss').Config} */
import PrimeUI from 'tailwindcss-primeui';

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  
  theme: {
    extend: {
      screens: {
        '3xl': '1920px',
      },
      fontFamily: {
        'roboto-400': ['"Roboto-400"', 'sans-serif'],
        'roboto-500': ['"Roboto-500"', 'sans-serif'],
        'roboto-600': ['"Roboto-600"', 'sans-serif'],
        'roboto-700': ['"Roboto-700"', 'sans-serif'],
        'rubik-400': ['"Rubik-400"', 'sans-serif'],
        'rubik-500': ['"Rubik-500"', 'sans-serif'],
        'rubik-700': ['"Rubik-700"', 'sans-serif'],
      },
      colors: {
        'white': '#FFFFF',
        'background': 'rgba(239,246,248, 1)',
        'text_danger': "#FF6666"
      },
    },
  },
  plugins: [PrimeUI],
};