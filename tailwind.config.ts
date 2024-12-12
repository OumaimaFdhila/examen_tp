import type { Config } from "tailwindcss";
import {nextui} from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        light_green : "#004838",
        dark_green : "#002c1f",
        yellow :"#e2fb6c",
        dark_grey : "#333f3c",
        light_grey : "#b9b9b9",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()]
};
export default config;
