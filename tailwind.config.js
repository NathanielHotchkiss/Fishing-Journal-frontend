module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      width: {
        "144": '36rem',
        "192": '48rem',
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
