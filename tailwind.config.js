module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: "#0f0f0f",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
