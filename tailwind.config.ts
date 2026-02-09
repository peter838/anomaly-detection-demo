import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

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
        mono: "var(--font-geist-mono)", // Keep for potential usage elsewhere
      },
      colors: {
        // Define theme colors based on design
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Red, Amber, Green for severity
        critical: '#EF4444', // Red-500
        high: '#F59E0B',     // Amber-500
        medium: '#10B981',   // Green-500
        // Neutral grays
        gray: {
          50: '#F9FAFB',     // Background
          100: '#F3F4F6',
          200: '#E5E7EB',   // Borders
          300: '#D1D5DB',
          400: '#9CA3AF',   // Secondary Text
          500: '#6B7280',   // Tertiary Text
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',   // Primary Text
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
  },
  plugins: [
    plugin(({ addUtilities, addComponents, e, config }) => {
      addComponents({
        '.line-clamp-1': {
          display: '-webkit-box',
          '-webkit-line-clamp': '1',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
        },
        '.line-clamp-2': {
          display: '-webkit-box',
          '-webkit-line-clamp': '2',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
        },
      });
    }),
    require('tailwindcss/plugin')(({ addUtilities }) => {
      addUtilities({
        '.line-clamp-1': {
          display: '-webkit-box',
          '-webkit-line-clamp': '1',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
        },
        '.line-clamp-2': {
          display: '-webkit-box',
          '-webkit-line-clamp': '2',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
        },
      });
    }),
  ],
};

export default config;
