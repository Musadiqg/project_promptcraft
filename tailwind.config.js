/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        aclonica: ['Aclonica', 'sans-serif'],
        courier: ['Courier Prime', 'monospace'],
       
      },
      colors: {
        'primary-grey': '#DDD2C6',
        'secondary-grey': '#DDD2C6',
        'Accent': '#C9A07A',
        'Background': '#8E4739'
      }
    },
  },
  plugins: [],
}