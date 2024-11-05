/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        '2xl-white': '0 25px 50px -12px #d8d8d83e'
      },
      gridTemplateRows: {
        layout: 'auto 1fr 72px'
      }
    }
  },
  plugins: []
}
