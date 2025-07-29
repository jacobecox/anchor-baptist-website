/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'calvary-blue': '#0099cb',
        'custom-blue': '#003d51',
      },
    },
  },
  plugins: [],
} 