import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0B3D3A",
        "bg-deep": "#072826",
        panel: "#103F3C",
        gold: "#F4B400",
        magenta: "#E6396B",
        skyline: "#38BDF8",
        cream: "#FDF6E8",
        charcoal: "#17201F",
        chrome: "#CFE0DD",
        "chrome-dim": "#8FADA8",
      },
      fontFamily: {
        display: ["var(--font-bungee)"],
        body: ["var(--font-literata)"],
        mono: ["var(--font-space-mono)"],
      },
    },
  },
  plugins: [],
};

export default config;
