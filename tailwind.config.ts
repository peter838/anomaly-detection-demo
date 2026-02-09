import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: "var(--font-inter)",
        mono: "var(--font-geist-mono)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        critical: '#EF4444',
        high: '#F59E0B',
        medium: '#10B981',
      },
    },
    keyframes: {
      "fade-in": {
        "0%": { opacity: "0" },
        "100%": { opacity: "1" },
      },
      "slide-in-from-top": {
        "0%": { transform: "translateY(-10px)", opacity: "0" },
        "100%": { transform: "translateY(0)", opacity: "1" },
      },
    },
    animation: {
      "fade-in": "fade-in 0.3s ease-out",
      "slide-in-from-top": "slide-in-from-top 0.3s ease-out",
      "slide-in-from-top-2": "slide-in-from-top 0.3s ease-out",
    },
  },
};

export default config;
