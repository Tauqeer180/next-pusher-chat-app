/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#fc5119",
        theme: "#0c3c60",

        secondary: "#072136",
        active: "#8cbcdb",
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
        fredoka: ["var(--font-fredoka)"],
        albert: ["var(--font-albert)"],
        kode: ["var(--font-kode)"],
      },
      screens: {
        xxs: "400px",
      },
    },
  },
  plugins: [],
};
