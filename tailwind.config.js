/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        l13: {
          "100%": { transform: "rotate(1turn)" },
        },
      },
      animation: {
        l13: "l13 1s infinite linear",
      },
    },
  },
  plugins: [],
};
