/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      current: "currentColor",
      white: "#F2F2F2",
      black: "#001011",
      "very-light-brown": "#C7C7D1",
      wine: "#6B242B",
      "reseda-green": "#717744",
      "cool-gray": "#82829B",
      charcoal: "#40404F",
      primary: "#f2af29",
      secondary: "#f2af29",
      "light-cyan": "#DBF7FA",
      azure: "#EDFBFD",
      "floral-white": "#FEF8EC",
      bistre: "#271b02",
      onyx: "#271b02",
      "anti-flash-white": "#ebebeb",
      "golden-brown": "#885f07",
    },
    fontFamily: {
      sans: ["var(--font-fjalla-one)"],
      serif: ["var(--font-lora)"],
      mono: ["Ubuntu", "ui-monospace"],
    },
  },
  plugins: [],
};
