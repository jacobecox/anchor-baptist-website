/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'calvary-blue': '#4EC2E6',
        'custom-blue': '#337b92',
      },
    },
  },
  plugins: [],
} 