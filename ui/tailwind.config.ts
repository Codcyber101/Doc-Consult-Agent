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
        background: "var(--background)",
        foreground: "var(--foreground)",
        sovereign: {
          slate: "#1A1C1E",
          gold: "#D4AF37",
          green: "#006747",
          red: "#BE1E2D",
          sand: "#F5F2ED",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        amharic: ["Noto Sans Ethiopic", "sans-serif"],
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'sovereign': '0 10px 40px -10px rgba(0, 103, 71, 0.1)',
      }
    },
  },
  plugins: [],
};
export default config;
