/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#100d2a",
        panel: "#1c1937",
        panel2: "#211d3e",
        purple: "#7048f4",
        red: "#eb334d",
        muted: "#7e7a9f",
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
