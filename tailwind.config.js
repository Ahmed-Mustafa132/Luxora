/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: "#b7966c",
        chocolate: "#222021",
        darkChocolate: "#171717",
        offWhite: "#f6f2ed",
        DarkCoffee: "#26221d"
      },
    },
  },
  plugins: [],
}