/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./frontend/index.html", "./frontend/testing.html", "./frontend/app.js"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

