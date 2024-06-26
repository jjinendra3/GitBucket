/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#0e1116",
      },
      colors: {
        neon: "#A6FF96",
        prim: "#0e1116",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
