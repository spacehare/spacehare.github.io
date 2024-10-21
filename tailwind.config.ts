import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    './src/mdx-components.tsx',
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        solid: {
          dark: "#0B1F12",
          med: "#0A2C19",
          light: "#154128"
        }
      },
      fontFamily: {
        atkinson: ['var(--font-atkinson)'],
        roboto: ['var(--font-roboto)'],
        robotoMono: ['var(--font-roboto-mono)'],
        sans: ['var(--font-roboto)'],
        mono: ['var(--font-roboto-mono)']
      }
    },
  },
  plugins: [],
};
export default config;
