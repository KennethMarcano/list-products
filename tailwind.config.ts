import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F4F4F4',
        },
        secondary: {
          DEFAULT: '#FFFFFF',
        },
        selectFilter: {
          DEFAULT: '#51BAE8',
        }
      }

  }
  },
plugins: [],
};
export default config;
