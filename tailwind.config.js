/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'anchor-red': '#C1121F',
        'custom-gray': '#2D2D2D',
      },
    },
  },
  plugins: [],
} 