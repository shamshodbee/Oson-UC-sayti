import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#090B10", slate2: "#121622", line: "#1E2538",
        gold: "#F59E0B", ember: "#FF6B00", neon: "#22D3EE",
      },
      fontFamily: { display: ["var(--font-display)"], sans: ["var(--font-body)"] },
    },
  },
  plugins: [],
};
export default config;
