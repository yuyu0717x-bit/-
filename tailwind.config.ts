import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#172033",
        muted: "#667085",
        line: "#e6e9ef",
        paper: "#f7f8fb",
        mint: "#e7f6ef",
        sky: "#e9f2ff",
        peach: "#fff1e8",
      },
      boxShadow: { soft: "0 12px 36px rgba(30, 42, 70, 0.07)" },
    },
  },
  plugins: [],
};

export default config;
