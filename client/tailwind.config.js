/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    theme: {
      extend: {
        maxWidth: {
          '7.5xl': '40rem', 
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    //...
  ],
}