/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", // Добавьте здесь нужные расширения
  ],
  theme: {
    extend: {
      main_dark_gray: "#252629",
      main_light_gray: "",

      main_dark_orange: "",
      main_light_orange: "",

      main_dark_blue: "",
      main_light_blue: "",

      main_dark_red: "",
      main_light_red: "",

      main_dark_black: "",
      main_light_black: "",
    },
  },
  plugins: [],
};
