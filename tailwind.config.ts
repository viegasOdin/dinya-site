import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
      },
      colors: {
        cobre: "#C4907A",
        "cobre-deep": "#9E6E5C",
        // ponytail: cobre-text existe porque cobre (2.45:1) e cobre-deep (3.85:1) falham WCAG AA em texto pequeno
        "cobre-text": "#855A48",
        linho: "#F4F1EB",
        blush: "#EDE0D8",
        carvao: "#3A3330",
        quartzo: "#6B6059",
      },
    },
  },
  plugins: [],
}

export default config
