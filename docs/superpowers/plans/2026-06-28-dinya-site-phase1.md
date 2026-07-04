# DINYA Site — Fase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete institutional landing page for DINYA Soluções Criativas with Next.js 14, Tailwind CSS, TypeScript, App Router.

**Architecture:** Single-page app with scroll-anchored sections. No routing. All sections are independent components assembled in `app/page.tsx`. Brand tokens live in CSS custom properties (`globals.css`) and Tailwind config. WhatsApp links centralized in `lib/whatsapp.ts`.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, next/font/google (Cormorant Garamond + DM Sans), react-icons

---
## File Map

```
app/
  layout.tsx          — fonts, metadata, globals import, body wrapper
  globals.css         — CSS custom properties + Tailwind directives + base styles
  page.tsx            — assembles all section components
components/
  Logo.tsx            — next/image wrapper for /logo.png + text fallback
  Navbar.tsx          — sticky nav, smooth scroll links, mobile hamburger drawer
  Hero.tsx            — hero with headline, subtitle, dual CTAs
  Corporativo.tsx     — corporate gifts section with 3 cards + CTA
  OQueFazemos.tsx     — what we do section with 4 service cards
  QuemSomos.tsx       — about section with story, values list, photo placeholder
  Contato.tsx         — contact section with WhatsApp/Social/Email links
  WhatsAppFloat.tsx   — fixed-position floating WhatsApp button with expand/collapse
  Footer.tsx          — footer with logo, links, copyright
lib/
  whatsapp.ts         — WA_EMPRESA and WA_PESSOAL URL constants
tailwind.config.ts    — custom brand colors extended
next.config.ts        — next/image config
public/
  logo.png            — ⚠ ADD MANUALLY
README.md             — pre-deploy checklist
ROADMAP.md            — 3-phase roadmap
```

---

### Task 1: Project Scaffold

**Files:**
- Modify: `package.json`
- Create: `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `app/globals.css`, `app/layout.tsx`, `app/page.tsx`

- [ ] **Step 1: Install Next.js 14 and dependencies**
  ```bash
  npm install next@14 react@18 react-dom@18
  npm install -D typescript @types/react @types/node tailwindcss postcss autoprefixer
  npm install react-icons
  npx tailwindcss init -p
  ```

- [ ] **Step 2: Create tsconfig.json**
  ```json
  {
    "compilerOptions": {
      "target": "es5",
      "lib": ["dom", "dom.iterable", "esnext"],
      "allowJs": true,
      "skipLibCheck": true,
      "strict": true,
      "noEmit": true,
      "esModuleInterop": true,
      "module": "esnext",
      "moduleResolution": "bundler",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "jsx": "preserve",
      "incremental": true,
      "plugins": [{ "name": "next" }],
      "paths": { "@/*": ["./*"] }
    },
    "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    "exclude": ["node_modules"]
  }
  ```

- [ ] **Step 3: Update tailwind.config.ts with brand colors**
  ```ts
  import type { Config } from "tailwindcss"

  const config: Config = {
    content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
    theme: {
      extend: {
        colors: {
          cobre: "#C4907A",
          "cobre-deep": "#9E6E5C",
          linho: "#F4F1EB",
          blush: "#EDE0D8",
          carvao: "#3A3330",
          quartzo: "#8A7E79",
        },
      },
    },
    plugins: [],
  }

  export default config
  ```

- [ ] **Step 4: Create postcss.config.mjs**
  ```js
  /** @type {import('postcss-load-config').Config} */
  const config = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }
  export default config
  ```

- [ ] **Step 5: Create app/globals.css with brand tokens**
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  :root {
    --cobre-dinya: #C4907A;
    --cobre-profundo: #9E6E5C;
    --linho: #F4F1EB;
    --blush-suave: #EDE0D8;
    --carvao-quente: #3A3330;
    --quartzo: #8A7E79;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  ```

- [ ] **Step 6: Create next.config.ts**
  ```ts
  import type { NextConfig } from "next"

  const nextConfig: NextConfig = {
    images: {
      unoptimized: true,
    },
  }

  export default nextConfig
  ```

- [ ] **Step 7: Update package.json scripts**
  - Ensure these scripts exist:
  ```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
  ```

- [ ] **Step 8: Verify scaffold works**
  Run: `npm run build`
  Expected: Build succeeds with no errors

### Task 2: Brand Foundation — layout, fonts, lib, Logo

**Files:**
- Modify: `app/layout.tsx`
- Create: `lib/whatsapp.ts`, `components/Logo.tsx`, `app/page.tsx` (minimal placeholder)

- [ ] **Step 1: Create lib/whatsapp.ts**
  ```ts
  const NUMERO = "5511999999999"

  export const WA_EMPRESA = `https://wa.me/${NUMERO}?text=${encodeURIComponent(
    "Olá, gostaria de solicitar um orçamento para brindes corporativos."
  )}`

  export const WA_PESSOAL = `https://wa.me/${NUMERO}?text=${encodeURIComponent(
    "Olá, gostaria de encomendar algo especial da DINYA."
  )}`
  ```

- [ ] **Step 2: Create components/Logo.tsx**
  ```tsx
  import Image from "next/image"

  export default function Logo() {
    return (
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10">
          <Image
            src="/logo.png"
            alt="DINYA Soluções Criativas"
            width={40}
            height={40}
            className="object-contain"
            priority
          />
        </div>
      </div>
    )
  }
  ```
  Note: Image will show broken until `/logo.png` is added manually. Add text fallback.

  Actually, we need a proper fallback. Use the approach: try to render Image, if broken show text.

  Better approach — show text "DINYA" as primary visual, Image as enhancement when file exists:

  ```tsx
  import Image from "next/image"

  export default function Logo({ className }: { className?: string }) {
    return (
      <div className={`flex items-center gap-3 ${className ?? ""}`}>
        <div className="relative h-10 w-10 flex-shrink-0">
          <Image
            src="/logo.png"
            alt="DINYA Soluções Criativas"
            width={40}
            height={40}
            className="object-contain"
            priority
          />
        </div>
        <span
          className="font-display text-2xl tracking-wide text-carvao"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          DINYA
        </span>
      </div>
    )
  }
  ```

- [ ] **Step 3: Create app/layout.tsx with fonts and metadata**
  ```tsx
  import type { Metadata } from "next"
  import { Cormorant_Garamond, DM_Sans } from "next/font/google"
  import "./globals.css"

  const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["300", "400", "500"],
    style: ["normal", "italic"],
    variable: "--font-cormorant",
    display: "swap",
  })

  const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500"],
    variable: "--font-dm-sans",
    display: "swap",
  })

  export const metadata: Metadata = {
    title: "DINYA Soluções Criativas — Impressão 3D Personalizada",
    description:
      "Brindes corporativos, presentes únicos e peças sob medida em impressão 3D. Feito com precisão técnica e criatividade genuína. Atibaia, SP.",
    openGraph: {
      title: "DINYA Soluções Criativas",
      description: "O que ainda não tem forma, a gente cria.",
      locale: "pt_BR",
      type: "website",
    },
  }

  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="pt-BR" className={`${cormorant.variable} ${dmSans.variable}`}>
        <body className="bg-linho font-sans text-carvao antialiased">
          {children}
        </body>
      </html>
    )
  }
  ```

- [ ] **Step 4: Update globals.css to include font-family variables**
  Add after the :root block:
  ```css
  @layer base {
    body {
      font-family: var(--font-dm-sans);
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: var(--font-cormorant);
    }
  }
  ```

- [ ] **Step 5: Verify build**
  Run: `npm run build`
  Expected: Build succeeds

### Task 3: Navbar Component

**Files:**
- Create: `components/Navbar.tsx`

- [ ] **Step 1: Create Navbar component**
  ```tsx
  "use client"

  import { useState } from "react"
  import Logo from "./Logo"

  const links = [
    { label: "O que fazemos", href: "#o-que-fazemos" },
    { label: "Brindes Corporativos", href: "#corporativo" },
    { label: "Quem somos", href: "#quem-somos" },
    { label: "Contato", href: "#contato" },
  ]

  export default function Navbar() {
    const [open, setOpen] = useState(false)

    const handleClick = () => {
      setOpen(false)
    }

    return (
      <nav className="sticky top-0 z-50 border-b border-blush bg-linho">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#inicio" onClick={handleClick}>
            <Logo />
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`text-sm tracking-wider transition-colors hover:text-cobre-deep ${
                    link.label === "Brindes Corporativos"
                      ? "font-medium text-cobre"
                      : "text-carvao"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Hamburger */}
          <button
            className="text-carvao md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Abrir menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="border-t border-blush bg-linho md:hidden">
            <ul className="flex flex-col gap-2 px-6 pb-6 pt-4">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={handleClick}
                    className={`block py-2 text-sm tracking-wider transition-colors hover:text-cobre-deep ${
                      link.label === "Brindes Corporativos"
                        ? "font-medium text-cobre"
                        : "text-carvao"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    )
  }
  ```

- [ ] **Step 2: Verify build**
  Run: `npm run build`
  Expected: Build succeeds

### Task 4: Hero + WhatsAppFloat Components

**Files:**
- Create: `components/Hero.tsx`, `components/WhatsAppFloat.tsx`

- [ ] **Step 1: Create Hero component**
  ```tsx
  import { WA_EMPRESA, WA_PESSOAL } from "@/lib/whatsapp"
  import { FaWhatsapp } from "react-icons/fa"

  export default function Hero() {
    return (
      <section
        id="inicio"
        className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-linho px-6"
      >
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-display text-4xl font-light leading-tight text-carvao md:text-5xl lg:text-6xl">
            Brindes corporativos que{" "}
            <span className="italic">as pessoas guardam.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-quartzo md:text-xl">
            Presentes únicos, decorações autorais, peças que o mercado não fabrica.
            Feito sob medida, em impressão 3D.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={WA_EMPRESA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded bg-cobre-deep px-8 py-3 text-sm font-medium uppercase tracking-widest text-linho transition-colors hover:bg-[#7A5240]"
            >
              <FaWhatsapp size={18} />
              WhatsApp — Sou empresa
            </a>
            <a
              href={WA_PESSOAL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded border border-cobre bg-transparent px-8 py-3 text-sm font-medium uppercase tracking-widest text-carvao transition-colors hover:bg-blush"
            >
              Quero algo especial
            </a>
          </div>
        </div>
      </section>
    )
  }
  ```

- [ ] **Step 2: Create WhatsAppFloat component**
  ```tsx
  "use client"

  import { useState, useEffect, useCallback } from "react"
  import { FaWhatsapp } from "react-icons/fa"
  import { WA_EMPRESA, WA_PESSOAL } from "@/lib/whatsapp"

  export default function WhatsAppFloat() {
    const [open, setOpen] = useState(false)

    const close = useCallback(() => setOpen(false), [])

    useEffect(() => {
      if (!open) return
      const handler = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        if (!target.closest("[data-whatsapp-float]")) close()
      }
      // Delay to avoid closing from the same click that opened
      const id = setTimeout(() => document.addEventListener("click", handler), 0)
      return () => {
        clearTimeout(id)
        document.removeEventListener("click", handler)
      }
    }, [open, close])

    return (
      <div
        data-whatsapp-float
        className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
      >
        {/* Expandable buttons */}
        <div
          className={`flex flex-col items-end gap-3 transition-all duration-300 ${
            open
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none translate-y-4 opacity-0"
          }`}
        >
          <a
            href={WA_EMPRESA}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded bg-cobre-deep px-4 py-2 text-xs font-medium uppercase tracking-widest text-linho shadow-lg transition-colors hover:bg-[#7A5240]"
          >
            <FaWhatsapp size={14} />
            Sou empresa
          </a>
          <a
            href={WA_PESSOAL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded bg-cobre px-4 py-2 text-xs font-medium uppercase tracking-widest text-linho shadow-lg transition-colors hover:bg-cobre-deep"
          >
            <FaWhatsapp size={14} />
            Quero algo especial
          </a>
        </div>

        {/* Main button */}
        <button
          onClick={() => setOpen(!open)}
          className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
          style={{ backgroundColor: "#25D366" }}
          aria-label="Fale conosco pelo WhatsApp"
        >
          <FaWhatsapp size={28} />
        </button>
      </div>
    )
  }
  ```

- [ ] **Step 3: Verify build**
  Run: `npm run build`
  Expected: Build succeeds

### Task 5: Corporativo + OQueFazemos Section Components

**Files:**
- Create: `components/Corporativo.tsx`, `components/OQueFazemos.tsx`

- [ ] **Step 1: Create Corporativo component**
  ```tsx
  import { FaWhatsapp } from "react-icons/fa"
  import { WA_EMPRESA } from "@/lib/whatsapp"

  const cards = [
    {
      title: "Personalização total",
      text: "Cada peça desenvolvida a partir do DNA da sua marca.",
    },
    {
      title: "Prazo definido",
      text: "Produção planejada, entrega sem surpresas.",
    },
    {
      title: "Volume sem compromisso",
      text: "Do brinde executivo ao kit de equipe.",
    },
  ]

  export default function Corporativo() {
    return (
      <section id="corporativo" className="bg-white px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-cobre">
            BRINDES CORPORATIVOS
          </span>
          <h2 className="font-display mt-4 text-3xl font-light text-carvao md:text-4xl">
            Brindes sob medida para a sua empresa
          </h2>
          <p className="mt-4 max-w-2xl font-light leading-relaxed text-quartzo">
            Do briefing ao produto final — com precisão técnica e acabamento premium.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {cards.map((card) => (
              <div
                key={card.title}
                className="rounded bg-blush p-8"
              >
                <h3 className="font-display text-xl text-carvao">
                  {card.title}
                </h3>
                <p className="mt-3 font-light leading-relaxed text-quartzo">
                  {card.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <a
              href={WA_EMPRESA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded bg-cobre-deep px-8 py-3 text-sm font-medium uppercase tracking-widest text-linho transition-colors hover:bg-[#7A5240]"
            >
              <FaWhatsapp size={18} />
              Solicitar orçamento
            </a>
          </div>
        </div>
      </section>
    )
  }
  ```

- [ ] **Step 2: Create OQueFazemos component**

  Note: Each card has a placeholder icon (SVG) and accepts optional `href` prop for Phase 2 catalog linkage.

  ```tsx
  interface CardData {
    label: string
    text: string
    icon: React.ReactNode
    href?: string
  }

  const cards: CardData[] = [
    {
      label: "Identidade",
      text: "A decoração autoral que transforma uma casa em lar.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cobre">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      label: "Presença",
      text: "O objeto sensorial que convida ao foco e à desconexão intencional do digital.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cobre">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      ),
    },
    {
      label: "Utilidade",
      text: "A peça de reposição sob medida que salva um objeto estimado do descarte.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cobre">
          <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
        </svg>
      ),
    },
    {
      label: "Conexão",
      text: "O brinde corporativo que conta uma história e que as pessoas realmente guardam.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cobre">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
  ]

  export default function OQueFazemos() {
    const CardTag = ({ card }: { card: CardData }) => {
      const content = (
        <div className="rounded bg-blush p-8 transition-colors hover:bg-[#E5D5CC]">
          <div className="mb-6">{card.icon}</div>
          <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-cobre">
            {card.label}
          </span>
          <p className="mt-3 font-light leading-relaxed text-quartzo">
            {card.text}
          </p>
        </div>
      )

      if (card.href) {
        return <a href={card.href}>{content}</a>
      }

      return content
    }

    return (
      <section id="o-que-fazemos" className="bg-linho px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-cobre">
            O QUE FAZEMOS
          </span>
          <h2 className="font-display mt-4 text-3xl font-light text-carvao md:text-4xl">
            Do problema à solução — com forma e precisão
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {cards.map((card) => (
              <CardTag key={card.label} card={card} />
            ))}
          </div>
        </div>
      </section>
    )
  }
  ```

- [ ] **Step 3: Verify build**
  Run: `npm run build`
  Expected: Build succeeds

### Task 6: QuemSomos + Contato Section Components

**Files:**
- Create: `components/QuemSomos.tsx`, `components/Contato.tsx`

- [ ] **Step 1: Create QuemSomos component**
  ```tsx
  export default function QuemSomos() {
    const listItems = [
      {
        label: "Identidade",
        text: "A decoração autoral que transforma uma casa em lar.",
      },
      {
        label: "Presença",
        text: "O objeto sensorial que convida ao foco e à desconexão intencional do digital.",
      },
      {
        label: "Utilidade",
        text: "A peça de reposição sob medida que salva um objeto estimado do descarte.",
      },
      {
        label: "Conexão",
        text: "O brinde corporativo que conta uma história e que as pessoas realmente guardam.",
      },
    ]

    return (
      <section id="quem-somos" className="bg-white px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-cobre">
            QUEM SOMOS
          </span>

          <div className="mt-10 grid gap-12 md:grid-cols-2">
            {/* Text column */}
            <div>
              <h2 className="font-display text-3xl font-light italic leading-tight text-carvao md:text-4xl">
                O que ainda não tem forma, a gente cria.
              </h2>

              <div className="mt-8 space-y-5 font-light leading-relaxed text-carvao">
                <p>
                  A DINYA nasceu de uma pergunta que você provavelmente já se fez: &ldquo;Por que isso ainda não existe?&rdquo;
                </p>
                <p>
                  Somos dois casais que decidiram unir visões de mundo totalmente diferentes para responder a essa pergunta. De um lado, a precisão e a lógica da engenharia somadas ao olhar atento e humano da saúde. Do outro, a visão estratégica da administração combinada com a bagagem prática e real da vida em família.
                </p>
                <p>
                  No cruzamento entre a técnica, o cuidado e o caos do dia a dia, descobrimos que a tecnologia não precisa ser fria. Para nós, a impressão 3D é uma ferramenta para materializar soluções que o mercado tradicional simplesmente ignora.
                </p>
              </div>

              <h3 className="mt-10 font-sans text-xs font-medium uppercase tracking-[0.2em] text-cobre">
                O QUE NOS MOVE
              </h3>

              <p className="mt-4 font-light leading-relaxed text-carvao">
                Cada projeto que desenvolvemos parte de uma necessidade real — que pode ser a nossa ou a sua:
              </p>

              <ul className="mt-6 space-y-5">
                {listItems.map((item) => (
                  <li key={item.label} className="border-l-2 border-cobre pl-4">
                    <span className="font-medium text-carvao">{item.label}:</span>{" "}
                    <span className="font-light text-quartzo">{item.text}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-8 font-light leading-relaxed text-carvao">
                Na DINYA, o problema vem primeiro. A criatividade e a precisão técnica são apenas as ferramentas que usamos para desenhar a resposta exata para o seu cotidiano.
              </p>
            </div>

            {/* Photo placeholder column */}
            <div className="flex items-start md:pt-12">
              <div className="aspect-[4/3] w-full rounded bg-blush flex items-center justify-center">
                <span className="font-sans text-sm text-quartzo">Foto da equipe</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  ```

- [ ] **Step 2: Create Contato component**
  ```tsx
  import { FaWhatsapp, FaInstagram, FaTiktok } from "react-icons/fa"
  import { WA_EMPRESA, WA_PESSOAL } from "@/lib/whatsapp"

  export default function Contato() {
    return (
      <section id="contato" className="bg-linho px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-cobre">
            CONTATO
          </span>
          <h2 className="font-display mt-4 text-3xl font-light text-carvao md:text-4xl">
            Vamos criar juntos
          </h2>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={WA_EMPRESA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded bg-cobre-deep px-8 py-3 text-sm font-medium uppercase tracking-widest text-linho transition-colors hover:bg-[#7A5240]"
            >
              <FaWhatsapp size={18} />
              WhatsApp — Empresas
            </a>
            <a
              href={WA_PESSOAL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded border border-cobre bg-transparent px-8 py-3 text-sm font-medium uppercase tracking-widest text-carvao transition-colors hover:bg-blush"
            >
              <FaWhatsapp size={18} />
              WhatsApp — Pessoas
            </a>
          </div>

          <div className="mt-8">
            <a
              href="mailto:contato@dinya.com.br"
              className="font-light text-quartzo underline underline-offset-4 transition-colors hover:text-cobre-deep"
            >
              contato@dinya.com.br
            </a>
          </div>

          <div className="mt-10 flex items-center justify-center gap-8">
            <a
              href="https://instagram.com/dinya.3d"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-quartzo transition-colors hover:text-cobre-deep"
              aria-label="Instagram da DINYA"
            >
              <FaInstagram size={22} />
              <span className="text-sm">@dinya.3d</span>
            </a>
            <a
              href="https://tiktok.com/@dinya.3d"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-quartzo transition-colors hover:text-cobre-deep"
              aria-label="TikTok da DINYA"
            >
              <FaTiktok size={20} />
              <span className="text-sm">@dinya.3d</span>
            </a>
          </div>
        </div>
      </section>
    )
  }
  ```

- [ ] **Step 3: Verify build**
  Run: `npm run build`
  Expected: Build succeeds

### Task 7: Footer Component + page.tsx Assembly

**Files:**
- Create: `components/Footer.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create Footer component**
  ```tsx
  import Logo from "./Logo"

  const links = [
    { label: "O que fazemos", href: "#o-que-fazemos" },
    { label: "Brindes Corporativos", href: "#corporativo" },
    { label: "Quem somos", href: "#quem-somos" },
    { label: "Contato", href: "#contato" },
  ]

  export default function Footer() {
    return (
      <footer className="bg-carvao px-6 py-16 text-linho">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-8 md:flex-row md:justify-between">
            {/* Left */}
            <div>
              <Logo />
              <p className="mt-2 font-light text-quartzo">
                Soluções Criativas · Atibaia
              </p>
            </div>

            {/* Right links */}
            <div className="flex flex-wrap gap-x-10 gap-y-4">
              {links.slice(0, 2).map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-light text-quartzo transition-colors hover:text-cobre"
                >
                  {link.label}
                </a>
              ))}
              {links.slice(2).map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-light text-quartzo transition-colors hover:text-cobre"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-12 border-t border-[#4A4340] pt-8 text-center">
            <p className="text-xs font-light text-quartzo">
              &copy; 2026 DINYA Soluções Criativas. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    )
  }
  ```

- [ ] **Step 2: Assemble page.tsx**
  ```tsx
  import Navbar from "@/components/Navbar"
  import Hero from "@/components/Hero"
  import Corporativo from "@/components/Corporativo"
  import OQueFazemos from "@/components/OQueFazemos"
  import QuemSomos from "@/components/QuemSomos"
  import Contato from "@/components/Contato"
  import Footer from "@/components/Footer"
  import WhatsAppFloat from "@/components/WhatsAppFloat"

  export default function Home() {
    return (
      <>
        <Navbar />
        <main>
          <Hero />
          <Corporativo />
          <OQueFazemos />
          <QuemSomos />
          <Contato />
        </main>
        <Footer />
        <WhatsAppFloat />
      </>
    )
  }
  ```

- [ ] **Step 3: Verify build**
  Run: `npm run build`
  Expected: Build succeeds with no errors

### Task 8: ROADMAP.md + README.md + Final Verification

**Files:**
- Create: `ROADMAP.md`, `README.md`

- [ ] **Step 1: Create ROADMAP.md**
  ```md
  # DINYA Soluções Criativas — Roadmap

  ## Fase 1 — Landing Page (atual)
  - [x] Site institucional de página única
  - [x] Seções: Hero, Brindes Corporativos, O que fazemos, Quem somos, Contato
  - [x] Navegação com smooth scroll
  - [x] WhatsApp flutuante com duas opções
  - [x] Design responsivo (mobile-first)
  - [x] Marca registrada em CSS custom properties

  ## Fase 2 — Portfólio + Catálogo
  - [ ] Seção de portfólio com projetos realizados
  - [ ] Catálogo de produtos com filtros
  - [ ] Pedido via WhatsApp por produto
  - [ ] Cards da seção "O que fazemos" linkam para catálogo

  ## Fase 3 — Loja Virtual
  - [ ] Checkout integrado
  - [ ] Carrinho de compras
  - [ ] Gestão de pedidos
  ```

- [ ] **Step 2: Create README.md**
  ```md
  # DINYA Soluções Criativas

  Site institucional da DINYA, empresa de impressão 3D personalizada em Atibaia, SP.

  ## Stack
  - Next.js 14 (App Router)
  - TypeScript
  - Tailwind CSS
  - Google Fonts (Cormorant Garamond + DM Sans)

  ## Antes do deploy — substituir
  - [ ] **Número WhatsApp** — editar `NUMERO` em `lib/whatsapp.ts` (5511999999999)
  - [ ] **E-mail de contato** — substituir `contato@dinya.com.br` em `components/Contato.tsx`
  - [ ] **Instagram** — substituir `@dinya.3d` em `components/Contato.tsx`
  - [ ] **TikTok** — substituir `@dinya.3d` em `components/Contato.tsx`
  - [ ] **Logo** — adicionar `public/logo.png`
  - [ ] **Foto da equipe** — substituir placeholder em `components/QuemSomos.tsx`
  ```

- [ ] **Step 3: Final build verification**
  Run: `npm run build`
  Expected: Build succeeds with zero errors

- [ ] **Step 4: List all files for manual review**
  ```
  Antes do deploy, editar:
    lib/whatsapp.ts:1     → NUMERO real
    components/Contato.tsx → e-mail, Instagram, TikTok
    public/logo.png       → adicionar arquivo da logo
    components/QuemSomos.tsx → foto da equipe (Fase 2)
  ```
