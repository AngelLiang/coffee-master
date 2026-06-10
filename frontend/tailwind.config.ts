import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: "#fdf8f6",
          100: "#f2e8e5",
          200: "#eaddd7",
          300: "#e0cec7",
          400: "#d2bab0",
          500: "#a07e6f",
          600: "#8b6b5c",
          700: "#6f5246",
          800: "#5c4439",
          900: "#3e2c23",
        },
        caramel: {
          50: "#fefaf5",
          100: "#fce8d0",
          200: "#f5d8aa",
          300: "#ecbe7a",
          400: "#dfa050",
          500: "#c8873e",
          600: "#a96e30",
          700: "#8a5826",
          800: "#6b431d",
          900: "#4c2f14",
        },
      },
    },
  },
  plugins: [],
};

export default config;
