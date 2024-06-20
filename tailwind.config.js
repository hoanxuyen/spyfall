/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        honk: ["Honk", "sans-serif"],
        bellota: ["Bellota", "serif"],
      },
      colors: {
        primary: "#FFFF97",
        secondary: "#FF489E",
        dark: "#242424",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: "none",
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
