/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Добавьте здесь нужные расширения
  ],
  theme: {
    extend: {
      screens: {
        sm: "640px", // изначально 640px + 10px = 650px
        md: "824px", // изначально 768px + 10px = 778px
        lg: "1024px", // оставляем по умолчанию или меняем при необходимости
        xl: "1280px", // изначально 1280px + 10px = 1290px
      },
    },
  },

  plugins: [],
};
