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
        // ponytail: mantido no valor original do site — o quartz revisado do design system
        // (#8A7E79) cai pra 3.49:1 de contraste contra linho, abaixo do piso AA (4.5:1) que
        // quartzo precisa como cor de texto de corpo. Ver docs/superpowers/specs/2026-07-20-design-system-sync-design.md
        quartzo: "#6B6059",
        // accents das linhas Play e Devotion — só esses dois têm uso real hoje
        // (Ambient reaproveita cobre-deep, ver AsTresLinhas.tsx). Resto da paleta do kit
        // (play-teal, play-sun, ambient-pitch, devotion-blue-light) fica de fora até ter uso.
        "play-coral": "#F4502B",
        "devotion-blue": "#3E5C76",
      },
    },
  },
  plugins: [],
}

export default config
