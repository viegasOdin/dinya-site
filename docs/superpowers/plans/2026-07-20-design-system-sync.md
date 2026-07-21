# Sincronizar site com o Design System revisado — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reconciliar o site institucional da Dinya com o Design System revisado (Claude Design, `projectId 2eb9da4a-6857-491d-88e5-733b0daa6dff`) — tokens de cor, Hero reescrito no tom do kit, nova seção "As três linhas" (Play/Ambient/Devotion) e Navbar reestruturada.

**Architecture:** Mudanças aditivas em cima do Next.js 14 (App Router, export estático) + Tailwind existente. Um componente novo (`AsTresLinhas.tsx`), dois componentes reescritos (`Hero.tsx`, `Navbar.tsx`), um arquivo de config estendido (`tailwind.config.ts`), um import a mais em `app/page.tsx`. Nenhum modelo de dados, rota ou dependência nova.

**Tech Stack:** Next.js 14 (`output: "export"`), Tailwind 3.4, motion@12.42.0, react-icons, testes via `node --test` (asserts de regex sobre o código-fonte, ver `tests/site-ui.test.mjs`).

## Global Constraints

- Spec de origem: `docs/superpowers/specs/2026-07-20-design-system-sync-design.md` — qualquer dúvida de escopo, essa é a fonte da verdade.
- **Não adotar** o `quartzo` revisado do kit (`#8A7E79`) — mantém `#6B6059` (contraste WCAG AA contra `linho` cai de 5.41:1 pra 3.49:1, abaixo do piso de 4.5:1 pra texto de corpo).
- **Apenas 2 tokens de cor novos**: `play-coral` (`#F4502B`) e `devotion-blue` (`#3E5C76`). Nada mais da paleta do kit entra agora.
- **Cores de linha nunca em texto pequeno diretamente** — `play-coral`/`devotion-blue`/`cobre-deep` só em borda, fundo (com tint `/10`) ou "bolinha" decorativa (contraste ≥3:1, o piso pra elementos não-textuais); texto sempre em `text-carvao` (título/tagline) ou `text-quartzo` (label secundário), ambos já auditados no projeto.
- **Não tocar**: `lib/produtos.ts`, modelo de dados do catálogo, `Corporativo.tsx`, `DestaquesProdutos.tsx`, `OQueFazemos.tsx`, `QuemSomos.tsx`, `Contato.tsx`, `Footer.tsx`.
- **Sem fotos novas** — a seção "As três linhas" não usa imagens.
- Todo teste novo segue o padrão já estabelecido em `tests/site-ui.test.mjs`: `assert.match`/`assert.doesNotMatch` sobre o texto bruto do arquivo-fonte (sem framework de teste, sem DOM, `node:assert/strict` + `node:test`).
- `npm run build` deve passar sem erro antes de qualquer claim de "funcionando" (regra do projeto, `CLAUDE.md`).

---

### Task 1: Tokens no Tailwind

**Files:**
- Modify: `tailwind.config.ts` (linhas 11-20, bloco `colors`)
- Test: `tests/site-ui.test.mjs`

**Interfaces:**
- Produces: classes utilitárias Tailwind `text-play-coral`, `border-play-coral`, `bg-play-coral`, `bg-play-coral/10`, `text-devotion-blue`, `border-devotion-blue`, `bg-devotion-blue`, `bg-devotion-blue/10` — consumidas pela Task 3 (`AsTresLinhas.tsx`).

- [ ] **Step 1: Escrever o teste que falha**

Adicione ao final de `tests/site-ui.test.mjs`:

```js
test("tokens do design system revisado somam play-coral e devotion-blue sem alterar quartzo", () => {
  const config = read("tailwind.config.ts")
  assert.match(config, /"play-coral":\s*"#F4502B"/)
  assert.match(config, /"devotion-blue":\s*"#3E5C76"/)
  assert.match(config, /quartzo:\s*"#6B6059"/)
})
```

- [ ] **Step 2: Rodar os testes e confirmar a falha**

Run: `npm test`
Expected: FAIL — a suíte inteira roda (é um único processo `node --test`), o teste novo falha porque `tailwind.config.ts` ainda não tem `play-coral` nem `devotion-blue`. As outras asserções continuam passando.

- [ ] **Step 3: Editar `tailwind.config.ts`**

Substitua o bloco `colors` inteiro (linhas 11-20) por:

```ts
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
```

- [ ] **Step 4: Rodar os testes e confirmar que passam**

Run: `npm test`
Expected: PASS — todos os testes, incluindo o novo.

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.ts tests/site-ui.test.mjs
git commit -m "feat: adiciona tokens play-coral e devotion-blue do design system revisado"
```

---

### Task 2: Reescrever o Hero

**Files:**
- Modify: `components/Hero.tsx` (arquivo inteiro, 52 linhas hoje)
- Test: `tests/site-ui.test.mjs`

**Interfaces:**
- Consumes: `PrintedLogo` (`components/PrintedLogo.tsx`, já existe, sem mudança), `Reveal` (`components/Reveal.tsx`, já existe, sem mudança).
- Produces: `<section id="inicio">` com CTA `href="#corporativo"` e CTA `href="#linhas"` — o segundo é consumido pela Task 3 (a seção precisa existir com `id="linhas"` pro scroll funcionar) e pela Navbar (Task 4, que também aponta pra `#linhas`).

- [ ] **Step 1: Escrever o teste que falha**

Adicione ao final de `tests/site-ui.test.mjs`:

```js
test("hero segue o manifesto do kit revisado, mantém a animação do logo e larga o CTA pessoal", () => {
  const hero = read("components/Hero.tsx")
  assert.match(hero, /PrintedLogo/)
  assert.match(hero, /O que ainda não tem forma, a gente cria\./)
  assert.match(hero, /href="#corporativo"/)
  assert.match(hero, /href="#linhas"/)
  assert.doesNotMatch(hero, /Quero algo especial/)
})
```

- [ ] **Step 2: Rodar os testes e confirmar a falha**

Run: `npm test`
Expected: FAIL — `components/Hero.tsx` ainda tem o H1 antigo ("Brindes corporativos que...") e o CTA "Quero algo especial".

- [ ] **Step 3: Reescrever `components/Hero.tsx`**

Substitua o arquivo inteiro por:

```tsx
import Reveal from "./Reveal"
import PrintedLogo from "./PrintedLogo"

export default function Hero() {
  return (
    <section
      id="inicio"
      className="flex min-h-[calc(100svh-80px)] items-center justify-center bg-linho px-6"
    >
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-8 flex justify-center">
          <PrintedLogo className="h-28 w-auto text-carvao md:h-36" />
        </div>
        <Reveal>
          <span className="font-sans text-xs font-medium uppercase tracking-[0.22em] text-cobre-text">
            Impressão 3D · Projetos Personalizados · Brindes Corporativos
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-display mt-6 text-4xl font-light italic leading-tight text-carvao md:text-5xl lg:text-6xl">
            O que ainda não tem forma, a gente cria.
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-light leading-relaxed text-quartzo md:text-xl">
            Cada produto que desenvolvemos parte de uma necessidade real — da decoração
            personalizada ao brinde corporativo que as pessoas realmente guardam.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#corporativo"
              className="inline-flex min-h-11 items-center rounded bg-cobre-text px-8 py-3 text-sm font-medium uppercase tracking-widest text-linho transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#684436] motion-reduce:transform-none motion-reduce:transition-none"
            >
              Brindes Corporativos
            </a>
            <a
              href="#linhas"
              className="inline-flex min-h-11 items-center rounded border border-cobre-text bg-transparent px-8 py-3 text-sm font-medium uppercase tracking-widest text-carvao transition-all duration-200 hover:-translate-y-0.5 hover:bg-blush motion-reduce:transform-none motion-reduce:transition-none"
            >
              Ver as três linhas
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
```

Nota: o CTA "Quero algo especial" (WhatsApp pessoal) sai do Hero — continua acessível pelo botão flutuante (`WhatsAppFloat.tsx`, não tocado) e em `Contato.tsx` (não tocado). `WA_EMPRESA`/`WA_PESSOAL`/`FaWhatsapp` não são mais usados neste arquivo — não importe, os imports antigos somem junto com a reescrita.

- [ ] **Step 4: Rodar os testes e confirmar que passam**

Run: `npm test`
Expected: PASS — todos os testes.

- [ ] **Step 5: Verificar que o build não quebra**

Run: `npm run build`
Expected: build conclui sem erro (a suíte de testes de regex não pega erro de JSX/TypeScript — isso pega).

- [ ] **Step 6: Commit**

```bash
git add components/Hero.tsx tests/site-ui.test.mjs
git commit -m "feat: reescreve o Hero pro manifesto do design system revisado"
```

---

### Task 3: Nova seção "As três linhas" + integração na home

**Files:**
- Create: `components/AsTresLinhas.tsx`
- Modify: `app/page.tsx` (insere o import e o componente entre `<Hero />` e `<Corporativo />`)
- Test: `tests/site-ui.test.mjs`

**Interfaces:**
- Consumes: `Reveal` (`components/Reveal.tsx`), tokens `play-coral`/`devotion-blue`/`cobre-deep` (Task 1).
- Produces: `<section id="linhas">` — âncora de scroll consumida pelo CTA do Hero (Task 2, já apontando pra `#linhas`) e pela Navbar (Task 4).

- [ ] **Step 1: Escrever o teste que falha**

Adicione ao final de `tests/site-ui.test.mjs`:

```js
test("a seção 'As três linhas' cobre Play/Ambient/Devotion sem foto e sem texto colorido fora do padrão AA", () => {
  const linhas = read("components/AsTresLinhas.tsx")
  assert.match(linhas, /id="linhas"/)
  assert.match(linhas, /Gira, monta, se diverte\./)
  assert.match(linhas, /Luz que desenha sombra\./)
  assert.match(linhas, /Guarda o que se ama\./)
  assert.match(linhas, /text-quartzo/)
  assert.doesNotMatch(linhas, /text-play-coral/)
  assert.doesNotMatch(linhas, /text-devotion-blue/)
  assert.doesNotMatch(linhas, /<img/)
})

test("homepage inclui 'As três linhas' entre o Hero e Brindes Corporativos", () => {
  assert.match(read("app/page.tsx"), /AsTresLinhas/)
})
```

- [ ] **Step 2: Rodar os testes e confirmar a falha**

Run: `npm test`
Expected: FAIL — `components/AsTresLinhas.tsx` ainda não existe (o `read()` do teste lança `ENOENT`, o que conta como falha do teste), e `app/page.tsx` não importa `AsTresLinhas`.

- [ ] **Step 3: Criar `components/AsTresLinhas.tsx`**

```tsx
"use client"

import { useState } from "react"
import Reveal from "./Reveal"

interface Linha {
  id: string
  nome: string
  escopo: string
  tagline: string
  radiusAtivo: string
  corBorda: string
  corFundoAtivo: string
  corBolinha: string
}

const LINHAS: Linha[] = [
  {
    id: "play",
    nome: "Play",
    escopo: "Sensoriais · Jogos · Utilidades",
    tagline: "Gira, monta, se diverte.",
    radiusAtivo: "rounded-full",
    corBorda: "border-play-coral",
    corFundoAtivo: "bg-play-coral/10",
    corBolinha: "bg-play-coral",
  },
  {
    id: "ambient",
    nome: "Ambient",
    escopo: "Luminárias · Decoração",
    tagline: "Luz que desenha sombra.",
    radiusAtivo: "rounded-none",
    corBorda: "border-cobre-deep",
    corFundoAtivo: "bg-cobre-deep/10",
    corBolinha: "bg-cobre-deep",
  },
  {
    id: "devotion",
    nome: "Devotion",
    escopo: "Imagens · Chaveiros · Kits de Altar",
    tagline: "Guarda o que se ama.",
    radiusAtivo: "rounded-none",
    corBorda: "border-devotion-blue",
    corFundoAtivo: "bg-devotion-blue/10",
    corBolinha: "bg-devotion-blue",
  },
]

export default function AsTresLinhas() {
  const [ativaId, setAtivaId] = useState(LINHAS[0].id)
  const ativa = LINHAS.find((l) => l.id === ativaId) ?? LINHAS[0]

  return (
    <section id="linhas" className="bg-white px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-cobre-text">
            AS TRÊS LINHAS
          </span>
          <h2 className="font-display mt-4 text-3xl font-light text-carvao md:text-4xl">
            Cada linha, um jeito de criar
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="mt-10 flex flex-wrap gap-3"
            role="tablist"
            aria-label="Linhas de produto"
          >
            {LINHAS.map((linha) => {
              const ativoAgora = linha.id === ativaId
              return (
                <button
                  key={linha.id}
                  type="button"
                  role="tab"
                  aria-selected={ativoAgora}
                  onClick={() => setAtivaId(linha.id)}
                  className={`inline-flex min-h-11 items-center border px-6 text-sm font-medium uppercase tracking-widest text-carvao transition-colors ${linha.radiusAtivo} ${
                    ativoAgora
                      ? `${linha.corFundoAtivo} ${linha.corBorda}`
                      : "border-blush hover:border-carvao"
                  }`}
                >
                  {linha.nome}
                </button>
              )
            })}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10" role="tabpanel">
            <div className="flex items-center gap-2">
              <span
                className={`inline-block h-2 w-2 rounded-full ${ativa.corBolinha}`}
                aria-hidden="true"
              />
              <span className="font-sans text-xs font-medium uppercase tracking-[0.14em] text-quartzo">
                {ativa.escopo}
              </span>
            </div>
            <p className="font-display mt-3 text-2xl font-light italic text-carvao md:text-3xl">
              {ativa.tagline}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
```

Nota de acessibilidade (por isso o teste garante isso explicitamente): `play-coral` e `devotion-blue` só aparecem em `border-*`, `bg-*/10` (tint) e a bolinha `h-2 w-2` — nenhum deles carrega texto. `border-cobre-deep`/`bg-cobre-deep` (Ambient) também seguem a mesma regra, mesmo já sendo um token existente. Título e tagline usam `text-carvao`, o label secundário usa `text-quartzo` — as duas cores de texto já auditadas no projeto (ver Task 1 e o comentário em `cobre-text`).

- [ ] **Step 4: Editar `app/page.tsx`**

```tsx
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import AsTresLinhas from "@/components/AsTresLinhas"
import Corporativo from "@/components/Corporativo"
import DestaquesProdutos from "@/components/DestaquesProdutos"
import OQueFazemos from "@/components/OQueFazemos"
import QuemSomos from "@/components/QuemSomos"
import Contato from "@/components/Contato"
import Footer from "@/components/Footer"
import WhatsAppFloat from "@/components/WhatsAppFloat"

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="conteudo">
        <Hero />
        <AsTresLinhas />
        <Corporativo />
        <DestaquesProdutos />
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

- [ ] **Step 5: Rodar os testes e confirmar que passam**

Run: `npm test`
Expected: PASS — todos os testes, incluindo os dois novos. A asserção pré-existente `assert.match(read("app/page.tsx"), /DestaquesProdutos/)` (no teste "a homepage apresenta produtos reais...") continua passando, `DestaquesProdutos` não foi removido.

- [ ] **Step 6: Verificar que o build não quebra**

Run: `npm run build`
Expected: build conclui sem erro.

- [ ] **Step 7: Commit**

```bash
git add components/AsTresLinhas.tsx app/page.tsx tests/site-ui.test.mjs
git commit -m "feat: adiciona seção 'As três linhas' (Play/Ambient/Devotion) na home"
```

---

### Task 4: Reestruturar a Navbar

**Files:**
- Modify: `components/Navbar.tsx` (arquivo inteiro, 122 linhas hoje)
- Test: `tests/site-ui.test.mjs`

**Interfaces:**
- Consumes: `Logo` (`components/Logo.tsx`, sem mudança), `usePathname` (`next/navigation`), `motion`/`AnimatePresence`/`MotionConfig` (`motion/react`), âncoras `#linhas` (Task 3) e `#corporativo` (já existe em `Corporativo.tsx`, não tocado).
- Produces: nada consumido por outra task — é a última peça de UI do plano.

- [ ] **Step 1: Escrever o teste que falha**

Adicione ao final de `tests/site-ui.test.mjs`:

```js
test("navbar: Play/Ambient/Devotion no nível principal, 'Dinya' vira dropdown por clique", () => {
  const navbar = read("components/Navbar.tsx")
  assert.match(navbar, /label: "Play"/)
  assert.match(navbar, /label: "Ambient"/)
  assert.match(navbar, /label: "Devotion"/)
  assert.match(navbar, /Dinya/)
  assert.match(navbar, /aria-haspopup="true"/)
  assert.match(navbar, /aria-expanded=\{dinyaOpen\}/)
  assert.match(navbar, /usePathname/)
  assert.match(navbar, /aria-current=/)
  assert.match(navbar, /min-h-11 min-w-11/)
})
```

Essa asserção reafirma as três checagens do teste antigo (`usePathname`, `aria-current=`, `min-h-11 min-w-11`) junto com as novas — evita duplicar teste pra mesma responsabilidade.

- [ ] **Step 2: Rodar os testes e confirmar a falha**

Run: `npm test`
Expected: FAIL — `components/Navbar.tsx` ainda não tem `dinyaOpen`, `aria-haspopup`, nem os links `Play`/`Ambient`/`Devotion`.

- [ ] **Step 3: Reescrever `components/Navbar.tsx`**

Substitua o arquivo inteiro por:

```tsx
"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, MotionConfig, motion } from "motion/react"
import Logo from "./Logo"

const linksPrincipais = [
  { label: "Play", href: "/#linhas" },
  { label: "Ambient", href: "/#linhas" },
  { label: "Devotion", href: "/#linhas" },
  { label: "Brindes Corporativos", href: "/#corporativo" },
]

const linksDinya = [
  { label: "Catálogo", href: "/catalogo" },
  { label: "Quem somos", href: "/#quem-somos" },
  { label: "Contato", href: "/#contato" },
]

const todosLinksMobile = [...linksPrincipais, ...linksDinya]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [dinyaOpen, setDinyaOpen] = useState(false)
  const dinyaRef = useRef<HTMLLIElement>(null)
  const pathname = usePathname()

  const handleClick = () => {
    setOpen(false)
    setDinyaOpen(false)
  }

  useEffect(() => {
    if (!open && !dinyaOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
        setDinyaOpen(false)
      }
    }
    document.addEventListener("keydown", closeOnEscape)
    return () => document.removeEventListener("keydown", closeOnEscape)
  }, [open, dinyaOpen])

  useEffect(() => {
    if (!dinyaOpen) return
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (dinyaRef.current && !dinyaRef.current.contains(event.target as Node)) {
        setDinyaOpen(false)
      }
    }
    document.addEventListener("mousedown", closeOnOutsideClick)
    return () => document.removeEventListener("mousedown", closeOnOutsideClick)
  }, [dinyaOpen])

  const isActive = (href: string) =>
    href === "/catalogo" && pathname.startsWith("/catalogo")

  return (
    <nav className="sticky top-0 z-50 border-b border-blush bg-linho/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a
          href="/#inicio"
          onClick={handleClick}
          aria-label="DINYA — voltar ao início"
          className="inline-flex min-h-11 items-center"
        >
          <Logo />
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {linksPrincipais.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`inline-flex min-h-11 items-center text-sm tracking-wider transition-colors hover:text-cobre-text ${
                  isActive(link.href) ? "font-medium text-cobre-text" : "text-carvao"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li ref={dinyaRef} className="relative">
            <button
              type="button"
              onClick={() => setDinyaOpen((v) => !v)}
              aria-expanded={dinyaOpen}
              aria-haspopup="true"
              className="inline-flex min-h-11 items-center gap-1 text-sm tracking-wider text-carvao transition-colors hover:text-cobre-text"
            >
              Dinya
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M2 3.5L5 6.5L8 3.5" />
              </svg>
            </button>
            <AnimatePresence>
              {dinyaOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute right-0 top-full mt-2 min-w-40 border border-blush bg-linho py-2 shadow-sm"
                >
                  {linksDinya.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={handleClick}
                        aria-current={isActive(link.href) ? "page" : undefined}
                        className={`flex min-h-11 items-center px-4 text-sm tracking-wider transition-colors hover:text-cobre-text ${
                          isActive(link.href) ? "font-medium text-cobre-text" : "text-carvao"
                        }`}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className="flex min-h-11 min-w-11 items-center justify-center text-carvao md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="menu-principal"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
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

      {/* Mobile drawer — lista plana, sem submenu aninhado */}
      {/* ponytail: "Dinya" não vira accordion no mobile, é só mais 3 itens na lista */}
      <MotionConfig reducedMotion="user">
        <AnimatePresence>
          {open && (
            <motion.div
              id="menu-principal"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="border-t border-blush bg-linho md:hidden"
            >
              <ul className="flex flex-col gap-2 px-6 pb-6 pt-4">
                {todosLinksMobile.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={handleClick}
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className={`flex min-h-11 items-center text-sm tracking-wider transition-colors hover:text-cobre-text ${
                        isActive(link.href) ? "font-medium text-cobre-text" : "text-carvao"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </MotionConfig>
    </nav>
  )
}
```

Nota: `key={link.label}` (não `link.href`) nas duas listas que têm hrefs repetidos — Play/Ambient/Devotion apontam todos pra `/#linhas`.

- [ ] **Step 4: Rodar os testes e confirmar que passam**

Run: `npm test`
Expected: PASS — todos os testes.

- [ ] **Step 5: Verificar que o build não quebra**

Run: `npm run build`
Expected: build conclui sem erro.

- [ ] **Step 6: Commit**

```bash
git add components/Navbar.tsx tests/site-ui.test.mjs
git commit -m "feat: reestrutura a navbar com Play/Ambient/Devotion e dropdown Dinya"
```

---

### Task 5: Verificação final

**Files:** nenhum arquivo novo — só validação.

- [ ] **Step 1: Rodar a suíte de testes completa**

Run: `npm test`
Expected: PASS — todos os testes (os pré-existentes + os 5 novos das Tasks 1-4).

- [ ] **Step 2: Rodar o build de produção**

Run: `npm run build`
Expected: build conclui sem erro, gera `out/` (export estático).

- [ ] **Step 3: Smoke test manual no dev server**

Run: `npm run dev` (porta fixa 4000, ver `package.json`)

Abrir `http://localhost:4000` num navegador e conferir:
- Hero mostra a animação do logo impresso, o novo título em itálico e os dois CTAs ("Brindes Corporativos" rola até a seção de brindes, "Ver as três linhas" rola até a nova seção)
- Seção "As três linhas" aparece entre o Hero e "Brindes Corporativos", os 3 botões de aba trocam o conteúdo abaixo ao clicar
- Navbar desktop: Play/Ambient/Devotion/Brindes Corporativos visíveis, "Dinya" abre um dropdown ao clicar (Catálogo/Quem somos/Contato), fecha ao clicar fora ou Esc
- Redimensionar pra mobile (`< 768px`): navbar vira hamburguer, lista plana com os 7 itens
- Nenhuma regressão visual nas seções não tocadas (Brindes Corporativos, Peças em Destaque, O Que Fazemos, Quem Somos, Contato, Footer)

- [ ] **Step 4: Parar o dev server**

Encerrar o processo do `npm run dev` (Ctrl+C ou matar o processo) depois de confirmar visualmente.

Nenhum commit nesta task — é só verificação do que já foi commitado nas Tasks 1-4.
