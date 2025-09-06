/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        anime: {
          primary: '#d4af8c',      // nude gold
          secondary: '#c4a484',    // nude beige
          accent: '#b8a082',       // nude tan
          dark: '#8b7355',         // nude brown
          light: '#f5f3f0',        // nude cream
          neutral: '#e8e2d9',      // nude neutral
          text: '#5d4e37',         // nude text
          textLight: '#8b7355',    // nude text light
        }
      },
      fontFamily: {
        'anime': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
