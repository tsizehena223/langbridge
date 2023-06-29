/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["OpenSans"],
    },
    extend: {},
    colors: {
      light: "#fefefe",
      dark: "#161617",
      purple: "#6c63ff",
      green: "#57e1bd",
      red: "#ff6884",
      pink: "#f361fb",
      blue: "#1a1463",
      cyan: "#71e1e1",
      "gray-0": "#cccccc",
      "gray-1": "#3f3d56",
      "gray-2": "#2f2e41",
    },
  },
  plugins: [],
};
