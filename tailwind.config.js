/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "!./components/Blog/Aricle.js",
  ],


  theme: {
    extend: {
      colors: {
        'custom-blue': '#095668',
        'custom-blue-light': '#0a6b85',
        'custom-blue-dark': '#074753',
        'secondary-color': '#c5b59e',
        'custom-blue-darker': '#0f3a44'
      },
      gradientColorStops: {
        'custom-blue-gradient': '#095668',
        'custom-blue-gradient-light': '#0a6b85',
      },
      backgroundImage: {
        'custom-blue-gradient': 'linear-gradient(to right, #095668, #0a6b85)',
      },
      fontFamily: {
        cairo: ["Cairo", "Poppins", "sans-serif"],
        openSans: ['Open Sans', "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        satoshi: ['Satoshi', 'sans-serif'],
        engraves: ["Engravers MT", "sans-serif"]
      },
    },
  },
  plugins: [],
}

