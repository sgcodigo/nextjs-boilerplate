/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      height: { fit: 'calc(100vh - var(--header))' },
      fontFamily: {
        mono: ['', ...defaultTheme.fontFamily.mono],
        sans: ['', ...defaultTheme.fontFamily.sans],
        serif: ['', ...defaultTheme.fontFamily.serif],
      },
      animation: {
        'fade-in': 'fade-in var(--t) linear',
        'fade-out': 'fade-out var(--t) linear',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 'var(--o)', transform: 'translate(var(--x), var(--y))' },
          '100%': { opacity: '1', transform: 'translate(0, 0)' },
        },
        'fade-out': {
          '0%': { opacity: 'var(--o)', transform: 'translate(0, 0)' },
          '100%': { opacity: '0', transform: 'translate(var(--x), var(--y))' },
        },
      },
    },
    colors: {
      none: 'none',
      white: '#fff',
      black: '#000',
      trans: 'transparent',
      primary: '#C84332',
    },
    screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1440px', '2xl': '1960px' },
  },
  plugins: [require('tailwindcss-radix')({ variantPrefix: 'rdx' })],
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './views/**/*.{js,ts,jsx,tsx}', './layouts/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
}
